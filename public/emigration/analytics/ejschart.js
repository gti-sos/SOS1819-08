angular
    .module("app")
    .controller("ejschartctrl",["$scope","$http", function ($scope,$http){
        console.log("ejschartctrl Initialized.");
        var API = "/api/v1/emigrations-by-countries";
             

                    $http.get(API).then(function(response) {
                        


                        

var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	zoomEnabled: true,
	title:{
		text: "Real Estate Rates"
	},
	axisX: {
		title:"Area (in sq. ft)",
		minimum: 790,
		maximum: 2260
	},
	axisY:{
		title: "Price (in USD)",
		valueFormatString: "$#,##0k"
	},
	data: [{
		type: "scatter",
		toolTipContent: "<b>Area: </b>{x} sq.ft<br/><b>Price: </b>${y}k",
		dataPoints: [
			{ x: response.data[0].emigrantman, y: response.data[0].emigrantwoman }
		]
	}]
});
chart.render();





                    });

                },
    


    
]);