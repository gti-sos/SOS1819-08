/*global angular Highcharts google*/

angular
    .module("app",['n3-line-chart'])
    .controller("n3Tourist",["$scope","$http", function($scope,$http){
        //FUNCIÓN QUE HACE GET A LA RUTA BASE PARA CARGAR LOS DATOS ACTUALMENTE EN LA BASE DE DATOS
        const URL = "api/v1/tourists-by-countries";
        console.log("n3 tourist");
        
        $http.get(URL).then(function(response){
            

                var dataset_d3charts_tourists = [{x: 0, incomeTourist: 0,  touristDeparture: 0, arrivalTourist: 0}];
                var tourist = $scope.tourist;
                var country_leyend = [];
                
                var countryDiccionary = {
                    "Spain": "España",
                    "Colombia": "Colombia",
                    "China": "China",
                    "USA": "USA",
                    "Germany": "Alemania"
                };


                //GENERACIÓN DE DATASETS Y LEYANDA PARA D3-CHARTS
                for (var i=0; i<response.length; i++){
                    
 
                    //Modelado de datos para d3-charts
                    var inputD3Data = {
                        x: i,
                        incomeTourist: parseInt(response.data.filter(d => d.country[i]).map(function(d) { return d['incomeTourist'] })),
                        touristDeparture: parseInt(response.data.filter(d => d.country[i]).map(function(d) { return d["touristDeparture"] })),
                        arrivalTourist: parseInt(response.data.filter(d => d.country[i]).map(function(d) { return d['arrivalTourist'] }))
                    };
                    dataset_d3charts_tourists.push(inputD3Data);
                    
                    //Modelado de datos para la Leyenda
                    country_leyend.push({id: i, country: d => d.country[i]});
                }
                
                $scope.country_leyend = country_leyend;

 //GRÁFICA D3-CHARTS
                $scope.tourists_data = {
                    dataset0: dataset_d3charts_tourists
                };
        
                $scope.tourists_options = {
                    margin: {top: 5},
                    
                    series: [
                        {
                            axis: "y",
                            dataset: "dataset0",
                            key: "arrivalTourist",
                            label: "Salidas de touristas",
                            color: "hsla(104, 73%, 42%, 1)",
                            type: ["dot", "line"],
                            id: 'serieArrivalTourists'
                        },
                        {
                            axis: "y",
                            dataset: "dataset0",
                            key: " touristDeparture",
                            label: "llegada de turistas",
                            color: "hsla(306, 48%, 48%, 1)",
                            type: ["dot", "line"],
                            id: 'serieTouristDeparture'
                        },
                        {
                            axis: "y",
                            dataset: "dataset0",
                            key: "incomeTourist",
                            label: "incomeTourist",
                            color: "hsla(190, 73%, 42%, 1)",
                            type: ["dot", "line", "area"],
                            id: 'serieIncomeTourist'
                        }
                    ],
                    
                    //No Mostrar los valores de los ejes reptidos
                    grid: {
                        x: false,
                        y: false
                    },
                    
                    //Márgenes de la Gráfica
                    margin: {
                        bottom: 40,
                        left: 40
                    },
                    
                    //Formatero de Ejes
                    axes: {
                        x: {
                            key: "x",
                            padding: {min:10, max:10}
                        },
                        y: {
                            min: 0,
                            max: 120,
                            padding: {min:1, max: 10},
                          }
                    },
                    
                    //Permitir Zoom
                    zoom: {
                        x: true,
                        y: true
                    },
                    
                    //Resetear Zoom con Doble Click
                    doubleClickEnabled: false
                };
            }
        );
        
                
                
                
                
            }
        ]
    );

