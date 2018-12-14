c3.generate({
            bindto: "#cubarest-graph",
            data: {
              columns:[['Cuba',1383],['Resto de Países',996]],
              type: 'donut',
            },
        donut: {
          title: (1393+996)+"  miembros",
        }
});

$.getJSON("data/fb-debate-stats.json",function(data){ 
    dates = ['Fechas'].concat(data['dates']);
    users = ['Total de Miembros'].concat(data['total_users']);
    posts = ['Publicaciones'].concat(data['posts']);
    comments = ['Comentarios'].concat(data['comments']);
    actives = ['Miembros activos'].concat(data['actives']);
    reactions = ['Reacciones'].concat(data['reactions']);
    
    c3.generate({
            bindto: "#users-graph",
            data: {
              columns:[dates,users,actives],
              type: 'line',
              x: 'Fechas',
            },
           
            axis: {
              x: {
                label: 'Fechas',
                type: 'categorical',
                show: false
                },
              y: {
                label: 'Miembros',
                position: 'outer-middle',
                padding: {
                    top: 110,
                }
              }
            },
         grid: {
          x: {
            lines: [{'value':'2018-09-19','text':'19 de septiembre' },{'value':'2018-08-31','text':'31 de agosto' },{'value':'2018-11-20','text':'20 de noviembre' }]
          }
        }
    });
    
    c3.generate({
            bindto: "#interactions-graph",
            data: {
              columns:[dates,posts,comments,reactions],
              type: 'line',
              x: 'Fechas',
              axes: {
              }
            },
           
            axis: {
              x: {
                label: 'Fechas',
                type: 'categorical',
                show: false
              },
              y: {
                label: 'Número',
                position: 'outer-middle',
                padding: {
                    top: 110,
                }
              },
              y2: {
                show: false
              }
            },
         grid: {
          x: {
            lines: [{'value':'2018-09-19','text':'19 de septiembre' },{'value':'2018-11-20','text':'20 de noviembre' }]
          }
          }
    });
    cr = {}
    for(var i in data.countries){
        cr[data.countries[i].domain] = data.countries[i].quantity;
    }

    
    map = new jvm.Map({map: 'world_mill',backgroundColor: 'transparent', container:$("#map"),
            series: {
                    regions: [{
                    attribute: 'fill',
                    scale: ['#A8EEFF', '#461A57'],
                    normalizeFunction: 'polynomial',
                    values: cr,
                    min: 1,
                    max: 2000
                    }]
                },
             onRegionTipShow: function(e, el, code){
                var c = code;
                if (c=='GB'){
                    c='UK';
                }
                if (code in cr) {
                    var m = 'miembros';
                    if (cr[code]==1){
                        m = 'miembro';
                    }
                    el.html('<img class="flag-min" src="../../assets/images/flags-mini/'+c.toLowerCase()+'.png"> '+el.html()+'<br><div class="md">'+cr[code]+' '+m+'<div>'); 
                } else {
                   el.html('<img class="flag-min" src="../../assets/images/flags-mini/'+c.toLowerCase()+'.png"> '+el.html()+'<br><div class="md">sin miembros<div>');  
                }
                
        },
            regionStyle: {
              initial: {
                fill: '#8f8f8f'
                
        }
    }});
      
}); 
