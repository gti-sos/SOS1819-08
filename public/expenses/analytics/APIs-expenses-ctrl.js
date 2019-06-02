/*global angular, am4core*/
 var API6="https://sos1819-06.herokuapp.com/api/v1/uefa-country-rankings"
            var API8 = "https://sos1819-08.herokuapp.com/api/v1/tourists-by-countries";
            var API = "https://sos1819-08.herokuapp.com/api/v1/expenses-of-countries-in-education-and-culture";
            var APIe1 ="http://countryapi.gear.host/v1/Country/getCountries"; 
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
                    
                    
                    
                     var data =[["UUU",0,0 ]];
                    for(var i in response.data){
                        for(var j in response1.data){
                            if(response.data[i].country==response1.data[j].country&&response.data[i].year==response1.data[j].season && (response.data[i].country!="Spain"||response1.data[j].country!="Spain")){
                                var dat=[     response.data.map(function(d) { return d["country"] })[i]+" "+ response.data.map(function(d) { return d["year"] })[i],  
                                 parseInt(response.data.map(function(d) { return d["countryExpense"] })[i]),
                                 response1.data.map(function(d) { return d["points"] })[j]];
                                data.push(dat);
                                i+1;
                                }else if(!(response.data[i].country==response1.data[j].country&&response.data[i].year==response1.data[j].season)&&j==response1.data.length-1 &&(response.data[i].country!="Spain"||response1.data[j].country!="Spain")){
                                    var dat=[     response.data.map(function(d) { return d["country"] })[i]+" "+ response.data.map(function(d) { return d["year"] })[i],  
                                 parseInt(response.data.map(function(d) { return d["countryExpense"] })[i]),
                                 0];
                                         data.push(dat);
                                }if(response.data[i].country=="Spain" &&response1.data[j].country=="Spain"&&response.data[i].year==response1.data[j].season){
                                    var dat=[     response.data.map(function(d) { return d["country"] })[i]+" "+ response.data.map(function(d) { return d["year"] })[i],  
                                 parseInt(response.data.map(function(d) { return d["countryExpense"] })[i]),
                                 response1.data.map(function(d) { return d["points"] })[j]];
                                data.push(dat);
                                i+1;
                                }
                            
                        }
                        
                    }
                    data.pop();
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
                    '<span style="color:#212121; font-size: 13px;">mean monthly relative humidity</span>');

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
                     console.log("Data received: "+response1.data);
                    $scope.tourist = response1.data;
                    
                })
                
            })
            
        }])