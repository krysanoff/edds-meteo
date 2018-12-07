<?php
use \App\Http\Controllers\MeteoController;
use \App\Http\Controllers\GraphController;
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/
$loader = new Twig_Loader_Filesystem('../resources/views');
$twig = new Twig_Environment($loader, array(
    //'cache' => '../storage/framework/cache/twig',
));
// Web page
$router->get('/', function () use ($router, $loader, $twig) {
    $template = $twig->load('index.html');
    $meteo = new MeteoController();
    $graph = new GraphController();

	return $template->render(array('meteo' => $meteo->last(), 'graph' => $graph->getLastDay()));
});

// Routes for meteo data handling
$router->group(['prefix' => 'meteo'], function () use ($router) {
    $router->get('last', 'MeteoController@last');
    $router->get('new', 'MeteoController@new');
});


// Routes for graph data handling
$router->group(['prefix' => 'graph'], function () use ($router) {
    $router->get('/lastday', 'GraphController@getLastDay');
});
