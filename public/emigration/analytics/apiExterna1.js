angular
    .module("app")
    .controller("apiExterna1Emigration", ["$scope", "$http",
        function($scope, $http) {
            console.log("integracionEmigrations");

            var API = "api/v1/emigrations-by-countries";
            var API2 = "/proxyc1";


$http.get(API2).then(function(response){
        
        $scope.quotes = response.data;
        
    });
        }
    ]);