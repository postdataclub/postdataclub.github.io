c3.generate({
        bindto: "#initiative-bars",
        data: {
          x: 'Procedencia de la Iniciativa de Reforma',
          columns: [['Procedencia de la Iniciativa de Reforma','Cuerpo legislativo','Presidente o Gobierno','Monarca o Líder Religioso', 'Ciudadanía'],['Cantidad de países',163,72,10,28]],
          type: 'bar'
        },
        axis: {
          x: {
            label: 'Procedencia de la Iniciativa de Reforma',
            type: 'categorical'
          },
          y: {
            label: 'Cantidad de países',
            position: 'outer-middle',
          }
        },
        tooltip: {
        format:{
            value: function(value,r, id,index) {
                return value+' países'; }            
            }
        }
}); 
c3.generate({
        bindto: "#decition-bars",
        data: {
          x: 'Participación en la aprobación de la Reforma',
          columns: [['Participación en la aprobación de la Reforma','Cuerpo legislativo','Presidente o Gobierno','Monarca o Líder Religioso', 'Referendum'],['Cantidad de países',156,8,6,105]],
          type: 'bar'
        },
        axis: {
          x: {
            label: 'Participación en la aprobación de la Reforma',
            type: 'categorical'
          },
          y: {
            label: 'Cantidad de países',
            position: 'outer-middle',
          }
        },
        tooltip: {
        format:{
            value: function(value,r, id,index) {
                return value+' países'; }            
            }
        }
}); 

 c3.generate({
        bindto: "#referendum-country",
        data: {
          columns: [['No concibe ningún referendo',60],['Concibe algún referendo',105]],
          type: 'donut'
        },
        donut: {
          title: "165 países analizados",
        },
         tooltip: {
        format:{
            value: function(value,r, id,index) {
                return value+' países'; }            
            }
        }
});
c3.generate({
        bindto: "#referendum-mandatory",
        data: {
          columns: [['Referendum no siempre obligatorio',82],['Referendum obligatorio',23]],
          type: 'donut'
        },
        donut: {
          title: "105 países con referendo",
        },
         tooltip: {
        format:{
            value: function(value,r, id,index) {
                return value+' países'; }            
            }
    }
});

c3.generate({
        bindto: "#voters-percent",
        data: {
          x: 'País',
          columns: [['País','Palau','Bolivia','Venezuela','Filipinas','Letonia','Uruguay','Colombia','Ecuador','Cuba','Perú'],
          ['Porciento de votantes',25,20,15,12,10,10,5,1,0.56,0.3]],
          type: 'bar'
        },
        axis: {
          x: {
            label: 'País',
            type: 'categorical'
          },
          y: {
            label: 'Porciento de votantes',
            position: 'outer-middle',
          }
        },
        tooltip: {
        format:{
            value: function(value,r, id,index) {
                return value+'%'; }            
            }
        }
}); 

c3.generate({
        bindto: "#voters-population",
        data: {
          x: 'País',
          columns: [['País','Macedonia','Kirguistán','Moldavia','Armenia','Liechtenstein','Kenya','R.D.Congo','Rumanía','Lituania','Bielorrusia','Eslovenia','Serbia','Suiza','Italia','Cuba','Paraguay','Guatemala','Liberia','Burkina Faso'],
          ['Porciento respecto a la población',7.27,6,5.61,5.05,4.18,2.88,2.63,2.48,1.55,1.55,1.47,1.4,1.3,0.83,0.44,0.43,0.38,0.29,0.24]],
          type: 'bar'
        },
        axis: {
          x: {
            label: 'País',
            type: 'categorical'
          },
          y: {
            label: 'Porciento respecto a la población',
            position: 'outer-middle',
          }
        },
        tooltip: {
        format:{
            value: function(value,r, id,index) {
                return value+'%'; }            
            }
        }
}); 
