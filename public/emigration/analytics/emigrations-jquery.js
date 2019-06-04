angular
    .module("app")
    .controller("jqueryEmigrations", ["$scope", "$http",
        function($scope, $http) {
            console.log("jqueryEmigrations inicializado!");

            var API = "api/v1/emigrations-by-countries";

            $http.get(API).then(function(response) {

	var items = [];

	$.each(res, function(key, val){
		items.push({
			value: val["rank"],
			title: val["title"]
		});
	});

	$("#chart").linechart({
		data: [1,2,3,4,5],
		width: 50, 
		height: 10,
		boxSize: 16,
		line: true,
		theme: "purple"
	});
});



            
        }
    ]);
