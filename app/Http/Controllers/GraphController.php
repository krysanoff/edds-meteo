<?php

namespace App\Http\Controllers;

use App\Edds\Graph;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\View\View;
use PHPUnit\Util\Json;

class GraphController extends Controller
{
    public $graph;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->graph = new Graph();
    }

    /**
     * Get data from DB for last day
     */
    public function getLastDay()
    {
        $lastDay = $this->graph->getLastDayData();

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

    /**
     * Get custom data
     *
     * @param mixed $year
     * @param mixed $month
     * @param mixed $day
     *
     * @return Json
     */
    public function update($year = null, $month = null, $day = null)
    {
        if ($day) {
            $result = $this->graph->getDayData($day, $month, $year);
        } elseif ($month) {
            $result = $this->graph->getMonthData($month, $year);
        } elseif ($year) {
            $result = $this->graph->getYearData($year);
        } else {
            $result = $this->graph->getLastDayData();
        }

        return $result;
    }
}
