angular
    .module("app")
    .controller("ejschartctrl",["$scope","$http", function ($scope,$http){
        console.log("ejschartctrl Initialized.");
        var API = "/api/v1/emigrations-by-countries";
             

                    $http.get(API).then(function(response) {
                        var i;


                        

var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	exportEnabled: true,
	theme: "light1",
	title:{
		text: "Software Sales Conversion"
	},
	data: [{
		type: "pyramid",
		yValueFormatString: "#\"%\"",
		indexLabelFontColor: "black",
		indexLabelFontSize: 16,
		indexLabel: "{label} - {y}",
		//reversed: true, // Reverses the pyramid
		dataPoints: [
			{ y: 100, label: "Website Visit" },
			{ y: 65, label: "Download Page Visit" },
			{ y: 45, label: "Downloaded" },
			{ y: 32, label: "Interested To Buy" },
			{ y: 5, label: "Purchased" }
		]
	}]
});
chart.render();



                    });

                },
    


    
]);