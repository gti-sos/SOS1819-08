angular
    .module("app")
    .controller("visctrl",["$scope","$http", function ($scope,$http){
        console.log("ejschartctrl Initialized.");
        var API = "/api/v1/emigrations-by-countries";
 var container = document.getElementById('visualization');
  var items = [
    {x: 'Spain', y: 10},
    {x: 'USA', y: 25}
  ];

  var dataset = new vis.DataSet(items);
  var options = {
    data: ['Spain','USA']
  };
  var graph2d = new vis.Graph2d(container, dataset, options);
    


    
}]);