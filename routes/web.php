<?php

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

// Web page
$router->get('/', function () use ($router) {

	$loader = new Twig_Loader_Filesystem('../resources/views');
    $twig = new Twig_Environment($loader, array(
	    //'cache' => '../storage/framework/cache/twig',
	));
    $template = $twig->load('index.html');

	return $template->render(array('the' => 'variables new', 'go' => 'here'));
});

// Routes for meteo data handling
$router->group(['prefix' => 'meteo'], function () use ($router) {
    $router->get('last', function () {

        // Render index view
        return 'get meteo data';
    });

   // $router->get('new', MeteoController\new());
});


// Routes for graph data handling
$router->group(['prefix' => 'graph'], function () use ($router) {
    $router->get('{period}', function ($period) {

        // Render index view
        return $period;
    });
});
