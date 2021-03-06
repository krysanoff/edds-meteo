<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use \App\Http\Controllers\MeteoController;
use \App\Http\Controllers\GraphController;

Route::get('/', function () {
    $meteo = new MeteoController();
    $graph = new GraphController();

    return view('index', [
        'meteo' => $meteo->last(),
        'graph' => $graph->getLastDay(),
        'earliestYear' => $graph->getFirstYear()
    ]);
});
