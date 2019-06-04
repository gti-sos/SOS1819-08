angular
    .module("app")
    .controller("integracionTourist", ["$scope", "$http", "$httpParamSerializer",
            function($scope, $http, $httpParamSerializer) {
                console.log("integracionTourist!");

                var API = "api/v1/tourists-by-countries";
                var API1 = "api/v1/emigrations-by-countries";
                var API2 = "https://sos1819-04.herokuapp.com/api/v1/beer-consumed-stats";
                var API3 = "https://sos1819-09.herokuapp.com/api/v2/climate-stats";
                var API4 = "https://sos1819-14.herokuapp.com/api/v1/deceaseds/";
                var API5 = "https://sos1819-11.herokuapp.com/api/v1/general-public-expenses";
                


                $http.get(API).then(function(response) {
                    $http.get(API1).then(function(response1) {

                        Highcharts.chart('integracion1', {
                            chart: {
                                type: 'column'
                            },
                            title: {
                                text: 'integrations tourist by countries and emigrations by countries'
                            },
                            xAxis: {
                                categories: ['Spain', 'China', 'Colombia', 'Germany', 'USA']
                            },
                            credits: {
                                enabled: false
                            },
                            series: [{
                                name: 'Tourists Departure',
                                data: [parseInt(response.data.filter(d => d.country == 'Spain').map(function(d) { return d["touristDeparture"] })),
                                    parseInt(response.data.filter(d => d.country == 'China').map(function(d) { return d["touristDeparture"] })),
                                    parseInt(response.data.filter(d => d.country == 'Colombia').map(function(d) { return d["touristDeparture"] })),
                                    parseInt(response.data.filter(d => d.country == 'Germany').map(function(d) { return d["touristDeparture"] })),
                                    parseInt(response.data.filter(d => d.country == 'USA').map(function(d) { return d["touristDeparture"] }))

                                ]
                            }, {
                                name: 'Income Tourist',
                                data: [parseInt(response.data.filter(d => d.country == 'Spain').map(function(d) { return d['incomeTourist'] })),
                                    parseInt(response.data.filter(d => d.country == 'China').map(function(d) { return d['incomeTourist'] })),
                                    parseInt(response.data.filter(d => d.country == 'Colombia').map(function(d) { return d['incomeTourist'] })),
                                    parseInt(response.data.filter(d => d.country == 'Germany').map(function(d) { return d['incomeTourist'] })),
                                    parseInt(response.data.filter(d => d.country == 'USA').map(function(d) { return d['incomeTourist'] }))
                                ]
                            }, {
                                name: 'arrival Tourist',
                                data: [parseInt(response.data.filter(d => d.country == 'Spain').map(function(d) { return d['arrivalTourist'] })),
                                    parseInt(response.data.filter(d => d.country == 'China').map(function(d) { return d['arrivalTourist'] })),
                                    parseInt(response.data.filter(d => d.country == 'Colombia').map(function(d) { return d['arrivalTourist'] })),
                                    parseInt(response.data.filter(d => d.country == 'Germany').map(function(d) { return d['arrivalTourist'] })),
                                    parseInt(response.data.filter(d => d.country == 'USA').map(function(d) { return d['arrivalTourist'] }))
                                ]
                            }, {
                                name: 'total emigrations',
                                data: [parseInt(response1.data.filter(d => d.country == 'Spain').map(function(d) { return d['totalemigrant'] })),
                                    parseInt(response1.data.filter(d => d.country == 'China').map(function(d) { return d['totalemigrant'] })),
                                    parseInt(response1.data.filter(d => d.country == 'Colombia').map(function(d) { return d['totalemigrant'] })),
                                    parseInt(response1.data.filter(d => d.country == 'Germany').map(function(d) { return d['totalemigrant'] })),
                                    parseInt(response1.data.filter(d => d.country == 'USA').map(function(d) { return d['totalemigrant'] }))
                                ]
                            }, {
                                name: 'emigrant man',
                                data: [parseInt(response1.data.filter(d => d.country == 'Spain').map(function(d) { return d['emigrantman'] })),
                                    parseInt(response1.data.filter(d => d.country == 'China').map(function(d) { return d['emigrantman'] })),
                                    parseInt(response1.data.filter(d => d.country == 'Colombia').map(function(d) { return d['emigrantman'] })),
                                    parseInt(response1.data.filter(d => d.country == 'Germany').map(function(d) { return d['emigrantman'] })),
                                    parseInt(response1.data.filter(d => d.country == 'USA').map(function(d) { return d['emigrantman'] }))
                                ]
                            }, {
                                name: 'emigrant woman',
                                data: [parseInt(response1.data.filter(d => d.country == 'Spain').map(function(d) { return d['emigrantwoman'] })),
                                    parseInt(response1.data.filter(d => d.country == 'China').map(function(d) { return d['emigrantwoman'] })),
                                    parseInt(response1.data.filter(d => d.country == 'Colombia').map(function(d) { return d['emigrantwoman'] })),
                                    parseInt(response1.data.filter(d => d.country == 'Germany').map(function(d) { return d['emigrantwoman'] })),
                                    parseInt(response1.data.filter(d => d.country == 'USA').map(function(d) { return d['emigrantwoman'] }))
                                ]
                            }]
                        });
                    })

                })


var API = "api/v1/tourists-by-countries";
var API2 = "https://sos1819-04.herokuapp.com/api/v1/beer-consumed-stats";

$http.get(API).then(function(response) {
$http.get(API2).then(function(response2) {
               
am4core.ready(function() {

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

var chart = am4core.create("integracion2", am4charts.SlicedChart);
chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

chart.data = [{
    "name": "Spain rating",
    "value": parseInt(response2.data.filter(d => d.country == 'Spain').map(function(d) { return d['rating'] }))
}, {
    "name": "Germany rating",
    "value": parseInt(response2.data.filter(d => d.country == 'Germany').map(function(d) { return d['rating'] }))

}, {
    "name": "Spain llegada de turistas",
    "value": parseInt(response.data.filter(d => d.country == 'Spain').map(function(d) { return d["arrivalTourist"] })),
}, {
    "name": "Alemania llegada de turistas",
    "value": parseInt(response.data.filter(d => d.country == 'Germany').map(function(d) { return d["arrivalTourist"] }))

}];

var series = chart.series.push(new am4charts.FunnelSeries());
series.colors.step = 2;
series.dataFields.value = "value";
series.dataFields.category = "name";
series.alignLabels = true;

series.labelsContainer.paddingLeft = 15;
series.labelsContainer.width = 200;

//series.orientation = "horizontal";
//series.bottomRatio = 1;

chart.legend = new am4charts.Legend();
chart.legend.position = "left";
chart.legend.valign = "bottom";
chart.legend.margin(5,5,20,5);

});

})
})
                $http.get(API).then(function(response) {
                    $http.get(API3).then(function(response3) {

                            Highcharts.chart('integracion3', {
                                    chart: {
                                        type: 'packedbubble',
                                        height: '100%'
                                    },
                                    title: {
                                        text: 'integrations tourist by countries and climate stats'
                                    },
                                    tooltip: {
                                        useHTML: true,
                                        pointFormat: '<b>{point.name}:</b> {point.value}<sub></sub>'
                                    },
                                    plotOptions: {
                                        packedbubble: {
                                            minSize: '20%',
                                            maxSize: '100%',
                                            zMin: 0,
                                            zMax: 1000,
                                            layoutAlgorithm: {
                                                gravitationalConstant: 0.05,
                                                splitSeries: true,
                                                seriesInteraction: false,
                                                dragBetweenSeries: true,
                                                parentNodeLimit: true
                                            },
                                            dataLabels: {
                                                enabled: true,
                                                format: '{response.countries}',
                                                filter: {
                                                    property: 'y',
                                                    operator: '>',
                                                    value: 250
                                                },
                                                style: {
                                                    color: 'black',
                                                    textOutline: 'none',
                                                    fontWeight: 'normal'
                                                }
                                            }
                                        }
                                    },
                                    series: [{
                                            name: 'Europe',
                                            data: [
                                                {
                                                    name: 'Germany',
                                                    value: parseInt(response.data.filter(d => d.country == 'Germany').map(function(d) { return d['arrivalTourist'] }))
                                                },
                                                {
                                                    name: 'Germany',
                                                    value: parseInt(response3.data.filter(d => d.country == 'Germany').map(function(d) { return d['nitrous_oxide_stast'] }))
                                                },
                                                {
                                                    name: "Spain",
                                                    value: parseInt(response.data.filter(d => d.country == 'Spain').map(function(d) { return d["arrivalTourist"] }))
                                                },{
                                                    name: "Spain",
                                                    value: parseInt(response3.data.filter(d => d.country == 'Spain').map(function(d) { return d['methane_stats'] }))
                                                }]
                                            
                                        }, {
                                            name: 'North America',
                                            data: [{
                                                name: "USA",
                                                value: parseInt(response3.data.filter(d => d.country == 'United States').map(function(d) { return d['methane_stats'] }))
                                            }]
                                        }, {
                                            name: 'South America',
                                            data: [{
                                                    name: "Colombia",
                                                    value: parseInt(response.data.filter(d => d.country == 'Colombia').map(function(d) { return d['arrivalTourist'] }))
                                                }]
                                            },
                                            {
                                                name: 'Asia',
                                                data: [{
                                                        name: "China",
                                                        value: parseInt(response.data.filter(d => d.country == 'China').map(function(d) { return d['arrivalTourist'] }))
                                                    },
                                                    {
                                                        name: "Russia",
                                                        value: parseInt(response3.data.filter(d => d.country == 'Rusia').map(function(d) { return d['methane_stats'] }))
                                                    }              ]
                            }]
                        });
                    })

                })  

 var API = "api/v1/tourists-by-countries";
 var API4 = "https://sos1819-14.herokuapp.com/api/v1/deceaseds/";

$http.get(API).then(function(response) {
$http.get(API4).then(function(response4) {
               
     
           google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = google.visualization.arrayToDataTable([
           ['Pais', 'llegada de touristas', 'penalty' ],
          ['Spain',parseInt(response.data.filter(d => d.country == 'Spain').map(function(d) { return d['arrivalTourist'] })),parseInt(response4.data.filter(d=> d.province=='Huelva' && d.year == 2015).map(function(d) { return d['penalty'] }))],
          ['Spain1', parseInt(response.data.filter(d => d.country == 'Spain').map(function(d) { return d['touristDeparture'] })),parseInt(response4.data.filter(d=> d.province=='Soria' && d.year == 2017).map(function(d) { return d['penalty'] }))]
        ]);

        var options = {
          title: 'integracion deceaseds',
          curveType: 'function',
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('integracion4'));

        chart.draw(data, options);
      }          
    
 })
 })  


               
$http.get(API).then(function(response) {
$http.get(API5).then(function(response5) {
               
               
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        var data1 = google.visualization.arrayToDataTable([
          ['años', 'Penaltis/llegada de touristas'],
          ['germany', parseInt(response5.data.filter(d=> d.country == 'germany' && d.year == 2017).map(function(d) { return d['publicSpending'] }))],
          ['france',parseInt(response5.data.filter(d=> d.country == 'france' && d.year == 2017).map(function(d) { return d['publicSpending'] }))],
          ['China',  parseInt(response.data.filter(d => d.country == 'China').map(function(d) { return d['arrivalTourist'] }))],
          ['Spain', parseInt(response.data.filter(d => d.country == 'Spain').map(function(d) { return d['arrivalTourist'] }))]
          
        ]);

        var options1 = {
          title: 'integrations tourist by countries and beer consumed stats'
        };

        var chart = new google.visualization.PieChart(document.getElementById('integracion5'));

        chart.draw(data1, options1);
      }
               
               
               
               
               
                    })
                })
                


var API = "api/v1/tourists-by-countries";  
var API6 = "https://sos1819-06.herokuapp.com/api/v1/uefa-club-rankings/";
$http.get(API).then(function(response) {
$http.get(API6).then(function(response6) {
               
               


anychart.onDocumentReady(function () {
    // create data set on our data
    var dataSet = anychart.data.set([
        ['arrivalTourist', parseInt(response.data.filter(d => d.country == 'Spain').map(function(d) { return d['arrivalTourist'] })), parseInt(response.data.filter(d => d.country == 'Germany').map(function(d) { return d['arrivalTourist'] }))],
        ['points', parseInt(response6.data.filter(d => d.country == 'Spainy' && d.season ==2017).map(function(d) { return d['points'] })), parseInt(response6.data.filter(d => d.country == 'Germany' && d.season ==2017).map(function(d) { return d['points'] }))],
        ['ptsbeforeseason',parseInt(response6.data.filter(d => d.country == 'Spain' && d.season ==2017).map(function(d) { return d['ptsbeforeseason'] })), parseInt(response6.data.filter(d => d.country == 'Germany' && d.season ==2017).map(function(d) { return d['ptsbeforeseason'] }))],
        ['touristDeparture', parseInt(response.data.filter(d => d.country == 'Spain').map(function(d) { return d['touristDeparture'] })), parseInt(response.data.filter(d => d.country == 'Germany').map(function(d) { return d['touristDeparture'] }))],
 //       ['incomeTourist', parseInt(response.data.filter(d => d.country == 'Spain').map(function(d) { return d['incomeTourist'] })), parseInt(response.data.filter(d => d.country == 'Germany').map(function(d) { return d['incomeTourist'] }))],
        
    ]);

    // map data for the first series, take x from the zero column and value from the first column of data set
    var data1 = dataSet.mapAs({'x': 0, 'value': 1});
    // map data for the second series, take x from the zero column and value from the second column of data set
    var data2 = dataSet.mapAs({'x': 0, 'value': 2});
    // map data for the third series, take x from the zero column and value from the third column of data set
 

    // create radar chart
    var chart = anychart.radar();

    // set chart title text settings
    chart.title('Comparison Chart')
            // set chart legend
            .legend(true);

    // set chart padding settings
    chart.padding().bottom(70);

    // set chart yScale settings
    chart.yScale()
            .minimum(50000)
            .maximum(200000)
            .ticks({'interval': 50000});

    // create chart label with description
    chart.label()
            .text('Integracion uefa club rankings.')
            .anchor('center-bottom')
            .position('center-bottom')
            .fontWeight('normal')
            .fontSize(11)
            .fontFamily('tahoma')
            .fontColor('rgb(35,35,35)')
            .offsetY(15);

    // create first series with mapped data
    chart.line(data1).name('Spain').markers(true);
    // create second series with mapped data
    chart.line(data2).name('Germnay').markers(true);
    // create third series with mapped data
 

    // set tooltip format
    chart.tooltip().format('Value: {%Value}{decimalsCount: 2}');

    // set container id for the chart
    chart.container('integracion6');
    // initiate chart drawing
    chart.draw();
});
 })
 })
                           
 var API = "api/v1/tourists-by-countries";
 var API7 = "https://sos1819-02.herokuapp.com/api/v1/companies-stats";

$http.get(API).then(function(response) {
$http.get(API7).then(function(response7) {
               
     
am4core.ready(function() {

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
var chart = am4core.create("integracion7", am4charts.PieChart);

// Add data
chart.data = [ {
  "country": "Japon",
  "employee": parseInt(response7.data.filter(d => d.country == 'Japon').map(function(d) { return d['employee'] }))
}, {
  "country": "España",
  "employee": parseInt(response7.data.filter(d => d.country == 'España').map(function(d) { return d['employee'] }))
}, {
  "country": "Spain",
  "arrivalTourist": parseInt(response.data.filter(d => d.country == 'Spain').map(function(d) { return d['arrivalTourist'] }))
}, {
  "country": "Germany",
  "arrivalTourist": parseInt(response.data.filter(d => d.country == 'Germany').map(function(d) { return d['arrivalTourist'] }))
}];

// Set inner radius
chart.innerRadius = am4core.percent(50);

// Add and configure Series
var pieSeries = chart.series.push(new am4charts.PieSeries());
pieSeries.dataFields.value = "";
pieSeries.dataFields.category = "country";
pieSeries.slices.template.stroke = am4core.color("#fff");
pieSeries.slices.template.strokeWidth = 2;
pieSeries.slices.template.strokeOpacity = 1;

// This creates initial animation
pieSeries.hiddenState.properties.opacity = 1;
pieSeries.hiddenState.properties.endAngle = -90;
pieSeries.hiddenState.properties.startAngle = -90;

}); // end am4core.ready()

})
})
    
    
 var APIE1 = "https://api.openbrewerydb.org/breweries";
 var API = "api/v1/tourists-by-countries";
 

$http.get(API).then(function(response) {     

 $http.get(APIE1).then(function(responseE1) {                  



    new RGraph.SVG.Rose({
        id: 'integracionE1',
        data: [parseInt(responseE1.data.filter(d => d.city == 'Birmingham').map(function(d) { return d['phone'] })),parseInt(response.data.filter(d => d.country == 'USA').map(function(d) { return d['incomeTourist'] }))],
        options: {
            colors: [ 'rgba(255,0,0,0.5)', 'rgba(0,255,0,0.5)', 'rgba(0,0,255,0.5)' ],
            backgroundGridRadialsCount: 0,
            linewidth: 2,
            amargin: '5deg',
            labels: ['phone','incomeTourist'],
            tooltips: ['phone','incomeTourist'],
            linewidth: .5
        }
    }).draw();
                    
var APIE2 = "/proxyMLS";
 var API = "api/v1/tourists-by-countries";
 

$http.get(API).then(function(response) {     

 $http.get(APIE2).then(function(responseE1) {                  


anychart.onDocumentReady(function () {
    // create data set on our data
    var dataSet = anychart.data.set([
        ['poblacion oeste europa', parseInt(responseE1.data.filter(d => d.region == 'Europe' && d.subregion == "Western Europe").map(function(d) { return d['population'] }))],
        ['Colombia salida de turistas', parseInt(response.data.filter(d => d.country == 'Colombia').map(function(d) { return d['touristDeparture'] }))],
        ['Germany salida de turistas', parseInt(response.data.filter(d => d.country == 'Germany').map(function(d) { return d['touristDeparture'] }))]
        
    ]);

    // map data for the first series, take x from the zero column and value from the first column of data set
    var seriesData = dataSet.mapAs({'x': 0, 'value': 1});

    // create area chart
    var chart = anychart.area();

    // adding dollar symbols to yAxis labels
    chart.yAxis().labels().format('{%Value}');

    // turn on chart animation
    chart.animation(true);

    // axes and scale settings
    chart.yScale()
            .minimum(9000000)
            .maximum(30000);
    chart.yAxis().title('integracion2');
    chart.xAxis().labels().padding([5, 5, 0, 5]);

    // chart grids
    chart.yGrid(true)
            .xGrid(true);

    // turn on the crosshair
    var crosshair = chart.crosshair();
    crosshair.enabled(true)
            .yStroke(null)
            .xStroke('#fff')
            .zIndex(99);
    crosshair.yLabel(false);
    crosshair.xLabel(false);

    // set chart title text settings
    chart.title()
            .enabled(true)
            .useHtml(true)
            .text('AVERAGE MONTHLY HOURS OF SUNSHINE OVER THE YEAR<br/>' +
                    '<span style="color:#212121; font-size: 13px;">the monthly total of sunhours over the year in Sydney, Australia.</span>')
            .padding([0, 0, 20, 0]);

    // create first series with mapped data
    var series = chart.splineArea(seriesData);
    series.name('Sunhours');
    series.color('Gold 0.5');
    series.markers()
            .enabled(true)
            .type('circle')
            .size(4)
            .stroke('1.5 #fff')
            .zIndex(100);

    // set chart tooltip and interactivity settings
    chart.tooltip()
            .positionMode('chart')
            .anchor('right-top')
            .position('right-top')
            .offsetX(50)
            .offsetY(50);

    chart.interactivity().hoverMode('by-x');

    // set container id for the chart
    chart.container('integracionE2');

    // initiate chart drawing
    chart.draw();
});

   


 })

})
 
})
})


    $http.get("https://sos1819-12.herokuapp.com/api/v1/life-expectancy-stats/").then(function(response) {
        $scope.datoscomp = response.data;
        $scope.status = response.status;
        console.log($scope.datoscomp);
    }, function(response) {
        $scope.datoscomp = response.data || 'Request failed';
        $scope.status = response.status;
    })
    
          
                
}]);