angular.module('imin.controllers', [])


// A simple controller that fetches a list of data from a service
.controller('HomeCtrl', function($scope, CartodbService) {
  // "Pets" is a service returning mock data (services.js)
  $scope.pets = PetService.all();
})
.controller('SignupCtrl', function($scope, $state) {
  $scope.signup = function(){
 	$state.transitionTo("home");
  	console.log("route to home");
  };
});
