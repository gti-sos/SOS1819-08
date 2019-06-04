angular
    .module("app")
    .controller("jqueryEmigrations", ["$scope", "$http",
        function($scope, $http) {
            console.log("jqueryEmigrations inicializado!");

            var API = "api/v1/emigrations-by-countries";

            $http.get(API).then(function(response) {

	

<LineChart
  width={400}
  height={400}
  data={1,2,3,4,5}
  margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
>
  <XAxis dataKey="name" />
  <Tooltip />
  <CartesianGrid stroke="#f5f5f5" />
  <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0} />
  <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />
</LineChart>
});



            
        }
    ]);
