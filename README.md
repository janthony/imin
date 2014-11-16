I'm In! World Parks Edition
==========================

Hey! We'll let you know when you enter a protected area anywhere on Earth, from national parks in Sub-Saharan Africa to marine protected areas in Australia.  Find out if there are any activities restricted within the park, learn about important points of interest, and see recent tweets and photos from others nearby in the park.

Also, I'm In! Park Manager Dashboard
--------------------------

See visitor entrances and exits to protected areas to which you subscribe.  This is a perfect drop in to Sky Dipper.
Just query the CartoDB table at http://mpatlas.cartodb.com/tables/im_in_alerts

Uses ionic-angular-cordova-seed to run the mobile app

Mockups
--------
Here is the prototype for a guide to the functional design.
http://invis.io/YT1P7Z5H7

Please use this only as a functional guide and feel free to add whatever design you like. Comments annotated to describe intended user flow.


Protected Areas boundaries from 
==========================

Hosted on CartoDB here:
https://carbon-tool.cartodb.com/tables/wdpa_poly_production/public/map
Query boundaries on distance query from mobile user location, return geojson features (boundaries + metadata)

Protected Area metadata available via ProtectedPlanet API
http://alpha.protectedplanet.net/api/v3/protected_areas/wdpaid

Use point in polygon to create geofence alerts
https://github.com/mapbox/leaflet-pip
or original
https://github.com/substack/point-in-polygon

Application Design:
===================
* App is based on [ionic framework](http://ionicframework.com/). This is an angularjs app. The entry point to the application is app.js. The default route is signon. 
* The app uses [geolocation](https://github.com/apache/cordova-plugin-geolocation) to read the current device location. Once the location information is available, cartodb protected areas boundary is queried with the current lat,lon and radius to get protected in the vicinity. 
* App uses [angular-leaflet-directive](http://tombatossals.github.io/angular-leaflet-directive/#!/) to display the protected areas in the visinity (this is temporary and would be remoeved as there is no map in the design).

TODO: 
* When the protected areas are available, instead of adding to the leaflet map, should add it to the geofence. [PhoneGap geofencing cordova plugin](https://github.com/radshag/PhoneGap-Geofencing) is used for this. The code is currently commented out. Its just a matter of uncommenting this in the controller.js file and adding the protected area features as geofence regision. The geofence library triggers events when the device location crosses the boundary.


To run:
=======
* Clone the repo
* Add cordova
* Add ios platform
* run cordova emulat ios (follow the instructions to install the emulator if not available)

