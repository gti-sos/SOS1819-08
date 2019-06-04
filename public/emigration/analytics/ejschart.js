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
		maximum: 6000000
	},
	axisY:{
		title: "Price (in USD)",
		valueFormatString: "$#,##0k"
	},
	data: [{
		type: "scatter",
		toolTipContent: "<b>Area: </b>{x} sq.ft<br/><b>Price: </b>${y}k",
		dataPoints: [
			{ x: response.data[0].emigrantman, y: response.data[0].emigrantwoman },
			{ x: response.data[1].emigrantman, y: response.data[1].emigrantwoman },
			{ x: response.data[2].emigrantman, y: response.data[2].emigrantwoman },
			{ x: response.data[3].emigrantman, y: response.data[3].emigrantwoman },
			{ x: response.data[4].emigrantman, y: response.data[4].emigrantwoman },
			{ x: response.data[5].emigrantman, y: response.data[5].emigrantwoman }
		]
	}]
});
chart.render();





                    });

                },
    


    
]);