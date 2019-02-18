var height = window.innerHeight-20;

$('.main-title').css('min-height',height+60);
$('.block-title').css('transform','translateY('+(height)/3+'px)');

$('.more').click(function(e){
	var id = e.currentTarget.id;
	$('#'+id+'-block').slideDown();
	$('#'+id).hide();
});

$('.closer').click(function(e){
	var id = e.currentTarget.id;
	var base = id.replace('-close','');
	console.log(base);
	$('#'+base+'-more-block').slideUp();
	$('#'+base+'-more').show();
});

var astate = {'qn':true,'bb':true,'oz':true,'bg':true,'jb':true,'ng':true,'sy':true,'aa':true};

c3.generate({
        bindto: "#queen-circle-graph",
        data: {
          columns: [
              ['Años',2016,2017,2018,2019,2020],
              ['2017',null,201-56,null,null,null],
              ['2018',null,null,201-10,null,null],
              ['2019',null,null,null,201-29,null]
          ],
          type: 'scatter',
          x: 'Años',
          colors: {
          }
        },
         axis: {
          x: {
            label: 'Años',
          },
          y: {
            label: 'Mejor Posición',
            position: 'outer-middle',
            show: false,
            max: 380,
            min:0
          }
        },
        point: {
                  r: function (d) {
                    if (d.x==2017) {return 3;}
                    if (d.x==2018) {return 128;}
                    if (d.x==2019) {return 27;}
                  }
        },
        tooltip: {
            format:{
                value: function(value,r, id,index) {
					console.log(index);
                    if (index==1){
                        return 'Su mejor posición fue el lugar 56 y solo estuvo 3 días entre los 200 primeros';
                    }
                    if (index==2){
                        return 'Llegó a alcanzar el lugar 10 y estuvo 128 días entre los 200 primeros';
                    }
                    if (index==3){
                        return 'Hasta el 27 de enero estuvo todos los días entre los 200 primeros y el 22 fue su mejor lugar';
                    }
                    return ''; 
                }            
            }
        }
    });
    
c3.generate({
        bindto: "#xxx-graph",
        data: {
          columns: [
              ['Lugar respecto al número de tracks',0,1,2,3,4,5,6],
              ['XXXTENTACION',null,392,null,null,null,null,null],
              ['Future',null,null,190,null,null,null,null],
              ['Drake',null,null,null,392,null,null,null],
              ['Logic',null,null,null,null,236,null,null],
              ['Migos',null,null,null,null,null,269,null]
          ],
          type: 'scatter',
          x: 'Lugar respecto al número de tracks',
          colors: {
			  'XXXTENTACION': '#78BEFF',
			  'Future': '#99FF8B',
			  'Drake': '#CD79FD',
			  'Logic': '#FDFD39',
			  'Migos': '#06FD44'
          }
        },
         grid: {
          x: {

            lines: [{
               value: 1,
               text: 'Primero',
               class: 'xline'
            },
            {
               value: 2,
               text: 'Segundo',
               class: 'xline'
            },
            {
               value: 3,
               text: 'Tercero',
               class: 'xline'
            },
            {
               value: 4,
               text: 'Cuarto',
               class: 'xline'
            },
            {
               value: 5,
               text: 'Quinto',
               class: 'xline'
            }
            ]
          },
          y: {
            lines: [{
               value: 392,
               text: '392 días en lista',
               class: 'xline'
            },
            {
               value: 190,
               text: '190 días en lista',
               class: 'xline'
            },
            {
               value: 269,
               text: '269 días en lista',
               class: 'xline'
            },
            {
               value: 236,
               text: '236 días en lista',
               class: 'xline'
            }
            ]
          }
        },
        legend: {
			class: 'xlegend'
		},
         axis: {
          x: {
            label: 'Lugar respecto al número de tracks',
            show: false
          },
          y: {
            label: 'Días en el Top 200',
            position: 'outer-middle',
            show: false,
            max: 480,
            min:150,
            
          }
        },
        point: {
                  r: function (d) {
                    if (d.x==1) {return 51;}
                    if (d.x==2) {return 30;}
                    if (d.x==3) {return 28;}
                    if (d.x==4) {return 26;}
                    if (d.x==5) {return 25;}
                  }
        },
        tooltip: {
            format:{
                value: function(value,r, id,index) {
					console.log(index);
                    if (index==1){
                        return '51 tracks - 392 días entre los 200 primeros';
                    }
                    if (index==2){
                        return '30 tracks - 190 días entre los 200 primeros';
                    }
                    if (index==3){
                        return '28 tracks - 392 días entre los 200 primeros';
                    }
                    if (index==4){
                        return '26 tracks - 236 días entre los 200 primeros';
                    }
                    if (index==5){
                        return '25 tracks - 269 días entre los 200 primeros';
                    }
                    return ''; 
                }            
            }
        }
    });


$.getJSON('data/spotify.json', function(data) {

	dates = [];
	pos = ['Mejor Posición'];
	streams = ['Reproducciones'];
	for(var i in data['dates']){
		dates.push(i);
	}
	dates.sort();
	dates = ['Días'].concat(dates);
	for(var i=1;i<dates.length;i++){
		var d = dates[i];
		if(data['dates'][d]['pos']!=null){
			pos.push(-data['dates'][d]['pos']);
		} else {
			pos.push(null);
		}
		if (data['dates'][d]['streams']!=0){
			streams.push(data['dates'][d]['streams']);
		} else {
			streams.push(null);
		}
	}
	
	c3.generate({
        bindto: "#queen-2018-line",
        data: {
          columns: [dates,pos],
          type: 'line',
          x: 'Días',
          colors: {
			  'Mejor Posición':'rgba(70,26,87,1)'
          }, 
        axes:{
			'Mejor Posición': 'y',
			'Reproducciones': 'y2'
		}
        },
         axis: {
          x: {
            label: 'Días',
            type: 'timeseries',
          },
          y: {
            label: 'Mejor Posición',
            position: 'outer-middle',
            show: false
          },
          y2: {
			label: 'Número de Reproducciones',  
            show: false
          }
        },
		point: {
                  r: function (d) {
                    return 1.75;
                  }
        },
        zoom: {
          enabled: true
        },
        subchart: { show: true },
        tooltip: {
            format:{
                value: function(value,r, id,index) {
					if (id==pos[0]){
						return -value;
					}
					return value;
				}
			}
		},
        legend: {
			show: false
		},
		grid: {
          x: {
            lines: [{
               value: '2018-10-23',
               text: 'Premiere en Londres'
            },
            {
               value: '2018-05-15',
               text: 'Primer Trailer'
            },
            {
               value: '2018-07-17',
               text: 'Segundo Trailer'
            },
            {
               value: '2018-08-25',
               text: 'Tercer Trailer'
            },
            {
               value: '2018-10-6',
               text: 'Primera exhibición'
            }
            ]
          }
       }
    });
	
}); 

$.getJSON('data/queen-songs.json', function(data) {
	var dates = [];
	for(var i in data){
		for(var j in data[i]){
			dates.push(j)
		}
		break;
	}
	dates.sort();
	var text = '';
	text +='<table id="table-queen-tracks" class="tablesorter"><thead><th class="sorter-false">Track</th><th>Lugar (mejor)</th><th>Días en lista</th><th>Lugares</th></thead><tbody>';
	for(var t in data){
		var tmin = 1000;
		var ttotal = 0;
		var tline= '';
		var tdate = null;
		for(var d in dates){
			var value = data[t][dates[d]]['pos'];
			if (value!=null){
				ttotal+=1;
				if (value<=tmin){ 
					if (value==tmin){
						tdate += ' | '+dates[d];
					} else {
						tdate = dates[d];
					}
					tmin=value; 
				}
				tline = tline+(201-value)+',';
			} else {
				tline = tline +'0,';
			}
		}
		text += '<tr><td><span class="track-name">'+t+'</span></td><td><span class="track-best">'+tmin+'</span></td><td><span class="track-total">'+ttotal+'</span></td><td><span class="line"  data-peity=\'{"max":200}\'>'+tline.slice(0,tline.length-1)+'</span></td></div>'
	}
	text+='</tbody></table>';
	
	$('#queen-2018-songs').html(text);
	$(".line").peity("line",{fill:'rgba(70,26,87,0.4)',stroke:'rgba(70,26,87,1)',strokeWidth:1,width:50,height:20});
	$('#table-queen-tracks').tablesorter({
			widgets        : ['zebra', 'columns'],
			usNumberFormat : false,
			sortReset      : true,
			sortRestart    : true,
			sortList: [[2,1]]
			//theme : 'blue'
	});
});

$.getJSON('data/artist-queen-period.json', function(data) {
	var text = '';
	text += '<div class="table-artist-pager"> Vista: <select class="gotoPage"></select> <img src="images/first.png" class="cursor first" alt="Primera" title="Primera vista" /><img src="images/prev.png" class="cursor prev" alt="Siguiente" title="Siguiente vista" /> <span class="pagedisplay"></span> <img src="images/next.png" class="cursor next" alt="Próxima" title="Próxima vista" /><img src="images/last.png" class="cursor last" alt="Última" title= "Última vista" /> <select class="pagesize"><option value="10" selected="selected">10</option><option value="15">15</option><option value="20">20</option></select></div>';
	text +='<table id="table-all-artist" class="tablesorter"><thead><th class="sorter-false">Artista</th><th>Lugar (mejor)</th><th class="hidden-sm hidden-xs">Lugar (ave)</th><th class="hidden-sm hidden-xs">Lugares</th><th>Tracks (total)</th><th>Tracks día (ave)</th><th class="hidden-sm hidden-xs">Tracks día (min)</th><th>Tracks día (max)</th><th  class="hidden-sm hidden-xs">Tracks</th></thead><tbody>';
	for(var a in data){
		var qclass="";
		if (a.toLowerCase()=='queen'){qclass=' queen-class ';}
		text +='<tr>';
		text +='<td><span class="artist'+qclass+'">'+a+'</span></td> ';
		text +='<td><span class="artist-best-pos'+qclass+'">'+data[a]['best-pos']+'</span></td> ';
		text +='<td class="hidden-sm hidden-xs"><span class="artist-best-ave'+qclass+'">'+data[a]['best-ave']+'</span></td> ';
		var bl = [];
		for(var i in data[a]['best-array']){ bl.push(201-data[a]['best-array'][i]);}
		text +='<td class="hidden-sm hidden-xs"><span class="artist-best-line line1"  data-peity=\'{"max":200}\'>'+String(bl)+'</span></td> ';
		text +='<td><span class="artist-tracks-total'+qclass+'">'+data[a]['tracks-total']+'</span></td> ';
		text +='<td><span class="artist-tracks-ave'+qclass+'">'+data[a]['tracks-ave']+'</span></td> ';
		text +='<td class="hidden-sm hidden-xs"><span class="artist-tracks-min-day'+qclass+'">'+data[a]['tracks-min-day']+'</span></td> ';
		text +='<td><span class="artist-tracks-max-day'+qclass+'">'+data[a]['tracks-max-day']+'</span></td> ';
		text +='<td class="hidden-sm hidden-xs"><span class="artist-tracks-line line2"  data-peity=\'{"max":20}\'>'+String(data[a]['tracks-array'])+'</span></td> ';
		text += '</tr>';
	}
	text+='</tbody></table>';
	text += '<div class="table-artist-pager"> Vista: <select class="gotoPage"></select> <img src="images/first.png" class="cursor first" alt="Primera" title="Primera vista" /><img src="images/prev.png" class="cursor prev" alt="Siguiente" title="Siguiente vista" /> <span class="pagedisplay"></span> <img src="images/next.png" class="cursor next" alt="Próxima" title="Próxima vista" /><img src="images/last.png" class="cursor last" alt="Última" title= "Última vista" /> <select class="pagesize"><option value="10" selected="selected">10</option><option value="15">15</option><option value="20">20</option></select></div>';
	
	$('#queen-2018-artists').html(text);
	$(".line1").peity("line",{fill:'rgba(70,26,87,0.4)',stroke:'rgba(70,26,87,1)',strokeWidth:1,width:50,height:20});
	$(".line2").peity("line",{fill:'rgba(214,31,38,0.4)',stroke:'rgba(214,31,38,1)',strokeWidth:1,width:50,height:20});
	pagerOptions = {
	    container: $(".table-artist-pager"),
	    output: '{startRow} - {endRow} / {totalRows}',
	    fixedHeight: true,
	    removeRows: false,
	    updateArrows: true,
	    cssDisabled: 'disabled', 
	    page: 0,
	    size: 10,
	    cssGoto: '.gotoPage'
    };
	$('#table-all-artist').tablesorter({
			widgets        : ['zebra', 'columns'],
			usNumberFormat : false,
			sortReset      : true,
			sortRestart    : true,
			sortList: [[4,1]]
	}).tablesorterPager(pagerOptions);;
});

$.getJSON('data/tracks-110.json', function(data) {
	var text = '';
	var tracks = data['tracks'];
	text += '<div class="table-all-pager"> Vista: <select class="gotoPage"></select> <img src="images/first.png" class="cursor first" alt="Primera" title="Primera vista" /><img src="images/prev.png" class="cursor prev" alt="Siguiente" title="Siguiente vista" /> <span class="pagedisplay"></span> <img src="images/next.png" class="cursor next" alt="Próxima" title="Próxima vista" /><img src="images/last.png" class="cursor last" alt="Última" title= "Última vista" /> <select class="pagesize"><option value="15" selected="selected">15</option><option value="20">20</option><option value="25">25</option></select></div>';
	text +='<table id="table-all-tracks" class="tablesorter"><thead><th class="sorter-false">Track</th><th class="sorter-false">Artista</th><th>Lugar (mejor)</th><th>Lugar (ave)</th><th>Streams</th><th class="hidden-sm hidden-xs">Lugares</th></thead><tbody>';
	var order = 0;
	for(var i in tracks){
		var qclass="";
		if (tracks[i]['artist'].toLowerCase()=='queen'){qclass=' queen-class ';}
		text +='<tr>';
		text +='<td><span class="track'+qclass+'">'+tracks[i]['track']+'</span></td> ';
		text +='<td><span class="artist'+qclass+'">'+tracks[i]['artist']+'</span></td> ';
		text +='<td><span class="track-best-pos'+qclass+'">'+tracks[i]['best-pos']+'</span></td> ';
		text +='<td><span class="track-pos-ave'+qclass+'">'+tracks[i]['pos-ave']+'</span></td> ';
		text +='<td><span class="track-streams'+qclass+'">'+tracks[i]['streams']+'</span></td> ';
		var bl = [];
		for(var j in tracks[i]['pos-array']){ bl.push(201-tracks[i]['pos-array'][j]);}
		text +='<td class="hidden-sm hidden-xs"><span class="track-best-line line3"  data-peity=\'{"max":200}\'>'+String(bl)+'</span></td>';
		text += '</tr>';
	}
	text+='</tbody></table>';
	text += '<div class="table-all-pager"> Vista: <select class="gotoPage"></select> <img src="images/first.png" class="cursor first" alt="Primera" title="Primera vista" /><img src="images/prev.png" class="cursor prev" alt="Siguiente" title="Siguiente vista" /> <span class="pagedisplay"></span> <img src="images/next.png" class="cursor next" alt="Próxima" title="Próxima vista" /><img src="images/last.png" class="cursor last" alt="Última" title= "Última vista" /> <select class="pagesize"><option value="15" selected="selected">15</option><option value="20">20</option><option value="25">25</option></select></div>';
	
	$('#queen-2018-tracks-110').html(text);
	$(".line3").peity("line",{fill:'rgba(70,26,87,0.4)',stroke:'rgba(70,26,87,1)',strokeWidth:1,width:50,height:20});
	pagerOptions = {
	    container: $(".table-all-pager"),
	    output: '{startRow} - {endRow} / {totalRows}',
	    fixedHeight: true,
	    removeRows: false,
	    updateArrows: true,
	    cssDisabled: 'disabled', 
	    page: 0,
	    size: 15,
	    cssGoto: '.gotoPage'
    };
	$('#table-all-tracks').tablesorter({
			widgets        : ['zebra', 'columns'],
			usNumberFormat : false,
			sortReset      : true,
			sortRestart    : true,
			sortList: [[2,0]]
			//theme : 'blue'
	}).tablesorterPager(pagerOptions);;
});

$.getJSON('data/country-stats.json', function(data) {
	
	var cbp = {};
	var cdc = {};
	var ctt = {};
	
	for(var i in data){
		cbp[i.toUpperCase()] = 201-data[i]['best-pos'][0];
		cdc[i.toUpperCase()] = data[i]['days-in-chart'];
		ctt[i.toUpperCase()] = data[i]['total-tracks'];
	}
	var sel = 'cbp';
	
	 map = new jvm.Map({map: 'world_mill',backgroundColor: 'transparent', container:$("#queen-map"),
            series: {
                    regions: [{
                    attribute: 'fill',
                    scale: ['#A8EEFF', '#461A57'],
                    normalizeFunction: 'polynomial',
                    max:200,
                    min:100,
                    values: cbp,
                    }]
                },
             onRegionTipShow: function(e, el, code){
				var c = code.toLowerCase();
				if (c in data){
					var text = '';
					if (sel=='cbp') {text = 'Su mejor posicíón fue el lugar '+data[c]['best-pos'][0]+' y la obtuvo por primera vez el '+data[c]['best-pos'][1];}
					if (sel=='cdc') {text = 'Estuvo '+data[c]['days-in-chart']+' días, desde su estreno el 23 de octubre hasta el 27 de enero, con al menos una canción entre las 200 primeras a nivel mundial'}
					if (sel=='ctt') {text = 'En el período, '+data[c]['total-tracks']+' tracks que estuvieron por lo menos una vez entre las 200 primeras a nivel mundial';}
					if (c=='gb'){
					     c='uk';		
					}
					el.html('<img class="flag-min" src="../../assets/images/flags-mini/'+c+'.png"> '+el.html()+'<br><div class="md">'+text+'</div>');	 
				} else {
					el.html('<img class="flag-min" src="../../assets/images/flags-mini/'+c+'.png"> '+el.html()+'<br><div class="md">No se tuvo estadísticas para analizar</div>');
				}
                
        },
            regionStyle: {
              initial: {
                fill: '#8f8f8f'
                
        }
    }});
    map.reset();
	map.series.regions[0].clear();
	map.series.regions[0].params.max=200;
	map.series.regions[0].params.min=100;
	map.series.regions[0].setScale(['#E4DFB6','#461A57']);
	map.series.regions[0].setValues(cbp);
    
    $('#map-select').on('change', function() {
		var val = $('#map-select').val();
		if (val=='cbp'){
			sel = 'cbp';
			map.reset();
			map.series.regions[0].clear();
			map.series.regions[0].params.max=200;
			map.series.regions[0].params.min=100;
			map.series.regions[0].setScale(['#E4DFB6','#461A57']);
			map.series.regions[0].setValues(cbp);
		}
		if (val=='cdc'){
			sel = 'cdc';
			map.reset();
			map.series.regions[0].params.max=110;
			map.series.regions[0].params.min=15;
			map.series.regions[0].setScale(['#E4DFB6','#F4741C']);
			map.series.regions[0].clear();
			map.series.regions[0].setValues(cdc);
		}
		if (val=='ctt'){
			sel = 'ctt';
			map.reset();
			map.series.regions[0].params.max=25;
			map.series.regions[0].params.min=1;
			map.series.regions[0].setScale(['#FFFACC','#D61F26']);
			map.series.regions[0].clear();
			map.series.regions[0].setValues(ctt);
		}
	});
});


$.getJSON('data/queen-reggaeton.json', function(data) {
	var artists = data['artist'];
	var dates = ['Días'].concat(data['dates']);
	var names = {'qn':'Queen','bb':'Bad Bunny','oz':'Ozuna','bg':'Becky G','jb':'J Balvin','ng':'Nio García','sy':'Sebastián Yatra','aa':'Anuel Aa'};
	var color = {'qn':'#FF7527','bb':'#7573DE','oz':'#05438A','bg':'#B61ECD','jb':'#B72812','ng':'#CDC415','sy':'#58CD0F','aa':'#0C8A2C'};
	var c = [dates];
	var cols = {};
	var text = '';
	for(var a in artists){
		var i=0;
		text +='<span class="cursor litem" id="'+a+'"><i class="fa fa-square" style="color:'+color[a]+';"></i> '+names[a]+' </span>';
		for(var t in artists[a]){
			i++;
			var temp = [names[a]+' - '+t];
			cols[names[a]+' - '+t] = color[a];
			var l = [];
			for(var j in artists[a][t]){
				if(artists[a][t][j]!=null){
					l.push(-artists[a][t][j]);
				} else {
					l.push(null);
				}
			}
			temp = temp.concat(l);
			c.push(temp);
		}
	}
	var graph = c3.generate({
        bindto: "#queen-2018-reggaeton",
        data: {
          columns: c,
          type: 'line',
          x: 'Días',
          colors: cols
        },
        zoom: {
          enabled: true
        },
        subchart: { show: true },
         axis: {
          x: {
            label: 'Días',
            type: 'timeseries',
          },
          y: {
            label: 'Posición',
            position: 'outer-middle',
            show: false
          }
        },
        legend: {
			show: false
		},
        tooltip: {
			grouped: false,
            format:{
                value: function(value,r, id,index) {
					return (-1*value);
				}
			}
		},
        regions: [
          {start:'2018-11-01',end:'2018-11-30',text:'Noviembre'},
        ],
        grid: {
          x: {
            lines: [
            {
               value: '2018-11-01',
               text: '1ro de noviembre'
            },
            {
               value: '2018-11-30',
               text: '30 de noviembre'
            }
            ]
          }
       }
    });
    $('#reggaeton-legend').html(text);
    $('.litem').on('mouseenter',function(e){
		var id = e.currentTarget.id;
		if(astate[id]){
			$('.litem').css('opacity','0.5');
			$('#'+id).css('opacity','1');
			var focus = [];
			for(var i in artists[id]){
				focus.push(names[id]+' - '+i);	
			}
			graph.focus(focus);
		}
	});
	$('.litem').on('mouseout',function(e){
		var id = e.currentTarget.id;
		for(var i in astate){
			if (astate[i]){
				$('#'+i).css('opacity','1');
			} 
		}
		if (!astate[id]){$('#'+id).css('opacity','0.5');}
		graph.focus();
	});
    $('.litem').click(function(e){
		var id = e.currentTarget.id;
		if (astate[id]){
			$('#'+id).css('opacity','0.5');
			
			var hide = [];
			for(var i in artists[id]){
				hide.push(names[id]+' - '+i);	
			}
			graph.hide(hide);
			astate[id]=false;
			for(var i in astate){
				if (astate[i]){
					$('#'+i).css('opacity','1');
				} 
			}
			graph.focus();		
		} else {
			$('#'+id).css('opacity','1');
			var show = [];
			for(var i in artists[id]){
				show.push(names[id]+' - '+i);	
			}
			graph.show(show);
			
			for(var i in astate){
				if (astate[i]){
					$('#'+i).css('opacity','0.5');
				} 
			}
			astate[id]=true;
				
			graph.focus(show);
		}
	});
	$.getJSON('data/xxxtentacion.json', function(data) {
			var dates = ['Días'].concat(data['dates']);
			var pos = ['Mejor Posición'];
			for(var i in data['pos']){
				pos.push(-data['pos'][i]);
			}
			var tracks = ['Número de Tracks'];
			for(var i in data['tracks']){
				tracks.push(-data['tracks'][i]);
			}
			console.lo
		c3.generate({
        bindto: "#xxx-graph2",
        data: {
          columns: [dates,pos],
          type: 'spline',
          x: 'Días',
          colors: {
			  'Mejor Posición': '#78BEFF',
          }
        },
         axis: {
          x: {
            label: 'Días',
            type: 'timeseries',
            show: true
          },
          y: {
            show: false
          }
        },
        zoom: {
          enabled: true
        },
        subchart: { show: true },
        tooltip: {
            format:{
                value: function(value,r, id,index) {
					if (id==pos[0]){
						return -value;
					}
					return value;
				}
			}
		},
        legend: {
			show: false
		},
		point: {
                  r: function (d) {
                    return 1.5;
                  }
        },
		grid: {
          x: {
            lines: [
            {
               value: '2018-06-18',
               text: '18 de junio',
               class: 'xline'
            }
            ]
          }
       }
    });
    $('#xxx-more-block').hide();
	});
});
