angular
    .module("app")
    .controller("apiExterna1Emigration", ["$scope", "$http",
        function($scope, $http) {
            console.log("integracionEmigrations");

            var API = "api/v1/emigrations-by-countries";
            var API2 = "/proxyc1";



            $http.get(API).then(function(response) {
                $http.get(API2).then(function(response1) {
                    console.log("Data received: "+JSON.stringify(response1.data));
                    var datos=response1.data.Response
                    $scope.data= response1.data;
                })

            })
        }
    ]);