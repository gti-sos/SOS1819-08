angular
    .module("app")
    .controller("integracionTourist1", ["$scope", "$http",
            function($scope, $http) {
                console.log("integracionTourist1!");






                 
                var URL = "https://restcountries-v1.p.rapidapi.com/all";
                var URL_BASE = "https://restcountries-v1.p.rapidapi.com/all";
                
                refresh(URL_BASE);
                
                //FUNCIÓN QUE HACE GET A LA RUTA BASE PARA MOSTRAR LO QUE SE ENCUENTRA ACTUALMENTE EN LA BASE DE DATOS
                function refresh(URL){
  
           
                    $http.get(URL_BASE).then(function(response3) {                  
                    var config = {
                        headers: {
                            "X-RapidAPI-Host": "restcountries-v1.p.rapidapi.com",
                            "X-RapidAPI-Key": "99007e2d19msh5516fcc3b68661ap1a0efajsnc3899b9c335b",
                            
                        }
                    };
                    
                   new RGraph.SVG.Bipolar({
        id: 'cc',
        left: [parseInt(response3.data.filter(d => d.region == 'Asia').map(function(d) { return d['Population'] })),8,6,3,5,8,9],
        right: [parseInt(response.data.filter(d => d.country == 'Germany').map(function(d) { return d['arrivalTourist'] })),7,9,6,6,3,5],
        options: {
            yaxisLabels: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
            yaxisTextBold: true,
            yaxisTextItalic: true,
            grouping: 'grouped',
            marginInner: 15,
            title: 'An SVG Bipolar chart using the grow() effect',
            titleSubtitle: 'A subtitle to go along with the title',
            marginTop: 50
        }
    }).grow();
                
 

})
}
                
}]);