$.getJSON("data/votoexterno.json",function(data){ 
    var vyes = 0;
    var vno = 0;
    cr = {};
    inv = {};
    for(var i in data.paises){
        if (data.paises[i].voto_externo){
            vyes++;
            if (data.paises[i].dominio!=null){
                cr[data.paises[i].dominio]=100;
                inv[data.paises[i].dominio] = i;
            } 
        } else {
            vno++;
            if (data.paises[i].dominio!=null){
                cr[data.paises[i].dominio]=20; 
            }
        }
    }
    //Adding UK as GB
    cr['GB']=100;

    
    c3.generate({
        bindto: "#si-no-graph",
        data: {
          columns: [['Permite el voto a distancia',vyes],['No permite el voto a distancia',vno]],
          type: 'donut'
        },
        donut: {
          title: (vyes+vno)+" países ",
        },
         tooltip: {
        format:{
            value: function(value,r, id,index) {
                return value+' países'; }            
            }
        }
    });
    
    var types={};
    
    for(var i in data.paises){
        if (data.paises[i].voto_externo){
            if('tipos' in data.paises[i]) {
                for(var j in data.paises[i].tipos){
                    if (data.paises[i].tipos[j] in types){
                        types[data.paises[i].tipos[j]]+=1;
                    } else {
                        types[data.paises[i].tipos[j]] = 1;
                    }
                }
            }
        } 
    }
    
    var scene={};
    
    for(var i in data.paises){
        if (data.paises[i].voto_externo){
            if('escenario' in data.paises[i]) {
                for(var j in data.paises[i].escenario){
                    if (data.paises[i].escenario[j] in scene){
                        scene[data.paises[i].escenario[j]]+=1;
                    } else {
                        scene[data.paises[i].escenario[j]] = 1;
                    }
                }
            }
        } 
    }
    
    c3.generate({
        bindto: "#tipo-graph",
        data: {
          x: 'Tipo de voto',
          columns: [['Tipo de voto','Voto personal','Voto por correo','Voto por poder', 'Voto electrónico'],['Cantidad de países',types['personal'],types['postal'],types['proxy'],types['e-voting']]],
          type: 'bar'
        },
        axis: {
          x: {
            label: 'Tipo de voto',
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
        bindto: "#escenario-graph",
        data: {
          x: 'Escenario de Votación',
          columns: [['Escenario de Votación','Legislativo','Presidencial','Referendo', 'Sub-nacional'],['Cantidad de países',scene['legislativo'],scene['presidencial'],scene['referendos'],scene['sub-nacional']]],
          type: 'bar'
        },
        axis: {
          x: {
            label: 'Escenario de Votación',
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
    
    
    map = new jvm.Map({map: 'world_mill',backgroundColor: 'transparent', container:$("#map"),
            series: {
                    regions: [{
                    attribute: 'fill',
                    scale: ['#A8EEFF', '#461A57'],
                    normalizeFunction: 'polynomial',
                    values: cr,
                    min: 1,
                    max: 100
                    }]
                },
             onRegionTipShow: function(e, el, code){
                console.log(code);
                if (cr[code]==100){
                        var c=code;
                        if (c=='GB'){
                            c='UK';
                        } 
                        var t = '';
                        if (data.paises[inv[c]].tipos!=null){
                            t = 'Tipos de voto: '+data.paises[inv[c]].tipos;
                        }
                        var s = '';
                        if (data.paises[inv[c]].escenario!=null){
                            s = 'Escenarios de voto: '+data.paises[inv[c]].escenario;
                        }
                        el.html('<img class="flag-min" src="../../assets/images/flags-mini/'+c.toLowerCase()+'.png"> '+el.html()+'<br><div class="md">Permite el voto a distancia</div><div>'+t+'</div><div>'+s+'</div>');
                }
                else {
                    if (cr[code]==20){
                        el.html('<img class="flag-min" src="../../assets/images/flags-mini/'+code.toLowerCase()+'.png">'+el.html()+'<br><div>No permite el voto a distancia</div>');
                    } else {
                            el.html('<img class="flag-min" src="../../assets/images/flags-mini/'+code.toLowerCase()+'.png">'+el.html()+'<br><div>No fue analizado</div>');
                    }
                }
                
        },
            regionStyle: {
              initial: {
                fill: '#8f8f8f'
                
        }
    }});
    
    
}); 
