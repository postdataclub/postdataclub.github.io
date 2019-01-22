$(document).ready(function() { 

$.getJSON("data/referendo.json",function(data){
    
    closer = {};
    
    function setChaptersContent(begin,end){
        var text = '';
        for(var i=begin;i<=end;i++){
            var id = String(i)
            var art = data['constitucion']['articulos'][id];
            text += '<div id="articulo-'+art.id+'" class="article-title"><span class="hidder cursor"><i class="fa fa-minus-square-o"></i></span> Artículo '+art.id+' </div>';
            closer['articulo-'+art.id+'-block'] = false;
            text += '<div id="articulo-'+art.id+'-block" class="article-block">';
            if ('relacionado' in art){
                if (art['modificado']){
                    text+='<div class="related">[<span class="md">modificado</span>';
                    if (art['cambios']['adicion']){text+=' <span class="ad" title="contenido adicionado"><i class="fa fa-plus-circle"></i></span>';}
                    if (art['cambios']['eliminacion']){text+=' <span class="dl" title="contenido eliminado"><i class="fa fa-minus-circle"></i></span>';}
                    if (art['cambios']['redaccion']){text+=' <span class="rd" title="cambios en redaccion"><i class="fa fa-edit"></i></span>';}
                    if (art['cambios']['reubicacion']){text+=' <span class="ru" title="contenido reubicado"><i class="fa fa-rotate-right"></i></span>';}
                    text += '] - ';
                } else {
                    text+= '<div class="related">[<span>no modificado</span>] - ';
                }
                text+='[artículos relacionados en el proyecto:';
                for(var t in art['relacionado']['proyecto']){
                    text+='<a href="proyecto-constitucion.html#art-'+art['relacionado']['proyecto'][t]+'">'+art['relacionado']['proyecto'][t]+'&nbsp;</a>';
                }
                text+=']</div>';
            } else {
                text+='<div class="related">[artículo nuevo]</div>';
            }
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
    
    function setMainContent(){
        var text = '';
        var titles = [];
        for(var i in data['constitucion']['titulos']){
            titles.push(data['constitucion']['titulos'][i]);
        }
        for(var i in titles){
            var content = '<div id="title-'+titles[i].numero+'" class="title-title"><span class="hidder cursor"><i class="fa fa-minus-square-o"></i></span> Título '+titles[i].numero+' - '+titles[i].titulo+' </div>';
            closer['title-'+titles[i].numero+'-block'] = false;
            content += '<div id="title-'+titles[i].numero+'-block" class="title">';
            if ('capitulos' in titles[i]) {
                for(var j in titles[i].capitulos){ 
                    var chap = titles[i].capitulos[j];
                    content += '<div id="capitulo-'+titles[i].numero+'-'+chap.numero+'" class="chapter-title"><span class="hidder cursor"><i class="fa fa-minus-square-o"></i></span> Capítulo '+chap.numero+' - '+chap.titulo+' </div>';
                    closer['capitulo-'+titles[i].numero+'-'+chap.numero+'-block'] = false;
                    content += '<div id="capitulo-'+titles[i].numero+'-'+chap.numero+'-block" class="chapter" >';
                    if ('secciones' in chap){
                        for(var l in chap.secciones){
                            var sec = chap.secciones[l];
                            content += '<div id="seccion-'+titles[i].numero+'-'+chap.numero+'-'+sec.nombre+'" class="section-title"><span class="hidder cursor"><i class="fa fa-minus-square-o"></i></span> Sección '+sec.nombre+' - '+sec.titulo+'</div>';
                            closer['seccion-'+titles[i].numero+'-'+chap.numero+'-'+sec.nombre+'-block'] = false;
                            content += '<div id="seccion-'+titles[i].numero+'-'+chap.numero+'-'+sec.nombre+'-block" class="section">';
                            var arts = setChaptersContent(sec['articulo-inicio'],sec['articulo-fin']);
                            content += arts;
                            content+='</div>';
                        }
                    } else {
                        var arts = setChaptersContent(chap['articulo-inicio'],chap['articulo-fin']);
                        content += arts;
                    }
                    content+='</div>';
                }
            } else {
                var arts = setChaptersContent(titles[i]['articulo-inicio'],titles[i]['articulo-fin']);
                content += arts;
            }
            content+='</div>';
            text +=content;
        }
        return text;
    }
    
    
    function setPreamble(){
        var text='';
        text+= '<div id="preambulo" class="title-title"><span class="hidder cursor"><i class="fa fa-minus-square-o"></i></span> Preámbulo  </div>';
        closer['preambulo-block'] = false;
        text += '<div id="preambulo-block" class="article-block">';
        text +='<div class="related">[<span class="md">modificado</span>  <span class="ad" title="contenido adicionado"><i class="fa fa-plus-circle"></i></span> <span class="dl" title="contenido eliminado"><i class="fa fa-minus-circle"></i></span> <span class="rd" title="cambios en redaccion"><i class="fa fa-edit"></i></span>] - [contenido relacionado en el proyecto: <a href="proyecto-constitucion.html">Preámbulo</a>]</div>';
        for(var i in data['constitucion']['preambulo'].texto){
            text += '<p class="simple-par">'+data['constitucion']['preambulo'].texto[i]+'</p>';
        }
        text += '</div>';
        return text;
    }
    
    
    function setDispositions(){
        var text='';
        text+= '<div id="disposiciones" class="title-title"><span class="hidder cursor"><i class="fa fa-minus-square-o"></i></span> Disposiciones  </div>';
        closer['disposiciones-block'] = false;
        text += '<div id="disposiciones-block" class="title">';
        text+= '<div id="disposiciones-especiales" class="chapter-title"><span class="hidder cursor"><i class="fa fa-minus-square-o"></i></span> Disposiciones Especiales </div>';
        closer['disposiciones-especiales-block'] = false;
        text += '<div id="disposiciones-especiales-block" class="chapter">';
        for(var i in data['constitucion']['disposiciones']['especiales'].elementos){
            var d = data['constitucion']['disposiciones']['especiales'].elementos[i];
            text+= '<div id="disposicion-especial-'+d.id+'" class="section-title"><span class="hidder cursor"><i class="fa fa-minus-square-o"></i></span> '+d.nombre+' </div>';
            closer['disposicion-especial-'+d.id+'-block'] = false;            
            text += '<div id="disposicion-especial-'+d.id+'-block" class="article-block">';
            
            if('relacionado' in data['constitucion']['disposiciones']['especiales'].elementos[i]){
                var t = data['constitucion']['disposiciones']['especiales'].elementos[i]['relacionado']['proyecto'][0];
                 if (data['constitucion']['disposiciones']['especiales'].elementos[i]['modificado']){
                    text+='<div class="related">[<span class="md">modificada</span>';
                    if (data['constitucion']['disposiciones']['especiales'].elementos[i]['cambios']['adicion']){text+=' <span class="ad" title="contenido adicionado"><i class="fa fa-plus-circle"></i></span>';}
                    if (data['constitucion']['disposiciones']['especiales'].elementos[i]['cambios']['eliminacion']){text+=' <span class="dl" title="contenido eliminado"><i class="fa fa-minus-circle"></i></span>';}
                    if (data['constitucion']['disposiciones']['especiales'].elementos[i]['cambios']['redaccion']){text+=' <span class="rd" title="cambios en redaccion"><i class="fa fa-edit"></i></span>';}
                    if (data['constitucion']['disposiciones']['especiales'].elementos[i]['cambios']['reubicacion']){text+=' <span class="ru" title="contenido reubicado"><i class="fa fa-rotate-right"></i></span>';}
                    text += '] - ';
                    
                } else {
                    text+= '<div class="related">[<span>no modificada</span>] -';
                }
                text +='[disposiciones relacionadas en el proyecto: <a href="proyecto-constitucion.html#de-'+t+'">de-'+t+'</a>]</div>';
            } else {
                text+='<div class="related">[disposición nueva]</div>';
            }
            
            for(var j in d.texto){
                text += '<p class="simple-par">'+d.texto[j]+'</p>';
            }
            text+="</div>";
        }
        text+="</div>";
        
        text+= '<div id="disposiciones-transitorias" class="chapter-title"><span class="hidder cursor"><i class="fa fa-minus-square-o"></i></span> Disposiciones Transitorias </div>';
        closer['disposiciones-transitorias-block'] = false;
        text += '<div id="disposiciones-transitorias-block" class="chapter">';
        for(var i in data['constitucion']['disposiciones']['transitorias'].elementos){
            var d = data['constitucion']['disposiciones']['transitorias'].elementos[i];
            text+= '<div id="disposicion-transitoria-'+d.id+'" class="section-title"><span class="hidder cursor"><i class="fa fa-minus-square-o"></i></span> '+d.nombre+' </div>';
            closer['disposicion-transitoria-'+d.id+'-block'] = false;            
            text += '<div id="disposicion-transitoria-'+d.id+'-block" class="article-block">';
            if('relacionado' in data['constitucion']['disposiciones']['transitorias'].elementos[i]){
                var t = data['constitucion']['disposiciones']['transitorias'].elementos[i]['relacionado']['proyecto'][0];
                if (data['constitucion']['disposiciones']['transitorias'].elementos[i]['modificado']){
                    text+='<div class="related">[<span class="md">modificada</span>';
                    if (data['constitucion']['disposiciones']['transitorias'].elementos[i]['cambios']['adicion']){text+=' <span class="ad" title="contenido adicionado"><i class="fa fa-plus-circle"></i></span>';}
                    if (data['constitucion']['disposiciones']['transitorias'].elementos[i]['cambios']['eliminacion']){text+=' <span class="dl" title="contenido eliminado"><i class="fa fa-minus-circle"></i></span>';}
                    if (data['constitucion']['disposiciones']['transitorias'].elementos[i]['cambios']['redaccion']){text+=' <span class="rd" title="cambios en redaccion"><i class="fa fa-edit"></i></span>';}
                    if (data['constitucion']['disposiciones']['transitorias'].elementos[i]['cambios']['reubicacion']){text+=' <span class="ru" title="contenido reubicado"><i class="fa fa-rotate-right"></i></span>';}
                    text += '] - ';
                    
                } else {
                    text+= '<div class="related">[<span>no modificada</span>] -';
                }
                text +='[disposiciones relacionadas en el proyecto: <a href="proyecto-constitucion.html#dt-'+t+'">dt-'+t+'</a>]</div>';
            } else {
                text+='<div class="related">[disposición nueva]</div>';
            }
            
            
            for(var j in d.texto){
                text += '<p class="simple-par">'+d.texto[j]+'</p>';
            }
            text+="</div>";
        }
        text+="</div>";
        
        text+= '<div id="disposiciones-finales" class="chapter-title"><span class="hidder cursor"><i class="fa fa-minus-square-o"></i></span> Disposiciones Finales </div>';
        closer['disposiciones-finales-block'] = false;
        text += '<div id="disposiciones-finales-block" class="chapter">';
        for(var i in data['constitucion']['disposiciones']['finales'].elementos){
            var d = data['constitucion']['disposiciones']['finales'].elementos[i];
            text+= '<div id="disposicion-final-'+d.id+'" class="section-title"><span class="hidder cursor"><i class="fa fa-minus-square-o"></i></span> '+d.nombre+' </div>';
            closer['disposicion-final-'+d.id+'-block'] = false;            
            text += '<div id="disposicion-final-'+d.id+'-block" class="article-block">';
            if('relacionado' in data['constitucion']['disposiciones']['finales'].elementos[i]){
                var t = data['constitucion']['disposiciones']['finales'].elementos[i]['relacionado']['proyecto'][0];
                 if (data['constitucion']['disposiciones']['finales'].elementos[i]['modificado']){
                    text+='<div class="related">[<span class="md">modificada</span>';
                    if (data['constitucion']['disposiciones']['finales'].elementos[i]['cambios']['adicion']){text+=' <span class="ad" title="contenido adicionado"><i class="fa fa-plus-circle"></i></span>';}
                    if (data['constitucion']['disposiciones']['finales'].elementos[i]['cambios']['eliminacion']){text+=' <span class="dl" title="contenido eliminado"><i class="fa fa-minus-circle"></i></span>';}
                    if (data['constitucion']['disposiciones']['finales'].elementos[i]['cambios']['redaccion']){text+=' <span class="rd" title="cambios en redaccion"><i class="fa fa-edit"></i></span>';}
                    if (data['constitucion']['disposiciones']['finales'].elementos[i]['cambios']['reubicacion']){text+=' <span class="ru" title="contenido reubicado"><i class="fa fa-rotate-right"></i></span>';}
                    text += '] - ';
                } else {
                    text+= '<div class="related">[<span>no modificada</span>] -';
                }
                text +='[disposiciones relacionadas en el proyecto: <a href="proyecto-constitucion.html#df-'+t+'">df-'+t+'</a>]</div>';
            } else {
                text+='<div class="related">[disposición nueva]</div>';
            }
            
            for(var j in d.texto){
                text += '<p class="simple-par">'+d.texto[j]+'</p>';
            }
            text+="</div>";
        }
        text+="</div>";
        
        text+="</div>";
        text+="</div>";
        return text;
    }
    
    $('#texto-constitucion').html(setPreamble()+setMainContent()+setDispositions());
    
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
    
});

});
