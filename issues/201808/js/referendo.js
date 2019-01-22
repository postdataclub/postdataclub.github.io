$.getJSON("data/referendo.json",function(data){
    
    closer = {};
    var totalA = 1+229+17;
    var allA =  countChanges(1,229);
    var allE = countChanges('especiales');
    var allT = countChanges('transitorias');
    var allF = countChanges('finales');
    
    function getWords(difference){
        var words = data['palabras'];
        var items = [];
        for(var i in words){
            if (Math.abs(words[i][0]-words[i][1])>=difference){
                items.push([i,words[i][0],words[i][1]]);
            }
        }
        items.sort();
        return items;
    }
    
    c3.generate({
        bindto: "#pie-arts",
        data: {
          columns: [['No modificados',(totalA-(allA.mod+allE.mod+allT.mod+allF.mod+1))],['Modificados solo en redacción',((allA.modr+allE.modr+allT.modr+allF.modr))],['Modificados en contenido',((allA.mod+allE.mod+allT.mod+allF.mod+1)-(allA.modr+allE.modr+allT.modr+allF.modr))]],
          type: 'pie',
            colors: {
                'No modificados': '#fff4dd',
                'Modificados solo en redacción': '#ffd592',
                'Modificados en contenido': '#ff9900'
            }
        },
        tooltip: {
        format:{
            value: function(value,r, id,index) {return value+' artículos'; }            
            }
        }
    });
    
    c3.generate({
        bindto: "#bar-arts",
        data: {
          columns: [['x','Constitución'],['Artículos con adición',(1+allA.add+allE.add+allT.add+allF.add)],['Artículos con eliminación',(1+allA.del+allE.del+allT.del+allF.del)],['Artículos con cambios en redacción',(1+allA.red+allE.red+allT.red+allF.red)]],
          type: 'bar',
          x: 'x',
          colors: {
              'Artículos con adición': 'rgba(36,79,187,0.7)',
              'Artículos con eliminación': 'rgba(255,37,37,0.7)',
              'Artículos con cambios en redacción': 'rgba(30,187,51,0.7)'
          }
        },
         tooltip: {
          grouped: false
        },
         axis: {
          x: {
            label: 'x',
            type: 'categorical',
            show: false
          },
          y: {
            label: 'Número de Artículos',
            position: 'outer-middle',
            show: false,
            max: 247
          }
        }
    });
    
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
    
    function setWords(difference){
        var items = getWords(difference);
        var text = '';
        for(var i=0;i<items.length;i++){
            var lineSytle='';
            if (i%2==0){
                lineSytle = ' odd-line';
            }
            text+='<div class="row word-block'+lineSytle+'">';
            text+='<div class="word-part col-lg-4 col-md-4 col-sm-4 col-xs-4">'+items[i][0]+'</div>';
            text+='<div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">';
            
            text+='<div class="wordsp"><span title="'+items[i][1]+' ocurrencias en el proyecto">';
            for(var j=0;j<items[i][1];j++){
                text+='<i class="fa fa-square"></i>';
            }
            text+='</span></div>';
            
            text+='<div class="wordsc""><span title="'+items[i][2]+' ocurrencias en la constitución">';
            for(var j=0;j<items[i][2];j++){
                text+='<i class="fa fa-square"></i>';
            }
            text+='</span></div>';
            
            text+='</div>';
            text+='</div>';
        }
        return text;
    }
    
    $('#palabras').html(setWords(8));
    
     $('#ocurrences').on('change',function(){
        var val = parseInt($('#ocurrences').val());
        $('#palabras').html(setWords(val));
     });
    
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
    
    function setOneWord(word){
        var text='';
        if (word==''){
            return text;
        }
        if (word in data['palabras']){
            text+='<div class="row word-block odd-line">';
            text+='<div class="word-part col-lg-4 col-md-4 col-sm-4 col-xs-4">'+word+'</div>';
            text+='<div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">';
            
            text+='<div class="wordsp"><span title="'+data['palabras'][word][0]+' ocurrencias en el proyecto">';
            for(var j=0;j<data['palabras'][word][0];j++){
                text+='<i class="fa fa-square"></i>';
            }
            text+='</span></div>';
            
            text+='<div class="wordsc""><span title="'+data['palabras'][word][1]+' ocurrencias en la constitución">';
            for(var j=0;j<data['palabras'][word][1];j++){
                text+='<i class="fa fa-square"></i>';
            }
            text+='</span></div>';
            
            text+='</div>';
            text+='</div>';
            
        } else {
            text+='<div class="main-text bd" style="text-align:center">Esa palabra no tuvo más de 5 ocurrencias o no fue analizada</div>';
        }
        return text;
    }
    $('#search-word').on('keyup',function(){
        var val = $('#search-word').val();
        $('#one-word').html(setOneWord(val));    
    });
    
    $(".pie").peity("pie");
    $(".bar").peity("bar");
    
    
});

$.getJSON("data/matrimonio.json",function(data){ 
    var mats={};
    var unions={};
    var sums={};
    var years = [];
    var ma = [];
    var ua = [];
    var sa = [];
    var mr = {};
    var ur = {};
    for(var i=1989;i<=2018;i++){
        mats[i]=0;
        unions[i]=0;
        sums[i]=0;
        years.push(i);
    }
    for(var i in data.paises){
        if (data.paises[i].matrimonio.aceptado){
            if (data.paises[i].matrimonio.fecha!=null){
                mats[data.paises[i].matrimonio.fecha]+=1;
                if (!data.paises[i]['union-civil'].aceptado){
                    sums[data.paises[i].matrimonio.fecha]+=1;
                }
            }
            if (!(data.paises[i].continente in mr)) {
                mr[data.paises[i].continente] = 1;
            } else {
                mr[data.paises[i].continente] += 1;
            }
        }
        if (data.paises[i]['union-civil'].aceptado){
            if (data.paises[i]['union-civil'].fecha!=null) {
                unions[data.paises[i]['union-civil'].fecha]+=1;
                if (!data.paises[i].matrimonio.aceptado){
                    sums[data.paises[i]['union-civil'].fecha]+=1;
                }
            }
            if (!(data.paises[i].continente in ur)) {
                ur[data.paises[i].continente] = 1;
            } else {
                ur[data.paises[i].continente] += 1;
            }
        }
        if (data.paises[i].matrimonio.aceptado && data.paises[i]['union-civil'].aceptado){
            var mf = 10000;
            if(data.paises[i].matrimonio.fecha!=null){
                mf = data.paises[i].matrimonio.fecha;
            }
            var uf = 10000;
            if(data.paises[i]['union-civil'].fecha!=null){
                mf = data.paises[i]['union-civil'].fecha;
            }
            if (mf>uf){
                sums[uf]+=1;
            } else {
                sums[mf]+=1;
            }
        }
    }
    
    var amr = [];
    var tmr = 0;
    var aur = [];
    var tur = 0;
    
    for(var j in ur){
        if (j in mr) {
            amr.push([j,mr[j]]);
            tmr += mr[j];
        }
        aur.push([j,ur[j]]);
        tur += ur[j];
    }
    
    c3.generate({
        bindto: "#matrimonio-region-graph",
        data: {
          columns: amr,
          type: 'donut',
        },
        donut: {
          title: tmr+" países lo reconocen",
        },
        tooltip: {
        format:{
            value: function(value,r, id,index) {
                if (value==1){
                    return value+' país';
                }
                return value+' países'; }            
            }
        }
      });
      
      c3.generate({
        bindto: "#union-region-graph",
        data: {
          columns: aur,
          type: 'donut',
        },
        donut: {
          title: tur+" países lo reconocen",
        },
        tooltip: {
        format:{
            value: function(value,r, id,index) {
                if (value==1){
                    return value+' país';
                }
                return value+' países'; }            
            }
        }
      });
});

$.getJSON("data/presidentes.json",function(data){ 
    function getKeyInfo(key,continent){
        var periods = {};
        if (continent==null){
            for(var i=0; i< data.jefes.length;i++){
                if (data.jefes[i][key] in periods){
                    periods[data.jefes[i][key]] +=1;
                } else {
                    periods[data.jefes[i][key]]=1;
                }
            }
        } else {
            for(var i=0; i< data.jefes.length;i++){
                if (data.jefes[i].continente==continent) {
                    if (data.jefes[i][key] in periods){
                        periods[data.jefes[i][key]] +=1;
                    } else {
                        periods[data.jefes[i][key]]=1;
                    }
                }
            }
        }
        return periods;
    }
    function setPeriodGraph(periods){
        var c =[];
        var total = 0;
        for(var i in periods){
            var l = i+ ' años';
            if (i=='1'){
                l = '1 año';
            }
            c.push([l,periods[i]]);
            total += periods[i];
        }
         var g = c3.generate({
        bindto: "#period-graph",
        data: {
          columns: c,
          type: 'donut',
        },
        donut: {
          title: total+" países analizados",
        },
        tooltip: {
        format:{
            value: function(value,r, id,index) {
                if (value==1){
                    return value+' país';
                }
                return value+' países'; }            
            }
        }
      });
    }
    
    setPeriodGraph(getKeyInfo('periodo',null));
    
    function setVotoGraph(periods){
        var c =[];
        var total = 0;
        for(var i in periods){
            c.push(['Voto '+i,periods[i]]);
            total += periods[i];
        }
         var g = c3.generate({
        bindto: "#voto-graph",
        data: {
          columns: c,
          type: 'donut',
        },
        donut: {
          title: total+" países analizados",
        },
        tooltip: {
        format:{
            value: function(value,r, id,index) {
                if (value==1){
                    return value+' país';
                }
                return value+' países'; }            
            }
        }
      });
    }
    
    setVotoGraph(getKeyInfo('voto',null));
    
    function setLimitGraph(periods){
        var c =[];
        var total = 0;
        for(var i in periods){
            c.push([i,periods[i]]);
            total += periods[i];
        }
         var g = c3.generate({
        bindto: "#limit-graph",
        data: {
          columns: c,
          type: 'donut',
        },
        donut: {
          title: total+" países analizados ",
        },
        tooltip: {
        format:{
            value: function(value,r, id,index) {
                if (value==1){
                    return value+' país';
                }
                return value+' países'; }            
            }
        }
      });
    }
    setLimitGraph(getKeyInfo('limitacion',null));
    
    
    
    
    $('#period-select').on('change',function(){
        var val = $('#period-select').val();
        if (val=='null'){
            val=null;
        }
        setPeriodGraph(getKeyInfo('periodo',val));
        setVotoGraph(getKeyInfo('voto',val));
        setLimitGraph(getKeyInfo('limitacion',val));
    });
   
}); 


