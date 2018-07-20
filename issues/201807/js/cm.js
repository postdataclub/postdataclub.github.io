$(document).ready(function() {
    $('.popup').tooltipster({delay: 0, distance: 0});
});

function changeEvolutionDiv(id1,id2){
        $('#'+id2).hide();
        $('#'+id1).show();
        $('#btn-'+id2).removeClass('check');
        $('#btn-'+id1).addClass('check');
}

$.getJSON("data/consejo-ministros.json",function(data){
    var cm = data;
    
    function getMenAndFemale(year){
        ids = new Set()
        tboy = 0
        tgirl = 0
        pboy = 0
        pgirl = 0
        for(var i in cm['presidentes']){
            p = cm['presidentes'][i];
            for(var j in p.periodos){
                if ((p.periodos[j][0]<=year)&&(year<p.periodos[j][1])){
                    if(cm.personas[p.id].sexo=="femenino"){
                        if (!ids.has(p.id)){tgirl++;ids.add(p.id);} 
                        pgirl++;
                    } else{
                        if (!ids.has(p.id)){tboy++;ids.add(p.id);} 
                        pboy++;
                    }
                }
            }
        }
        pvboy=0;
        pvgirl=0;
        for(var i in cm['primeros-vicepresidentes']){
            p = cm['primeros-vicepresidentes'][i];
            for(var j in p.periodos){
                if ((p.periodos[j][0]<=year)&&(year<p.periodos[j][1])){
                    if(cm.personas[p.id].sexo=="femenino"){
                        if (!ids.has(p.id)){tgirl++;ids.add(p.id);} 
                        pvgirl++;
                    } else{
                        if (!ids.has(p.id)){tboy++;ids.add(p.id);} 
                        pvboy++;
                    }
                }
            }
        }
        vboy=0;
        vgirl=0;
        for(var i in cm['vicepresidentes']){
            p = cm['vicepresidentes'][i];
            for(var j in p.periodos){
                if ((p.periodos[j][0]<=year)&&(year<p.periodos[j][1])){
                    if(cm.personas[p.id].sexo=="femenino"){
                        if (!ids.has(p.id)){tgirl++;ids.add(p.id);} 
                        vgirl++;
                    } else{
                        if (!ids.has(p.id)){tboy++;ids.add(p.id);} 
                        vboy++;
                    }
                }
            }
        }
        sboy=0;
        sgirl=0;
        for(var i in cm['secretarios']){
            p = cm['secretarios'][i];
            for(var j in p.periodos){
                if ((p.periodos[j][0]<=year)&&(year<p.periodos[j][1])){
                    if(cm.personas[p.id].sexo=="femenino"){
                        if (!ids.has(p.id)){tgirl++; ids.add(p.id);} 
                        sgirl++;
                    } else{
                        if (!ids.has(p.id)){tboy++; ids.add(p.id);} 
                        sboy++;
                    }
                }
            }
        }
        mboy = 0;
        mgirl = 0;
        
        for(var k in cm['institutions']){
        for(var i in cm['institutions'][k]['jefes']){
            p = cm['institutions'][k]['jefes'][i];
            for(var j in p.periodos){
                if ((p.periodos[j][0]<=year)&&(year<p.periodos[j][1])){
                    if(cm.personas[p.id].sexo=="femenino"){
                        if (!ids.has(p.id)){tgirl++;ids.add(p.id);}
                        mgirl++;
                    } else{
                        if (!ids.has(p.id)){tboy++;ids.add(p.id);}
                        mboy++;
                    }
                }
            }
        }
        }
        return {"femenino":{"total":tgirl,"presidente":pgirl,"primer-vice":pvgirl,"vices":vgirl,"secretarios":sgirl,"ministros":mgirl},"masculino":{"total":tboy,"presidente":pboy,"primer-vice":pvboy,"vices":vboy,"secretarios":sboy,"ministros":mboy}}
    }
    
    getMenAndFemale(2017);
    
    function getMinisteryGender(){
        var mins = {};
        for(var k in cm['institutions']){
        ids = new Set();
        girls = 0;
        boys = 0;
        for(var i in cm['institutions'][k]['jefes']){
            p = cm['institutions'][k]['jefes'][i];
            for(var j in p.periodos){
                if (!ids.has(p.id)){
                    ids.add(p.id);
                    if(cm.personas[p.id].sexo=="femenino"){
                        girls++;
                    } else{
                        boys++;
                    }
                }
            }
        }
        mins[cm['institutions'][k]['id']]={"femenino":girls,"masculino":boys};
        }
        return mins;
    }
    
    y = ['x'];
    
    m = ['Mujeres'];
    h = ['Hombres'];
    pm = ['Mujeres'];
    ph = ['Hombres'];
    
    for(var i=1976;i<=2018;i++){
        y.push(i);
        var t = getMenAndFemale(i);
        total = t.femenino.total + t.masculino.total;
        m.push(t.femenino.total);
        h.push(t.masculino.total);
        pm.push(Math.round(t.femenino.total*100/total));
        ph.push(Math.round(t.masculino.total*100/total));
    }
    
    var chartGeneroTotal = c3.generate({
        bindto: "#mujeres-total",
        data: {
          x : 'x',
          columns: [y,m,h],
          type: 'line',
          type: 'area-step',
          groups : [['Hombres','Mujeres']],
          colors: {
                'Mujeres': '#EE48A3',
                'Hombres': '#298CEE',
          },
        },
        axis: {
          x: {
            label: 'Año'
          },
          y: {
            label: 'Total de Personas',
            position: 'outer-middle',
          }
        }
      });
      var chartGeneroPorciento = c3.generate({
        bindto: "#mujeres-porciento",
        data: {
          x : 'x',
          columns: [y,pm,ph],
          type: 'area-step',
          groups : [['Hombres','Mujeres']],
          colors: {
                'Mujeres': '#EE48A3',
                'Hombres': '#298CEE',
          },
        },
        axis: {
          x: {
            label: 'Año'
          },
          y: {
            label: 'Porciento de miembros',
            position: 'outer-middle',
          }
        }, 
        tooltip: {
        format:{
            value: function(value,r, id,index) {
                return value+'%'; }            
            }
        },
      });
      

    
    ins = ['x'];
    
    mm = ['Mujeres'];
    mh = ['Hombres'];
    mpm = ['Mujeres'];
    mph = ['Hombres'];
    idsmm = new Set();
    
    var minGender = getMinisteryGender();
    
    for(var i in minGender){
        if (minGender[i]['femenino']!=0){
            idsmm.add(i);
            ins.push(i.toUpperCase());
            mm.push(minGender[i]['femenino']);
            mh.push(minGender[i]['masculino']);
            var total = minGender[i]['femenino']+minGender[i]['masculino'];
            mpm.push(Math.round(minGender[i]['femenino']*100/total));
            mph.push(Math.round(minGender[i]['masculino']*100/total));
        }
    }
      
    for(var k in cm['institutions']){
        var inst = cm['institutions'][k];   
        if (idsmm.has(inst.id)){
            var lw = 0;
            var text = '<table class="periods"><tbody><tr>'; 
            text = text +'<td class="filltd" style="height:10px;width:8%;"><div class="main-text bd cursor popup" title="'+inst['nombre-actual']+'">'+inst.id.toUpperCase()+'</div></td>';
            if (inst.jefes[0]['periodos'][0][0]!=1976){
                text = text +'<td class="filltd" style="height:10px;width:'+((inst.jefes[0]['periodos'][0][0]-1976)*2)+'%;">&nbsp;</td>';
            }
            for(var i in inst.jefes){
                for(var j in inst.jefes[i]['periodos']){
                    
                    var begin = inst.jefes[i]['periodos'][j][0];
                    var end = inst.jefes[i]['periodos'][j][1];
                    if ( inst.jefes[i]['periodos'][j][1]>2018) {end = 2018;}
                    var size = (end - begin)*2;
                    lw = lw +size;
                    if (cm.personas[inst.jefes[i]['id']]['sexo']=='femenino'){
                        text = text +'<td  style="height:10px;width:'+size+'%;"><div class="mindiv cursor female-color popup" title="'+cm.personas[inst.jefes[i]['id']]['nombre']+' ('+begin+'-'+end+')">&nbsp;</div></td>';
                    }
                    else {
                        text = text +'<td  style="height:10px;width:'+size+'%;"><div class="mindiv cursor male-color popup" title="'+cm.personas[inst.jefes[i]['id']]['nombre']+' ('+begin+'-'+end+')">&nbsp;</div></td>';
                    }
                    
                }
            }
            text = text +'<td class="filltd" style="height:10px;width:'+(100-lw)+'%;">&nbsp;</td>';
            text = text + "</tr></tbody></table>";
            $('#mujeres-rangos').append(text);
        }
    }
      
      var chartMujeresMinisterioTotal = c3.generate({
        bindto: "#ministerio-mujeres-total",
        data: {
          x : 'x',
          columns: [ins,mm,mh],
          type: 'bar',
          groups : [['Hombres','Mujeres']],
          colors: {
                'Mujeres': '#EE48A3',
                'Hombres': '#298CEE',
          },
        },
        axis: {
          x: {
            label: 'Institución',
            type: 'categorical'
          },
          y: {
            label: 'Total de miembros',
            position: 'outer-middle',
          }
        }   
      });
      
      var chartMujeresMinisterioPorciento = c3.generate({
        bindto: "#ministerio-mujeres-porciento",
        data: {
          x : 'x',
          columns: [ins,mpm,mph],
          type: 'bar',
          groups : [['Hombres','Mujeres']],
          colors: {
                'Mujeres': '#EE48A3',
                'Hombres': '#298CEE',
          },
        },
        axis: {
          x: {
            label: 'Institución',
            type: 'categorical'
          },
          y: {
            label: 'Porciento de miembros',
            position: 'outer-middle',
          }
        },
        tooltip: {
        format:{
            value: function(value,r, id,index) {
                return value+'%'; }            
            }
        },   
      });
});
