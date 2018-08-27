var shownotes = false;

function show_notes(){
    $('.nwid').addClass('nw');
    $('.chid').addClass('ch');
    $('.dlid').addClass('dl');
    $('.mvid').addClass('mv');
    $('.reid').addClass('re');
    $('#legend').show();
}

function hide_notes(){
    $('.nwid').removeClass('nw');
    $('.chid').removeClass('ch');
    $('.dlid').removeClass('dl');
    $('.mvid').removeClass('mv');
    $('.reid').removeClass('re');
    $('#legend').hide();
}

function toggle_notes(){
    if (shownotes){
        show_notes();
    } else {
        hide_notes();
    }
 }
 
$('#shownote').on('change',function(){
    shownotes = !shownotes;
    toggle_notes();
});

$.getJSON("data/constitucion.json",function(data){
 $('#debate-action').click(function(e){
    move_to_debate();
 });
 
 function get_preamble_text_dict(){
    var d = {'id':'preambulo','title':'Preámbulo'}
    var text = '';
    for(var i=0;i<data.proyecto.preambulo.texto.length;i++){
        var l = data.proyecto.preambulo.texto[i];
        l = l.toLowerCase();
        l = l.replace(/á/gi,'a');
        l = l.replace(/é/gi,'e');
        l = l.replace(/í/gi,'i');
        l = l.replace(/ó/gi,'o');
        l = l.replace(/ú/gi,'u');
        text+=l+' ';
    }
    d['text'] = text;
    return d;
 }
 
 function get_disp_text_dict(type,id){
    var d = {};
    if (type=='de'){
        d['id']=type+'-'+id;
        d['title']='Disp. Especial '+data.proyecto.disposiciones.especiales.elementos[id].nombre;
        var text = '';
        for(var i=0;i<data.proyecto.disposiciones.especiales.elementos[id].texto.length;i++){
            var l = data.proyecto.disposiciones.especiales.elementos[id].texto[i];
            l = l.toLowerCase();
            l = l.replace(/á/gi,'a');
            l = l.replace(/é/gi,'e');
            l = l.replace(/í/gi,'i');
            l = l.replace(/ó/gi,'o');
            l = l.replace(/ú/gi,'u');
            text+=l +' ';
        }
        d['text'] = text;
    } else if (type=='dt'){
        d['id']=type+'-'+id;
        d['title']='Disp. Transitoria '+data.proyecto.disposiciones.transitorias.elementos[id].nombre;
        var text = '';
        for(var i=0;i<data.proyecto.disposiciones.transitorias.elementos[id].texto.length;i++){
            var l = data.proyecto.disposiciones.transitorias.elementos[id].texto[i];
            l = l.toLowerCase();
            l = l.replace(/á/gi,'a');
            l = l.replace(/é/gi,'e');
            l = l.replace(/í/gi,'i');
            l = l.replace(/ó/gi,'o');
            l = l.replace(/ú/gi,'u');
            text+=l+' ';
        }
        d['text'] = text;
    } else if (type=='df'){
        d['id']=type+'-'+id;
        d['title']='Disp. Final '+data.proyecto.disposiciones.finales.elementos[id].nombre;
        var text = '';
        for(var i=0;i<data.proyecto.disposiciones.finales.elementos[id].texto.length;i++){
            var l = data.proyecto.disposiciones.finales.elementos[id].texto[i];
            l = l.toLowerCase();
            l = l.replace(/á/gi,'a');
            l = l.replace(/é/gi,'e');
            l = l.replace(/í/gi,'i');
            l = l.replace(/ó/gi,'o');
            l = l.replace(/ú/gi,'u');
            text+= l +' ';
        }
        d['text'] = text;
    }
    return d;
 }
 
 function get_art_text_dict(id){
    var d = {"id":'art-'+id,"title":"Artículo "+id};
    var text = '';
    for(var i=0;i<data.proyecto.articulos[id].texto.length;i++){
        var l = data.proyecto.articulos[id].texto[i]; 
        l = l.toLowerCase();
        l = l.replace(/á/gi,'a');
        l = l.replace(/é/gi,'e');
        l = l.replace(/í/gi,'i');
        l = l.replace(/ó/gi,'o');
        l = l.replace(/ú/gi,'u');
        text+= l +' ';
    }
    if ('incisos' in data.proyecto.articulos[id]){
        var incisos = Object.keys(data.proyecto.articulos[id].incisos);
        incisos.sort();
        for(var i=0;i<incisos.length;i++){
            for(var j=0;j<data.proyecto.articulos[id].incisos[incisos[i]].texto.length;j++){
                var l = data.proyecto.articulos[id].incisos[incisos[i]].texto[j]; 
                l = l.toLowerCase();
                l = l.replace(/á/gi,'a');
                l = l.replace(/é/gi,'e');
                l = l.replace(/í/gi,'i');
                l = l.replace(/ó/gi,'o');
                l = l.replace(/ú/gi,'u');
                text+= l+' ';
            }
        }
    }
    if ('texto-final' in data.proyecto.articulos[id]){
        for(var i=0;i<data.proyecto.articulos[id]['texto-final'].length;i++){
            var l = data.proyecto.articulos[id]['texto-final'][i]; 
            l = l.toLowerCase();
            l = l.replace(/á/gi,'a');
            l = l.replace(/é/gi,'e');
            l = l.replace(/í/gi,'i');
            l = l.replace(/ó/gi,'o');
            l = l.replace(/ú/gi,'u');
            text+= l+' ';
        }
    }
    d['text'] = text;
    return d;
 }
 
function get_text_dict() {
    var elems = {};
    var e = get_preamble_text_dict();
    elems[e['id']]=e;
    for(var i=1;i<225;i++){
        var e = get_art_text_dict(i);
        elems[e['id']]=e;
    }
    var e = get_disp_text_dict('de',1);
    elems[e['id']]=e;
    var e = get_disp_text_dict('de',2);
    elems[e['id']]=e;
    for(var i=1;i<14;i++){
        var e = get_disp_text_dict('dt',i);
        elems[e['id']]=e;
    }
    var e = get_disp_text_dict('df',1);
    elems[e['id']]=e;
    var e = get_disp_text_dict('df',2);
    elems[e['id']]=e;
    return elems;
}

 
 function set_select_option(){
    $('#indexselect').append('<option value="preambulo">Preámbulo</option>');
    for(var i=1;i<225;i++){
        $('#indexselect').append('<option value="art-'+i+'">Artículo '+i+'</option>');
    }
    $('#indexselect').append('<option value="de-1">Disp. Especial 1</option>');
    $('#indexselect').append('<option value="de-2">Disp. Especial 2</option>');
    for(var i=1;i<14;i++){
        $('#indexselect').append('<option value="dt-'+i+'">Disp. Transitoria '+i+'</option>');
    }
    $('#indexselect').append('<option value="df-1">Disp. Final 1</option>');
    $('#indexselect').append('<option value="df-2">Disp. Final 2</option>');
    $('#indexselect').append('<option value="cg">Cuestiones generales</option>');
 }
 set_select_option();
 $('#indexselect').on('change',function(){
    var val = $('#indexselect').val();
    if (val=='preambulo'){
        set_preamble();
    }else if (val.startsWith('art')){
        var p = val.split('-');
        set_article(p[0],p[1]);
    }else if (val.startsWith('d')){
        var p = val.split('-');
        set_disposition(p[0],p[1]);
    } else if (val=="cg"){
        set_general_issues();
    }
 });
 
 
 var count = -1;
 var k_nid = {};
 function get_tree(){
    count++;
    var tree = [
      {
        text: "Preámbulo",
        tid: "preambulo",
      }
    ];
    k_nid['preambulo']=count;
    var _keys = Object.keys(data.proyecto.titulos);
    var keys = [];
    for(var i=0;i<_keys.length;i++){
        keys.push(parseInt(_keys[i]));
    }
    keys.sort();
    var titulos = data.proyecto.titulos;
    for(var i=1;i<keys.length+1;i++){
        var titulo = {};
        titulo['text']=titulos[i].titulo;
        titulo['tid']='art-'+titulos[i]['articulo-inicio'];
        count++;
        if ('capitulos' in titulos[i]){
            var caps = [];
            var capitulos= titulos[i].capitulos;
            var ckeys= Object.keys(titulos[i].capitulos);
            ckeys.sort();
            for(var j=0;j<ckeys.length;j++){
                count++;
                var n ={};
                n['text']=capitulos[ckeys[j]].titulo;
                n['tid']='art-'+capitulos[ckeys[j]]['articulo-inicio'];
                if ('secciones' in capitulos[ckeys[j]]){
                    var secciones = capitulos[ckeys[j]].secciones;
                    var skeys = Object.keys(secciones);
                    skeys.sort();
                    var arts = [];
                    for(var k=0;k<skeys.length;k++){
                        count++;
                        var m = {};
                        m['text']=secciones[skeys[k]].titulo;
                        m['tid']='art-'+secciones[skeys[k]]['articulo-inicio'];
                        var sarts = [];
                        for(var v=secciones[skeys[k]]['articulo-inicio'];v<secciones[skeys[k]]['articulo-fin']+1;v++){
                            count++;
                            var w = {};
                            w['text'] = 'Articulo '+v;
                            w['tid'] = 'art-'+v;
                            k_nid['art-'+v]=count;
                            sarts.push(w);
                        }
                        m['nodes']=sarts;
                        arts.push(m);
                    }
                    n['nodes']=arts;
                } else {
                    var arts = [];
                    for(var k=capitulos[ckeys[j]]['articulo-inicio'];k<capitulos[ckeys[j]]['articulo-fin']+1;k++){
                        count++;
                        var m = {};
                        m['text']='Artículo '+k;
                        m['tid']='art-'+k;
                        k_nid['art-'+k] = count;
                        arts.push(m);
                    }
                    n['nodes']=arts;
                }
                caps.push(n);
            }
            titulo['nodes'] = caps;
        } else {
            var arts = [];
            for(var j=titulos[i]['articulo-inicio'];j<titulos[i]['articulo-fin']+1;j++){
                count++;
                var n = {};
                n['text']='Artículo '+j;
                n['tid']='art-'+j;
                k_nid['art-'+j] = count;
                arts.push(n);
            }
            titulo['nodes'] = arts;
        }
        tree.push(titulo);
    }
    var dispe ={text:'Disposiciones Especiales',tid:'de-1'};
    count++;
    var enodes = [];
    for(var i=1;i<3;i++){
        count++;
        var n = {};
        n['text'] =data.proyecto.disposiciones.especiales.elementos[i].nombre;
        n['tid'] = 'de-'+data.proyecto.disposiciones.especiales.elementos[i].orden;
        k_nid[n['tid']]=count;
        enodes.push(n);
    }
    dispe['nodes'] = enodes;
    tree.push(dispe);
    var dispt ={text:'Disposiciones Transitorias',tid:'dt-1'};
    count++;
    var tnodes = [];
    for(var i=1;i<14;i++){
        count++;
        var n = {};
        n['text'] =data.proyecto.disposiciones.transitorias.elementos[i].nombre;
        n['tid'] = 'dt-'+data.proyecto.disposiciones.transitorias.elementos[i].orden;
        k_nid[n['tid']]=count;
        tnodes.push(n);
    }
    dispt['nodes'] = tnodes;
    tree.push(dispt);
    var dispf ={text:'Disposiciones Finales',tid:'df-1'};
    count++;
    var fnodes = [];
    for(var i=1;i<3;i++){
        count++;
        var n = {};
        n['text'] =data.proyecto.disposiciones.finales.elementos[i].nombre;
        n['tid'] = 'df-'+data.proyecto.disposiciones.finales.elementos[i].orden;
        k_nid[n['tid']]=count;
        fnodes.push(n);
    }
    dispf['nodes'] = fnodes;
    tree.push(dispf);
    count++;
    tree.push({text: "Cuestiones Generales", tid:'cg'});
    k_nid['cg']=count;
    return tree;
 }
 
var $indexTree = $('#indice').treeview({
selectedBackColor: '#461A57',
backColor: "#F1F1F1",
onhoverColor: "#EDF2F5",
showBorder:false,data: get_tree()});
$indexTree.on('nodeSelected', function(event, data) {
     if ('tid' in data){
         if (data.tid=='preambulo'){
             set_preamble();
         }
         if(data.tid.startsWith('art-')){
            var d = data.tid.split('-');
            set_article(d[0],d[1]);
         }
         if(data.tid.startsWith('de-')){
            var d = data.tid.split('-');
            set_disposition(d[0],d[1]);
         }
         if(data.tid.startsWith('dt-')){
            var d = data.tid.split('-');
            set_disposition(d[0],d[1]);
         }
         if(data.tid.startsWith('df-')){
            var d = data.tid.split('-');
            set_disposition(d[0],d[1]);
         }
         if (data.tid=='cg'){
            set_general_issues();
         }
     }
});

 function set_correct_url(){
    var hash = window.location.hash;
    hash = hash.replace('!','');
    var params = hash.split('#');
    if (params.length>=2){
        var p = params[1].split("-");
        if ((p.length==2)&&(p[0]=='art')&&(p[1]>0)&&(p[1]<225)){
            set_article(p[0],p[1]);
        } else {
         if ( (p.length==2)&&( ( (p[0]=='de')&&((p[1]>0)&&(p[1]<3)) ) || ((p[0]=='dt')&&((p[1]>0)&&(p[1]<14)) )|| ( ((p[0]=='df')&&((p[1]>0)&&(p[1]<3)) ) ) )){
            set_disposition(p[0],p[1]);
         } else if (params[1]=="cuestionesgenerales"){
            set_general_issues();
         } else {
            set_preamble();
         }  
        }
    }     else {
        set_preamble();
    }
 }
 set_correct_url();
 
 
 
 function get_art_heads(number){
    var title = '';
    var chapter = '';
    var section = '';
    var titulos = data.proyecto.titulos; 
    for(var i in titulos){
        if ((number>=titulos[i]['articulo-inicio'])&&(number<=titulos[i]['articulo-fin'])){
            title = 'Título '+titulos[i]['numero']+': '+titulos[i]['titulo'];
            if ('capitulos' in titulos[i]){
                var capitulos = data.proyecto.titulos[i].capitulos;
                for(var j in capitulos){
                    if ((number>=capitulos[j]['articulo-inicio'])&&(number<=capitulos[j]['articulo-fin'])){
                        chapter = 'Capítulo '+capitulos[j]['numero']+': '+capitulos[j].titulo;
                        if ('secciones' in capitulos[j]){
                            var secciones = data.proyecto.titulos[i].capitulos[j].secciones;
                            for(var k in secciones){
                                if ((number>=secciones[k]['articulo-inicio'])&&(number<=secciones[k]['articulo-fin'])){
                                    section = 'Sección '+secciones[k].nombre+': '+secciones[k].titulo;
                                    break;
                                }
                            }
                        }
                        break;
                    }
                }
            }
            break;
        }
    }
    return [title,chapter,section];
 }
 
 function select_in_index(id){
    $('#indice').treeview('selectNode', [ k_nid[id], { silent: true } ]);
    $('#indice').treeview('collapseAll', { silent: true });
    $('#indice').treeview('revealNode', [ k_nid[id], { silent: true } ]);
    $('html,body').animate({'scrollTop':0},'fast');
 }
 
 function set_preamble(){
    $('#debate-action').html('Debate el Preámbulo');
    $('#indexselect').val("preambulo");
    $('#next-art').unbind('click');
    $('#last-art').unbind('click');
    $('#chapter-art').html('');
    $('#section-art').html('');
    $('#art-title').html('Preámbulo');
    $('#related-title').html('Const. Actual - Preámbulo');
    $('#comment-header').html("Debate sobre el Preámbulo");
    $('#next-art').html('<i title="Artículo 1" class="glyphicon glyphicon-chevron-right"></i>');
    $('#next-art').click(function(e){
        e.preventDefault();
        set_article('art',1);
    });
    $('#last-art').html('');
    $('#title-art').html('');
    var preambtext = '';
    for(var i =0;i<data.proyecto.preambulo.texto.length;i++){
        preambtext += '<p  class="art-texto">'+data.proyecto.preambulo.texto[i]+'</p>';
    }
    var reltext = '';
    for(var i =0;i<data.actual.preambulo.texto.length;i++){
        reltext += '<p  class="art-texto">'+data.actual.preambulo.texto[i]+'</p>';
    }
    var page_title = 'Debates sobre el proyecto de Constitución - Preámbulo';
    history.replaceState('debateConstitucion',page_title,window.location.pathname);
    document.title = page_title;
    $('#art-content').html(preambtext);
    $('#art-related').html(reltext);
    var d_id = 'PDClub-201808-1-preambulo';
    var d_url = 'http://www.postdata.club'+window.location.pathname+'#!';
    select_in_index('preambulo');
    //reset(d_id,d_url,page_title);
    toggle_notes();
 }
 
 function set_general_issues(){
    $('#debate-action').html('Debate sobre Cuestiones Generales');
    $('#indexselect').val("cg");
    $('#next-art').unbind('click');
    $('#last-art').unbind('click');
    $('#chapter-art').html('');
    $('#section-art').html('');
    $('#art-title').html('Cuestiones Generales');
    $('#comment-header').html("Debate sobre Cuestiones Generales");
    $('#next-art').html('');
    $('#last-art').html('<i title="Disposición Final 2" class="glyphicon glyphicon-chevron-left"></i>');
    $('#last-art').click(function(e){
        e.preventDefault();
        set_disposition('df',2);
    });
    $('#title-art').html('');
    var preambtext = '<p class="art-texto"> Este acápite no forma parte del texto del proyecto constitucional pero es el espacio para debatir sobre cuestiones general o realizar propuestas que no esté contenidas o relacionadas con los artículos o acápites presentes en el texto del proyecto de Carta Magna.</p>';
    var page_title = 'Debates sobre el proyecto de Constitución - Cuestiones Generales y Otras Propuestas';
    history.replaceState('debateConstitucion',page_title,window.location.pathname+'#cuestionesgenerales');
    document.title = page_title;
    $('#art-content').html(preambtext);
    var d_id = 'PDClub-201808-1-cgen';
    var d_url = 'http://www.postdata.club'+window.location.pathname+'#!cuestionesgenerales';
    select_in_index('cg');
    $('#related-title').html('');
    $('#art-related').html('<p  class="art-texto main-text bd">No hay cuestiones generales relacionadas en el texto de la constitución vigente</p>');
    //reset(d_id,d_url,page_title);
    toggle_notes();
 }
 
 function set_disposition(section,number){
    $('#debate-action').html('Debate esta disposición');
    $('#indexselect').val(section+'-'+number);
    select_in_index(section+'-'+number);
    $('#next-art').unbind('click');
    $('#last-art').unbind('click');
    $('#chapter-art').html('');
    $('#section-art').html('');
    var disptext = '';
    var disp = 'Especial ';
    var disposiciones = data.proyecto.disposiciones;
    if (section == 'de'){
        
        $('#title-art').html('Disposiciones Especiales');
        $('#art-title').html(disposiciones.especiales.elementos[number].nombre);
        $('#comment-header').html("Debate sobre la Disposición Especial "+disposiciones.especiales.elementos[number].nombre);
        for(var i=0;i<disposiciones.especiales.elementos[number].texto.length;i++){
            disptext += '<p  class="art-texto">'+disposiciones.especiales.elementos[number].texto[i]+'</p>';
        }
        if (number==1){
            $('#next-art').html('<i title="Disposición Especial 2" class="glyphicon glyphicon-chevron-right"></i>');
            $('#next-art').click(function(e){
                e.preventDefault();
                set_disposition('de',2);
            });
            $('#last-art').html('<i title="Artículo 224" class="glyphicon glyphicon-chevron-left"></i>');
            $('#last-art').click(function(e){
                e.preventDefault();
                set_article('art',224);
            });
        } else {
            $('#next-art').html('<i title="Disposición Transitoria 1"class="glyphicon glyphicon-chevron-right"></i>');
            $('#next-art').click(function(e){
                e.preventDefault();
                set_disposition('dt',1);
            });
            $('#last-art').html('<i title="Disposición Especial 1" class="glyphicon glyphicon-chevron-left"></i>');
            $('#last-art').click(function(e){
                e.preventDefault();
                set_disposition('de',1);
            });
        }
    }
    if (section == 'dt'){disp = 'Transitoria ';
        $('#title-art').html('Disposiciones Transitorias');
        $('#art-title').html(disposiciones.transitorias.elementos[number].nombre);
        $('#comment-header').html("Debate sobre la Disposición Transitoria "+disposiciones.transitorias.elementos[number].nombre);
        for(var i=0;i<disposiciones.transitorias.elementos[number].texto.length;i++){
            disptext += '<p  class="art-texto">'+disposiciones.transitorias.elementos[number].texto[i]+'</p>';
        }
        if (number==1){
            $('#next-art').html('<i title="Disposición Transitoria 2" class="glyphicon glyphicon-chevron-right"></i>');
            $('#next-art').click(function(e){
                e.preventDefault();
                set_disposition('dt',2);
            });
            $('#last-art').html('<i title=""Disposición Especial 1 class="glyphicon glyphicon-chevron-left"></i>');
            $('#last-art').click(function(e){
                e.preventDefault();
                set_disposition('de',2);
            });
        } else {
            if (number ==13){
                $('#next-art').html('<i title="Disposición Final 1" class="glyphicon glyphicon-chevron-right"></i>');
                $('#next-art').click(function(e){
                    e.preventDefault();
                    set_disposition('df',1);
                });
                $('#last-art').html('<i title="Disposición Transitoria 12" class="glyphicon glyphicon-chevron-left"></i>');
                $('#last-art').click(function(e){
                    e.preventDefault();
                    set_disposition('dt',12);
                });
            } else {
                $('#next-art').html('<i title="Disposición Transitoria '+(parseInt(number)+1)+'" class="glyphicon glyphicon-chevron-right"></i>');
                $('#next-art').click(function(e){
                    e.preventDefault();
                    set_disposition('dt',parseInt(number)+1);
                });
                $('#last-art').html('<i title="Disposición Transitoria '+(parseInt(number)-1)+'"  class="glyphicon glyphicon-chevron-left"></i>');
                $('#last-art').click(function(e){
                    e.preventDefault();
                    set_disposition('dt',parseInt(number)-1);
                });
            }      
        }
        
    }
    if (section == 'df'){disp = 'Final ';
        $('#title-art').html('Disposiciones Finales');
        $('#art-title').html(disposiciones.finales.elementos[number].nombre);
        $('#comment-header').html("Debate sobre la Disposición Final "+disposiciones.finales.elementos[number].nombre);
        for(var i=0;i<disposiciones.finales.elementos[number].texto.length;i++){
            disptext += '<p  class="art-texto">'+disposiciones.finales.elementos[number].texto[i]+'</p>';
        }
        if (number==1){
            $('#next-art').html('<i title="Disposición Final 2" class="glyphicon glyphicon-chevron-right"></i>');
            $('#next-art').click(function(e){
                e.preventDefault();
                set_disposition('df',2);
            });
            $('#last-art').html('<i title="Disposición Transitoria 13" class="glyphicon glyphicon-chevron-left"></i>');
            $('#last-art').click(function(e){
                e.preventDefault();
                set_disposition('dt',13);
            });
        } else {
             $('#next-art').html('<i title="Cuestiones Generales" class="glyphicon glyphicon-chevron-right"></i>');
            $('#next-art').click(function(e){
                e.preventDefault();
                set_general_issues();
            });
            $('#last-art').html('<i  title="Disposición Final 1" class="glyphicon glyphicon-chevron-left"></i>');
            $('#last-art').click(function(e){
                e.preventDefault();
                set_disposition('df',1);
            });
        }
    }
    var page_title = 'Debates sobre el proyecto de Constitución - Disposición '+disp+number;
    history.replaceState('debateConstitucion',page_title,window.location.pathname+'#'+section+'-'+number);
    document.title = page_title;
    $('#art-content').html(disptext);
    var d_id = 'PDClub-201808-1-'+section+'-'+number;
    var d_url = 'http://www.postdata.club'+window.location.pathname+'#!'+section+'-'+number;
    $('#related-title').html('');
    $('#art-related').html('<p  class="art-texto main-text bd">No existe ninguna disposición relacionada en el texto de la constitución vigente</p>');
    //reset(d_id,d_url,page_title);
    toggle_notes();
 }
 
 function set_article(section,number){
    $('#debate-action').html('Debate este artículo');
    $('#indexselect').val(section+'-'+number);
    select_in_index(section+'-'+number);
    history.replaceState('debateConstitucion','Debates sobre el proyecto de Constitución - Artículo '+number,window.location.pathname+'#'+section+'-'+number);
    var page_title = 'Debates sobre el proyecto de Constitución - Artículo '+number;
    var d_id = 'PDClub-201808-1-articulo-'+number;
    var d_url = 'http://www.postdata.club'+window.location.pathname+'#!'+section+'-'+number;
    document.title = page_title;
    $('#art-title').html('Artículo '+number);
    $('#comment-header').html("Debate sobre el Artículo "+number);
    var arttext = '';
    var paragraphs = data.proyecto.articulos[number].texto;
    for(var i=0;i<paragraphs.length;i++){
        arttext +='<p  class="art-texto">'+paragraphs[i]+'</p>';
    }
    
    if ('incisos' in data.proyecto.articulos[number]){
        var incisos = data.proyecto.articulos[number].incisos;
        var keys = Object.keys(incisos);
        keys.sort();
        for(var i=0;i<keys.length;i++){
            arttext +='<p class="art-inciso"><span class="it">'+incisos[keys[i]]['id']+')</span> ';
            for(var j=0;j<incisos[keys[i]].texto.length;j++){
                arttext+=incisos[keys[i]].texto[j]+'<br>';
            }
            arttext +='</p>';
        }
    }
    
    if ('texto-final' in data.proyecto.articulos[number]){
        var paragraphs = data.proyecto.articulos[number]['texto-final'];
        for(var i=0;i<paragraphs.length;i++){
            arttext +='<p  class="art-texto">'+paragraphs[i]+'</p>';
        }    
    }
    var reltext='';
    if ('relacionado' in data.proyecto.articulos[number]){
        if (data.proyecto.articulos[number].relacionado['1976'].length>1){
            var t = 'Const. Actual - Artículos ';
            for(var k=0;k<data.proyecto.articulos[number].relacionado['1976'].length;k++){
                var l = data.proyecto.articulos[number].relacionado['1976'][k].split('-')[0];
                t+=l+' ';
            }
            $('#related-title').html(t);
        } else {
            $('#related-title').html('Const. Actual - Artículo '+ data.proyecto.articulos[number].relacionado['1976'][0].split('-')[0]);
        }
        for(var j=0;j<data.proyecto.articulos[number].relacionado['1976'].length;j++){
            var rnumber = data.proyecto.articulos[number].relacionado['1976'][j];

            if (data.proyecto.articulos[number].relacionado['1976'].length>1){
                reltext +='<p  class="art-texto bd">Artículo '+rnumber+'</p>';
            }
            var paragraphs = data.actual[rnumber].texto;
            for(var i=0;i<paragraphs.length;i++){
                reltext +='<p  class="art-texto">'+paragraphs[i]+'</p>';
            }
            
            if ('incisos' in data.actual[rnumber]){
                var incisos = data.actual[rnumber].incisos;
                var keys = Object.keys(incisos);
                keys.sort();
                for(var i=0;i<keys.length;i++){
                    reltext +='<p class="art-inciso"><span class="it">'+incisos[keys[i]]['id']+')</span> ';
                    for(var j=0;j<incisos[keys[i]].texto.length;j++){
                        reltext+=incisos[keys[i]].texto[j]+'<br>';
                    }
                    reltext +='</p>';
                }
            }
            
            if ('texto-final' in data.actual[rnumber]){
            var paragraphs = data.actual[rnumber]['texto-final'];
            for(var i=0;i<paragraphs.length;i++){
                reltext +='<p  class="art-texto">'+paragraphs[i]+'</p>';
            } 
        }
    }
        
    } else {
        $('#related-title').html('');
        reltext = '<p  class="art-texto main-text bd">No pudimos encontrar artículos relacionados en el texto de la constitución vigente. Si identifica alguno, comente para conocerlo e incorporarlo.</p>';
    }
    
    $('#art-content').html(arttext);
    $('#art-related').html(reltext);
    var breads = get_art_heads(number);
    $('#title-art').html(breads[0]);
    $('#chapter-art').html(breads[1]);
    $('#section-art').html(breads[2]);
    
    $('#next-art').unbind('click');
    $('#last-art').unbind('click');
    if (number==1){
        $('#next-art').html('<i title="Artículo 2" class="glyphicon glyphicon-chevron-right"></i>');
        $('#next-art').click(function(e){
            e.preventDefault();
            set_article(section,2);
        });
        $('#last-art').html('<i title="Preámbulo" class="glyphicon glyphicon-chevron-left"></i>');
        $('#last-art').click(function(e){
            e.preventDefault();
            set_preamble();
        });
    } else {
        if (number==224){
            $('#next-art').html('<i title="Disposición Especial 1" class="glyphicon glyphicon-chevron-right"></i>');
            $('#next-art').click(function(e){
                e.preventDefault();
                set_disposition('de',1);
            });
            $('#last-art').html('<i title="Artículo 223" class="glyphicon glyphicon-chevron-left"></i>');
            $('#last-art').click(function(e){
                e.preventDefault();
                set_article(section,223);
            });
        } else {
            $('#next-art').html('<i title="Artículo '+(parseInt(number)+1)+'" class="glyphicon glyphicon-chevron-right"></i>');
            $('#next-art').click(function(e){
                e.preventDefault();
                set_article(section,parseInt(number)+1);
            });
            $('#last-art').html('<i title="Artículo '+(parseInt(number)-1)+'" class="glyphicon glyphicon-chevron-left"></i>');
            $('#last-art').click(function(e){
                e.preventDefault();
                set_article(section,parseInt(number)-1);
            });
        }
    }
    //reset(d_id,d_url,page_title);
    toggle_notes();
 }
 
 function move_to_debate(){
    $('html,body').animate({'scrollTop':$('#disqus_thread').offset().top-80},'fast');
 }
 
 $('#show-related').click(function(e){
    show_related();
 });
 
 $('#close-related').click(function(e){
    close_related();
 });
 
 
 function show_related(){
    $('#project-title').addClass('col-lg-6');
    $('#project-title').addClass('col-md-6');
    $('#project-title').removeClass('col-lg-12');
    $('#project-title').removeClass('col-md-12');
    $('#project').show();
    $('#title-related').addClass('col-lg-6');
    $('#title-related').addClass('col-md-6');
    $('#title-related').removeClass('hidden-lg');
    $('#title-related').removeClass('hidden-md');
    
    $('#art-content').addClass('col-lg-6');
    $('#art-content').addClass('col-md-6');
    $('#art-content').removeClass('col-lg-12');
    $('#art-content').removeClass('col-md-12');
    $('#art-related').addClass('col-lg-6');
    $('#art-related').addClass('col-md-6');
    $('#art-related').removeClass('hidden-lg');
    $('#art-related').removeClass('hidden-md');
    
    $('#show-related').hide();
    $('#close-related').show();
    $('#dl-legend').show();
    $('#re-legend').show();
 }
 
 function close_related(){
    $('#project-title').removeClass('col-lg-6');
    $('#project-title').removeClass('col-md-6');
    $('#project-title').addClass('col-lg-12');
    $('#project-title').addClass('col-md-12');
    $('#project').hide();
    $('#title-related').removeClass('col-lg-6');
    $('#title-related').removeClass('col-md-6');
    $('#title-related').addClass('hidden-lg');
    $('#title-related').addClass('hidden-md');
    
    $('#art-content').removeClass('col-lg-6');
    $('#art-content').removeClass('col-md-6');
    $('#art-content').addClass('col-lg-12');
    $('#art-content').addClass('col-md-12');
    $('#art-related').removeClass('col-lg-6');
    $('#art-related').removeClass('col-md-6');
    $('#art-related').addClass('hidden-lg');
    $('#art-related').addClass('hidden-md');
    
    $('#close-related').hide();
    $('#show-related').show();
    $('#dl-legend').hide();
    $('#re-legend').hide();
 }
 
 $('#close-related').click(function(e){
    close_related();
 });
 
 
//Search part
 
 tdict = get_text_dict();
 
 
 var idx = lunr(function () {
  this.use(lunr.es);
  this.pipeline.remove(lunr.es.stemmer);
  this.searchPipeline.remove(lunr.es.stemmer);
  this.ref('id');
  this.field('text');
  var tkeys = Object.keys(tdict);
  for(var i=0;i<tkeys.length;i++){
     this.add(tdict[tkeys[i]]);
  }
});
 
 
 $('#hs1').click(function(e){
    $('#searchresults').slideUp();
 });
 
 $('#hs2').click(function(e){
    $('#searchresults').slideUp();
 });
 
 function saction(){
    var t = $('#searchtext').val().trim();
    if (t!=''){
        t = t.toLowerCase();
        t = t.replace(/á/gi,'a');
        t = t.replace(/é/gi,'e');
        t = t.replace(/í/gi,'i');
        t = t.replace(/ó/gi,'o');
        t = t.replace(/ú/gi,'u');
        var r = idx.search(t);
        if (r.length!=0){
            var text ='';
            if (r.length==1){
                text += '<p id="searchtotal" class="bd">1 acápite relacionado con la búsqueda</p>';
            } else{
                text += '<p id="searchtotal" class="bd">'+r.length+' acápites relacionados con la búsqueda</p>';
            }
            for(var i=0;i<r.length;i++){
                var ref = r[i]['ref'];
                text+='<p id="'+ref+'-s" class="cursor" >'+tdict[ref]['title']+'</p>';
            }
            $('#searchitems').html(text);
            for(var j=0;j<r.length;j++){
                var ref = r[j]['ref'];
                if (ref.startsWith('pre')) {
                    $('#'+ref+'-s').click(function(){set_preamble();$('#searchresults').slideUp();});
                }
                if (ref.startsWith('d')){
                    $('#'+ref+'-s').click(function(){
                        var id=$(this)[0].id; 
                        var p = id.split('-'); 
                        set_disposition(p[0],p[1]);
                        $('#searchresults').slideUp();
                    });
                }  
                if (ref.startsWith('art')){
                    $('#'+ref+'-s').click(function(){
                        var id=$(this)[0].id; 
                        var p = id.split('-'); 
                        set_article(p[0],p[1]); 
                        $('#searchresults').slideUp();
                    });
                } 
            }
        } else {
            $('#searchitems').html('<p id="nosearch" class=" bd">No hay resultados disponibles para esa búsqueda</p>');
        }
        $('#searchresults').slideDown();
    }
 }
 
 $('#searchaction').click(function(e){
    saction();
 });
 
 });
