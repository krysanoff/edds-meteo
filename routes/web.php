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

Route::prefix('meteo')->group(function () {
    Route::get('last', 'MeteoController@last');
    Route::get('new', 'MeteoController@new');
});

Route::prefix('graph')->group(function () {
    Route::post('update', 'GraphController@update');
});
