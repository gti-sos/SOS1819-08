angular
    .module("app")
    .controller("ejschartctrl",["$scope","$http", function ($scope,$http){
        console.log("ejschartctrl Initialized.");
        var API = "/api/v1/emigrations-by-countries";
             

                    $http.get(API).then(function(response) {
                        var i;


                        

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
                            data: [response.data[0].country ,response.data[1].country
                          
                        ]
                        });

                        chart.render();

                    });

                },
    


    
]);