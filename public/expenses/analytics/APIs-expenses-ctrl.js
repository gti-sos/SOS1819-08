/*global angular, am4core, RGraph */
 var API6="https://sos1819-06.herokuapp.com/api/v1/uefa-country-rankings"
            var API8 = "https://sos1819-08.herokuapp.com/api/v1/tourists-by-countries";
            var API = "https://sos1819-08.herokuapp.com/api/v1/expenses-of-countries-in-education-and-culture";
            var APIe1 ="https://sos1819-08.herokuapp.com/proxyExternal1"; 
            var API2="https://sos1819-02.herokuapp.com/api/v1/scorers-stats/";
            var API3 ="https://sos1819-03.herokuapp.com/api/v1/computers-attacks-stats";
            var API11="https://sos1819-11.herokuapp.com/api/v2/public-expenditure-educations";
            var API12="https://sos1819-12.herokuapp.com/api/v1/pollution-stats";
            var APIe2="https://api.whatdoestrumpthink.com/api/v1/quotes";
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
           
            


            $http.get(API).then(function(response) {
                $http.get(API6).then(function(response1) {
                     console.log("Data received: "+ JSON.stringify(response.data));
                    $scope.expenses = response.data;
                     console.log("Data received: "+ JSON.stringify(response1.data));
                    $scope.tourist = response1.data;
                    
                    
                    
                     var coun =[];
                     var exp=[];
                     var point=[];
                    for(var i in response.data){
                               coun.push(    "Expenses "+ response.data.map(function(d) { return d["country"] })[i]+" "+response.data[i].year);  
                                 exp.push(response.data.map(function(d) { return d["countryExpense"] })[i]);
                        
                    }
                     for(var i in response1.data){
                               coun.push(    "Points "+ response1.data.map(function(d) { return d["country"] })[i]+" "+response1.data[i].year);  
                                 exp.push(response1.data.map(function(d) { return d["points"] })[i]);
                        
                    }
                    console.log("Datos finales: "+coun + " "+ exp +  " " + point);
                                
                                
                                $scope.labels= coun;
                                $scope.data= exp;
                   
                   
                 
                   
                    
                    
                    
                })
            });  
             
             
             
            
             
 }] )
 
 angular
    .module("app")
    .controller("expensesExt1ctrl", ["$scope", "$http",
        function($scope, $http) {
           
            


            $http.get(API).then(function(response) {
                $http.get(APIe1).then(function(response1) {
                     console.log("Data received: "+ JSON.stringify(response.data));
                    $scope.expenses = response.data;
                     console.log("Data received: "+JSON.stringify(response1.data));
                    $scope.coun = response1.data;
                    
                   var datos=response1.data.Response;
                    var area=[];
                    if(datos.length>response.data.length){
                        for(var i in response.data){
                                area.push([datos[i].Area,response.data[i].countryExpense]);
                       
                    }}else{
                          for(var i in datos){

                            area.push([datos[i].Area,response.data[i].countryExpense]);                    
                    }
                    }
                    
                   console.log(area);
                  
                    
                  
                  
                  
                  Highcharts.chart('container', {
    chart: {
        type: 'scatter',
        zoomType: 'xy'
    },
    title: {
        text: 'Expenses vs area in countries'
    },
    subtitle: {
        text: 'Source: API external with proxy'
    },
    xAxis: {
        title: {
            enabled: true,
            text: 'Area (m2)'
        },
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true
    },
    yAxis: {
        title: {
            text: 'Expenses (€)'
        }
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 100,
        y: 70,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
        borderWidth: 1
    },
    plotOptions: {
        scatter: {
            marker: {
                radius: 5,
                states: {
                    hover: {
                        enabled: true,
                        lineColor: 'rgb(100,100,100)'
                    }
                }
            },
            states: {
                hover: {
                    marker: {
                        enabled: false
                    }
                }
            },
            tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: '{point.x} m, {point.y} €'
            }
        }
    },
    series: [{ name: 'Expenses with area',
        color: 'rgba(23, 77, 77, .5)',
        data: area}]

                  });
                    
                })
                
            })
            
        }])
        
        
        //G02
         angular
    .module("app")
    .controller("expensesG02ctrl", ["$scope", "$http",
        function($scope, $http) {
           
            
            
        
            $http.get(API2).then(function(response) {
                console.log(JSON.stringify(response.data))
                $http.get(API).then(function(response1){  
                    console.log(response1.data);
            var data   =[];
            var labels =[];
            
            
               for(var i in response.data){
                   data.push(response.data[i].scorergoal);
                   labels.push(response.data[i].name+" player " +response.data[i].scorergoal);
               }
               
                for(var i in response1.data){
                   data.push(response1.data[i].expensePerCapita);
                   labels.push(response1.data[i].country+" expenses "+response1.data[i].expensePerCapita);
               }
               
            

            

            new RGraph.SVG.Pie({
        id: 'chart-container',
        data: data,
        options: {
            tooltipsEvent: 'mousemove',
            highlightStyle: 'outline',
            labelsSticksHlength: 50,
            tooltips: labels,
            key: labels
        }
    }).draw();

                
   
       
       
                })
                
            });
        }]);
        
        
        
        
    
    
    
    
    //G03
     angular
    .module("app")
    .controller("expensesG03ctrl", ["$scope", "$http",
        function($scope, $http) {
           
            


            $http.get(API).then(function(response) {
                $http.get(API3).then(function(response1) {
                     console.log("Data received: "+ JSON.stringify(response.data));
                    $scope.expenses = response.data;
                     console.log("Data received: "+JSON.stringify(response1.data));
                    $scope.compu = response1.data;
                   
                   var dataexp=[];
                   var dataCom=[];
                   for(var i in response.data){
                             dataexp.push(response.data[i].countryExpense)
                       
                   }
                   
                   for(var j in response1.data){
                       dataCom.push(response1.data[j].affectedequipments);
                   }
                   
                   console.log(JSON.stringify(dataexp));
                    
                    var sum = dataexp.reduce((previous, current) => current += previous);
                    var e = sum / dataexp.length;
                        console.log("e: "+e);
                                    
                    var sum1 = dataCom.reduce((previous, current) => current += previous);
                    var c = sum1 / dataCom.length;
                        console.log("c: "+c);

                    am4core.ready(function() {
        
                
        
            
        
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// create chart
var chart = am4core.create("chartdiv", am4charts.GaugeChart);
chart.hiddenState.properties.opacity = 0;

var axis = chart.xAxes.push(new am4charts.ValueAxis());
axis.min = 0;
axis.max = 160000;
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
axis2.max = 160000;
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




  hand.showValue(e, am4core.ease.cubicOut);
//label.text = parseInt(hand.value);
  hand2.showValue(c, am4core.ease.cubicOut);
  //label2.text = Math.round(hand2.value).toString();

var legend = new am4charts.Legend();
legend.isMeasured = false;
legend.y = am4core.percent(100);
legend.verticalCenter = "bottom";
legend.parent = chart.chartContainer;
legend.data = [{
  "name": "Media aritmetica de los gastos por paises",
  "fill": chart.colors.getIndex(0)
}, {
  "name": "Media aritmetica de los ordenadores afectados por ataques en paises",
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
label.text = e;

var label2 = labelList.create();
label2.parent = chart.chartContainer;
label2.x = am4core.percent(60);
label2.background.stroke = chart.colors.getIndex(3);
label2.fill = chart.colors.getIndex(3);
label2.text = c;


}); // end am4core.ready()

                    
                         
            
                    
                });    
            });
        }]);
        
        
        
        
        
        //G11
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
                    
                    
                    
                     var data1=[ ];
                   for(var i in response.data){
                       for (var j in response1.data){
                          if(response.data[i].country.toLowerCase()==response1.data[j].country.toLocaleLowerCase()&&response.data[i].year==response1.data[j].year){
                              var dat=[
                                   response.data[i].country+" "+ response.data[i].year,
                                   response.data[i].expensePerCapita,
                                   
                                   response1.data[j].educationExpensePub,
                                   response.data[i].budgetPercentage,
                                   response1.data[j].healthExpenditurePerCapita
                                   
                              ]
                               data1.push(dat);                   
                          }
                          
                       }
                       
                   }
                   console.log(data1)
                    
                   
                    
                    
                    
                    
                     google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    var data = google.visualization.arrayToDataTable(data1
    
      // Treat first row as data as well.
    , true);

    var options = {
      legend:'none'
    };

    var chart = new google.visualization.CandlestickChart(document.getElementById('chart_div'));

    chart.draw(data, options);
  } 
                    
                    
                   
                    
                });    
            });
        }]);
        
        //G12
         angular
    .module("app")
    .controller("expensesG12ctrl", ["$scope", "$http",
        function($scope, $http) {
           
            


            $http.get(API).then(function(response) {
                $http.get(API12).then(function(response1) {
                     console.log("Data received: "+ JSON.stringify(response.data));
                    $scope.expenses = response.data;
                     console.log("Data received: "+JSON.stringify(response1.data));
                    $scope.compu = response1.data;
                     
                     var data1=[];
                     var coun=[];
                     var exp=[];
                     var out=[];
                     for(var i in response.data){
                       for (var j in response1.data){
                          if(response.data[i].country.toLowerCase()==response1.data[j].country.toLocaleLowerCase() && response.data[i].year==response1.data[j].year){
                                   coun.push(response.data[i].country+" "+ response.data[i].year),
                                   exp.push(response.data[i].budgetPercentage),
                                   out.push(response1.data[j].pollution_perca)
                          }else if(response.data[i].country=="Germany"&&response1.data[j].country=="alemania" && response.data[i].year==response1.data[j].year){
                              coun.push(response.data[i].country+" "+ response.data[i].year),
                                   exp.push(response.data[i].budgetPercentage),
                                   out.push(response1.data[j].pollution_perca)
                          }else if(response.data[i].country=="France"&&response1.data[j].country=="francia" && response.data[i].year==response1.data[j].year){
                              coun.push(response.data[i].country+" "+ response.data[i].year),
                                   exp.push(response.data[i].budgetPercentage),
                                   out.push(response1.data[j].pollution_perca)
                          }else if(response.data[i].country=="Italy"&&response1.data[j].country=="italia" && response.data[i].year==response1.data[j].year){
                            coun.push(response.data[i].country+" "+ response.data[i].year),
                                   exp.push(response.data[i].budgetPercentage),
                                   out.push(response1.data[j].pollution_perca)
                       }
                     }}
                     console.log(coun)
                    console.log(exp)
                    console.log(out)
                    
                    
                     $scope.labels = coun;
  $scope.series = ['expenses percentage', 'pollution percentage'];
  $scope.data = [
    exp,
    out
 ]
                    
                });    
            });
        }]);
        
        
            angular
    .module("app")
    .controller("expensesE2ctrl", ["$scope", "$http",
        function($scope, $http) {
            $scope.getDonaldTrump = function(){
                $http.get(APIe2+"/random").then(function(response){
                    $scope.trump=response.data.message;
                    console.log($scope.trump);
                    $scope.dataResponse= $scope.trump;
                });
            }
            
             $scope.getDTPerso= function(name) {
                $http.get(APIe2+"/personalized?q="+name).then(function(response){
                    $scope.trump2=response.data.message;
                    console.log($scope.trump2);
                    $scope.dResponse= $scope.trump2;
                })

             }
    
    
        }]);