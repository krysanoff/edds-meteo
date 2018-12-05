<?php

namespace App\Http\Controllers;

use App\Edds\Meteo;
use Illuminate\View\View;

class GraphController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Get data from DB for last day
     */
    public function getLastDay()
    {
        $lastDay = Meteo::getLastDayData();

        if ($lastDay) {
            return $lastDay;
        }

        return false;
    }
}
