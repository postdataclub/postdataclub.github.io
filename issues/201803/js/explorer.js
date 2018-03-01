scrollpos = 0;
showbio = false;
sitem = 0;
pitem = 0;

fyoung = {'value':19,'marked':false};
fold = {'value':94,'marked':false};
fvalues = {
    'sex' : {'value':'none','marked':false},
    'class' : {'value':'none','marked':false},
    'pcc' : {'value':'none','marked':false},
    'ujc' : {'value':'none','marked':false},
    'ctc' : {'value':'none','marked':false},
    'anap' : {'value':'none','marked':false},
    'acrc' : {'value':'none','marked':false}
}

collapsed= {
    "put-filter-block":true,
    "set-filter-block":true
};

if ($('body').width()>990){
    collapsed['set-filter-block'] = false;
    $('#set-filter-block').show();
}

set_values = {
    'province': 'none',
    'municipality': 'none',
    'class': 'none',
    'sex':'none',
    'pcc':'none',
    'ujc':'none',
    'ctc':'none',
    'anap':'none',
    'acrc':'none',
    'young':19,
    'old':94
}

put_values={
    "young":{'value':19,"valid":true},
    "old":{'value':94,"valid":true},
    "sex":{'value':'none',"valid":true},
    "class":{'value':'none',"valid":true},
    "pcc":{'value':'none',"valid":true},
    "ujc":{'value':'none',"valid":true},
    "ctc":{'value':'none',"valid":true},
    "anap":{'value':'none',"valid":true},
    "acrc":{'value':'none',"valid":true},
};

$.getJSON("data/candidatos.json",function(data){
    function dict_criteria(a,b){
        return a['list_id']-b['list_id'];        
    }
    function simple_criteria(a,b){return a-b;}
    cands = [];
    psetup = [];
    psetdown = [];
    for(var i in data){
        for(var j  in data[i]){
            for(var k in data[i][j]){
                var c = data[i][j][k];
                c['provincia']=i;
                c['municipio']=j;
                cands.push(c);
            }
        }
    }
    cands.sort(dict_criteria);
    for(var i in cands){
        psetup.push(cands[i]['list_id']);
    }
    
    for(var i in cands){
        var c = cands[i];
        if (c['sexo']=='f'){
            $('#set-up').append('<span id="c'+c['list_id']+'" class="candidate cursor popup" title="'+c['nombre']+'"><i id="i'+c['list_id']+'" class="fa fa-female viz-text cursor ci" ></i></span>')
        } else {
            $('#set-up').append('<span id="c'+c['list_id']+'" class="candidate cursor popup" title="'+c['nombre']+'"><i id="i'+c['list_id']+'" class="fa fa-male viz-text cursor ci" ></i></span>')
        }
    }
    
    provs = ['Pinar del Río','Artemisa',"Mayabeque","La Habana","Matanzas","Cienfuegos","Villa Clara","Sancti Spíritus",
    "Ciego de Ávila","Camagüey","Las Tunas","Holguín","Granma","Santiago de Cuba","Guantánamo","Municipio Especial"];
    for (var i in provs){
        $('#province-select').append('<option value="'+provs[i]+'">'+provs[i]+'</option>');
    }
     
    function change_slabels(last,actual,iid,text){
        if (last!='none') {
            if(last!=actual){
                    if(actual!='none'){
                        $('#'+iid).html(text);
                    } else {
                        sitem -=1;
                        $('#'+iid).detach();
                        if (sitem==0){
                            $('#set-item-all').show();
                        } 
                    }
            } 
        } else {
            if (actual!='none') {
                sitem +=1;
                if (sitem==1){
                    $('#set-item-all').hide();
                } 
                $('#set-label-block').append('<span id="'+iid+'" class="sitem">'+text+"</span>");
            } else {
                sitem -=1;
                $('#'+iid).detach();
                if (sitem==0){
                    $('#set-item-all').show();
                } 
            }
        }
    }
    
    function change_slabels_age(y,o){
        if ((y!=19)||(o!=94)){
            if((set_values.young==19)&&(set_values.old==94)){
                sitem+=1;
                if (sitem==1){
                        $('#set-item-all').hide();
                }
                $('#set-label-block').append('<span id="set-item-age" class="sitem">de '+y+' a '+o+' años</span>');
            } else {
                $('#set-item-age').html("de "+y+" a "+o+" años");
            }
        } else {
            if($('#set-label-block').find('#set-item-age').length!=0){
                sitem -=1;
                if (sitem==0){
                    $('#set-item-all').show();
                }
                $('#set-item-age').detach();
            }
        }
    }
     
     $('#province-select').on('change',function(){
        var prov = $('#province-select').val();
        if ($('#municipality-select').val()!='none'){
            $('#municipality-select').val('none');
            $('#municipality-select').change();
        }
        $('#municipality-select').html('<option value="none" selected="selected">Todos</option>');
        if (prov!='none') {
            $('#municipality-select').prop('disabled',false);
            if (prov=='Municipio Especial'){
                $('#municipality-select').html('<option value="none">Todos</option> <option value="Isla de la Juventud" selected="selected">Isla de la Juventud</option>');
            }else {
                muns = Object.keys(data[prov]);
                muns.sort();
                for(var m in muns){
                    $('#municipality-select').append('<option value="'+muns[m]+'">'+muns[m]+'</option>');
                }
            }
        } else{
           $('#municipality-select').prop('disabled',true); 
        }
        
        change_slabels(set_values.province,prov,'set-item-prov','de '+prov);
        if (prov=='Municipio Especial'){
           $('#municipality-select').change(); 
        }
        set_values.province = prov;
        show_set();
     });
     
     
     
     $('#age-set-young').on('change focusout',function(e){
            var val = $('#age-set-young').val();
            maxval =  parseInt($('#age-set-young').prop('max'));
            maxpval =  parseInt(put_values['young']['value']);
            if (val<19){
                $('#age-set-young').val(19);
            } 
            else {
                if (val>maxval){
                    $('#age-set-young').val(maxval);
                } 
                else {
                    $('#age-set-old').prop('min',val);
                    if (val>=maxpval){
                        if (!fyoung.marked){
                            fyoung.value = maxpval;
                            fyoung.marked = true;
                        }
                        $('#age-put-young').val(val);
                        $('#age-put-young').prop('min',val);
                    } else {
                        if ((val>=fyoung.value)&&(fyoung.marked)){
                            $('#age-put-young').val(val);
                        } else {
                            fyoung.marked = false;
                        }
                        $('#age-put-young').prop('min',val);
                        
                    }
                    
                }
            }
            var o = $('#age-set-old').val();
            var y = $('#age-set-young').val();
            change_slabels_age(y,o);
            set_values.young=y;
            $('#age-put-young').change();
            show_set();
     });
     
     
     
     $('#age-set-old').on('change focusout',function(e){
            val = $('#age-set-old').val();
            minval =  parseInt($('#age-set-old').prop('min'));
            minpval =  parseInt(put_values['old']['value']);
            if (val<minval){
                $('#age-set-old').val(minval);
            } 
            else if (val>94){
                $('#age-set-old').val(94);
                
            } 
            else {
                $('#age-set-young').prop('max',val);
                if (val<=minpval){
                    if (!fold.marked){
                        fold.value = minpval;
                        fold.marked = true;
                    }
                    $('#age-put-old').val(val);
                    $('#age-put-old').prop('max',val);
                } else {
                        if ((val<=fold.value)&&(fold.marked)){
                            $('#age-put-old').val(val);
                        } else {
                            fold.marked = false;
                        }
                        $('#age-put-old').prop('max',val);
                }
            }
            var o = $('#age-set-old').val();
            var y = $('#age-set-young').val();
            change_slabels_age(y,o);
            set_values.old=o;
            $('#age-put-old').change();
            show_set();
     });
     
     
     
     
     $('#municipality-select').on('change',function(e){
        var mun = $('#municipality-select').val();
        change_slabels(set_values.municipality,mun,'set-item-mun','municipio '+mun);
        set_values.municipality = mun;
        show_set();
     });
     
     
     function invalidate_option(k,value){
        if (value!='none'){
            if (!fvalues[k].marked) {
                var oldvalue = $('#'+k+'-put-select').val();
                $('#'+k+'-put-select').prop('disabled',true);
                fvalues[k].marked = true;
                fvalues[k].value = oldvalue;
                $('#'+k+'-put-select').val('none');
                $('#'+k+'-put-select').change();
            }
        } else {
            if (fvalues[k].marked) {
                $('#'+k+'-put-select').val(fvalues[k].value);
                $('#'+k+'-put-select').change();
                $('#'+k+'-put-select').prop('disabled',false);
                fvalues[k].marked = false;
                fvalues[k].marked = false;
            }
        }
     }
     
     $('#class-set-select').on('change',function(e){
        var clas = $('#class-set-select').val();
        invalidate_option('class',clas);
        change_slabels(set_values.class,clas,'set-item-class','con nivel escolar  '+clas);
        set_values.class = clas;
        show_set();
     });
     
     $('#sex-set-select').on('change',function(e){
        var sex = $('#sex-set-select').val();
        invalidate_option('sex',sex);
        var text = 'none';
        if (sex=='f'){
            text = 'mujeres';
        } else if (sex=='m'){
            text = 'hombres';
        }
        change_slabels(set_values.sex,sex,'set-item-sex',text);
        set_values.sex = sex;
        show_set();
     });
     
     $('#pcc-set-select').on('change',function(e){
        var val = $('#pcc-set-select').val();
        invalidate_option('pcc',val);
        var text = 'none';
        if (val=='yes'){
            text = 'militantes del PCC';
        } else if (val=='no'){
            text = 'no militantes del PCC';
        }
        change_slabels(set_values.pcc,val,'set-item-pcc',text);
        set_values.pcc = val;
        show_set();
     });
     
     $('#ujc-set-select').on('change',function(e){
        var val = $('#ujc-set-select').val();
        invalidate_option('ujc',val);
        var text = 'none';
        if (val=='yes'){
            text = 'militantes de la UJC';
        } else if (val=='no'){
            text = 'no militantes de la UJC';
        }
        change_slabels(set_values.ujc,val,'set-item-ujc',text);
        set_values.ujc = val;
        show_set();
     });
     
     $('#ctc-set-select').on('change',function(e){
        var val = $('#ctc-set-select').val();
        invalidate_option('ctc',val);
        var text = 'none';
        if (val=='yes'){
            text = 'miembros de la CTC';
        } else if (val=='no'){
            text = 'no pertenecen a la CTC';
        }
        change_slabels(set_values.ctc,val,'set-item-ctc',text);
        set_values.ctc = val;
        show_set();
     });
     
     $('#anap-set-select').on('change',function(e){
        var val = $('#anap-set-select').val();
        invalidate_option('anap',val);
        var text = 'none';
        if (val=='yes'){
            text = 'miembros de la ANAP';
        } else if (val=='no'){
            text = 'no pertenecen a la ANAP';
        }
        change_slabels(set_values.anap,val,'set-item-anap',text);
        set_values.anap = val;
        show_set();
     });
     
     $('#acrc-set-select').on('change',function(e){
        var val = $('#acrc-set-select').val();
        invalidate_option('acrc',val);
        var text = 'none';
        if (val=='yes'){
            text = 'miembros de la ACRC';
        } else if (val=='no'){
            text = 'no pertenecen a la ACRC';
        }
        change_slabels(set_values.acrc,val,'set-item-acrc',text);
        set_values.acrc = val;
        show_set();
     });
     
     function filter_by_sex(sex,elems){
        if (sex!='none'){
            var _items = [];
            for(var i in elems){
                if(cands[elems[i]-1]['sexo']==sex){
                    _items.push(elems[i]);
                }
            }
            return _items;
        }
        return elems;
     }
     
     function filter_by_class(level,elems){
        if (level!='none'){
            var _items = [];
            for(var i in elems){
                if(cands[elems[i]-1]['nivel']==level){
                    _items.push(elems[i]);
                }
            }
            return _items;
        }
        return elems;
     }
     
    function filter_by_age(young,old,elems){
        var _items=[];
        for(var i in elems){
            age = cands[elems[i]-1]['edad'];
            if((young<=age)&&(age<=old)){
                _items.push(elems[i]);
            }
        }
        return _items; 
    }
    
    function filter_by_org(member,org,elems){
        if (member!='none'){
            var _items = [];
            for(var i in elems){
                if(member=='yes'){
                    if(cands[elems[i]-1]['organizaciones'].indexOf(org)!=-1){
                        _items.push(elems[i]);
                    }
                }
                else{
                    if(cands[elems[i]-1]['organizaciones'].indexOf(org)==-1){
                        _items.push(elems[i]);
                    }
                }
            }
            return _items;
        }
        return elems;
    }
    
    
     
     function create_set(){
        var items = [];
        var prov_set = $('#province-select').val();
        var mun_set = $('#municipality-select').val();
        var yage_set = $('#age-set-young').val();
        var oage_set = $('#age-set-old').val();
        var sex_set = $('#sex-set-select').val();
        var class_set = $('#class-set-select').val();
        var pcc_set = $('#pcc-set-select').val();
        var ujc_set = $('#ujc-set-select').val();
        var ctc_set = $('#ctc-set-select').val();
        var anap_set = $('#anap-set-select').val();
        var acrc_set = $('#acrc-set-select').val();
        
        if (prov_set!='none'){
            if (mun_set!='none'){
                for(var k in data[prov_set][mun_set]){
                    items.push(data[prov_set][mun_set][k]['list_id']);
                }
            } else {
                for(var m in data[prov_set]){
                    
                    for(var k in data[prov_set][m]) {
                        items.push(data[prov_set][m][k]['list_id']);
                    }
                }
            }
        } else {
            for(var i in cands){
                items.push(cands[i]['list_id']);
            }
        }
        items.sort(simple_criteria);
        
        items = filter_by_age(yage_set,oage_set,items);
        
        items = filter_by_sex(sex_set,items);
        items = filter_by_class(class_set,items);
        
        items = filter_by_org(pcc_set,'pcc',items);
        items = filter_by_org(ujc_set,'ujc',items);
        items = filter_by_org(anap_set,'anap',items);
        items = filter_by_org(acrc_set,'acrc',items);
        items = filter_by_org(ctc_set,'ctc',items);
        
        return items;
     }
     
     
     
     function show_set(){
        var items = create_set();
        var time = 0;
        var step = 5;
        for(var j in cands){
            var i = cands[j]['list_id'];
            if((items.indexOf(i)==-1)&&(psetup.indexOf(i)!=-1)){
                time = time + step; 
                $('#c'+i).hide(0);
            } else {
                if((items.indexOf(i)!=-1)&&(psetup.indexOf(i)==-1)) {
                    time = time + step;
                    $('#c'+i).show(0);
                }
            }
        }
        psetup = items.slice(0,items.length);
        $('#set-number').html(psetup.length);
        select_and_show();        
     }
     
     function is_selected_by_org(member,org,elem){
        if (member!='none'){
                if(member=='yes'){
                    if(!(elem['organizaciones'].indexOf(org)!=-1)){
                        return false;
                    }
                }
                else{
                    if(!(elem['organizaciones'].indexOf(org)==-1)){
                        return false;
                    }
                }
        }
        return true;
    }
     
     function is_selected(cid){
        var yage_put = parseInt($('#age-put-young').val());
        var oage_put = parseInt($('#age-put-old').val());
        var sex_put = $('#sex-put-select').val();
        var class_put = $('#class-put-select').val();
        var pcc_put = $('#pcc-put-select').val();
        var ujc_put = $('#ujc-put-select').val();
        var ctc_put = $('#ctc-put-select').val();
        var anap_put = $('#anap-put-select').val();
        var acrc_put = $('#acrc-put-select').val();
        
        var c = cands[cid-1];
        
        if (!((yage_put<=c['edad'])&&(oage_put>=c['edad'])))
            return false;
        
        if ((sex_put!='none')&&!(sex_put==c['sexo']))
            return false;            
        if ((class_put!='none')&&!(class_put==c['nivel']))
            return false;
            
        if (!is_selected_by_org(pcc_put,'pcc',c))
            return false;
        if (!is_selected_by_org(ujc_put,'ujc',c))
            return false;
        if (!is_selected_by_org(ctc_put,'ctc',c))
            return false;
        if (!is_selected_by_org(anap_put,'anap',c))
            return false;
        if (!is_selected_by_org(acrc_put,'acrc',c))
            return false;        
        return true;
     }
     
     function change_plabels(last,actual,iid,text){
        if (last!='none') {
            if(last!=actual){
                    if(actual!='none'){
                        $('#'+iid).html(text);
                    } else {
                        pitem -=1;
                        $('#'+iid).detach();
                        if (pitem==0){
                            $('#put-item-all').show();
                        } 
                    }
            } 
        } else {
            if (actual!='none') {
                pitem +=1;
                if (pitem==1){
                    $('#put-item-all').hide();
                } 
                $('#put-label-block').append('<span id="'+iid+'" class="pitem">'+text+"</span>");
            } 
        }
    }
    
    function change_plabels_age(y,o){
        var yl= $('#age-set-young').val();
        var ol= $('#age-set-old').val();
        if ((y!=yl)||(o!=ol)){
            if(((put_values.young.value==yl)&&(put_values.old.value==ol))||((!fyoung.marked||!fold.marked)&&($('#put-label-block').find('#put-item-age').length==0))){
                pitem+=1;
                if (pitem==1){
                        $('#put-item-all').hide();
                }
                $('#put-label-block').append('<span id="put-item-age" class="pitem">de '+y+' a '+o+' años</span>');
            } else {
                $('#put-item-age').html("de "+y+" a "+o+" años");
            }
        } else {
            if($('#put-label-block').find('#put-item-age').length!=0){
                pitem -=1;
                if (pitem==0){
                    $('#put-item-all').show();
                }
                $('#put-item-age').detach();
            }
        }
    }
     
     $('#age-put-young').on('change focusout',function(e){
            val = $('#age-put-young').val();
            maxval =  parseInt($('#age-put-young').prop('max'));
            minval = parseInt($('#age-put-young').prop('min'));
            if (val>maxval){
                $('#age-put-young').val(maxval);
            } 
            else{ 
                if (val<minval){
                    $('#age-put-young').val(minval);
                } 
                else {
                    $('#age-put-old').prop('min',val);
                }
            }
            var o = $('#age-put-old').val();
            var y = $('#age-put-young').val();
            
            change_plabels_age(y,o);
            put_values.young.value=y;
            if (!fyoung.marked){
                fyoung.value = y;
            }
            select_and_show();
     });
     
     $('#age-put-old').on('change focusout',function(e){
            val = $('#age-put-old').val();
            minval =  parseInt($('#age-put-old').prop('min'));
            maxval =  parseInt($('#age-put-old').prop('max'));
            if (val<minval){
                $('#age-put-old').val(minval);
            } 
            else{ 
                if (val>maxval){
                    $('#age-put-old').val(maxval);
                } 
                else {
                    $('#age-put-young').prop('max',val);
                }
            }
            var o = $('#age-put-old').val();
            var y = $('#age-put-young').val();
            change_plabels_age(y,o);
            put_values.old.value=o;
            if (!fold.marked){
                fold.value = y;
            }
            select_and_show(); 
     });
     
      $('#class-put-select').on('change',function(e){
        var clas = $('#class-put-select').val();
        change_plabels(put_values.class.value,clas,'put-item-class','con nivel escolar  '+clas);
        put_values.class.value = clas;
        select_and_show();
     });
     
     $('#sex-put-select').on('change',function(e){
        var sex = $('#sex-put-select').val();
        var text = 'none';
        if (sex=='f'){
            text = 'mujeres';
        } else if (sex=='m'){
            text = 'hombres';
        }
        change_plabels(put_values.sex.value,sex,'put-item-sex',text);
        put_values.sex.value = sex;
        select_and_show();
     });
    
     $('#pcc-put-select').on('change',function(e){
        var val = $('#pcc-put-select').val();
        var text = 'none';
        if (val=='yes'){
            text = 'militantes del PCC';
        } else if (val=='no'){
            text = 'no militantes del PCC';
        }
        change_plabels(put_values.pcc.value,val,'put-item-pcc',text);
        put_values.pcc.value = val;
        select_and_show();
     });
     
     $('#ujc-put-select').on('change',function(e){
        var val = $('#ujc-put-select').val();
        var text = 'none';
        if (val=='yes'){
            text = 'militantes de la UJC';
        } else if (val=='no'){
            text = 'no militantes de la UJC';
        }
        change_plabels(put_values.ujc.value,val,'put-item-ujc',text);
        put_values.ujc.value = val;
        select_and_show();
     });
     $('#ctc-put-select').on('change',function(e){
        var val = $('#ctc-put-select').val();
        var text = 'none';
        if (val=='yes'){
            text = 'miembros de la CTC';
        } else if (val=='no'){
            text = 'no pertenecen a la CTC';
        }
        change_plabels(put_values.ctc.value,val,'put-item-ctc',text);
        put_values.ctc.value = val;     
        select_and_show();
     });
     $('#anap-put-select').on('change',function(e){
        var val = $('#anap-put-select').val();
        var text = 'none';
        if (val=='yes'){
            text = 'miembros de la ANAP';
        } else if (val=='no'){
            text = 'no pertenecen a la ANAP';
        }
        change_plabels(put_values.anap.value,val,'put-item-anap',text);
        put_values.anap.value = val; 
        select_and_show();
     });
     $('#acrc-put-select').on('change',function(e){
        var val = $('#acrc-put-select').val();
        var text = 'none';
        if (val=='yes'){
            text = 'miembros de la ACRC';
        } else if (val=='no'){
            text = 'no pertenecen a la ACRC';
        }
        change_plabels(put_values.acrc.value,val,'put-item-acrc',text);
        put_values.acrc.value = val; 
        select_and_show();
     });
     
     function select_and_show(){
        var total = 0;
        for(var i in psetup){
            var cid = cands[psetup[i]-1]['list_id'];
            if (is_selected(cid)){
                $('#i'+cid).removeClass('normal');
                $('#i'+cid).addClass('viz-text');
                total+=1;
            } else {
                $('#c'+cid).hide(0)
                $('#i'+cid).removeClass('viz-text');
                $('#i'+cid).addClass('normal');
                $('#set-up').append($('#c'+cid).detach());
                $('#c'+cid).show(0);
            }
        }
        $('#id-number').html(total);
        if (psetup.length){
            var perc = Math.trunc(total*10000/psetup.length)/100;
            $('#perc-number').html(perc+'%');
        } else {
            $('#perc-number').html('NAN');
        }
     }
     
     function set_bio_info(id){
        var c = cands[id-1];
        $("#bio-image").prop('src','images/'+c['list_id']+'.jpg');
        $('#bio-name').html('<span class="bd viz-text">'+c['nombre']+'</span>');
        $('#bio-age').html('<span class="report-text bd">Edad: </span>'+c['edad']+' años');
        $('#bio-class').html('<span class="report-text bd">Nivel escolar: </span>'+c['nivel']);
        $('#bio-job').html('<span class="report-text bd">Trabajo: </span>'+c['trabajo']);
        $('#bio-info').html('<span class="report-text bd">Biografía: </span>'+c['bio']);
        $('#bio-region').html('<span class="report-text bd">Elegible por: </span>'+c['municipio']+', '+c['provincia']);
        var orgtext = '<span class="report-text bd">Organizaciones: </span>';
        for(var o in c['organizaciones']){
            orgtext = orgtext + c['organizaciones'][o].toUpperCase()+ ' ';
        }
        orgtext = orgtext + '</span>';
        $('#bio-orgs').html(orgtext);
        
     }
     
     $('.candidate').click(function(e){
        scrollpos = $('body').scrollTop();
        $('#gray-out').css('height',$('body').height());
        var cid = e.currentTarget.id.slice(1,e.currentTarget.id.length);
        set_bio_info(cid);
        $('#gray-out').show();
        $('html,body').animate({'scrollTop':0},'fast');
        $('#bio').show();
        showbio = true;
    });
    
    $('#bio-close').click(function(e){
        $('html,body').animate({'scrollTop':scrollpos},'fast');
        $('#gray-out').hide();
        $('#bio').hide();
        showbio = false;
        scrollpos = 0;
    });
    $('#gray-out').click(function(e){
        $('html,body').animate({'scrollTop':scrollpos},'fast');
        scrollpos=0;
        $('#introduction').hide();
        $('#gray-out').hide();
         $('#how').hide();
        $('#bio').hide();
    });
    $('.explore').click(function(e){
        $('html,body').animate({'scrollTop':scrollpos},'fast');
        scrollpos=0;
        $('#introduction').hide();
        $('#how').hide();
        $('#gray-out').hide();
    });
    $('#discover').click(function(e){
        $('html,body').animate({'scrollTop':0},'fast');
        $('#introduction').hide();
        $('#how').show();
    });
    $('#intro-back').click(function(e){
        $('html,body').animate({'scrollTop':0},'fast');
        $('#how').hide();
        $('#introduction').show();
        
    });
    $('.options-head').click(function(e){
        scrollpos = $('body').scrollTop();
        $('html,body').animate({'scrollTop':0},'fast');
        $('#gray-out').show();
        $('#how').show();
    });
});

$('.collap').click(function(e){
    var hid = e.currentTarget.id.slice(0,-4)+'block';
    var lsid = e.currentTarget.id.slice(0,-4)+'simbol';
    if (collapsed[hid]) {
        $('.collaps').slideUp(100);
        for(var k in collapsed){
            collapsed[k]=true;
            var sid = k.slice(0,-5)+'simbol';
            $('#'+sid).html('<i id="set-status" class="fa fa-plus-square-o "></i>');
        }
        $('#'+lsid).html('<i id="set-status" class="fa fa-minus-square-o "></i>');
        $('#'+hid).slideDown(200);
        collapsed[hid]=false;
        
    } else {
        collapsed[hid]=true;
        $('#'+lsid).html('<i id="set-status" class="fa fa-plus-square-o "></i>');
        $('#'+hid).slideUp(200);
    }
});


function set_sizes(){
    var height = window.innerHeight;
    $('#fcontent').css('min-height',height-65);
    $('#gray-out').css('height',$('body').height()+10);
}

window.addEventListener('resize', set_sizes);
set_sizes();





