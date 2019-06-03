/*global angular Highcharts google*/
angular.module('app')
  .controller('n3Tourist', ["$scope","$http", function($scope,$http){
      console.log("n3 iniciado")
      
        const URL = "api/v1/tourists-by-countries";
        
        console.log("n3 tourist");
        
$http.get(URL).then(function(response){
     var incomeTourist = [];
     var touristDeparture = [];
     var arrivalTourist = [];
            for(var i=0; i<5;i++){
                var e = response.data.slice(i,i+1).map(function(d){return d["incomeTourist"]});
                e = e[0];
                incomeTourist.push(e);
            }
            
            for(var i=0; i<5;i++){
                var e = response.data.slice(i,i+1).map(function(d){return d["touristDeparture"]});
                e = e[0];
                touristDeparture.push(e);
            }
            
            for(var i=0; i<5;i++){
                var e = response.data.slice(i,i+1).map(function(d){return d["arrivalTourist"]});
                e = e[0];
                arrivalTourist.push(e);
            }
            
           

d3.select(".chart") // Selecciona el identificador en donde se va a mostrar la gráfica 
  .selectAll("div") // Selecciona todas las etiquetas div que se van a ir agregando después del identificador 
  .data(incomeTourist) // Agregar el arreglo con los datos
  .enter() // Crea los nuevos nodos
  .append("div") // Crea nuevas instancias con la etiqueta div
  .transition() // Agregar animación 
  .duration(2000) // Duración de la animación 
  .style("width", function(d) {
    return d + "px"; // La función obtiene los valores del arreglo y lo retorna al width
  })
  .text(function(d) {
    return d; // La función obtiene los valores del arreglo y lo retorna como texto
  })
 

d3.select(".chart1") // Selecciona el identificador en donde se va a mostrar la gráfica 
  .selectAll("div") // Selecciona todas las etiquetas div que se van a ir agregando después del identificador 
  .data(arrivalTourist) // Agregar el arreglo con los datos
  .enter() // Crea los nuevos nodos
  .append("div") // Crea nuevas instancias con la etiqueta div
  .transition() // Agregar animación 
  .duration(2000) // Duración de la animación 
  .style("width", function(d) {
    return d + "px"; // La función obtiene los valores del arreglo y lo retorna al width
  })
  .text(function(d) {
    return d; // La función obtiene los valores del arreglo y lo retorna como texto
  })
  
  d3.select(".chart2") // Selecciona el identificador en donde se va a mostrar la gráfica 
  .selectAll("div") // Selecciona todas las etiquetas div que se van a ir agregando después del identificador 
  .data(touristDeparture) // Agregar el arreglo con los datos
  .enter() // Crea los nuevos nodos
  .append("div") // Crea nuevas instancias con la etiqueta div
  .transition() // Agregar animación 
  .duration(2000) // Duración de la animación 
  .style("width", function(d) {
    return d + "px"; // La función obtiene los valores del arreglo y lo retorna al width
  })
  .text(function(d) {
    return d; // La función obtiene los valores del arreglo y lo retorna como texto
  })
})
}]);