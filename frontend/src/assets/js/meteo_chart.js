var HOURS = [];
for (var i = 0; i >= 23; i++) {
	if (i < 10) {
		HOURS.push('0' + i + ':00');
	} else {
		HOURS.push(i + ':00');
	}
}
var chartData = document.getElementById('chart').getAttribute('data-chart').replace(/\//g, "-");
var chart = JSON.parse(chartData);
var config = {
	type: 'line',
	data: {
		labels: chart.hours,
		datasets: [{
			label: 'Температура',
			backgroundColor: 'orangered',
			borderColor: 'orangered',
			data: chart.temperature,
			fill: false,
		},
		{
			label: 'Ветер',
			backgroundColor: 'skyblue',
			borderColor: 'skyblue',
			data: chart.wind,
			fill: false,
		}]
	},
	options: {
		responsive: true,
		title: {
			display: true,
			text: 'ГРАФИК ТЕМПЕРАТУРЫ',
			fontSize: 32,
		},
		tooltips: {
			mode: 'index',
			intersect: false,
		},
		hover: {
			mode: 'nearest',
			intersect: true
		},
		scales: {
			xAxes: [{
				display: true,
				scaleLabel: {
					display: true,
					labelString: 'ВРЕМЯ',
					fontSize: 32,
					fontFamily: 'Roboto',
					backgroundColor: 'skyblue',
				}
			}],
			yAxes: [{
				display: true,
				scaleLabel: {
					display: true,
					labelString: 'ТЕМПЕРАТУРА',
					fontSize: 32,
					fontFamily: 'Roboto'
				}
			}]
		}
	}
};

window.onload = function() {
	var ctx = document.getElementById('canvas').getContext('2d');
	window.myLine = new Chart(ctx, config);
};