var sound = '<iframe id="sc-frame" width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/597548130&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>';
var _height = window.innerHeight-65;

function setSizes(){
	var height = window.innerHeight-65;
	_height  = height;
	$('#maps-container').css('height',height);
	$('#gray-out').css('height',$('body').height()+10);
}

function disableSelection(){
	$('#map-selection').css('pointer-events','none');
	$('#map-selection').css('opacity','0.6');
}
function enableSelection(){
	$('#map-selection').css('pointer-events','auto');
	$('#map-selection').css('opacity','1');
}

$('#discover').click(function(e){
	$('.cintroduction').hide();
	$('#exploring').show();	
});

$('#discover-now').click(function(e){
	$('.cintroduction').hide();
	$('#gray-out').hide();
	$('#soundcloud-container').hide();
	$('#explore-action').hide();
	$('#methodology-action').show();
	$('#listen-action').show();
	$('#methodology').show();
	$('#content-comments').show();		
});

$('#methodology-action').click(function(e){
	$('html,body').animate({'scrollTop':_height},'slow');	
});

$('#explore-again').click(function(e){
	$('html,body').animate({'scrollTop':0},'slow');	
});


window.addEventListener('resize', setSizes);
setSizes();

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

var provinces = {
	'PINAR DEL RIO': 'pri',
	'ARTEMISA': 'art',
	'ISLA DE LA JUVENTUD': 'ijv',
	'LA HABANA': 'lha',
	'MAYABEQUE': 'may',
	'MATANZAS': 'mat',
	'CIENFUEGOS': 'cfg',
	'VILLA CLARA': 'vcl',
	'SANCTI SPIRITUS': 'ssp',
	'CIEGO DE AVILA': 'cav',
	'CAMAGUEY': 'cam',
	'LAS TUNAS': 'ltu',
	'HOLGUIN': 'hol',
	'GRANMA': 'gra',
	'SANTIAGO DE CUBA': 'stg',
	'GUANTANAMO': 'gtm'
}

var colors = {
	0: 'rgba(255,40,61,0.95)',
	1:'rgba(40,167,57,0.95)',
	2:'rgba(32,80,167,0.95)',
	3:'rgba(218,218,34,0.95)',
	4: 'rgb(0,85,61)',
	5: 'rgb(255,6,0)',
	6: 'rgb(56,179,150)',
	7: 'rgb(7,7,137)',
	//'may': 'rgb(253,29,20)',
	//'mat': 'rgb(255,36,18)',
	8: 'rgb(0,162,97)',
	9: 'rgb(255,131,1)',
	10: 'rgb(0,65,133)',
	11: 'rgb(0,141,208)',
	12: 'rgb(219,33,50)',
	13: 'rgb(0,144,88)',
	14: 'rgb(0,124,201)',
	15: 'rgb(10,75,160)',
	16: 'rgb(255,4,14)',
	17: 'rgb(255,189,0)'
};

$.getJSON("data/municipalities.json",function(muns){
$.getJSON("data/data-with-single.json",function(data){
	

	
	var idx = null;
	var kind = 'all';
	var alg = 'ms';
	
	function setScatter(){
		if (idx==null){
			$("#map-scatter").html('');
		} else if (idx.length==1) {
			var ymin = 10000;
			var xmin = 10000;
			var ymax = -1*ymin;
			var xmax = -1*xmin;
			var th1 = '';
			var th2 = '';
			
			xy = {};
			xg = [];
			cg = {};
			for(var i in data['provinces']){
				for(var j in data['provinces'][i]){
					var g = data['provinces'][i][j]['clusters'][kind][alg][idx];
					if (g!=null){
						var x = null;
						var y = null;
						if (idx=='i') {
							x = data['provinces'][i][j]['interna'];
							y = 2016;
							th1 = 'Tasa de Migración Interna';
							th2= 'Año';
						}
						if (idx=='b') {
							x = data['provinces'][i][j]['blanca'];
							y = 2012;
							th2 = 'Año';
							th1 = 'Color de Piel (% pob. blanca) ';
						}
						if (idx=='d') {
							y = 2016;
							x = data['provinces'][i][j]['dependencia'];
							th2 = 'Año';
							th1 = 'Dependencia de la Edad';
						}
						if (idx=='r') {
							y = 2017;
							x = data['provinces'][i][j]['rural'];
							th2 = 'Año';
							th1 = 'Población rural (%)';
						}
						if (idx=='s') {
							x = data['provinces'][i][j]['salario'];
							y = 2016;
							th1 = 'Salario Medio (CUP)';
							th2 = 'Año';
						}
					
						cg[i+' - '+j] = colors[g];
						xy[i+' - '+j] = i+' - '+j+'_x';
						xg.push([i+' - '+j,y]);
						xg.push([i+' - '+j+'_x',x]);
						if (y>ymax){ymax=y;}
						if (y<ymin){ymin=y;}
						if (x>xmax){xmax=x;}
						if (x<xmin){xmin=x;}
					}
				}
					
			}
			c3.generate({
		        bindto: "#map-scatter",
		        data: {
			          xs: xy,
			          columns: xg,
			          type : 'scatter',
			          colors : cg
			        },
			        grid: {
			          x: {
			            show: true
			          },
			          y: {
			            show: true
			          }
			        },
			        legend: {
						show: false	
					},
			        axis: {
			          x: {
						label: th1,
			            show: true,
			            tick: {
			              values: [xmin,Math.round((xmin+(xmax-xmin)/2)),xmax]
			            }
			          },
			          y: {
						label: th2,
			            show: true,
			            tick: {
			              values: [ymin,Math.round((ymin+(ymax-ymin)/2)),ymax]
			            }
			          }
			        },
			        tooltip: {
				        format:{
				            value: function(value,r, id,index) {
				                return 'Año '+value; 
				            }            
				        },
				        show: true
				    }
		      });
		} else {
			var ymin = 10000;
			var xmin = 10000;
			var ymax = -1*ymin;
			var xmax = -1*xmin;
			var th1 = '';
			var th2 = '';
			
			xy = {};
			xg = [];
			cg = {};
			for(var i in data['provinces']){
				for(var j in data['provinces'][i]){
					var g = data['provinces'][i][j]['clusters'][kind][alg][idx];
					if (g!=null){
						var x = null;
						var y = null;
						if (idx=='is') {
							x = data['provinces'][i][j]['interna'];
							y = data['provinces'][i][j]['salario'];
							th1 = 'Tasa de Migración Interna';
							th2= 'Salario Medio (CUP)';
						}
						if (idx=='ib') {
							x = data['provinces'][i][j]['interna'];
							y = data['provinces'][i][j]['blanca'];
							th1 = 'Tasa de Migración Interna';
							th2 = 'Color de Piel (% pob. blanca) ';
						}
						if (idx=='id') {
							x = data['provinces'][i][j]['interna'];
							y = data['provinces'][i][j]['dependencia'];
							th1 = 'Tasa de Migración Interna';
							th2 = 'Dependencia de la Edad';
						}
						if (idx=='ir') {
							x = data['provinces'][i][j]['interna'];
							y = data['provinces'][i][j]['rural'];
							th1 = 'Tasa de Migración Interna';
							th2 = 'Población rural (%)';
						}
						if (idx=='sb') {
							x = data['provinces'][i][j]['salario'];
							y = data['provinces'][i][j]['blanca'];
							th1 = 'Salario Medio (CUP)';
							th2 = 'Color de Piel (% pob, blanca) ';
						}
						if (idx=='sd') {
							x = data['provinces'][i][j]['salario'];
							y = data['provinces'][i][j]['dependencia'];
							th1 = 'Salario Medio (CUP)';
							th2 = 'Dependencia de la Edad';
						}
						if (idx=='sr') {
							x = data['provinces'][i][j]['salario'];
							y = data['provinces'][i][j]['rural'];
							th1 = 'Salario Medio (CUP)';
							th2 = 'Población rural (%)';
						}
						if (idx=='rb') {
							x = data['provinces'][i][j]['rural'];
							y = data['provinces'][i][j]['blanca'];
							th1 = 'Población rural (%)';
							th2 = 'Color de Piel (% pob. blanca) ';
						}
						if (idx=='rd') {
							x = data['provinces'][i][j]['rural'];
							y = data['provinces'][i][j]['dependencia'];
							th1 = 'Población rural (%)';
							th2 = 'Dependencia de la Edad';
						}
						if (idx=='bd') {
							x = data['provinces'][i][j]['blanca'];
							y = data['provinces'][i][j]['dependencia'];
							th1 = 'Color de Piel (% pob. blanca) ';
							th2 = 'Dependencia de la Edad';
						}
						cg[i+' - '+j] = colors[g];
						xy[i+' - '+j] = i+' - '+j+'_x';
						xg.push([i+' - '+j,y]);
						xg.push([i+' - '+j+'_x',x]);
						if (y>ymax){ymax=y;}
						if (y<ymin){ymin=y;}
						if (x>xmax){xmax=x;}
						if (x<xmin){xmin=x;}
					}
					
				}	
			}
			
			 c3.generate({
		        bindto: "#map-scatter",
		        data: {
			          xs: xy,
			          columns: xg,
			          type : 'scatter',
			          colors : cg
			        },
			        grid: {
			          x: {
			            show: true
			          },
			          y: {
			            show: true
			          }
			        },
			        legend: {
						show: false	
					},
			        axis: {
			          x: {
						label: th1,
			            show: true,
			            tick: {
			              values: [xmin,Math.round((xmin+(xmax-xmin)/2)),xmax]
			            }
			          },
			          y: {
						label: th2,
			            show: true,
			            tick: {
			              values: [ymin,Math.round((ymin+(ymax-ymin)/2)),ymax]
			            }
			          }
			        },
			        tooltip: {
				        format:{
				            value: function(value,r, id,index) {
				                return value; 
				            }            
				        },
				        show: true
				    }
		      });	
		}
	}
	
	function setPie(){
		if (idx==null){
			$('#map-pie').html('');
		} else {
			groups = {};
			for(var i in data['provinces']){
				for(var j in data['provinces'][i]){
					var g = data['provinces'][i][j]['clusters'][kind][alg][idx];
					if (g!=null){
						if (g in groups){
							groups[g]++;
						} else {
							groups[g]=1;	
						}
					}
				}	
			}
			var pg = [];
			var pc = {};
			for(var i in groups){
				pg.push(['Grupo '+(parseInt(i)+1),groups[i]])	
				pc['Grupo '+(parseInt(i)+1)]=colors[i];
			}
			c3.generate({
			bindto: "#map-pie",
			data: {
			  columns: pg,
			  type: 'pie',
			  colors: pc
			},
			tooltip: {
			format:{
				value: function(value,r, id,index) {
					return value+' municipios'; }            
				}
			}
		  });
		}
	}
	
	function setCentroids(){
	    if (idx==null){
			$('#map-centroids').html('');
		} else if (idx.length==1){
			var centroids = data['centroids'][kind][alg][idx];
			var th1 = '';
			var th2 = ''
			if (idx=='i') {
					th1 = 'Tasa de Migración Interna (por 1000 hab)';
				}
				if (idx=='b') {
					th1 = 'Color de Piel (% población blanca) ';
				}
				if (idx=='d') {
					th1 = 'Relación de Dependencia de la Edad';
				}
				if (idx=='r') {
					th1 = 'Población rural (%)';
				}
				if (idx=='s') {
					th1 = 'Salario Medio (CUP)';
				}
			var ttext = '';
			ttext +='<table id="table-centroids" class="tablesorter"><thead><th class="sorter-false"  style="text-align:center;">Grupo</th><th style="text-align:right;">'+th1+'</th></thead><tbody>';
			for(var i in centroids){
				ttext += '<tr>';
				ttext += '<td style="text-align:center;"><i class="fa fa-square" style="color:'+colors[i]+';"></i></td>';
				ttext += '<td style="text-align:right;">'+(Math.round(centroids[i][0]))+'</td>';
				ttext += '</tr>'	
			}
			ttext+='</tbody></table>';
			$('#map-centroids').html(ttext);
		
		} else {
			var centroids = data['centroids'][kind][alg][idx];
			var th1 = '';
			var th2 = ''
			if (idx=='is') {
					th1 = 'Tasa de Migración Interna (por 1000 hab)';
					th2= 'Salario Medio (CUP)';
				}
				if (idx=='ib') {
					th1 = 'Tasa de Migración Interna (por 1000 hab)';
					th2 = 'Color de Piel (% población blanca) ';
				}
				if (idx=='id') {
					th1 = 'Tasa de Migración Interna (por 1000 hab)';
					th2 = 'Relación de Dependencia de la Edad';
				}
				if (idx=='ir') {
					th1 = 'Tasa de Migración Interna (por 1000 hab)';
					th2 = 'Población rural (%)';
				}
				if (idx=='sb') {
					th1 = 'Salario Medio (CUP)';
					th2 = 'Color de Piel (% población blanca) ';
				}
				if (idx=='sd') {
					th1 = 'Salario Medio (CUP)';
					th2 = 'Relación de Dependencia de la Edad';
				}
				if (idx=='sr') {
					th1 = 'Salario Medio (CUP)';
					th2 = 'Población rural (%)';
				}
				if (idx=='rb') {
					th1 = 'Población rural (%)';
					th2 = 'Color de Piel (% población blanca) ';
				}
				if (idx=='rd') {
					th1 = 'Población rural (%)';
					th2 = 'Relación de Dependencia de la Edad';
				}
				if (idx=='bd') {
					th1 = 'Color de Piel (% población blanca) ';
					th2 = 'Relación de Dependencia de la Edad';
				}
			var ttext = '';
			ttext +='<table id="table-centroids" class="tablesorter"><thead><th class="sorter-false"  style="text-align:center;">Grupo</th><th style="text-align:right;">'+th1+'</th><th style="text-align:right;">'+th2+'</th></thead><tbody>';
			for(var i in centroids){
				ttext += '<tr>';
				ttext += '<td style="text-align:center;"><i class="fa fa-square" style="color:'+colors[i]+';"></i></td>';
				ttext += '<td style="text-align:right;">'+(Math.round(centroids[i][0]))+'</td>';
				ttext += '<td style="text-align:right;">'+(Math.round(centroids[i][1]))+'</td>';
				ttext += '</tr>'	
			}
			ttext+='</tbody></table>';
			$('#map-centroids').html(ttext);
			
		}
		$('#table-centroids').tablesorter({
			widgets        : ['zebra', 'columns'],
			usNumberFormat : false,
			sortReset      : true,
			sortRestart    : true,
			sortList: [[1,1]]
			//theme : 'blue'
		});
	}
	
	
	
	function setIdx(){
		geojson.closePopup();
		var f = $('#first-criteria').val();
		var s  = $('#second-criteria').val();
		if ((f=='none')&&(s=='none')){ 
			idx=null;
			geojson.unbindPopup();
			$('.graph-caption').hide();
		}
		else {
			$('.graph-caption').show();
			var i = f+s;
			if ((f=='none')||(s=='none')){ 
				if (f=='none'){i=s; idx=s;}
				if (s=='none'){i=f; idx=f;}
			}
			if ((i=='is')||(i=='si')) {
				idx='is'	
			}
			if ((i=='ib')||(i=='bi')) {
				idx='ib'
			}
			if ((i=='id')||(i=='di')) {
				idx='id'
			}
			if ((i=='ir')||(i=='ri')) {
				idx='ir'
			}
			if ((i=='sb')||(i=='bs')) {
				idx='sb'
			}
			if ((i=='sd')||(i=='ds')) {
				idx='sd'
			}
			if ((i=='sr')||(i=='rs')) {
				idx='sr'
			}
			if ((i=='rb')||(i=='br')) {
				idx='rb'
			}
			if ((i=='rd')||(i=='dr')) {
				idx='rd'
			}
			if ((i=='bd')||(i=='db')) {
				idx='bd'
			}
			geojson.bindPopup(function(layer){
				var _pro =  layer.feature.properties.nam;
				var _mun =  layer.feature.properties.laa.toLowerCase();
				var text = '<span class="bd" style="color:'+cols2[_pro]+';">'+_pro+'</span> - '+layer.feature.properties.laa+'<br><br>';
				if (idx=='i') {
					text += '<span class="bd">Tasa de Migración Interna</span>: '+data['provinces'][provinces[_pro]][_mun]['interna']+'<br>';
				}
				if (idx=='b') {
					text += '<span class="bd">Color de la piel</span>: '+data['provinces'][provinces[_pro]][_mun]['blanca']+'% blanca, '+(Math.round((100-data['provinces'][provinces[_pro]][_mun]['blanca'])*100)/100)+'% mulata y negra<br>';
				}
				if (idx=='d') {
					text += '<span class="bd">Relación de Dependencia de la Edad</span>: '+data['provinces'][provinces[_pro]][_mun]['dependencia']+'<br>';
				}
				if (idx=='r') {
					text += '<span class="bd">Población Rural</span>: '+data['provinces'][provinces[_pro]][_mun]['rural']+'%<br>';
				}
				if (idx=='s') {
					text += '<span class="bd">Salario Medio</span>: '+data['provinces'][provinces[_pro]][_mun]['salario']+' CUP<br>';
				}
				if (idx=='is') {
					text += '<span class="bd">Tasa de Migración Interna</span>: '+data['provinces'][provinces[_pro]][_mun]['interna']+'<br>';
					text += '<span class="bd">Salario Medio</span>: '+data['provinces'][provinces[_pro]][_mun]['salario']+' CUP<br>';
				}
				if (idx=='ib') {
					text += '<span class="bd">Tasa de Migración Interna</span>: '+data['provinces'][provinces[_pro]][_mun]['interna']+'<br>';
					text += '<span class="bd">Color de la piel</span>: '+data['provinces'][provinces[_pro]][_mun]['blanca']+'% blanca, '+(Math.round((100-data['provinces'][provinces[_pro]][_mun]['blanca'])*100)/100)+'% mulata y negra<br>';
				}
				if (idx=='id') {
					text += '<span class="bd">Tasa de Migración Interna</span>: '+data['provinces'][provinces[_pro]][_mun]['interna']+'<br>';
					text += '<span class="bd">Relación de Dependencia de la Edad</span>: '+data['provinces'][provinces[_pro]][_mun]['dependencia']+'<br>';
				}
				if (idx=='ir') {
					text += '<span class="bd">Tasa de Migración Interna</span>: '+data['provinces'][provinces[_pro]][_mun]['interna']+'<br>';
					text += '<span class="bd">Población Rural</span>: '+data['provinces'][provinces[_pro]][_mun]['rural']+'%<br>';
				}
				if (idx=='sb') {
					text += '<span class="bd">Salario Medio</span>: '+data['provinces'][provinces[_pro]][_mun]['salario']+' CUP<br>';
					text += '<span class="bd">Color de la piel</span>: '+data['provinces'][provinces[_pro]][_mun]['blanca']+'% blanca, '+(Math.round((100-data['provinces'][provinces[_pro]][_mun]['blanca'])*100)/100)+'% mulata y negra<br>';
				}
				if (idx=='sd') {
					text += '<span class="bd">Salario Medio</span>: '+data['provinces'][provinces[_pro]][_mun]['salario']+' CUP<br>';
					text += '<span class="bd">Relación de Dependencia de la Edad</span>: '+data['provinces'][provinces[_pro]][_mun]['dependencia']+'<br>';
				}
				if (idx=='sr') {
					text += '<span class="bd">Salario Medio</span>: '+data['provinces'][provinces[_pro]][_mun]['salario']+' CUP<br>';
					text += '<span class="bd">Población Rural</span>: '+data['provinces'][provinces[_pro]][_mun]['rural']+'%<br>';
				}
				if (idx=='rb') {
					text += '<span class="bd">Población Rural</span>: '+data['provinces'][provinces[_pro]][_mun]['rural']+'%<br>';
					text += '<span class="bd">Color de la piel</span>: '+data['provinces'][provinces[_pro]][_mun]['blanca']+'% blanca, '+(Math.round((100-data['provinces'][provinces[_pro]][_mun]['blanca'])*100)/100)+'% mulata y negra<br>';
				}
				if (idx=='rd') {
					text += '<span class="bd">Población Rural</span>: '+data['provinces'][provinces[_pro]][_mun]['rural']+'%<br>';
					text += '<span class="bd">Relación de Dependencia de la Edad</span>: '+data['provinces'][provinces[_pro]][_mun]['dependencia']+'<br>';
				}
				if (idx=='bd') {
					text += '<span class="bd">Color de la piel</span>: '+data['provinces'][provinces[_pro]][_mun]['blanca']+'% blanca, '+(Math.round((100-data['provinces'][provinces[_pro]][_mun]['blanca'])*100)/100)+'% mulata y negra<br>';
					text += '<span class="bd">Relación de Dependencia de la Edad</span>: '+data['provinces'][provinces[_pro]][_mun]['dependencia']+'<br>';
				}
				return text;
			});	
			
		}
		setCentroids();
		setPie();
		setScatter();
		geojson.setStyle(style);
		
	}
	
	$('#first-criteria').on('change',function(e){
		var val  = $('#first-criteria').val();
		$('#second-criteria option').show();
		if (val!='none'){
			$('#s'+val).hide();
		}
		setIdx();
	});
	$('#second-criteria').on('change',function(e){
		var val  = $('#second-criteria').val();
		$('#first-criteria option').show();
		if (val!='none'){
			$('#f'+val).hide();
		}
		setIdx();
	});
	 
	//$('#map-selector').on('change',function(e){
		//var val = $('#map-selector').val();
		//geojson.closePopup();
		//if (val=='none'){ 
			//idx = null;
			//geojson.unbindPopup();
		//}
		//else {
			//idx = val;
			//geojson.bindPopup(function(layer){
				//var _pro =  layer.feature.properties.nam;
				//var _mun =  layer.feature.properties.laa.toLowerCase();
				//var text = '<span class="bd" style="color:'+cols2[_pro]+';">'+_pro+'</span> - '+layer.feature.properties.laa+'<br><br>';
				//if (idx=='is') {
					//text += '<span class="bd">Tasa de Migración Interna</span>: '+data['provinces'][provinces[_pro]][_mun]['interna']+'<br>';
					//text += '<span class="bd">Salario Medio</span>: '+data['provinces'][provinces[_pro]][_mun]['salario']+' CUP<br>';
				//}
				//if (idx=='ib') {
					//text += '<span class="bd">Tasa de Migración Interna</span>: '+data['provinces'][provinces[_pro]][_mun]['interna']+'<br>';
					//text += '<span class="bd">Color de la piel</span>: '+data['provinces'][provinces[_pro]][_mun]['blanca']+'%<br>';
				//}
				//if (idx=='id') {
					//text += '<span class="bd">Tasa de Migración Interna</span>: '+data['provinces'][provinces[_pro]][_mun]['interna']+'<br>';
					//text += '<span class="bd">Relación de Dependencia de la Edad</span>: '+data['provinces'][provinces[_pro]][_mun]['dependencia']+'<br>';
				//}
				//if (idx=='ir') {
					//text += '<span class="bd">Tasa de Migración Interna</span>: '+data['provinces'][provinces[_pro]][_mun]['interna']+'<br>';
					//text += '<span class="bd">Población Rural</span>: '+data['provinces'][provinces[_pro]][_mun]['rural']+'%<br>';
				//}
				//if (idx=='sb') {
					//text += '<span class="bd">Salario Medio</span>: '+data['provinces'][provinces[_pro]][_mun]['salario']+' CUP<br>';
					//text += '<span class="bd">Color de la piel</span>: '+data['provinces'][provinces[_pro]][_mun]['blanca']+'%<br>';
				//}
				//if (idx=='sd') {
					//text += '<span class="bd">Salario Medio</span>: '+data['provinces'][provinces[_pro]][_mun]['salario']+' CUP<br>';
					//text += '<span class="bd">Relación de Dependencia de la Edad</span>: '+data['provinces'][provinces[_pro]][_mun]['dependencia']+'<br>';
				//}
				//if (idx=='sr') {
					//text += '<span class="bd">Salario Medio</span>: '+data['provinces'][provinces[_pro]][_mun]['salario']+' CUP<br>';
					//text += '<span class="bd">Población Rural</span>: '+data['provinces'][provinces[_pro]][_mun]['rural']+'%<br>';
				//}
				//if (idx=='rb') {
					//text += '<span class="bd">Población Rural</span>: '+data['provinces'][provinces[_pro]][_mun]['rural']+'%<br>';
					//text += '<span class="bd">Población blanca</span>: '+data['provinces'][provinces[_pro]][_mun]['blanca']+'%<br>';
				//}
				//if (idx=='rd') {
					//text += '<span class="bd">Población Rural</span>: '+data['provinces'][provinces[_pro]][_mun]['rural']+'%<br>';
					//text += '<span class="bd">Relación de Dependencia de la Edad</span>: '+data['provinces'][provinces[_pro]][_mun]['dependencia']+'<br>';
				//}
				//if (idx=='bd') {
					//text += '<span class="bd">Color de la piel</span>: '+data['provinces'][provinces[_pro]][_mun]['blanca']+'%<br>';
					//text += '<span class="bd">Relación de Dependencia de la Edad</span>: '+data['provinces'][provinces[_pro]][_mun]['dependencia']+'<br>';
				//}
				//return text;
			//});
		//}
		//geojson.setStyle(style);
	//});
	
	$('#algorithm').on('change',function(e){
		alg = $('#algorithm').val();
		console.log(alg);
		setIdx();
	});
	
	$('#lha').on('change',function(e){
		if ($('#lha').prop('checked')){
			kind = 'ellha';
		} else {
			kind = 'all';
		}
		setIdx();
	});
	
	function getColor(d) {
		if (idx==null){
			return 'gray';
		} else {
			var ids = d.split('|');
			var pro = provinces[ids[0]];
			var mun = ids[1].toLowerCase();
			var item = data['provinces'][pro][mun]['clusters'][kind][alg][idx];
			if (item==null){return 'gray';}
			return colors[item];
		}
	}
	
	function style(feature){
		 return {
			weight: 0.5,
			opacity: 0.8,
			color: 'white',
			fillOpacity: 0.9,
			fillColor: getColor(feature.properties.nam+'|'+feature.properties.laa)
		};
	}
	
	
	function highlightFeature(e) {
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
	
	function resetHighlight(e) {
	    geojson.resetStyle(e.target);
	}
	
	function onEachFeature(feature, layer) {
	    layer.on({
	        mouseover: highlightFeature,
	        mouseout: resetHighlight
	    });
	}
	
	var satellite = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		maxZoom: 18,
		id: 'mapbox.satellite',
		accessToken: 'pk.eyJ1IjoieXVkaXZpYW4iLCJhIjoiY2pzMmNlZGJ3MjNqazQ0dWtja2I5MmQ4eSJ9.xs8wlJXK4B4N8r2vQsopQQ'
	});
	
	var geojson = L.geoJSON(muns,{style:style,onEachFeature: onEachFeature});
	geojson.bindTooltip(function(layer){
		var _pro =  layer.feature.properties.nam;
		return '<span class="bd" style="color:'+cols2[_pro]+';">'+layer.feature.properties.nam+'</span> - '+layer.feature.properties.laa;
	},{'sticky':true});
	
	
	var map = L.map('map-item', {
	    center: [21.5, -79.371124],
	    zoom: 16,
	    layers: [geojson],
	    keyboard: false,
	    dragging: true,
	    zoomControl: true,
	    boxZoom: false,
	    doubleClickZoom: false,
	    scrollWheelZoom: false,
	    tap: true,
	    touchZoom: true,
	    zoomSnap: 0.15
	});
	map.fitBounds(geojson.getBounds());
	
	
	
	var markers = L.featureGroup();
	
	var transitions = {
		0: true,
		1: false,
		2: false,
		3: false,	
		4: false,
		5: false,
		6: false,	
		7: false,
		8: false,
		9: false,	
	};
	
	function clearAllTransitions() {
		for(var i in transitions){
			transitions[i]=false;		
		}
	}
	
	function clearTransition(){
		clearAllTransitions();
		transitions[0] = true;
		kind = 'all';
		$('#lha').val('FALSE');
		idx = null;
		$('#algorithm').val('ms');
		alg = 'ms';
		$('#first-criteria').val('none');
		$('#second-criteria').val('none');
		enableSelection();
		setIdx();
		
		map.removeLayer(markers);	
		
		markers = L.featureGroup();
		map.flyToBounds(geojson.getBounds());
	}
	
	function setMapState5(){
		kind = 'all';
		$('#lha').val('FALSE');
		alg = 'ms';
		$('#algorithm').val('ms');
		idx = "b";
		$('#first-criteria').val('b');
		$('#second-criteria').val('none');
		disableSelection();
		setIdx();
			
	}
	
	function transition5(){
		clearAllTransitions();
		transitions[5]=true;
		setMapState5();
	}
	
	function setMapState6(){
		kind = 'all';
		$('#lha').val('FALSE');
		alg = 'ms';
		$('#algorithm').val('ms');
		idx = "s";
		$('#first-criteria').val('s');
		$('#second-criteria').val('none');
		disableSelection();
		setIdx();
	}
	
	function transition6(){
		clearAllTransitions();
		transitions[6]=true;
		setMapState6();
	}
	
	function setMapState7(){
		kind = 'all';
		$('#lha').val('FALSE');
		alg = 'ms';
		$('#algorithm').val('ms');
		idx = "r";
		$('#first-criteria').val('r');
		$('#second-criteria').val('none');
		disableSelection();
		setIdx();
	}
	
	function transition7(){
		clearAllTransitions();
		transitions[7]=true;
		setMapState7();
	}
	
	function setMapState8(){
		kind = 'all';
		$('#lha').val('FALSE');
		alg = 'ms';
		$('#algorithm').val('ms');
		idx = "i";
		$('#first-criteria').val('i');
		$('#second-criteria').val('none');
		disableSelection();
		setIdx();
	}
	
	function transition8(){
		clearAllTransitions();
		transitions[8]=true;
		setMapState8();
	}
	
	function setMapState9(){
		kind = 'all';
		$('#lha').val('FALSE');
		alg = 'ms';
		$('#algorithm').val('ms');
		idx = "d";
		$('#first-criteria').val('d');
		$('#second-criteria').val('none');
		disableSelection();
		setIdx();
	}
	
	function transition9(){
		clearAllTransitions();
		transitions[9]=true;
		setMapState9();
	}
	
	
	function setMapState1(){
		kind = 'all';
		$('#lha').val('FALSE');
		alg = 'ms';
		$('#algorithm').val('ms');
		idx = "sb";
		$('#first-criteria').val('b');
		$('#second-criteria').val('s');
		disableSelection();
		setIdx();
			
	}
	
	
	function transition1(){
		clearAllTransitions();
		transitions[1]=true;
		setMapState1();
	}
	
	function transition10(){
		clearAllTransitions();
		transitions[1]=true;
		transitions[10]=true;
		map.fitBounds([[23.490242, -82.247665],[21.167049, -78.643614]]);
		markers.addLayer(L.marker([23.098507, -81.353866]).bindTooltip('Cárdenas',{'permanent':true,'direction':'top'}).openTooltip());
		markers.addLayer(L.marker([22.509576, -79.477330]).bindTooltip('Caibarién',{'permanent':true,'direction':'top'}).openTooltip());
		markers.addLayer(L.marker([22.101296, -78.622584]).bindTooltip('Morón',{'permanent':true,'direction':'top'}).openTooltip());
		markers.addLayer(L.marker([21.849701, -78.770342]).bindTooltip('Ciego de Ávila',{'permanent':true,'direction':'top'}).openTooltip());
		markers.addLayer(L.marker([21.667101, -79.251304]).bindTooltip('La Sierpe',{'permanent':true,'direction':'top'}).openTooltip());
		markers.addLayer(L.marker([22.526510, -81.132639]).bindTooltip('Jagüey Grande',{'permanent':true,'direction':'top'}).openTooltip());
		markers.addTo(map);
	}
	
	function transition11(){
		clearAllTransitions();
		transitions[1]=true;
		transitions[11]=true;
		map.removeLayer(markers);	
		markers = L.featureGroup();		
		map.flyToBounds([[21.009701, -78.045116],[19.563690, -73.896923]]);
	}
	
	function setMapState2(){
		kind = 'all';
		$('#lha').val('FALSE');
		alg = 'ms';
		$('#algorithm').val('ms');
		idx = "rb";
		$('#first-criteria').val('b');
		$('#second-criteria').val('r');
		disableSelection();
		setIdx();
			
	}
	
	function transition2(){
		clearAllTransitions();
		transitions[2]=true;
		setMapState2();
	}
	
	function transition12(){
		clearAllTransitions();
		transitions[2]=true;
		transitions[12]=true;
		markers.addLayer(L.marker([22.258304, -83.686894]).bindTooltip('San Luis',{'permanent':true,'direction':'top'}).openTooltip());
		markers.addLayer(L.marker([22.084779, -78.338875]).bindTooltip('Bolivia',{'permanent':true,'direction':'top'}).openTooltip());
		markers.addTo(map);
	}
	
	function setMapState3(){
		kind = 'all';
		$('#lha').val('FALSE');
		alg = 'ms';
		$('#algorithm').val('ms');
		idx = "sr";
		$('#first-criteria').val('s');
		$('#second-criteria').val('r');
		disableSelection();
		setIdx();	
	}
	
	function transition3(){
		clearAllTransitions();
		transitions[3]=true;
		setMapState3();
	}
	
	function transition13(){
		clearAllTransitions();
		transitions[3]=true;
		transitions[13]=true;
		markers.addLayer(L.marker([22.101296, -78.622584]).bindTooltip('Morón',{'permanent':true,'direction':'top'}).openTooltip());
		markers.addTo(map);
		map.flyToBounds([[22.466950, -78.980621],[21.912782, -78.499073]]);
	}
	
	function transition14(){
		clearAllTransitions();
		transitions[3]=true;
		transitions[14]=true;
		//map.addLayer(satellite);
		//map.removeLayer(geojson);
		markers.addLayer(L.marker([21.667101, -79.251304]).bindTooltip('La Sierpe',{'permanent':true,'direction':'top'}).openTooltip());
		markers.addTo(map);
		map.flyToBounds([[21.913821, -79.501864],[21.523668, -78.899630]]);
	}
	
	function transition15(){
		clearAllTransitions();
		transitions[3]=true;
		transitions[15]=true;
		//map.addLayer(geojson);
		//map.removeLayer(satellite);
		map.removeLayer(markers);	
		markers = L.featureGroup();	
		map.flyToBounds(geojson.getBounds());	
	}
	
	function setMapState4(){
		kind = 'all';
		$('#lha').val('FALSE');
		alg = 'ms';
		$('#algorithm').val('ms');
		idx = "id";
		$('#first-criteria').val('d');
		$('#second-criteria').val('i');
		disableSelection();
		setIdx();
			
	}
	
	function transition4(){
		clearAllTransitions();
		transitions[4]=true;
		setMapState4();
	}
	
	function transition16(){
		clearAllTransitions();
		transitions[4]=true;
		transitions[16]=true;
		map.flyToBounds([[23.319867, -83.330580],[21.299692, -78.660900]]);
	}
	
	
	
	(function(){
    var widgetIframe = document.getElementById('sc-frame'),
        widget       = SC.Widget(widgetIframe);
    
    $('#map-item').click(function(e){
		widget.pause();
	});
	$('#map-selection').click(function(e){
		widget.pause();
	});
	$('#map-graphs').click(function(e){
		widget.pause();
	});
	
	//$('#gray-out').click(function(e){
		//$('.cintroduction').hide();
		//$('#gray-out').hide();
		//widget.play();	
	//});
	
	$('#listen').click(function(e){
		$('.cintroduction').hide();
		$('#gray-out').hide();
		$('#explore-action').show();
		$('#methodology-action').hide();
		$('#listen-action').hide();
		$('#methodology').hide();
		$('#content-comments').hide();		
		widget.play();	
	});
	
	$('#listen-now').click(function(e){
		$('.cintroduction').hide();
		$('#gray-out').hide();
		$('#explore-action').show();
		$('#methodology-action').hide();
		$('#listen-action').hide();
		$('#methodology').hide();
		$('#content-comments').hide();		
		widget.play();	
	});
	
	$('#listen-action').click(function(e){
		$('.cintroduction').hide();
		$('#gray-out').hide();
		$('#explore-action').show();
		$('#methodology-action').hide();
		$('#listen-action').hide();
		$('#soundcloud-container').show();
		$('#methodology').hide();
		$('#content-comments').hide();		
		widget.seekTo(0);
		widget.play();	
	});
	
	$('#explore-action').click(function(e){
		widget.pause();
		widget.seekTo(0);
		$('#soundcloud-container').hide();
		$('#explore-action').hide();
		$('#methodology-action').show();
		$('#listen-action').show();
		$('#methodology').show();
		$('#content-comments').show();			
	});

    widget.bind(SC.Widget.Events.PLAY_PROGRESS, function(e) {
      var time = e.currentPosition;
      console.log(time);
      if ((time>=22000)&&(time<23000)){
		  if (!transitions[5]){
			transition5();	
		  }
	  } else if ((time>=23000)&&(time<24000)){
		  if (!transitions[6]){
			transition6();	
		  }
	  } else if ((time>=24000)&&(time<26000)){
		  if (!transitions[7]){
			transition7();	
		  }
	  } else if ((time>=26000)&&(time<27000)){
		  if (!transitions[8]){
			transition8();	
		  }
	  } else if ((time>=27000)&&(time<30000)){
		  if (!transitions[9]){
			transition9();	
		  }
	  } else
	  if ((time>=35000)&&(time<50000)){
		  if (!transitions[1]){
			transition1();
		  }
	  } else if ((time>50000)&&(time<63000)){
		  if (!transitions[1]){
			setMapState1();
		  }
		  if (!transitions[10]){
			transition10();	
		  }
	  } else if ((time>=63000)&&(time<75000)){
		  if (!transitions[1]){
			setMapState1();
		  }
		  if (!transitions[11]){
			transition11();
		  }	
	  } else
	   if ((time>83000)&&(time<101000)){
		  if (!transitions[2]){
			transition2();
		  }
	  }  else if ((time>=101000)&&(time<105000)){
		  if (!transitions[2]){
			setMapState2();
		  }
		  if (!transitions[12]){
			transition12();
		  }
	  }  else if ((time>=112000)&&(time<117000)){
		  if (!transitions[3]){
			transition3();
		  }
		  
	  } else if ((time>=117000)&&(time<126000)){
		  if (!transitions[3]){
			setMapState3();
		  }
		  if (!transitions[13]){
			transition13();
		  }
	  } else if ((time>=126000)&&(time<138000)){
		  if (!transitions[3]){
   		    setMapState3();
		  }
		  if (!transitions[14]){
			transition14();
		  }	
	  } else if ((time>=138000)&&(time<156000)){
		  if (!transitions[3]){
			  setMapState3();
		  }
		  if (!transitions[15]){
			transition15();
		  }	
	  } else if ((time>=169000)&&(time<184000)){
		  if (!transitions[4]){
			transition4();
		  }
	  } else if ((time>=184000)&&(time<190000)){
		  if (!transitions[4]){
			setMapState4();
		  }
		  if (!transitions[16]){
			transition16();	
		  }
	  } else if (time>=204000){
		  $('#gray-out').show();
		  $('#exploring').show();
	  }
	  else {
		if (!transitions[0]){
			clearTransition();
		}  
	  }
    });

  }());
	
});
});
