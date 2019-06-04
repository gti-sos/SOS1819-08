angular
    .module("app")
    .controller("integracionTourist1", ["$scope", "$http",
            function($scope, $http) {
                console.log("integracionTourist1!");


                 
      
 var APIE1 = "/proxyMLS";
 var API = "api/v1/tourists-by-countries";
 

$http.get(API).then(function(response) {     

 $http.get(APIE1).then(function(responseE1) {                  


   

var chart = new CanvasJS.Chart("integracionE2", {
	animationEnabled: true,
	exportEnabled: true,
	title: {
		text: "Product Manufacturing Expenses"
	},
	data: [{
		type: "pyramid",
		indexLabelFontSize: 18,
		showInLegend: true,
		legendText: "{indexLabel}",
		toolTipContent: "<b>{indexLabel}:</b> {y}",
		dataPoints: [
		    { y: parseInt(responseE1.data.filter(d => d.region == 'Europe' && d.subregion == "Western Europe").map(function(d) { return d['population'] })), indexLabel: "population" },
			{ y: parseInt(response.data.filter(d => d.country == 'Spain').map(function(d) { return d['incomeTourist'] })), indexLabel: "incomeTourist" },
		
		]
	}]
})

chart.render();

    
 })

})

                
}]);