angular.module('imin.controllers', [])


// A simple controller that fetches a list of data from a service
.controller('HomeCtrl', function($scope, CartodbService) {
		var onSuccess = function(position) {
	    alert('Latitude: '          + position.coords.latitude          + '\n' +
	          'Longitude: '         + position.coords.longitude         + '\n' +
	          'Altitude: '          + position.coords.altitude          + '\n' +
	          'Accuracy: '          + position.coords.accuracy          + '\n' +
	          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
	          'Heading: '           + position.coords.heading           + '\n' +
	          'Speed: '             + position.coords.speed             + '\n' +
	          'Timestamp: '         + position.timestamp                + '\n');
	};

	function onError(error) {
	    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
	}

  // "Pets" is a service returning mock data (services.js)
  navigator.geolocation.getCurrentPosition(onSuccess, onError);
})
.controller('SignupCtrl', function($scope, $state) {
  $scope.signup = function(){
 	$state.transitionTo("home");
  	console.log("route to home");
  };
});
