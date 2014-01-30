var fs = require('fs');
var csv = require('csv');
var strsplit = require('strsplit');

var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');

//var delimiter = "," //e.g. can also use whitespace: " " or "\t"
var csvString = "";

var fs = require("fs");

var upload = function(req, res){
	fs.readFile(req.files.uploadedfile.path, function (err, data) {
		var email = req.body.email;

		var newPath = __dirname + "/../uploadedfiles/" + email + Date.now();

		fs.writeFile(newPath, data, function (err) {
			console.log(err);
		});

		var strData = decoder.write(data);

		var output_json = csv2json(strData, {
	        textdelim: "\""
	    });

	  res.writeHead(200, { 'Content-Type': 'application/json' });
		
		res.write(JSON.stringify(
			{
				tree: output_json
			}
		));

		res.end();
	});
};

function splitCSV(str, sep) {
    if (!(sep == " ")) {
    	return strsplit(str, sep);
    } else {
    	return strsplit(str, /\s+/);
    }
};

function csv2json (csvdata, args) {
	args = args || {};
	var delim = "";

	var csvlines = csvdata.split("\n");
	var csvheaders = ["x", "y"];
	var csvrows = csvlines.slice(1, csvlines.length);

	//Try to autodetect if the delim should be tabs or commas
	if (csvrows[0].search(",") == -1) {
		delim = " ";
	} else {
		delim = ",";
	}


	var ret = {};

	for (var h in csvheaders) {
		ret[csvheaders[h]] = [];
	}

	for(var r in csvrows) {
		if (csvrows.hasOwnProperty(r)) {
			var row = csvrows[r];
			var rowitems = splitCSV(row, delim);

			// Break if we're at the end of the file
			if(row.length == 0) break;

			var rowob = {};
			for(var i = 0 ; i < 2; i ++) { // only x y
				if (rowitems.hasOwnProperty(i)) {
					var item = rowitems[i];

					// Try to (intelligently) cast the item to a number, if applicable
					if(!isNaN(item*1)) {
						item = item*1;
					}

					ret[csvheaders[i]].push(item);
				}
			}
		}
	}

	return ret;
}


exports.upload = upload;