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
    public function update(Request $request)
    {
        $timeData = $request->all();

        if (isset($timeData['day'])) {
            //
        } elseif (isset($timeData['month'])) {
            $result = Meteo::getMonthData($timeData['month'], $timeData['year']);
        } elseif (isset($timeData['year'])) {
            $result = Meteo::getYearData(($timeData['year']));
        } else {
            $result = Meteo::getLastDayData();
        }

        return $result;
    }
}
