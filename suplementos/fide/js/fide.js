$('#select-champ').on('change',function(e){
	 $('.champ').hide();
	 $('#'+$('#select-champ').val()).show();
});

$.getJSON("data/paises.json",function(countries){
	
	var coun = [];
	for(var c in countries){
		coun.push([c,countries[c].pais]);
	}
	coun.sort(function(a,b){
		if (a[1]>b[1]){
			return 1;	
		}
		return -1;	
	});
	var countext = '<option value="none" selected="selected">-------</option>';
	for(var i in coun){
			countext += '<option value="'+coun[i][0]+'">'+coun[i][1]+'</option>';
	}
	$('#countries').html(countext);
	
	$.getJSON("data/transferencias.json",function(trans){
		var years = ['Años'];
		var all = ['Transferencias por año'];
		var cub = ['Transferencias desde Cuba'];
		var from_cuba = {};
		var afrom_cuba = [];
		var total_cuba = 0;
		var total = 0;
		var from_all = {};
		var afrom_all = [];
		var to_all = {};
		var ato_all = [];
		var diff_all = {};
		var adiff_all = [];
		var pair_all = {};
		var apair_all = [];
		var to_countries = {};
		var from_countries = {}; 
		
		
		for(var i=2000;i<=2020;i++){
			years.push(i);
			all.push(trans.transferencias[i].length);
			var ncub = 0;
			
			
			for(var j in trans.transferencias[i]){
				total+=1;
				var t = trans.transferencias[i][j];
				var pair = t.fed_origen+'-'+t.fed_destino;
				
				if (t.fed_origen in to_countries){
					if (to_countries[t.fed_origen].indexOf(t.fed_destino)==-1){
						to_countries[t.fed_origen].push(t.fed_destino);	
					}
				} else {
					to_countries[t.fed_origen] = [t.fed_destino];	
				}
				
				if (t.fed_destino in from_countries){
					if (from_countries[t.fed_destino].indexOf(t.fed_origen)==-1){
						from_countries[t.fed_destino].push(t.fed_origen);	
					}
				} else {
					from_countries[t.fed_destino] = [t.fed_origen];	
				}
				
				if (pair in pair_all){
					pair_all[pair]+=1;	
				} else {
					pair_all[pair]=1;		
				}
				
				if (t.fed_destino in to_all){
					to_all[t.fed_destino]+=1;
					diff_all[t.fed_destino]+=1;
				} else {
					to_all[t.fed_destino]=1;
					if (!(t.fed_destino in diff_all)){
						diff_all[t.fed_destino]=1;
					}
				}
				
				if (t.fed_origen in from_all){
					from_all[t.fed_origen]+=1;
					diff_all[t.fed_origen]-=1;
				} else {
					from_all[t.fed_origen]=1;
					if (!(t.fed_origen in diff_all)){
						diff_all[t.fed_origen]=-1;
					}
				}
				
				
				
				if (t.fed_origen=='CUB') {
					ncub +=1;
					total_cuba +=1;
					if (t.fed_destino in from_cuba){
						from_cuba[t.fed_destino]+=1;	
					} else {
						from_cuba[t.fed_destino]=1;	
					}
				}	
			}
			cub.push(ncub);
		}
		
		function order(a, b){
			return b[1] - a[1]
		}
		
		var keys = Object.keys(to_all);
		for(var k in keys){
			ato_all.push([keys[k],to_all[keys[k]]]);	
		}
		ato_all.sort(order);
		keys = Object.keys(from_all);
		for(var k in keys){
			afrom_all.push([keys[k],from_all[keys[k]]]);	
		}
		afrom_all.sort(order);
		keys = Object.keys(diff_all);
		for(var k in keys){
			adiff_all.push([keys[k],diff_all[keys[k]]]);	
		}
		adiff_all.sort(order);
		
		keys = Object.keys(pair_all);
		for(var k in keys){
			apair_all.push([keys[k],pair_all[keys[k]]]);	
		}
		apair_all.sort(order);
		
		var ptext
		for(var i=0;i<10;i++){
			var p = apair_all[i][0].split('-');
			ptext+='<tr><td>'+(i+1)+'</td><td><img class="flag-mini" src="../../assets/images/flags-mini/'+countries[p[0]].dominio+'.png"> '+countries[p[0]].pais+'</td><td><img class="flag-mini" src="../../assets/images/flags-mini/'+countries[p[1]].dominio+'.png"> '+countries[p[1]].pais+'</td><td>'+apair_all[i][1]+'</td></tr>'	
		}
		$('#pair-body').html(ptext);	
		
		keys = Object.keys(from_cuba);
		for(var k in keys){
			afrom_cuba.push([keys[k],from_cuba[keys[k]]]);	
		}
		afrom_cuba.sort(order);
		
		var ctext
		for(var i=0;i<afrom_cuba.length;i++){
			ctext+='<tr><td>'+(i+1)+'</td><td><img class="flag-mini" src="../../assets/images/flags-mini/'+countries[afrom_cuba[i][0]].dominio+'.png"> '+countries[afrom_cuba[i][0]].pais+'</td><td>'+afrom_cuba[i][1]+'</td></tr>'	
		}
		$('#cuba-body').html(ctext);	
		
		
		
		function set_change_table(type){
			var name = null;
			var text ='';
			if (type=='lose-table'){
				name = "Total de pérdidas";	
				for(var i=0;i<10;i++){
					text+='<tr><td>'+(i+1)+'</td><td><img class="flag-mini" src="../../assets/images/flags-mini/'+countries[afrom_all[i][0]].dominio+'.png"> '+countries[afrom_all[i][0]].pais+'</td><td>'+afrom_all[i][1]+'</td></tr>'	
				}
				
			}
			if (type=='wins-table'){
				name = "Total de adquisiciones";	
				for(var i=0;i<10;i++){
					text+='<tr><td>'+(i+1)+'</td><td><img class="flag-mini" src="../../assets/images/flags-mini/'+countries[ato_all[i][0]].dominio+'.png"> '+countries[ato_all[i][0]].pais+'</td><td>'+ato_all[i][1]+'</td></tr>'	
				}
			}
			if (type=='negative-table'){
				name = "Adquisiciones menos pérdidas";
				var i=0;
				var j=0;	
				while(j<10){
					if (adiff_all[adiff_all.length-1-i][0]!='FID'){
						console.log(adiff_all[adiff_all.length-1-i][0]);
						text+='<tr><td>'+(j+1)+'</td><td><img class="flag-mini" src="../../assets/images/flags-mini/'+countries[adiff_all[adiff_all.length-1-i][0]].dominio+'.png"> '+countries[adiff_all[adiff_all.length-1-i][0]].pais+'</td><td>'+(-1)*adiff_all[adiff_all.length-1-i][1]+'</td></tr>';
						j++;
					}
					i++;
				}
			}
			if (type=='positive-table'){
				name = "Adquisiciones menos pérdidas";	
				for(var i=0;i<10;i++){
					text+='<tr><td>'+(i+1)+'</td><td><img class="flag-mini" src="../../assets/images/flags-mini/'+countries[adiff_all[i][0]].dominio+'.png"> '+countries[adiff_all[i][0]].pais+'</td><td>'+adiff_all[i][1]+'</td></tr>'	
				}
			}
			$('#change-text').html(name);	
			$('#change-body').html(text);	
		}
		set_change_table('lose-table');
		
		$('#select-top').on('change',function(e){
			var val = $('#select-top').val();
			set_change_table(val);
		});
		
		
		
		c3.generate({
			bindto: "#transfer-evols",
			data: {
				x: years[0],
				columns: [
					years,
					all,
					cub
				],
				type: 'line',
				colors: {
					'Casos en el día': '#B01E22',
					'Altas en el día': '#00AEEF'
				}
			},
			axis: {
				x: {
					label: 'Año',
					type: 'categorical',
					show: true
				},
				y: {
					label: 'Número de transferencias',
					position: 'outer-middle',
				}
			}
		});
		
		$('#countries').on('change',function(e){
			var c = $('#countries').val();
			var complete_to = true;
			if (c!='none') {
				$('#country-name').html(countries[c].pais);
				$('#country-base').html(countries[c].pais);
				$('#country-flag').html('<img class="flag-mini" src="../../assets/images/flags-mini/'+countries[c].dominio+'.png">');
				
				var ttype = '';
				
				if (c in from_all){
					ttype += '<option value="from">desde</option>';
					$('#more-trans-country').html(countries[c].pais);
					var fromtotal = from_all[c];
					if (fromtotal==1){
						$('#more-trans-num').html('1 transferencia');
					} else {
						$('#more-trans-num').html(fromtotal+' transferencias');
					}
					var tocountries = to_countries[c].length;
					if (tocountries==1) {
						$('#more-trans-countries').html('1 país')
					} else {
						$('#more-trans-countries').html(tocountries+' países');
					}
					
					
					var clist = "";
					for(var l in to_countries[c]) {
						clist += '<option value="'+to_countries[c][l]+'">'+countries[to_countries[c][l]].pais+'</option>';	
					}
					complete_to = false;
					$('#trans-countries-action').html(clist);
					
					$('#more-trans').show();
					
				} else {
					$('#more-trans').hide();	
				}
				
				if (c in to_all){
					ttype += '<option value="to">hacia</option>';
					$('#less-trans-country').html(countries[c].pais);
					var tototal = to_all[c];
					if (tototal==1){
						$('#less-trans-num').html('1 transferencia');
					} else {
						$('#less-trans-num').html(tototal+' transferencias');
					}
					var fromcountries = from_countries[c].length;
					if (fromcountries==1) {
						$('#less-trans-countries').html('1 país')
					} else {
						$('#less-trans-countries').html(fromcountries+' países');
					}
					
					if (complete_to){
						clist = "";
						for(var l in from_countries[c]) {
							clist += '<option value="'+from_countries[c][l]+'">'+countries[from_countries[c][l]].pais+'</option>';	
						}
						$('#trans-countries-action').html(clist);	
					}
					
					$('#less-trans').show();
				} else {
					$('#less-trans').hide();	
				}
				
				
				$('#country-info-block').show();
			} else {
				$('#country-info-block').hide();
			}
			
			$('#trans-type').html(ttype);
			set_transfers();
		});
		
		function set_transfers(){
			var atype = $('#trans-type').val();
			var p1 = $('#countries').val();
			var p2 = $('#trans-countries-action').val();
			if (atype=='to'){
				var temp = p1;
				p1 = p2;
				p2 = temp;
			}
			var rows = '';
			for(var i=2000;i<=2020;i++){
				for(var j in trans.transferencias[i]) {
					var t = trans.transferencias[i][j];
					if ((t.fed_origen==p1)&&(t.fed_destino==p2)){
						var player = trans.jugadores[t.id];	
						rows +='<tr><td><a href="'+player.perfil+'">'+player.nombre+'<a></td><td>'+t.fecha.split('-')[0]+'</td><td class="right"><img class="flag-mini" alt="'+countries[t.fed_origen].pais+'" title="'+countries[t.fed_origen].pais+'" src="../../assets/images/flags-mini/'+countries[t.fed_origen].dominio+'.png"> <i class="fa fa-arrow-right" style="vertical-align:super;"></i> <img class="flag-mini" alt="'+countries[t.fed_origen].pais+'" title="'+countries[t.fed_origen].pais+'" src="../../assets/images/flags-mini/'+countries[t.fed_destino].dominio+'.png"></td></tr>';
					}
				}
			}
			$('#players').html(rows);
		}
		
		$('#trans-type').on('change',function(e){
			var atype = $('#trans-type').val();
			var c = $('#countries').val();
			var clist = '';
			if (atype=='from') {
				for(var l in to_countries[c]) {
					clist += '<option value="'+to_countries[c][l]+'">'+countries[to_countries[c][l]].pais+'</option>';	
				}
			} else {
				for(var l in from_countries[c]) {
					console.log(from_countries[c][l]);
					clist += '<option value="'+from_countries[c][l]+'">'+countries[from_countries[c][l]].pais+'</option>';	
				}
			}
			$('#trans-countries-action').html(clist);
			set_transfers();	
		});
		
		$('#trans-countries-action').on('change',function(e){
			set_transfers();	
		});
		
		
	});
	
	
	$.getJSON("data/olimpiadas.json",function(olimpic){
		var otext = '';
		for(var i=1990;i<=2018;i+=2){
			if (i!=1992){
				var stext = olimpic.olimpiadas[i].edicion+' Olimpiada, '+olimpic.olimpiadas[i].ciudad+', '+olimpic.olimpiadas[i].pais+' ('+i+')';
				otext+= '<option value="'+i+'">'+stext+'</option>';
			}
		}
		$('#olimpiad').html(otext);
		$('#olimpiad').on('change',function(e){
			var val = $('#olimpiad').val();
			set_team(val);
		});
		
		function set_team(year){
			var ol= olimpic.olimpiadas[year];
			$('#mplace').html(ol.hombres.lugar);
			$('#mpoint').html(ol.hombres.puntos);
			var ttext = '';
			for(var i in ol.hombres.equipo){
				var id = ol.hombres.equipo[i];
				ttext += '<tr><td><span class="chess-title">'+olimpic.cubanos[id].titulo+'</span></td><td><a href="'+olimpic.cubanos[id].perfil+'">'+olimpic.cubanos[id].nombre+'</a></td><td class="center"><img class="flag-mini" title="'+countries[olimpic.cubanos[id].federacion].pais+'" alt="'+countries[olimpic.cubanos[id].federacion].pais+'" src="../../assets/images/flags-mini/'+countries[olimpic.cubanos[id].federacion].dominio+'.png"></td></tr>';	
			}
			$('#male-body').html(ttext);	
			
			$('#fplace').html(ol.mujeres.lugar);
			$('#fpoint').html(ol.mujeres.puntos);
			ttext = '';
			for(var i in ol.mujeres.equipo){
				var id = ol.mujeres.equipo[i];
				ttext += '<tr><td><span class="chess-title">'+olimpic.cubanos[id].titulo+'</span></td><td><a href="'+olimpic.cubanos[id].perfil+'">'+olimpic.cubanos[id].nombre+'</a></td><td class="center"><img class="flag-mini" title="'+countries[olimpic.cubanos[id].federacion].pais+'" alt="'+countries[olimpic.cubanos[id].federacion].pais+'" src="../../assets/images/flags-mini/'+countries[olimpic.cubanos[id].federacion].dominio+'.png"></td></tr>';	
			}
			$('#female-body').html(ttext);	
		}
		
		set_team(1990);
		
		
		
		
	});
	

}) 
