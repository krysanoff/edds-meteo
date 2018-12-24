<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('graph')->group(function () {
    Route::get('update/{year?}/{month?}/{day?}', 'GraphController@update');
});

Route::prefix('meteo')->group(function () {
    Route::get('last/day/{day?}', 'MeteoController@last');
    Route::get('new', 'MeteoController@new');
});
