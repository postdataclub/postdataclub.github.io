var height = window.innerHeight-55;
var width = window.innerWidth;

var worldzoom = 3;
var cubazoom=7;
var prizoom = 9;
var prim = 7;
var lhazoom = 12;
var lham = 7;
var artzoom = 10;
var artm = 7;
var mayzoom = 10;
var maym = 9.5;
var matzoom = 10.2;
var matm = 7;
var ijvzoom = 10.5;
var ijvm = 7;
var cfgzoom = 10;
var cfgm = 7;
var vclzoom = 10.5;
var vclm = 7;
var sspzoom = 9.8;
var sspm = 7;
var cavzoom = 9.8;
var cavm = 9.1;
var camzoom = 9;
var camm = 7;
var ltuzoom = 10;
var ltum = 7;
var holzoom = 9.5;
var holm = 9.1;
var grazoom = 9.7;
var gram = 7;
var stgzoom = 9.6;
var stgm = 7;
var gtmzoom = 9.8;
var gtmm = 9.5;




if (width<900){
	worldzoom =1;	
	cubazoom=5;
	prizoom = 7;
	prim = prim -2;
	lhazoom = 12;
	lham = lham -2;
	artzoom = 8;
	artm = artm -2;
	mayzoom = 8;
	maym = maym -2;
	matzoom = 8.2;
	matm = matm -2;
	ijvzoom = 8.5;
	ijvm = ijvm -2;
	cfgzoom = 8;
	cfgm = cfgm-2;
	vclzoom = 8.5;
	vclm = vclm -2;
	sspzoom = 7.8;
	sspm = sspm -2;
	cavzoom = 7.8;
	cavm = cavm -2;
	camzoom = 7;
	ltuzoom = 8;
	ltum = ltum -2;
	holzoom = 7.5;
	holm = holm -2;
	grazoom = 7.7;
	gram = gram -2;
	stgzoom = 7.6;
	stgm = stgm -2;
	gtmzoom = 7.8;
	gtmm = gtmm -2;
	
}

var sounds = {
	'pri': '<iframe width="100%" height="150" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/586579656&color=%2300553D&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>',
	'art': '<iframe width="100%" height="150" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/587178708&color=%23FF0600&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>',
	'lha': '',
	'may': '<iframe width="100%" height="150" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/588651723&color=%23FD1D14&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>',
	'mat': '<iframe width="100%" height="150" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/587178387&color=%23FF2412&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>',
	'vcl': '<iframe width="100%" height="150" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/586573194&color=%23FF8301&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>',
	'cfg': '<iframe width="100%" height="150" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/586559667&color=%2300A261&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>',
	'ssp': '<iframe width="100%" height="150" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/587178936&color=%23004185&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>',
	'cav': '<iframe width="100%" height="150" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/587179779&color=%23008DD0&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>',
	'cam': '<iframe width="100%" height="150" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/587172270&color=%23DB2132&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>',
	'ltu': '',
	'hol': '<iframe width="100%" height="150" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/587179977&color=%23007CC9&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>',
	'gra': '<iframe width="100%" height="150" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/586568850&color=%230A4BA0&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>',
	'stg': '<iframe width="100%" height="150" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/586577394&color=%23FF040E&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>',
	'gtm': '<iframe width="100%" height="150" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/587179584&color=%23FFBD00&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>',
	'ijv': '<iframe width="100%" height="150" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/587179449&color=%2338B396&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>',
}

$('#top-map').css('height',height);

$.getJSON("data/provinces.json",function(provinces){
$.getJSON("data/municipalities.json",function(muns){  

var cols = {
	'pri': 'rgb(0,85,61)',
	'art': 'rgb(255,6,0)',
	'ijv': 'rgb(56,179,150)',
	'lha': 'rgb(7,7,137)',
	'may': 'rgb(253,29,20)',
	'mat': 'rgb(255,36,18)',
	'cfg': 'rgb(0,162,97)',
	'vcl': 'rgb(255,131,1)',
	'ssp': 'rgb(0,65,133)',
	'cav': 'rgb(0,141,208)',
	'cam': 'rgb(219,33,50)',
	'ltu': 'rgb(0,144,88)',
	'hol': 'rgb(0,124,201)',
	'gra': 'rgb(10,75,160)',
	'stg': 'rgb(255,4,14)',
	'gtm': 'rgb(255,189,0)'
}

var cols2 = {
	'PINAR DEL RIO': cols['pri'],
	'ARTEMISA': cols['art'],
	'ISLA DE LA JUVENTUD': cols['ijv'],
	'LA HABANA': cols['lha'],
	'MAYABEQUE': cols['may'],
	'MATANZAS': cols['mat'],
	'CIENFUEGOS': cols['cfg'],
	'VILLA CLARA': cols['vcl'],
	'SANCTI SPIRITUS': cols['ssp'],
	'CIEGO DE AVILA': cols['cav'],
	'CAMAGUEY': cols['cam'],
	'LAS TUNAS': cols['ltu'],
	'HOLGUIN': cols['hol'],
	'GRANMA': cols['gra'],
	'SANTIAGO DE CUBA': cols['stg'],
	'GUANTANAMO': cols['gtm'],
}

var init = {
	'pri': false,
	'art': false,
	'ijv': false,
	'lha': false,
	'may': false,
	'mat': false,
	'cfg': false,
	'vcl': false,
	'ssp': false,
	'cav': false,
	'cam': false,
	'ltu': false,
	'hol': false,
	'gra': false,
	'stg': false,
	'gtm': false
}

var names = {
	'pri': 'Pinar del Río',
	'art': 'Artemisa',
	'ijv': 'Isla de la Juventud',
	'lha': 'La Habana',
	'may': 'Mayabeque',
	'mat': 'Matanzas',
	'cfg': 'Cienfuegos',
	'vcl': 'Villa Clara',
	'ssp': 'Sancti Spíritus',
	'cav': 'Ciego de Ávila',
	'cam': 'Camagüey',
	'ltu': 'Las Tunas',
	'hol': 'Holguín',
	'gra': 'Granma',
	'stg': 'Santiago de Cuba',
	'gtm': 'Guantánamo'
}


var hash = window.location.hash;
hash = hash.replace('#','');
hash = hash.trim();
hash.toLowerCase();
var provs = ['pri','art','ijv','lha','may','mat','cfg','vcl','ssp','cav','cam','ltu','hol','gra','stg','gtm'];

function moveDown(){
    $('html,body').animate({'scrollTop':height},'slow');
}

function moveTop(){
    $('html,body').animate({'scrollTop':0},'slow');
}

function setProvinceContent(prov){
	window.location.hash = '#'+prov;
	$('#provinces-content').show();
	$('#province-menu-block').show();
	$('#selection-block').hide();
	$('.title-block').hide();
	$('#'+prov+'-title').show();
	$('.province-part').hide();
	$('#'+prov+'-part').show();
	$('.province-link').show();
	$('#'+prov+'-link').hide();
	$('#methodology-credits').show();
	$('#content-comments').show();
	$('#province-menu-header').css('color',cols[prov]);
	//$('#methodology-credits').css('background-color',cols[prov]);
	setGraphs(prov);
}

var positions = {
	'world' : {
		'lat': 22.153168,
		'lon': -79.271124,
		'zoom': worldzoom
	},    
	'cuba' : {
		'lat': 22.153168,
		'lon': -79.271124,
		'zoom': cubazoom
	},   
	'lha' : {
		'lat': 23.0766324,
		'lon': -82.3360146,
		'zoom': lhazoom
	},   
	'pri' : {
		'lat': 22.438307,
		'lon': -83.702309,
		'zoom': prizoom
	},   
	'art' : {
		'lat': 22.842204,
		'lon': -82.745224,
		'zoom': artzoom
	},   
	'may' : {
		'lat': 22.952956,
		'lon': -81.993915,
		'zoom': mayzoom
	},   
	'ijv' : {
		'lat': 21.719568,
		'lon': -82.858492,
		'zoom': 10.5
	},   
	'mat' : {
		'lat': 22.659698,
		'lon': -81.408236,
		'zoom': ijvzoom
	},   
	'cfg' : {
		'lat': 22.197917,
		'lon': -80.448240,
		'zoom': cfgzoom
	},   
	'vcl' : {
		'lat': 22.452371,
		'lon': -79.954054,
		'zoom': vclzoom
	},   
	'ssp' : {
		'lat': 21.959919,
		'lon': -79.479276,
		'zoom': sspzoom
	},   
	'cav' : {
		'lat': 21.926637,
		'lon': -78.752911,
		'zoom': cavzoom
	},   
	'cam' : {
		'lat': 21.364849,
		'lon': -77.839544,
		'zoom': camzoom
	},   
	
	'ltu' : {
		'lat': 20.983554,
		'lon': -76.923605,
		'zoom': ltuzoom
	},   
	'hol' : {
		'lat': 20.855621,
		'lon': -76.260657,
		'zoom': holzoom
	},   
	'gra' : {
		'lat': 20.315138,
		'lon': -76.675267,
		'zoom': grazoom
	},   
	'gtm' : {
		'lat': 20.184101,
		'lon': -75.046560,
		'zoom': gtmzoom
	},   
	'stg' : {
		'lat': 20.166654,
		'lon': -75.8448168,
		'zoom': stgzoom
	}
	
}

var satellite = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.satellite',
    accessToken: 'pk.eyJ1IjoieXVkaXZpYW4iLCJhIjoiY2pzMmNlZGJ3MjNqazQ0dWtja2I5MmQ4eSJ9.xs8wlJXK4B4N8r2vQsopQQ'
});

var topmap = L.map('top-map', {
    center: [19.283265, -38.861442,],
    zoom: worldzoom,
    layers: [satellite],
    keyboard: false,
    dragging: false,
    zoomControl: false,
    boxZoom: false,
    doubleClickZoom: false,
    scrollWheelZoom: false,
    tap: false,
    touchZoom: false,
});

function moveMap(id){
	topmap.flyTo([positions[id]['lat'],positions[id]['lon']],positions[id]['zoom']);
}

$('#cuban-select').on('change',function(e){
	var val = $('#cuban-select').val();
	if (val!='none'){
		moveMap('cuba');
		if (val=='si'){
			$('#province-selection').show();
		}
		if (val=='no'){
			$('#province-selection').hide();
			moveMap('lha');
			setProvinceContent('lha');
			//moveDown();
		}
	} else {
		moveMap('world');
		$('#province-selection').hide();
	}
});

$('#province-select').on('change',function(e){
	var val = $('#province-select').val();
	if (val!='none'){
		moveMap(val);
		setProvinceContent(val);
		//moveDown();
	} else {
		moveMap('cuba');
	}
});

if (provs.indexOf(hash)!=-1){
	moveMap(hash);
	setProvinceContent(hash);
} else {
	$('#selection-block').show();
}

$('.linker').click(function(e){
	var id = e.currentTarget.id;
	id = id.replace('-linker','');
	moveTop();
	setProvinceContent(id);
	moveMap(id);
	//moveDown();
});



function setGraphs(prov){
	
if (prov=="cfg"){
	
	var fprovs = {
	'Saldo Poblacional': [404356,405823,406911,406847,407695,407244],
	};
	
	var cfgdat = [
		['Año',2013,2014,2015,2016,2017],
		['Saldo Migratorio Interno',358,230,12,602,301],
		['Saldo Migratorio Externo',131,71,-775,-462,-992]
	];
	for(var i in fprovs){
		var t = [i];
		for(var j=0;j<fprovs[i].length-1;j++){
			var p = fprovs[i][j+1]-fprovs[i][j];
			t.push(p);
		}
		cfgdat.push(t);
	}
	
	 c3.generate({
		bindto: "#cfg-g2",
		data: {
			  x : 'Año',
			  columns: cfgdat,
			  type: 'line',
			  grouped: false
			},
			tooltip: {
				format:{
					value: function(value,r, id,index) {
						return value + ' habitantes';
					}
				}
			},
			axis: {
			  x: {
				label: 'Año',
				min: 2012.9,
				max: 2017.1
			  },
			  y: {
				label: 'Variación',
				position: 'inner-middle',
			  }
			}
		});
	
	
	var cfgdest = {
			'pri': {'in':32,'order':14,'total':28},
			'art': {'in':60,'order':8,'total':66},
			'lha': {'in':226,'order':1,'total':473},
			'may': {'in':36,'order':9,'total':61},
			'mat': {'in':236,'order':3,'total':260},
			'vcl': {'in':510,'order':2,'total':466},
			'cfg': {'in':2027,'order':null,'total':2338},
			'ssp': {'in':202,'order':4,'total':198},
			'cav': {'in':98,'order':11,'total':48},
			'cam': {'in':159,'order':5,'total':113},
			'ltu': {'in':84,'order':10,'total':53},
			'hol': {'in':171,'order':7,'total':74},
			'gra': {'in':142,'order':13,'total':31},
			'stg': {'in':209,'order':6,'total':104},
			'gtm': {'in':149,'order':12,'total':39},
			'ijv': {'in':14,'order':15,'total':13},
		};
	function getCfgColor(d) {
			if (d=='cfg') { return 'gray'};
			var max = 473;
			var sald = cfgdest[d]['total'];
			var opac = Math.log10(sald*18/max);
			return 'rgba(0,162,97,'+opac+')';
		}
		
		function geojsonCfgStyle(feature){
			 return {
				//fillcolor: 'white',
				weight: 0.8,
				//opacity: 1,
				color: 'gray',
				fillOpacity: 1,
				fillColor: getCfgColor(feature.properties.VARNAME_1)
			};
		}
		
		function cfgHighlightFeature(e) {
		    var layer = e.target;
		
		    layer.setStyle({
		        weight: 2,
		        color: 'gray',
		        dashArray: '',
		        fillOpacity: 0.7
		    });
		
		    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
		        layer.bringToFront();
		    }
		}
		
		function cfgResetHighlight(e) {
		    cfggj.resetStyle(e.target);
		}
		
		function cfgOnEachFeature(feature, layer) {
		    layer.on({
		        mouseover: cfgHighlightFeature,
		        mouseout: cfgResetHighlight
		    });
		}
		
		if (!init['cfg']){
			init['cfg'] = true;
			$('#cfg-soundcloud').html(sounds['cfg']);
			
			var cfggj = L.geoJSON(provinces,{style:geojsonCfgStyle,onEachFeature: cfgOnEachFeature}).bindPopup(function(layer){
					var _pro =  layer.feature.properties.VARNAME_1;
					var text = '';
					if (_pro=='cfg') {
						text = '<span class="cfg-color bd">Cienfuegos</span><br><br>';
						text += 'Abandonaron <span class="cfg-color bd">Cienfuegos</span> <span class="bd">'+cfgdest['cfg']['in']+'</span> habitantes <br>';
						text += 'Llegaron a <span class="cfg-color bd">Cienfuegos</span> <span class="bd">'+cfgdest['cfg']['total']+'</span> habitantes <br><br>';
						text +='El saldo migratorio fue de <span class="bd">'+(cfgdest['cfg']['total'] - cfgdest['cfg']['in'])+'</span>';
					} else {
						text = '<span class="'+_pro+'-color bd">'+layer.feature.properties.NAME_1+'</span> <br><br>';
						text += 'Llegaron desde <span class="cfg-color bd">Cienfuegos</span> <span class="bd">'+cfgdest[_pro]['total']+'</span> habitantes <br>';
						text += 'Se fueron hacia <span class="cfg-color bd">Cienfuegos</span> <span class="bd">'+cfgdest[_pro]['in']+'</span> habitantes <br><br>';
						text +='El saldo migratorio de <span class="'+_pro+'-color bd">'+layer.feature.properties.NAME_1+'</span> con <span class="cfg-color bd">Cienfuegos</span> fue de <span class="bd">'+(cfgdest[_pro]['total'] - cfgdest[_pro]['in'])+'</span>';
					}
					return text;
				});
			cfggj.bindTooltip(function(layer){
				var _pro =  layer.feature.properties.VARNAME_1;
				return '<span class="'+_pro+'-color bd">'+layer.feature.properties.NAME_1+'</span>';
			},{'sticky':true});
			var cfgmap = L.map('cgf-g3', {
			    center: [21.75, -79.5],
			    zoom: cfgm,
			    layers: [cfggj],
			    keyboard: false,
			    dragging: true,
			    zoomControl: true,
			    boxZoom: false,
			    doubleClickZoom: false,
			    scrollWheelZoom: false,
			    tap: true,
			    touchZoom: true,
			});	
			
			for(var i in positions){
				if ((i!='world')&&(i!='cuba')&&(i!='cfg')){
					var text = '<span class="'+i+'-color bd">'+names[i]+'</span> <br><br>';
					text += 'Llegaron desde <span class="cfg-color bd">Cienfuegos</span> <span class="bd">'+cfgdest[i]['total']+'</span> habitantes <br>';
					text += 'Se fueron hacia <span class="cfg-color bd">Cienfuegos</span> <span class="bd">'+cfgdest[i]['in']+'</span> habitantes <br><br>';
					text +='El saldo migratorio de <span class="'+i+'-color bd">'+names[i]+'</span> con <span class="cfg-color bd">Cienfuegos</span> fue de <span class="bd">'+(cfgdest[i]['total'] - cfgdest[i]['in'])+'</span>';
					var marker = L.marker([positions[i]['lat'], positions[i]['lon']]);
					marker.bindTooltip(''+cfgdest[i]['order'],{'permanent':true,'direction':'top'}).openTooltip();
					marker.bindPopup(text);
					marker.addTo(cfgmap);
				}
			}
		
	}
		
}
	
	
if (prov=='pri'){
		c3.generate({
            bindto: "#pri-g1",
            data: {
              x : 'Criterio',
              columns: [
              ['Criterio','Médicos','Hospitales','Hosp. Pediátricos','Hosp. Ortopédicos'],
              ['Pinar del Río',81,5,1,0],
              ['Artemisa',49.8,4,0,0],
              ['La Habana',99,34,7,2],
              ],
              type: 'bar',
              colors: {
				'Artemisa': cols['art'], 
				'Pinar del Río': cols['pri'],
				'La Habana': cols['lha'] 
			}
            },
            axis: {
              x: {
                label: 'Criterio',
                type: 'categorical'
              },
              y: {
                label: 'Cantidad',
                position: 'outer-middle',
              }
            }
		});  
		
		c3.generate({
            bindto: "#pri-g2",
            data: {
              x : 'Año',
              columns: [
              ['Año',2008,2009,2010,2011,2012,2013,2014,2015,2016,2017],
              ['Pinar del Río',-1.8,-2.3,-2.2,-2,-2.3,-1.5,-0.7,-2.0,-2.3,-2.7],
              ['Artemisa',4.6,4.9,4.5,4.5,3.3,3.0,1.8,3.7,4.9,5.5],
              ['La Habana',5.4,5.1,5.8,5.9,6.7,5.2,4.2,7.4,7.1,7.0],
              ],
              type: 'line',
              colors: {
				'Artemisa': cols['art'], 
				'Pinar del Río': cols['pri'],
				'La Habana': cols['lha'] 
			}
            },
            axis: {
              x: {
                label: 'Año',
              },
              y: {
                label: 'Taza de migración interna',
                position: 'outer-middle',
              }
            }
		});
		var prism = {
				'pri':{'in':1443,'out':3054},
				'art':{'in':487,'out':1079},
				'lha':{'in':385,'out':1282},
				'may':{'in':60,'out':128},
				'mat':{'in':64,'out':125},
				'vcl':{'in':19,'out':44},
				'cfg':{'in':28,'out':32},
				'ssp':{'in':25,'out':31},
				'cav':{'in':22,'out':20},
				'cam':{'in':42,'out':39},
				'ltu':{'in':30,'out':28},
				'hol':{'in':71,'out':29},
				'gra':{'in':69,'out':44},
				'stg':{'in':50,'out':81},
				'gtm':{'in':43,'out':26},
				'ijv':{'in':48,'out':66},
			}
		var is=0;
		var os=0;
		for(var i in prism){
			if (i!='pri'){ is=is+prism[i]['in'];os=os+prism[i]['out'];}
		}
		function getColor(d) {
			if (d=='pri') { return 'gray'};
			var max = 897;
			var sald = prism[d]['out']-prism[d]['in'];
		    if (sald==0){ return 'white'};
		    if (sald>0) {
				var opac = Math.log10(sald*100/max);
				return 'rgba(0,85,61,'+opac+')';
			}
		    if (sald<0) {
				var opac = Math.log10(-sald*100/max);
				return 'rgba(70,26,87,'+opac+')';;}
		}
		
		function geojsonStyle(feature){
			 return {
				//fillcolor: 'white',
				weight: 0.8,
				//opacity: 1,
				color: 'gray',
				fillOpacity: 1,
				fillColor: getColor(feature.properties.VARNAME_1)
			};
		}
		
		function priHighlightFeature(e) {
		    var layer = e.target;
		
		    layer.setStyle({
		        weight: 2,
		        color: 'gray',
		        dashArray: '',
		        fillOpacity: 0.7
		    });
		
		    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
		        layer.bringToFront();
		    }
		}
		
		function priResetHighlight(e) {
		    prigj.resetStyle(e.target);
		}
		
		function priOnEachFeature(feature, layer) {
		    layer.on({
		        mouseover: priHighlightFeature,
		        mouseout: priResetHighlight
		    });
		}
		
		if (!init['pri']){
			init['pri'] = true;
			$('#pri-soundcloud').html(sounds['pri']);
			
			var prigj = L.geoJSON(provinces,{style:geojsonStyle,onEachFeature:priOnEachFeature}).bindPopup(function(layer){
					var _pro =  layer.feature.properties.VARNAME_1;
					console.log(_pro);
					var text = '';
					if (_pro=='pri') {text = '<span class="pri-color bd">'+layer.feature.properties.NAME_1+'</span>' + '<br><br>Dejaron la provincia <span class="bd">'+prism['pri']['out']+'</span> personas <br> Llegaron a la provincia <span class="bd">'+prism['pri']['in']+'</span> personas <br><br>';
						text +='El saldo migratorio de la provincia fue de <span class="bd">'+(prism['pri']['in'] - prism['pri']['out'])+'</span>';
					}
					else {
						text = '<span class="'+_pro+'-color bd">'+layer.feature.properties.NAME_1+'</span><br><br>';
						text +='Llegaron desde <span class="pri-color bd">Pinar del Río</span> <span class="bd">'+prism[_pro]['out']+'</span> personas <br>';
						text +='Se fueron a <span class="pri-color bd">Pinar del Río</span> <span class="bd">'+prism[_pro]['in']+'</span> personas <br><br>';
						text +='El saldo migratorio de <span class="'+_pro+'-color bd">'+layer.feature.properties.NAME_1+'</span> con <span class="pri-color bd">Pinar del Río</span> fue de <span class="bd">'+(prism[_pro]['out'] - prism[_pro]['in'])+'</span>';
					}
					return text;
				});
			prigj.bindTooltip(function(layer){
				var _pro =  layer.feature.properties.VARNAME_1;
				return '<span class="'+_pro+'-color bd">'+layer.feature.properties.NAME_1+'</span>';
			},{'sticky':true});
			var primap = L.map('pri-g3', {
			    center: [21.75, -79.5],
			    zoom: prim,
			    layers: [prigj],
			    keyboard: false,
			    dragging: true,
			    zoomControl: true,
			    boxZoom: false,
			    doubleClickZoom: false,
			    scrollWheelZoom: false,
			    tap: true,
			    touchZoom: true,
			});
			
		}  
	}

if (prov=='art'){
		var ag1 = c3.generate({
            bindto: "#art-g1",
            data: {
	              x : 'Año',
	              columns: [
	              ['Año',2011,2012,2013,2014,2015,2016,2017],
	              ['Villa Clara',-667,-762,-280,-209,-85,-274,-533],
	              ['La Habana',12634,14364,11060,8977,15768,15108,14902],
	              ['Artemisa',2284,1624,1510,893,1835,2484,2766],
	              ],
	              type: 'bar',
	              colors: {
					'Artemisa': cols['art'], 
					'Villa Clara': cols['vcl'],
					'La Habana': cols['lha'] 
				}
	            },
	            axis: {
	              x: {
	                label: 'Año',
	              },
	              y: {
	                label: 'Número de habitantes',
	                position: 'outer-middle',
	              }
	            }
			});
			
			var ag2 = c3.generate({
            bindto: "#art-g2",
            data: {
	              x : 'Año',
	              columns: [
	              ['Año',2011,2012,2013,2014,2015,2016,2017],
	              ['Villa Clara',786652,791681,792292,792408,790191,787857,784244],
	              ['Artemisa',487344,495126,498439,501300,503353,506263,508491],
	              ['La Habana',2157333,2105291,2117343,2121871,2125320,2130081,2129553],
	              ],
	              type: 'line',
	              colors: {
					'Artemisa': cols['art'], 
					'Villa Clara': cols['vcl'],
					'La Habana': cols['lha'] 
				}
	            },
	            tooltip: {
            format:{
                value: function(value,r, id,index) {
					return value+' habitantes';
				}
			}
		},
	            axis: {
	              x: {
	                label: 'Año',
	              },
	              y: {
	                label: 'Número de habitantes',
	                position: 'outer-middle',
	              }
	            }
			});
			ag2.hide(['Villa Clara','La Habana']);
		var artsm = {
				'pri':{'in':487,'out':1079},
				'art':{'in':6570,'out':3804},
				'lha':{'in':1815,'out':1024},
				'may':{'in':245,'out':266},
				'mat':{'in':122,'out':124},
				'vcl':{'in':49,'out':102},
				'cfg':{'in':60,'out':66},
				'ssp':{'in':60,'out':67},
				'cav':{'in':54,'out':118},
				'cam':{'in':96,'out':272},
				'ltu':{'in':88,'out':255},
				'hol':{'in':137,'out':566},
				'gra':{'in':212,'out':1042},
				'stg':{'in':206,'out':877},
				'gtm':{'in':132,'out':587},
				'ijv':{'in':41,'out':125},
			}
		function getArtColor(d) {
			if (d=='art') { return 'gray'};
			var max = 830;
			var sald = artsm[d]['out']-artsm[d]['in'];
		    if (sald==0){ return 'white'};
		    if (sald>0) {
				var opac = Math.log10(sald*30/max);
				return 'rgba(70,26,87,'+opac+')';
			}
		    if (sald<0) {
				var opac = Math.log10(-sald*30/max);
				return 'rgba(255,6,0,'+opac+')';
			}
		}
		
		function geojsonArtStyle(feature){
			 return {
				//fillcolor: 'white',
				weight: 0.8,
				//opacity: 1,
				color: 'gray',
				fillOpacity: 1,
				fillColor: getArtColor(feature.properties.VARNAME_1)
			};
		}
		
		function artHighlightFeature(e) {
		    var layer = e.target;
		
		    layer.setStyle({
		        weight: 2,
		        color: 'gray',
		        dashArray: '',
		        fillOpacity: 0.7
		    });
		
		    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
		        layer.bringToFront();
		    }
		}
		
		function artResetHighlight(e) {
		    artgj.resetStyle(e.target);
		}
		
		function artOnEachFeature(feature, layer) {
		    layer.on({
		        mouseover: artHighlightFeature,
		        mouseout: artResetHighlight
		    });
		}
		
		if (!init['art']){
			init['art'] = true;
			$('#art-soundcloud').html(sounds['art']);
			
			var artgj = L.geoJSON(provinces,{style:geojsonArtStyle,onEachFeature: artOnEachFeature}).bindPopup(function(layer){
					var _pro =  layer.feature.properties.VARNAME_1;
					var text = '';
					if (_pro=='art') {text = '<span class="art-color bd">'+layer.feature.properties.NAME_1+'</span>' + '<br><br>Dejaron la provincia <span class="bd">'+artsm['art']['out']+'</span> personas <br> Llegaron a la provincia <span class="bd">'+artsm['art']['in']+'</span> personas <br><br>';
						text +='El saldo migratorio de la provincia fue de <span class="bd">'+(artsm['art']['in'] - artsm['art']['out'])+'</span>';
					}
					else {
						text = '<span class="'+_pro+'-color bd">'+layer.feature.properties.NAME_1+'</span><br><br>';
						text +='Llegaron desde <span class="art-color bd">Artemisa</span> <span class="bd">'+artsm[_pro]['out']+'</span> personas <br>';
						text +='Se fueron a <span class="pri-color bd">Artemisa</span> <span class="bd">'+artsm[_pro]['in']+'</span> personas <br><br>';
						text +='El saldo migratorio de <span class="'+_pro+'-color bd">'+layer.feature.properties.NAME_1+'</span> con <span class="art-color bd">Artemisa</span> fue de <span class="bd">'+(artsm[_pro]['in'] - artsm[_pro]['out'])+'</span>';
					}
					return text;
				});
			
			artgj.bindTooltip(function(layer){
				var _pro =  layer.feature.properties.VARNAME_1;
				return '<span class="'+_pro+'-color bd">'+layer.feature.properties.NAME_1+'</span>';
			},{'sticky':true});
			
			var artmap = L.map('art-g3', {
			    center: [21.75, -79.5],
			    zoom: artm,
			    layers: [artgj],
			    keyboard: false,
			    dragging: true,
			    zoomControl: true,
			    boxZoom: false,
			    doubleClickZoom: false,
			    scrollWheelZoom: false,
			    tap: true,
			    touchZoom: true,
			});
}
}

if (prov=='ijv'){
	var ijvg1 = c3.generate({
		bindto: "#ijv-g1",
		data: {
			  x : 'Provincia',
			  columns: [
			  ['Provincia','LHA','CAV','PRI','VCL','ART','MAT','SSP','CFG','MAY','HOL','LTU','IJV','CAM','GRA','STG','GTM'],
			  ['Salario',848,818,813,808,782,780,758,746,738,731,688,683,680,677,658,624]
			  ],
			  type: 'bar',
			  colors: {
				'Salario': 'rgba(70,26,87,0.7)', 
			}
			},
			tooltip: {
            format:{
                value: function(value,r, id,index) {
					return value+' CUP';
				}
			}
		},
			axis: {
			  x: {
				label: 'Provincia',
				type: 'categorical'
			  },
			  y: {
				label: 'Número de habitantes',
				position: 'outer-middle',
			  }
			},
		grid: {
          x: {
            lines: [
            {
               value: 'IJV',
               text: 'Isla de la Juventud'
            }
            ]
          },
          y: {
            lines: [
            {
               value: 767,
               text: 'Salario medio en Cuba (767 CUP)'
            }
            ]
          }
       }
		});
		
		var ijvg1 = c3.generate({
		bindto: "#ijv-g3",
		data: {
			  x : 'Año',
			  columns: [
			  ['Año',2008,2009,2010,2011,2012,2013,2014,2015,2016,2017],
			  ['Natalidad',12,12.6,12.6,13.4,11.5,11.8,11.8,11.7,11.4,10.1],
			  ['Mortalidad general',5.7,6.3,5.6,5.5,6.1,6.2,6.9,6.4,6.9,7.5]
			  ],
			  type: 'line',
			  colors: {
				'Natalidad': 'purple',
				'Mortalidad general': 'brown'
			}
			},
			axis: {
			  x: {
				label: 'Año',
			  },
			  y: {
				label: 'Valor',
				position: 'outer-middle',
				max: 13
			  }
			}
		});
		
		var ijvdest = {
			'pri': {'total':48,'order':8,'in':66},
			'art': {'total':125,'order':2,'in':41},
			'lha': {'total':601,'order':1,'in':196},
			'may': {'total':111,'order':3,'in':48},
			'mat': {'total':84,'order':4,'in':25},
			'vcl': {'total':35,'order':11,'in':13},
			'cfg': {'total':14,'order':15,'in':13},
			'ssp': {'total':15,'order':14,'in':12},
			'cav': {'total':28,'order':13,'in':38},
			'cam': {'total':34,'order':12,'in':36},
			'ltu': {'total':45,'order':9,'in':54},
			'hol': {'total':43,'order':10,'in':93},
			'gra': {'total':60,'order':5,'in':91},
			'stg': {'total':53,'order':7,'in':76},
			'gtm': {'total':55,'order':6,'in':83},
			'ijv': {'total':1351,'order':null,'in':885},
		}
		
		function getIjvColor(d) {
			if (d=='ijv') { return 'gray'};
			var max = 691;
			var sald = ijvdest[d]['total'];
			var opac = Math.log10(sald*55/max);
			return 'rgba(56,179,150,'+opac+')';
		}
		
		function geojsonIjvStyle(feature){
			 return {
				//fillcolor: 'white',
				weight: 0.8,
				//opacity: 1,
				color: 'gray',
				fillOpacity: 1,
				fillColor: getIjvColor(feature.properties.VARNAME_1)
			};
		}
		
		function ijvHighlightFeature(e) {
		    var layer = e.target;
		
		    layer.setStyle({
		        weight: 2,
		        color: 'gray',
		        dashArray: '',
		        fillOpacity: 0.7
		    });
		
		    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
		        layer.bringToFront();
		    }
		}
		
		function ijvResetHighlight(e) {
		    ijvgj.resetStyle(e.target);
		}
		
		function ijvOnEachFeature(feature, layer) {
		    layer.on({
		        mouseover: ijvHighlightFeature,
		        mouseout: ijvResetHighlight
		    });
		}
		
		if (!init['ijv']){
			init['ijv'] = true;
			$('#ijv-soundcloud').html(sounds['ijv']);
			
			var ijvgj = L.geoJSON(provinces,{style:geojsonIjvStyle,onEachFeature: ijvOnEachFeature}).bindPopup(function(layer){
					var _pro =  layer.feature.properties.VARNAME_1;
					var text = '';
					if (_pro=='ijv') {
						text = '<span class="ijv-color bd">Isla de la Juventud</span><br><br>';
						text += 'Abandonaron el Municipio Especial <span class="bd">'+ijvdest['ijv']['total']+'</span> habitantes <br>';
						text += 'Llegaron a <span class="ijv-color bd">La Isla</span> <span class="bd">'+ijvdest['ijv']['in']+'</span> habitantes ';
					} else {
						text = '<span class="'+_pro+'-color bd">'+layer.feature.properties.NAME_1+'</span> <br><br>';
						text += 'Llegaron desde <span class="ijv-color bd">La Isla</span> <span class="bd">'+ijvdest[_pro]['total']+'</span> habitantes <br>';
						text += 'Se fueron hacia el Municipio Especial <span class="bd">'+ijvdest[_pro]['in']+'</span> habitantes <br><br>';
						text +='El saldo migratorio de <span class="'+_pro+'-color bd">'+layer.feature.properties.NAME_1+'</span> con la <span class="ijv-color bd">Isla de la Juventud</span> fue de <span class="bd">'+(ijvdest[_pro]['total'] - ijvdest[_pro]['in'])+'</span>';
					}
					return text;
				});
			ijvgj.bindTooltip(function(layer){
				var _pro =  layer.feature.properties.VARNAME_1;
				return '<span class="'+_pro+'-color bd">'+layer.feature.properties.NAME_1+'</span>';
			},{'sticky':true});
			var ijvmap = L.map('ijv-g2', {
			    center: [21.75, -79.5],
			    zoom: ijvm,
			    layers: [ijvgj],
			    keyboard: false,
			    dragging: true,
			    zoomControl: true,
			    boxZoom: false,
			    doubleClickZoom: false,
			    scrollWheelZoom: false,
			    tap: true,
			    touchZoom: true,
			});	
			
			for(var i in positions){
				if ((i!='world')&&(i!='cuba')&&(i!='ijv')){
					var text = '<span class="'+i+'-color bd">'+names[i]+'</span> <br><br>';
					text += 'Llegaron desde <span class="ijv-color bd">La Isla</span> <span class="bd">'+ijvdest[i]['total']+'</span> habitantes <br>';
						text += 'Se fueron hacia el Municipio Especial <span class="bd">'+ijvdest[i]['in']+'</span> habitantes <br><br>';
						text +='El saldo migratorio de <span class="'+i+'-color bd">'+names[i]+'</span> con la <span class="ijv-color bd">Isla de la Juventud</span> fue de <span class="bd">'+(ijvdest[i]['total'] - ijvdest[i]['in'])+'</span>';
					var marker = L.marker([positions[i]['lat'], positions[i]['lon']]);
					marker.bindTooltip(''+ijvdest[i]['order'],{'permanent':true,'direction':'top'}).openTooltip();
					marker.bindPopup(text);
					marker.addTo(ijvmap);
				}
			}
		
	}
	
}

if (prov=='gra'){
		var grag1 = c3.generate({
		bindto: "#gra-g1",
		data: {
			  x : 'Provincia',
			  columns: [
			  ['Provincia','LTU','CAM','PRI','HOL','VCL','GRA','GTM','CFG','SSP','STG','MAT','IJV','CAV','MAY','ART'],
			  ['Porciento de variación de la Población Rural',
				-Math.round((184168-177051)*10000/184168)/100,
				-Math.round((170082-166022)*10000/170082)/100,
				-Math.round((208331-204022)*10000/208331)/100,
				-Math.round((350988-345387)*10000/350988)/100,
				-Math.round((175029-172366)*10000/175029)/100,
				-Math.round((323185-319442)*10000/323185)/100,
				-Math.round((187480-185853)*10000/187480)/100,
				-Math.round((72927-72004)*10000/113009)/100,
				-Math.round((127451-127949)*10000/127451)/100,
				-Math.round((304085-305376)*10000/304085)/100,
				-Math.round((116815-117424)*10000/116815)/100,
				-Math.round((14889-15105)*10000/14889)/100,
				-Math.round((113009-114686)*10000/113009)/100,
				-Math.round((100412-104039)*10000/100412)/100,
				-Math.round((147545-155429)*10000/147545)/100,
				]
			  ],
			  type: 'bar',
			  colors: {
				'Porciento de variación de la Población Rural': 'rgba(70,26,87,0.7)', 
			}
			},
			tooltip: {
            format:{
                value: function(value,r, id,index) {
					return value+'%';
				}
			}
		},
			axis: {
			  x: {
				label: 'Provincia',
				type: 'categorical'
			  },
			  y: {
				label: 'Porciento',
				position: 'outer-middle',
			  }
			},
		grid: {
          x: {
            lines: [
            {
               value: 'GRA',
               text: 'Granma'
            }
            ]
          },
          y: {
            lines: [
            {
               value: -0.55,
               text: 'Porciento de variación de la Población Rural en Cuba (-0.55%)'
            }
            ]
          }
       }
		});
		
		var gradest = {
			'pri': {'retention':90.2,'rural':34.78},
			'art': {'retention':92.1,'rural':30.57},
			'lha': {'retention':96.6,'rural':0},
			'may': {'retention':91.4,'rural':27.2},
			'mat': {'retention':93.4,'rural':16.48},
			'vcl': {'retention':88.6,'rural':21.98},
			'cfg': {'retention':90.8,'rural':17.68},
			'ssp': {'retention':88.9,'rural':27.46},
			'cav': {'retention':90.9,'rural':26.35},
			'cam': {'retention':90.5,'rural':21.57},
			'ltu': {'retention':86.4,'rural':33.03},
			'hol': {'retention':85.9,'rural':33.53},
			'gra': {'retention':82.5,'rural':38.63},
			'stg': {'retention':85,'rural':29.05},
			'gtm': {'retention':79.1,'rural':36.36},
			'ijv': {'retention':89.8,'rural':17.87},
		}
		
		function getGraColor(d) {
			var max = 100;
			var sald = gradest[d]['retention'];
			var opac = (sald-70)*3.8/max;
			return 'rgba(70,26,87,'+opac+')';
		}
		
		function geojsonGraStyle(feature){
			 return {
				//fillcolor: 'white',
				weight: 0.8,
				//opacity: 1,
				color: 'gray',
				fillOpacity: 1,
				fillColor: getGraColor(feature.properties.VARNAME_1)
			};
		}
		
		function graHighlightFeature(e) {
		    var layer = e.target;
		
		    layer.setStyle({
		        weight: 2,
		        color: 'gray',
		        dashArray: '',
		        fillOpacity: 0.7
		    });
		
		    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
		        layer.bringToFront();
		    }
		}
		
		function graResetHighlight(e) {
		    gragj.resetStyle(e.target);
		}
		
		function graOnEachFeature(feature, layer) {
		    layer.on({
		        mouseover: graHighlightFeature,
		        mouseout: graResetHighlight
		    });
		}
		
		if (!init['gra']){
			init['gra'] = true;
			$('#gra-soundcloud').html(sounds['gra']);
			
			var gragj = L.geoJSON(provinces,{style:geojsonGraStyle,onEachFeature: graOnEachFeature}).bindPopup(function(layer){
					var _pro =  layer.feature.properties.VARNAME_1;
					var text = '<span class="'+_pro+'-color bd">'+layer.feature.properties.NAME_1+'</span> <br><br>';
					text += 'Posee una retención de la población nativa del <span class="bd">'+gradest[_pro]['retention']+'%</span><br>';
					text += 'La población rural equivale al <span class="bd">'+gradest[_pro]['rural']+'%</span> de sus habitantes';
					return text;
				});
			gragj.bindTooltip(function(layer){
				var _pro =  layer.feature.properties.VARNAME_1;
				return '<span class="'+_pro+'-color bd">'+layer.feature.properties.NAME_1+'</span>';
			},{'sticky':true});
			
			var gramap = L.map('gra-g2', {
			    center: [21.75, -79.5],
			    zoom: gram,
			    layers: [gragj],
			    keyboard: false,
			    dragging: true,
			    zoomControl: true,
			    boxZoom: false,
			    doubleClickZoom: false,
			    scrollWheelZoom: false,
			    tap: true,
			    touchZoom: true,
			});	
			
			
		}
		
		var lhapos = {
			'Holguín': [2182,1645,2800,2887,3038],
			'Granma': [1855,1454,2549,2692,2562],
			'Santiago de Cuba' : [null,1837,3228,3285,2946],
			'Artemisa' : [1660,null,null,null],
		};
		var grag3 = c3.generate({
		bindto: "#gra-g3",
		data: {
			  x : 'Año',
			  columns: [
			  ['Año',2013,2014,2015,2016,2017],
			  ['Granma',(4-2)*2,(4-3)*2,(4-3)*2,(4-3)*2,(4-3)*2],
			  ['Santiago de Cuba',null,(4-1)*2,(4-1)*2,(4-1)*2,(4-2)*2],
			  ['Holguín',(4-1)*2,(4-2)*2,(4-2)*2,(4-2)*2,(4-1)*2],
			  ['Artemisa',(4-3)*2,null,null,null,null],
			  ],
			  type: 'line',
			  colors: {
				'Granma':'rgb(10,75,160)',
				'Santiago de Cuba':'rgb(255,4,14)',
				'Holguín':'rgb(0,124,201)',
				'Artemisa': 'brown'
			}
			},
			point: {
                  r: function (d) {
					var _r = 9*(lhapos[d.id][d.index]/1000);
                    return _r;
                  }
			},
			tooltip: {
				//grouped: false,
				format:{
					value: function(value,r, id,index) {
						return 'Posición '+(4-value/2)+' ('+lhapos[id][index]+' emigrados)';
					}
				}
			},
			axis: {
			  x: {
				label: 'Año',
				min: 2012.8,
				max: 2017.2
			  },
			  y: {
				label: 'Valor',
				position: 'outer-middle',
				max: 8,
				min: 0,
				show: false
			  }
			}
		});
		
}

if (prov=='stg'){
	
		var stgdest = {
			'pri': {'migrant':2.8},
			'art': {'migrant':13.8},
			'lha': {'migrant':24.8},
			'may': {'migrant':18},
			'mat': {'migrant':10.9},
			'vcl': {'migrant':5.6},
			'cfg': {'migrant':6.6},
			'ssp': {'migrant':9.8},
			'cav': {'migrant':15.1},
			'cam': {'migrant':13.9},
			'ltu': {'migrant':5.9},
			'hol': {'migrant':5.3},
			'gra': {'migrant':4.6},
			'stg': {'migrant':3.6},
			'gtm': {'migrant':2.8},
			'ijv': {'migrant':42.7},
		}
		
		function getStgColor(d) {
			var max = 100;
			var sald = stgdest[d]['migrant'];
			var opac = (sald)*2/max;
			return 'rgba(70,26,87,'+opac+')';
		}
		
		function geojsonStgStyle(feature){
			 return {
				//fillcolor: 'white',
				weight: 0.8,
				//opacity: 1,
				color: 'gray',
				fillOpacity: 1,
				fillColor: getStgColor(feature.properties.VARNAME_1)
			};
		}
		
		function stgHighlightFeature(e) {
		    var layer = e.target;
		
		    layer.setStyle({
		        weight: 2,
		        color: 'gray',
		        dashArray: '',
		        fillOpacity: 0.7
		    });
		
		    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
		        layer.bringToFront();
		    }
		}
		
		function stgResetHighlight(e) {
		    stggj.resetStyle(e.target);
		}
		
		function stgOnEachFeature(feature, layer) {
		    layer.on({
		        mouseover: stgHighlightFeature,
		        mouseout: stgResetHighlight
		    });
		}
		
		if (!init['stg']){
			init['stg'] = true;
			$('#stg-soundcloud').html(sounds['stg']);
			
			var stggj = L.geoJSON(provinces,{style:geojsonStgStyle,onEachFeature: stgOnEachFeature}).bindPopup(function(layer){
					var _pro =  layer.feature.properties.VARNAME_1;
					var text = '<span class="'+_pro+'-color bd">'+layer.feature.properties.NAME_1+'</span> <br><br>';
					text += 'El <span class="bd">'+stgdest[_pro]['migrant']+'%</span> de su población no es natural de la provincia';
					return text;
				});
			stggj.bindTooltip(function(layer){
				var _pro =  layer.feature.properties.VARNAME_1;
				return '<span class="'+_pro+'-color bd">'+layer.feature.properties.NAME_1+'</span>';
			},{'sticky':true});
			
			var stgmap = L.map('stg-g1', {
			    center: [21.75, -79.5],
			    zoom: stgm,
			    layers: [stggj],
			    keyboard: false,
			    dragging: true,
			    zoomControl: true,
			    boxZoom: false,
			    doubleClickZoom: false,
			    scrollWheelZoom: false,
			    tap: true,
			    touchZoom: true,
			});	
			
			
		}
		
		var stglha = {
			'Santiago de Cuba': [1460,1837,3228,3285,2946],
			'Las otras 14 provincias': [16851-1460,13215-1837,23136-3228,22850-3285,21868-2946],
		};
		var stgg2 = c3.generate({
		bindto: "#stg-g2",
		data: {
			  x : 'Año',
			  columns: [
			  ['Año',2013,2014,2015,2016,2017],
			  ['Santiago de Cuba',1460,1837,3228,3285,2946],
			  ['Las otras 14 provincias',16851-1460,13215-1837,23136-3228,22850-3285,21868-2946],
			  ],
			  type: 'bar',
			  groups: [['Santiago de Cuba','Las otras 14 provincias']],
			  colors: {
				'Las otras 14 provincias':'rgba(70,26,87,0.8)',
				'Santiago de Cuba':'rgba(255,4,14,0.8)',
			}
			},
			tooltip: {
				format:{
					value: function(value,r, id,index) {
						var total = stglha['Santiago de Cuba'][index]+stglha['Las otras 14 provincias'][index];
						var percent = Math.round(stglha[id][index]*10000/total)/100;
						return value + ' migrantes ('+percent+'%)';
					}
				}
			},
			axis: {
			  x: {
				label: 'Año',
			  },
			  y: {
				label: 'Total de migrantes',
				position: 'outer-middle',
			  }
			}
		});
		
	 var stgg3 = c3.generate({
        bindto: "#stg-g3",
        data: {
          columns: [
			['La Habana',259],
			['Santiago de Cuba',147],
			['Resto de provincias',1691]
          ],
          type: 'donut',
          colors: {
				'Resto de provincias':'rgba(70,26,87,0.8)',
				'Santiago de Cuba':'rgba(255,4,14,0.8)',
				'La Habana':'rgba(7,7,137,0.8)'
			}
        },
        donut: {
          title: 2097+" instalaciones",
        },
        tooltip: {
        format:{
            value: function(value,r, id,index) {
                return value+' instalaciones'; }            
            }
        }
      });
      
      var stgg4 = c3.generate({
        bindto: "#stg-g4",
        data: {
          columns: [
			['La Habana',1084],
			['Santiago de Cuba',258],
			['Resto de provincias',3792]
          ],
          type: 'donut',
          colors: {
				'Resto de provincias':'rgba(70,26,87,1)',
				'Santiago de Cuba':'rgba(255,4,14,1)',
				'La Habana':'rgba(7,7,137,1)'
			}
        },
        donut: {
          title: 5134+" instalaciones",
        },
        tooltip: {
        format:{
            value: function(value,r, id,index) {
                return value+' instalaciones'; }            
            }
        }
      });


}


if (prov=="ltu"){
	c3.generate({
            bindto: "#ltu-g2",
            data: {
              x : 'Año',
              columns: [
              ['Año',2008,2009,2010,2011,2012,2013,2014,2015,2016,2017],
              ['Las Tunas',-1.8,-1.6,-1,-1.3,   -1.7,-2.0,-1.8,-2.7,-3,-3.1],
              ['Holguín',-3.5,-3.7,-3.5,-3.6,     -3.7,-3.3,-2.4,-3.9,-4.1,-4.2],
              ['Granma',-3.8,-3.6,-4.3,-4.1,      -4.9,-5.0,-3.9,-7.1,-7.5,-7.2],
              ['Santiago de Cuba',-4.7,-4.1,-4.4,-4.6, -5.1,-2.7,-2.9,-4.9,-5.4,-4.8],
              ['Guantánamo',-7,-7,-7.1,-6.6,  -7.8,-7.0,-6.5,-9.4,-9.1,-8.6],
              ],
              type: 'line',
              colors: {
				'Las Tunas': cols['ltu'], 
				'Holguín': cols['hol'],
				'Granma': cols['gra'],
				'Santiago de Cuba': cols['stg'],
				'Guantánamo': cols['gtm'], 
			}
            },
            axis: {
              x: {
                label: 'Año',
              },
              y: {
                label: 'Taza de migración interna',
                position: 'outer-middle',
              }
            }
		});	
		
		
		var ltudest = {
			'pri': {'total':351.5,'unused':155.8,'iddle':41.7},
			'art': {'total':240.4,'unused':111.7,'iddle':17.3},
			'lha': {'total':30.2,'unused':12,'iddle':0.3},
			'may': {'total':243.3,'unused':100.1,'iddle':10.8},
			'mat': {'total':510.7,'unused':290.7,'iddle':48.9},
			'vcl': {'total':585.8,'unused':307.2,'iddle':53.5},
			'cfg': {'total':306.2,'unused':164.5,'iddle':29.6},
			'ssp': {'total':460.9,'unused':269.5,'iddle':49.4},
			'cav': {'total':429.5,'unused':249.4,'iddle':104},
			'cam': {'total':1017.2,'unused':750.1,'iddle':314.6},
			'ltu': {'total':473.9,'unused':297.9,'iddle':124.3},
			'hol': {'total':477.6,'unused':237.9,'iddle':13.7},
			'gra': {'total':509.3,'unused':258.8,'iddle':58.6},
			'stg': {'total':355.7,'unused':149.7,'iddle':12.1},
			'gtm': {'total':250.9,'unused':131.5,'iddle':17.4},
			'ijv': {'total':57.1,'unused':46.3,'iddle':21.1},
		}
		
		function getLtuColor(d) {
			var max = ltudest[d]['total'];
			var sald = ltudest[d]['iddle'];
			var opac = (sald)*2/max;
			return 'rgba(70,26,87,'+opac+')';
		}
		
		function geojsonLtuStyle(feature){
			 return {
				//fillcolor: 'white',
				weight: 0.8,
				//opacity: 1,
				color: 'gray',
				fillOpacity: 1,
				fillColor: getLtuColor(feature.properties.VARNAME_1)
			};
		}
		
	    function ltuHighlightFeature(e) {
		    var layer = e.target;
		
		    layer.setStyle({
		        weight: 2,
		        color: 'gray',
		        dashArray: '',
		        fillOpacity: 0.7
		    });
		
		    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
		        layer.bringToFront();
		    }
		}
		
		function ltuResetHighlight(e) {
		    ltugj.resetStyle(e.target);
		}
		
		function ltuOnEachFeature(feature, layer) {
		    layer.on({
		        mouseover: ltuHighlightFeature,
		        mouseout: ltuResetHighlight
		    });
		}
		
		if (!init['ltu']){
			init['ltu'] = true;
			$('#ltu-soundcloud').html(sounds['ltu']);
			
			var ltugj = L.geoJSON(provinces,{style:geojsonLtuStyle,onEachFeature: ltuOnEachFeature}).bindPopup(function(layer){
					var _pro =  layer.feature.properties.VARNAME_1;
					var punused = Math.round(ltudest[_pro]['unused']*10000/ltudest[_pro]['total'])/100;
					var piddle = Math.round(ltudest[_pro]['iddle']*10000/ltudest[_pro]['total'])/100;
					var text = '<span class="'+_pro+'-color bd">'+layer.feature.properties.NAME_1+'</span> <br><br>';
					text += 'Posee <span class="bd">'+ltudest[_pro]['total']+'</span> mil hectaréas de superficie agrícola <br><br>';
					text += 'La tierra agrícola no cultivada es de <span class="bd">'+ltudest[_pro]['unused']+'</span> hectáreas (<span class="bd">'+punused+'</span>%)<br>';
					text += 'La tierra agrícola no cultivada ociosa es de <span class="bd">'+ltudest[_pro]['iddle']+'</span> hectáreas (<span class="bd">'+piddle+'</span>%)<br>';
					return text;
				});
			ltugj.bindTooltip(function(layer){
				var _pro =  layer.feature.properties.VARNAME_1;
				return '<span class="'+_pro+'-color bd">'+layer.feature.properties.NAME_1+'</span>';
			},{'sticky':true});
			
			var ltumap = L.map('ltu-g1', {
			    center: [21.75, -79.5],
			    zoom: ltum,
			    layers: [ltugj],
			    keyboard: false,
			    dragging: true,
			    zoomControl: true,
			    boxZoom: false,
			    doubleClickZoom: false,
			    scrollWheelZoom: false,
			    tap: true,
			    touchZoom: true,
			});	
			
			
		}

}


if (prov=="hol"){
	var holg1 = c3.generate({
		bindto: "#hol-g1",
		data: {
			  x : 'Curso',
			  columns: [
			  ['Curso','2009/10','2010/11','2011/2012','2012/13','2013/14','2014/15','2015/16','2016/17','2017/18'],
			  ['Personal docente',43207,45768,48010,47270,46691,44687,42293,40552,38204],
			  ['Personal docente frente al aula',39018,38734,43626,43152,43137,41131,39280,37449,35431],
			  ],
			  type: 'line',
			  colors: {
				'Las otras 14 provincias':'rgba(70,26,87,0.8)',
				'Santiago de Cuba':'rgba(255,4,14,0.8)',
			}
			},
			tooltip: {
				format:{
					value: function(value,r, id,index) {
						return value + ' docentes';
					}
				}
			},
			axis: {
			  x: {
				label: 'Curso',
				type: 'categorical'
			  },
			  y: {
				label: 'Número de docentes',
				position: 'outer-middle',
			  }
			}
		});	
		
		if (!init['hol']){
			init['hol'] = true;
			$('#hol-soundcloud').html(sounds['hol']);
			
			var holdest = {
				'gibara': {'rate':-1.3},
				'rafael freyre': {'rate':-0.9},
				'banes': {'rate':-6},
				'antilla': {'rate':0.2},
				'baguanos': {'rate':-6.4},
				'holguin': {'rate':3.2},
				'calixto garcia': {'rate':-6.3},
				'cacocum': {'rate':-7.6},
				'urbano noris': {'rate':-11.2},
				'cueto': {'rate':-11},
				'mayari': {'rate':-12.4},
				'frank pais': {'rate':-11.2},
				'sagua de tanamo': {'rate':-12.1},
				'moa': {'rate':-14.4},
			}
			
			function getHolColor(d) {
				if (d in holdest) {
					var max = 15;
					var sald = holdest[d]['rate'];
					var opac = (sald)/max;
					if (opac<0){ 
						opac = -opac;
						return 'rgba(70,26,87,'+opac+')';
					}
					return 'rgba(0,124,201,'+opac+')';
				}
				return 'rgba(0,124,201,0)';
			}
			
			function geojsonHolStyle(feature){
				 return {
					//fillcolor: 'white',
					weight: 0.8,
					//opacity: 1,
					color: 'gray',
					fillOpacity: 1,
					fillColor: getHolColor(feature.properties.laa.toLowerCase())
				};
			}
			
			function holHighlightFeature(e) {
			    var layer = e.target;
			
			    layer.setStyle({
			        weight: 2,
			        color: 'gray',
			        dashArray: '',
			        fillOpacity: 0.7
			    });
			
			    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
			        layer.bringToFront();
			    }
			}
			
			function holResetHighlight(e) {
			    holgj.resetStyle(e.target);
			}
			
			function holOnEachFeature(feature, layer) {
			    layer.on({
			        mouseover: holHighlightFeature,
			        mouseout: holResetHighlight
			    });
			}
			
			var holgj = L.geoJSON(muns,{style:geojsonHolStyle,onEachFeature: holOnEachFeature});
			
			
			var holgroup = L.layerGroup();
			holgj.eachLayer(function(layer){
				var _pro =  layer.feature.properties.nam;
				if (_pro=='HOLGUIN'){
					layer.bindTooltip(function(layer){
						var _pro =  layer.feature.properties.nam;
						return '<span class="hol-color bd">Holguín</span> - '+layer.feature.properties.laa;
					},{'sticky':true});
					holgroup.addLayer(layer);
					layer.bindPopup(function(layer){
						var text = '<span class="hol-color bd">Holguín</span> - '+layer.feature.properties.laa+'<br><br>';
						text += 'Posee una taza migratoria interna de <span class="bd">'+holdest[layer.feature.properties.laa.toLowerCase()]['rate']+'</span>'
						return text;
					});	
				}	
			});
			
			var holmap = L.map('hol-g2', {
			    center: [20.8, -75.7],
			    zoom: holm,
			    layers: [holgroup],
			    keyboard: false,
			    dragging: true,
			    zoomControl: true,
			    boxZoom: false,
			    doubleClickZoom: false,
			    scrollWheelZoom: false,
			    tap: true,
			    touchZoom: true,
			});
	
			
		}

		var holprovs = {
			'pri': [956,747,1380,1277,1282],
			'art': [1660,1228,2027,2008,1815],
			'may': [1622,1109,1961,1833,1721],
			'mat': [693,443,958,1005,913],
			'vcl': [826,614,1048,878,908],
			'cfg': [398,302,581,524,473],
			'ssp': [472,303,595,501,441],
			'cav': [588,438,677,644,660],
			'cam': [1200,833,1463,1381,1414],
			'ltu': [771,619,1018,1161,1032],
			'hol': [2182,1645,2800,2887,3038],
			'gra': [1855,1454,2649,2692,2562],
			'stg': [1460,1837,3228,3285,2946],
			'gtm': [1628,1247,2131,2157,2062],
			'ijv': [540,396,720,617,601],	
		};
		var ttext = '';
		ttext +='<table id="table-prov-to-hol" class="tablesorter"><thead><th class="sorter-false">Provincia</th><th>2013</th><th>2014</th><th>2015</th><th>2016</th><th>2017</th><th>Total</th></thead><tbody>';
		for(var i in holprovs){
			ttext += '<tr>';
			ttext += '<td><span class="'+i+'-color bd">'+names[i]+'</span></td>';
			var ttotal = 0;
			for(var j in holprovs[i]){
				ttext += '<td>'+holprovs[i][j]+'</td>';
				ttotal += holprovs[i][j];	
			}
			ttext += '<td>'+ttotal+'</td>';
			ttext += '</tr>'	
		}
		ttext+='</tbody></table>';
		$('#hol-g3').html(ttext);
		$('#table-prov-to-hol').tablesorter({
			widgets        : ['zebra', 'columns'],
			usNumberFormat : false,
			sortReset      : true,
			sortRestart    : true,
			sortList: [[6,1]]
			//theme : 'blue'
		});
		

}


if (prov=="vcl"){
	var vclg1 = c3.generate({
        bindto: "#vcl-g1",
        data: {
          columns: [
			['Provincias Occidentales',1815+1721+1282+913+601],
			['Provincias Centrales',1414+908+660+441+473],
			['Provincias Orientales',2946+3038+2562+2062+1032]
          ],
          type: 'pie',
          colors: {
				'Provincias Occidentales':'green',
				'Provincias Centrales':'orange',
				'Provincias Orientales':'red'
			}
        },
        tooltip: {
        format:{
            value: function(value,r, id,index) {
                return value+' habitantes'; }            
            }
        }
      });
      var vclg2 = c3.generate({
        bindto: "#vcl-g2",
        data: {
          columns: [
			['Provincias Occidentales',8738+8246+5642+4012+2874],
			['Provincias Centrales',6291+4274+3007+3012+2278],
			['Provincias Orientales',12756+12552+11212+9225+4601]
          ],
          type: 'pie',
          colors: {
				'Provincias Occidentales':'green',
				'Provincias Centrales':'orange',
				'Provincias Orientales':'red'
			}
        },
        tooltip: {
        format:{
            value: function(value,r, id,index) {
                return value+' habitantes'; }            
            }
        }
      });
      
      c3.generate({
            bindto: "#vcl-g3",
            data: {
              x : 'Año',
              columns: [
              ['Año',2008,2009,2010,2011,2012,2013,2014,2015,2016,2017],
              ['Villa Clara',-1.7,-1.4,-1.2,-0.8,1,-0.4,-0.3,-0.1,-0.3,-0.7],
              ['Cienfuegos',3.1,3.3,3.6,3.2,1.2,0.9,0.6,0,1.5,0.7],
              ['Sancti Spíritus',0.5,-0.2,0.3,0.7,1.3,0.6,1,0,0.6,0.9],
              ['Ciego de Ávila',1.5,2.8,2.0,3,3,2.1,2.7,3.7,3.7,1.0],
              ['Camagüey­­',-2.8,-2.9,-3.4,-3.9,-4.3,-1.4,-0.8,-1.7,-1.3,-1.2],
              ],
              type: 'line',
              colors: {
				'Villa Clara': cols['vcl'], 
				'Cienfuegos': cols['cfg'],
				'Sancti Spíritus': cols['ssp'],
				'Ciego de Ávila': cols['cav'],
				'Camagüey­­': cols['cam'], 
			}
            },
            axis: {
              x: {
                label: 'Año',
              },
              y: {
                label: 'Taza de migración interna',
                position: 'outer-middle',
              }
            }
		});
		
		
		var vcldest = {
			'pri': {'total':19,'order':14,'in':44},
			'art': {'total':102,'order':8,'in':49},
			'lha': {'total':908,'order':1,'in':410},
			'may': {'total':78,'order':10,'in':48},
			'mat': {'total':810,'order':2,'in':315},
			'vcl': {'total':3238,'order':null,'in':3771},
			'cfg': {'total':510,'order':4,'in':466},
			'ssp': {'total':640,'order':3,'in':679},
			'cav': {'total':172,'order':5,'in':198},
			'cam': {'total':125,'order':7,'in':170},
			'ltu': {'total':159,'order':6,'in':137},
			'hol': {'total':88,'order':9,'in':185},
			'gra': {'total':61,'order':11,'in':203},
			'stg': {'total':53,'order':12,'in':185},
			'gtm': {'total':33,'order':13,'in':114},
			'ijv': {'total':13,'order':15,'in':35},
		}
		
		function getVclColor(d) {
			if (d=='vcl') { return 'gray'};
			var max = 903;
			var sald = vcldest[d]['total'];
			var opac = Math.log10(sald*18/max);
			return 'rgba(255,131,1,'+opac+')';
		}
		
		function geojsonVclStyle(feature){
			 return {
				//fillcolor: 'white',
				weight: 0.8,
				//opacity: 1,
				color: 'gray',
				fillOpacity: 1,
				fillColor: getVclColor(feature.properties.VARNAME_1)
			};
		}
		
		function vclHighlightFeature(e) {
		    var layer = e.target;
		
		    layer.setStyle({
		        weight: 2,
		        color: 'gray',
		        dashArray: '',
		        fillOpacity: 0.7
		    });
		
		    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
		        layer.bringToFront();
		    }
		}
		
		function vclResetHighlight(e) {
		    vclgj.resetStyle(e.target);
		}
		
		function vclOnEachFeature(feature, layer) {
		    layer.on({
		        mouseover: vclHighlightFeature,
		        mouseout: vclResetHighlight
		    });
		}
		
		if (!init['vcl']){
			init['vcl'] = true;
			$('#vcl-soundcloud').html(sounds['vcl']);
			
			var vclgj = L.geoJSON(provinces,{style:geojsonVclStyle,onEachFeature: vclOnEachFeature}).bindPopup(function(layer){
					var _pro =  layer.feature.properties.VARNAME_1;
					var text = '';
					if (_pro=='vcl') {
						text = '<span class="vcl-color bd">Villa Clara</span><br><br>';
						text += 'Abandonaron <span class="vcl-color bd">Las Villas</span> <span class="bd">'+vcldest['vcl']['in']+'</span> habitantes <br>';
						text += 'Llegaron a <span class="vcl-color bd">Villa Clara</span> <span class="bd">'+vcldest['vcl']['total']+'</span> habitantes <br><br>';
						text +='El saldo migratorio fue de <span class="bd">'+(vcldest['vcl']['total'] - vcldest['vcl']['in'])+'</span>';
					} else {
						text = '<span class="'+_pro+'-color bd">'+layer.feature.properties.NAME_1+'</span> <br><br>';
						text += 'Llegaron desde <span class="vcl-color bd">Las Villas</span> <span class="bd">'+vcldest[_pro]['total']+'</span> habitantes <br>';
						text += 'Se fueron hacia <span class="vcl-color bd">Villa Clara</span> <span class="bd">'+vcldest[_pro]['in']+'</span> habitantes <br><br>';
						text +='El saldo migratorio de <span class="'+_pro+'-color bd">'+layer.feature.properties.NAME_1+'</span> con <span class="vcl-color bd">Las Villas</span> fue de <span class="bd">'+(vcldest[_pro]['total'] - vcldest[_pro]['in'])+'</span>';
					}
					return text;
				});
			vclgj.bindTooltip(function(layer){
				var _pro =  layer.feature.properties.VARNAME_1;
				return '<span class="'+_pro+'-color bd">'+layer.feature.properties.NAME_1+'</span>';
			},{'sticky':true});
			var vclmap = L.map('vcl-g4', {
			    center: [21.75, -79.5],
			    zoom: vclm,
			    layers: [vclgj],
			    keyboard: false,
			    dragging: true,
			    zoomControl: true,
			    boxZoom: false,
			    doubleClickZoom: false,
			    scrollWheelZoom: false,
			    tap: true,
			    touchZoom: true,
			});	
			
			for(var i in positions){
				if ((i!='world')&&(i!='cuba')&&(i!='vcl')){
					var text = '<span class="'+i+'-color bd">'+names[i]+'</span> <br><br>';
					text += 'Llegaron desde <span class="vcl-color bd">Las Villas</span> <span class="bd">'+vcldest[i]['total']+'</span> habitantes <br>';
					text += 'Se fueron hacia <span class="vcl-color bd">Villa Clara</span> <span class="bd">'+vcldest[i]['in']+'</span> habitantes <br><br>';
					text +='El saldo migratorio de <span class="'+i+'-color bd">'+names[i]+'</span> con <span class="vcl-color bd">Las Villas</span> fue de <span class="bd">'+(vcldest[i]['total'] - vcldest[i]['in'])+'</span>';
					var marker = L.marker([positions[i]['lat'], positions[i]['lon']]);
					marker.bindTooltip(''+vcldest[i]['order'],{'permanent':true,'direction':'top'}).openTooltip();
					marker.bindPopup(text);
					marker.addTo(vclmap);
				}
			}
		
	}
	
	   
		
      
}


if (prov=="cam"){
	var cmuns = {
		'Carlos Manuel de Céspedes': [24455,24419,24342,24093,23879,23722],
		'Esmeralda': [30187,30215,30272,30217,30064,29987],
		'Sierra de Cubitas': [18665,18699,18691,18570,18410,18320],
		'Minas': [37700,37568,37597,37484,37291,37078],
		'Nuevitas': [61680,61790,61933,61894,61827,61473],
		'Guáimaro': [39141,38905,38709,38276,37886,37551],
		'Sibanicú': [30897,31001,30980,30935,30753,30470],
		'Camagüey': [323106,324989,326743,327641,329195,330253],
		'Florida': [71888,72011,71983,71791,71591,71203],
		'Vertientes': [51790,51877,51921,51777,51475,50967],
		'Jimaguayú': [20637,20686,20697,20581,20470,20370],
		'Najasa': [15790,15644,15654,15579,15376,15260],
		'Santa Cruz del Sur': [45696,45344,45244,44762,43993,43229]
	};
	var camdat = [['Año',2013,2014,2015,2016,2017]];
	for(var i in cmuns){
		var t = [i];
		for(var j=0;j<cmuns[i].length-1;j++){
			var p = Math.round((cmuns[i][j+1]-cmuns[i][j])*10000/cmuns[i][j])/100;
			t.push(p);
		}
		camdat.push(t);
	}
	var camg2 = c3.generate({
		bindto: "#cam-g2",
		data: {
			  x : 'Municipio',
			  columns: [
					[
						'Municipio',
						'Carlos Manuel de Céspedes',
						//'Esmeralda',
						'Sierra de Cubitas',
						'Minas',
						'Nuevitas',
						'Guáimaro',
						'Sibanicú',
						'Camagüey',
						'Florida',
						'Vertientes',
						'Jimaguayú',
						'Najasa',
						'Santa Cruz del Sur'
					],
					[
						'Salario medio',
						 557,
						 //1344,
						 608,
						 600,
						 661,
						 606,
						 556,
						 752,
						 582,
						 684,
						 629,
						 559,
						 718
					]
			  ],
			  type: 'bar',
			  colors: {
				'Salario medio': 'rgba(70,26,87,1)'  
			   }
			},
			 legend: {
				show: false
			},
			tooltip: {
				format:{
					value: function(value,r, id,index) {
						return value + ' CUP';
					}
				}
			},
			grid: {
		          y: {
		            lines: [
		            {
		               value: 732,
		               text: 'Salario medio de la provincia'
		            },
		            {
		               value: 767,
		               text: 'Salario medio del país'
		            }
		            ]
		          }
		       },
			axis: {
			  x: {
				label: 'Municipio',
				type: 'categorical'
			  },
			  y: {
				label: 'Salario medio',
				position: 'inner-middle',
				min: 400
			  }
			}
		});
		
		var camg1 = c3.generate({
		bindto: "#cam-g1",
		data: {
			  x : 'Año',
			  columns: camdat,
			  type: 'bar',
			  grouped: false
			},
			tooltip: {
				grouped: false,
				format:{
					value: function(value,r, id,index) {
						return value + '%';
					}
				}
			},
			axis: {
			  x: {
				label: 'Año',
				min: 2012.9,
				max: 2017.1
			  },
			  y: {
				label: 'Porciento de variación de la población',
				position: 'inner-middle',
				show: false
			  }
			}
		});
		
		var camdest = {
			'pri': {'total':39,'in':42},
			'art': {'total':96,'in':272},
			'lha': {'total':459,'in':1414},
			'may': {'total':116,'in':241},
			'mat': {'total':183,'in':544},
			'vcl': {'total':125,'in':170},
			'cfg': {'total':113,'in':159},
			'ssp': {'total':160,'in':314},
			'cav': {'total':507,'in':704},
			'cam': {'total':4462,'in':5402},
			'ltu': {'total':768,'in':475},
			'hol': {'total':521,'in':363},
			'gra': {'total':499,'in':260},
			'stg': {'total':476,'in':268},
			'gtm': {'total':366,'in':140},
			'ijv': {'total':34,'in':36},
		}
		
		function getCamColor(d) {
			if (d=='cam') { return 'gray'};
			var max = 955;
			var sald = camdest[d]['total']-camdest[d]['in'];
			if (sald>0){
				var opac = Math.log10(sald*25/max);
				return 'rgba(219,33,50,'+opac+')';
			} else {
				var opac = Math.log10(-sald*25/max);
				return 'rgba(70,26,87,'+opac+')';
			}
		}
		
		function geojsonCamStyle(feature){
			 return {
				//fillcolor: 'white',
				weight: 0.8,
				//opacity: 1,
				color: 'gray',
				fillOpacity: 1,
				fillColor: getCamColor(feature.properties.VARNAME_1)
			};
		}
		
		function camHighlightFeature(e) {
		    var layer = e.target;
		
		    layer.setStyle({
		        weight: 2,
		        color: 'gray',
		        dashArray: '',
		        fillOpacity: 0.7
		    });
		
		    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
		        layer.bringToFront();
		    }
		}
		
		function camResetHighlight(e) {
		    camgj.resetStyle(e.target);
		}
		
		function camOnEachFeature(feature, layer) {
		    layer.on({
		        mouseover: camHighlightFeature,
		        mouseout: camResetHighlight
		    });
		}
		
		if (!init['cam']){
			init['cam'] = true;
			$('#cam-soundcloud').html(sounds['cam']);
			
			var camgj = L.geoJSON(provinces,{style:geojsonCamStyle,onEachFeature: camOnEachFeature}).bindPopup(function(layer){
					var _pro =  layer.feature.properties.VARNAME_1;
					var text = '';
					if (_pro=='cam') {
						text = '<span class="cam-color bd">Camagüey</span><br><br>';
						text += 'Abandonaron <span class="cam-color bd">Camagüey</span> <span class="bd">'+camdest['cam']['in']+'</span> habitantes <br>';
						text += 'Llegaron a <span class="cam-color bd">Camagüey</span> <span class="bd">'+camdest['cam']['total']+'</span> habitantes <br><br>';
						text +='El saldo migratorio fue de <span class="bd">'+(camdest['cam']['total'] - camdest['cam']['in'])+'</span>';
					} else {
						text = '<span class="'+_pro+'-color bd">'+layer.feature.properties.NAME_1+'</span> <br><br>';
						text += 'Llegaron desde <span class="cam-color bd">Camagüey</span> <span class="bd">'+camdest[_pro]['total']+'</span> habitantes <br>';
						text += 'Se fueron hacia <span class="cam-color bd">Camagüey</span> <span class="bd">'+camdest[_pro]['in']+'</span> habitantes <br><br>';
						text +='El saldo migratorio de <span class="'+_pro+'-color bd">'+layer.feature.properties.NAME_1+'</span> con <span class="cam-color bd">Camagüey</span> fue de <span class="bd">'+(camdest[_pro]['in'] - camdest[_pro]['total'])+'</span>';
					}
					return text;
				});
			camgj.bindTooltip(function(layer){
				var _pro =  layer.feature.properties.VARNAME_1;
				return '<span class="'+_pro+'-color bd">'+layer.feature.properties.NAME_1+'</span>';
			},{'sticky':true});
			var cammap = L.map('cam-g3', {
			    center: [21.75, -79.5],
			    zoom: camm,
			    layers: [camgj],
			    keyboard: false,
			    dragging: true,
			    zoomControl: true,
			    boxZoom: false,
			    doubleClickZoom: false,
			    scrollWheelZoom: false,
			    tap: true,
			    touchZoom: true,
			});	
		
	}
		
		
}



if (prov=="ssp"){
		var sspdest = {
			'pri': {'to':31,'order':14,'from':25},
			'art': {'to':60,'order':10,'from':67},
			'lha': {'to':300,'order':2,'from':441},
			'may': {'to':50,'order':11,'from':66},
			'mat': {'to':143,'order':4,'from':277},
			'vcl': {'to':640,'order':1,'from':679},
			'cfg': {'to':198,'order':5,'from':202},
			'ssp': {'to':3133,'order':null,'from':2709},
			'cav': {'to':367,'order':3,'from':348},
			'cam': {'to':314,'order':6,'from':160},
			'ltu': {'to':144,'order':9,'from':75},
			'hol': {'to':261,'order':7,'from':139},
			'gra': {'to':250,'order':8,'from':87},
			'stg': {'to':185,'order':11,'from':66},
			'gtm': {'to':175,'order':13,'from':65},
			'ijv': {'to':15,'order':15,'from':12},
		}
		
		function getSspColor(d) {
			if (d=='ssp') { return 'gray'};
			var max = 679;
			var sald = sspdest[d]['from'];
			var opac = Math.log10(sald*28/max);
			return 'rgba(0,65,133,'+opac+')';
		}
		
		function geojsonSspStyle(feature){
			 return {
				//fillcolor: 'white',
				weight: 0.8,
				//opacity: 1,
				color: 'gray',
				fillOpacity: 1,
				fillColor: getSspColor(feature.properties.VARNAME_1)
			};
		}
		
		function sspHighlightFeature(e) {
		    var layer = e.target;
		
		    layer.setStyle({
		        weight: 2,
		        color: 'gray',
		        dashArray: '',
		        fillOpacity: 0.7
		    });
		
		    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
		        layer.bringToFront();
		    }
		}
		
		function sspResetHighlight(e) {
		    sspgj.resetStyle(e.target);
		}
		
		function sspOnEachFeature(feature, layer) {
		    layer.on({
		        mouseover: sspHighlightFeature,
		        mouseout: sspResetHighlight
		    });
		}
		
		if (!init['ssp']){
			init['ssp'] = true;
			$('#ssp-soundcloud').html(sounds['ssp']);
			
			var sspgj = L.geoJSON(provinces,{style:geojsonSspStyle,onEachFeature: sspOnEachFeature}).bindPopup(function(layer){
					var _pro =  layer.feature.properties.VARNAME_1;
					var text = '';
					if (_pro=='ssp') {
						text = '<span class="ssp-color bd">Sancti Spíritus</span><br><br>';
						text += 'Abandonaron <span class="ssp-color bd">Sancti Spíritus</span> <span class="bd">'+sspdest['ssp']['from']+'</span> habitantes <br>';
						text += 'Llegaron a <span class="ssp-color bd">Sancti Spíritus</span> <span class="bd">'+sspdest['ssp']['to']+'</span> habitantes <br><br>';
						text +='El saldo migratorio fue de <span class="bd">'+(sspdest['ssp']['to'] - sspdest['ssp']['from'])+'</span>';
					} else {
						text = '<span class="'+_pro+'-color bd">'+layer.feature.properties.NAME_1+'</span> <br><br>';
						text += 'Llegaron desde <span class="ssp-color bd">Sancti Spíritus</span> <span class="bd">'+sspdest[_pro]['to']+'</span> habitantes <br>';
						text += 'Se fueron hacia <span class="ssp-color bd">Sancti Spíritus</span> <span class="bd">'+sspdest[_pro]['from']+'</span> habitantes <br><br>';
						text +='El saldo migratorio de <span class="'+_pro+'-color bd">'+layer.feature.properties.NAME_1+'</span> con <span class="ssp-color bd">Sancti Spíritus</span> fue de <span class="bd">'+(sspdest[_pro]['from'] - sspdest[_pro]['to'])+'</span>';
					}
					return text;
				});
			sspgj.bindTooltip(function(layer){
				var _pro =  layer.feature.properties.VARNAME_1;
				return '<span class="'+_pro+'-color bd">'+layer.feature.properties.NAME_1+'</span>';
			},{'sticky':true});
			var sspmap = L.map('ssp-g1', {
			    center: [21.75, -79.5],
			    zoom: sspm,
			    layers: [sspgj],
			    keyboard: false,
			    dragging: true,
			    zoomControl: true,
			    boxZoom: false,
			    doubleClickZoom: false,
			    scrollWheelZoom: false,
			    tap: true,
			    touchZoom: true,
			});	
			
			for(var i in positions){
				if ((i!='world')&&(i!='cuba')&&(i!='ssp')){
					var text = '<span class="'+i+'-color bd">'+names[i]+'</span> <br><br>';
					text += 'Llegaron desde <span class="ssp-color bd">Sancti Spíritus</span> <span class="bd">'+sspdest[i]['from']+'</span> habitantes <br>';
					text += 'Se fueron hacia <span class="ssp-color bd">Sancti Spíritus</span> <span class="bd">'+sspdest[i]['to']+'</span> habitantes <br><br>';
					text +='El saldo migratorio de <span class="'+i+'-color bd">'+names[i]+'</span> con <span class="ssp-color bd">Sancti Spíritus</span> fue de <span class="bd">'+(sspdest[i]['from'] - sspdest[i]['to'])+'</span>';
					var marker = L.marker([positions[i]['lat'], positions[i]['lon']]);
					marker.bindTooltip(''+sspdest[i]['order'],{'permanent':true,'direction':'top'}).openTooltip();
					marker.bindPopup(text);
					marker.addTo(sspmap);
				}
			}
		
	}
	
	c3.generate({
            bindto: "#ssp-g2",
            data: {
              x : 'Año',
              columns: [
              ['Año',2013,2014,2015,2016,2017],
              ['Sancti Spíritus a Villa Clara',691,467,805,834,679],
              ['Villa Clara a La Habana',826,614,1048,878,908],
              ['Sancti Spíritus a La Habana',472,303,595,501,441],
              ],
              type: 'bar',
              colors: {
				'Villa Clara a La Habana': cols['vcl'], 
				'Sancti Spíritus a Villa Clara': cols['ssp'],
				'Sancti Spíritus a La Habana': 'rgba(70,26,87,1)',
				}
            },
            axis: {
              x: {
                label: 'Año',
              },
              y: {
                label: 'Número de migrantes',
                position: 'outer-middle',
              }
            }
		});
}


if (prov=="may"){
		var mayg1 = c3.generate({
		bindto: "#may-g1",
		data: {
			  x : 'Provincia',
			  columns: [
			  ['Provincia','PRI','ART','LHA','MAY','MAT','VCL','CFG','SSP','CAV','CAM','LTU','HOL','GRA','STG','GTM','IJV'],
			  ['Médicos',81,49.8,99,47.3,62.1,82.8,75.1,80.4,74.7,75.1,73.1,74.2,83.2,106.2,94.9,60.2],
			  ['Estomatólogos',13.6,9.9,19.6,13.1,14.8,17.8,16.6,15.5,13.1,16,15.5,13.5,18.3,20.5,18.5,22.5],
			  ],
			  type: 'bar',
			  colors: {
				'Porciento de variación de la Población Rural': 'rgba(70,26,87,0.7)', 
			}
			},
			tooltip: {
            format:{
                value: function(value,r, id,index) {
					return value+'%';
				}
			}
		},
			axis: {
			  x: {
				label: 'Provincia',
				type: 'categorical'
			  },
			  y: {
				label: 'Porciento',
				position: 'outer-middle',
			  }
			},
		grid: {
          x: {
            lines: [
            {
               value: 'MAY',
               text: 'Mayabeque'
            }
            ]
          },
          y: {
            lines: [
            {
               value: 81.9,
               text: 'Número de médicos en el país (81.9 por 10 mil)'
            },
            {
               value: 16.6,
               text: 'Número de estomatólogos en el país (16.6 por 10 mil)'
            }
            ]
          }
       }
		});
		
		if (!init['may']){
			init['may'] = true;
			$('#may-soundcloud').html(sounds['may']);
			
			var maydest = {
				'bejucal': {'rate':11.8},
				'san jose de las lajas': {'rate':14.5},
				'jaruco': {'rate':1.1},
				'santa cruz del norte': {'rate':2},
				'madruga': {'rate':-2.6},
				'nueva paz': {'rate':-8.4},
				'san nicolas': {'rate':0.3},
				'guines': {'rate':2.8},
				'melena del sur': {'rate':0.9},
				'batabano': {'rate':5},
				'quivican': {'rate':3.7},
			}
			
			function getMayColor(d) {
				if (d in maydest) {
					var max = 15;
					var sald = maydest[d]['rate'];
					var opac = (sald)/max;
					if (opac<0){ 
						opac = -opac;
						return 'rgba(70,26,87,'+opac+')';
					}
					return 'rgba(253,29,20,'+opac+')';
				}
				return 'rgba(0,124,201,0)';
			}
			
			function geojsonMayStyle(feature){
				 return {
					//fillcolor: 'white',
					weight: 0.8,
					//opacity: 1,
					color: 'gray',
					fillOpacity: 1,
					fillColor: getMayColor(feature.properties.laa.toLowerCase())
				};
			}
			
			function mayHighlightFeature(e) {
			    var layer = e.target;
			
			    layer.setStyle({
			        weight: 2,
			        color: 'gray',
			        dashArray: '',
			        fillOpacity: 0.7
			    });
			
			    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
			        layer.bringToFront();
			    }
			}
			
			function mayResetHighlight(e) {
			    maygj.resetStyle(e.target);
			}
			
			function mayOnEachFeature(feature, layer) {
			    layer.on({
			        mouseover: mayHighlightFeature,
			        mouseout: mayResetHighlight
			    });
			}
			
			var maygj = L.geoJSON(muns,{style:geojsonMayStyle,onEachFeature: mayOnEachFeature});
			
			
			var maygroup = L.layerGroup();
			maygj.eachLayer(function(layer){
				var _pro =  layer.feature.properties.nam;
				if (_pro=='MAYABEQUE'){
					layer.bindTooltip(function(layer){
						var _pro =  layer.feature.properties.nam;
						return '<span class="may-color bd">Mayabeque</span> - '+layer.feature.properties.laa;
					},{'sticky':true});
					maygroup.addLayer(layer);
					layer.bindPopup(function(layer){
						var text = '<span class="may-color bd">Mayabeque</span> - '+layer.feature.properties.laa+'<br><br>';
						text += 'Posee una taza migratoria interna de <span class="bd">'+maydest[layer.feature.properties.laa.toLowerCase()]['rate']+'</span>'
						return text;
					});	
				}	
			});
			
			var maymap = L.map('may-g2', {
			    center: [22.88, -82],
			    zoom: maym,
			    layers: [maygroup],
			    keyboard: false,
			    dragging: true,
			    zoomControl: true,
			    boxZoom: false,
			    doubleClickZoom: false,
			    scrollWheelZoom: false,
			    tap: true,
			    touchZoom: true,
			});
	
			
		}
		
		c3.generate({
            bindto: "#may-g3",
            data: {
              x : 'Año',
              columns: [
              ['Año',2008,2009,2010,2011,2012,2013,2014,2015,2016,2017],
              ['Artemisa',4.6,4.9,4.5,4.5,3.3,3.0,1.8,3.7,4.9,5.5],
              ['Mayabeque',4.9,4.1,2.1,-0.3,2.4,2,2.6,4.8,3.3,4.5],
              ['La Habana',5.4,5.1,5.8,5.9,6.7,5.2,4.2,7.4,7.1,7],
              ],
              type: 'line',
              colors: {
				'Artemisa': 'brown', 
				'La Habana': cols['lha'], 
				'Mayabeque': cols['may'] 
			}
            },
            axis: {
              x: {
                label: 'Año',
              },
              y: {
                label: 'Taza de migración interna',
                position: 'outer-middle',
              }
            }
		});
	
}


if (prov=="mat"){
		c3.generate({
            bindto: "#mat-g1",
            data: {
              x : 'Criterio',
              columns: [
              ['Criterio','Varadero','La Habana','Ciego de Ávila','Holguín','Santiago de Cuba','Cayo Largo del Sur','Otros Polos'],
              ['Establecimientos',57,88,30,19,22,9,145],
              ['Habitaciones',18133,10943,4497,7538,1215,1160,21976],
              ['Plazas',38080,22981,9444,15829,2550,2436,32963],
              ],
              type: 'bar',
            },
            axis: {
              x: {
                label: 'Criterio',
                type: 'categorical'
              },
              y: {
                label: 'Cantidad',
                position: 'outer-middle',
              }
            }
		});  
		
		c3.generate({
            bindto: "#mat-g3",
            data: {
              x : 'Año',
              columns: [
              ['Año',2009,2010,2011,2012,2013,2014,2015,2016,2017],
              ['Médicos',3867,3987,4079,4060,4215,4262,4406,4089,4434],
              ['Estomatólogos',691,718,784,849,936,975,1020,934,1053],
              //['Enfermeros',5858,null,4685,4455,4483,4466,4813,4774,4680],
              
              ],
              type: 'line',
            },
            axis: {
              x: {
                label: 'Año',
                min: 2008.6,
                max: 2017.4
              },
              y: {
                label: 'Número de Médicos',
                position: 'outer-middle',
              }
            }
		});
		
		var matdest = {
			'pri': {'total':1443,'order':14,'in':3054},
			'art': {'total':6570,'order':8,'in':3804},
			'lha': {'total':21868,'order':1,'in':6966},
			'may': {'total':5422,'order':10,'in':3691},
			'mat': {'total':7483,'order':2,'in':3368},
			'vcl': {'total':3238,'order':16,'in':3771},
			'cfg': {'total':2328,'order':4,'in':2027},
			'ssp': {'total':3133,'order':3,'in':2709},
			'cav': {'total':4076,'order':5,'in':3252},
			'cam': {'total':4462,'order':7,'in':5402},
			'ltu': {'total':2654,'order':6,'in':4309},
			'hol': {'total':3913,'order':9,'in':8279},
			'gra': {'total':3084,'order':11,'in':9086},
			'stg': {'total':3648,'order':12,'in':8738},
			'gtm': {'total':2093,'order':13,'in':6493},
			'ijv': {'total':885,'order':15,'in':1351},
		}
		
		function getMatColor(d) {
			var dif = matdest[d]['total']-matdest[d]['in'];
			if (dif<0) return 'red';
			return 'blue';
		}
		
		function geojsonMatStyle(feature){
			 return {
				//fillcolor: 'white',
				weight: 0.8,
				//opacity: 1,
				color: 'gray',
				fillOpacity: 1,
				fillColor: getMatColor(feature.properties.VARNAME_1)
			};
		}
		
		function matHighlightFeature(e) {
		    var layer = e.target;
		
		    layer.setStyle({
		        weight: 2,
		        color: 'gray',
		        dashArray: '',
		        fillOpacity: 0.7
		    });
		
		    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
		        layer.bringToFront();
		    }
		}
		
		function matResetHighlight(e) {
		    matgj.resetStyle(e.target);
		}
		
		function matOnEachFeature(feature, layer) {
		    layer.on({
		        mouseover: matHighlightFeature,
		        mouseout: matResetHighlight
		    });
		}
		
		if (!init['mat']){
			init['mat'] = true;
			$('#mat-soundcloud').html(sounds['mat']);
			
			var matgj = L.geoJSON(provinces,{style:geojsonMatStyle,onEachFeature: matOnEachFeature}).bindPopup(function(layer){
					var _pro =  layer.feature.properties.VARNAME_1;
					var text = '';
						text += '<span class="'+_pro+'-color bd">'+layer.feature.properties.NAME_1+'</span> <br><br>';
						text += 'Llegaron desde las otras provincias <span class="bd">'+matdest[_pro]['total']+'</span> habitantes <br>';
						text += 'Se fueron hacia <span class="bd">'+matdest[_pro]['in']+'</span> habitantes <br><br>';
						text +='El saldo migratorio de <span class="'+_pro+'-color bd">'+layer.feature.properties.NAME_1+'</span> fue de <span class="bd">'+(matdest[_pro]['total'] - matdest[_pro]['in'])+'</span>';
					return text;
				});
			matgj.bindTooltip(function(layer){
				var _pro =  layer.feature.properties.VARNAME_1;
				return '<span class="'+_pro+'-color bd">'+layer.feature.properties.NAME_1+'</span>';
			},{'sticky':true});
			var matmap = L.map('mat-g2', {
			    center: [21.75, -79.5],
			    zoom: matm,
			    layers: [matgj],
			    keyboard: false,
			    dragging: true,
			    zoomControl: true,
			    boxZoom: false,
			    doubleClickZoom: false,
			    scrollWheelZoom: false,
			    tap: true,
			    touchZoom: true,
			});	
		
	}
		
		 
}





if (prov=="cav"){
	
	var cprovs = {
	'pri': [587236,588296,589664,589021,588272,586483],
	'art': [495126,498439,501300,503353,506203,508491],
	'lha': [2105291,2117343,2121871,2125320,2130081,2129553],
	'may': [376836,378382,379942,381012,381689,382459],
	'mat': [694759,699215,702477,705775,709707,712418],
	'vcl': [791681,792292,792408,790191,787857,784244],
	'cfg': [404356,405823,406911,406847,407695,407244],
	'ssp': [463784,465164,466431,466251,466359,465931],
	'cav': [425963,428439,431048,433036,434914,435170],
	'cam': [771631,773148,774766,773600,772210,769863],
	'ltu': [533419,535021,536812,537241,537221,536094],
	'hol': [1036013,1037770,1038739,1036572,1034331,1030024],
	'gra': [835414,836144,837351,834869,831223,826911],
	'stg': [1050401,1053914,1057402,1056355,1053966,1051069],
	'gtm': [515883,515898,516302,514909,512964,511093],
	'ijv': [84758,84776,84693,84652,84532,84013],
	};
	
	var cavdat = [['Año',2013,2014,2015,2016,2017]];
	for(var i in cprovs){
		var t = [i];
		for(var j=0;j<cprovs[i].length-1;j++){
			var p = Math.round((cprovs[i][j+1]-cprovs[i][j])*10000/cprovs[i][j])/100;
			t.push(p);
		}
		cavdat.push(t);
	}
	
	var cavg1 = c3.generate({
		bindto: "#cav-g1",
		data: {
			  x : 'Año',
			  columns: cavdat,
			  type: 'bar',
			  grouped: false
			},
			tooltip: {
				grouped: false,
				format:{
					value: function(value,r, id,index) {
						return value + '%';
					}
				}
			},
			axis: {
			  x: {
				label: 'Año',
				min: 2012.9,
				max: 2017.1
			  },
			  y: {
				label: 'Porciento de variación de la población',
				position: 'inner-middle',
				show:false
			  }
			}
		});
		
		if (!init['cav']){
			init['cav'] = true;
			$('#cav-soundcloud').html(sounds['cav']);
			
			var cavdest = {
				'chambas': {'rate':-2.4},
				'moron': {'rate':9.9},
				'bolivia': {'rate':-8.9},
				'primero de enero': {'rate':-2.3},
				'ciro redondo': {'rate':3.1},
				'florencia': {'rate':-2.5},
				'majagua': {'rate':-3.6},
				'ciego de avila': {'rate':10.5},
				'venezuela': {'rate':-7.9},
				'baragua': {'rate':-4.1},
			}
			
			function getCavColor(d) {
				if (d in cavdest) {
					var max = 10.5;
					var sald = cavdest[d]['rate'];
					var opac = (sald)/max;
					if (opac<0){ 
						opac = -opac;
						return 'rgba(70,26,87,'+opac+')';
					}
					return 'rgba(0,124,201,'+opac+')';
				}
				return 'rgba(0,124,201,0)';
			}
			
			function geojsonCavStyle(feature){
				 return {
					//fillcolor: 'white',
					weight: 0.8,
					//opacity: 1,
					color: 'gray',
					fillOpacity: 1,
					fillColor: getCavColor(feature.properties.laa.toLowerCase())
				};
			}
			
			function cavHighlightFeature(e) {
			    var layer = e.target;
			
			    layer.setStyle({
			        weight: 2,
			        color: 'gray',
			        dashArray: '',
			        fillOpacity: 0.7
			    });
			
			    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
			        layer.bringToFront();
			    }
			}
			
			function cavResetHighlight(e) {
			    cavgj.resetStyle(e.target);
			}
			
			function cavOnEachFeature(feature, layer) {
			    layer.on({
			        mouseover: cavHighlightFeature,
			        mouseout: cavResetHighlight
			    });
			}
			
			var cavgj = L.geoJSON(muns,{style:geojsonCavStyle,onEachFeature: cavOnEachFeature});
			
			
			var cavgroup = L.layerGroup();
			cavgj.eachLayer(function(layer){
				var _pro =  layer.feature.properties.nam;
				if (_pro=='CIEGO DE AVILA'){
					layer.bindTooltip(function(layer){
						var _pro =  layer.feature.properties.nam;
						return '<span class="cav-color bd">Ciego de Ávila</span> - '+layer.feature.properties.laa;
					},{'sticky':true});
					cavgroup.addLayer(layer);
					layer.bindPopup(function(layer){
						var text = '<span class="cav-color bd">Ciego de Ávila</span> - '+layer.feature.properties.laa+'<br><br>';
						text += 'Posee una taza migratoria interna de <span class="bd">'+cavdest[layer.feature.properties.laa.toLowerCase()]['rate']+'</span>'
						return text;
					});	
				}	
			});
			
			var cavmap = L.map('cav-g2', {
			    center: [22, -78.55],
			    zoom: cavm,
			    layers: [cavgroup],
			    keyboard: false,
			    dragging: true,
			    zoomControl: true,
			    boxZoom: false,
			    doubleClickZoom: false,
			    scrollWheelZoom: false,
			    tap: true,
			    touchZoom: true,
			});
	
			
		}
	
}




function setRadarGtm(){
		var dom = document.getElementById("gtm-g1");
		var myChart = echarts.init(dom);
		var app = {};
		option = null;
		option = {
		    tooltip: {},
		    legend: {
		        data: [{name:'Camagüey'}, {name:'Guantánamo'}],
		        top: 'bottom',
		        
		    },
		    radar: {
		        // shape: 'circle',
		        name: {
		            textStyle: {
		                color: '#fff',
		                backgroundColor: '#999',
		                borderRadius: 3,
		                padding: [3, 5]
		           }
		        },
		        indicator: [
		          { name: 'Mortalidad infantil', max: 6},
		           { name: 'Motalidad menores de 5 años', max: 9},
		           { name: 'Mortalidad materna', max: 64},
		           { name: 'Hospitales', max: 34},
		           { name: 'Hospitales ginecobstétricos', max: 4},
		           { name: 'Hogares maternos', max: 19},
		        ]
		    },
		    series: [{
		        name: 'Comparación',
		        type: 'radar',
		        emphasis: {
		            areaStyle: {normal: {}}
		        },
		        data : [
		            {
		                value : [3,5.1,37.1,13,1,7],
		                name : 'Camagüey',
		                itemStyle: {color: 'rgb(219,33,50)'}
		            },
		             {
		                value : [4.7,5.9,60.5,4,0,3],
		                name : 'Guantánamo',
		                itemStyle: {color: 'rgb(255,189,0)'}
		            }
		        ]
		    }]
		};;
		if (option && typeof option === "object") {
		    myChart.setOption(option, true);
		    //myChart.dispatchAction({type:'legendToggleSelect',name:'% en Total de la Población'});
		}	
}

if (prov=="gtm"){
	
	setRadarGtm();
	
	c3.generate({
            bindto: "#gtm-g2",
            data: {
              x : 'Año',
              columns: [
              ['Año',2007,2008,2009,  2010,2011,  2012,2013,  2014,2015,2016, 2017],
              ['Cuba',5.3,4.7,4.8,  4.5,4.9,   4.6,4.2,  4.2,4.3,4.3,  4],
              ['Guantánamo',6,5.7,4.6,  5.7,6.1,   4.8,4.3,  4.1,5,6.2, 4.7],
              ],
              type: 'line',
              colors: {
				'Guantánamo': cols['gtm'], 
				}
            },
            axis: {
              x: {
                label: 'Año',
              },
              y: {
                label: 'Muertes por cada mil nacidos vivos',
                position: 'outer-middle',
              }
            }
		});
		
	c3.generate({
        bindto: "#gtm-g3",
        data: {
          columns: [
			['Cuba',88-2],
			['Guantánamo',2],
          ],
          type: 'pie',
          colors: {
				'Guantánamo':cols['gtm'],
				
			}
        },
        tooltip: {
        format:{
            value: function(value,r, id,index) {
                return value+' escuelas'; }            
            }
        }
      });
      
      c3.generate({
        bindto: "#gtm-g4",
        data: {
          columns: [
			['Cuba',3444-109],
			['Guantánamo',109],
          ],
          type: 'pie',
          colors: {
				'Guantánamo':cols['gtm'],
				
			}
        },
        tooltip: {
        format:{
            value: function(value,r, id,index) {
                return value+' grupos'; }            
            }
        }
      });
      
      c3.generate({
        bindto: "#gtm-g5",
        data: {
          columns: [
			['Cuba',204-5],
			['Guantánamo',5],
          ],
          type: 'pie',
          colors: {
				'Guantánamo':cols['gtm'],
				
			}
        },
        tooltip: {
        format:{
            value: function(value,r, id,index) {
                return value+' grupos'; }            
            }
        }
      });
      
      c3.generate({
        bindto: "#gtm-g6",
        data: {
          columns: [
			['Cuba',66-4],
			['Guantánamo',4],
          ],
          type: 'pie',
          colors: {
				'Guantánamo':cols['gtm'],
				
			}
        },
        tooltip: {
        format:{
            value: function(value,r, id,index) {
                return value+' grupos'; }            
            }
        }
      });
      
      c3.generate({
        bindto: "#gtm-g7",
        data: {
          columns: [
			['Cuba',37-2],
			['Guantánamo',2],
          ],
          type: 'pie',
          colors: {
				'Guantánamo':cols['gtm'],
				
			}
        },
        tooltip: {
        format:{
            value: function(value,r, id,index) {
                return value+' escuelas'; }            
            }
        }
      });
      
      c3.generate({
        bindto: "#gtm-g8",
        data: {
          columns: [
			['Cuba',17-1],
			['Guantánamo',1],
          ],
          type: 'pie',
          colors: {
				'Guantánamo':cols['gtm'],
				
			}
        },
        tooltip: {
        format:{
            value: function(value,r, id,index) {
                return value+' escuelas'; }            
            }
        }
      });
      
      if (!init['gtm']){
			init['gtm'] = true;
			$('#gtm-soundcloud').html(sounds['gtm']);
			
			var gtmdest = {
				'el salvador': {'rate':-12},
				'manuel tames': {'rate':-17.7},
				'yateras': {'rate':-12.8},
				'baracoa': {'rate':-10},
				'maisi': {'rate':-5},
				'imias': {'rate':-10.6},
				'san antonio del sur': {'rate':-7.9},
				'caimanera': {'rate':-3.9},
				'guantanamo': {'rate':-5.7},
				'niceto perez': {'rate':-14.1},
			}
			
			function getGtmColor(d) {
				if (d in gtmdest) {
					var max = 18;
					var sald = gtmdest[d]['rate'];
					var opac = (sald)/max;
					
					if (opac<0){ 
						opac = -opac;
						return 'rgba(70,26,87,'+opac+')';
					}
					return 'rgba(0,124,201,'+opac+')';
				}
				return 'rgba(0,124,201,0)';
			}
			
			function geojsonGtmStyle(feature){
				 return {
					//fillcolor: 'white',
					weight: 0.8,
					//opacity: 1,
					color: 'gray',
					fillOpacity: 1,
					fillColor: getGtmColor(feature.properties.laa.toLowerCase())
				};
			}
			
			function gtmHighlightFeature(e) {
			    var layer = e.target;
			
			    layer.setStyle({
			        weight: 2,
			        color: 'gray',
			        dashArray: '',
			        fillOpacity: 0.7
			    });
			
			    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
			        layer.bringToFront();
			    }
			}
			
			function gtmResetHighlight(e) {
			    gtmgj.resetStyle(e.target);
			}
			
			function gtmOnEachFeature(feature, layer) {
			    layer.on({
			        mouseover: gtmHighlightFeature,
			        mouseout: gtmResetHighlight
			    });
			}
			
			var gtmgj = L.geoJSON(muns,{style:geojsonGtmStyle,onEachFeature: gtmOnEachFeature});
			
			
			var gtmgroup = L.layerGroup();
			gtmgj.eachLayer(function(layer){
				var _pro =  layer.feature.properties.nam;
				if (_pro=='GUANTANAMO'){
					layer.bindTooltip(function(layer){
						var _pro =  layer.feature.properties.nam;
						return '<span class="gtm-color bd">Guantánamo</span> - '+layer.feature.properties.laa;
					},{'sticky':true});
					gtmgroup.addLayer(layer);
					layer.bindPopup(function(layer){
						var text = '<span class="gtm-color bd">Guantánamo</span> - '+layer.feature.properties.laa+'<br><br>';
						text += 'Posee una taza migratoria interna de <span class="bd">'+gtmdest[layer.feature.properties.laa.toLowerCase()]['rate']+'</span>'
						return text;
					});	
				}	
			});
			
			var gtmmap = L.map('gtm-g9', {
			    center: [20.2, -74.85],
			    zoom: gtmm,
			    layers: [gtmgroup],
			    keyboard: false,
			    dragging: true,
			    zoomControl: true,
			    boxZoom: false,
			    doubleClickZoom: false,
			    scrollWheelZoom: false,
			    tap: true,
			    touchZoom: true,
			});
	
			
		}
		
		
		c3.generate({
        bindto: "#gtm-g11",
        data: {
		x: 'Año',
          columns: [
			['Año',2013,2014,2015,2016,2017],
			['Tasa de crecimiento natural',7,6.9,7.3,6.4,5.6],
			['Tasa de crecimiento total',0.03,0.78,-2.7,-3.78,-3.65],
			['Tasa de saldo migratorio total',-6.9,-6.1,-10,-10.2,-9.3],
          ],
          type: 'line',
        },
        axis: {
			  x: {
				label: 'Año',
				min: 2012.9,
				max: 2017.1
			  },
			  y: {
				label: 'Valor de la tasa',
				position: 'inner-middle',
			  }
		},
        tooltip: {
	        format:{
	            value: function(value,r, id,index) {
	                return value; 
	                }            
	          }
        }
      });
	
}

if (prov=="lha"){
	var lhaprovs = {
			'pri': [-884,-437,-1172,-1331,-1611],
			'art': [1510,893,1835,2484,2766],
			'lha': [11060,8977,15768,15108,14902],
			'may': [764,1001,1825,1253,1731],
			'mat': [2874,1894,3557,4127,4115],
			'vcl': [-280,-209,-85,-274,-533],
			'cfg': [358,230,12,602,301],
			'ssp': [266,447,-10,260,424],
			'cav': [903,1149,1577,1615,824],
			'cam': [-1085,-593,-1333,-1021,-940],
			'ltu': [-1045,-974,-1450,-1593,-1655],
			'hol': [-3379,-2446,-4022,-4239,-4366],
			'gra': [-4145,-3245,-5937,-6265,-6002],
			'stg': [-2851,-3022,-5228,-5723,-5090],
			'gtm': [-3618,-3336,-4837,-4693,-4400],
			'ijv': [-448,-329,-500,-310,-466],	
		};
		var ttext = '';
		ttext +='<table id="table-prov-to-lha" class="tablesorter"><thead><th class="sorter-false">Provincia</th><th>2013</th><th>2014</th><th>2015</th><th>2016</th><th>2017</th><th>Total</th></thead><tbody>';
		for(var i in lhaprovs){
			ttext += '<tr>';
			ttext += '<td><span class="'+i+'-color bd">'+names[i]+'</span></td>';
			var ttotal = 0;
			for(var j in lhaprovs[i]){
				ttext += '<td>'+lhaprovs[i][j]+'</td>';
				ttotal += lhaprovs[i][j];	
			}
			ttext += '<td>'+ttotal+'</td>';
			ttext += '</tr>'	
		}
		ttext+='</tbody></table>';
		$('#lha-g1').html(ttext);
		$('#table-prov-to-lha').tablesorter({
			widgets        : ['zebra', 'columns'],
			usNumberFormat : false,
			sortReset      : true,
			sortRestart    : true,
			sortList: [[6,1]]
			//theme : 'blue'
		});
		
	c3.generate({
        bindto: "#lha-g2",
        data: {
		x: 'Año',
          columns: [
			['Año',2013,2014,2015,2016,2017],
			['Hombres',32074,24485,41524,41792,38764],
			['Mujeres',31922,24016,39057,40722,37536],
          ],
          type: 'bar',
          colors: {
			  'Hombres':'rgba(40,53,235,0.75)',
			  'Mujeres':'rgba(235,36,89,0.75)', 
		  }
        },
        axis: {
			  x: {
				label: 'Año',
				min: 2012.9,
				max: 2017.1
			  },
			  y: {
				label: 'Número de habitantes',
				position: 'inner-middle',
			  }
		},
        tooltip: {
	        format:{
	            value: function(value,r, id,index) {
					if (id=='Mujeres'){return value+ ' mujeres'; }
					else {return value+ ' hombres'; }
	            }            
	          }
        }
      });
      
      
      c3.generate({
        bindto: "#lha-g3",
        data: {
		x: 'Año',
          columns: [
			['Año',2009,2010,2011,2012,2013,2014,2015,2016,2017],
			['Resto del país',2493.1,2180.3,2290.9,2610,2729.3, 2377.3, 2839.1, 2956.9, 3624.4],
			['La Habana',1921.2,2066,2050.2,1989.9,2462.1,2351.6,3067.5,3550.8,4434.5],
          ],
          type: 'area',
          groups: [['Resto del país','La Habana']],
          colors: {
			  'Resto del país':'red', 
			  'La Habana': cols['lha'],
		  }
        },
        axis: {
			  x: {
				label: 'Año',
				min: 2008.9,
				max: 2017.1
			  },
			  y: {
				label: 'Volumen de inversiones',
				position: 'inner-middle',
			  }
		},
        tooltip: {
	        format:{
	            value: function(value,r, id,index) {
					if (id=='Mujeres'){return value+ ' mujeres'; }
					else {return value+ ' millones de pesos'; }
	            }            
	          }
        }
      });
      
      
      var gint = c3.generate({
            bindto: "#lha-g4",
            data: {
              x : 'Año',
              columns: [
              ['Año',2013,2014,2015,2016,2017],
				  ['Pinar del Río',-1.5,-0.7,-2.0,-2.3,-2.7],
	              ['Artemisa',3.0,1.8,3.7,4.9,5.5],
	              ['La Habana',5.2,4.2,7.4,7.1,7.0],
	              ['Mayabeque',2,2.6,4.8,3.3,4.5],
	              ['Matanzas',4.1,2.7,5.1,5.8,5.8],
	              ['Villa Clara',-0.4,-0.3,-0.1,-0.3,-0.7],
	              ['Cienfuegos',0.9,0.6,0,1.5,0.7],
	              ['Sancti Spíritus',0.6,1,0,0.6,0.9],
	              ['Ciego de Ávila',2.1,2.7,3.7,3.7,1.0],
	              ['Camagüey­­',-1.4,-0.8,-1.7,-1.3,-1.2],
	              ['Las Tunas',-2.0,-1.8,-2.7,-3,-3.1],
	              ['Holguín',-3.3,-2.4,-3.9,-4.1,-4.2],
	              ['Granma',-5.0,-3.9,-7.1,-7.5,-7.2],
	              ['Santiago de Cuba',-2.7,-2.9,-4.9,-5.4,-4.8],
	              ['Guantánamo',-7.0,-6.5,-9.4,-9.1,-8.6],
	              ['Isla de la Juventud',-5.3,-3.9,-5.9,-3.7,-5.5],
              ],
              type: 'line',
              colors: {
				'Pinar del Río': cols['pri'],
				'Artemisa': cols['art'], 
				'La Habana': cols['lha'],
				'Mayabeque': cols['may'],
				'Matanzas': cols['mat'],
				'Villa Clara': cols['vcl'], 
				'Cienfuegos': cols['cfg'],
				'Sancti Spíritus': cols['ssp'],
				'Ciego de Ávila': cols['cav'],
				'Camagüey­­': cols['cam'], 
				'Las Tunas': cols['ltu'], 
				'Holguín': cols['hol'],
				'Granma': cols['gra'],
				'Santiago de Cuba': cols['stg'],
				'Guantánamo': cols['gtm'], 
				'Isla de la Juventud': cols['ijv'], 
			}
            },
            axis: {
              x: {
                label: 'Año',
                min: 2012.9,
                max: 2017.1
              },
              y: {
                label: 'Taza de migración interna',
                position: 'outer-middle',
              }
            }
		});
		gint.focus(['La Habana']);
		
		var gext = c3.generate({
            bindto: "#lha-g5",
            data: {
              x : 'Año',
              columns: [
              ['Año',2013,2014,2015,2016,2017],
				  ['Pinar del Río',0.2,0.1,-2.1,-0.9,-1.7],
	              ['Artemisa',0,0.5,-2.8,-1.5,-2.5],
	              ['La Habana',0.8,-0.7,-4.7,-3.2,-4.8],
	              ['Mayabeque',0,0.2,-3.2,-1.9,-2.6],
	              ['Matanzas',0.2,0.6,-1.9,-1.3,-2.3],
	              ['Villa Clara',0.2,0.5,-2.4,-1.8,-2.5],
	              ['Cienfuegos',0.3,0.2,-1.9,-1.1,-2.4],
	              ['Sancti Spíritus',0.3,0.4,-1.6,-0.9,-1.7],
	              ['Ciego de Ávila',0,0.6,-1.8,-1.6,-2.7],
	              ['Camagüey­­',0.5,0.4,-2.1,-1.8,-2.7],
	              ['Las Tunas',0.2,0.5,-1.2,-0.3,-1.6],
	              ['Holguín',0.1,0.3,-1,-0.6,-1.2],
	              ['Granma',0,0.1,-0.7,-0.7,-0.8],
	              ['Santiago de Cuba',0.3,0.6,-0.8,-0.9,-0.8],
	              ['Guantánamo',0.1,0.4,-0.6,-1.1,-0.7],
	              ['Isla de la Juventud',-0.1,0.4,-2.3,-2.2,-3.2],
              ],
              type: 'line',
              colors: {
				'Pinar del Río': cols['pri'],
				'Artemisa': cols['art'], 
				'La Habana': cols['lha'],
				'Mayabeque': cols['may'],
				'Matanzas': cols['mat'],
				'Villa Clara': cols['vcl'], 
				'Cienfuegos': cols['cfg'],
				'Sancti Spíritus': cols['ssp'],
				'Ciego de Ávila': cols['cav'],
				'Camagüey­­': cols['cam'], 
				'Las Tunas': cols['ltu'], 
				'Holguín': cols['hol'],
				'Granma': cols['gra'],
				'Santiago de Cuba': cols['stg'],
				'Guantánamo': cols['gtm'], 
				'Isla de la Juventud': cols['ijv'], 
			}
            },
            axis: {
              x: {
                label: 'Año',
                min: 2012.9,
                max: 2017.1
              },
              y: {
                label: 'Taza de migración externa',
                position: 'outer-middle',
              }
            }
		});
		gext.focus(['La Habana']);
		
		var munrates = {
			//pri
			'sandino': {'rate':-3.7},
			'mantua': {'rate':-11.3},
			'minas de matahambre': {'rate':-8.7},
			'vinales': {'rate':2.3},
			'la palma': {'rate':-6.4},
			'los palacios': {'rate':-4.6},
			'consolacion del sur': {'rate':-1.5},
			'pinar del rio': {'rate':2.4},
			'san luis': {'rate':-6.6},
			'san juan y martinez': {'rate':-5.9},
			'guane': {'rate':-4.1},
			//art
			'bahia honda': {'rate':-5.42},
			'mariel': {'rate':-1.13},
			'guanajay': {'rate':4.18},
			'caimito': {'rate':13.19},
			'bauta': {'rate':11.82},
			'san antonio de los banos': {'rate':12.05},
			'guira de melena': {'rate':2.28},
			'alquizar': {'rate':11.25},
			'candelaria': {'rate':4.17},
			'artemisa': {'rate':4.89},
			'san cristobal': {'rate':0.44},
			//lha
			'playa': {'rate':5},
			'plaza de la revolucion': {'rate':-1},
			'centro habana': {'rate':1},
			'la habana vieja': {'rate':-10},
			'regla': {'rate':14},
			'habana del este': {'rate':3},
			'guanabacoa': {'rate':16},
			'san miguel del padron': {'rate':9},
			'diez de octubre': {'rate':11},
			'cerro': {'rate':11},
			'marianao': {'rate':7},
			'la lisa': {'rate':12},
			'boyeros': {'rate':10},
			'arroyo naranjo': {'rate':7},
			'cotorro': {'rate':12},
			//may
			'bejucal': {'rate':6.8},
			'san jose de las lajas': {'rate':13},
			'jaruco': {'rate':1.9},
			'santa cruz del norte': {'rate':3.4},
			'madruga': {'rate':-4.6},
			'nueva paz': {'rate':-8},
			'san nicolas': {'rate':-0.9},
			'guines': {'rate':2.9},
			'melena del sur': {'rate':-1.1},
			'batabano': {'rate':5.5},
			'quivican': {'rate':0.4},
			//mat
			'matanzas': {'rate':8.9},
			'cardenas': {'rate':8.6},
			'marti': {'rate':-4.5},
			'colon': {'rate':-1.4},
			'perico': {'rate':-1.2},
			'jovellanos': {'rate':-0.8},
			'pedro betancourt': {'rate':-3.5},
			'limonar': {'rate':-0.4},
			'union de reyes': {'rate':-2.6},
			'cienaga de zapata': {'rate':21.9},
			'jaguey grande': {'rate':1.3},
			'calimete': {'rate':-5.9},
			'los arabos': {'rate':-4.5},
			//vcl
			'corralillo': {'rate':-8.3},
			'quemado de guines': {'rate':-2.9},
			'sagua la grande': {'rate':-1.6},
			'encrucijada': {'rate':-4.7},
			'camajuani': {'rate':-1.8},
			'caibarien': {'rate':6.4},
			'remedios': {'rate':-2.3},
			'placetas': {'rate':0},
			'santa clara': {'rate':6.4},
			'cifuentes': {'rate':-4.3},
			'santo domingo': {'rate':-6.2},
			'ranchuelo': {'rate':-5.8},
			'manicaragua': {'rate':-9.5},
			//cfg
			'aguada de pasajeros': {'rate':-1.8},
			'rodas': {'rate':-4},
			'palmira': {'rate':-2.8},
			'lajas': {'rate':-3.5},
			'cruces': {'rate':-5.5},
			'cumanayagua': {'rate':-2.9},
			'cienfuegos': {'rate':8.3},
			'abreus': {'rate':-6},
			//ssp
			'yaguajay': {'rate':-4.31},
			'jatibonico': {'rate':-3.19},
			'taguasco': {'rate':-3.92},
			'cabaiguan': {'rate':1.02},
			'fomento': {'rate':-5.85},
			'trinidad': {'rate':2.66},
			'sancti spiritus': {'rate':5.5},
			'la sierpe': {'rate':-4.97},
			//cam
			'carlos manuel de cespedes': {'rate':-7.4},
			'esmeralda': {'rate':-6.3},
			'sierra de cubitas': {'rate':-12},
			'minas': {'rate':-5.8},
			'nuevitas': {'rate':-1.8},
			'guaimaro': {'rate':-9.7},
			'sibanicu': {'rate':-9.7},
			'camaguey': {'rate':6.8},
			'florida': {'rate':-1.4},
			'vertientes': {'rate':-7.8},
			'jimaguayu': {'rate':-10.8},
			'najasa': {'rate':-15},
			'santa cruz del sur': {'rate':-16.1},
			//cav
			'chambas': {'rate':-2.4},
			'moron': {'rate':9.9},
			'bolivia': {'rate':-8.9},
			'primero de enero': {'rate':-2.3},
			'ciro redondo': {'rate':3.1},
			'florencia': {'rate':-2.5},
			'majagua': {'rate':-3.6},
			'ciego de avila': {'rate':10.5},
			'venezuela': {'rate':-7.9},
			'baragua': {'rate':-4.1},
			//ltu
			'manati': {'rate':-11},
			'puerto padre': {'rate':-2.4},
			'jesus menendes': {'rate':-5.2},
			'majibacoa': {'rate':-8.2},
			'las tunas': {'rate':4.3},
			'jobabo': {'rate':-16.9},
			'colombia': {'rate':-6},
			'amancio rodriguez': {'rate':-9.8},
			//hol
			'gibara': {'rate':-3.08},
			'rafael freyre': {'rate':-0.3},
			'banes': {'rate':-5.08},
			'antilla': {'rate':1.53},
			'baguanos': {'rate':-8.25},
			'holguin': {'rate':4.21},
			'calixto garcia': {'rate':-7.49},
			'cacocum': {'rate':-12.74},
			'urbano noris': {'rate':-11.78},
			'cueto': {'rate':-12.59},
			'mayari': {'rate':-10.14},
			'frank pais': {'rate':-15.17},
			'sagua de tanamo': {'rate':-12.13},
			'moa': {'rate':-12.37},
			//gra
			'rio cauto': {'rate':-8.5},
			'cauto cristo': {'rate':-7.6},
			'jiguani': {'rate':-7.9},
			'bayamo': {'rate':-2.2},
			'yara': {'rate':-8.4},
			'manzanillo': {'rate':-6.9},
			'campechuela': {'rate':-11},
			'media luna': {'rate':-14.9},
			'niquero': {'rate':-8.6},
			'pilon': {'rate':-10.9},
			'bartolome maso': {'rate':-14.1},
			'buey arriba': {'rate':-11.4},
			'guisa': {'rate':-12},
			//stg
			'contramaestre': {'rate':-5.9},
			'mella': {'rate':-9.6},
			'san luis': {'rate':-11},
			'segundo frente': {'rate':-4.9},
			'songo la maya': {'rate':-11.4},
			'santiago de cuba': {'rate':-2.5},
			'palma soriano': {'rate':-7.9},
			'tercer frente': {'rate':-1.2},
			'guama': {'rate':-8.7},
			//gtm
			'el salvador': {'rate':-12},
			'manuel tames': {'rate':-17.7},
			'yateras': {'rate':-12.8},
			'baracoa': {'rate':-10},
			'maisi': {'rate':-5},
			'imias': {'rate':-10.6},
			'san antonio del sur': {'rate':-7.9},
			'caimanera': {'rate':-3.9},
			'guantanamo': {'rate':-5.7},
			'niceto perez': {'rate':-14.1},
			//ijv
			'isla de la juventud': {'rate':-3.7}
		}
		
		if (!init['lha']){
			init['lha'] = true;
			
			function getLhaColor(d) {
				if (d in munrates) {
					var max = 22;
					var sald = munrates[d]['rate'];
					var opac = (sald)/max;
					
					if (opac<0){ 
						opac = -opac;
						return 'rgba(233,35,39,'+opac+')';
					}
					return 'rgba(70,26,87,'+opac+')';
				}
				return 'rgba(70,26,87,0)';
			}
			
			function geojsonLhaStyle(feature){
				 return {
					//fillcolor: 'white',
					weight: 0.8,
					//opacity: 1,
					color: 'gray',
					fillOpacity: 1,
					fillColor: getLhaColor(feature.properties.laa.toLowerCase())
				};
			}
			
			function lhaHighlightFeature(e) {
			    var layer = e.target;
			
			    layer.setStyle({
			        weight: 2,
			        color: 'gray',
			        dashArray: '',
			        fillOpacity: 0.7
			    });
			
			    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
			        layer.bringToFront();
			    }
			}
			
			function lhaResetHighlight(e) {
			    lhagj.resetStyle(e.target);
			}
			
			function lhaOnEachFeature(feature, layer) {
			    layer.on({
			        mouseover: lhaHighlightFeature,
			        mouseout: lhaResetHighlight
			    });
			}
			
			var lhagj = L.geoJSON(muns
			,{style:geojsonLhaStyle,onEachFeature: lhaOnEachFeature}
			);
			
			lhagj.bindTooltip(function(layer){
				var _pro =  layer.feature.properties.nam;
				return '<span class="bd" style="color:'+cols2[_pro]+';">'+layer.feature.properties.nam+'</span> - '+layer.feature.properties.laa;
			},{'sticky':true});
			
			lhagj.bindPopup(function(layer){
				var _pro =  layer.feature.properties.nam;
				var text = '<span class="bd" style="color:'+cols2[_pro]+';">'+_pro+'</span> - '+layer.feature.properties.laa+'<br><br>';
				text += 'Tuvo una taza migratoria interna de <span class="bd">'+munrates[layer.feature.properties.laa.toLowerCase()]['rate']+'</span>'
				return text;
			});	
			
			var lhamap = L.map('lha-g6', {
			    center: [22.153168, -79.271124],
			    zoom: lham,
			    layers: [lhagj],
			    keyboard: false,
			    dragging: true,
			    zoomControl: true,
			    boxZoom: false,
			    doubleClickZoom: false,
			    scrollWheelZoom: false,
			    tap: true,
			    touchZoom: true,
			});
			
		}

}


}

$('.read-more').click(function(e){
	moveDown();
});

}).always($('#loading').hide());
});


 
