<?php

namespace App\Http\Controllers;

use App\Edds\Meteo;

class MeteoController extends Controller
{
    public $meteo;

    public function __construct()
    {
        $this->meteo = new Meteo();
    }

    /**
     * Getting last meteo data
     *
     */
    public function last()
    {
        return $this->meteo->getLastMeteoData();
    }

    /**
     * Insert new meteo data
     */
    public function new()
    {
        // Connect to meteo station host and get meteo data
        $this->meteo->getMeteoData();

        // Insert data into DB table
        $this->meteo->add();
    }
}
