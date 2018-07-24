$.getJSON("data/consejo-ministros.json",function(data){
    var cm = data;
    
    function compare_id_nt(p1,p2){
        if (p1[1] < p2[1])
            return -1;
        if (p1[1] > p2[1])
            return 1;
        return 0;
    }
    
    function getMinisteryPeriods(id){
        var m = getInstitution(id);
        var periods = [];
        var begin = m.vida[0];
        var end = m.vida[1];
        if (end>2018){
            end=2018;
        }
        if ('other-names' in m){
            for(n in m['other-names']){
                var l = m['other-names'][n].periodo;
                if (l[0]<=begin){
                    periods.push([[l[0],l[1]],m['other-names'][n]['short-name'],m['other-names'][n]['nombre']]);
                    begin = l[1];
                } else{
                    periods.push([[begin,l[0]],m.id,m['nombre-actual']]);
                    periods.push([[l[0],l[1]],m['other-names'][n]['short-name'],m['other-names'][n]['nombre']]);
                    begin = l[1];
                }
                
            }
        }
        periods.push([[begin,end],m.id,m['nombre-actual']]);
        return periods;
    }
    
    function getMinisteryNames() {
        var minists = [];
        for(var i in cm.institutions){
            if (cm.institutions[i].id!='mingob')
                minists.push([cm.institutions[i].id,cm.institutions[i]['nombre-actual']]);
        }
        minists.sort(compare_id_nt);
        return minists;
    }
    
    function setAllMinsGraph(){
        var m = getMinisteryNames();
        for(var i in m){
            
            $('#instituciones').append('<option value="'+m[i][0]+'">'+m[i][1]+'</option>');
        }
    }
    
    setAllMinsGraph();
    
    function getInstitution(id){
        for(var i in cm.institutions){
            if (cm.institutions[i].id==id)
                return cm.institutions[i];
        }
        return null;
    }
    
    function getMinisteriosbyYear(year){
        var mset = new Set();
        for(var m in cm.institutions){
            if((year>=cm.institutions[m].vida[0])&&(year<cm.institutions[m].vida[1])){
                mset.add([cm.institutions[m].id]);
            }
        }
        return mset;
    };
    
    function setLineChart(){
        var y =['x'];
        var l = ['Total de Instituciones'];
        for(var i=1976;i<=2018;i++){
            y.push(i);
            l.push(getMinisteriosbyYear(i).size);
        }
        var chartGeneroTotal = c3.generate({
            bindto: "#ministerios-evolution",
            data: {
              x : 'x',
              columns: [y,l],
              type: 'line',
            },
            axis: {
              x: {
                label: 'Año'
              },
              y: {
                label: 'Total de Instituciones',
                position: 'outer-middle',
              }
            }, grid: {
          x: {
            lines: [{'value':1981,'text':'II Legislatura' },{'value':1986,'text':'III Legislatura' },{'value':1993,'text':'IV Legislatura' },
            {'value':1998,'text':'V Legislatura' },{'value':2003,'text':'VI Legislatura' },{'value':2008,'text':'VII Legislatura' },{'value':2013,'text':'VIII Legislatura' }]
          }
          }
          });
    }
    
    setLineChart();
    
    
    $('#instituciones').on('change',function(){
        var val = $('#instituciones').val();
        if (val!='none'){
            $('#m-info').show();
        } else {
            $('#m-info').hide();
        }
        var m = getInstitution(val);
        $('#m-nombre-actual').html(m['nombre-actual']);
        var periods = getMinisteryPeriods(val);
        var text = "<table style='width:100%;'><tbody><tr><td class='l-inst main-text bd'>"+1976+" -|</td>";
        var sumw =(periods[0][0][0]-1976)*2;
        if(sumw!=0){
            text+="<td style='width:"+((periods[0][0][0]-1976)*2)+"%'>&nbsp;</td>";
        }
        for(var p in periods){
            var w = (periods[p][0][1]-periods[p][0][0])*2;
            sumw +=w;
            text+="<td class='popup cursor center-text gray-color inst-info' style='width:"+w+"%;' title='"+periods[p][2]+" ("+periods[p][0][0]+"-"+periods[p][0][1]+")' >"+periods[p][1].toUpperCase()+"</td>";
        }
        text +="<td style='width:"+(100-24-sumw)+"%'></td><td class='r-inst main-text bd'>|- "+2018+"</td></tr></tbody></table>";
        $('#m-evol-table').html(text);
        var mtext = "<table style='width:100%;'><tbody><tr><td class='l-inst main-text bd'>"+1976+" -|</td>";
        var sumw = (m.jefes[0].periodos[0][0]-1976)*2;
        if(sumw!=0){
            mtext+="<td style='width:"+((periods[0][0][0]-1976)*2)+"%'>&nbsp;</td>";
        }
        for(var j in m.jefes){
            for(var p in m.jefes[p].periodos){
                var end =  m.jefes[j].periodos[p][1];
                if (end>2018){
                    end=2018
                }
                var w = (end-m.jefes[j].periodos[p][0])*2;
                sumw +=w;
                var color = 'gray-color';
                if (cm.personas[m.jefes[j].id].sexo=='femenino'){ color="female-color"};
                if (cm.personas[m.jefes[j].id].sexo=='masculino'){ color="male-color"};
                mtext+="<td class='popup cursor center-text "+color+" inst-info' style='width:"+w+"%;' title='"+cm.personas[m.jefes[j].id].nombre+" ("+m.jefes[j].periodos[p][0]+"-"+end+")' ></td>";
            }
        }
        mtext +="<td style='width:"+(100-24-sumw)+"%'></td><td class='r-inst main-text bd'>|- "+2018+"</td></tr></tbody></table>";
        $('#m-bosses-table').html(mtext);
    });
    
});
