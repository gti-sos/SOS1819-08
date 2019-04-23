angular
    .module("emigrationsApp")
    .controller("emigrationsCtrl",["$scope","$http", function ($scope,$http){
        console.log("Emigrations Controller Initialized.");
        var API = "https://sos1819-08.herokuapp.com/api/v1/emigrations-by-countries";
        refresh();
        
        function refresh(){
            console.log("Requesting contacts to <"+API+">...");
            $http.get(API).then(function (response){
                console.log("Data Recieved: "+ JSON.stringify(response.data,null,2));            
                $scope.emigrations = response.data;
            
            });
        };
        
        $scope.sendGet = function (emiMin, emiMax){
             $http.get(API+ "?totalEmigrantFrom="+emiMin +"&totalEmigrantTo="+emiMax).then(function(response){
            console.log(API+ "?totalEmigrantFrom="+emiMin +"&totalEmigrantTo="+emiMax);
                $scope.emigrations =response.data;
                
            });
        };
        
        $scope.loadCountries = function (){
            $http.get(API+ "/loadInitialData").then(function(response){
                $scope.status= "Status: Registro iniciales añadidos con éxito";
                $scope.emigrations =response.data;
            refresh();
            });
        };
        
        $scope.addCountry = function(){
            console.log("Adding a new country");
            var newCountry = $scope.newCountry;
            
            $http.post(API, newCountry).then(function (response){
                $scope.status= "Status: Registro añadido con éxito";
                console.log("POST Response "+ response.status + "" + response.data);            
                refresh();
            
            },function(){
                    if( newCountry.country==null || newCountry.year==null || newCountry.emigrantman==null || newCountry.emigrantwoman==null || newCountry.totalemigrant==null){
                    $scope.status="Error: No están todos los campos rellenos"
                    }else{
                    $scope.status="Error: Ya existe el país en el año especificado"
                    }
            });
        }
        
         $scope.deleteCountry = function(country, year){
            $scope.status= "Status: Registro borrado con éxito";
            console.log("Delete country");
            
            $http.delete(API+"/"+country +"/"+year).then(function (response){
            console.log("DELETE Response "+ response.status + "" + response.data);            
            refresh();
            
            });
        }
        
        $scope.deleteCountries = function(){
            $scope.status= "Status: Registros borrados con éxito";
            console.log("Delete country");
            
            $http.delete(API).then(function (response){
            console.log("DELETE Response "+ response.status + "" + response.data);            
            refresh();
            
            });
        }
        
    }]);