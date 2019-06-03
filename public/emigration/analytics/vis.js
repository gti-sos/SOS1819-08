angular
    .module("app")
    .controller("visctrl",["$scope","$http", function ($scope,$http){
        console.log("ejschartctrl Initialized.");
        var API = "/api/v1/emigrations-by-countries";
 var container = document.getElementById('visualization');
  var items = [
    {x: 'Sapin', y: 10},
    {x: 'USA', y: 25},
  ];

  var dataset = new vis.DataSet(items);
var options = {
    width:  '100%',
    height: '400px',
    style: 'bar'
};
  var graph2d = new vis.Graph2d(container, dataset, options);
    


    
}]);