function renderGraph(data) {
	
	$('.plot').each( function(index) {
	    if ($(this).parent().parent().parent().parent().css('display') != 'none') {
	    	console.log($(this).parent().parent().parent().parent().css('display'));
			$(this).html('');

			var margin = {top: 20, right: 20, bottom: 40, left: 50};
		    var width = $(this).width() - margin.left - margin.right;
		    var height = $(this).height() - margin.top - margin.bottom;

			var parseDate = d3.time.format("%d-%b-%y").parse;

			var x = d3.time.scale()
			    .range([0, width]);

			var y = d3.scale.linear()
			    .range([height, 0]);

			var xAxis = d3.svg.axis()
			    .scale(x)
			    .orient("bottom");

			var yAxis = d3.svg.axis()
			    .scale(y)
			    .orient("left");

			var line = d3.svg.line()
			    .x(function(d) { return x(d.date); })
			    .y(function(d) { return y(d.close); });

			 var svg = d3.select(this).append("svg")
			    .attr("width", width + margin.left + margin.right)
			    .attr("height", height + margin.top + margin.bottom)
			  .append("g")
			    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			console.log("index: " + index);
			d3.tsv(data[index], function(error, data) {
			    
			  data.forEach(function(d) {
			    d.date = parseDate(d.date);
			    d.close = +d.close;
			  });


			  x.domain(d3.extent(data, function(d) { return d.date; }));
			  y.domain(d3.extent(data, function(d) { return d.close; }));

			
			  svg.append("g")
			      .attr("class", "x axis")
			      .attr("transform", "translate(0," + height + ")")
			      .call(xAxis)
			     .append("text")
			      .attr("x", width)
			      .attr("dy", "2.7em")
			      .style("text-anchor", "end")
			      .text("X-Data (Units)");

			  svg.append("g")
			      .attr("class", "y axis")
			      .call(yAxis)
			    .append("text")
			      .attr("transform", "rotate(-90)")
			      .attr("y", 6)
			      .attr("dy", "-3em")
			      .style("text-anchor", "end")
			      .text("Y-Data (Units)");

			  svg.append("path")
			      .datum(data)
			      .attr("class", "line")
			      .attr("d", line);
			});
		};
	});	
}

function renderMiniGraphs(data) {
	
	$('.node').each( function (index) {
	    var width = 60;
	    var height = 40;

		var parseDate = d3.time.format("%d-%b-%y").parse;

		var x = d3.time.scale()
		    .range([0, width]);

		var y = d3.scale.linear()
		    .range([height, 0]);

		var line = d3.svg.line()
		    .x(function(d) { return x(d.date); })
		    .y(function(d) { return y(d.close); });

		 /*var svg = d3.select(this).append("svg")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.top + margin.bottom)
		    .attr("x", xpos)
		    .attr("y", ypos)
		    .append("g")
		    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");*/

		var obj = d3.select(this);

		 /*obj.append("rect")
		     .attr("class", "nodebox")
		     .attr("width", 100)
		     .attr("height", 160)
		     .attr("x", -80/2)
		     .attr("y", -60/2);*/

		d3.tsv(data, function(error, data) {
		  data.forEach(function(d) {
		    d.date = parseDate(d.date);
		    d.close = +d.close;
		  });

		  x.domain(d3.extent(data, function(d) { return d.date; }));
		  y.domain(d3.extent(data, function(d) { return d.close; }));

		  obj.append("path")
		      .datum(data)
		      .attr("class", "line")
		      .attr("d", line)
		     .attr("transform", function(d)
		     {
		         return "translate(" + -30 + "," + -20 + ")";
		     });
		      
		});
	});
}