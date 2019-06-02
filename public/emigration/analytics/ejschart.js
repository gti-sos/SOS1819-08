angular
    .module("app")
    .controller("ListCtrlEmigration",["$scope","$http", function ($scope,$http){
        console.log("ListCtrlEmigration Initialized.");
        var API = "https://sos1819-08.herokuapp.com/api/v1/emigrations-by-countries";
    var chart = new EJSC.Chart("myChart4a", {
      show_legend: false
    } );
      
    var mySeries = new EJSC.BarSeries(
      new EJSC.ArrayDataHandler($scope.emigrations) , {
          orientation: "horizontal",
          intervalOffset: .5,
          useColorArray: true
      }
    );
    
    mySeries.x_axis_formatter = new EJSC.NumberFormatter({
        forced_decimals: 2
    } );
    
    mySeries.y_axis_formatter = new EJSC.NumberFormatter({
        forced_decimals: 2
    } );
  
    chart.addSeries(mySeries);
    
}]);