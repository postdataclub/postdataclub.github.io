$.getJSON("data/constitucion.json",function(data){
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
    return tree;
 }
 
var $indexTree = $('#indice').treeview({
selectedBackColor: '#461A57',
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
         } else {
            set_preamble();
         }  
        }
    } else {
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
    $('#next-art').unbind('click');
    $('#last-art').unbind('click');
    $('#chapter-art').html('');
    $('#section-art').html('');
    $('#art-title').html('Preámbulo');
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
    var page_title = 'Debates sobre el proyecto de Constitución - Preámbulo';
    history.replaceState('debateConstitucion',page_title,window.location.pathname);
    document.title = page_title;
    $('#art-content').html(preambtext);
    var d_id = 'PDClub-201808-1-preambulo';
    var d_url = 'http://www.postdata.club'+window.location.pathname+'#!';
    select_in_index('preambulo');
    reset(d_id,d_url,page_title);
    
 }
 
 function set_disposition(section,number){
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
            $('#next-art').html('');
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
    reset(d_id,d_url,page_title);
 }
 
 function set_article(section,number){
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
            arttext +='<p class="art-inciso">'+incisos[keys[i]]['id']+') ';
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
    $('#art-content').html(arttext);
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
            $('#last-art').html('<i title="Artículo 223" class="glyphicon glyphicon-chevron-left"></i> Art. 223');
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
    reset(d_id,d_url,page_title);
 }
 
 function move_to_debate(){
    $('html,body').animate({'scrollTop':$('#disqus_thread').offset().top-80},'fast');
 }
 
 $('#debate-action').click(function(e){
    move_to_debate();
 });
 
 });
