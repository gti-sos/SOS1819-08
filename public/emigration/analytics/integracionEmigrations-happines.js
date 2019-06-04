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
                            [response.data[5].country + " "+ response.data[5].year, parseInt(response.data.filter(d => d.country == response.data[5].country).map(function(d) { return d["emigrantman"] }))],
                            [response1.data[0].country, parseInt(response1.data.filter(d => d.country == response1.data[0].country).map(function(d) { return d["happinessScore"] }))],
                            [response1.data[1].country, parseInt(response1.data.filter(d => d.country == response1.data[1].country).map(function(d) { return d["happinessScore"] }))],
                            [response1.data[2].country, parseInt(response1.data.filter(d => d.country == response1.data[2].country).map(function(d) { return d["happinessScore"] }))],
                            [response1.data[3].country, parseInt(response1.data.filter(d => d.country == response1.data[3].country).map(function(d) { return d["happinessScore"] }))],
                            [response1.data[4].country, parseInt(response1.data.filter(d => d.country == response1.data[4].country).map(function(d) { return d["happinessScore"] }))],
                            [response1.data[5].country, parseInt(response1.data.filter(d => d.country == response1.data[5].country).map(function(d) { return d["happinessScore"] }))],
                            [response1.data[6].country, parseInt(response1.data.filter(d => d.country == response1.data[6].country).map(function(d) { return d["happinessScore"] }))],
                            [response1.data[7].country, parseInt(response1.data.filter(d => d.country == response1.data[7].country).map(function(d) { return d["happinessScore"] }))],
                            [response1.data[8].country, parseInt(response1.data.filter(d => d.country == response1.data[8].country).map(function(d) { return d["happinessScore"] }))],
                            [response1.data[9].country, parseInt(response1.data.filter(d => d.country == response1.data[9].country).map(function(d) { return d["happinessScore"] }))],
                            [response1.data[10].country, parseInt(response1.data.filter(d => d.country == response1.data[10].country).map(function(d) { return d["happinessScore"] }))],
                            [response1.data[11].country, parseInt(response1.data.filter(d => d.country == response1.data[11].country).map(function(d) { return d["happinessScore"] }))]
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
