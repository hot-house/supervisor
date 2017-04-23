app.controller('MainCtrl', function ($scope, extract) {

  $scope.extract = extract

  // $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];

  // $scope.series = [ 'Arduino 1' ]
  $scope.series = ['temperature', 'luminosity'];
   $scope.onClick = function (points, evt) {
     console.log(points, evt);
   };
   $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
   $scope.options = {
     scales: {
       yAxes: [
         {
           id: 'y-axis-1',
           type: 'linear',
           display: true,
           position: 'left',
          //  ticks: {
          //       suggestedMin: 65,    // minimum will be 0, unless there is a lower value.
          //   }
        },
        {
         id: 'y-axis-2',
         type: 'linear',
         display: true,
         position: 'right'
       }
       ]
     }
   }
})
