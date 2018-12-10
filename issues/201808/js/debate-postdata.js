c3.generate({
        bindto: "#proposals-graph",
        data: {
          columns: [['Adición',162],['Modificación',176],['Eliminación',126],['Ordenamiento',12],['Duda',95],['Interacción',191]],
          type: 'donut',
        },
        donut: {
          title: 762+"  acciones",
        }
});
c3.generate({
        bindto: "#deletes-graph",
        data: {
          columns: [['Eliminación Total',41],['Eliminación Parcial',85]],
          type: 'donut',
        },
        donut: {
          title: 126+" acciones ",
        }
});
c3.generate({
        bindto: "#interactions-graph",
        data: {
          columns: [['Apoyo',30],['Intercambio',161]],
          type: 'donut',
        },
        donut: {
          title: 191+" acciones ",
        }
});


$.getJSON("data/pd-comments-stats.json",function(data){ 
    var d = data['comments'];
    var mod = ['Modificación'];
    var adi = ['Adición'];
    var apo = ['Apoyo'];
    var dud = ['Duda'];
    var epa = ['Eliminación Parcial'];
    var eto = ['Eliminación Total'];
    var ite = ['Intercambio'];
    var mof = ['Modificación'];
    var ord = ['Ordenamiento'];
    var x = ['Artículos'];
    
    var tmod = ['Modificación'];
    var tadi = ['Adición'];
    var tapo = ['Apoyo'];
    var tdud = ['Duda'];
    var tepa = ['Eliminación Parcial'];
    var teto = ['Eliminación Total'];
    var tite = ['Intercambio'];
    var tmof = ['Modificación'];
    var tord = ['Ordenamiento'];
    var tx = ['Títulos','Preámbulo','Título I','Título II','Título III','Título IV','Título V','Título VI','Título VII','Título VIII','Título IX','Título X','Título XI','Disp. Especiales','Disp, Transitorias','Disp. Finales','Cuestiones Generales'];
    
    var titles = {};
    for(var i=0;i<16;i++){
        titles[i]={'tmod':0,'tadi':0,'tapo':0,'tdud':0,'tepa':0,'teto':0,'tite':0,'tmof':0,'tord':0};
    }
    
    for(var i=0;i<243;i++){
        var index = 0;
        if (i==0) {
            index = 0;
        } else if ((i>=1)&&(i<=19)) {
            index = 1;
        } else if ((i>=20)&&(i<=31)) {
            index = 2;
        } else if ((i>=32)&&(i<=38)) {
            index = 3;
        } else if ((i>=39)&&(i<=94)) {
            index = 4;
        } else if (i==95) {
            index = 5;
        } else if ((i>=96)&&(i<=160)) {
            index = 6;
        } else if ((i>=161)&&(i<=164)) {
            index = 7;
        } else if ((i>=165)&&(i<=198)) {
            index = 8;
        } else if ((i>=199)&&(i<=211)) {
            index = 9;
        } else if ((i>=212)&&(i<=220)) {
            index = 10;
        } else if ((i>=221)&&(i<=224)) {
            index = 11;
        } else if ((i>=225)&&(i<=226)) {
            index = 12;
        } else if ((i>=227)&&(i<=239)) {
            index = 13;
        } else if ((i>=240)&&(i<=241)) {
            index = 14;
        } else if (i==242) {
            index = 15;
        }
        titles[index]['tadi']+=d[i]['adicion'];
        titles[index]['tmod']+=d[i]['modificacion'];
        titles[index]['tepa']+=d[i]['eliminacion-parcial'];
        titles[index]['teto']+=d[i]['eliminacion-total'];
        titles[index]['tord']+=d[i]['ordenamiento'];
        titles[index]['tdud']+=d[i]['duda'];
        titles[index]['tapo']+=d[i]['apoyo'];
        titles[index]['tite']+=d[i]['intercambio'];
    }
    
    
    for(var i=0;i<16;i++){
        tadi.push(titles[i]['tadi']);
        tmod.push(titles[i]['tmod']);
        tapo.push(titles[i]['tapo']);
        tdud.push(titles[i]['tdud']);
        tepa.push(titles[i]['tepa']);
        teto.push(titles[i]['teto']);
        tite.push(titles[i]['tite']);
        tmof.push(titles[i]['tmof']);
        tord.push(titles[i]['tord']);
    }
    
    
    
    for(var i=0;i<243;i++){
        adi.push(d[i]['adicion']);
        mod.push(d[i]['modificacion']);
        epa.push(d[i]['eliminacion-parcial']);
        eto.push(d[i]['eliminacion-total']);
        ord.push(d[i]['ordenamiento']);
        dud.push(d[i]['duda']);
        apo.push(d[i]['apoyo']);
        ite.push(d[i]['intercambio']);
        if (i==0) {
            x.push('Preámbulo');
        } else if (i==242) {
            x.push('Cuestiones generales');
        }
        else if ((i>224)&&(i<227)) {
            x.push('Disp. Especial '+(i-224));
        }
        else if ((i>226)&&(i<240)) {
            x.push('Disp. Transitoria '+(i-226));
        }
        else if ((i>239)&&(i<242)) {
            x.push('Disp. Final '+(i-224));
        }
        else {
            x.push('Artículo '+i);
        }

    }
    
     c3.generate({
            bindto: "#bars-graph",
            data: {
              columns:[x,adi,mod,epa,eto,ord,dud,apo,ite],
              type: 'bar',
              x: 'Artículos',
              groups: [['Adición','Modificación','Eliminación Parcial','Eliminación Total','Ordenamiento','Duda','Apoyo','Intercambio']],
            },
           
            axis: {
              x: {
                label: 'Artículos',
                type: 'categorical',
                show: false
              },
              y: {
                label: 'Cantidad de acciones',
                position: 'outer-middle',
                padding: {
                    top: 110,
                }
              }
            }
    });  
    
    c3.generate({
            bindto: "#titlebars-graph",
            data: {
              columns:[tx,tadi,tmod,tepa,teto,tord,tdud,tapo,tite],
              type: 'bar',
              x: 'Títulos',
              groups: [['Adición','Modificación','Eliminación Parcial','Eliminación Total','Ordenamiento','Duda','Apoyo','Intercambio']],
            },
           
            axis: {
              x: {
                type: 'categorical',
                //show: false
                 
              },
              y: {
                label: 'Cantidad de acciones',
                position: 'outer-middle'
              },
              rotated: true
            }
    });  
}); 
