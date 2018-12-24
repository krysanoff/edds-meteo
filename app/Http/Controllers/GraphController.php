<?php

namespace App\Http\Controllers;

use App\Edds\Meteo;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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

    /*
     * Get the earliest year of meteo data
     */
    public function getFirstYear()
    {
        $earliestDate = DB::table('meteo')
            ->select(['created_at'])
            ->orderBy('created_at', 'ASC')
            ->first();

        $dt = Carbon::parse($earliestDate->created_at);

        return $dt->year;
    }

    /*
     * Get custom data
     */
    public function update($year = null, $month = null, $day = null, Request $request)
    {
        if ($day) {
            $result = Meteo::getDayData($day, $month, $year);
        } elseif ($month) {
            $result = Meteo::getMonthData($month, $year);
        } elseif ($year) {
            $result = Meteo::getYearData($year);
        } else {
            $result = Meteo::getLastDayData();
        }

        return $result;
    }
}
