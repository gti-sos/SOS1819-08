angular
    .module("app")
    .controller("Externa2Cristian", ["$scope", "$http",
        function($scope, $http) {
            console.log("Externa2Cristian");

            var API = "api/v1/emigrations-by-countries";
            var API2 = "https://deckofcardsapi.com/api/deck/new/draw/";

$http.get(API2).then(function(response){
        
        
        $scope.cards = response.data.cards;
        
        console.log($scope.cards);
        
    });
    $scope.refresh2 = function refresh(){ 
    $http.get(API2).then(function(response){
        
        
        
       $scope.cards = response.data.cards;
        
    });
    
    };



        }
    ]);