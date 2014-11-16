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

	// gets called when region monitoring event is submitted from iOS, Android
	function processRegionMonitorCallback (result) {
		var callbacktype = result.callbacktype;
    	if (callbacktype == "initmonitor") {
			alert("init monitoring");
    	}
    	else if (callbacktype == "locationupdate") {
			alert("location updated");
	        var fid = result.regionId;

	        var new_timestamp = result.new_timestamp;
	        var new_speed = result.new_speed;
	        var new_course = result.new_course;
	        var new_verticalAccuracy = result.new_verticalAccuracy;
	        var new_horizontalAccuracy = result.new_horizontalAccuracy;
	        var new_altitude = result.new_altitude;
	        var new_latitude = result.new_latitude;
	        var new_longitude = result.new_longitude;

	        var old_timestamp = result.old_timestamp;
	        var old_speed = result.old_speed;
	        var old_course = result.old_course;
	        var old_verticalAccuracy = result.old_verticalAccuracy;
	        var old_horizontalAccuracy = result.old_horizontalAccuracy;
	        var old_altitude = result.old_altitude;
	        var old_latitude = result.old_latitude;
	        var old_longitude = result.old_longitude;

	    } else if (callbacktype == "monitorremoved") {

	    } else if (callbacktype == "monitorfail") {

	    } else if (callbacktype == "monitorstart") {

	    } else if (callbacktype == "enter") {

	        //result.callbacktype
	        //result.regionId
	        //result.message
	        //result.timestamp
			alert("entered region");


	    } else if (callbacktype == "exit") {
			alert("exited region");

	        //result.callbacktype
	        //result.regionId
	        //result.message
	        //result.timestamp

	    }
	};  

	window.plugins.DGGeofencing.initCallbackForRegionMonitoring(new Array(), processRegionMonitorCallback, function(error) {
        alert("init error");
    });

	// var params = [fid, latitude, longitude, radius];
	var params = ["1", "40.781552", "-73.967171", "150"];
	alert("geofening " + window.plugins.DGGeofencing.initCallbackForRegionMonitoring);
	window.plugins.DGGeofencing.startMonitoringRegion(params, function(result) {}, function(error) {
	    alert("failed to add region");
	});
})
.controller('SignupCtrl', function($scope, $state) {
  $scope.signup = function(){
 	$state.transitionTo("home");
  	console.log("route to home");
  };
});
