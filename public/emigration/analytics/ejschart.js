angular
    .module("app")
    .controller("ejschartctrl",["$scope","$http", function ($scope,$http){
        console.log("ejschartctrl Initialized.");
        var API = "/api/v1/emigrations-by-countries";
    var chart = new EJSC.Chart("myChart", {
        show_legend: false
      });
      var stack = chart.addSeries(new EJSC.StackedBarSeries( {
          intervalOffset: 1
      } ) );
      
      stack.addSeries(new EJSC.BarSeries(
        new EJSC.ArrayDataHandler( [ [0,10],[1,5],[2,8],[3,15] ] )
      ) );
      
      stack.addSeries(new EJSC.BarSeries(
        new EJSC.ArrayDataHandler( [ [0,10],[1,7],[2,15],[3,5] ] )
      ) );
    


    
}]);