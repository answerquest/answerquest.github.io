// print.js
// adapted from https://github.com/WRI-Cities/payanam/blob/master/js/print.js

// GLOBAL CONSTANTS, VARIABLES
const start_location = [18.5175,73.8597];
const start_zoom = 15;
const max_zoom = 21;
var shapeLayer = L.geoJson(null);


// ######################################
// LEAFLET MAP

// not using Leaflet-providers plugin as it's not supporting maxNativeZoom, using original urls from https://leaflet-extras.github.io/leaflet-providers/preview/
var OSM = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 21, maxNativeZoom: 19, subdomains: 'abc',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var esriWorld = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 21, maxNativeZoom: 19,
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd', maxZoom: 21, maxNativeZoom: 20,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
});

// var CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
// 	subdomains: 'abcd', maxZoom: 21,  maxNativeZoom: 20,
// 	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
// });

// var gStreets = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', { maxZoom: 20, subdomains: ['mt0', 'mt1', 'mt2', 'mt3'] });
// var gHybrid = L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', { maxZoom: 20, subdomains: ['mt0', 'mt1', 'mt2', 'mt3'] });

var baseLayers = {
    "OpenStreetMap.org": OSM,
    "CartoDB Light": CartoDB_Positron,
    // "CartoDB Dark": CartoDB_DarkMatter,
    "ESRI Satellite": esriWorld,
    //  "gStreets": gStreets, 
    // "gHybrid": gHybrid 
};

var map = L.map('map', {
    center: start_location,
    zoom: start_zoom,
    layers: [OSM],
    maxZoom: max_zoom,
});

// Load India int'l boundary as per shapefile shared on https://surveyofindia.gov.in/pages/outline-maps-of-india
L.geoJSON(india_outline, {
    style: function (feature) {
        return {
            color: "black",
            fillOpacity: 0,
            weight: 3,
            opacity: 1
        };
    },
    interactive: false
}).addTo(map);

$('.leaflet-container').css('cursor', 'crosshair'); // from https://stackoverflow.com/a/28724847/4355695 Changing mouse cursor to crosshairs

L.control.scale({ metric: true, imperial: false }).addTo(map);
var myRenderer = L.canvas({ padding: 0.5 });

var overlays = {
    "shape": shapeLayer,
};
var layerControl = L.control.layers(baseLayers, overlays, { collapsed: true, autoZIndex: false }).addTo(map);
shapeLayer.addTo(map);

function tiles_loading() {
	$('#tileStatus').html("Tiles loading, pls wait..");
}	
function tiles_loaded() {
	$('#tileStatus').html("Ok to print.")
}

OSM.on('loading', tiles_loading);
OSM.on('load', tiles_loaded);

map.on('resize', function (event) {
	console.log("map resized");
});

map.on('baselayerchange', function (event) {
	$('#tileStatus').html("Layer changed, tiles loading, pls wait..");

	// Track tiles loading, loaded status from https://stackoverflow.com/a/27379032/4355695
	event.layer.on('loading', tiles_loading);
	event.layer.on('load', tiles_loaded);
});

// from https://github.com/gabriel-russo/Leaflet.BetterFileLayer?tab=readme-ov-file
var bfl_options = {
	position: 'topright', // Leaflet control position
	fileSizeLimit: 102400, // File size limit in kb (default: 1024 kb)
	style: () => {
		// console.log('hello');
		// return {
        //     color: "black",
        //     fillOpacity: 0,
        //     weight: 3,
        //     opacity: 1
        // };
	}, // Overwrite the default BFL GeoJSON style function
	onEachFeature: () => {
		console.log('hello');
	}, // Overwrite the default BFL GeoJSON onEachFeature function
	layer: shapeLayer, // If you want a custom layer to be used (must be a GeoJSON class inheritance)
	// Restrict accepted file formats (default: .gpx, .kml, .kmz, .geojson, .json, .csv, .topojson, .wkt, .shp, .shx, .prj, .dbf, .zip)
	// formats:['.geojson', '.kml', '.gpx'],
	
	text: { // If you need translate
	  title: "Upload a shape by clicking here, or drag-drop a file onto this map", // Plugin Button Text
	},
  }
L.Control.betterFileLayer(bfl_options).addTo(map);

// ###############################################33
function changeDimensions(reset=false) {

	var w = parseInt($(`.width`).val());
    var h = parseInt($(`.height`).val());
    if(reset) {
		w = ORIG_W;
		h = ORIG_H;
		$(`.width`).val(w);
		$(`.height`).val(h);
	}
    $(`.page`).css('width',`${w}px`);
    $(`.page`).css('height',`${h}px`);

    map.invalidateSize();
    // from https://stackoverflow.com/questions/24412325/resizing-a-leaflet-map-on-container-resize 
    //Checks if the map container size changed and updates the map if so — call it after you've changed the map size dynamically
    
}

function changeColor() {
	var color = $(`.color`).val();

}

function zoomFit(){
	map.fitBounds(shapeLayer.getBounds(), {padding:[5,5], maxZoom:17});
}

// Range slider, from https://www.w3schools.com/howto/howto_js_rangeslider.asp
document.getElementById("slider1").value = 60;
document.getElementById("slider2").value = 60;

document.getElementById("slider1").oninput = function() {
	shapeLayer.eachLayer(r => {
		r.setStyle({ fillOpacity:this.value/100 });
	});
}

document.getElementById("slider2").oninput = function() {
	shapeLayer.eachLayer(r => {
		r.setStyle({ opacity:this.value/100 });
	});
}

document.getElementById("slider3").oninput = function() {
	
	if (map.hasLayer(OSM)) {
		OSM.setOpacity(this.value/100);
	}
	else if (map.hasLayer(esriWorld)) {
		esriWorld.setOpacity(this.value/100);
	}
	else if (map.hasLayer(CartoDB_Positron)) {
		CartoDB_Positron.setOpacity(this.value/100);
	}
	
}