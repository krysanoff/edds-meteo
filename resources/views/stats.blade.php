@extends('layouts.page')

@section('content')
    <div id="graph" data-graph='{{ $graph }}'></div>
    <div id="earliestYear" data-year='{{ $earliestYear }}'></div>
    <div id="root"></div>

    <script src="{{ mix('js/graph.js') }}"></script>
@endsection
