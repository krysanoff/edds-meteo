<?php

namespace App\Http\Controllers;

use App\Edds\Meteo;

class MeteoController extends Controller
{
    /**
     * Getting last meteo data
     *
     */
    public function last()
    {
        // Select last meteo data from DB
        $lastParams = Meteo::find();

        var_dump($lastParams->wind);
    }

    /**
     * Insert new meteo data
     */
    public function new()
    {
        // Connect to meteo station host and get meteo data
        $meteo = new Meteo;
        $meteo->getMeteoData();

        // Insert data into DB table
        $meteo->add();
    }
}
