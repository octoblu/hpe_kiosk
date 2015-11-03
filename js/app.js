
var app = angular.module('MyApp');

app.controller('AppCtrl', function($scope) {

  console.log('helllo');

  var state = 0;
  $scope.borderColor = "01a982";
  $scope.availText = "Available for Collaboration"
  
  $scope.available = function(){
    if(state == 1){
      $scope.borderColor = "01a982";
      $scope.availText = "Available for Collaboration"
      state = 0;
    }else if(state == 0){
      $scope.borderColor = "FF8D6D";
      $scope.availText = "Collaboration in Progress"
      state = 1;
    }

  }

});
