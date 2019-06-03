angular
    .module("app")
    .controller("integracionPopulationsEmi", ["$scope", "$http",
        function($scope, $http) {
            console.log("integracionPopulationsEmi");

            var API = "api/v1/emigrations-by-countries";
            var API2 = "https://sos1819-09.herokuapp.com/api/v1/populationstats";



            $http.get(API).then(function(response) {
                $http.get(API2).then(function(response1) {


                    // Define custom series type for displaying low/med/high values using boxplot as a base
                    Highcharts.seriesType('lowmedhigh', 'boxplot', {
                        keys: ['low', 'median', 'high']
                    }, {
                        // Change point shape to a line with three crossing lines for low/median/high
                        // Stroke width is hardcoded to 1 for simplicity
                        drawPoints: function() {
                            var series = this;
                            Highcharts.each(this.points, function(point) {
                                var graphic = point.graphic,
                                    verb = graphic ? 'animate' : 'attr',
                                    shapeArgs = point.shapeArgs,
                                    width = shapeArgs.width,
                                    left = Math.floor(shapeArgs.x) + 0.5,
                                    right = left + width,
                                    crispX = left + Math.round(width / 2) + 0.5,
                                    highPlot = Math.floor(point.highPlot) + 0.5,
                                    medianPlot = Math.floor(point.medianPlot) + 0.5,
                                    lowPlot = Math.floor(point.lowPlot) + 0.5 - (point.low === 0 ? 1 : 0); // Sneakily draw low marker even if 0

                                if (!graphic) {
                                    point.graphic = graphic = series.chart.renderer.path('point').add(series.group);
                                }

                                graphic.attr({
                                    stroke: point.color || series.color,
                                    "stroke-width": 1
                                });

                                graphic[verb]({
                                    d: [
                                        'M', left, highPlot,
                                        'H', right,
                                        'M', left, medianPlot,
                                        'H', right,
                                        'M', left, lowPlot,
                                        'H', right,
                                        'M', crispX, highPlot,
                                        'V', lowPlot
                                    ]
                                });
                            });
                        }
                    });

                    // Create chart
                    var chart = Highcharts.chart('container', {
                        chart: {
                            type: 'lowmedhigh'
                        },
                        accessibility: {
                            keyboardNavigation: {
                                skipNullPoints: true
                            },
                            pointDescriptionFormatter: function(point) {
                                return point.category + ', low ' + point.low + ', median ' + point.median + ', high ' + point.high;
                            },
                            seriesDescriptionFormatter: function(series) {
                                return series.name + ', series ' + (series.index + 1) + ' of ' + series.chart.series.length + ' with ' + series.points.length + ' data points.';
                            },
                            typeDescription: 'Low, median, high. Each data point has a low, median and high value, depicted vertically as small ticks.', // Describe the chart type to screen reader users, since this is not a traditional boxplot chart
                            description: 'Chart depicting fictional fruit consumption data, with the minimum, maximum and median values for each month of 2015. Most plums were eaten in spring, and none at all in July or August. Bananas and apples were both consumed in smaller numbers and steadily throughout the year.'
                        },
                        title: {
                            text: 'Total Emigrant / Total Populations'
                        },
                        xAxis: [{
                            crosshair: true,
                            accessibility: {
                                description: 'Paises'
                            },
                            categories: [response.data[0].country + " " + response.data[0].year,
                                response.data[1].country + " " + response.data[1].year,
                                response.data[3].country + " " + response.data[3].year
                            ]
                        }],
                        yAxis: {
                            title: {
                                text: 'Personas'
                            },
                            min: 0
                        },
                        plotOptions: {
                            series: {
                                stickyTracking: true,
                                whiskerWidth: 5
                            }
                        },
                        tooltip: {
                            pointFormat: '<span style="color:{point.color}">●</span> {series.name}:<br/>Low: <b>{point.low}</b><br/>Median: <b>{point.median}</b><br/>High: <b>{point.high}</b><br/>'
                        },
                        series: [{
                            name: 'Total Emigrant',
                            data: [
                                [0, 0, parseInt(response.data.filter(d => d.country == response.data[0].country).map(function(d) { return d["totalemigrant"] }))],
                                [0, 0, parseInt(response.data.filter(d => d.country == response.data[1].country).map(function(d) { return d["totalemigrant"] }))],
                                [0, 0, parseInt(response.data.filter(d => d.country == response.data[3].country).map(function(d) { return d["totalemigrant"] }))]
                            ]
                        }, {
                            name: 'Total Populations',
                            data: [
                                [0, 0, parseInt(response1.data.filter(d => d.country == response1.data[7].country).map(function(d) { return d["totalpopulation"] }))],
                                [0, 0, parseInt(response1.data.filter(d => d.country == response1.data[5].country).map(function(d) { return d["totalpopulation"] }))],
                                [0, 0, parseInt(response1.data.filter(d => d.country == response1.data[4].country).map(function(d) { return d["totalpopulation"] }))]
                            ]
                        }]
                    });

                    // Remove click events on container to avoid having "clickable" announced by AT
                    // These events are needed for custom click events, drag to zoom, and navigator
                    // support.
                    chart.container.onmousedown = null;
                    chart.container.onclick = null;

                })

            })
        }
    ]);
