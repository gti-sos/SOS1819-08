/* global angular*/

/* global Highcharts*/
angular.module("app").controller("analyticsExpenses", ["$scope", "$http", function($scope, $http){
    console.log("analytics ctrl initialized");
     var API = "https://sos1819-08.herokuapp.com/api/v1/expenses-of-countries-in-education-and-culture";
     
     $http.get(API).then(function(response) {
                    console.log("Data received: "+ JSON.stringify(response.data));
                    $scope.expenses = response.data;
                
                
                //HIGHCHARTS FOR MY OWN API
                var expensesData=[];
                for (var i in response.data) {
                    if(i==response.data.length){
                    var data={
                        name: response.data.map(function(d) { return d["country"] })[i]+" "+ response.data.map(function(d) { return d["year"] })[i],
                        data: parseInt(response.data.map(function(d) { return d["countryExpense"] }))[i],sliced: true,
            selected: true
                    };}else{
                         data={
                        name: response.data.map(function(d) { return d["country"] })[i]+" "+ response.data.map(function(d) { return d["year"] })[i],
                        data: parseInt(response.data.map(function(d) { return d["countryExpense"] }))[i]};
                    };
                    expensesData.push(data);
                    }
                    
                    
                    console.log("Datos:"+ JSON.stringify(expensesData));
     
                
                
              Highcharts.chart('container', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Browser market shares in January, 2018'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    },
    series: [{
        name: 'Countries and years',
        colorByPoint: true,
        data: expensesData
    }]
});
     });      
             
 }] );