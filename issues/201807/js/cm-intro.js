function changeEvolutionDiv(id1,id2){
        $('#'+id2).hide();
        $('#'+id1).show();
        $('#btn-'+id2).removeClass('check');
        $('#btn-'+id1).addClass('check');
}

function changeMultEvolutionDiv(id,idg){
        $('.'+idg).hide();
        $('.btn-'+idg).removeClass('check');
        $('#'+id).show();
        $('#btn-'+id).addClass('check');
}

$.getJSON("data/consejo-ministros.json",function(data){
    var cm = data;
    var mininfo = getMinisterPeriodsInfo();
    //console.log(Object.keys(cm.vicepresidentes).length);
    //console.log(mininfo);
    //console.log(getVPPeriodsInfo());
    
    var prids = new Set();
    var pvids = new Set();
    var vpids = new Set();
    var seids = new Set();
    var miids = mininfo["ministros"];
    
    for(var i in cm.presidentes) prids.add(cm.presidentes[i].id);
    for(var i in cm['primeros-vicepresidentes']) pvids.add(cm['primeros-vicepresidentes'][i].id);
    for(var i in cm.vicepresidentes) vpids.add(cm.vicepresidentes[i].id);
    for(var i in cm.secretarios) seids.add(cm.secretarios[i].id);
    var allPeriods = getAllPeriods();
    
    function getBossesByMinistery(){
        var result = [];
        for(var i in cm.institutions){
            result.push([cm.institutions[i].id,cm.institutions[i].jefes.length,cm.institutions[i]['nombre-actual'],cm.institutions[i].jefes]);
        }
        result.sort(compare_id_time);
        result.reverse();
        console.log(result);
        for(var p in result.slice(0,9)){
        if(result[p][0]!='mingob'){
            var lw = 0;
            var text = '<table class="periods"><tbody><tr>'; 
            text = text +'<td class="filltd" style="height:10px;width:8%;"><div class="main-text bd cursor popup" title="'+result[p][2]+'">'+result[p][0].toUpperCase()+'</div></td>';
            if (result[p][3][0]['periodos'][0][0]!=1976){
                text = text +'<td class="filltd" style="height:10px;width:'+((result[p][3][0]['periodos'][0][0]-1976)*2)+'%;">&nbsp;</td>';
            }
            for(var i in result[p][3]){
                for(var j in result[p][3][i]['periodos']){
                    
                    var begin = result[p][3][i]['periodos'][j][0];
                    var end = result[p][3][i]['periodos'][j][1];
                    if ( result[p][3][i]['periodos'][j][1]>2018) {end = 2018;}
                    var size = (end - begin)*2;
                    lw = lw +size;
                    if (cm.personas[result[p][3][i]['id']]['sexo']=='femenino'){
                        text = text +'<td  style="height:10px;width:'+size+'%;"><div class="mindiv cursor female-color popup" title="'+cm.personas[result[p][3][i]['id']]['nombre']+' ('+begin+'-'+end+')">&nbsp;</div></td>';
                    }
                    else {
                        if (cm.personas[result[p][3][i]['id']]['sexo']=='masculino'){
                            text = text +'<td  style="height:10px;width:'+size+'%;"><div class="mindiv cursor male-color popup" title="'+cm.personas[result[p][3][i]['id']]['nombre']+' ('+begin+'-'+end+')">&nbsp;</div></td>';
                        } else {
                            text = text +'<td  style="height:10px;width:'+size+'%;"><div class="mindiv cursor gray-color popup" title="'+cm.personas[result[p][3][i]['id']]['nombre']+' ('+begin+'-'+end+')">&nbsp;</div></td>';
                        }
                    }
                    
                }
            }
            text = text +'<td class="filltd" style="height:10px;width:'+(100-lw)+'%;">&nbsp;</td>';
            text = text + "</tr></tbody></table>";
            $('#mas-ministros').append(text);
            }
        }
        return result;
    }
    
    getBossesByMinistery();
    
    function getSimultaneousPeople(){
        var s = {};
        var iter = prids.values();
        var e = iter.next();
        while(e.value!=undefined){
            if (pvids.has(e.value)){
                s[e.value]={"presidente":true,"primer-vicepresidente":true,"vicepresidente":false,"secretario":false,"ministro":false};
            }
            if (vpids.has(e.value)){
                if (e.value in s){ s[e.value]["vicepresidente"]=true;}
                else{ s[e.value]={"presidente":true,"primer-vicepresidente":false,"vicepresidente":true,"secretario":false,"ministro":false}; }
            }
            if (seids.has(e.value)){
                if (e.value in s){ s[e.value]["secretario"]=true;}
                else{ s[e.value]={"presidente":true,"primer-vicepresidente":false,"vicepresidente":false,"secretario":true,"ministro":false}; }
            }
            if (miids.has(e.value)){
                if (e.value in s){ s[e.value]["ministro"]=true;}
                else{ s[e.value]={"presidente":true,"primer-vicepresidente":false,"vicepresidente":false,"secretario":false,"ministro":true}; }
            }
            e = iter.next();
        }
        iter = pvids.values();
        e = iter.next();
        while(e.value!=undefined){
            if (vpids.has(e.value)){
                if (e.value in s){ s[e.value]["vicepresidente"]=true;}
                else{ s[e.value]={"presidente":false,"primer-vicepresidente":true,"vicepresidente":true,"secretario":false,"ministro":false}; }
            }
            if (seids.has(e.value)){
                if (e.value in s){ s[e.value]["secretario"]=true;}
                else{ s[e.value]={"presidente":false,"primer-vicepresidente":true,"vicepresidente":false,"secretario":true,"ministro":false}; }
            }
            if (miids.has(e.value)){
                if (e.value in s){ s[e.value]["ministro"]=true;}
                else{ s[e.value]={"presidente":false,"primer-vicepresidente":true,"vicepresidente":false,"secretario":false,"ministro":true}; }
            }
            e = iter.next();
        }
        iter = vpids.values();
        e = iter.next();
        while(e.value!=undefined){
            if (seids.has(e.value)){
                if (e.value in s){ s[e.value]["secretario"]=true;}
                else{ s[e.value]={"presidente":false,"primer-vicepresidente":false,"vicepresidente":true,"secretario":true,"ministro":false}; }
            }
            if (miids.has(e.value)){
                if (e.value in s){ s[e.value]["ministro"]=true;}
                else{ s[e.value]={"presidente":false,"primer-vicepresidente":false,"vicepresidente":true,"secretario":false,"ministro":true}; }
            }
            e = iter.next();
        }
        iter = seids.values();
        e = iter.next();
        while(e.value!=undefined){
            if (miids.has(e.value)){
                if (e.value in s){ s[e.value]["ministro"]=true;}
                else{ s[e.value]={"presidente":false,"primer-vicepresidente":false,"vicepresidente":false,"secretario":true,"ministro":true}; }
            }
            e = iter.next();
        }
        return s;
    }

    var sims = getSimultaneousPeople();
    var n =1;
    for(var i in sims){
        var text="<tr>";
        text += "<td class='nameintable'> "+cm.personas[i].nombre;" </td>";
        if (sims[i]["presidente"]) text+= "<td class='center-text'><i class='main-text fa fa-square'></i></td>"; 
        else text+= "<td>&nbsp;</td>";
        if (sims[i]["primer-vicepresidente"]) text+= "<td class='center-text'><i class='main-text fa fa-square'></i></td>"; 
        else text+= "<td>&nbsp;</td>";
        if (sims[i]["vicepresidente"]) text+= "<td class='center-text'><i class='main-text fa fa-square'></i></td>"; 
        else text+= "<td>&nbsp;</td>";
        if (sims[i]["secretario"]) text+= "<td class='center-text'><i class='main-text fa fa-square'></i></td>"; 
        else text+= "<td>&nbsp;</td>";
        if (sims[i]["ministro"]) text+= "<td class='center-text'><i class='main-text fa fa-square'></i></td>"; 
        else text+= "<td>&nbsp;</td>";
        text += "</tr>";
        $('#cargos-diferentes').append(text);
        if (n<13){
            $('#cargos-diferentes-1').append(text);
        } else {
            $('#cargos-diferentes-2').append(text);
        }
        n++;
    }
    
    function getAllPeriods(){
        var d = {};
        for(var i in cm.personas){
            d[i]={'a':[],'p':[],"1p":[],"vp":[],"s":[],"m":[]};
        }
        for(var i in  cm.presidentes) 
           for(var p in cm.presidentes[i].periodos){ 
               d[cm.presidentes[i].id]["a"].push(cm.presidentes[i].periodos[p]);
               d[cm.presidentes[i].id]["p"].push(cm.presidentes[i].periodos[p])
            }
        for(var i in  cm["primeros-vicepresidentes"]) 
           for(var p in cm["primeros-vicepresidentes"][i].periodos){ 
               d[cm["primeros-vicepresidentes"][i].id]["a"].push(cm["primeros-vicepresidentes"][i].periodos[p]);
               d[cm["primeros-vicepresidentes"][i].id]["1p"].push(cm["primeros-vicepresidentes"][i].periodos[p]);
            }
        for(var i in  cm.vicepresidentes) 
           for(var p in cm.vicepresidentes[i].periodos){ 
               d[cm.vicepresidentes[i].id]["a"].push(cm.vicepresidentes[i].periodos[p]);
               d[cm.vicepresidentes[i].id]["vp"].push(cm.vicepresidentes[i].periodos[p]);
            }
        for(var i in  cm.secretarios) 
           for(var p in cm.secretarios[i].periodos){ 
               d[cm.secretarios[i].id]["a"].push(cm.secretarios[i].periodos[p]);
               d[cm.secretarios[i].id]["s"].push(cm.secretarios[i].periodos[p]);
            }
        for(var i in cm.institutions)
            for(var j in cm.institutions[i].jefes)
               for(var p in cm.institutions[i].jefes[j].periodos){
                   d[cm.institutions[i].jefes[j].id]["a"].push(cm.institutions[i].jefes[j].periodos[p]);
                   d[cm.institutions[i].jefes[j].id]["m"].push(cm.institutions[i].jefes[j].periodos[p]);
               }
        return d;
           
    }
    function compare_periods(p1,p2){
        if (p1[0] < p2[0])
            return -1;
        if (p1[0] > p2[0])
            return 1;
        if (p1[0]==p2[0]){
            if (p1[1] < p2[1])
                return -1;
            if (p1[1] > p2[1])
                return 1;
        }
        return 0;
    }
    function compare_id_time(p1,p2){
        if (p1[1] < p2[1])
            return -1;
        if (p1[1] > p2[1])
            return 1;
        return 0;
    }
    
    function join(p1,p2){
        if(p2[0]>p1[1]) return [p1,p2];
        if (p2[1]<=p1[1]) return [p1];
        return [[p1[0],p2[1]]]
    }

    
    function reducePeriods(p){
       var copy = [];
       for(var i in p) copy.push(p[i]);
       copy.sort(compare_periods);
       var r = [];
       var f = copy.shift();
       while(copy.length!=0){
            var lf = copy.shift();
            var t = join(f,lf);
            if (t.length>1){
                r.push(t[0]);
                f = t[1];
            } else f = t[0];
       }
       r.push(f);
       return r;
    }
    
    function sumPeriods(p){
        var sum = 0;
        for(var i in p){
            var begin = p[i][0];
            var end = p[i][1];
            if ( p[i][1]>2018) 
                {end = 2018;}
            sum += end - begin;
        }
        return sum;
    }
    
    function getTimes(id){
        var info = allPeriods;
        var res = [];
        for(var i in info){
            if (info[i][id].length!=0){
                res.push([i,sumPeriods(reducePeriods(info[i][id]))]);
            }
        }
        res.sort(compare_id_time);
        res.reverse();
        return res;
    }
    
    function setAllTimes(key,htmlid,chartid){
        var times = getTimes(key);
        for(var i=0;i<10;i++){
            var text = "<tr><td class='nameintable'>"+cm.personas[times[i][0]].nombre+"</td><td class='center-text'>"+times[i][1]+"</td></tr>";
            $("#"+htmlid).append(text);
        }
        var h = ['Número de miembros'];
        var x = ['x'];
        for(var i=0;i<42;i++) {h.push(0); x.push(i);}
        for(var i in times){
            h[times[i][1]+1]+=1;
        }
        var chart = c3.generate({
        bindto: "#"+chartid,
        data: {
          x : 'x',
          columns: [x,h],
          type: 'bar',
        },
        axis: {
          x: {
            label: 'Suma de años de permanencia',
          },
          y: {
            label: 'Número de miembros',
            position: 'outer-middle',
          }
        }   
      });
    }
    
    setAllTimes('a','tiempo-all-table','tiempo-all-graph');
    setAllTimes('vp','tiempo-vp-table','tiempo-vp-graph');
    $('#tiempo-vp').hide();
    setAllTimes('m','tiempo-m-table','tiempo-m-graph');
    $('#tiempo-m').hide();
    
    function getMultipleMinisters(){
        var id_total = {};
        for(var i in cm.institutions)
            for(var j in cm.institutions[i].jefes){
                var id = cm.institutions[i].jefes[j].id;
                if (mininfo['more-than-one'].has(id)){
                    if (id in id_total){
                        id_total[id]+=1;
                    }
                    else {
                        id_total[id]=1;
                    }
                }
            }
        var sum = [];
        for(var i in id_total) sum.push([i,id_total[i]]);
        sum.sort(compare_id_time);
        sum.reverse();
        for(var i=0;i<11;i++){
            $('#mostm-table-1').append('<tr><td class="nameintable">'+cm.personas[sum[i][0]].nombre+'</td><td class="center-text">'+sum[i][1]+'</td></tr>')
        }
        
        for(var i=11;i<22;i++){
            $('#mostm-table-2').append('<tr><td  class="nameintable">'+cm.personas[sum[i][0]].nombre+'</td><td class="center-text">'+sum[i][1]+'</td></tr>')
        }
        for(var i=0;i<22;i++){
            $('#mostm-table-3').append('<tr><td  class="nameintable">'+cm.personas[sum[i][0]].nombre+'</td><td class="center-text">'+sum[i][1]+'</td></tr>')
        }
        return sum;            
    }
    
    getMultipleMinisters();
    
    function getVPPeriodsInfo(){
        var vps = new Set();
        var maxvp = -1;
        var maxid = null;
        var minvp =43;
        var minid= null;
        var timem = 0;
        var periodsm = 0;
        var timeh = 0;
        var periodsh = 0;
        var time = 0;
        var periods = 0;
        for(var vp in cm.vicepresidentes){
            vps.add(cm.vicepresidentes[vp].id);
            for(var p in cm.vicepresidentes[vp].periodos){
                periods +=1;
                var begin = cm.vicepresidentes[vp].periodos[p][0];
                var end = cm.vicepresidentes[vp].periodos[p][1];
                if ( cm.vicepresidentes[vp].periodos[p][1]>2018) {end = 2018;}
                var size = end - begin;
                time += size;
                if (size>maxvp){
                    maxvp = size;
                    maxid = cm.vicepresidentes[vp].id;
                }
                if (size<minvp){
                    minvp = size;
                    minid = cm.vicepresidentes[vp].id;
                }
                if (cm.personas[cm.vicepresidentes[vp].id].sexo=='femenino'){timem +=size; periodsm +=1;}
                else {timeh +=size; periodsh +=1;}    
            }
        }
        return {"vicepresidentes": vps,"minvp":minvp,"minid":minid,"maxid":maxid,"maxvp":maxvp,"time":time,"periods":periods,"time-femenino":timem,"periods-femenino":periodsm,"time-masculino":timeh,"periods-masculino":periodsh};
    }
    
    function getMinisterPeriodsInfo(){
        var minist = new Set();
        var doubleM = new Set();
        var doubleP = new Set();
        var maxp = -1;
        var minp = 43;
        var maxid = null;
        var minid = null;
        var timem = 0;
        var periodsm = 0;
        var timeh = 0;
        var periodsh = 0;
        var time = 0;
        var periods = 0;
        for(var k in cm.institutions){
            for(var j in cm.institutions[k].jefes){
                if (!minist.has(cm.institutions[k].jefes[j].id)){
                    minist.add(cm.institutions[k].jefes[j].id);
                } else {
                    doubleM.add(cm.institutions[k].jefes[j].id);
                }
                if (cm.institutions[k].jefes[j].periodos.length>1){
                    doubleP.add(cm.institutions[k].jefes[j].id);
                }
                for(var p in cm.institutions[k].jefes[j].periodos){
                    periods +=1;
                    var begin = cm.institutions[k].jefes[j]['periodos'][p][0];
                    var end = cm.institutions[k].jefes[j]['periodos'][p][1];
                    if ( cm.institutions[k].jefes[j]['periodos'][p][1]>2018) {end = 2018;}
                    var size = end - begin;
                    time += size;
                    if (size>maxp){
                        maxp = size;
                        maxid = cm.institutions[k].jefes[j].id;
                    }
                    if (size<minp){
                        minp = size;
                        minid = cm.institutions[k].jefes[j].id;
                    }
                    if (cm.personas[cm.institutions[k].jefes[j].id].sexo=='femenino'){timem +=size; periodsm +=1;}
                    else {timeh +=size; periodsh +=1;}
                }
            }
        }
        return {"more-than-one":doubleM,"repeating":doubleP,"ministros": minist,"minp":minp,"minid":minid,"maxid":maxid,"maxp":maxp,"time":time,"periods":periods,"time-femenino":timem,"periods-femenino":periodsm,"time-masculino":timeh,"periods-masculino":periodsh};
    }
    
    function setMembersInfo(){
        var m = [];
        for(var id in cm.personas){
            if (id!="201"){
                m.push([id,cm.personas[id].nombre]);
            }
        }
        m.sort(compare_id_time);
        for(var i in m){
            $('#miembros').append('<option value="'+m[i][0]+'">'+m[i][1]+'</option>');
    }
    }
    setMembersInfo();
    
    $('#miembros').on('change',function(){
        var val = $('#miembros').val();
        
        if (val=='none'){
            $('#m-info').hide();
        } else {
            if (cm.personas[val].sexo=="femenino"){
                $('#m-ministro-head').html('Ministra');
            } else {$('#m-ministro-head').html('Ministro');}
            $('#m-info').show();
            var pre = true;
            for(var i in cm.presidentes){
                if (val==cm.presidentes[i].id){
                    pre = false;
                    $('#m-presidente').show();
                    var begin = cm.presidentes[i]['periodos'][0][0];
                    var end = cm.presidentes[i]['periodos'][0][1];
                    var text = "<table class='periods'><tr>";
                    if ( cm.presidentes[i]['periodos'][0][1]>2018) {end = 2018;}
                    var size = (end - begin)*2;
                    text+="<td style='font-size:12px;height:20px;width:8%'>1976</td>";
                    if (begin>1976){
                        text+="<td class='minist' style='height:20px;width:"+((begin-1976)*2)+"%;text-align:left;'></td>";
                    }
                    text+="<td class='minist gray-color cursor popup' title='"+begin+'-'+end+"' style='height:20px;width:'+size+'%'></td>";
                    if (end<2018){
                        text+="<td class='minist' style='height:20px;width:"+((2018-end)*2)+"%'></td>";
                    }
                    text+="<td style='font-size:12px;height:20px;width:8%;text-align:right;'>2018</td>";
                    text+="</tr></table>";
                    $('#m-presidente-table').html(text);
                }
            }
            if (pre){$('#m-presidente').hide();}
            
            var pvpre = true;
            for(var i in cm["primeros-vicepresidentes"]){
                if (val==cm["primeros-vicepresidentes"][i].id){
                    pvpre = false;
                    $('#m-1vpresidente').show();
                    var begin = cm["primeros-vicepresidentes"][i]['periodos'][0][0];
                    var end = cm["primeros-vicepresidentes"][i]['periodos'][0][1];
                    var text = "<table class='periods'><tr>";
                    if ( cm["primeros-vicepresidentes"][i]['periodos'][0][1]>2018) {end = 2018;}
                    var size = (end - begin)*2;
                    text+="<td style='font-size:12px;height:20px;width:8%'>1976</td>";
                    if (begin>1976){
                        text+="<td class='minist' style='height:20px;width:"+((begin-1976)*2)+"%;text-align:left;'></td>";
                    }
                    text+="<td class='minist gray-color cursor popup' title='"+begin+'-'+end+"' style='height:20px;width:'+size+'%'></td>";
                    if (end<2018){
                        text+="<td class='minist' style='height:20px;width:"+((2018-end)*2)+"%'></td>";
                    }
                    text+="<td style='font-size:12px;height:20px;width:8%;text-align:right;'>2018</td>";
                    text+="</tr></table>";
                    $('#m-1vpresidente-table').html(text);
                }
            }
            if (pvpre){$('#m-1vpresidente').hide();}
            
            var sec = true;
            for(var i in cm.secretarios){
                
                if (val==cm.secretarios[i].id){
                    console.log("entra");
                    sec = false;
                    $('#m-secretario').show();
                    var begin = cm.secretarios[i]['periodos'][0][0];
                    var end = cm.secretarios[i]['periodos'][0][1];
                    var text = "<table class='periods'><tr>";
                    if ( cm.secretarios[i]['periodos'][0][1]>2018) {end = 2018;}
                    var size = (end - begin)*2;
                    text+="<td style='font-size:12px;height:20px;width:8%'>1976</td>";
                    if (begin>1976){
                        text+="<td class='minist' style='height:20px;width:"+((begin-1976)*2)+"%;text-align:left;'></td>";
                    }
                    text+="<td class='minist gray-color cursor popup' title='"+begin+'-'+end+"' style='height:20px;width:'+size+'%'></td>";
                    if (end<2018){
                        text+="<td class='minist' style='height:20px;width:"+((2018-end)*2)+"%'></td>";
                    }
                    text+="<td style='font-size:12px;height:20px;width:8%;text-align:right;'>2018</td>";
                    text+="</tr></table>";
                    $('#m-secretario-table').html(text);
                }
            }
            if (sec){$('#m-secretario').hide();}
            
            var vps = true;
            for(var i in cm.vicepresidentes){
                if (val==cm.vicepresidentes[i].id){
                    vps = false;
                    $('#m-vpresidente').show();
                    var begin = cm.vicepresidentes[i]['periodos'][0][0];
                    var end = cm.vicepresidentes[i]['periodos'][0][1];
                    var text = "<table class='periods'><tr>";
                    if ( cm.vicepresidentes[i]['periodos'][0][1]>2018) {end = 2018;}
                    var size = (end - begin)*2;
                    text+="<td style='font-size:12px;height:20px;width:8%'>1976</td>";
                    if (begin>1976){
                        text+="<td class='minist' style='height:20px;width:"+((begin-1976)*2)+"%;text-align:left;'></td>";
                    }
                    text+="<td class='minist gray-color cursor popup' title='"+begin+'-'+end+"' style='height:20px;width:'+size+'%'></td>";
                    if (cm.vicepresidentes[i]['periodos'].length>1){
                        var last = end;
                        begin = cm.vicepresidentes[i]['periodos'][1][0];
                        end = cm.vicepresidentes[i]['periodos'][1][1];
                        if ( cm.vicepresidentes[i]['periodos'][1][1]>2018) {end = 2018;}
                        text+="<td class='minist' style='height:20px;width:"+((begin-last)*2)+"%;text-align:left;'></td>";
                        text+="<td class='minist gray-color cursor popup' title='"+begin+'-'+end+"' style='height:20px;width:'+size+'%'></td>";
                    }
                    
                    if (end<2018){
                        text+="<td class='minist' style='height:20px;width:"+((2018-end)*2)+"%'></td>";
                    }
                    text+="<td style='font-size:12px;height:20px;width:8%;text-align:right;'>2018</td>";
                    text+="</tr></table>";
                    $('#m-vpresidente-table').html(text);
                }
            }
            if (vps){$('#m-vpresidente').hide();}
            
            var mnt = true;
            var text="";
            for(var i in cm.institutions){
                
                for(var j in cm.institutions[i].jefes){
                if (val==cm.institutions[i].jefes[j].id){
                    mnt = false;
                    text+="<div class='bd center-text mname'>"+cm.institutions[i]['nombre-actual']+"</div>";
                    $('#m-ministro').show();
                    var begin = cm.institutions[i].jefes[j]['periodos'][0][0];
                    var end = cm.institutions[i].jefes[j]['periodos'][0][1];
                     text += "<table class='periods '><tr>";
                    if ( cm.institutions[i].jefes[j]['periodos'][0][1]>2018) {end = 2018;}
                    var size = (end - begin)*2;
                    text+="<td style='font-size:12px;height:20px;width:8%'>1976</td>";
                    if (begin>1976){
                        text+="<td class='minist' style='height:20px;width:"+((begin-1976)*2)+"%;text-align:left;'></td>";
                    }
                    text+="<td class='minist gray-color cursor popup' title='"+begin+'-'+end+"' style='height:20px;width:'+size+'%'></td>";
                    if (cm.institutions[i].jefes[j]['periodos'].length>1){
                        var last = end;
                        begin = cm.institutions[i].jefes[j]['periodos'][1][0];
                        end = cm.institutions[i].jefes[j]['periodos'][1][1];
                        if ( cm.institutions[i].jefes[j]['periodos'][1][1]>2018) {end = 2018;}
                        text+="<td class='minist' style='height:20px;width:"+((begin-last)*2)+"%;text-align:left;'></td>";
                        text+="<td class='minist gray-color cursor popup' title='"+begin+'-'+end+"' style='height:20px;width:'+size+'%'></td>";
                    }
                    
                    if (end<2018){
                        text+="<td class='minist' style='height:20px;width:"+((2018-end)*2)+"%'></td>";
                    }
                    text+="<td style='font-size:12px;height:20px;width:8%;text-align:right;'>2018</td>";
                    text+="</tr></table>";
                }
                }
                
            }
            $('#m-ministro-table').html(text);
            if (mnt){$('#m-ministro').hide();}
        }
    });
    
    //console.log(getMinisterPeriodsInfo());
    //console.log(getVPPeriodsInfo());
    //console.log(getBossesByMinistery());
});
