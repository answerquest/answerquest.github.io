# answerquest.github.io
Repo for programs, apps. [See the repo](https://github.com/answerquest/answerquest.github.io).

[Youtube video info extractor](youtube-info-extractor.html)

[Self-referencing CSV to Hierarchical JSON converter](selfrefCSV_2_hierarchJSON.html) : for visualizing tabular data that has nested hierarhcies with rows having parent-child configurations.

[Synchronized Maps : Pune Prabhags](pune_07-12-17_sync.html) Side-by-side comparison of maps from pre-2012, 2012-17, and 2017-onwards

[Collecting data online on a map-enabled form](form2mapbox-encrypted.html) Using mapbox javascript api without server, map-based form submitting data to a mapbox dataset and displaying data collected so far.

[Playback of GPS data of multiple buses](https://answerquest.github.io/GPSPlayback/)

[Bus Stops and Routes Manager](http://nikhilvj.cu.cc/busroutes/): A prototype for interlinking of two types of databases to each other inside wordpress platform, and having a possibility for creating a GTFS feed creator.

[Words Replacer](words-replacer.html): Ctrl+H on steroids. Make a range of word/phrase replacements on a text sequentially.

[Overlap](overlap.html) : Load image/raster maps like Development Plan, fading in and out over zoomable web map with satellite view and other map views.

[Overlap-custom](overlap-custom.html) : Load your own tileset, like [Mumbai slums data](http://mapwarper.net/maps/25733#Export_tab) for example. Put any `../{z}/{x}/{y}..` type tiles URL and paste it at bottom. Explore <http://mapwarper.net> for many such rasters. <br>Mapbox tilesets can also be used: URL schema: `https://a.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={acesstoken}` : Replace `{id}` with your tileset's map id and use your mapbox account's accessToken.
<br>You can also directly load the tileset via `?url=` parameter in the URL, [see example](https://answerquest.github.io/overlap-custom.html?url=http://mapwarper.net/maps/tile/25733/{z}/{x}/{y}.png).
