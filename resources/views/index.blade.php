@extends('layouts.page')

@section('content')
    <div id="meteo" data-meteo='{{ $meteo }}'></div>
    <div id="graph" data-graph='{{ $graph }}'></div>
    <div id="timeout" data-timeout='{{ env('APP_DATA_UPDATE_TIMEOUT') }}'></div>
    <div id="root"></div>

    <script src="{{ mix('js/index.js') }}"></script>
@endsection
