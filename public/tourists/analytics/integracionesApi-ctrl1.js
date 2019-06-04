angular
    .module("app")
    .controller("integracionTourist1", ["$scope", "$http",
            function($scope, $http) {
                console.log("integracionTourist1!");


                 
      
 var APIE1 = "https://www.oostende.be/opendataset/view/5/json";
 var API = "api/v1/tourists-by-countries";
 

$http.get(API).then(function(response) {     

 $http.get(APIE1).then(function(responseE1) {                  



    new RGraph.SVG.Rose({
        id: 'integracionE1',
        data: [parseInt(responseE1.data.filter(d => d.titel == 'Kapellebrug"').map(function(d) { return d['kaartlaagid'] })),parseInt(response.data.filter(d => d.country == 'USA').map(function(d) { return d['incomeTourist'] }))],
        options: {
            colors: [ 'rgba(255,0,0,0.5)', 'rgba(0,255,0,0.5)', 'rgba(0,0,255,0.5)' ],
            backgroundGridRadialsCount: 0,
            linewidth: 2,
            amargin: '5deg',
            labels: ['num','incomeTourist'],
            tooltips: ['num','incomeTourist'],
            linewidth: .5
        }
    }).draw();
                    

 
})
})

                
}]);