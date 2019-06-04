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
		text: "Emigrations by countries"
	},
	axisX: {
		title:"EmigranMan",
		minimum: 790,
		maximum: 6000000
	},
	axisY:{
		title: "EmigrantWomanPrice (in USD)",
		valueFormatString: "$#,##0k"
	},
	data: [{
		type: "scatter",
		toolTipContent: "<b>USA: Emigrantman: </b>{x} sq.ft<br/><b>Emigrantwoman: </b>${y}k",
		dataPoints: [
			{ x: response.data[0].emigrantman, y: response.data[0].emigrantwoman }
		]
	},{
		type: "scatter",
		toolTipContent: "<b>China: Emigrantman: </b>{x} sq.ft<br/><b>Emigrantwoman: </b>${y}k",
		dataPoints: [
			{ x: response.data[1].emigrantman, y: response.data[1].emigrantwoman }
		]
	},{
		type: "scatter",
		toolTipContent: "<b>Spain: Emigrantman: </b>{x} sq.ft<br/><b>Emigrantwoman: </b>${y}k",
		dataPoints: [
			{ x: response.data[2].emigrantman, y: response.data[2].emigrantwoman }
		]
	},{
		type: "scatter",
		toolTipContent: "<b>Germany: Emigrantman: </b>{x} sq.ft<br/><b>Emigrantwoman: </b>${y}k",
		dataPoints: [
			{ x: response.data[3].emigrantman, y: response.data[3].emigrantwoman }
		]
	},{
		type: "scatter",
		toolTipContent: "<b>Colombia: Emigrantman: </b>{x} sq.ft<br/><b>Emigrantwoman: </b>${y}k",
		dataPoints: [
			{ x: response.data[4].emigrantman, y: response.data[4].emigrantwoman }
		]
	},{
		type: "scatter",
		toolTipContent: "<b>Uruguay: Emigrantman: </b>{x} sq.ft<br/><b>Emigrantwoman: </b>${y}k",
		dataPoints: [
			{ x: response.data[5].emigrantman, y: response.data[5].emigrantwoman }
		]
	},]
});
chart.render();





                    });

                },
    


    
]);