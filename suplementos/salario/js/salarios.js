var cols = {
	"m-ocup": 'rgb(177,7,47)',
	"m-no-ocup": 'rgb(255,148,150)',	
	"h-ocup": 'rgb(8,47,154)',
	"h-no-ocup": 'rgb(150,185,255)',	
}

$.getJSON("data/salario.json",function(data){
	var years = [];
	for(var i in data['general']){
		years.push(i);
	}
	years.sort();
	years = ['Año'].concat(years);
	var ocup_fem = ['Mujeres ocupadas'];
	var ocup_hom = ['Hombres ocupados'];
	var no_ocup_fem = ['Mujeres no ocupadas'];
	var no_ocup_hom = ['Hombres no ocupados'];
	var tot_fem = ['Mujeres en edad laboral'];
	var tot_hom = ['Hombres en edad laboral'];
	var p_ocup_fem = ['Mujeres ocupadas'];
	var p_ocup_hom = ['Hombres ocupados'];
	var pf = ['Mujeres ocupadas'];
	var pfn = ['Mujeres no ocupadas'];
	var ph = ['Hombres ocupados'];
	var phn = ['Hombres no ocupados'];
	
	for(var i=1;i<years.length;i++){
		var y = years[i];
		ofd = data['general'][y]['ocupados']['mujeres'];
		ocup_fem.push(ofd);
		ohd = data['general'][y]['ocupados']['hombres'];
		ocup_hom.push(ohd);
		tf = data['general'][y]['edad-laboral']['mujeres']
		tot_fem.push(tf);
		th = data['general'][y]['edad-laboral']['hombres'];
		tot_hom.push(th);
		nofd = Math.round((data['general'][y]['edad-laboral']['mujeres']-data['general'][y]['ocupados']['mujeres'])*100)/100;
		no_ocup_fem.push(nofd);
		nohd = Math.round((data['general'][y]['edad-laboral']['hombres']-data['general'][y]['ocupados']['hombres'])*100)/100;
		no_ocup_hom.push(nohd);
		p_ocup_fem.push(Math.round((ofd/(ofd+ohd))*10000)/100);
		p_ocup_hom.push(Math.round((ohd/(ofd+ohd))*10000)/100);
		pf.push(Math.round((ofd/tf)*10000)/100);
		pfn.push(Math.round(((tf-ofd)/tf)*10000)/100);
		ph.push(Math.round((ohd/th)*10000)/100);
		phn.push(Math.round(((th-ohd)/th)*10000)/100);
		
	}
	
	function setCantGraphs(){
		c3.generate({
            bindto: "#graph-women-job",
            data: {
              x : 'Año',
              columns: [
				years,
				ocup_fem,
				no_ocup_fem,
              ],
              type: 'area',
              groups: [[ocup_fem[0],no_ocup_fem[0]]],
              colors: {
					'Mujeres ocupadas': cols['m-ocup'],
					'Mujeres no ocupadas': cols['m-no-ocup'],
			  },
            },
            
            axis: {
              x: {
                label: 'Año',
                min: 2011.7,
                max: 2017.3
              },
              y: {
                label: 'Cantidad de mujeres en edad laboral (en miles)',
                min: 0,
                max: 4000,
              }
            }
		});  
		
		c3.generate({
            bindto: "#graph-men-job",
            data: {
              x : 'Año',
              columns: [
				years,
				ocup_hom,				
				no_ocup_hom,
              ],
              type: 'area',
              groups: [[ocup_hom[0],no_ocup_hom[0]]],
              colors: {
					'Hombres ocupados': cols['h-ocup'],
					'Hombres no ocupados': cols['h-no-ocup'],
			  },
            },
            
            axis: {
              x: {
                label: 'Año',
                min: 2011.7,
                max: 2017.3
              },
              y: {
                label: 'Cantidad de hombres en edad laboral (en miles)',
                min: 0,
                max: 4000,
              }
            }
		});  
		}
		
		function setPercGraphs(){
		c3.generate({
	            bindto: "#graph-women-job-percent",
	            data: {
	              x : 'Año',
	              columns: [
					years,
					pf,
					pfn,
	              ],
	              type: 'area',
	              groups: [[pf[0],pfn[0]]],
	              colors: {
						'Mujeres ocupadas': cols['m-ocup'],
						'Mujeres no ocupadas': cols['m-no-ocup'],
				  },
	            },
	            
	            axis: {
	              x: {
	                label: 'Año',
	                min: 2011.7,
	                max: 2017.3
	              },
	              y: {
	                label: '% de mujeres en edad laboral',
	                min: 0,
	                max: 100,
	              }
	            }
			});  
			
			
			
			c3.generate({
	            bindto: "#graph-men-job-percent",
	            data: {
	              x : 'Año',
	              columns: [
					years,
					ph,				
					phn,
	              ],
	              type: 'area',
	              groups: [[ph[0],phn[0]]],
	              colors: {
						'Hombres ocupados': cols['h-ocup'],
						'Hombres no ocupados': cols['h-no-ocup'],
				  },
	            },
	            
	            axis: {
	              x: {
	                label: 'Año',
	                min: 2011.7,
	                max: 2017.3
	              },
	              y: {
	                label: '% de hombres en edad laboral',
	                min: 0,
	                max: 100,
	              }
	            }
			}); 
		} 
		$('#graph-percent').hide();
		setCantGraphs();
		
		$('#btn-mw-tot').click(function(e){
			if (!$('#btn-mw-tot').hasClass('check')) {
				$('#btn-mw-per').removeClass('check');
				$('#btn-mw-tot').addClass('check');
				$('#graph-all').show();
				$('#graph-percent').hide();
				setCantGraphs();
			}
		});
		$('#btn-mw-per').click(function(e){
			if (!$('#btn-mw-per').hasClass('check')) {
				$('#btn-mw-tot').removeClass('check');
				$('#btn-mw-per').addClass('check');
				$('#graph-all').hide();
				$('#graph-percent').show();
				setPercGraphs();
			}
		});  

		
		
		c3.generate({
            bindto: "#graph-job",
            data: {
              x : 'Año',
              columns: [
				years,
				ocup_hom,
				ocup_fem,
              ],
              type: 'area',
              groups: [[ocup_fem[0],ocup_hom[0]]],
              colors: {
					'Mujeres ocupadas': cols['m-ocup'],
					'Hombres ocupados': cols['h-ocup'],
			  },
            },
            
            axis: {
              x: {
                label: 'Año',
                min: 2011.7,
                max: 2017.3
              },
              y: {
                label: 'Cantidad de personas ocupadas (en miles)',
                min: 0
              }
            }
		});  
		var a = c3.generate({
            bindto: "#graph-job-percent",
            data: {
              x : 'Año',
              columns: [
				years,
				p_ocup_hom,
				p_ocup_fem,
              ],
              type: 'area',
              groups: [[p_ocup_fem[0],p_ocup_hom[0]]],
              colors: {
					'Mujeres ocupadas': cols['m-ocup'],
					'Hombres ocupados': cols['h-ocup'],
			  },
            },
            
            axis: {
              x: {
                label: 'Año',
                min: 2011.7,
                max: 2017.3
              },
              y: {
                label: '% de personas ocupadas ',
                min: 0,
                max: 100,
              }
            }
		});
		
		
		$('#graph-job').hide();
		
	$('#btn-tot').click(function(e){
		if (!$('#btn-tot').hasClass('check')) {
			$('#btn-per').removeClass('check');
			$('#btn-tot').addClass('check');
			$('#graph-job').show();
			$('#graph-job-percent').hide();
		}
	});
	$('#btn-per').click(function(e){
		if (!$('#btn-per').hasClass('check')) {
			$('#btn-tot').removeClass('check');
			$('#btn-per').addClass('check');
			$('#graph-job').hide();
			$('#graph-job-percent').show();
		}
	});
	
	function setEmploymentPart(id){
		var name = data['actividades'][id]['name'];
		var salary = data['actividades'][id]['fechas']['2017']['salario'];
		var muj = data['actividades'][id]['fechas']['2017']['mujeres'];
		var hom = data['actividades'][id]['fechas']['2017']['hombres'];
		var chart = c3.generate({
		bindto: '#bar-name-'+id,
        data: {
			x: 'Salario',
          columns: [
			['Salario',salary],
            ['Mujeres', muj],
            ['Hombre', hom]

          ],
          type: 'bar',
          colors: {
			'Mujeres': cols['m-ocup'],
			'Hombres': cols['h-ocup'],
		  },
        },
        legend: {
			show: false
		},
        axis: {
          x: {
            label: 'Salario'
          },
          y: {
			label: 'Personas (en miles)',
			max: 660  
		  }
        },
        bar: {
          width: {
            ratio: 0.3,
//            max: 30
          },
        }
      });
	}
	
	var salOrd = [
		"azucar",
		"minas",
		"finanzas",
		"manufactura",
		"agricultura",
		"ciencia",
		"construccion",
		"pesca",
		"salud",
		"transporte",
		"electricidad",
		"empresariales",
		"comercio",
		"administracion",
		"hosteleria",
		"educacion",
		"comunales",
		"cultura"
	];
	
	var mujOrd = [
		"salud",
		"educacion",
		"comercio",
		"hosteleria",
		"agricultura",
		"manufactura",
		"administracion",
		"comunales",
		"cultura",
		"transporte",
		"empresariales",
		"construccion",
		"finanzas",
		"electricidad",
		"azucar",
		"ciencia",
		"minas",
		"pesca"
	];
	
	var homOrd = [
		"agricultura",
		"comercio",
		"manufactura",
		"transporte",
		"construccion",
		"comunales",
		"administracion",
		"educacion",
		"hosteleria",
		"salud",
		"cultura",
		"electricidad",
		"azucar",
		"empresariales",
		"pesca",
		"minas",
		"finanzas",	
		"ciencia"
	];
	
	function getEmploymentPart(id){
		var name = data['actividades'][id]['name'];
		var icon = data['actividades'][id]['icon'];
		var salary = data['actividades'][id]['fechas']['2017']['salario'];
		var muj = data['actividades'][id]['fechas']['2017']['mujeres'];
		var hom = data['actividades'][id]['fechas']['2017']['hombres'];
		var text = '<div id="bar-'+id+'" class="bar-graph col-lg-2 col-md-2 col-sm-6 col-xs-6">';
		text += '<div id="bar-name-'+id+'" class="bar-name-graph"></div>';
		text += '<div id="bar-name" class="bar-name"> <img class="iconsmall" src="images/'+icon+'"> '+name+'</div>';
		text += '</div>';
		return text;
	}
	
	function setEmploymentGraphs(list){
		var text = '';
		for(var i in list){
			var id = list[i];
			text +=getEmploymentPart(id);
		}
		$('#bar-graphs').html(text); 
		for(var i in list){
			var id = list[i];
			setEmploymentPart(id);
		}
	}
	
	setEmploymentGraphs(salOrd);
	
	$('#metric-select').on('change',function(e){
		console.log('in');
		var val = $('#metric-select').val();
		if (val=='salario')	{setEmploymentGraphs(salOrd);}
		if (val=='mujeres')	{setEmploymentGraphs(mujOrd);}
		if (val=='hombres')	{setEmploymentGraphs(homOrd);}
	});
	
	var ids = {
		"agricultura":true,
		"comercio":true,
		"manufactura":true,
		"transporte":true,
		"construccion":true,
		"comunales":true,
		"administracion":true,
		"educacion":true,
		"hosteleria":true,
		"salud":true,
		"cultura":true,
		"electricidad":true,
		"azucar":true,
		"empresariales":true,
		"pesca":true,
		"minas":true,
		"finanzas":true,	
		"ciencia":true
	};
	
	function setDBSalary (){
		var muj = 0;
		var mujS = 0;
		var hom = 0;
		var homS = 0;
		for(var i in ids){
			if (ids[i]){
				var sal = data['actividades'][i]['fechas']['2017']['salario'];
				muj = muj + data['actividades'][i]['fechas']['2017']['mujeres'];
				hom = hom + data['actividades'][i]['fechas']['2017']['hombres'];	
				mujS = mujS + data['actividades'][i]['fechas']['2017']['mujeres']*sal;
				homS = homS + data['actividades'][i]['fechas']['2017']['hombres']*sal;
			}
		}
		$('#msalary').html(Math.round(mujS/muj));
		$('#hsalary').html(Math.round(homS/hom));
		var pm = Math.round(mujS*100/(mujS+homS));
		var ph = Math.round(homS*100/(mujS+homS));
		$('#td-woman').css('width',pm+'%');
		$('#td-woman').html(pm+'%');
		$('#td-men').css('width',ph+'%');
		$('#td-men').html(ph+'%');
		$('#td-woman').attr('title',Math.round(mujS*1000) + ' CUP');
		$('#td-men').attr('title',Math.round(homS*1000) + ' CUP');
	}
	
	function setIDBlocks(){
		var text = '';
		for(var i in ids){
			var sal = data['actividades'][i]['fechas']['2017']['salario']; 
			text +='<div id="id-'+i+'" class="bd cursor id-block col-lg-2 col-md-2 col-xs-3 col-sm-3">';
			text += '<img title="'+data['actividades'][i]['name']+'" src="images/'+data['actividades'][i]['icon']+'">';
			text +='</div>';
		}
		$('#salary-ids').html(text);
		$('.id-block').click(function(e){
			var id = $(this).attr('id');
			var lid = id.split('id-')[1];
			if (ids[lid]){
				ids[lid]=false;
				$('#'+id).addClass('uncheck');
			} else {
				ids[lid]=true;	
				$('#'+id).removeClass('uncheck');
			}
			setDBSalary();
		});
	}
	
	$('#markall').click(function(e){
		for(var id in ids){
			ids[id]=true;
			$('#id-'+id).removeClass('uncheck');
		}
		setDBSalary();
	});
	
	$('#unmarkall').click(function(e){
		for(var id in ids){
			ids[id]=false;
			$('#id-'+id).addClass('uncheck');
		}
		setDBSalary();
		$('#td-woman').css('width','0%');
		$('#td-woman').html('');
		$('#td-woman').attr('title','precise los datos');
		$('#td-men').css('width','0%');
		$('#td-men').html('');
		$('#td-men').attr('title','precise los datos');
	});
	
	setIDBlocks();
	setDBSalary();
});
