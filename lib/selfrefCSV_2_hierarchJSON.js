function selfrefCSV_2_hierarchJSON(csvFile, params) {
/*
Requires: papa.parse, jquery

sample usage:
	selfrefCSV_2_hierarchJSON( 'file.csv', {
		type: 'string', // if 'file', papa parse will first load the file.
		destination: 'destination', //id of the textarea object that you want to populate with the json output
		keyField: 'code',
		parentField: 'parentcode',
		amountField: 'amount',
		nameField: 'code',
		amountVar: 'value',
		startKey: 'ROOT', 
		maxDepth: 3,
		printAllColumns: true,
		extraMeta: true
	});
*/
	//defaults in case they're empty
	var type = (params.type == 'file') ? 'file' : 'string';
	var keyField = params.keyField? params.keyField : 'code';
	var parentField = params.parentField? params.parentField : 'parentcode';
	var amount = params.amountField? params.amountField : 'amount';
	var amountVar = params.amountVar? params.amountVar : 'value';
	var nameField = params.nameField? params.nameField : 'code';
	var startKey = params.startKey? params.startKey : 'ROOT';
	var maxDepth = params.maxDepth? params.maxDepth : Infinity;
	var printAllColumns = params.printAllColumns == false ? false : true;
	var extraMeta = params.extraMeta == false ? false : true;

	var alt_dest = document.getElementById('destination') ? document.getElementById('destination') : 0
	var destination = params.destination ? ( document.getElementById(params.destination) ? document.getElementById(params.destination) : alt_dest) :  alt_dest ;
	
	if(! destination) {
		//If you don't find a valid textarea, make a new one ;) from http://www.w3schools.com/js/js_htmldom_nodes.asp and http://stackoverflow.com/a/9423014/4355695
		var outputWindow = document.createElement("textarea");
		outputWindow.setAttribute("id", "destination");
		outputWindow.setAttribute("style", "width:80%");
		outputWindow.setAttribute("rows", "15");
		document.body.appendChild(outputWindow);
		destination = document.getElementById('destination');
	}

	if (!csvFile) { 
		console.log("Where's the CSV data??");
		destination.value = "Where's the CSV data??";
		destination.focus();
		return;
	} else 
	destination.value = 'loading, please wait...';
	
	if(type == 'file') {
		Papa.parse(csvFile, {
			download: true,
			header: true,
			dynamicTyping: true,
			error: function(results) {
				console.log('Error: Invalid CSV file : "'+csvFile+'". Give me something real, please.');
				destination.value = 'Error: Invalid CSV file : "'+csvFile+'". Give me something real, please.';
				destination.focus();
				return;
			},
			complete: function(results) {
				makeHierarchy(results);
				
			} // oncomplete function over
		}); // papa parse function over
	} else makeHierarchy(csvFile);


	function makeHierarchy(results) {
		destination.value = '';
			var level = 0;
			var finalOutput = ''; // this will collect and hold the created JSON
			function csvIterator(key, notlast) {
				var sum=0, childrenCount=0;
				// filtering this particular row
				var thisrow = results.data.filter( function(data){return data[keyField] == key;} );
				//does it have any kids?
				var children = results.data.filter( function(data){return data[parentField] == key;} );
				var numkids = children.length;

				if (! thisrow.length) {
					console.log('No entry found for code ' + key);
					return 0;
				} else if (thisrow.length > 1) {
					console.log('Warning: Multiple entries found for code ' + key + ':\n' + JSON.stringify(thisrow) + '\nTaking first one only.');
				}
				
				
				var output = '{ ';
				//### PRINT ALL COLUMNS ######
				// warning: what happens if any of the columns are titled name, level, subitems or the amountVar(value) ??
				// >> checked.. in http://jsonformatter.org/, it said valid json, and upon beautifying, it deleted the earlier instance and kept only the latest one. So for safety it might be better to keep the print-all at top and the metadata below!
				if(printAllColumns) {
					for ( var i in thisrow[0]) {
						output += '"'+i+'": "'+thisrow[0][i] + '", ';
					}
				}

				//###### WRITING THE METADATA #########
				output += '"name": "' + thisrow[0][nameField] + '"'
				
				if(extraMeta) output += ', "level": "' + level + '", "subitems": ' + numkids;
				
				
				if(numkids) if(level <= maxDepth-1) output += ', "children": [';
				if(level <= maxDepth) finalOutput += output;
				level++;
				for ( var n in children ) {
					holder = parseFloat( csvIterator(children[n][keyField], (numkids - n - 1)) ); // recursive : a function called from within the same function...
					var thisamount = parseFloat(children[n][amount]) ? parseFloat(children[n][amount]) : 0;
					sum += parseFloat( holder ? holder : thisamount );
				}
				level--;
				if(numkids) {
					if(level <= maxDepth-1) finalOutput += ']';
					if(level <= maxDepth) finalOutput += ', "' + amountVar + '": ' + sum ;
				} else {
					var publishedamount = parseFloat(thisrow[0][amount])?parseFloat(thisrow[0][amount]):0 ;
					if(level <= maxDepth) finalOutput += ', "' + amountVar + '": ' + publishedamount + ' ';
				}
				if(level <= maxDepth) finalOutput += '}';
				if(notlast) if(level <= maxDepth) finalOutput += ',';
				return sum;				
			} // csvIterator function over
			if(! csvIterator(startKey,0) )
				destination.value = 'Something is wrong. Either the startKey, "'+startKey+'" is not being found in the given file under "' + keyField + '" column, or the numbers under (column "'+ amount + '") are invalid or adding up to zero. Please check and set parameters properly.';
			else destination.value = JSON.stringify( JSON.parse( finalOutput ), null, 2); //formatting the JSON data, from http://stackoverflow.com/a/3515761/4355695
			destination.focus();
		}
		
} // selfrefCSV_2_hierarchJSON function over
