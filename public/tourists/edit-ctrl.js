/* global angular $scope*/

angular
    .module("TouristsApp")
    .controller("EditCtrl", ["$scope", "$http","$routeParams","$location", function($scope, $http, $routeParams, $location) {
        console.log("Edit Tourists Initialized!");


        var API = "/api/v1/tourists-by-countries/"+$routeParams.country+"/"+$routeParams.year;

 
///La variable put se pone a true para señalar que lo que vamos a hacer es actualizar la base de datos, es decir, hacer un put    
    var put = true;
        $http.get(country).then(function(response){
                   $scope.updateTourist = response.data; 
                });
            
///Se toma cada uno de los parámetros de entrada del recurso nuevo y los añade a un objeto nuevo countryStat, la actualización del primero.            
        $scope.updateTourist = function(){    
            var countryStat = {};
                
            Object.keys($scope.updateTourist).forEach(p =>{
            
                try{
                    countryStat[p] = JSON.parse($scope.updateTourist[p]);
                }catch(e){
                    countryStat[p] = $scope.updateTourist[p];
                }
            });
            console.log(tourist.country);
            
///Restricción que da error si hay un parámetro vacío dentro dela nueva variable que creamos
            Object.keys(countryStat).forEach(p =>{
                
                if(countryStat[p]==""){
                  $scope.status = "Status 400. Cant update items with blank parameters."       
                    put=false;    
                }
            })
            
///Se hace un put en la base de datos con el nuevo objeto, es decir, editamos la base de datos          
            console.log(put)
               if(put){$http.put(country, countryStat).then(function(response){
                   
                    $location.path("/country-stats");
                    $scope.status= "Status 200. Item ("+ tourist.country + ", " + tourist.year + ") successfully updated.";
                
            })
               }
        put=true;  
        countryStat={};  ///Se reinicia la variable para futuras llamadas   
           
        }    
            
}]);

        // $http.get(API).then(function (response){
        //     $scope.sendPut= response.data;
        // });

        // $scope.sendPut = function() {
        //     $http.put(API, $scope.sendPut).then(function(response) {
        //         $scope.status = "Status: " + response.status;
        //         //console.log(Object.keys($scope.updatedMedicalAttentionRate).length)
        //         window.alert("OK: estadistica actualizada");
        //         $location.path("/");
        //     }, function() {
        //         if ($scope.sendPut["touristDeparture"]== null ||
        //             $scope.sendPut["arrivalTourist"] == null ||
        //             $scope.sendPut["incomeTourist"] == null) {
        //             $scope.status = "Error: debe completar todos los campos"
        //         }
        //     });
        // };






            //     $scope.sendPut = function(country, year, touristDeparture, arrivalTourist, incomeTourist) {
            // if (typeof country !== 'undefined' &&
            //     typeof year !== 'undefined' &&
            //     typeof touristDeparture !== 'undefined' &&
            //     typeof arrivalTourist !== 'undefined' &&
            //     typeof incomeTourist !== 'undefined') {

            //     var data = {
            //         country: country,
            //         year: parseInt(year),
            //         touristDeparture: parseInt(touristDeparture),
            //         arrivalTourist: parseInt(arrivalTourist),
            //         incomeTourist: parseInt(incomeTourist)
            //     };





            //     console.log("Este es el nuevo dato:  " + data);
            //     $http.put(API , JSON.stringify(data)).then(function(response) {
            //         console.log("put done");
            //         $scope.dataResponse = " Código: " + response.status + "\n" + response.statusText + " Dato modificado";
            //         refresh();
            //     }, function(response) {
            //         console.log("Error método PUT: Código" + response.status + ", " + response.statusText);
            //         $scope.dataResponse = "Código: " + response.status + "\n" + response.statusText + "Dato no ha sido modificado";
            //         refresh();
            //     });
            // }
            // else {
            //     $scope.dataResponse = "Datos incompletos";
            // }




        
    }]);
