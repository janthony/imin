angular.module('imin.services')
.factory('WDPAService', function( $http, leafletData ) {

	var fences = [];
	var reload_fence = {}
	var features = {};
	var gjLayer;

	return {
		// var _ = require('lodash');  -- need underscore, lodash, or equivalent for _.extend()
		// leaflet.js  -- provides L
		// leaflet-pip.min.js -- provides leafletPip  [ https://github.com/mapbox/leaflet-pip ]

		get_nearby_features: function (lat, lon, radius_km) {
			// lat = -33;
			// lon = 150;
			// radius_km = 10;
		    var lon360;
		    if (!(radius_km)) {
			    radius_km = 50;
		    }

		    var radius_m = radius_km * 1000;
		    // Assumes lon is between -180 to 180
		    if (lon < 0) {
		        lon360 = lon + 360;
		    } else {
		        lon360 = lon - 360;
		    }
		    // Get by geography great-circle lookup, one query but it's kind of expensive at large radii
		    // http://carbon-tool.cartodb.com/api/v2/sql?format=geojson&q=SELECT * FROM public.wdpa_poly_production WHERE ST_DWithin(ST_SetSRID(ST_Point(lon,lat),4326)::geography,the_geom::geography, radius_m)
		    // OR
		    // Get by geometry webmercator distance lookup, need to search point and point translated 360 degrees longitude
		    // Get centroids and radius estimates
		    $http.get("http://carbon-tool.cartodb.com/api/v2/sql?format=geojson&q=SELECT f.wdpaid, ST_Centroid(f.env) as the_geom, " + 
		    			"ST_Distance(ST_Centroid(f.env)::geography, " + 
		    			"ST_SetSRID(ST_MakePoint(ST_XMin(f.env),ST_YMin(f.env)),4326)::geography)/2 as radius " + 
		    			"FROM (SELECT wdpaid, ST_Envelope(the_geom) as env FROM public.wdpa_poly_production " + 
		    			"WHERE ST_DWithin(ST_Transform(ST_SetSRID(ST_Point(" + 
		    			lon + "," + lat + "),4326),3857),the_geom, " + radius_m + 
		    			") OR ST_DWithin(ST_Transform(ST_SetSRID(ST_Point(" + lon360 + "," + lat + 
		    			"),4326),3857),the_geom_webmercator, " + radius_m + ")) as f").
		        success(function(data, status, headers, config) {
		            fences = [];
		            for (var i=0; i < data['features'].length; i++) {
		                fences.push({'centroid': data['features'][i]['geometry']['coordinates'], 'radius_km': data['features'][i]['properties']['radius'], 'wdpaid': data['features'][i]['properties']['wdpaid']});
		            }
		            // Send fences to phone API
		            // Also set up a geofence to fetch new boundaries when we are 80% of radius distace from initial data download point
		            reload_fence = {lon: lon, lat: lat, radius_m: radius_km*0.8};
		        }).
		        error(function(data, status, headers, config) {
		            // do something about errors, or don't
		        });

		    var lefletservice = leafletData;
		    // Get actual geometries
		    $http.get("http://carbon-tool.cartodb.com/api/v2/sql?format=geojson&q=SELECT wdpaid, the_geom FROM public.wdpa_poly_production " + 
		    			"WHERE ST_DWithin(ST_Transform(ST_SetSRID(ST_Point(" + lon + "," + lat + "),4326),3857),the_geom, " + radius_m + 
		    			") OR ST_DWithin(ST_Transform(ST_SetSRID(ST_Point(" + lon360 + "," + lat + "),4326),3857),the_geom_webmercator, " + radius_m + ")").
		        success(function(data) {
		            // do something with the features, like getting metadata and saving them in localstorage
		            for (var i=0; i < data['features'].length; i++) {
		                $http.get("http://alpha.protectedplanet.net/api/v3/protected_areas/" + data['features'][i]['properties']['wdpaid'])
		                    .success(function(attr) {
		                    _.extend(data['features'][i]['properties'], attr);
		                    });
		            }
		            features = data;


					leafletData.getMap().then(function(map) {
			            L.geoJson(features,{
			            	style: function (feature) {
						        return {color: "#ff7800", weight: 1};
						    }
						})
						.addTo(map);
            		});

		        }).
		        error(function(data, status, headers, config) {
		            // do something about errors, or don't
		        });
		},

		am_i_in: function(lat, lon) {
		    return leafletPip.pointInLayer([lon, lat], gjLayer);
		    // results is an array of L.Polygon objects containing that point
		}
	};
});
