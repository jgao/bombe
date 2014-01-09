function renderTree(treeData) {

	var tree = d3.layout.tree()
	    .sort(null)
	    .size([1000, 1000 - 20*10])
	    .separation(function(a, b) { return (a.parent == b.parent ? 0.5 : 1); })
	    .children(function(d)
	    {
	        return (!d.children || d.children.length === 0) ? null : d.children;
	    });

	var nodes = tree.nodes(treeData);
	var links = tree.links(nodes);

    //console.log(nodes);

	/*
	     <svg>
	         <g class="container" />
	     </svg>
	  */
	 var layoutRoot = d3.select('#treeview')
	     .append("svg:svg").attr("width", 1000).attr("height", 1000)
	     .append("svg:g")
	     .attr("class", "container")
	     .attr("transform", "translate(" + 80 + ",0)");


	 // Edges between nodes as a <path class="link" />
	 var link = d3.svg.diagonal()
	     .projection(function(d)
	     {
	         return [d.y, d.x];
	     });

	 layoutRoot.selectAll("path.link")
	     .data(links)
	     .enter()
	     .append("svg:path")
	     .attr("class", "link")
	     .attr("d", link);

	 /*
	     Nodes as
	     <g class="node">
	         <circle class="node-dot" />
	         <text />
	     </g>
	  */

	 var nodeGroup = layoutRoot.selectAll("g.node")
	     .data(nodes)
	     .enter()
	     .append("svg:g")
	     .attr("class", "node")
         .attr("id", function(d){return d.data.graphid})
	     .attr("transform", function(d)
	     {
	         return "translate(" + d.y + "," + d.x + ")";
	     });

    // nodes.forEach( function(node){ 
    //     node.attr("id", node.data.graphid)
    // });

	 nodeGroup.append("rect")
	     .attr("class", "nodebox")
	     .attr("x", -150/2)
	     .attr("y", -100/2)
	     .attr("width", 150)
	     .attr("height", 100);

    //data = "/uploads/data.tsv"

	miniGraph(treeData);
}

$(document).ready( function(){ 
    treeData = $.getJSON("/uploads/tree.json", function (d) {
        //console.log(d);
        renderTree(d);
        //renderGraph(d);

        $(window).resize(function() {
            //renderGraph(d); 
            //console.log("test");
        });

        $(".node").click( function(){
            console.log($(this).attr("id"));
            //renderGraph(d, $(this).attr("id")); <--- This is where I left off! Need to update renderGraph() -EDDIE
        });
    });
    
     
    
    $(window).resize(function() {
        //renderGraph(treeData); 
    });
    //data = ["/uploads/data.tsv", "/uploads/data.tsv" , "/uploads/data.tsv"];
});