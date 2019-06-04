angular
    .module("app")
    .controller("apiExterna1Emigration", ["$scope", "$http",
        function($scope, $http) {
            console.log("integracionExpenses");

            var API = "api/v1/emigrations-by-countries";
            var API2 = "/proxyc1";



            $http.get(API).then(function(response) {
                $http.get(API2).then(function(response1) {
                    console.log("Data received: "+JSON.stringify(response1.data));
                     $scope.data = JSON.stringify(response1.data,null,2);
                    
                })

            })
        }
    ]);