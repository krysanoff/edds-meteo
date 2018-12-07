<?php

namespace App\Edds;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class Meteo extends Model {

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

    /*public $created_at;
    protected $temperature;
    protected $wind;
    protected $wind_min;
    protected $wind_max;
    protected $wind_dir;
    protected $pressure;
    protected $relative_humidity;*/

    /**
     * Get fresh data from meteo station
     *
     * @return void
     */
    public function getMeteoData()
    {
        if ($this->connectMeteoStation()) {
            Log::info('Connected to meteo station');
            $this->meteoDataToArray();
        }
    }

    /**
     * Add new meteo data to DB
     */
    public function add()
    {
        if (count($this->meteoArray)) {
            $this->created_at = date('Y-m-d H:i:s');
            $this->temperature = $this->meteoArray['Ta'];
            $this->wind_min = $this->meteoArray['Sn'];
            $this->wind = $this->meteoArray['Sm'];
            $this->wind_max = $this->meteoArray['Sx'];
            $this->wind_dir = $this->meteoArray['Dm'];
            $this->pressure = $this->meteoArray['Pa']/1.333224; // convert to mmHg
            $this->relative_humidity = $this->meteoArray['Ua'];
            var_dump($this);

            $this->save();
            Log::info('Insert meteo data to DB');

            return;
        }

        Log::error('Error during inserting meteo data');
        return;
    }

    /**
     * Connection with meteo station
     *
     * @return boolean
     */
    protected function connectMeteoStation()
    {
        try {
            $fp = fsockopen(env('METEO_HOST'), env('METEO_PORT'),$errno,$errstr, 30);
            $this->meteoData = fread($fp, 1024);
            fclose($fp);
            return true;
        } catch (\Exception $e) {
            echo $e->getMessage();
            return false;
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
    public static function getLastMeteoData()
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
    public static function getLastDayData()
    {
        $mutable = \Carbon\Carbon::now();
        $lastDayData = self::select('created_at as time', 'temperature', 'wind')
                            ->where('created_at', '>=', $mutable->subDay())
                            ->get();

        $lastDayDataObj = new \stdClass();
        $lastDayDataObj->temperature = [];
        $lastDayDataObj->wind = [];
        $lastDayDataObj->time = [];

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
