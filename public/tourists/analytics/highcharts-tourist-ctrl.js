/* global angular */

angular
    .module("app")
    .controller("HighchartsTourist", ["$scope",
        "$http",
        "$routeParams",
        function($scope, $http, $routeParams) {

            var API = "/api/v1/tourists-by-countries";
            var tourists = [];
            $http.get(API).then(function(response) {

                tourists = response.data;
                //});



                var years = tourists.map(function(item) {

                    var newItem = item.year;
                    return newItem;

                });

                let sinRepetidos = years.filter((valor, indiceActual, arreglo) => arreglo.indexOf(valor) === indiceActual).sort();

                var naturalChina = sinRepetidos.map(function(year) {
                    var touristDeparture = ""
                    var filter = tourists.filter(function(n) {
                        if (n.country == "China" && n.year == year) {
                            touristDeparture = n.touristDeparture;
                        }
                        return (n.country == "China" && n.year == year);

                    });

                    if (filter.length == 0) {
                        return touristDeparture;
                    } else {
                        return touristDeparture;
                    }

                });

                var naturalSpain = sinRepetidos.map(function(year) {
                    var touristDeparture = ""
                    var filter = tourists.filter(function(n) {
                        if (n.country == "Spain" && n.year == year) {
                            touristDeparture = n.touristDeparture;
                        }
                        return (n.country == "Spain" && n.year == year);

                    });

                    if (filter.length == 0) {
                        return touristDeparture;
                    } else {
                        return touristDeparture;
                    }

                });
                var naturalGermany = sinRepetidos.map(function(year) {
                    var touristDeparture = ""
                    var filter = tourists.filter(function(n) {
                        if (n.country == "Germany" && n.year == year) {
                            touristDeparture = n.touristDeparture;
                        }
                        return (n.country == "Germany" && n.year == year);

                    });

                    if (filter.length == 0) {
                        return touristDeparture;
                    } else {
                        return touristDeparture;
                    }

                });

                var naturalUSA = sinRepetidos.map(function(year) {
                    var touristDeparture = ""
                    var filter = tourists.filter(function(n) {
                        if (n.country == "USA" && n.year == year) {
                            touristDeparture = n.dryNaturalGas;
                        }
                        return (n.country == "USA" && n.year == year);

                    });

                    if (filter.length == 0) {
                        return touristDeparture;
                    } else {
                        return touristDeparture;
                    }

                });

                var naturalColombia = sinRepetidos.map(function(year) {
                    var touristDeparture = ""
                    var filter = tourists.filter(function(n) {
                        if (n.country == "Colombia" && n.year == year) {
                            touristDeparture = n.touristDeparture;
                        }
                        return (n.country == "Colombia" && n.year == year);

                    });

                    if (filter.length == 0) {
                        return touristDeparture;
                    } else {
                        return touristDeparture;
                    }

                });

                Highcharts.chart('container', {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'tourist Departure by Year'
                    },
                    xAxis: {
                        categories: sinRepetidos,
                        crosshair: true
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Billions Cubic Feet'
                        }
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                            '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0
                        }
                    },
                    series: [{
                        name: 'China',
                        data: naturalChina

                    }, {
                        name: 'Spain',
                        data: naturalSpain

                    }, {
                        name: 'Germany',
                        data: naturalGermany

                    }, {
                        name: 'USA',
                        data: naturalUSA

                    }, {
                        name: 'Colombia',
                        data: naturalColombia

                    }]
                });



            });
        }
    ]);