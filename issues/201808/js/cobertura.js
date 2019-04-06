c3.generate({
	bindto: "#election-stats",
	data: {
	  columns: [
          ['No votaron',857380],
          ['Votos por el SI', 6816169],
          ['Votos por el NO', 706400],
          ['Boletas en blanco', 127100],
          ['Boletas anuladas', 198674],
	  ],
        
	  type: 'donut',
	},
	donut: {
          title: "8 705 723 electores",
    },
    tooltip: {
        format:{
            value: function(value,r, id,index) {
                console.log(value,r,id,index);
                return Math.round(r*10000)/100+'% - '+value + ' electores';
            }
        }
	}
}); 

c3.generate({
        bindto: "#vote-trend",
        data: {
          x : 'Proceso electoral',
          columns: [
	          ['Proceso electoral','1992-93','1997-98','2002-03','2007-08','2012-13','2017-18'],
	          ['Elección de Delegados a las AMPP',97.2,97.6,95.8,96.5,94.2,89],
	          ['Elección de Diputados a la ANPP',98.71,98.35,97.64,96.89,90.88,85.65],
          ],
          type: 'line',
        },
        axis: {
          x: {
            label: 'Proceso electoral',
            type: 'categorical'
          },
          y: {
            label: '% de electores que votaron',
            position: 'outer-middle',
          }
        }, 
        tooltip: {
            format:{
                value: function(value,r, id,index) {
                    return value+'%'; 
                }            
            }
        }
});

c3.generate({
            bindto: "#vote-comparison",
            data: {
              x : 'Procesos electorales',
              columns: [
	              ['Procesos electorales','Últimos procesos electorales'],
	              ['Elección de Delegados a las AMPP - 2017',89],
	              ['Elección de Diputados a la ANPP - 2018',85.65],
	              ['Referendo constitucional - 2019',90.15],
              ],
              
              type: 'bar',
            },
            axis: {
              x: {
                label: '',
                type: 'categorical'
              },
              y: {
                label: '% de electores que votaron',
                position: 'outer-middle',
                min: 80
              }
            }, 
			tooltip: {
		            format:{
		                value: function(value,r, id,index) {
		                    return value+'%'; 
		                }            
		            }
		        }
});  

c3.generate({
        bindto: "#proposals-graph2",
        data: {
          columns: [['Adición',162],['Modificación',176],['Eliminación',126],['Ordenamiento',12],['Duda',95],['Interacción',191]],
          type: 'donut',
        },
        donut: {
          title: 762+"  acciones",
        }
});

$.getJSON("data/fb-debate-stats.json",function(data){ 
    dates = ['Fechas'].concat(data['dates']);
    users = ['Total de Miembros'].concat(data['total_users']);
    posts = ['Publicaciones'].concat(data['posts']);
    comments = ['Comentarios'].concat(data['comments']);
    actives = ['Miembros activos'].concat(data['actives']);
    reactions = ['Reacciones'].concat(data['reactions']);
    
    c3.generate({
            bindto: "#interactions-graph2",
            data: {
              columns:[dates,posts,comments,reactions],
              type: 'line',
              x: 'Fechas',
              axes: {
              }
            },
           
            axis: {
              x: {
                label: 'Fechas',
                type: 'categorical',
                show: false
              },
              y: {
                label: 'Número',
                position: 'outer-middle',
                padding: {
                    top: 110,
                }
              },
              y2: {
                show: false
              }
            },
         grid: {
          x: {
            lines: [{'value':'2018-08-13','text':'13 de agosto' },{'value':'2018-09-19','text':'19 de septiembre' },{'value':'2018-11-20','text':'20 de noviembre' }]
          }
          }
    });
      
});

$.getJSON("data/referendo.json",function(data){
    
    closer = {};
    var totalA = 1+229+17;
    var allA =  countChanges(1,229);
    var allE = countChanges('especiales');
    var allT = countChanges('transitorias');
    var allF = countChanges('finales');
    
    
    
    function setChaptersContent(begin,end){
        var text = '';
        for(var i=begin;i<=end;i++){
            var id = String(i)
            var art = data['constitucion']['articulos'][id];
            text += '<div id="articulo-'+art.id+'" class="article-title"><span class="hidder cursor"><i class="fa fa-plus-square-o"></i></span> Artículo '+art.id+' </div>';
            closer['articulo-'+art.id+'-block'] = true;
            text += '<div id="articulo-'+art.id+'-block" class="article-block" style="display:none;">';
            for(var j in art.texto){
                text += '<p class="simple-par">'+art.texto[j]+'</p>';
            }
            if ('incisos' in art) {
                for(var j in art.incisos){
                    for(var l in art.incisos[j].texto){
                        text += '<p class="inc-par">'+art.incisos[j].id+') '+art.incisos[j].texto[l]+'</p>';
                    }
                }
            }
            if ('texto-final' in art) {
                for(var j in art['texto-final']){
                    text += '<p class="simple-par">'+art['texto-final'][j]+'</p>';
                }
            }
            text +='</div>';
        }
        return text;
    }
    
    
    
    function setMainContentS(){
        var titles = [];
        for(var i in data['constitucion']['titulos']){
            titles.push(data['constitucion']['titulos'][i]);
        }
        var text = '<div id="preambulo" class="title-title">Preámbulo <br class="hidden-lg hidden-md"> <span class="main-text total-arts bd cursor simptip-position-top simptip-multiline" data-tooltip="el preámbulo es unitario">&nbsp;1&nbsp;</span>&nbsp;<span class="cursor simptip-position-top simptip-warning simptip-multiline" data-tooltip="cambió en contenido y redacción"><span class="pie" >0,1,0</span></span> <span class="cursor simptip-position-top simptip-danger simptip-multiline" data-tooltip="tuvo adiciones, eliminaciones y cambios de redacción"><span data-peity=\'{"max":1}\' class="bar">1,1,1</span></span></div>';
        for(var i in titles){
            var topener ='<span class="hidder cursor"><i class="fa fa-plus-square-o"></i></span>';
            if (!('capitulos' in titles[i])) {topener='';}
            var tarts = titles[i]['articulo-fin']-titles[i]['articulo-inicio']+1;
            var tch = countChanges(titles[i]['articulo-inicio'],titles[i]['articulo-fin']);
            var content = '<div id="title-'+titles[i].numero+'" class="title-title">Título '+titles[i].numero+' - '+titles[i].titulo+' <br class="hidden-lg hidden-md"><span class="cursor main-text total-arts bd simptip-position-top simptip-multiline" data-tooltip="'+tarts+' artículos integran este título">&nbsp;'+tarts+'&nbsp;</span>&nbsp;<span class=" cursor simptip-position-top simptip-multiline simptip-warning" data-tooltip="'+(tch.mod-tch.modr)+' cambian en contenido y redacción, '+tch.modr+' solo en redacción y '+(tarts-tch.mod)+' no cambian"><span class="pie">'+(tarts-tch.mod)+','+(tch.mod-tch.modr)+','+tch.modr+'</span></span> <span class="cursor simptip-position-top simptip-danger simptip-multiline" data-tooltip="'+tch.add+' con adiciones, '+tch.del+' con eliminaciones y '+tch.red+' con cambios en redacción"><span data-peity=\'{"max":'+tarts+'}\' class="bar">'+tch.add+','+tch.del+','+tch.red+'</span></span> '+topener+'</div>';
            closer['title-'+titles[i].numero+'-block'] = true;
            content += '<div id="title-'+titles[i].numero+'-block" class="title"  style="display:none;">';
            if ('capitulos' in titles[i]) {
                for(var j in titles[i].capitulos){ 
                    var copener ='<span class="hidder cursor"><i class="fa fa-plus-square-o"></i></span>';
                    var chap = titles[i].capitulos[j];
                    var carts = chap['articulo-fin']-chap['articulo-inicio']+1;
                    var cch = countChanges(chap['articulo-inicio'],chap['articulo-fin']);
                    if (!('secciones' in chap)) {copener='';}
                    content += '<div id="capitulo-'+titles[i].numero+'-'+chap.numero+'" class="chapter-title">Capítulo '+chap.numero+' - '+chap.titulo+'<br class="hidden-lg hidden-md"> <span class="cursor main-text total-arts bd simptip-position-top simptip-multiline" data-tooltip="'+carts+' artículos integran este capítulo">&nbsp;'+carts+'&nbsp;</span>&nbsp;<span class=" cursor simptip-position-top simptip-multiline simptip-warning" data-tooltip="'+(cch.mod-cch.modr)+' cambian en contenido y redacción, '+cch.modr+' solo en redacción y '+(carts-cch.mod)+' no cambian"><span class="pie">'+(carts-cch.mod)+','+(cch.mod-cch.modr)+','+cch.modr+'</span></span> <span class="cursor simptip-position-top simptip-danger simptip-multiline" data-tooltip="'+cch.add+' con adiciones, '+cch.del+' con eliminaciones y '+cch.red+' con cambios en redacción"><span data-peity=\'{"max":'+carts+'}\' class="bar">'+cch.add+','+cch.del+','+cch.red+'</span></span> '+copener+' </div>';
                    closer['capitulo-'+titles[i].numero+'-'+chap.numero+'-block'] = true;
                    content += '<div id="capitulo-'+titles[i].numero+'-'+chap.numero+'-block" class="chapter"  style="display:none;">';
                    if ('secciones' in chap){
                        for(var l in chap.secciones){
                            var sec = chap.secciones[l];
                            var sarts = sec['articulo-fin']-sec['articulo-inicio']+1;
                            var sch = countChanges(sec['articulo-inicio'],sec['articulo-fin']);
                            content += '<div id="seccion-'+titles[i].numero+'-'+chap.numero+'-'+sec.nombre+'" class="section-title"> Sección '+sec.nombre+' - '+sec.titulo+' <br class="hidden-lg hidden-md"><span class="cursor main-text total-arts bd simptip-position-top simptip-multiline" data-tooltip="'+sarts+' artículos en esta sección">&nbsp;'+sarts+'&nbsp;</span>&nbsp;<span class=" cursor simptip-position-top simptip-multiline simptip-warning" data-tooltip="'+(sch.mod-sch.modr)+' cambian en contenido y redacción, '+sch.modr+' solo en redacción y '+(sarts-sch.mod)+' no cambian"><span class="pie">'+(sarts-sch.mod)+','+(sch.mod-sch.modr)+','+sch.modr+'</span></span> <span class="cursor simptip-position-top simptip-danger simptip-multiline" data-tooltip="'+sch.add+' con adiciones, '+sch.del+' con eliminaciones y '+sch.red+' con cambios en redacción"><span data-peity=\'{"max":'+sarts+'}\' class="bar">'+sch.add+','+sch.del+','+sch.red+' </span></span></div>';
                        }
                    } 
                    content+='</div>';
                }
            } 
            content+='</div>';
            text +=content;
        }
        return text;
    }
    
    function setPreamble(){
        var text='';
        
        text+= '<div id="preambulo" class="title-title"><span class="hidder cursor"><i class="fa fa-plus-square-o"></i></span> Preámbulo  </div>';
        closer['preambulo-block'] = true;
        text += '<div id="preambulo-block" class="article-block"  style="display:none;">';
        for(var i in data['constitucion']['preambulo'].texto){
            text += '<p class="simple-par">'+data['constitucion']['preambulo'].texto[i]+'</p>';
        }
        text += '</div>';
        return text;
    }
    
    function setDispositionsS(){
        var totalE = Object.keys(data['constitucion']['disposiciones']['especiales'].elementos).length;
        var totalT = Object.keys(data['constitucion']['disposiciones']['transitorias'].elementos).length;
        var totalF = Object.keys(data['constitucion']['disposiciones']['finales'].elementos).length;
        var dE = countChangesD('especiales');
        var dT = countChangesD('transitorias');
        var dF = countChangesD('finales');
        var text='';
        text+= '<div id="disposiciones" class="title-title">Disposiciones <br class="hidden-lg hidden-md"><span class="cursor main-text total-arts bd simptip-position-top simptip-multiline" data-tooltip="'+(totalE+totalT+totalF)+' disposiciones en total">&nbsp;'+(totalE+totalT+totalF)+'&nbsp;</span>&nbsp;<span class="cursor simptip-position-top simptip-warning simptip-multiline" data-tooltip="'+((dE.mod+dT.mod+dF.mod)-(dE.modr+dT.modr+dF.modr))+' cambian en contenido y redacción, '+(dE.modr+dT.modr+dF.modr)+' solo en redacción y '+((totalE+totalT+totalF)-(dE.mod+dT.mod+dF.mod))+' no cambian"><span class="pie">'+((totalE+totalT+totalF)-(dE.mod+dT.mod+dF.mod))+','+((dE.mod+dT.mod+dF.mod)-(dE.modr+dT.modr+dF.modr))+','+(dE.modr+dT.modr+dF.modr)+'</span></span> <span class="cursor simptip-position-top simptip-danger simptip-multiline" data-tooltip="'+(dE.add+dT.add+dF.add)+' con adiciones, '+(dE.del+dT.del+dF.del)+' con eliminaciones y '+(dE.red+dT.red+dF.red)+' con cambios en redacción"><span data-peity=\'{"max":'+(totalE+totalT+totalF)+'}\' class="bar">'+(dE.add+dT.add+dF.add)+','+(dE.del+dT.del+dF.del)+','+(dE.red+dT.red+dF.red)+'</span></span>  <span class="hidder cursor"><i class="fa fa-plus-square-o"></i></span></div>';
        closer['disposiciones-block'] = true;
        text += '<div id="disposiciones-block" class="title"  style="display:none;">';
        text+= '<div id="disposiciones-especiales" class="chapter-title">Disposiciones Especiales  <br class="hidden-lg hidden-md"><span class="cursor main-text total-arts bd simptip-position-top simptip-multiline" data-tooltip="'+(totalE)+' disposiciones especiales">&nbsp;'+totalE+'&nbsp;</span>&nbsp;<span class="cursor simptip-position-top simptip-warning simptip-multiline" data-tooltip="'+(dE.mod-dE.modr)+' cambian en contenido y redacción, '+dE.modr+' solo en redacción y '+(totalE-dE.mod)+' no cambian"><span class="pie">'+(totalE-dE.mod)+','+(dE.mod-dE.modr)+','+dE.modr+'</span></span> <span class="cursor simptip-position-top simptip-danger simptip-multiline" data-tooltip="'+dE.add+' con adiciones,'+dE.del+' con eliminaciones y '+dE.red+' con cambios en redacción"><span data-peity=\'{"max":'+totalE+'}\' class="bar">'+dE.add+','+dE.del+','+dE.red+'</span></span></div>';
        text+= '<div id="disposiciones-transitorias" class="chapter-title">Disposiciones Transitorias  <br class="hidden-lg hidden-md"><span class="cursor main-text total-arts bd  simptip-position-top simptip-multiline" data-tooltip="'+(totalT)+' disposiciones transitorias">&nbsp;'+totalT+'&nbsp;</span>&nbsp;<span class="cursor simptip-position-top simptip-warning simptip-multiline" data-tooltip="'+(dT.mod-dT.modr)+' cambian en contenido y redacción, '+dT.modr+' solo en redacción y '+(totalT-dT.mod)+' no cambian"><span class="pie">'+(totalT-dT.mod)+','+(dT.mod-dT.modr)+','+dT.modr+'</span></span> <span class="cursor simptip-position-top simptip-danger simptip-multiline" data-tooltip="'+dT.add+' con adiciones,'+dT.del+' con eliminaciones y '+dT.red+' con cambios en redacción"><span data-peity=\'{"max":'+totalT+'}\' class="bar">'+dT.add+','+dT.del+','+dT.red+'</span></span></div>';
        text+= '<div id="disposiciones-finales" class="chapter-title">Disposiciones Finales  <br class="hidden-lg hidden-md"><span class="cursor main-text total-arts bd  simptip-position-top simptip-multiline" data-tooltip="'+(totalF)+' disposiciones finnales">&nbsp;'+totalF+'&nbsp;</span>&nbsp;<span class="cursor simptip-position-top simptip-warning simptip-multiline" data-tooltip="'+(dF.mod-dF.modr)+' cambian en contenido y redacción, '+dF.modr+' solo en redacción y '+(totalF-dF.mod)+' no cambian"><span class="pie">'+(totalF-dF.mod)+','+(dF.mod-dF.modr)+','+dF.modr+'</span></span> <span class="cursor simptip-position-top simptip-danger simptip-multiline" data-tooltip="'+dF.add+' con adiciones,'+dF.del+' con eliminaciones y '+dF.red+' con cambios en redacción"><span data-peity=\'{"max":'+totalF+'}\' class="bar">'+dF.add+','+dF.del+','+dF.red+'</span></span></div>';
        text+="</div>";
        text+="</div>";
        return text;
    }
    
    function countChanges(begin,end){
        var mod = 0;
        var nar = 0;
        var modr = 0;
        var adi = 0;
        var del = 0;
        var red = 0;
        var mov = 0;
        for(var i=begin;i<=end;i++){
            var id = String(i);
            var art = data['constitucion']['articulos'][id];
            if ('modificado' in art){
                if (art.modificado){
                    mod++;
                    if (art.cambios.adicion){adi++;}
                    if (art.cambios.eliminacion){del++;}
                    if (art.cambios.reubicacion){mov++;}
                    if (art.cambios.redaccion){
                        red++;
                        if ((!art.cambios.adicion)&&(!art.cambios.eliminacion)){modr++;}
                    }
                }
            } else {
                nar++;
            }
        }
        return {'mod':mod,'new':nar,'modr':modr,'add':adi,'del':del,'red':red,'mov':mov}
    }
    
    function countChangesD(disposition){
        var mod = 0;
        var nar = 0;
        var modr = 0;
        var adi = 0;
        var del = 0;
        var red = 0;
        var mov = 0;
        for(var id in data['constitucion']['disposiciones'][disposition].elementos){
            var art = data['constitucion']['disposiciones'][disposition].elementos[id];
            if ('modificado' in art){
                if (art.modificado){
                    mod++;
                    if (art.cambios.adicion){adi++;}
                    if (art.cambios.eliminacion){del++;}
                    if (art.cambios.reubicacion){mov++;}
                    if (art.cambios.redaccion){
                        red++;
                        if ((!art.cambios.adicion)&&(!art.cambios.eliminacion)){modr++;}
                    }
                }
            } else {
                nar++;
            }
        }
        return {'mod':mod,'new':nar,'modr':modr,'add':adi,'del':del,'red':red,'mov':mov}
    }
    
    $('#comparison').html(setMainContentS()+setDispositionsS());
    
    
    
    $('.hidder').click(function(e){
        var id = $(this).parent().next().attr('id');
        if (closer[id]){
            $('#'+id).slideDown();
            closer[id] = false;
            $(this).html('<i class="fa fa-minus-square-o"></i>');
        } else {
            $('#'+id).slideUp();
            closer[id] = true;
            $(this).html('<i class="fa fa-plus-square-o"></i>');
        }
    });
    
    $.fn.peity.defaults.pie = {
      delimiter: null,
      fill: ["#fff4dd","#ff9900","#ffd592"],
      height: null,
      radius: 8,
      width: null
    }
    
    $.fn.peity.defaults.bar = {
      delimiter: ",",
      fill: ["rgba(36,79,187,0.7)","rgba(255,37,37,0.7)","rgba(30,187,51,0.7)"],
      height: 16,
      min: 0,
      padding: 0.1,
      width: 32
    }
    
    $(".pie").peity("pie");
    $(".bar").peity("bar");
    
    
});
