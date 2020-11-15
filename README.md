# Personal Website
**[Click here to open my personal webpage / CV](http://nikhilvj.co.in/).**

# answerquest.github.io
Repo for programs, apps. [See the repo](https://github.com/answerquest/answerquest.github.io).

## Youtube related
[Youtube video info extractor](youtube-info-extractor.html)

[Youtube: Get all vids of a youtube user, channel or playlist](youtube-all-vids-info.html)

## Utilities for handling data
[Words Replacer](words-replacer.html): Ctrl+H on steroids. Make a range of word/phrase replacements on a text sequentially.

[Table un-pivot](table-unpivot.html): Convert "wide" or pivoted chart (which is human-friendly) to "narrow" or linear table (which is machine-friendly and workable for visualizations, calculations).

[Offline Form](offline-form.html) : An example of a form in a standalone webpage that saves the submitted data as a local CSV file in your downloads folder. Good for situations where you have to take registrations and have slow or no internet. Works in Google Chrome, Chromium/Iron browser; not in Firefox as of now. Later you can combine the CSV files via commands.<br>
Windows : `copy *.csv all.txt`<br>
Ubuntu: `for f in *.csv; do cat "$f" >> all.txt; echo "">> all.txt; done`

[Self-referencing CSV to Hierarchical JSON converter](selfrefCSV_2_hierarchJSON.html) : for visualizing tabular data that has nested hierarhcies with rows having parent-child configurations.


## Maps related
[Pune ward map shapefiles](https://github.com/datameet-pune/datameet-pune.github.io/tree/master/maps) Collection of ward maps of Pune old and new

[Synchronized Maps : Pune Prabhags](pune_07-12-17_sync.html) Side-by-side comparison of maps from pre-2012, 2012-17, and 2017-onwards

[Collecting data online on a map-enabled form](form2mapbox-encrypted.html) Using mapbox javascript api without server, map-based form submitting data to a mapbox dataset and displaying data collected so far.

[Playback of GPS data of multiple buses](https://answerquest.github.io/GPSPlayback/)

<!--
[Overlap](overlap.html) : Load image/raster maps like Development Plan, fading in and out over zoomable web map with satellite view and other map views.
[Overlap-custom](overlap-custom.html) : Overlay your own raster or georeferenced map. <br>Put any tiles URL schema like `../{z}/{x}/{y}..` at bottom and press Update. 
<br>Explore <http://mapwarper.net> for many such rasters. 
<br>Mapbox tilesets can also be used, look up its URL schema online.
<br>You can also directly load the tileset by putting `?url={URL}` at the end, 
<br>or `?mapwarper={id}` for Mapwarper maps, 
<br>or `mapbox={id}&accesstoken={accesstoken}` for Mapbox tilesets. (If you have geo-referenced your map using QGIS and have the GeoTIFF file on your computer, you can upload it to Mapbox Studio under Tilesets. Upload it there, then use this tool to make it shareable on the web.)
-->

[bangalore-landuse-existingVproposed.html](bangalore-landuse-existingVproposed.html) : Bangalore Dec2017 Existing vs Proposed Land Use Maps side-by-side comparison, overlaid over web map. Maps georeferenced by Arun Ganesh, Datameet.

[Overlap-custom side-by-side](overlap-custom-side.html) : Overlay one or two georeferenced raster images layer on top of a web map, zoom and fade in/out. Great for comapring development plans, comparing with present day satellite imagery etc.

[kmlcreate](kmlcreate.html) - Create KML shapefiles from lat-long strings collectd in ODK form data]

[Simple location picker](leaflet-center-location-picker.html) like Ola/Uber where you move the map around and the marker is the map's center.

[Draw](draw.html) : Draw shapes on a map, and then export your work in geojson shapefile format.

[leaflet-painting](https://server.nikhilvj.co.in/tilemaker/leaflet-painting.html) : Using leaflet tech to make zoomable maps of large images. Can be used for curating, digital tours of art pieces or any image which is large in size but has intricate details. See other images also tiled: [babel](https://server.nikhilvj.co.in/tilemaker/leaflet-painting.html?p=babel), [egnazio](https://server.nikhilvj.co.in/tilemaker/leaflet-painting.html?p=egnazio), [ajantacave](https://server.nikhilvj.co.in/tilemaker/leaflet-painting.html?p=ajantaCave26#3/75.78/-87.10), [amirHamza](https://server.nikhilvj.co.in/tilemaker/leaflet-painting.html?p=amirHamza), [benares](https://server.nikhilvj.co.in/tilemaker/leaflet-painting.html?p=benares), [hydcarpet](https://server.nikhilvj.co.in/tilemaker/leaflet-painting.html?p=hydcarpet#4/82.60/-91.45), [nasaxdf](https://server.nikhilvj.co.in/tilemaker/leaflet-painting.html?p=nasaxdf&z=4#2/63.2/-44.5), [qutub minar](https://server.nikhilvj.co.in/tilemaker/leaflet-painting.html?p=qutub1&z=4), [taj mahal](https://server.nikhilvj.co.in/tilemaker/leaflet-painting.html?p=tajMahal&z=6#1/0/0), [peshwai](https://server.nikhilvj.co.in/tilemaker/leaflet-painting.html?p=templePeshwai&z=5)

[Openstreetmap.in](osm-in.html) : Leaflet map with background map tiles created by folks at openstreetmap.in, having Indian national boundaries as accepted by govt of India

## Pune Budget, related work
[Self-referencing table to Hierarchical JSON converter](https://files.nikhilvj.co.in/selfrefCSV_2_hierarchJSON.html) A JS tool for converting flat tables to hierarchical JSON. I created and used this to create the data the fed into the visualizations below.

[Pune Budget 2016-17 Expenditures at a Glance](https://files.nikhilvj.co.in/pune-budget-viz-2.html) Interactive Sunburst visualisation of Pune's Budget document, 2016-17

[Pune Budget 2016-17 Expenditures in collapsible tables](https://files.nikhilvj.co.in/pune-budget-viz-4.html) Pune's 2016-17 budget data in tabular form with collapsible levels
