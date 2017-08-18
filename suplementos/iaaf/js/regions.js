var rparallelrendering=false;
var rminnodewidth = 100;
var rpadding = 10;
var rlabelformat = 1;
var rlabeltextformat = 0;
var rshowlinkcount = 0;
var rpaddingmultiplier = 100;
var rlowopacity = 0.1;
var rhighopacity = 0.95;
var rvmove = true;
var rhmove = false;
var rfixedlayout=[];
var rformat2Number = d3.format(",.2f"),
    rformat1Number = d3.format(",.1f"),
	rformat3Number = d3.format(",.3f"),
	rformatNumber = d3.format(",.0f"),
    rformat = function(a) {
        return rformatNumber(a)
    },color = d3.scale.category20();
	rlinkformat= function(a) {
		return rformatNumber(a);
	},
	rnodeformat= function(a) {
		return rformatNumber(a);
};

var rmargin = {
        top: 10,
        right: 10,
        bottom: 30,
        left: 10
    },
rwidth = document.getElementById("regions").offsetWidth - rmargin.left - rmargin.right,
rheight = document.getElementById("regions").offsetHeight - rmargin.bottom;
var rsvg = d3.select("#regions").append("svg");
rsvg.append("rect").attr("x",0).attr("y",0).attr("width","100%").attr("height","100%").attr("fill","white")
rsvg=rsvg.attr("width", rwidth + rmargin.left + rmargin.right).attr("height", rheight + rmargin.top + rmargin.bottom).append("g").attr("transform", "translate(" + rmargin.left + "," + rmargin.top + ")");
d3.select("#regions").select("svg")

var rsankey = d3.sankey().nodeWidth(30).nodePadding(padding).size([rwidth, rheight]);
var rpath = rsankey.reversibleLink();
var rechange = function() {};

rechange = function(d) {

    rwidth = document.getElementById("regions").offsetWidth - rmargin.left - rmargin.right,
    rheight = document.getElementById("regions").offsetHeight - rmargin.bottom;
    d3.select("#regions").select("svg").attr("width", rwidth + rmargin.left + rmargin.right).attr("height", rheight + rmargin.top + rmargin.bottom).append("g").attr("transform", "translate(" + rmargin.left + "," + rmargin.top + ")");
    
	rsvg.selectAll("g").remove();
	rsankey = d3.sankey().nodeWidth(30).nodePadding(rpadding).size([rwidth, rheight]);
	rsankey.nodes(d.nodes).links(d.links).layout(500);
	var rg = rsvg.append("g") //link
		.selectAll(".link").data(d.links).enter().append("g").attr("class", "link").sort(function(j, i) {
			return i.dy - j.dy
		});
	var rh = rg.append("path") //path0
		.attr("d", path(0));
	var rf = rg.append("path") //path1
		.attr("d", path(1));
	var re = rg.append("path") //path2
		.attr("d", path(2));
	rg.attr("fill", function(i) {
			if (i.fill) return i.fill;
			else if (i.source.fill) return i.source.fill;
			else return i.source.color = color(i.source.name.replace(/ .*/, ""))
		}).attr("opacity", rlowopacity).on("mouseover", function(d) {
			d3.select(this).style('opacity', rhighopacity);
		}).on("mouseout", function(d) {
			d3.select(this).style('opacity', rlowopacity);
		}).append("title") //link
		.text(function(i) {
			return i.source.name + " → " + i.target.name + "\n" + rlinkformat(i.value)
		});
	var rc = rsvg.append("g") //node
		.selectAll(".node").data(d.nodes).enter().append("g").attr("class", "node").attr("transform", function(i) {
			return "translate(" + i.x + "," + i.y + ")"
		}).call(d3.behavior.drag().origin(function(i) {
			return i
		}).on("dragstart", function() {
			this.parentNode.appendChild(this)
		}).on("drag", rb));
	rc.append("rect") //node
		.attr("height", function(i) {
			return i.dy
		}).attr("width", rsankey.nodeWidth()).style("fill", function(i) {
			if (i.fill) return i.color = i.fill;
								else return i.color = color(i.name.replace(/ .*/, ""))
		}).style("stroke", function(i) {
			return d3.rgb(i.color).darker(2)
		}).on("mouseover", function(d) {
			rsvg.selectAll(".link").filter(function(l) {
				return l.source == d || l.target == d;
			}).transition().style('opacity', highopacity);
		}).on("mouseout", function(d) {
			rsvg.selectAll(".link").filter(function(l) {
				return l.source == d || l.target == d;
			}).transition().style('opacity', lowopacity);
		}).on("dblclick", function(d) {
			rsvg.selectAll(".link").filter(function(l) {
				return l.target == d;
			}).attr("display", function() {
				if (d3.select(this).attr("display") == "none") return "inline"
				else return "none"
			});
		}).append("title").text(function(i) {
			return i.name + "\n" + rnodeformat(i.value)
			
		});
	rc.append("text") //node
		.attr("x", -6).attr("y", function(i) {
			return i.dy / 2
		}).attr("dy", ".35em").attr("text-anchor", "end").attr("font-size","16px")
		.text(function(i) {
		if (rlabeltextformat<1){
				return i.name;
			} else {
				return "";
			}
		}).filter(function(i) {
			return i.x < width / 2
		}).attr("x", 6 + rsankey.nodeWidth()).attr("text-anchor", "start")
	if (rshowlinkcount>0) rc.append("text") //node
		.attr("x", -6).attr("y", function(i) {
			return i.dy / 2 + 20
		}).attr("dy", ".35em").attr("text-anchor", "end").attr("font-size","16px")
		.text(function(i) {
			return "→ "+(i.targetLinks.length)+" | "+(i.sourceLinks.length)+" →";
		}).filter(function(i) {
			return i.x < width / 2
		}).attr("x", 6 + rsankey.nodeWidth()).attr("text-anchor", "start")
	rc.append("text") //node
		.attr("x", function(i) {return -i.dy / 2})
		.attr("y", function(i) {return i.dx / 2 + 9})
		.attr("transform", "rotate(270)").attr("text-anchor", "middle").attr("font-size","23px").text(function(i) {
			if ((i.dy>rminnodewidth)&&(rlabelformat<1)){
				return rnodeformat(i.value);
			}
		}).attr("fill",function(d){
			return d3.rgb(d["color"]).brighter(2)
		}).attr("stroke",function(d){
			return d3.rgb(d["color"]).darker(2)
		}).attr("stroke-width","1px");
		
	function rb(i) { //dragmove
		if (rvmove) {
			if (rhmove) {
				d3.select(this).attr("transform", "translate(" + (i.x = Math.max(0, Math.min(rwidth - i.dx, d3.event.x))) + "," + (i.y = Math.max(0, Math.min(rheight - i.dy, d3.event.y))) + ")")
			} else {
				d3.select(this).attr("transform", "translate(" + i.x + "," + (i.y = Math.max(0, Math.min(rheight - i.dy, d3.event.y))) + ")")
			}
		} else {
			if (rhmove) {
				d3.select(this).attr("transform", "translate(" + (i.x = Math.max(0, Math.min(rwidth - i.dx, d3.event.x))) + "," + i.y + ")")
			}
		}
		rsankey.relayout();
		rf.attr("d", path(1));
		rh.attr("d", path(0));
		re.attr("d", path(2))
	};
};



