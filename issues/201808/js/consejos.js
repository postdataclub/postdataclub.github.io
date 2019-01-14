$.getJSON("data/consejos-provinciales.json",function(data){
    var prov = ['Provincias'];
    var cons = ['Consejo Provincial'];
    var asam = ['Asamblea Provincial'];
    var pobl = ['Población'];
    var terr = ['Territorio'];
    var munc = ['Municipios'];
    for(var i in data['provincias']){
        prov.push(i.toUpperCase());
        munc.push(data['provincias'][i]['municipios']);
        cons.push(data['provincias'][i]['municipios']*3+2);
        asam.push(data['provincias'][i]['asamblea']);
        pobl.push(data['provincias'][i]['poblacion']);
        terr.push(data['provincias'][i]['territorio']);
    }
    console.log(prov,cons);
    
    c3.generate({
        bindto: "#consejos-line-graph",
        data: {
          columns: [prov,asam,cons],
          type: 'line',
          x: 'Provincias',
          colors: {
          }
        },
         axis: {
          x: {
            label: 'Provincias',
            type: 'categorical',
          },
          y: {
            label: 'Total de integrantes',
            position: 'outer-middle',
          }
        }
    });
    
    c3.generate({
        bindto: "#consejos-circle-graph",
        data: {
          columns: [
              ['Categoría','Consejo Provincial','Asamblea Provincial','Población'],
              ['PRI',15,15,15],
              ['ART',14,14,14],
              ['LHA',13,13,13],
              ['MAY',12,12,12],
              ['MAT',11,11,11],
              ['CFG',10,10,10],
              ['SSP',9,9,9],
              ['VCL',8,8,8],
              ['CAV',7,7,7],
              ['CAM',6,6,6],
              ['LTU',5,5,5],
              ['HOL',4,4,4],
              ['GRA',3,3,3],
              ['STG',2,2,2],
              ['GTM',1,1,1]
          ],
          type: 'scatter',
          x: 'Categoría',
          colors: {
          }
        },
         axis: {
          x: {
            label: 'Categoría',
            type: 'categorical',
          },
          y: {
            label: 'Total de integrantes',
            position: 'outer-middle',
            show: false
          }
        },
        grid: {
          y: {
            lines: [
            {
               value: 15,
               text: 'Pinar del Río (PRI)'
            },
            {
               value: 14,
               text: 'Artemisa (ART)'
            },
            {
               value: 13,
               text: 'La Habana (LHA)'
            },
            {
               value: 12,
               text: 'Mayabeque (MAY)'
            },
            {
               value: 11,
               text: 'Matanzas (MAT)'
            },
            {
               value: 10,
               text: 'Cienfuegos (CFG)'
            },
            {
               value: 9,
               text: 'Sancti Spíritus (SSP)'
            },
            {
               value: 8,
               text: 'Villa Clara (VCL)'
            },
            {
               value: 7,
               text: 'Ciego de Ávila (CAV)'
            },
            {
               value: 6,
               text: 'Camaguey (CAM)'
            },
            {
               value: 5,
               text: 'Las Tunas (LTU)'
            },
            {
               value: 4,
               text: 'Holguín (HOL)'
            },
            {
               value: 3,
               text: 'Granma (GRA)'
            },
            {
               value: 2,
               text: 'Santiago de Cuba (STG)'
            },
            {
               value: 1,
               text: 'Guantánamo (GTM)'
            }
            ]
          }
        },
        point: {
                  r: function (d) {
                    if (d.x==0){
                        return (data['provincias'][d.id.toLowerCase()]['municipios']*3+2)/5;
                    }
                    if (d.x==1){
                        return (data['provincias'][d.id.toLowerCase()]['asamblea'])/5;
                    }
                    if (d.x==2){
                        return (data['provincias'][d.id.toLowerCase()]['poblacion']/5000)/5;
                    }
                    return 10;
                  }
        },
        tooltip: {
            format:{
                value: function(value,r, id,index) {
                    if (index==0){
                        return (data['provincias'][id.toLowerCase()]['municipios']*3+2)+' integrantes';
                    }
                    if (index==1){
                        return (data['provincias'][id.toLowerCase()]['asamblea'])+' integrantes';
                    }
                    if (index==2){
                        return (data['provincias'][id.toLowerCase()]['poblacion'])+' habitantes';
                    }
                    return value+' artículos'; 
                }            
            }
        }
    });
    
}); 
