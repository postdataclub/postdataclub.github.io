var parallelrendering=false;
var minnodewidth = 40;
var padding = 10;
var labelformat = 1;
var labeltextformat = 0;
var showlinkcount = 0;
var paddingmultiplier = 50;
var lowopacity = 0.1;
var highopacity = 0.95;
var vmove = true;
var hmove = false;
var fixedlayout=[];
var format2Number = d3.format(",.2f"),
    format1Number = d3.format(",.1f"),
	format3Number = d3.format(",.3f"),
	formatNumber = d3.format(",.0f"),
    format = function(a) {
        return formatNumber(a)
    },color = d3.scale.category20();
	linkformat= function(a) {
		return formatNumber(a);
	},
	nodeformat= function(a) {
		return formatNumber(a);
};

var margin = {
        top: 10,
        right: 10,
        bottom: 30,
        left: 10
    },
width = document.getElementById("chart").offsetWidth - margin.left - margin.right,
height = document.getElementById("chart").offsetHeight - margin.bottom;
var svg = d3.select("#chart").append("svg")
svg.append("rect").attr("x",0).attr("y",0).attr("width","100%").attr("height","100%").attr("fill","white")
svg=svg.attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
d3.select("#chart").select("svg")

var sankey = d3.sankey().nodeWidth(30).nodePadding(padding).size([width, height]);
var path = sankey.reversibleLink();
var change = function() {};

change = function(d) {

    width = document.getElementById("chart").offsetWidth - margin.left - margin.right,
    height = document.getElementById("chart").offsetHeight - margin.bottom;
    d3.select("#chart").select("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	svg.selectAll("g").remove();
	sankey = d3.sankey().nodeWidth(30).nodePadding(padding).size([width, height]);
	sankey.nodes(d.nodes).links(d.links).layout(500);
	var g = svg.append("g") //link
		.selectAll(".link").data(d.links).enter().append("g").attr("class", "link").sort(function(j, i) {
			return i.dy - j.dy
		});
	var h = g.append("path") //path0
		.attr("d", path(0));
	var f = g.append("path") //path1
		.attr("d", path(1));
	var e = g.append("path") //path2
		.attr("d", path(2));
	g.attr("fill", function(i) {
			if (i.fill) return i.fill;
			else if (i.source.fill) return i.source.fill;
			else return i.source.color = color(i.source.name.replace(/ .*/, ""))
		}).attr("opacity", lowopacity).on("mouseover", function(d) {
			d3.select(this).style('opacity', highopacity);
		}).on("mouseout", function(d) {
			d3.select(this).style('opacity', lowopacity);
		}).append("title") //link
		.text(function(i) {
			return i.source.name + " → " + i.target.name + "\n" + linkformat(i.value)
		});
	var c = svg.append("g") //node
		.selectAll(".node").data(d.nodes).enter().append("g").attr("class", "node").attr("transform", function(i) {
			return "translate(" + i.x + "," + i.y + ")"
		}).call(d3.behavior.drag().origin(function(i) {
			return i
		}).on("dragstart", function() {
			this.parentNode.appendChild(this)
		}).on("drag", b));
	c.append("rect") //node
		.attr("height", function(i) {
			return i.dy
		}).attr("width", sankey.nodeWidth()).style("fill", function(i) {
			if (i.fill) return i.color = i.fill;
								else return i.color = color(i.name.replace(/ .*/, ""))
		}).style("stroke", function(i) {
			return d3.rgb(i.color).darker(2)
		}).on("mouseover", function(d) {
			svg.selectAll(".link").filter(function(l) {
				return l.source == d || l.target == d;
			}).transition().style('opacity', highopacity);
		}).on("mouseout", function(d) {
			svg.selectAll(".link").filter(function(l) {
				return l.source == d || l.target == d;
			}).transition().style('opacity', lowopacity);
		}).on("dblclick", function(d) {
			svg.selectAll(".link").filter(function(l) {
				return l.target == d;
			}).attr("display", function() {
				if (d3.select(this).attr("display") == "none") return "inline"
				else return "none"
			});
		}).append("title").text(function(i) {
			return i.name + "\n" + nodeformat(i.value)
			
		});
	c.append("text") //node
		.attr("x", -6).attr("y", function(i) {
			return i.dy / 2
		}).attr("dy", ".35em").attr("text-anchor", "end").attr("font-size","16px")
		.text(function(i) {
		if (labeltextformat<1){
				return i.name;
			} else {
				return "";
			}
		}).filter(function(i) {
			return i.x < width / 2
		}).attr("x", 6 + sankey.nodeWidth()).attr("text-anchor", "start")
	if (showlinkcount>0) c.append("text") //node
		.attr("x", -6).attr("y", function(i) {
			return i.dy / 2 + 20
		}).attr("dy", ".35em").attr("text-anchor", "end").attr("font-size","16px")
		.text(function(i) {
			return "→ "+(i.targetLinks.length)+" | "+(i.sourceLinks.length)+" →";
		}).filter(function(i) {
			return i.x < width / 2
		}).attr("x", 6 + sankey.nodeWidth()).attr("text-anchor", "start")
	c.append("text") //node
		.attr("x", function(i) {return -i.dy / 2})
		.attr("y", function(i) {return i.dx / 2 + 9})
		.attr("transform", "rotate(270)").attr("text-anchor", "middle").attr("font-size","23px").text(function(i) {
			if ((i.dy>minnodewidth)&&(labelformat<1)){
				return nodeformat(i.value);
			}
		}).attr("fill",function(d){
			return d3.rgb(d["color"]).brighter(2)
		}).attr("stroke",function(d){
			return d3.rgb(d["color"]).darker(2)
		}).attr("stroke-width","1px");
		
	function b(i) { //dragmove
		if (vmove) {
			if (hmove) {
				d3.select(this).attr("transform", "translate(" + (i.x = Math.max(0, Math.min(width - i.dx, d3.event.x))) + "," + (i.y = Math.max(0, Math.min(height - i.dy, d3.event.y))) + ")")
			} else {
				d3.select(this).attr("transform", "translate(" + i.x + "," + (i.y = Math.max(0, Math.min(height - i.dy, d3.event.y))) + ")")
			}
		} else {
			if (hmove) {
				d3.select(this).attr("transform", "translate(" + (i.x = Math.max(0, Math.min(width - i.dx, d3.event.x))) + "," + i.y + ")")
			}
		}
		sankey.relayout();
		f.attr("d", path(1));
		h.attr("d", path(0));
		e.attr("d", path(2))
	};
};



