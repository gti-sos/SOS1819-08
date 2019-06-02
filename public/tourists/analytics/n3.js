angular
    .module("app", ['n3-line-chart'])
    .controller("n3Tourist", ["$scope", "$http",
            function($scope, $http) {
                console.log("highcharts inicializado!");

                var API = "api/v1/tourists-by-countries";
                



                $http.get(API).then(function(response) {

    $scope.data = {
      dataset: [
        {x: 0, y: 0, other_y: 0, val_2: 0, val_3: 0},
        {x: 1, y:  parseInt(response.data.filter(d => d.country == 'China').map(function(d) { return d["touristDeparture"] })) , other_y:  parseInt(response.data.filter(d => d.country == 'China').map(function(d) { return d['incomeTourist'] })), val_2:  parseInt(response.data.filter(d => d.country == 'China').map(function(d) { return d['arrivalTourist'] })), val_3: 14.347},
        
       ]
     };

    $scope.options = {
      axes: {
        x: {
          key: "x"
        }
      },
      tooltipHook: function(d){
        return {
          abscissas: "Foo",
          rows:  d.map(function(s){
            return {
              label: "My label: " + s.series.label,
              value: s.row.y1,
              color: s.series.color,
              id: s.series.id  
            }
          })
        }
      },
      series: [
        {
          dataset: "dataset", 
          key: 'val_2', 
          label: 'One', 
          type: ['line', 'dot', 'line', 'area'],
          color: "rgb(126, 181, 63)",
          interpolation: {mode: 'cardinal', tension: 0.7}
        },
        {
          dataset: "dataset",
          key: 'y',
          type: ['line', 'dot', 'area'],
          label: 'Two',
          color: "rgb(200, 96, 69)",
          interpolation: {mode: 'cardinal', tension: 0.7}
        },
        {
          dataset: "dataset",
          key: 'other_y',
          type: ['line', 'dot', 'area'],
          label: 'Three',
          color: "rgb(119, 48, 131)",
          interpolation: {mode: 'cardinal', tension: 0.7}
        }
      ]
    };
});
                    
           
        }
    ]);