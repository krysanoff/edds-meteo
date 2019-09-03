<?php

namespace App\Edds;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class Meteo extends Model
{

    protected $fillable = ['created_at',
                           'temperature',
                           'wind_min',
                           'wind',
                           'wind_max',
                           'wind_dir',
                           'pressure',
                           'relative_humidity'
        ];

    protected $table = 'meteo';
    public $timestamps = false;
    public static $rules = [
        // Validation rules
    ];

    protected $meteoData;
    protected $meteoJson;
    protected $meteoArray = [];

    /**
     * Get fresh data from meteo station
     *
     * @throws \Exception if the meteo data is empty
     *
     * @return void
     */
    public function getMeteoData()
    {
        try {
            $this->connectMeteoStation();
            $this->meteoDataToArray();

            if (!count($this->meteoArray)) {
                throw new \Exception('The meteo data is empty');
            }
        } catch (\Exception $e) {
            $e->getMessage();
        }
    }

    /**
     * Add new meteo data to DB
     */
    public function add()
    {
        $time = Carbon::now(env('APP_TIMEZONE'));

        if (count($this->meteoArray)) {
            try {
                $this->created_at = $time;
                $this->temperature = $this->meteoArray['Ta'];
                $this->wind_min = $this->meteoArray['Sn'];
                $this->wind = $this->meteoArray['Sm'];
                $this->wind_max = $this->meteoArray['Sx'];
                $this->wind_dir = $this->meteoArray['Dm'];
                $this->pressure = $this->meteoArray['Pa']/1.333224; // convert to mmHg
                $this->relative_humidity = $this->meteoArray['Ua'];

                $this->save();
            } catch(\Exception $e) {
                report($e);
            }

            return;
        }

        Log::error('Error during inserting meteo data');
        return;
    }

    public function defineWindDirLit()
    {
        $windDirection = '';

        // The directions is wrong because the station is not installed properly. The north must be equals 0.
        if ($this->meteoArray['Dm'] <= 23 || $this->meteoArray['Dm'] >= 337) {
                $windDirection = 'юго-восточный';
            } else if ($this->meteoArray['Dm'] > 23 && $this->meteoArray['Dm'] < 67) {
                $windDirection = 'южный';
            } else if ($this->meteoArray['Dm'] >= 67 && $this->meteoArray['Dm'] <= 113) {
                $windDirection = 'юго-западный';
            } else if ($this->meteoArray['Dm'] > 113 && $this->meteoArray['Dm'] < 157) {
                $windDirection = 'западный';
            } else if ($this->meteoArray['Dm'] >= 157 && $this->meteoArray['Dm'] <= 203) {
                $windDirection = 'северо-западный';
            } else if ($this->meteoArray['Dm'] > 203 && $this->meteoArray['Dm'] < 247) {
                $windDirection = 'северный';
            } else if ($this->meteoArray['Dm'] >= 247 && $this->meteoArray['Dm'] <= 293) {
                $windDirection = 'северо-восточный';
            } else if ($this->meteoArray['Dm'] > 293 && $this->meteoArray['Dm'] < 337) {
                $windDirection = 'восточный';
            }

        return $windDirection;
    }

    /**
     * Connection with meteo station
     *
     * @return void
     */
    protected function connectMeteoStation()
    {
        try {
            $fp = @fsockopen(env('METEO_HOST'), env('METEO_PORT'),$errno,$errstr, 3);

            if (!$fp) {
                throw new \Exception("Couldn't connect to the meteo host");
            }

            $this->meteoData = fread($fp, 1024);
            fclose($fp);
        } catch (\Exception $e) {
            die($e->getMessage());
        }
    }

    /**
     * Convert meteo station's data to array
     */
    protected function meteoDataToArray()
    {
        $draftArray = explode(",", $this->meteoData);
        array_shift($draftArray); // Shift key with command

        foreach ($draftArray as $param) {
            list($key, $value) = explode("=", $param);
            $this->meteoArray[$key] = substr($value, 0, strlen($value) - 1); // Remove last symbol
        }
    }

    /**
     * Encode meteo array to JSON
     *
     * @return void
     */
    protected function meteoDataToJSON()
    {
        $this->meteoJson = json_encode($this->meteoArray);
    }

    /**
     * Get last meteo data from DB
     *
     * @return mixed
     */
    public function getLastMeteoData()
    {
        $last = self::orderBy('created_at', 'desc')->first();

        if ($last) {
            return $last->toJson();
        }

        Log::error('Cannot get last meteo data');
        return false;
    }

    /**
     * Get data from DB for the last day
     */
    public function getLastDayData()
    {
        $time = Carbon::now(env('APP_TIMEZONE'));
        $lastDayData = self::select('created_at as time', 'temperature', 'wind')
                            ->where('created_at', '>=', $time->subDay())
                            ->get();

        $lastDayDataObj = $this->createMeteoObject();

        foreach ($lastDayData as $meteo) {

            $parsedTime = Carbon::parse($meteo->time);

            if ($parsedTime->minute == 0) {
                $lastDayDataObj->temperature[] = $meteo->temperature;
                $lastDayDataObj->wind[] = $meteo->wind;
                $lastDayDataObj->time[] = $parsedTime->hour.":00";
            }
        }

        if ($lastDayData) {
            return json_encode($lastDayDataObj);
        }

        Log::error('There is no any data for the last day');

        return false;
    }


}
