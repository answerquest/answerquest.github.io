# answerquest.github.io
Repo for programs, apps. [See the repo](https://github.com/answerquest/answerquest.github.io).

[Youtube video info extractor](youtube-info-extractor.html)

[Youtube: Get all vids of a youtube user, channel or playlist](youtube-all-vids-info.html)

[Self-referencing CSV to Hierarchical JSON converter](selfrefCSV_2_hierarchJSON.html) : for visualizing tabular data that has nested hierarhcies with rows having parent-child configurations.

[Synchronized Maps : Pune Prabhags](pune_07-12-17_sync.html) Side-by-side comparison of maps from pre-2012, 2012-17, and 2017-onwards

[Collecting data online on a map-enabled form](form2mapbox-encrypted.html) Using mapbox javascript api without server, map-based form submitting data to a mapbox dataset and displaying data collected so far.

[Playback of GPS data of multiple buses](https://answerquest.github.io/GPSPlayback/)

[Bus Stops and Routes Manager](http://nikhilvj.cu.cc/busroutes/): A prototype for interlinking of two types of databases to each other inside wordpress platform, and having a possibility for creating a GTFS feed creator.

[Words Replacer](words-replacer.html): Ctrl+H on steroids. Make a range of word/phrase replacements on a text sequentially.

[Overlap](overlap.html) : Load image/raster maps like Development Plan, fading in and out over zoomable web map with satellite view and other map views.

[Overlap-custom](overlap-custom.html) : Overlay your own raster or georeferenced map. <br>Put any tiles URL schema like `../{z}/{x}/{y}..` at bottom and press Update. 
<br>Explore <http://mapwarper.net> for many such rasters. 
<br>Mapbox tilesets can also be used, look up its URL schema online.
<br>You can also directly load the tileset by putting `?url={URL}` at the end, 
<br>or `?mapwarper={id}` for Mapwarper maps, 
<br>or `mapbox={id}&accesstoken={accesstoken}` for Mapbox tilesets. (If you have geo-referenced your map using QGIS and have the GeoTIFF file on your computer, you can upload it to Mapbox Studio under Tilesets. Upload it there, then use this tool to make it shareable on the web.)

[bangalore-landuse-existingVproposed.html](bangalore-landuse-existingVproposed.html) : Bangalore Dec2017 Existing vs Proposed Land Use Maps side-by-side comparison, overlaid over web map. Maps georeferenced by Arun Ganesh, Datameet.

[Overlap-custom side-by-side](overlap-custom-side.html) : When one georeferenced raster layer overlay isn't enough and you need to compare two of them side by side!

[Offline Form](offline-form.html) : An example of a form in a standalone webpage that saves the submitted data as a local CSV file in your downloads folder. Good for situations where you have to take registrations and have slow or no internet. Works in Google Chrome, Chromium/Iron browser; not in Firefox as of now. Later you can combine the CSV files via commands.<br>
Windows : `copy *.csv all.txt`<br>
Ubuntu: `for f in *.csv; do cat "$f" >> all.txt; echo "">> all.txt; done`

[Create KML shapes from lat-long strings in ona.io csv](kmlcreate.html)
