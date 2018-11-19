<?php

namespace App\Edds;

use Illuminate\Database\Eloquent\Model;

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

    /**
     * Get fresh data from meteo station
     *
     * @return void
     */
    public function getMeteoData()
    {
        if ($this->connectMeteoStation()) {
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
            $this->pressure = $this->meteoArray['Pa'];
            $this->relative_humidity = $this->meteoArray['Ua'];

            $this->save();
        }
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
     */
    protected function meteoDataToJSON()
    {
        $this->meteoJson = json_encode($this->meteoArray);
    }
}
