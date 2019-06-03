/*global angular, am4core, RGraph */
 var API6="https://sos1819-06.herokuapp.com/api/v1/uefa-country-rankings"
            var API8 = "https://sos1819-08.herokuapp.com/api/v1/tourists-by-countries";
            var API = "https://sos1819-08.herokuapp.com/api/v1/expenses-of-countries-in-education-and-culture";
            var APIe1 ="https://sos1819-08.herokuapp.com/proxyExternal1"; 
            var API2="https://sos1819-02.herokuapp.com/api/v1/scorers-stats/";
            var API3 ="https://sos1819-03.herokuapp.com/api/v1/computers-attacks-stats";
            var API11="https://sos1819-11.herokuapp.com/api/v2/public-expenditure-educations";
//G08
angular
    .module("app")
    .controller("expensesG08ctrl", ["$scope", "$http",
        function($scope, $http) {
            console.log("integracion por expenses-tourist");
           
            


            $http.get(API).then(function(response) {
                $http.get(API8).then(function(response1) {
                     console.log("Data received: "+ JSON.stringify(response.data));
                    $scope.expenses = response.data;
                     console.log("Data received: "+ JSON.stringify(response1.data));
                    $scope.tourist = response1.data;
                        
                        
                      
                        
                    var data =[];
                    for(var i in response.data){
                        for(var j in response1.data){
                            if(response.data[i].country==response.data[j].country&&response.data[i].year==response1.data[j].year){
                                var dat={
                                    country: response.data.map(function(d) { return d["country"] })[i]+" "+ response.data.map(function(d) { return d["year"] })[i],  
                                expenses: response.data.map(function(d) { return d["countryExpense"] })[i],
                                tourists: response1.data.map(function(d) { return d["arrivalTourist"] })[j]}
                                data.push(dat);
                                }else{
                                    dat=dat;
                                }
                                
                            
                            
                        }
                        
                    }
                    console.log(data);
                    setTimeout(function(){
    

console.log("are we waiting?");
    

                    am4core.ready(function() {

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
var chart = am4core.create("chartdiv", am4charts.XYChart3D);
chart.data=data;

var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "country";
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.minGridDistance = 30;

var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.title.text = "Expenses/countries";
valueAxis.renderer.labels.template.adapter.add("text", function(text) {
  return text ;
})
                        
var series = chart.series.push(new am4charts.ColumnSeries3D());
series.dataFields.valueY = "tourists";
series.dataFields.categoryX = "country";
series.name = "tourists";
series.clustered = false;
series.columns.template.tooltipText = "tourist in {category} : [bold]{valueY}[/]";
series.columns.template.fillOpacity = 0.9;




var series2 = chart.series.push(new am4charts.ColumnSeries3D());
series2.dataFields.valueY = "expenses";
series2.dataFields.categoryX = "country";
series2.name = "expenses";
series2.clustered = false;
series2.columns.template.tooltipText = "expenses in {category} : [bold]{valueY}[/]";
                        
                    });
                    
                    }, 2000);
                    
                })
            });  
             
             
             
            
             
 }] )
 
 
 
 angular
    .module("app")
    .controller("expensesG06ctrl", ["$scope", "$http",
        function($scope, $http) {
            console.log("integracion por expenses-tourist");
           
            


            $http.get(API).then(function(response) {
                $http.get(API6).then(function(response1) {
                     console.log("Data received: "+ JSON.stringify(response.data));
                    $scope.expenses = response.data;
                     console.log("Data received: "+ JSON.stringify(response1.data));
                    $scope.tourist = response1.data;
                    
                    
                    
                     var data =[];
                    for(var i in response.data){
                        for(var j in response1.data){
                            if(response1.data[j].season ==response.data[i].year&& response.data[i].country==response1.data[j].country){
                                var dat=[     response.data.map(function(d) { return d["country"] })[i]+" "+response.data[i].year,  
                                 parseInt(response.data.map(function(d) { return d["countryExpense"] })[i]),
                                 response1.data.map(function(d) { return d["points"] })[j]];
                                data.push(dat);
                            }
                        }
                        
                    }
                    console.log("Datos finales: "+data);
                                
                   
                   
                   anychart.onDocumentReady(function () {
    // create data set on our data
    var dataSet = anychart.data.set(data);
    
    // map data for the first series, take x from the zero column and value from the first column of data set
    var seriesData_1 = dataSet.mapAs({'x': 0, 'value': 1});

    // map data for the second series, take x from the zero column and value from the second column of data set
    var seriesData_2 = dataSet.mapAs({'x': 0, 'value': 2});

    // create area chart
    var chart = anychart.area();

    // turn on chart animation
    chart.animation(true);
    chart.padding([10, 20, 5, 20]);

    // Y axis title
    chart.yAxis().title('points and expenses');
    // Y axis labels formatting
    chart.yAxis().labels().format('{%Value}');
    // Minimum and maximum
    chart.yScale()
            .minimum(0)
            .maximum(700000);

    // set chart title text settings
    chart.title()
            .enabled(true)
            .useHtml(true)
            .text('Integration with uefa country raitings by anychart<br/>' +
                    '<span style="color:#212121; font-size: 13px;"></span>');

    // create first series with mapped data
    var series_1 = chart.splineArea(seriesData_1);
    series_1.name('Expenses of countries');
    series_1.hovered().markers()
            .enabled(true)
            .type('circle')
            .size(10)
            .stroke('1.5 #fff');

    // create second series with mapped data
    var series_2 = chart.splineArea(seriesData_2);
    series_2.name('points of countries');
    series_2.hovered().markers()
            .enabled(true)
            .type('star5')
            .size(10)
            .stroke('1.5 #fff');

    // turn the legend on and place it at the bottom of the chart
    chart.legend()
            .enabled(true)
            .position('center-bottom')
            .fontSize(13)
            .padding([20, 0, 0, 0]);


    // set container id for the chart
    chart.container('container');

    // initiate chart drawing
    chart.draw();
});
                   
                   
                    
                    
                    
                })
            });  
             
             
             
            
             
 }] )
 
 angular
    .module("app")
    .controller("expensesExt1ctrl", ["$scope", "$http",
        function($scope, $http) {
            console.log("integracion por expenses-tourist");
           
            


            $http.get(API).then(function(response) {
                $http.get(APIe1).then(function(response1) {
                     console.log("Data received: "+ JSON.stringify(response.data));
                    $scope.expenses = response.data;
                     console.log("Data received: "+JSON.stringify(response1.data));
                    $scope.coun = response1.data;
                    
                   var datos=response1.data.Response;
                   var data=[];
                    console.log(JSON.stringify(datos[0]));
                    for(var i in response.data){
                       for (var j in datos){
                            if(datos[j].Name==response.data[i].country&&response.data[i].year==2017){
                                var dat={
                                    country: datos[j].Name,
                                    area: datos[j].Area,
                                    expenses: response.data[i].countryExpense
                                }
                          data.push(dat);  
                        }
                    }
                
                    
                    }
                    console.log("Datos a trabajar: "+JSON.stringify(data))
                    
                    var coun =[];
                    var exp=[];
                    var area=[];
                    for (var h in data){
                        coun.push(data[h].country);
                        exp.push(data[h].expenses);
                        area.push(data[h].area);
                        
                    } 
                    
                    console.log(coun,exp,area);
                    Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Gráfica comparadora de area y gastos de pais en 2017'
    },
    subtitle: {
        text: 'Limitado a Europa'
    },
    xAxis: {
        categories:coun,
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Area y gastos'
        },
        max: 1000000
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
        name: 'Area',
        data: area

    }, {
        name: 'Expenses',
        data: exp

    }]
});
                    
                    
                })
                
            })
            
        }])
        
        
        //G02
         angular
    .module("app")
    .controller("expensesG02ctrl", ["$scope", "$http",
        function($scope, $http) {
            console.log("integracion por expenses-tourist");
           
            


            $http.get(API2).then(function(response) {
                console.log(JSON.stringify(response.data))
            
            var data   =[];
            var labels =[];
            
            
               for(var i in response.data){
                   data.push(response.data[i].scorergoal);
                   labels.push(response.data[i].name);
               }
               
            

            

            window.bar = new RGraph.SVG.Bar({
                id: 'chart-container',
                data: data,
                options: {
                    xaxisLabels: labels
                }
            }).draw();

                
   
       
       
       
                
            });
        }]);
        
        
        
        
    
    
    
    
    //G03
     angular
    .module("app")
    .controller("expensesG03ctrl", ["$scope", "$http",
        function($scope, $http) {
            console.log("integracion por expenses-tourist");
           
            


            $http.get(API).then(function(response) {
                $http.get(API3).then(function(response1) {
                     console.log("Data received: "+ JSON.stringify(response.data));
                    $scope.expenses = response.data;
                     console.log("Data received: "+JSON.stringify(response1.data));
                    $scope.compu = response1.data;
                   
                   var data=[];
                   for(var i in response.data){
                       for (var j in response1.data){
                          if(response.data[i].country==response1.data[j].country&&response.data[i].year==response1.data[j].year){
                              var dat={
                                  country: response.data[i].country + " "+ response.data[i].year,
                                  exp: response.data[i].countryExpense,
                                  comp: response1.data[j].affectedequipments
                              }
                            data.push(dat);                      
                          }else if(response.data[i].country=="USA"&& response1.data[j].country=="EEUU"&&response.data[i].year==response1.data[j].year){
                              var dat={
                                  country: response.data[i].country + " "+ response.data[i].year,
                                  exp: response.data[i].countryExpense,
                                  comp: response1.data[j].affectedequipments
                              }
                            data.push(dat);
                          }
                          
                       }
                       
                   }
                   
                   console.log(JSON.stringify(data));
                    

                    am4core.ready(function() {
        var j=0;
        function jran(){
            if(j==data.length-1){
              j=0;  
            }else{
                j=j+1;
            }
            return j;
        }
        var p = jran()
            
        
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// create chart
var chart = am4core.create("chartdiv", am4charts.GaugeChart);
chart.hiddenState.properties.opacity = 0;

var axis = chart.xAxes.push(new am4charts.ValueAxis());
axis.min = 0;
axis.max = 160;
axis.strictMinMax = true;
axis.renderer.inside = true;
//axis.renderer.ticks.template.inside = true;
//axis.stroke = chart.colors.getIndex(3);
axis.renderer.radius = am4core.percent(97);
//axis.renderer.radius = 80;
axis.renderer.line.strokeOpacity = 1;
axis.renderer.line.strokeWidth = 5;
axis.renderer.line.stroke = chart.colors.getIndex(0);
axis.renderer.ticks.template.stroke = chart.colors.getIndex(0);
axis.renderer.labels.template.radius = 35;
axis.renderer.ticks.template.strokeOpacity = 1;
axis.renderer.grid.template.disabled = true;
axis.renderer.ticks.template.length = 10;
axis.hiddenState.properties.opacity = 1;
axis.hiddenState.properties.visible = true;
axis.setStateOnChildren = true;
axis.renderer.hiddenState.properties.endAngle = 180;

var axis2 = chart.xAxes.push(new am4charts.ValueAxis());
axis2.min = 0;
axis2.max = 240;
axis2.strictMinMax = true;

axis2.renderer.line.strokeOpacity = 1;
axis2.renderer.line.strokeWidth = 5;
axis2.renderer.line.stroke = chart.colors.getIndex(3);
axis2.renderer.ticks.template.stroke = chart.colors.getIndex(3);

axis2.renderer.ticks.template.strokeOpacity = 1;
axis2.renderer.grid.template.disabled = true;
axis2.renderer.ticks.template.length = 10;
axis2.hiddenState.properties.opacity = 1;
axis2.hiddenState.properties.visible = true;
axis2.setStateOnChildren = true;
axis2.renderer.hiddenState.properties.endAngle = 180;

var hand = chart.hands.push(new am4charts.ClockHand());
hand.fill = axis.renderer.line.stroke;
hand.stroke = axis.renderer.line.stroke;
hand.axis = axis;
hand.pin.radius = 14;
hand.startWidth = 10;

var hand2 = chart.hands.push(new am4charts.ClockHand());
hand2.fill = axis2.renderer.line.stroke;
hand2.stroke = axis2.renderer.line.stroke;
hand2.axis = axis2;
hand2.pin.radius = 10;
hand2.startWidth = 10;




  hand.showValue(data.map(function(d) { return d["exp"] })[p], am4core.ease.cubicOut);
//label.text = parseInt(hand.value);
  hand2.showValue(data.map(function(d) { return d["comp"] })[p], am4core.ease.cubicOut);
  //label2.text = Math.round(hand2.value).toString();

var legend = new am4charts.Legend();
legend.isMeasured = false;
legend.y = am4core.percent(100);
legend.verticalCenter = "bottom";
legend.parent = chart.chartContainer;
legend.data = [{
  "name": "Expenses of "+data.map(function(d) { return d["country"] })[p].toString(),
  "fill": chart.colors.getIndex(0)
}, {
  "name": "Measurement #2",
  "fill": chart.colors.getIndex(3)
}];

legend.itemContainers.template.events.on("hit", function(ev) {
  var index = ev.target.dataItem.index;

  if (!ev.target.isActive) {
    chart.hands.getIndex(index).hide();
    chart.xAxes.getIndex(index).hide();
    labelList.getIndex(index).hide();
  }
  else {
    chart.hands.getIndex(index).show();
    chart.xAxes.getIndex(index).show();
    labelList.getIndex(index).show();
  }
});

var labelList = new am4core.ListTemplate(new am4core.Label());
labelList.template.isMeasured = false;
labelList.template.background.strokeWidth = 2;
labelList.template.fontSize = 25;
labelList.template.padding(10, 20, 10, 20);
labelList.template.y = am4core.percent(50);
labelList.template.horizontalCenter = "middle";

var label = labelList.create();
label.parent = chart.chartContainer;
label.x = am4core.percent(40);
label.background.stroke = chart.colors.getIndex(0);
label.fill = chart.colors.getIndex(0);
label.text = "0";

var label2 = labelList.create();
label2.parent = chart.chartContainer;
label2.x = am4core.percent(60);
label2.background.stroke = chart.colors.getIndex(3);
label2.fill = chart.colors.getIndex(3);
label2.text = "0";


}); // end am4core.ready()

                    
                         
            
                    
                });    
            });
        }]);
        
        
        
        
        
        //G04
          angular
    .module("app")
    .controller("expensesG11ctrl", ["$scope", "$http",
        function($scope, $http) {
           
            


            $http.get(API).then(function(response) {
                $http.get(API11).then(function(response1) {
                     console.log("Data received: "+ JSON.stringify(response.data));
                    $scope.expenses = response.data;
                     console.log("Data received: "+JSON.stringify(response1.data));
                    $scope.compu = response1.data;
                    
                    
                    
                     var data1=[ ["Country and year", 'expenses in culture per capita', 'expenses in health per capita (G11)']];
                   for(var i in response.data){
                       for (var j in response1.data){
                          if(response.data[i].country.toLowerCase()==response1.data[j].country.toLocaleLowerCase()&&response.data[i].year==response1.data[j].year){
                              var dat=[
                                   response.data[i].country+" "+ response.data[i].year,
                                   response.data[i].expensePerCapita,
                                   response1.data[j].healthExpenditurePerCapita
                              ]
                               data1.push(dat);                   
                          }
                          
                       }
                       
                   }
                   console.log(data1)
                    
                   
                    
                    
                    
                    
                    
                    
                    
                    google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawBarColors);

function drawBarColors() {
     
        

      
      var data = google.visualization.arrayToDataTable(data1);

      var options = {
        title: 'expenses by countries',
        chartArea: {width: '50%'},
        colors: ['#b0120a', '#ffab91'],
        hAxis: {
          title: 'Total expenses per capita (€)',
          minValue: 0
        },
        vAxis: {
          title: 'Country and year'
        }
      };
      var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    }
                    
                    
                });    
            });
        }]);