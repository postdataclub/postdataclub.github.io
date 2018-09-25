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
    
    function setMinAgeGraph(periods){
        var xs =['Edad mínima'];
        var ys =['Cantidad de países'];
        for(var i in periods){
            xs.push(i+' años');
            ys.push(periods[i]);
        }
        c3.generate({
            bindto: "#minage-graph",
            data: {
              x : 'Edad mínima',
              columns: [xs,ys],
              type: 'bar',
            },
            axis: {
              x: {
                label: 'Edad mínima',
                type: 'categorical'
              },
              y: {
                label: 'Cantidad de países',
                position: 'outer-middle',
              }
            }
          });  
    }
    setMinAgeGraph(getKeyInfo('edad-minima',null));
    
    function setPreAgeGraph(continent){
        var xs =['País'];
        var ys =['Edad en que el actual presidente asumió como tal'];
        if (continent==null){
            for(var i in data.jefes){
                xs.push(data.jefes[i].pais);
                ys.push(data.jefes[i].edad);
            }
        } else {
            for(var i in data.jefes){
                if (data.jefes[i].continente==continent){
                    xs.push(data.jefes[i].pais);
                    ys.push(data.jefes[i].edad);
                }
            }
        }
        c3.generate({
            bindto: "#preage-graph",
            data: {
              x : 'País',
              columns: [xs,ys],
              type: 'scatter',
            },
            axis: {
              x: {
                label: 'País',
                type: 'categorical',
                show: false,
              },
              y: {
                label: 'Edad en que el actual presidente asumió como tal',
                position: 'outer-middle',
              }
            }, 
            grid: {
                y: {
                    lines: [{'value':60,'text':'Edad máxima propuesta para presidente en el primer mandato' }]
                }
            },
            tooltip: {
                format:{
                    value: function(value,r, id,index) {return value+' años'; }            
                }
            }
          });  
    }
    setPreAgeGraph(null);
    
    $('#period-select').on('change',function(){
        var val = $('#period-select').val();
        if (val=='null'){
            val=null;
        }
        setPeriodGraph(getKeyInfo('periodo',val));
        setVotoGraph(getKeyInfo('voto',val));
        setLimitGraph(getKeyInfo('limitacion',val));
    });
    $('#age-select').on('change',function(){
        var val = $('#age-select').val();
        if (val=='null'){
            val=null;
        }
        setMinAgeGraph(getKeyInfo('edad-minima',val));
        setPreAgeGraph(val);
    });
   
});
