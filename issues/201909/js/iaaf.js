eds = [1983,1987,1991,1993,1995,1997,1999,2001,2003,2005,2007,2009,2011,2013,2015,2017];
val = ['100v','110v'];
mul = ['heptatlon','decatlon'];
exe = [].concat(val).concat(mul);
pruebas = ["pruebas múltiples","vallas cortas"];

$('#block-select').on('change',function(e){
	var val = $('#block-select').val();
	$('.blockg').hide();
	$('#'+val).show();
});



$.getJSON("data/iaaf.json",function(data){
	
	_lines = []
	for(var l in eds){
		_lines.push({'value':eds[l],'text':data.mundiales[eds[l]].edicion+' - '+data.mundiales[eds[l]].ciudad});
	}
	
	function getPoints(year,sex){
		resultados = data.mundiales[year].resultados;
		total = 0;
		for(var person in resultados.individual){
			if ((data.atletas[person].sexo==sex)||(sex==null)){
				for(var res in resultados.individual[person]){
					total+=9-resultados.individual[person][res].lugar;
				}	
			}
		}
		if ('colectivo' in resultados) {
			for(var cres in resultados.colectivo){
				if ((resultados.colectivo[cres].sexo==sex)||(sex==null)){
					total+=9-resultados.colectivo[cres].lugar;	
				}
			}
		}
		return total
	}
	
	function getMedals(year,sex){
		resultados = data.mundiales[year].resultados;
		total = 0;
		for(var person in resultados.individual){
			if ((data.atletas[person].sexo==sex)||(sex==null)){
				for(var res in resultados.individual[person]){
					if (resultados.individual[person][res].lugar<=3) {total++;} 
				}	
			}
		}
		if ('colectivo' in resultados) {
			for(var cres in resultados.colectivo){
				if ((resultados.colectivo[cres].sexo==sex)||(sex==null)){
					if (resultados.colectivo[cres].lugar<=3) {total++;}	
				}
			}
		}
		return total
	}
	
	function getPlaceCount(year,sex,place){
		resultados = data.mundiales[year].resultados;
		total = 0;
		for(var person in resultados.individual){
			if ((data.atletas[person].sexo==sex)||(sex==null)){
				for(var res in resultados.individual[person]){
					if (resultados.individual[person][res].lugar==place) {total++;} 
				}	
			}
		}
		if ('colectivo' in resultados) {
			for(var cres in resultados.colectivo){
				if ((resultados.colectivo[cres].sexo==sex)||(sex==null)){
					if (resultados.colectivo[cres].lugar==place) {total++;}	
				}
			}
		}
		return total
	}
	
	function getPosArray(type){
		 pos = [];
		 for(var p in data.mundiales){
			pos.push(data.mundiales[p][type]) 
		 }
		 return pos	
	}
	
	function generatePositionsGraph(){
			
			var chartp = c3.generate({
			bindto: '#posiciones-graph',
			data: {
			x: 'Años',
			columns: [
				['Años'].concat(eds),
				["Posición por puntos"].concat(getPosArray('lugar-puntos')),
				["Posición por medallas"].concat(getPosArray('lugar-medallas')),
			],
			colors: {
				"Posición por puntos": 'green',
				"Posición por medallas": 'brown',
			},
			type: "line"
			}
			,
			grid: {
				  x: {
				    lines: _lines
				  }
			},
			axis: {
			x: {
			label: 'Años',
			min: 1981,
			max: 2019
			},
			y: {
			label: 'Posición',
			position: 'outer-middle',
			}
			},
					
		});
	}
	
	function generatePointsEvolGraph(){
			var muj = ["Mujeres"];
			var hom = ["Hombres"];
			for(var i in eds){
				muj.push(getPoints(eds[i],'femenino'));
				hom.push(getPoints(eds[i],'masculino'));	
			}
			var chartp = c3.generate({
			bindto: '#puntos-graph',
			data: {
			x: 'Años',
			columns: [
				['Años'].concat(eds),
				muj,
				hom,
			],
			type: 'area-spline',
			groups: [
	            ['Mujeres', 'Hombres']
	          ],
			colors: {
				 'Mujeres': '#EE48A3',
                'Hombres': '#298CEE',
			}
			},
				axis: {
			x: {
			label: 'Años',
			},
			y: {
			label: 'Puntos',
			position: 'outer-middle',
			}
			},
					
		});
	}
	
	function generateMedalsEvolGraph(){
			var muj = ["Mujeres"];
			var hom = ["Hombres"];
			for(var i in eds){
				muj.push(getMedals(eds[i],'femenino'));
				hom.push(getMedals(eds[i],'masculino'));	
			}
			var chartp = c3.generate({
			bindto: '#medallas-graph',
			data: {
			x: 'Años',
			columns: [
				['Años'].concat(eds),
				muj,
				hom,
			],
			type: 'area-spline',
			groups: [
	            ['Mujeres', 'Hombres']
	          ],
			colors: {
				 'Mujeres': '#EE48A3',
                'Hombres': '#298CEE',
			}
			},
				axis: {
			x: {
			label: 'Años',
			
			},
			y: {
			label: 'Total de medallas',
			position: 'outer-middle',
			}
			},
					
		});
	}
	
	function getTotalPoints(sex){
		total = 0;
		for(var i in eds){
			total += getPoints(eds[i],sex);	
		}
		return total; 	
	}
	
	function getTotalMedals(sex){
		total = 0;
		for(var i in eds){
			total += getMedals(eds[i],sex);	
		}
		return total; 		
	}
	
	function getTotalPlace(sex,place){
		total = 0;
		for(var i in eds){
			total += getPlaceCount(eds[i],sex,place);	
		}
		return total; 		
	}
	
	function generateMedalsPieGraph(){
			var muj = ["Mujeres",getTotalMedals('femenino')];
			var hom = ["Hombres",getTotalMedals('masculino')];
			var chartp = c3.generate({
			bindto: '#medallas-pie-graph',
			data: {
			columns: [
				hom,
				muj,
			],
			type: 'donut',
			colors: {
				 'Mujeres': '#EE48A3',
                'Hombres': '#298CEE',
			}
			},
			donut: {
				title: (getTotalMedals('femenino')+getTotalMedals('masculino'))+" medallas"	
			}	
		});
	}
	
	function generatePointsPieGraph(){
			var muj = ["Mujeres",getTotalPoints('femenino')];
			var hom = ["Hombres",getTotalPoints('masculino')];
			var chartp = c3.generate({
			bindto: '#puntos-pie-graph',
			data: {
			columns: [
				hom,
				muj,
			],
			type: 'donut',
			colors: {
				 'Mujeres': '#EE48A3',
                'Hombres': '#298CEE',
			}
			}
			,
			donut: {
				title: (getTotalPoints('femenino')+getTotalPoints('masculino'))+" puntos"	
			}
		});
	}
	
	function generateGoldsPieGraph(){
			var muj = ["Mujeres",getTotalPlace('femenino',1)];
			var hom = ["Hombres",getTotalPlace('masculino',1)];
			var chartp = c3.generate({
			bindto: '#titulos-pie-graph',
			data: {
			columns: [
				hom,
				muj,
			],
			type: 'donut',
			colors: {
				 'Mujeres': '#EE48A3',
                'Hombres': '#298CEE',
			}
			}
			,
			donut: {
				title: (getTotalPlace('femenino',1)+getTotalPlace('masculino',1))+" títulos"	
			}
		});
	}
	
	
	function getPointsByEventYear(year,event,sex){
		total = 0;
		
		resultados = data.mundiales[year].resultados;
		for(var person in resultados.individual){
			if ((data.atletas[person].sexo==sex)||(sex==null)){
				for(var res in resultados.individual[person]){
					if (resultados.individual[person][res].especialidad==event) {
						total+=9-resultados.individual[person][res].lugar;	
					}
				}	
			}
		}
		if ('colectivo' in resultados) {
			for(var cres in resultados.colectivo){
				if ((resultados.colectivo[cres].sexo==sex)||(sex==null)){
					if (resultados.colectivo[cres].especialidad==event) {
						total+=9-resultados.colectivo[cres].lugar;	
					}
				}
			}
		}
		return total;
	}
	
	function getMedalsByEventYear(year,event,sex){
		total = 0;		
		resultados = data.mundiales[year].resultados;
		for(var person in resultados.individual){
			if ((data.atletas[person].sexo==sex)||(sex==null)){
				for(var res in resultados.individual[person]){
					if (resultados.individual[person][res].especialidad==event) {
						if (resultados.individual[person][res].lugar<=3){total++;}	
					}
				}	
			}
		}
		if ('colectivo' in resultados) {
			for(var cres in resultados.colectivo){
				if ((resultados.colectivo[cres].sexo==sex)||(sex==null)){
					if (resultados.colectivo[cres].especialidad==event) {
						if(resultados.colectivo[cres].lugar<=3){total++;}	
					}
				}
			}
		}
		return total;
	}
	
	function getGoldsByEventYear(year,event,sex){
		total = 0;		
		resultados = data.mundiales[year].resultados;
		for(var person in resultados.individual){
			if ((data.atletas[person].sexo==sex)||(sex==null)){
				for(var res in resultados.individual[person]){
					if (resultados.individual[person][res].especialidad==event) {
						if (resultados.individual[person][res].lugar==1){total++;}	
					}
				}	
			}
		}
		if ('colectivo' in resultados) {
			for(var cres in resultados.colectivo){
				if ((resultados.colectivo[cres].sexo==sex)||(sex==null)){
					if (resultados.colectivo[cres].especialidad==event) {
						if(resultados.colectivo[cres].lugar==1){total++;}	
					}
				}
			}
		}
		return total;
	}
	
	function getPointsByEvent(event,sex){
		total = 0;
		for(var i in eds){
			resultados = data.mundiales[eds[i]].resultados;
			for(var person in resultados.individual){
				if ((data.atletas[person].sexo==sex)||(sex==null)){
					for(var res in resultados.individual[person]){
						if (resultados.individual[person][res].especialidad==event) {
							total+=9-resultados.individual[person][res].lugar;	
						}
					}	
				}
			}
			if ('colectivo' in resultados) {
				for(var cres in resultados.colectivo){
					if ((resultados.colectivo[cres].sexo==sex)||(sex==null)){
						if (resultados.colectivo[cres].especialidad==event) {
							total+=9-resultados.colectivo[cres].lugar;	
						}
					}
				}
			}
	    }
		
		return total;
			
	}
	
	function getMedalsByEvent(event,sex){
		total = 0;
		for(var i in eds){
			resultados = data.mundiales[eds[i]].resultados;
			for(var person in resultados.individual){
				if ((data.atletas[person].sexo==sex)||(sex==null)){
					for(var res in resultados.individual[person]){
						if (resultados.individual[person][res].especialidad==event) {
							if (resultados.individual[person][res].lugar<=3){total++;}	
						}
					}	
				}
			}
			if ('colectivo' in resultados) {
				for(var cres in resultados.colectivo){
					if ((resultados.colectivo[cres].sexo==sex)||(sex==null)){
						if (resultados.colectivo[cres].especialidad==event) {
							if (resultados.colectivo[cres].lugar<=3){total++;}	
						}
					}
				}
			}
	    }
		
		return total;
			
	}
	
	function getPlaceByEvent(event,sex,place){
		total = 0;
		for(var i in eds){
			resultados = data.mundiales[eds[i]].resultados;
			for(var person in resultados.individual){
				if ((data.atletas[person].sexo==sex)||(sex==null)){
					for(var res in resultados.individual[person]){
						if (resultados.individual[person][res].especialidad==event) {
							if (resultados.individual[person][res].lugar==place){total++;}	
						}
					}	
				}
			}
			if ('colectivo' in resultados) {
				for(var cres in resultados.colectivo){
					if ((resultados.colectivo[cres].sexo==sex)||(sex==null)){
						if (resultados.colectivo[cres].especialidad==event) {
							if (resultados.colectivo[cres].lugar==place){total++;}	
						}
					}
				}
			}
	    }
		
		return total;
			
	}
	
	 function compare_ar(p1,p2){
		var s1 = p1[1]+p1[2];
		var s2 = p2[1]+p2[2]; 
        if (s1 < s2)
            return 11;
        if (s1 > s2)
            return -1;
        return 0;
    }
	
	function getEventsPoints(){
		ev = [];
		for(var e in data.especialidades){
			if (exe.indexOf(e)==-1) {
				ev.push([e,getPointsByEvent(e,"femenino"),getPointsByEvent(e,"masculino")]);
			}	
		}
		ev.push( ['vallas cortas',getPointsByEvent('100v',"femenino"),getPointsByEvent('110v',"masculino")]);
		ev.push(['pruebas múltiples',getPointsByEvent('heptatlon',"femenino"),getPointsByEvent('decatlon',"masculino")]);
		ev.sort(compare_ar);
		return ev;
	}
	
	function getEventsMedals(){
		ev = [];
		for(var e in data.especialidades){
			if (exe.indexOf(e)==-1) {
				ev.push([e,getMedalsByEvent(e,"femenino"),getMedalsByEvent(e,"masculino")]);
			}	
		}
		ev.push( ['vallas cortas',getMedalsByEvent('100v',"femenino"),getMedalsByEvent('110v',"masculino")]);
		ev.push(['pruebas múltiples',getMedalsByEvent('heptatlon',"femenino"),getMedalsByEvent('decatlon',"masculino")]);
		ev.sort(compare_ar);
		return ev;
	}
	
	function getEventsGolds(){
		ev = [];
		for(var e in data.especialidades){
			if (exe.indexOf(e)==-1) {
				ev.push([e,getPlaceByEvent(e,"femenino",1),getPlaceByEvent(e,"masculino",1)]);
			}	
		}
		ev.push( ['vallas cortas',getPlaceByEvent('100v',"femenino",1),getPlaceByEvent('110v',"masculino",1)]);
		ev.push(['pruebas múltiples',getPlaceByEvent('heptatlon',"femenino",1),getPlaceByEvent('decatlon',"masculino",1)]);
		ev.sort(compare_ar);
		return ev;
	}
	
	function generatePointsBar(){
		var eve = ['Eventos'];
		var muj = ['Mujeres'];
		var hom = ['Hombres'];
		var evp = getEventsPoints();
		for(var i in evp){
			eve.push(evp[i][0]);
			muj.push(evp[i][1]);
			hom.push(evp[i][2]);
		}
		var chart = c3.generate({
        bindto: '#eventos-puntos-bar',
        data: {
          x : 'Eventos',
          columns: [
            eve,
            hom,
            muj,
          ],
          colors: {
                'Mujeres': '#EE48A3',
                'Hombres': '#298CEE',
            },
          type: 'bar',
          groups : [['Hombres','Mujeres']],
        },
        axis: {
          x: {
            type: 'categorized',
            label: 'Eventos'
          },
          y: {
            label: 'Total de Puntos',
            position: 'outer-middle',
          },
          rotated: true
        }, 
        bar: {
          width: {
            ratio: 0.65,
            max: 30
          },
        }
      }); 
	};
	
	function generateMedalsBar(){
		var eve = ['Eventos'];
		var muj = ['Mujeres'];
		var hom = ['Hombres'];
		var evp = getEventsMedals();
		for(var i in evp){
			eve.push(evp[i][0]);
			muj.push(evp[i][1]);
			hom.push(evp[i][2]);
		}
		var chart = c3.generate({
        bindto: '#eventos-medallas-bar',
        data: {
          x : 'Eventos',
          columns: [
            eve,
            hom,
            muj,
          ],
          colors: {
                'Mujeres': '#EE48A3',
                'Hombres': '#298CEE',
            },
          type: 'bar',
          groups : [['Hombres','Mujeres']],
        },
        axis: {
          x: {
            type: 'categorized',
            label: 'Eventos'
          },
          y: {
            label: 'Total de Medallas',
            position: 'outer-middle',
          },
          rotated: true
        }, 
        bar: {
          width: {
            ratio: 0.65,
            max: 30
          },
        }
      }); 
	};
	
	function generateGoldsBar(){
		var eve = ['Eventos'];
		var muj = ['Mujeres'];
		var hom = ['Hombres'];
		var evp = getEventsGolds();
		for(var i in evp){
			eve.push(evp[i][0]);
			muj.push(evp[i][1]);
			hom.push(evp[i][2]);
		}
		var chart = c3.generate({
        bindto: '#eventos-titulos-bar',
        data: {
          x : 'Eventos',
          columns: [
            eve,
            hom,
            muj,
          ],
          colors: {
                'Mujeres': '#EE48A3',
                'Hombres': '#298CEE',
            },
          type: 'bar',
          groups : [['Hombres','Mujeres']],
        },
        axis: {
          x: {
            type: 'categorized',
            label: 'Eventos'
          },
          y: {
            label: 'Total de títulos',
            position: 'outer-middle',
          },
          rotated: true
        }, 
        bar: {
          width: {
            ratio: 0.65,
            max: 30
          },
        }
      }); 
	};
	
	function generatePointsScatterAll(){
		var events = ["Eventos"];
		for(var e in data.especialidades){
			if (exe.indexOf(e)==-1) {
				events.push(e);
			}	
		}
		events.push('vallas cortas');
		events.push('pruebas múltiples');
		
		evs = [];
		for(var i=1;i<17;i++){
			var e = [eds[i-1]];
			for(var j=1;j<18;j++){
				var mv = 0;
				var hv = 0;
				if (events[j]=="vallas cortas") {
					mv = getPointsByEventYear(eds[i-1],"100v",'femenino');
					hv = getPointsByEventYear(eds[i-1],"110v",'masculino');	
				}
				else if (events[j]=="pruebas múltiples") {
					mv = getPointsByEventYear(eds[i-1],"heptatlon",'femenino');
					hv = getPointsByEventYear(eds[i-1],"decatlon",'masculino');		
				}
				else {
					mv = getPointsByEventYear(eds[i-1],events[j],'femenino');
					hv = getPointsByEventYear(eds[i-1],events[j],'masculino');
				}
				if ((mv+hv)!=0){
					e.push(eds[i-1]);	
				} else {e.push(null);}
			}
			evs.push(e);	
		}
		
		
		evs.push(events);
		//return evs;
		
		var lns = [];
		for(var t in events){
			if(t!=0){
				lns.push({'value':events[t]});
			}	
		}
		var chartp = c3.generate({
			bindto: '#eventos-puntos-scatter',
			data: {
				x: "Eventos",
		        columns: evs,
				type: "scatter"
			},
			axis: {
				x: {
				label: 'Eventos',
				type: 'categorical',
				tick: {
						centered: true
					
					}
				
				},
				y: {
				label: 'Mundiales',
				position: 'outer-middle',
				},
				rotated: true
			},
			 point: {
					  r: function(d){
							return 5;
						  },
						  
					focus: {
					    expand: {
					      r: 6
					    }
					  }
				},
				grid: {
					  x: {
					    lines: lns
					  }
				},
				legend: {
			  show: false
			},
			tooltip: {
				
		        format: {
		            value: function (value, ratio, id, index) {
		                var et = events[index+1];
		                var pf = 0;
		                var pm = 0;
		                if (et=="vallas cortas") {
							pf = getPointsByEventYear(value,"100v",'femenino');
			                pm = getPointsByEventYear(value,"110v",'masculino');
						} else if (et=="pruebas múltiples") {
							pf = getPointsByEventYear(value,"heptatlon",'femenino');
			                pm = getPointsByEventYear(value,"decatlon",'masculino');	
						}
		                else {
			                pf = getPointsByEventYear(value,et,'femenino');
			                pm = getPointsByEventYear(value,et,'masculino');
		                }
		                ps = pf + pm;
		                var points = 'puntos';
		                if (ps ==1 ) {points = 'punto'}
		                return ps+' '+points+' ('+pf+' femenino, '+pm+' masculino)';
		            }, 
		         }
       
		    }	
		});	
	}
	
	function generatePointsScatterFem(){
		var events = ["Eventos"];
		for(var e in data.especialidades){
			if (exe.indexOf(e)==-1) {
				events.push(e);
			}	
		}
		events.push('vallas cortas');
		events.push('pruebas múltiples');
		
		evs = [];
		for(var i=1;i<17;i++){
			var e = [eds[i-1]];
			for(var j=1;j<18;j++){
				var mv = 0;
				var hv = 0;
				if (events[j]=="vallas cortas") {
					mv = getPointsByEventYear(eds[i-1],"100v",'femenino');
				}
				else if (events[j]=="pruebas múltiples") {
					mv = getPointsByEventYear(eds[i-1],"heptatlon",'femenino');		
				}
				else {
					mv = getPointsByEventYear(eds[i-1],events[j],'femenino');
				}
				if (mv!=0){
					e.push(eds[i-1]);	
				} else {e.push(null);}
			}
			evs.push(e);	
		}
		
		
		evs.push(events);
		
		var lns = [];
		for(var t in events){
			if(t!=0){
				lns.push({'value':events[t]});
			}	
		}
		var chartp = c3.generate({
			bindto: '#eventos-puntos-scatter-fem',
			data: {
				x: "Eventos",
		        columns: evs,
				type: "scatter"
			},
			axis: {
				x: {
				label: 'Eventos',
				type: 'categorical',
				tick: {
						centered: true
				},
				},
				y: {
				label: 'Mundiales',
				position: 'outer-middle',
				},
				rotated: true
			},
			legend: {
			  show: false
			},
			 point: {
					  r: function(d){
							return 5;
						  },
						  
					focus: {
					    expand: {
					      r: 6
					    }
					  }
				},
				grid: {
					  x: {
					    lines: lns
					  }
				},
			tooltip: {
				
		        format: {
		            value: function (value, ratio, id, index) {
		                var et = events[index+1];
		                var pf = 0;
		                var pm = 0;
		                if (et=="vallas cortas") {
							pf = getPointsByEventYear(value,"100v",'femenino');
						} else if (et=="pruebas múltiples") {
							pf = getPointsByEventYear(value,"heptatlon",'femenino');
						}
		                else {
			                pf = getPointsByEventYear(value,et,'femenino');
		                }
		                ps = pf;
		                var points = 'puntos';
		                if (ps ==1 ) {points = 'punto'}
		                return ps+' '+points;
		            }, 
		         }
       
		    }	
		});
	}
	
	function generatePointsScatterMas(){
		var events = ["Eventos"];
		for(var e in data.especialidades){
			if (exe.indexOf(e)==-1) {
				events.push(e);
			}	
		}
		events.push('vallas cortas');
		events.push('pruebas múltiples');
		
		evs = [];
		for(var i=1;i<17;i++){
			var e = [eds[i-1]];
			for(var j=1;j<18;j++){
				var mv = 0;
				var hv = 0;
				if (events[j]=="vallas cortas") {
					mv = getPointsByEventYear(eds[i-1],"110v",'masculino');
				}
				else if (events[j]=="pruebas múltiples") {
					mv = getPointsByEventYear(eds[i-1],"decatlon",'masculino');		
				}
				else {
					mv = getPointsByEventYear(eds[i-1],events[j],'masculino');
				}
				if (mv!=0){
					e.push(eds[i-1]);	
				} else {e.push(null);}
			}
			evs.push(e);	
		}
		
		
		evs.push(events);
		
		var lns = [];
		for(var t in events){
			if(t!=0){
				lns.push({'value':events[t]});
			}	
		}
		var chartp = c3.generate({
			bindto: '#eventos-puntos-scatter-mas',
			data: {
				x: "Eventos",
		        columns: evs,
				type: "scatter"
			},
			axis: {
				x: {
				label: 'Eventos',
				type: 'categorical',
				tick: {
						centered: true
				},
				},
				y: {
				label: 'Mundiales',
				position: 'outer-middle',
				},
				rotated: true
			},
			legend: {
			  show: false
			},
			 point: {
					  r: function(d){
							return 5;
						  },
						  
					focus: {
					    expand: {
					      r: 6
					    }
					  }
				},
				grid: {
					  x: {
					    lines: lns
					  }
				},
			tooltip: {
				
		        format: {
		            value: function (value, ratio, id, index) {
		                var et = events[index+1];
		                var pf = 0;
		                var pm = 0;
		                if (et=="vallas cortas") {
							pf = getPointsByEventYear(value,"100v",'femenino');
						} else if (et=="pruebas múltiples") {
							pf = getPointsByEventYear(value,"heptatlon",'femenino');
						}
		                else {
			                pf = getPointsByEventYear(value,et,'femenino');
		                }
		                ps = pf;
		                var points = 'puntos';
		                if (ps ==1 ) {points = 'punto'}
		                return ps+' '+points;
		            }, 
		         }
       
		    }	
		});	
	}
	
	
	function generateMedalsScatterAll(){
		var events = ["Eventos"];
		for(var e in data.especialidades){
			if (exe.indexOf(e)==-1) {
				events.push(e);
			}	
		}
		events.push('vallas cortas');
		events.push('pruebas múltiples');
		
		evs = [];
		for(var i=1;i<17;i++){
			var e = [eds[i-1]];
			for(var j=1;j<18;j++){
				var mv = 0;
				var hv = 0;
				if (events[j]=="vallas cortas") {
					mv = getMedalsByEventYear(eds[i-1],"100v",'femenino');
					hv = getMedalsByEventYear(eds[i-1],"110v",'masculino');	
				}
				else if (events[j]=="pruebas múltiples") {
					mv = getMedalsByEventYear(eds[i-1],"heptatlon",'femenino');
					hv = getMedalsByEventYear(eds[i-1],"decatlon",'masculino');		
				}
				else {
					mv = getMedalsByEventYear(eds[i-1],events[j],'femenino');
					hv = getMedalsByEventYear(eds[i-1],events[j],'masculino');
				}
				if ((mv+hv)!=0){
					e.push(eds[i-1]);	
				} else {e.push(null);}
			}
			evs.push(e);	
		}
		
		
		evs.push(events);
		//return evs;
		
		var lns = [];
		for(var t in events){
			if(t!=0){
				lns.push({'value':events[t]});
			}	
		}
		var chartp = c3.generate({
			bindto: '#eventos-medallas-scatter',
			data: {
				x: "Eventos",
		        columns: evs,
				type: "scatter"
			},
			axis: {
				x: {
				label: 'Eventos',
				type: 'categorical',
				tick: {
						centered: true
					
					}
				
				},
				y: {
				label: 'Mundiales',
				position: 'outer-middle',
				},
				rotated: true
			},
			 point: {
					  r: function(d){
							return 5;
						  },
						  
					focus: {
					    expand: {
					      r: 6
					    }
					  }
				},
				grid: {
					  x: {
					    lines: lns
					  }
				},
				legend: {
			  show: false
			},
			tooltip: {
				
		        format: {
		            value: function (value, ratio, id, index) {
		                var et = events[index+1];
		                var pf = 0;
		                var pm = 0;
		                if (et=="vallas cortas") {
							pf = getMedalsByEventYear(value,"100v",'femenino');
			                pm = getMedalsByEventYear(value,"110v",'masculino');
						} else if (et=="pruebas múltiples") {
							pf = getMedalsByEventYear(value,"heptatlon",'femenino');
			                pm = getMedalsByEventYear(value,"decatlon",'masculino');	
						}
		                else {
			                pf = getMedalsByEventYear(value,et,'femenino');
			                pm = getMedalsByEventYear(value,et,'masculino');
		                }
		                ps = pf + pm;
		                var points = 'medallas';
		                if (ps ==1 ) {points = 'medalla'}
		                return ps+' '+points+' ('+pf+' femenino, '+pm+' masculino)';
		            }, 
		         }
       
		    }	
		});	
	}
	
	function generateMedalsScatterFem(){
		var events = ["Eventos"];
		for(var e in data.especialidades){
			if (exe.indexOf(e)==-1) {
				events.push(e);
			}	
		}
		events.push('vallas cortas');
		events.push('pruebas múltiples');
		
		evs = [];
		for(var i=1;i<17;i++){
			var e = [eds[i-1]];
			for(var j=1;j<18;j++){
				var mv = 0;
				var hv = 0;
				if (events[j]=="vallas cortas") {
					mv = getMedalsByEventYear(eds[i-1],"100v",'femenino');
				}
				else if (events[j]=="pruebas múltiples") {
					mv = getMedalsByEventYear(eds[i-1],"heptatlon",'femenino');		
				}
				else {
					mv = getMedalsByEventYear(eds[i-1],events[j],'femenino');
				}
				if (mv!=0){
					e.push(eds[i-1]);	
				} else {e.push(null);}
			}
			evs.push(e);	
		}
		
		
		evs.push(events);
		
		var lns = [];
		for(var t in events){
			if(t!=0){
				lns.push({'value':events[t]});
			}	
		}
		var chartp = c3.generate({
			bindto: '#eventos-medallas-scatter-fem',
			data: {
				x: "Eventos",
		        columns: evs,
				type: "scatter"
			},
			axis: {
				x: {
				label: 'Eventos',
				type: 'categorical',
				tick: {
						centered: true
				},
				},
				y: {
				label: 'Mundiales',
				position: 'outer-middle',
				},
				rotated: true
			},
			legend: {
			  show: false
			},
			 point: {
					  r: function(d){
							return 5;
						  },
						  
					focus: {
					    expand: {
					      r: 6
					    }
					  }
				},
				grid: {
					  x: {
					    lines: lns
					  }
				},
			tooltip: {
				
		        format: {
		            value: function (value, ratio, id, index) {
		                var et = events[index+1];
		                var pf = 0;
		                var pm = 0;
		                if (et=="vallas cortas") {
							pf = getMedalsByEventYear(value,"100v",'femenino');
						} else if (et=="pruebas múltiples") {
							pf = getMedalsByEventYear(value,"heptatlon",'femenino');
						}
		                else {
			                pf = getMedalsByEventYear(value,et,'femenino');
		                }
		                ps = pf;
		                var points = 'puntos';
		                if (ps ==1 ) {points = 'punto'}
		                return ps+' '+points;
		            }, 
		         }
       
		    }	
		});
	}
	
	function generateMedalsScatterMas(){
		var events = ["Eventos"];
		for(var e in data.especialidades){
			if (exe.indexOf(e)==-1) {
				events.push(e);
			}	
		}
		events.push('vallas cortas');
		events.push('pruebas múltiples');
		
		evs = [];
		for(var i=1;i<17;i++){
			var e = [eds[i-1]];
			for(var j=1;j<18;j++){
				var mv = 0;
				var hv = 0;
				if (events[j]=="vallas cortas") {
					mv = getMedalsByEventYear(eds[i-1],"110v",'masculino');
				}
				else if (events[j]=="pruebas múltiples") {
					mv = getMedalsByEventYear(eds[i-1],"decatlon",'masculino');		
				}
				else {
					mv = getMedalsByEventYear(eds[i-1],events[j],'masculino');
				}
				if (mv!=0){
					e.push(eds[i-1]);	
				} else {e.push(null);}
			}
			evs.push(e);	
		}
		
		
		evs.push(events);
		
		var lns = [];
		for(var t in events){
			if(t!=0){
				lns.push({'value':events[t]});
			}	
		}
		var chartp = c3.generate({
			bindto: '#eventos-medallas-scatter-mas',
			data: {
				x: "Eventos",
		        columns: evs,
				type: "scatter"
			},
			axis: {
				x: {
				label: 'Eventos',
				type: 'categorical',
				tick: {
						centered: true
				},
				},
				y: {
				label: 'Mundiales',
				position: 'outer-middle',
				},
				rotated: true
			},
			legend: {
			  show: false
			},
			 point: {
					  r: function(d){
							return 5;
						  },
						  
					focus: {
					    expand: {
					      r: 6
					    }
					  }
				},
				grid: {
					  x: {
					    lines: lns
					  }
				},
			tooltip: {
				
		        format: {
		            value: function (value, ratio, id, index) {
		                var et = events[index+1];
		                var pf = 0;
		                var pm = 0;
		                if (et=="vallas cortas") {
							pf = getMedalsByEventYear(value,"100v",'masculino');
						} else if (et=="pruebas múltiples") {
							pf = getMedalsByEventYear(value,"heptatlon",'mascilino');
						}
		                else {
			                pf = getMedalsByEventYear(value,et,'masculino');
		                }
		                ps = pf;
		                var points = 'puntos';
		                if (ps ==1 ) {points = 'punto'}
		                return ps+' '+points;
		            }, 
		         }
       
		    }	
		});	
	}
	
	
	function generateGoldsScatterAll(){
		var events = ["Eventos"];
		for(var e in data.especialidades){
			if (exe.indexOf(e)==-1) {
				events.push(e);
			}	
		}
		events.push('vallas cortas');
		events.push('pruebas múltiples');
		
		evs = [];
		for(var i=1;i<17;i++){
			var e = [eds[i-1]];
			for(var j=1;j<18;j++){
				var mv = 0;
				var hv = 0;
				if (events[j]=="vallas cortas") {
					mv = getGoldsByEventYear(eds[i-1],"100v",'femenino');
					hv = getGoldsByEventYear(eds[i-1],"110v",'masculino');	
				}
				else if (events[j]=="pruebas múltiples") {
					mv = getGoldsByEventYear(eds[i-1],"heptatlon",'femenino');
					hv = getGoldsByEventYear(eds[i-1],"decatlon",'masculino');		
				}
				else {
					mv = getGoldsByEventYear(eds[i-1],events[j],'femenino');
					hv = getGoldsByEventYear(eds[i-1],events[j],'masculino');
				}
				if ((mv+hv)!=0){
					e.push(eds[i-1]);	
				} else {e.push(null);}
			}
			evs.push(e);	
		}
		
		
		evs.push(events);
		var lns = [];
		for(var t in events){
			if(t!=0){
				lns.push({'value':events[t]});
			}	
		}
		var chartp = c3.generate({
			bindto: '#eventos-titulos-scatter',
			data: {
				x: "Eventos",
		        columns: evs,
				type: "scatter"
			},
			axis: {
				x: {
				label: 'Eventos',
				type: 'categorical',
				tick: {
						centered: true
					
					}
				
				},
				y: {
				label: 'Mundiales',
				position: 'outer-middle',
				},
				rotated: true
			},
			 point: {
					  r: function(d){
							return 5;
						  },
						  
					focus: {
					    expand: {
					      r: 6
					    }
					  }
				},
				grid: {
					  x: {
					    lines: lns
					  }
				},
				legend: {
			  show: false
			},
			tooltip: {
		        format: {
		            value: function (value, ratio, id, index) {
		                var et = events[index+1];
		                var pf = 0;
		                var pm = 0;
		                if (et=="vallas cortas") {
							pf = getGoldsByEventYear(value,"100v",'femenino');
			                pm = getGoldsByEventYear(value,"110v",'masculino');
						} else if (et=="pruebas múltiples") {
							pf = getGoldsByEventYear(value,"heptatlon",'femenino');
			                pm = getGoldsByEventYear(value,"decatlon",'masculino');	
						}
		                else {
			                pf = getGoldsByEventYear(value,et,'femenino');
			                pm = getGoldsByEventYear(value,et,'masculino');
		                }
		                ps = pf + pm;
		                var points = 'medallas';
		                if (ps ==1 ) {points = 'medalla'}
		                return ps+' '+points+' ('+pf+' femenino, '+pm+' masculino)';
		            }, 
		         }
       
		    }	
		});	
	}
	
	function generateGoldsScatterFem(){
		var events = ["Eventos"];
		for(var e in data.especialidades){
			if (exe.indexOf(e)==-1) {
				events.push(e);
			}	
		}
		events.push('vallas cortas');
		events.push('pruebas múltiples');
		
		evs = [];
		for(var i=1;i<17;i++){
			var e = [eds[i-1]];
			for(var j=1;j<18;j++){
				var mv = 0;
				var hv = 0;
				if (events[j]=="vallas cortas") {
					mv = getGoldsByEventYear(eds[i-1],"100v",'femenino');
				}
				else if (events[j]=="pruebas múltiples") {
					mv = getGoldsByEventYear(eds[i-1],"heptatlon",'femenino');		
				}
				else {
					mv = getGoldsByEventYear(eds[i-1],events[j],'femenino');
				}
				if (mv!=0){
					e.push(eds[i-1]);	
				} else {e.push(null);}
			}
			evs.push(e);	
		}
		evs.push(events);
		
		var lns = [];
		for(var t in events){
			if(t!=0){
				lns.push({'value':events[t]});
			}	
		}
		var chartp = c3.generate({
			bindto: '#eventos-titulos-scatter-fem',
			data: {
				x: "Eventos",
		        columns: evs,
				type: "scatter"
			},
			axis: {
				x: {
				label: 'Eventos',
				type: 'categorical',
				tick: {
						centered: true
				},
				},
				y: {
				label: 'Mundiales',
				position: 'outer-middle',
				},
				rotated: true
			},
			legend: {
			  show: false
			},
			 point: {
					  r: function(d){
							return 5;
						  },
						  
					focus: {
					    expand: {
					      r: 6
					    }
					  }
				},
				grid: {
					  x: {
					    lines: lns
					  }
				},
			tooltip: {
				
		        format: {
		            value: function (value, ratio, id, index) {
		                var et = events[index+1];
		                var pf = 0;
		                var pm = 0;
		                if (et=="vallas cortas") {
							pf = getGoldsByEventYear(value,"100v",'femenino');
						} else if (et=="pruebas múltiples") {
							pf = getGoldsByEventYear(value,"heptatlon",'femenino');
						}
		                else {
			                pf = getGoldsByEventYear(value,et,'femenino');
		                }
		                ps = pf;
		                var points = 'puntos';
		                if (ps ==1 ) {points = 'punto'}
		                return ps+' '+points;
		            }, 
		         }
       
		    }	
		});
	}
	
	function generateGoldsScatterMas(){
		var events = ["Eventos"];
		for(var e in data.especialidades){
			if (exe.indexOf(e)==-1) {
				events.push(e);
			}	
		}
		events.push('vallas cortas');
		events.push('pruebas múltiples');
		
		evs = [];
		for(var i=1;i<17;i++){
			var e = [eds[i-1]];
			for(var j=1;j<18;j++){
				var mv = 0;
				var hv = 0;
				if (events[j]=="vallas cortas") {
					mv = getGoldsByEventYear(eds[i-1],"110v",'masculino');
				}
				else if (events[j]=="pruebas múltiples") {
					mv = getGoldsByEventYear(eds[i-1],"decatlon",'masculino');		
				}
				else {
					mv = getGoldsByEventYear(eds[i-1],events[j],'masculino');
				}
				if (mv!=0){
					e.push(eds[i-1]);	
				} else {e.push(null);}
			}
			evs.push(e);	
		}
		
		
		evs.push(events);
		
		var lns = [];
		for(var t in events){
			if(t!=0){
				lns.push({'value':events[t]});
			}	
		}
		var chartp = c3.generate({
			bindto: '#eventos-titulos-scatter-mas',
			data: {
				x: "Eventos",
		        columns: evs,
				type: "scatter"
			},
			axis: {
				x: {
				label: 'Eventos',
				type: 'categorical',
				tick: {
						centered: true
				},
				},
				y: {
				label: 'Mundiales',
				position: 'outer-middle',
				},
				rotated: true
			},
			legend: {
			  show: false
			},
			 point: {
					  r: function(d){
							return 5;
						  },
						  
					focus: {
					    expand: {
					      r: 6
					    }
					  }
				},
				grid: {
					  x: {
					    lines: lns
					  }
				},
			tooltip: {
				
		        format: {
		            value: function (value, ratio, id, index) {
		                var et = events[index+1];
		                var pf = 0;
		                var pm = 0;
		                if (et=="vallas cortas") {
							pf = getGoldsByEventYear(value,"100v",'masculino');
						} else if (et=="pruebas múltiples") {
							pf = getGoldsByEventYear(value,"heptatlon",'masculino');
						}
		                else {
			                pf = getGoldsByEventYear(value,et,'masculino');
		                }
		                ps = pf;
		                var points = 'puntos';
		                if (ps ==1 ) {points = 'punto'}
		                return ps+' '+points;
		            }, 
		         }
       
		    }	
		});	
	}
	
	function compare_si(p1,p2){
		var s1 = p1[1];
		var s2 = p2[1]; 
        if (s1 < s2)
            return 11;
        if (s1 > s2)
            return -1;
        return 0;
    }
	
	function getPersonPoints(){
		var people = {}
		for(var year in eds){
			resultados = data.mundiales[eds[year]].resultados;
			for(var person in resultados.individual){
					for(var res in resultados.individual[person]){
						if (person in people){
							people[person]+=9-resultados.individual[person][res].lugar;
						} else {
							people[person]=9-resultados.individual[person][res].lugar;
						}
					}	
			}
			if ('colectivo' in resultados) {
				for(var cres in resultados.colectivo){
						var members = resultados.colectivo[cres].miembros;
						for(var p in members){
							if (members[p] in people) {
								people[members[p]]+=9-resultados.colectivo[cres].lugar;
							} else {
								people[members[p]] = 9-resultados.colectivo[cres].lugar;	
							}
						}	
				}
			}
		}
		var pepa = [];
		for(var i in people){
			pepa.push([i,people[i]]);
		}
		pepa.sort(compare_si);
		return pepa;
	}
	
	function getPersonMedals(){
		var people = {}
		for(var year in eds){
			resultados = data.mundiales[eds[year]].resultados;
			for(var person in resultados.individual){
					for(var res in resultados.individual[person]){
						if (resultados.individual[person][res].lugar<=3){
							if (person in people){
								people[person]+=1;
							} else {
								people[person]=1;
							}
						}
					}	
			}
			if ('colectivo' in resultados) {
				for(var cres in resultados.colectivo){
						var members = resultados.colectivo[cres].miembros;
						for(var p in members){
							if (resultados.colectivo[cres].lugar<=3){
								if (members[p] in people) {
									people[members[p]]+=1;
								} else {
									people[members[p]] = 1;	
								}
							}
						}	
				}
			}
		}
		var pepa = [];
		for(var i in people){
			pepa.push([i,people[i]]);
		}
		pepa.sort(compare_si);
		return pepa;
	}
	
	function getPersonGolds(){
		var people = {}
		for(var year in eds){
			resultados = data.mundiales[eds[year]].resultados;
			for(var person in resultados.individual){
					for(var res in resultados.individual[person]){
						if (resultados.individual[person][res].lugar==1){
							if (person in people){
								people[person]+=1;
							} else {
								people[person]=1;
							}
						}
					}	
			}
			if ('colectivo' in resultados) {
				for(var cres in resultados.colectivo){
						var members = resultados.colectivo[cres].miembros;
						for(var p in members){
							if (resultados.colectivo[cres].lugar==1){
								if (members[p] in people) {
									people[members[p]]+=1;
								} else {
									people[members[p]] = 1;	
								}
							}
						}	
				}
			}
		}
		var pepa = [];
		for(var i in people){
			pepa.push([i,people[i]]);
		}
		pepa.sort(compare_si);
		return pepa;
	}
	
	function getEditionResume(year,sex){
		var des = [0,0,0,0,0,0,0,0];
		resultados = data.mundiales[year].resultados; 	
		for(var person in resultados.individual){
			if ((data.atletas[person].sexo==sex)||(sex==null)){
				for(var res in resultados.individual[person]){
					des[resultados.individual[person][res].lugar-1]+=1
				}	
			}
		}
		if ('colectivo' in resultados) {
			for(var cres in resultados.colectivo){
				if ((resultados.colectivo[cres].sexo==sex)||(sex==null)){
					des[resultados.colectivo[cres].lugar-1]+=1;	
				}
			}
		}
		return des;	
	}
	
	function sumPoints(des){
		var total = 0;
		for(var i in des){
			total+=(8-i)*des[i];	
		}
		return total;	
	}
	
	function generateAthletesTables(){
		var tpoints = '';
		var pp = getPersonPoints();
		for(var i=0;i<12;i++){
			var person = data.atletas[pp[i][0]];
			var points = pp[i][1];
			var clas="female-text";
			if (person.sexo=="masculino"){ clas="male-text"};
			tpoints = tpoints + '<tr><td class="'+clas+'">'+person['nombre-corto']+'</td><td class="center">'+points+'</td></tr>';
		}
		$('#tabla-atletas-puntos').html(tpoints);
		
		var tgolds = '';
		var pg = getPersonGolds();
		for(var i=0;i<pg.length;i++){
			var person = data.atletas[pg[i][0]];
			var points = pg[i][1];
			var clas="female-text";
			if (person.sexo=="masculino"){ clas="male-text"};
			tgolds = tgolds + '<tr><td class="'+clas+'">'+person['nombre-corto']+'</td><td class="center">'+points+'</td></tr>';
		}
		$('#tabla-atletas-titulos').html(tgolds);
		
		var tmedals = '';
		var pm = getPersonMedals();
		for(var i=0;i<15;i++){
			var person = data.atletas[pm[i][0]];
			var points = pm[i][1];
			var clas="female-text";
			if (person.sexo=="masculino"){ clas="male-text"};
			tmedals = tmedals + '<tr><td class="'+clas+'">'+person['nombre-corto']+'</td><td class="center">'+points+'</td></tr>';
		}
		$('#tabla-atletas-medallas').html(tmedals);
	}
	
	function generateEditionsTable(){
		var text = '';
		for(var y in eds){
			var year = eds[y];
			var ed = data.mundiales[year];
			var edition = '<img class="flag-min" src="../../assets/images/flags-mini/'+ed.dominio+'.png"> '+ed.ciudad+' '+year;
			var pm = ed['lugar-medallas'];
			var pp = ed['lugar-puntos'];
			var er = getEditionResume(year);
			var ep = sumPoints(er);
			text += '<tr><td>'+edition+'</td><td class="center hidden-sm hidden-xs">'+pp+'</td><td class="center  hidden-sm hidden-xs">'+pm+'</td>';	
			text += '<td class="center">'+er[0]+'</td><td class="center">'+er[1]+'</td><td class="center">'+er[2]+'</td><td class="center">'+er[3]+'</td>';
			text += '<td class="center">'+er[4]+'</td><td class="center">'+er[5]+'</td><td class="center">'+er[6]+'</td><td class="center">'+er[7]+'</td><td class="center">'+ep+'</td></tr>';
		}	
		$('#tabla-mundiales').html(text);
	}
	
	generatePositionsGraph();
	generatePointsEvolGraph();
	generateMedalsEvolGraph();
	generateMedalsPieGraph();
	generatePointsPieGraph();
	generateGoldsPieGraph();
	generatePointsBar();
	generateMedalsBar();
	generateGoldsBar();
	generatePointsScatterAll();
	generatePointsScatterFem();
	generatePointsScatterMas();
	generateMedalsScatterAll();
	generateMedalsScatterFem();
	generateMedalsScatterMas();
	generateGoldsScatterAll();
	generateGoldsScatterFem();
	generateGoldsScatterMas();
	$('#block2').hide();
	$('#block3').hide();
	generateAthletesTables();
	generateEditionsTable()
	
	
	console.log(getPersonPoints(),getPersonMedals(),getPersonGolds());
	
}); 
