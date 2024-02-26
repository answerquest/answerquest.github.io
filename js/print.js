// print.js
// adapted from https://github.com/WRI-Cities/payanam/blob/master/js/print.js

// GLOBAL CONSTANTS, VARIABLES
const start_location = [18.5175,73.8597];
const start_zoom = 15;
const max_zoom = 21;
var shapeLayer = L.geoJson(null);

const ORIG_W = 1000;
const ORIG_H = 1450;

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
	preferCanvas: true,
	// zoomDelta: 0.1, zoomSnap:0.1 // reverted from this fractional zoom setting, with this on, the image saving is bugging out, giving some other area only in background.
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

var overlays = {
    "shape": shapeLayer,
};
var layerControl = L.control.layers(baseLayers, overlays, { position: 'topleft' }).addTo(map);
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
	position: 'topleft', // Leaflet control position
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
	onEachFeature: (feature, layer) => {
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

L.control.scale({ metric: true, imperial: false, position:'topleft' }).addTo(map);

map.on("bfl:layerloaded", (ev) => {
	// console.log("Your file was read successfully!! Event: ", ev);
	let color = $(`#color`).val();
	let weight = parseFloat($(`#weight`).val());
	shapeLayer.eachLayer(r => {
		r.setStyle({ 
			opacity: $('#slider2').val()/100,
			fillOpacity: $('#slider1').val()/100,
			color: color, 
			fillColor: color, 
			weight:weight
		});
	});
});

// ###############################################33
function changeDimensions(reset=false, preset=false) {
	// console.log("changing dimensions");
	// console.log("chosen preset: " + $('#presets').val(), reset, preset);
	var w;
	var h;
	var pagew = '21cm';
	var pageh = '29.7cm';
	if(reset) {
		// console.log("resetting");
		$(`.width`).val(ORIG_W);
		$(`.height`).val(ORIG_H);
		w = ORIG_W;
		h = ORIG_H;
	}
	else if (preset) {
		switch ($('#presets').val()) {
			case "":
				return;
			case "A4_300":
				w = 2480;
				h = 3508;
				break;
			case "A4_150":
				w = 1240;
				h = 1754;
				break;
			case "A3_300":
				w = 4960;
				h = 7016;
				pagew = '29.7cm';
				pageh = '42cm';
				break;
			case "A3_150":
				w = 1754;
				h = 2480;
				pagew = '29.7cm';
				pageh = '42cm';
				break;
			case "A2_300":
				w = 4960;
				h = 7016;
				pagew = '42cm';
				pageh = '59.4cm';
				break;
			case "A2_150":
				w = 2480;
				h = 3508;
				pagew = '42cm';
				pageh = '59.4cm';
				break;
			case "A1_300":
				w = 7016;
				h = 9933;
				pagew = '59.4cm';
				pageh = '84.1cm';
				break;
			case "A1_150":
				w = 3508;
				h = 4967;
				pagew = '59.4cm';
				pageh = '84.1cm';
				break;
			case "A0_300":
				w = 9933;
				h = 14043;
				pagew = '84.1cm';
				pageh = '118.9cm';
				break;
			case "A0_150":
				w = 4967;
				h = 7022;
				pagew = '84.1cm';
				pageh = '118.9cm';
				break;
		}
		$(`.width`).val(w);
		$(`.height`).val(h);
	} else {
		w = parseInt($(`.width`).val());
		h = parseInt($(`.height`).val());
	}
	
    $(`.page`).css('width',`${w}px`);
    $(`.page`).css('height',`${h}px`);

	// body cm height and width setting as per preset
	var cssRules = document.querySelector('style').sheet.cssRules;
	for (var i = 0; i < cssRules.length; i++) {
        // Check if the rule is inside the @media print block
        if (cssRules[i].media && cssRules[i].media.mediaText === 'print') {
            // Check if the rule targets the body element
            if (cssRules[i].selectorText === 'body') {
                // Change the width and height values
                cssRules[i].style.width = pagew;
                cssRules[i].style.height = pageh;
            }
        }
    }

    map.invalidateSize();
    // from https://stackoverflow.com/questions/24412325/resizing-a-leaflet-map-on-container-resize 
    //Checks if the map container size changed and updates the map if so — call it after you've changed the map size dynamically
    
}

function changeColor() {
	let color = $(`#color`).val();
	let weight = parseFloat($(`#weight`).val());
	shapeLayer.eachLayer(r => {
		r.setStyle({ color: color, fillColor: color, weight:weight });
	});

}

function zoomFit(){
	map.fitBounds(shapeLayer.getBounds(), {padding:[5,5], maxZoom:17});
}


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

function flip(){
	let w = parseInt($(`.width`).val());
	let h = parseInt($(`.height`).val());
	let temp = w;
	w = h;
	h = temp;
	$(`.width`).val(w);
	$(`.height`).val(h);
	changeDimensions();
}

function save_image(format='png') {
	$('#save_image_status').html("Generating image..");
	leafletImage(map, function(err, canvas) {
		// note: webp format is possible
		var dataURL = canvas.toDataURL(`image/${format}`);
		var link = document.createElement('a');
		link.download = `map.${format}`; // Set the download filename
		link.href = dataURL; // Set the data URL as the link href
		// Trigger a click event on the link to start the download
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		$('#save_image_status').html("Image saved.");
	});
}