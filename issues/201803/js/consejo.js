$.getJSON("data/consejo-estado.json",function(data){
var periods = [1976,1981,1986,1993,1998,2003,2008,2013];
var flip_state = {1:'front',2:'front',8:'front'};

$("#m1").flip({
        axis: "y",
        reverse: true,
        trigger: "manual"
});
$("#m2").flip({
        axis: "y",
        reverse: true,
        trigger: "manual"
});
$("#m8").flip({
        axis: "y",
        reverse: true,
        trigger: "manual"
});
for(var i=3;i<8;i++){
    $("#m"+i).flip({
        axis: "y",
        reverse: true,
        trigger: "manual"
    });
    flip_state[i]='front';
    
}
for(var i=9;i<32;i++){
    $("#m"+i).flip({
        axis: "y",
        reverse: true,
        trigger: "manual"
    });
    flip_state[i]='front';
}

function get_standard_position_class(){
    classes = {};
    for(var i in data['personas']){
        classes[data['personas'][i]['nombre-corto']]='normal-border';
    }
    return classes;
}

var pclasses = {}

var positions = {};

// using d3 for convenience
var container = d3.select('#scroll');
var graphic = container.select('.scroll__graphic');
var chart = graphic.select('.chart');
var text = container.select('.scroll__text');
var step = text.selectAll('.step');

// initialize the scrollama
var scroller = scrollama();

// generic window resize listener event
function handleResize() {
    // 1. update height of step elements
    var stepHeight = Math.floor(window.innerHeight * 0.75);
    //step.style('height', stepHeight + 'px');

    // 2. update width/height of graphic element
    var bodyWidth = d3.select('body').node().offsetWidth;

    graphic
        .style('width', bodyWidth + 'px')
        .style('height', window.innerHeight + 'px');

    var chartMargin = 32;
    var textWidth = text.node().offsetWidth;
    var chartWidth = graphic.node().offsetWidth - textWidth - chartMargin;

    chart
        .style('width', chartWidth + 'px')
        .style('min-height', Math.floor(window.innerHeight -100) + 'px');


    // 3. tell scrollama to update new element dimensions
    scroller.resize();
}

// scrollama event handlers
function handleStepEnter(response) {
    // response = { element, direction, index }

    // add color to current step only
    
    if (response.index==0){
        if (response.direction!='down'){
            back_change_in_cs(data,1976);
        } 
    } 
    if (response.index==1){
        if (response.direction=='down'){
            change_in_cs(data,1976);
        } 
        else {
            back_change_cs(data,1976);
        }
    } 
    if (response.index==2){
        if (response.direction=='down'){
            change_cs(data,1981);
        } 
        else {
            back_change_in_cs(data,1981);
        }
    }
    if (response.index==3){
        if (response.direction=='down'){
            change_in_cs(data,1981);
        } 
        else {
            back_change_cs(data,1981);
        }
    } 
    if (response.index==4){
        if (response.direction=='down'){
            change_cs(data,1986);
        } 
        else {
            back_change_in_cs(data,1986);
        }
    }
    if (response.index==5){
        if (response.direction=='down'){
            change_cs(data,1993);
        } 
        else {
            back_change_in_cs(data,1993);
        }
    } 
    if (response.index==6){
        if (response.direction=='down'){
            change_cs(data,1998);
        } 
        else {
            back_change_in_cs(data,1998);
        }
    }
    if (response.index==7){
        if (response.direction=='down'){
            change_cs(data,2003);
        } 
        else {
            back_change_in_cs(data,2003);
        }
    }
    if (response.index==8){
        if (response.direction=='down'){
            change_cs(data,2008);
        } 
        else {
            back_change_in_cs(data,2008);
        }
    }
    if (response.index==9){
        if (response.direction=='down'){
            change_in_cs(data,2008);
        } 
        else {
            back_change_cs(data,2008);
        }
    }
    if (response.index==10){
        if (response.direction=='down'){
            change_cs(data,2013); 
        } 
        else {
            back_change_in_cs(data,2013);
        }
    }
    if (response.index==11){
        if (response.direction=='down'){
            change_in_cs(data,2013);
        } 
        else {
            back_change_cs(data,2013);
        }
    }
}

function handleContainerEnter(response) {
    // response = { direction }

    // sticky the graphic (old school)
    graphic.classed('is-fixed', true);
    graphic.classed('is-bottom', false);
}

function handleContainerExit(response) {
    // response = { direction }

    // un-sticky the graphic, and pin to top/bottom of container
    graphic.classed('is-fixed', false);
    graphic.classed('is-bottom', response.direction === 'down');
}

function init() {
    // 1. force a resize on load to ensure proper dimensions are sent to scrollama
    handleResize();

    // 2. setup the scroller passing options
    // this will also initialize trigger observations
    // 3. bind scrollama event handlers (this can be chained like below)
    scroller.setup({
        container: '#scroll',
        graphic: '.scroll__graphic',
        text: '.scroll__text',
        step: '.scroll__text .step',
        debug: false,
    })
        .onStepEnter(handleStepEnter)
        .onContainerEnter(handleContainerEnter)
        .onContainerExit(handleContainerExit);

    // setup resize event
    window.addEventListener('resize', handleResize);
}

// kick things off
init();


    function get_init_counsil(d,year){
        var m = {};
        var c = d["consejos"][year];
        var p = d["personas"];
        m[1] = p[c["presidente"][0]];
        m[2] = p[c["vicepresidente"][0]];
        m[8] = p[c["secretario"][0]];
        for(var i in c["vicepresidentes"]){
            m[Number(i)+3] = p[c["vicepresidentes"][i][0]];
        }
        for(var i in c["miembros"]){
            m[Number(i)+9] = p[c["miembros"][i][0]];
        }
        return m;
    }
    
    function get_last_counsil(d,year){
        var m = {};
        var c = d["consejos"][year];
        var p = d["personas"];
        m[1] = p[c["presidente"][c["presidente"].length-1]];
        m[2] = p[c["vicepresidente"][c["vicepresidente"].length-1]];
        m[8] = p[c["secretario"][c["secretario"].length-1]];
        for(var i in c["vicepresidentes"]){
            m[Number(i)+3] = p[c["vicepresidentes"][i][c["vicepresidentes"][i].length-1]];
        }
        for(var i in c["miembros"]){
            m[Number(i)+9] = p[c["miembros"][i][c["miembros"][i].length-1]];
        }
        return m;
    }
    
    function init_data(d,year,last){
        var m = get_init_counsil(d,year,false);
        var cyear = year+'-0';
        if (last){
            m = get_last_counsil(d,year,true);
            cyear = year+'-1';
        }
        pclasses[cyear] = get_standard_position_class();
        for(var i in m){
            positions[i]=m[i];
            var id = 'm'+i;
            $("#"+id+" .front #"+id+'-name').html(m[i]['nombre-corto']);
            if (Number(i)<9){
                $("#"+id+" .front #"+id+'-image img').prop('src','images/m_'+m[i]['id']+'.jpg');
            } else {
                if (m[i]['sexo']=='m'){
                    $("#"+id+" .front #"+id+'-image img').prop('src','images/man.jpg');
                } else{
                    $("#"+id+" .front #"+id+'-image img').prop('src','images/woman.jpg');
                }
            }
        }
    }
    

    function get_changing_spots(d,m){
        var spots = [];
        var vps = [];
        var nvps = [];
        var members = [];
        var nmembers = [];
        if (positions[1]['nombre']!=m[1]['nombre']){
            spots.push(1);
        }
        if (positions[2]['nombre']!=m[2]['nombre']){
            spots.push(2);
        }
        if (positions[8]['nombre']!=m[8]['nombre']){
            spots.push(8);
        }
        for(var i=3;i<8;i++){
            var change = true;
            for(var j=3;j<8;j++){
                if (positions[i]['nombre']==m[j]['nombre']){
                    change = false;
                    vps.push(j);
                    break;
                }
            }
            if (change){
                spots.push(i);
            }
        }
        for(var i=9;i<32;i++){
            var change = true;
            for(var j=9;j<32;j++){
                if (positions[i]['nombre']==m[j]['nombre']){
                    change = false;
                    members.push(j);
                    break;
                }
            }
            if (change){
                spots.push(i);
            }
        }
        for(var i=3;i<8;i++){
            if (vps.indexOf(i)==-1){
                nvps.push(i);
            }
        }
        for(var i=9;i<32;i++){
            if (members.indexOf(i)==-1){
                nmembers.push(i);
            }
        }
        spots.sort();
        var nspots = {};
        for(var i in spots){
            var n = spots[i];
            if (n==1){
                nspots[1]=m[n];
            } else if (n==2){
                nspots[2]=m[n];
            } else if (n==8){
                nspots[8]=m[n];
            } else if ((n>2)&&(n<8)){
                var j = nvps.shift();
                nspots[n]=m[j];
            } else if ((n>8)&&(n<32)){
                var j = nmembers.shift();
                nspots[n]=m[j];
            }
        }
        return nspots;
    }
    
    function is_member(people){
        for(var i in positions){
            if(people['nombre']==positions[i]['nombre']){
                return i;
            }
        }
        return null;
    }
    
    function get_change_types(d,year,last){
        var m = get_init_counsil(d,year);
        if (last){
            m = get_last_counsil(d,year);
        }
        var cs = get_changing_spots(data,m);
        var changes = [];
        for(var i in cs){
            var cand = cs[i];
            var p = is_member(cand);
            var w = false;
            if (p==null){
                w = true;
            } 
            changes.push({'new':w,'pos':i,'person':cand});
        }
        return changes;
    }
    
    function flip_members(members,cyear){
        for(var i in members){
            var p = members[i]['pos'];
            var m = members[i]['person'];
            var n = members[i]['new'];
            var face = 'front';
            var bface = "back";
            var rev = true;
            if (flip_state[p]=='front'){
                face = "back";
                bface = 'front';
                rev = false;
            }
            flip_state[p] = face;
            $('#m'+p+' .'+face+' #m'+p+'-name').html(m['nombre-corto']);
            if(p<9){
                $('#m'+p+' .'+face+' #m'+p+'-image img').prop('src','images/m_'+m['id']+'.jpg');
            } else {
                var simg = 'man.jpg';
                if (m['sexo']=='f'){
                    simg = "woman.jpg";
                }
                $('#m'+p+' .'+face+' #m'+p+'-image img').prop('src','images/'+simg);
            }
            $('#m'+p+' .'+face+' #m'+p+'-image img').removeClass('normal-border');
            if(n){
                $('#m'+p+' .'+face+' #m'+p+'-image img').addClass('new-border');
                pclasses[cyear][m['nombre-corto']]='new-border';
            } else {
                $('#m'+p+' .'+face+' #m'+p+'-image img').addClass('change-border');
                pclasses[cyear][m['nombre-corto']]='change-border';
            }
           
           positions[p]=m; 
           $('#m'+p).flip('toggle');
        }
    }
    
    function flip_members_back(members,cyear){
        for(var i in members){
            var p = members[i]['pos'];
            var m = members[i]['person'];
            var n = members[i]['new'];
            var face = 'front';
            var rev = true;
            if (flip_state[p]=='front'){
                face = "back";
                rev = false;
            }
            flip_state[p] = face;
            $('#m'+p+' .'+face+' #m'+p+'-name').html(m['nombre-corto']);
            if(p<9){
                $('#m'+p+' .'+face+' #m'+p+'-image img').prop('src','images/m_'+m['id']+'.jpg');
            } else {
                var simg = 'man.jpg';
                if (m['sexo']=='f'){
                    simg = "woman.jpg";
                }
                $('#m'+p+' .'+face+' #m'+p+'-image img').prop('src','images/'+simg);
            }
            $('#m'+p+' .'+face+' #m'+p+'-image img').removeClass('normal-border');
            $('#m'+p+' .'+face+' #m'+p+'-image img').removeClass('new-border');
            $('#m'+p+' .'+face+' #m'+p+'-image img').removeClass('change-border');
            $('#m'+p+' .'+face+' #m'+p+'-image img').addClass(pclasses[cyear][$('#m'+p+' .'+face+' #m'+p+'-name').html()]);
            $('#m'+p+' .'+face+' #m'+p+'-image img').addClass('new-border');
            positions[p]=m; 
            $('#m'+p).flip('toggle');
        }
    }
    
    function change_in_cs(d,year){
        var changes = get_change_types(d,year,true);
        var cyear = year+'-1';
        pclasses[cyear]={};
        for(var i in pclasses[year+'-0']){
            pclasses[cyear][i]=pclasses[year+'-0'][i];
        }
        flip_members(changes,cyear);
    }
    
    function back_change_in_cs(d,year){
        byear = year+"-0";
        var changes = get_change_types(d,year,false);
        flip_members_back(changes,byear);
        setTimeout(function (){
            $('.m-cs-image').removeClass('new-border');
            $('.m-cs-image').removeClass('change-border');
            $('.m-cs-image').removeClass('normal-border');
            for(var i=1;i<32;i++){
                var face = flip_state[i];
                $('#m'+i+' .'+face+' #m'+i+'-image img').addClass(pclasses[byear][$('#m'+i+' .'+face+' #m'+i+'-name').html()]);    
            }
        },300);
    }

    function change_cs(d,year){
        var changes = get_change_types(d,year,false);
        $('.m-cs-image').removeClass('new-border');
        $('.m-cs-image').removeClass('change-border');
        $('.m-cs-image').addClass('normal-border');
        var cyear = year+'-0';
        pclasses[cyear]=get_standard_position_class();
        flip_members(changes,cyear);
    }
    
    function back_change_cs(d,year){
        var changes = get_change_types(d,year,true);
        var byear = year+'-1';
        flip_members_back(changes,byear);
        setTimeout(function (){
            $('.m-cs-image').removeClass('new-border');
            $('.m-cs-image').removeClass('change-border');
            $('.m-cs-image').removeClass('normal-border');
            for(var i=1;i<32;i++){
                var face = flip_state[i];
                $('#m'+i+' .'+face+' #m'+i+'-image img').addClass(pclasses[byear][$('#m'+i+' .'+face+' #m'+i+'-name').html()]);    
            }
        },300);
    }
    
    init_data(data,1976,false);
    
    function get_cs_people(d,year){
        var fm = get_init_counsil(d,year);
        var lm = get_last_counsil(d,year);
        var m = [];
        var p = [];
        for(var i in fm){
            m.push(fm[i]['id']);
            if(Number(i)<9){
                p.push(fm[i]['id'])
            }
        }
        for(var i in lm){
            var id = lm[i]['id'];
            if (m.indexOf(id)==-1){
                m.push(id);
            }
            if ((Number(i)<9)&&(p.indexOf(id)==-1)){
                p.push(id);
            }
        }
        return [m,p]; 
    }
    
    function compare_array(id1,id2){
                if (id1[1] < id2[1])
                    return 1;
                if (id1[1] > id2[1])
                    return -1;
                return 0;
    }
    
    function get_cs_all(d){
        var _all = {};
        var _pall = {};
        for(var i in periods){
            var y = periods[i];
            var t = get_cs_people(d,y);
            var m = t[0];
            var p = t[1];
            for(var j in m){
                var id = m[j];
                if(id in _all){
                    _all[id]=_all[id]+1;
                } else {
                    _all[id]=1;
                }
            }
            for(var j in p){
                var id = p[j];
                if(id in _pall){
                    _pall[id]=_pall[id]+1;
                } else {
                    _pall[id]=1;
                }
            }
        }
        var all = [];
        var pall = [];
        for(var i in _all){
            all.push([Number(i),_all[i]]);
        }
        for(var i in _pall){
            pall.push([Number(i),_pall[i]]);
        }
        all.sort(compare_array);
        pall.sort(compare_array);
        return [all,pall];
    }
    
    function set_most_cs_table(data,m,cant,bid){
        for(var i=0;i<cant;i++){
            var text='<tr>';
            var t1='';
            var t2='';
            var t3='';

            var m1 = data['personas'][m[i][0]];
            var c1 = m[i][1];
            if (m1['diputado']){
                t1 = ' dip ';
            }
            var m2 = data['personas'][m[i+cant][0]];
            var c2 = m[i+cant][1];
            if (m2['diputado']){
                t2 = ' dip ';
            }
            var m3 = data['personas'][m[i+2*cant][0]];
            var c3 = m[i+2*cant][1];
            if (m3['diputado']){
                t3 = ' dip ';
            }
            text = text + '<td class="'+t1+'">'+m1['nombre-corto']+'</td><td class="total">'+c1+'</td><td class="hidden-sm hidden-xs'+t2+'">'+m2['nombre-corto']+'</td><td class="hidden-sm hidden-xs total">'+c2+'</td><td class="hidden-sm hidden-xs'+t3+'">'+m3['nombre-corto']+'</td><td class="hidden-sm hidden-xs total">'+c3+'</td>';
            text = text+'</tr>';
            $('#'+bid).append(text);
        }
    }
    
    function set_membership_histogram() { 
        var members = ['Membresías al CS',54,41,12,4,4,6,1,3];
        var bosses = ['Dirección del CS',7,4,1,4,0,3,1,1];
        var chart = c3.generate({
        bindto: '#histograma',
        data: {
          x : 'x',
          columns: [
            ['x','1 vez','2 veces','3 veces','4 veces','5 veces','6 veces','7 veces','8 veces'],
            members,
            bosses,
          ],
          colors: {
                'Membresías al CS': '#B1B1B1',
                'Dirección del CS': '#298CEE',
            },
          type: 'bar',
        },
        axis: {
          x: {
            type: 'categorized',
            label: 'Número de Pertenencias'
          },
          y: {
            label: 'Total de Diputados',
            position: 'outer-middle',
          }
        }, 
        bar: {
          width: {
            ratio: 0.9,
            max: 100
          },
        }
      }); 
      
    }
    
    function count_items(dict,year,keys) {
        var counter = {};
        var bcounter = {};
        for(var j in keys){
            var key=keys[j];
            counter[key]=0;
            bcounter[key]=0;
        }
        for(var i in dict){
            var m = dict[i];
            for(var j in keys){
                var key=keys[j];
                if (m['cargos'][year].indexOf(key)!=-1){
                    if (key in counter){
                        counter[key]=counter[key]+1;
                    } 
                    if (Number(i)<9){
                        if (key in bcounter){
                            bcounter[key]=bcounter[key]+1;
                        } 
                    }
                }
            }
        }
        return [counter,bcounter];
    }  
    
    function get_counting(data,keys){
        var counter = {};
        var bcounter = {};
        for(var j in keys){
            var key=keys[j];
            counter[key]=[];
            bcounter[key]=[];
        }
        for(var y in periods){
            var year = periods[y];
            var fc = count_items(get_init_counsil(data,year),year,keys);
            var lc = count_items(get_last_counsil(data,year),year,keys);
            for(var j in keys){
                var k = keys[j];
                counter[k].push(fc[0][k]);
                bcounter[k].push(fc[1][k]);
                counter[k].push(lc[0][k]);
                bcounter[k].push(lc[1][k]);
            }
        } 
        return [counter,bcounter];
    }  
    
    
    function set_evolution_charges(data,bid,dict,mapping){
        var x = ['x','Inicio I ANPP','Inicio II ANPP','Inicio III ANPP'
        ,'Inicio IV ANPP','Inicio V ANPP','Inicio VI ANPP'
        ,'Inicio VII ANPP','Inicio VIII ANPP'];
        var c=[x];
        for(var i in dict){
            var t=[mapping[i]];
            for(var j in dict[i]){
                if (j%2==0){
                    t.push(dict[i][j]);    
                }
            }
            c.push(t);
        }
        
        var chart = c3.generate({
        bindto: "#"+bid,
        data: {
          x : 'x',
          columns: c,
          type: 'line',
        },
        axis: {
          x: {
            type: 'categorized',
            label: 'ANPP'
          },
          y: {
            label: 'Total de Diputados',
            position: 'outer-middle',
          }
        }
      }); 
    }
    
    function set_pie(data,all) {
       var m=0;
       var f=0;
       for(var i in all){
           if(data['personas'][all[i][0]]['sexo']=='m'){
              m++;
           } else {
              f++;
           }
       }
       var chart1 = c3.generate({
        bindto: '#pie-gender',
        data: {
          columns: [
            ["Hombres", m],
            ["Mujeres", f],

          ],
          type : 'donut',
          colors: {
                'Mujeres': '#EE48A3',
                'Hombres': '#298CEE',
            },
        },
        axis: {
          x: {
            label: 'Sepal.Width'
          },
          y: {
            label: 'Petal.Width'
          }
        },
        donut: {
    
          title: all.length+" diputados",
          width: 70
        }
      });

      }
    function set_renovation_cs(data){
        var n = ['Miembros nuevos'];
        var o = ['Miembros que se mantienen']
        for(var t=1;t<periods.length;t++){
            var actualy = periods[t];
            var previousy =periods[t-1];
            var actual = get_init_counsil(data,actualy);
            var previous = get_last_counsil(data,previousy);
            var c = 0;
            for(var i in actual){
                var name = actual[i]['nombre'];
                for(var j in previous){
                    if(name==previous[j]['nombre']){
                        c++;
                    }
                }
            }
            n.push(31-c);
            o.push(c);
        }
         var x = ['x','Inicio II ANPP (1981)','Inicio III ANPP (1986)'
        ,'Inicio IV ANPP (1993)','Inicio V ANPP (1998)','Inicio VI ANPP (2003)'
        ,'Inicio VII ANPP (2008)','Inicio VIII ANPP  (2013)'];
        var chart = c3.generate({
        bindto: "#renovation-line",
        data: {
          x : 'x',
          columns: [x,n,o],
          type: 'line',
          //type: 'area-step',
          //groups: [[n[0], o[0]]],
        },
        axis: {
          x: {
            type: 'categorized',
            label: 'ANPP'
          },
          y: {
            label: 'Total de Miembros nuevos en el Consejo de Estado',
            position: 'outer-middle',
          } 
        },
         grid: {
          y: {
            lines: [{'value':15.5,'text':'' }]
          }
        }
        
      }); 
    }
      
    function set_area_step(data){
        var h = ['Hombres'];
        var m = ['Mujeres'];
        for(var y in periods){
            var year = periods[y];
            var ff = 0;
            var lf = 0;
            var fc = get_init_counsil(data,year);
            var lc = get_last_counsil(data,year);
            for(i in fc){
                if (fc[i]['sexo']=='f'){
                    ff++;
                }
                if (lc[i]['sexo']=='f'){
                    lf++;
                }
            }
            m.push(ff);
            m.push(lf);
            h.push(31-ff);
            h.push(31-lf);
        }
        var x = ['x','Inicio I ANPP','Fin I ANPP','Inicio II ANPP','Fin II ANPP','Inicio III ANPP','Fin III ANPP'
        ,'Inicio IV ANPP','Fin IV ANPP','Inicio V ANPP','Fin V ANPP','Inicio VI ANPP','Fin VI ANPP'
        ,'Inicio VII ANPP','Fin VII ANPP','Inicio VIII ANPP','Fin VIII ANPP'];
        var chart2 = c3.generate({
        bindto: '#step-area-gender',
        data: {
          x: 'x',
          columns: [
            x,
            h,
            m
          ],
          type: 'area-step',
          groups: [[h[0], m[0]]],
          colors: {
                'Mujeres': '#EE48A3',
                'Hombres': '#298CEE',
            }, 
        },
        
        axis: {
            x: {
                type: 'categorized',
                label: 'ANPP',
            },
            y: {
                label: 'Número de Diputados',
                
            }
        },
      });
    }
    
    
    function set_graphics(data){
        var t = get_cs_all(data);
        
        set_most_cs_table(data,t[0],10,'most-cs');
        set_most_cs_table(data,t[1],7,'most-pcs');
        set_membership_histogram();
        var b = get_counting(data,['bp','cc']);
        var mapping = {'cm':'Consejo de Ministros','fmc':'FMC',
        'pcclha':'Secretario del PCC en La Habana',
        'sppcc':'Secretario Provincial del PCC','bp':'Buró Político del PCC',
        'cc':'Comité Central del PCC','ctc':'CTC','1sujc':'UJC','fmc':'FMC','anap':'ANAP','cdr':'CDR'};
        set_evolution_charges(data,'line1-anpp',b[0],mapping);
        set_evolution_charges(data,'line2-anpp',b[1],mapping);
        set_pie(data,t[0]);
        set_area_step(data);
        console.log(set_renovation_cs(data));
    }
    set_graphics(data);
});

function changeEvolutionDiv(id1,id2){
        $('#'+id2).hide();
        $('#'+id1).show();
        $('#btn-'+id2).removeClass('check');
        $('#btn-'+id1).addClass('check');
}
