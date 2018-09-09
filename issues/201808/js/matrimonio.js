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
          title: tmr+" países ",
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
          title: tur+" países ",
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
    
    
    for(var i=0;i<years.length;i++){
        ma.push(mats[1989+i]);
        ua.push(unions[1989+i]);
        sa.push(sums[1989+i]);
    }
    for(var i=1;i<years.length;i++){
        ma[i]=ma[i]+ma[i-1];
        ua[i]=ua[i]+ua[i-1];
        sa[i]=sa[i]+sa[i-1];
    }
    
    ua[ua.length-1]+=1;
    sa[sa.length-1]+=1;
    
    c3.generate({
        bindto: "#evol-graph",
        data: {
          x : 'Año',
          columns: [['Año'].concat(years),['Matrimonio'].concat(ma),['Union civil o derechos de convivencia'].concat(ua)],
          type: 'line',
        },
        axis: {
          x: {
            label: 'Año',
          },
          y: {
            label: 'Cantidad de países que lo aprobaron hasta ese año',
            position: 'outer-middle',
          }
        }, 
        tooltip: {
            format:{
                value: function(value,r, id,index) {
                    if (value==1)
                        return '1 país';
                    if (value==0)
                        return 'ningún país';
                    return value+' países'; 
                }            
            }
        }
    });
   
    
    var total=0;
    var ptotal = 0;
    var mtotal = 0;
    var utotal = 0;
    
    var mc1 = [];
    var ac1 = [];
    var c_1 = [];
    var mc2 = [];
    var ac2 = [];
    var c_2 = [];
    var mc3 = [];
    var ac3 = [];
    var c_3 = [];
    
    for(var i=0;i<data.paises.length;i++){
    
        if (data.paises[i].adopcion.aceptado){
            total+=1;
            if (data.paises[i].adopcion.parcial)
                ptotal += 1;
            if (data.paises[i].matrimonio.aceptado){
                if (data.paises[i].matrimonio.fecha>data.paises[i].adopcion.fecha){
                    mc1.push(data.paises[i].matrimonio.fecha);
                    ac1.push(data.paises[i].adopcion.fecha);
                    c_1.push(data.paises[i].nombre);
                } else if (data.paises[i].matrimonio.fecha==data.paises[i].adopcion.fecha){
                    mc2.push(data.paises[i].matrimonio.fecha);
                    ac2.push(data.paises[i].adopcion.fecha);
                    c_2.push(data.paises[i].nombre);
                } else {
                    mc3.push(data.paises[i].matrimonio.fecha);
                    ac3.push(data.paises[i].adopcion.fecha);
                    c_3.push(data.paises[i].nombre);
                }
                mtotal+=1;
            } 
            if (data.paises[i]['union-civil'].aceptado)
                utotal +=1;
        }
    }
    
    var p = ['Países'].concat(c_1).concat(c_2).concat(c_3);
    var mp = ['Matrimonio'].concat(mc1).concat(mc2).concat(mc3);
    var ap = ['Adopción'].concat(ac1).concat(ac2).concat(ac3);
    c3.generate({
        bindto: "#adopcion-graph",
        data: {
          x : 'Países',
          columns: [p,mp,ap],
          colors: {
            'Adopción': 'red',
            'Matrimonio': 'blue'
          },
          type: 'scatter'
        },
        axis: {
          x: {
            label: 'Países',
            type: 'categorical',
            show: false
          },
          y: {
            label: 'Año de aprobación',
            position: 'outer-middle'
          }
        },
         tooltip: {
            format:{
                value: function(value,r, id,index) {
                    if(mp[index+1]==ap[index+1]){
                        return value+' (mismo año para matrimonio y adopción)';
                    }
                    return value;
                }            
            }
        },
        point: {
          r: function (d) {
            return 5;
          }
        }

    }); 
    
    console.log(total);
    console.log(ptotal);
    console.log(mtotal);
    console.log(utotal);
}); 
