angular
    .module("app")
    .controller("ejschartctrl",["$scope","$http", function ($scope,$http){
        console.log("ejschartctrl Initialized.");
        var API = "/api/v1/emigrations-by-countries";
             var datos = [];

                    $http.get(API).then(function(response) {
                        var i;
                        console.log(response.status);
                        for (i = 0; i < response.data.length; i++) {
                            datos.push({ x: response.data[i].number, y: response.data[i].life, z: response.data[i].year, name: response.data[i].province });
                        }

                        console.log(datos);

                        var chart = new CanvasJS.Chart("chartContainer", {
                            animationEnabled: true,
                            zoomEnabled: true,
                            theme: "light2",
                            title: {
                                text: "Capitalization And Education Expense"
                            },
                            axisX: {
                                title: "",
                                suffix: "",
                                minimum: 0,
                                maximum: 100,
                                gridThickness: 1
                            },
                            axisY: {
                                title: "",
                                suffix: "",
                                minimum: 0,
                                maximum: 100,
                                gridThickness: 1

                            },
                            data: [{
                                type: "bubble",
                                toolTipContent: "<b>{name}</b><br/>Number: {x}  <br/> Lifes: {y} . <br/> Year: {z}",
                                dataPoints: datos
                            }]
                        });

                        chart.render();

                    });

                },
    


    
]);