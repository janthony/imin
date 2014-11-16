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
Here is the prototype with a bit more design
http://invis.io/M81P861N9 


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
