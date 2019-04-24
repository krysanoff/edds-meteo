<?php
/**
 * Created by PhpStorm.
 * User: Eugene Krysanov
 * Date: 24.04.2019
 * Time: 11:05
 */

namespace App\Edds;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;


class Graph extends Meteo
{
    /*
     * Get data for a month
     */
    public function getMonthData($month, $year)
    {
        $monthData = DB::table('meteo')
            ->whereYear('created_at', '=', $year)
            ->whereMonth('created_at', '=', $month)
            ->get();

        $sortedData = $this->createMeteoObject();

        foreach ($monthData as $meteo) {
            $time = Carbon::parse($meteo->created_at);

            if ($time->hour == 12 && $time->minute == 0) {
                $sortedData->temperature[] = $meteo->temperature;
                $sortedData->wind[] = $meteo->wind;
                $sortedData->time[] = $time->day;
            }
        }

        if ($sortedData) {
            return json_encode($sortedData);
        }

        Log::error('There is no any data for the chose period');

        return false;
    }

    /*
     * Get data for chose year
     */
    public function getYearData($year)
    {
        $yearData = DB::table('meteo')
            ->whereYear('created_at', $year)
            ->get();

        $sortedData = $this->createMeteoObject();

        $allMonthsTemperatures = [];

        foreach ($yearData as $meteo) {
            $parsedTime = Carbon::parse($meteo->created_at);

            $allMonthsTemperatures[$parsedTime->englishMonth]['t'][] = $meteo->temperature;
            $allMonthsTemperatures[$parsedTime->englishMonth]['w'][] = $meteo->wind;
        }

        foreach ($allMonthsTemperatures as $month => $params) {
            $sortedData->temperature[] = array_sum($params['t'])/count($params['t']);
            $sortedData->wind[] = array_sum($params['w'])/count($params['w']);
            $sortedData->time[] = $month;
        }

        if ($sortedData) {
            return json_encode($sortedData);
        }

        Log::error('There is no any data for the chose period');

        return false;
    }

    /*
     * Get chosen day's data
     * */
    public function getDayData($day, $month, $year)
    {
        $dayData = DB::table('meteo')
            ->whereYear('created_at', $year)
            ->whereMonth('created_at', $month)
            ->whereDay('created_at', $day)
            ->get();

        $sortedData = $this->createMeteoObject();

        foreach ($dayData as $meteo) {
            $time = Carbon::parse($meteo->created_at);

            if ($time->minute == 0) {
                $sortedData->temperature[] = $meteo->temperature;
                $sortedData->wind[] = $meteo->wind;
                $sortedData->time[] = $time->format("H:i");
            }
        }

        if ($sortedData) {
            return json_encode($sortedData);
        }

        Log::error('There is no any data for the chose period');

        return false;
    }

    /**
     * Create object with meteo properties
     *
     * @return object
     * */
    protected function createMeteoObject()
    {
        $newMeteoObj = new \stdClass();
        $newMeteoObj->temperature = [];
        $newMeteoObj->wind = [];
        $newMeteoObj->time = [];

        return $newMeteoObj;
    }
}
