angular
    .module("app")
    .controller("integracionhappines", ["$scope", "$http",
        function($scope, $http) {
            console.log("integracionhappines");

            var API = "api/v1/emigrations-by-countries";
            var API2 = "https://sos1819-04.herokuapp.com/api/v1/happiness-stats";



            $http.get(API).then(function(response) {
                $http.get(API2).then(function(response1) {


                    google.charts.load('current', { 'packages': ['corechart'] });
                    google.charts.setOnLoadCallback(drawChart);

                    function drawChart() {

                        var data = google.visualization.arrayToDataTable([
                            ['Effort', 'Amount given'],
                            [response.data[0].country, parseInt(response.data.filter(d => d.country == response.data[0].country).map(function(d) { return d["totalemigrant"] }))],
                        ]);

                        var options = {
                            pieHole: 0.5,
                            pieSliceTextStyle: {
                                color: 'black',
                            },
                            legend: 'none'
                        };

                        var chart = new google.visualization.PieChart(document.getElementById('donut_single'));
                        chart.draw(data, options);
                    }





                });
            })


        }
    ]);





google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

    var data = google.visualization.arrayToDataTable([
        ['Effort', 'Amount given'],
        ['My all', 100],
    ]);

    var options = {
        pieHole: 0.5,
        pieSliceTextStyle: {
            color: 'black',
        },
        legend: 'none'
    };

    var chart = new google.visualization.PieChart(document.getElementById('donut_single'));
    chart.draw(data, options);
}
