<?php

namespace App\Edds;

use Illuminate\Database\Eloquent\Model;

class Meteo extends Model {

    protected $fillable = [];

    protected $dates = [];

    public static $rules = [
        // Validation rules
    ];

    protected $meteoData;
    protected $meteoJson;

    /**
     * Get fresh data from meteo station
     */
    public function getMeteoData()
    {
        if ($this->connectMeteoStation()) {
            $this->prepareData();
            return $this->meteoJson;
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
            $e->getMessage();
            return false;
        }
    }

    /**
     * Convert meteo station's data to JSON
     */
    protected function prepareData()
    {
        $draftArray = explode(",", $this->meteoData);
        array_shift($draftArray); // Shift key with command

        foreach ($draftArray as $param) {
            static $preparedArray = [];
            list($key, $value) = explode("=", $param);
            $preparedArray[$key] = substr($value, 0, strlen($value) - 1); // Remove last symbol
        }

        $this->meteoJson = json_encode($preparedArray);
    }
}
