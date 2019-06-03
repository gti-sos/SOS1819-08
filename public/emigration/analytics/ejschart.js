angular
    .module("app")
    .controller("ejschartctrl",["$scope","$http", function ($scope,$http){
        console.log("ejschartctrl Initialized.");
        var API = "/api/v1/emigrations-by-countries";
    var chart = new EJSC.Chart("myChart4a", {
      show_legend: false
    } );
      
    var mySeries = new EJSC.BarSeries(
      new EJSC.ArrayDataHandler([[1,"Widgets"],[2,"Gizmos"],[3,"Doodads"],[4,"Thingies"]]) , {
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