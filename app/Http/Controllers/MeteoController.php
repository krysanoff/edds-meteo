<?php

namespace App\Http\Controllers;

class MeteoController extends Controller
{
    /**
     * Getting last meteo data
     *
     */
    public function last()
    {
        // Select last meteo data from DB

        // Get
        echo 'last';
    }

    /**
     * Insert new meteo data
     */
    public function new()
    {
        // Connect to meteo station host

        // Get data from the host

        // Insert data into DB table
        echo 'new';
    }
}
