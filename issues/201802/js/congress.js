//colors
var c_bills = '#364AAB';
var c_bills_law = "#7B85B3";
var c_amends = "#266602";
var c_amends_pass = "#A5E77E";
var c_res = "#BF5E03";
var c_res_simp = "#FF7F0E";
var c_res_conc = "#E84C09";
var c_res_join = "#E89A0A";
var c_res_pass = "#E8C070";
var c_proposals = '#CF142B';
var chile = '#0039A6';


// using d3 for convenience
var disp = d3.selectAll('.disp');
var graph = d3.selectAll('.graph');

var container1 = d3.select('#scroll1');
var graphic1 = container1.select('#scroll_graphic1');
var gcontent1 = graphic1.select('#gcontent1');
var text1 = container1.select('#scroll_text1');
var step1 = text1.selectAll('.step1');

var container2 = d3.select('#scroll2');
var graphic2 = container2.select('#scroll_graphic2');
var gcontent2 = graphic2.select('#gcontent2');
var text2 = container2.select('#scroll_text2');
var step2 = text2.selectAll('.step2');

var container3 = d3.select('#scroll3');
var graphic3 = container3.select('#scroll_graphic3');
var gcontent3 = graphic3.select('#gcontent3');
var text3 = container3.select('#scroll_text3');
var step3 = text3.selectAll('.step3');

// initialize the scrollama
var scroller1 = scrollama();
var scroller2 = scrollama();
var scroller3 = scrollama();

function get_general_bills() { return c3.generate({
    bindto: '#bills',
    data: {
      columns: [
        ['Bills', 1272],
        ['Resolutions', 405],
        ['Amendments', 217]
      ],
      type: 'donut',
      labels: true,
      colors: {'Bills':c_bills,'Resolutions':c_res,'Amendments':c_amends,
      'Bills - No Laws': c_bills,"Bills - Laws":c_bills_law},
    },
    legend: {
        show: true,
    },
    padding: {
        right: 30
    },
    donut : {
        title: '1894 propuestas' 
    },
    interaction: {
      enabled: true
    },
    tooltip: {
        format: {
            title: function(d) {return d},
            value: function(value, ratio, id) { return d3.format(",.1f")(ratio*100)+'% ('+value+')' },
        } 
    }
}); 
}

function get_detail_bills() { return c3.generate({
    bindto: '#bills',
    data: {
      columns: [
        ['Bills - No Laws', 1100],
        ['Bills - Laws', 172],
      ],
      type: 'donut',
      labels: true,
      colors: {'Bills':c_bills,'Resolutions':c_res,'Amendments':c_amends,
      'Bills - No Laws': c_bills,"Bills - Laws":c_bills_law},
    },
    legend: {
        show: true,
    },
    padding: {
        right: 30
    },
    donut : {
        title: '1272 Bills' 
    },
    interaction: {
      enabled: true
    },
    tooltip: {
        format: {
            title: function(d) {return d},
            value: function(value, ratio, id) { return d3.format(",.1f")(ratio*100)+'% ('+value+')' },
        } 
    }
}); 
}

function get_chambers_bills(){ c3.generate({
        bindto: '#bills',
        data: {
          x: 'Cámara',
          columns: [
            ['Cámara','Cámara de Representantes','Senado'],
            ['Bills - No Laws', 683, 417],
            ['Bills - Laws',148, 24],
          ],
          groups: [['Bills - No Laws','Bills - Laws']],
          type: 'bar',
          labels: true,
          colors:{'Bills - No Laws':c_bills,'Bills - Laws':c_bills_law}
        },
        padding: {
            right: 30
        },
        axis: {
          x: {
           type: 'categorized',
           label: 'Cámara'
          }
        },
        tooltip: {
            format: {
                title: function(d) {return d},
                value: function(value, id) { return ''+value+'' },
            } 
        }
});
}

function get_detail_res(){
    return c3.generate({
    bindto: '#bills',
    data: {
      columns: [
        ['Simple', 217],
        ['Concurrent', 128],
        ['Joint', 60]
      ],
      type: 'donut',
      labels: true,
      colors: {'Simple':c_res_simp,"Concurrent":c_res_conc,"Joint":c_res_join},
    },
    legend: {
        show: true,
    },
    interaction: {
      enabled: true
    },
    tooltip: {
        format: {
            title: function(d) {return d},
            value: function(value, ratio, id) { return d3.format(",.1f")(ratio*100)+'% ('+value+')' },
        } 
    },
    donut : {
        title: '405 Resolutions' 
    },
        padding: {
            right: 30
        }
});
}

function get_begin_res(){
    return c3.generate({
    bindto: '#bills',
    data: {
      x: 'Cámara',
      columns: [
        ['Cámara','Cámara de Representantes','Senado'],
        ['Simple Resolutions - No Passed', 91,60],
        ['Simple Resolutions - Passed', 27,39],
      ],
      groups: [['Simple Resolutions - No Passed','Simple Resolutions - Passed'],
      ['Concurrent Resolutions - No passed','Concurrent Resolutions - Passed'],
      ['Joint Resolutions - No Laws','Joint Resolutions - Laws']
      ],
      type: 'bar',
      labels: true,
      colors: {'Simple Resolutions - No Passed': c_res_simp, "Simple Resolutions - Passed": c_res_pass,
      'Concurrent Resolutions - No passed': c_res_conc, "Concurrent Resolutions - Passed": c_res_pass,
      'Joint Resolutions - No Laws': c_res_join, "Joint Resolutions - Laws": c_bills_law
      }
    },
    legend: {
        show: true,
    },axis: {
          x: {
           type: 'categorized',
           label: 'Cámara'
          }
        },
    interaction: {
      enabled: true
    },
        padding: {
            right: 30
        }
});
}

function get_complete_res(){
    return c3.generate({
    bindto: '#bills',
    data: {
      x: 'Cámara',
      columns: [
        ['Cámara','Cámara de Representantes','Senado'],
        ['Simple Resolutions - No Passed', 91,60],
        ['Simple Resolutions - Passed', 27,39],
        ['Concurrent Resolutions - No passed', 95,28],
        ['Concurrent Resolutions - Passed', 4,1],
        ['Joint Resolutions - No Laws', 42,8],
        ['Joint Resolutions - Laws', 9,1],
      ],
      groups: [['Simple Resolutions - No Passed','Simple Resolutions - Passed'],
      ['Concurrent Resolutions - No passed','Concurrent Resolutions - Passed'],
      ['Joint Resolutions - No Laws','Joint Resolutions - Laws']
      ],
      type: 'bar',
      labels: true,
      colors: {'Simple Resolutions - No Passed': c_res_simp, "Simple Resolutions - Passed": c_res_pass,
      'Concurrent Resolutions - No passed': c_res_conc, "Concurrent Resolutions - Passed": c_res_pass,
      'Joint Resolutions - No Laws': c_res_join, "Joint Resolutions - Laws": c_bills_law
      }
    },
    legend: {
        show: true,
    },axis: {
          x: {
           type: 'categorized',
           label: 'Cámara'
          }
        },
    interaction: {
      enabled: true
    },
        padding: {
            right: 30
        }
});
}

function get_detail_amends(){
    return c3.generate({
    bindto: '#bills',
    data: {
      columns: [
        ['Amendments - No Passed', 217],
        ['Amendments - Passed', 60],
      ],
      type: 'pie',
      labels: true,
      colors: {'Amendments - No Passed': c_amends,'Amendments - Passed':c_amends_pass},
    },
    legend: {
        show: true,
    },
    interaction: {
      enabled: true
    },
    padding: {
        right: 30
    },
    tooltip: {
        format: {
            title: function(d) {return d},
            value: function(value, ratio, id) { return d3.format(",.1f")(ratio*100)+'% ('+value+')' },
        } 
    }
});
}

function get_lines(){ return c3.generate({
    bindto: '#lines',
    data: {
      x: 'Congresos',
      columns: [
        ['Congresos', 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115,116, 117],
        ['Propuestas', null, null, null,16, 28, 36, 59, 59, 75, 58, 86, 106, 95, 53, 89, 82, 106, 84, 103, 114, 109, 155, 100, 86, 143, 52, null, null],
        //['Laws',null, null, null,0, 2, 6, 12, 6, 8, 9, 10, 15, 12, 9, 8, 12, 7, 8, 6, 6, 5, 14, 9, 8, 7, 3, null, null],
        //['Passed Resolutions',null,null,null,0, 0, 0, 0, 0, 1, 1, 0, 4, 2, 1, 3, 2, 6, 7, 7, 10, 8, 4, 7, 4, 4, 0,null,null],
      ],
      labels: true,
      type: 'spline',
      colors: {'Propuestas': c_proposals,'Laws':c_bills_law,'Passed Resolutions': c_res_pass,'Laws + Passed Resolutions':c_amends},
    },
    axis: {
      x: {
        label: 'Congresos',
        position: 'outer-middle',
      },
       y: {
        default: [0,180],
        label: 'Cantidad',
        position: 'outer-middle',
      }
    },
    legend: {
        show: true,
    },
    padding: {
        right: 0
    },
    tooltip: {
      grouped: true
    },
    tooltip: {
        format: {
            title: function(d) {return d+' Congreso'}
        } 
    },
     grid: {
      x: {
        lines: [{'value':91,'text':'Richard Nixon'},{'value':93.5,'text':'Gerald Ford'},{'value':95,'text':'Jimmy Carter'},
        {'value':99,'text':'Ronald Reagan'},{'value':103,'text':'William Clinton'},
        {'value':107,'text':'George Bush Jr.'},{'value':111,'text':'Barack Obama'},{'value':115,'text':'Donald Trump'}]
    }
    },
        subchart: {
          show: false
    }
});
}


function get_chile_lines(){ return c3.generate({
    bindto: '#chile-lines',
    data: {
      x: 'Congresos',
      columns: [
        ['Congresos',  92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115,116],
        ['Cuba',  null,16, 28, 36, 59, 59, 75, 58, 86, 106, 95, 53, 89, 82, 106, 84, 103, 114, 109, 155, 100, 86, 143, 52, null],
        ['Chile', null,204, 169, 149, 138, 394, 371, 436, 499, 22, 14, 9, 5, 29, 23, 14, 28, 26, 29, 19, 13, 13, 9, 9, null],
      ],
      labels: true,
      type: 'spline',
      colors: {'Cuba': c_proposals,'Chile': chile},
    },
    axis: {
      x: {
        label: 'Congresos',
        position: 'outer-middle',
      },
       y: {
        default: [0,180],
        label: 'Propuestas',
        position: 'outer-middle',
      }
    },
    legend: {
        show: true,
    },
    padding: {
        right: 0
    },
    tooltip: {
      grouped: true
    },
    tooltip: {
        format: {
            title: function(d) {return d+' Congreso'},
        } 
    },
     grid: {
      x: {
        lines: [{'value':100.5,'text':'Plebiscito Nacional de Chile de 1988'}]
    }
    },
    regions : [{start:92,end:100.5}],
});
}

function get_pos_data(){ 
return {93: {'Angola': 0, 'Haití': 1, 'México': 1, 'Nicaragua': 1, 'Pakistán': 0},
 94: {'Angola': 2, 'México': 2, 'Polonia': 2, 'URSS': 2, 'Vietnam': 4},
 95: {'Angola': 4, 'Egipto': 4, 'Israel': 8, 'URSS': 7, 'Vietnam': 9},
 96: {'Angola': 6, 'Haití': 15, 'Panamá': 8, 'URSS': 9, 'Vietnam': 9},
 97: {'Canadá': 7, 'Haití': 15, 'México': 12, 'Polonia': 6, 'Vietnam': 7},
 98: {'Egipto': 11,
  'El Salvador': 15,
  'Haití': 23,
  'México': 14,
  'Nicaragua': 14},
 99: {'Angola': 13,
  'El Salvador': 9,
  'Haití': 17,
  'México': 14,
  'Nicaragua': 9},
 100: {'Angola': 19,
  'Israel': 20,
  'Nicaragua': 20,
  'Polonia': 22,
  'URSS': 20},
 101: {'China': 21,
  'India': 24,
  'Japón': 19,
  'Panamá': 26,
  'URSS': 29},
 102: {'China': 26,
  'Irán': 21,
  'Iraq': 23,
  'Israel': 29,
  'Japón': 27,
  'URSS': 34},
 103: {'Haití': 11,
  'Israel': 11,
  'Corea del Norte': 10,
  'Rusia': 11,
  'URSS': 10},
 104: {'China': 19,
  'Israel': 24,
  'México': 26,
  'Rusia': 28,
  'URSS': 22},
 105: {'Haití': 24, 'Israel': 20, 'México': 25, 'Rusia': 21, 'Vietnam': 20},
 106: {'China': 24, 'Haití': 32, 'Israel': 18, 'Rusia': 28, 'Vietnam': 20},
 107: {'Canadá': 12, 'China': 13, 'Irán': 11, 'México': 12, 'Rusia': 11},
 108: {'Afganistán': 22, 'China': 16, 'Iraq': 20, 'Israel': 18, 'México': 21},
 109: {'Afganistán': 14,
  'China': 11,
  'Iraq': 13,
  'México': 13,
  'Pakistán': 10},
 110: {'Afganistán': 13, 'Irán': 10, 'Iraq': 17, 'Israel': 13, 'México': 14},
 111: {'Afganistán': 25,
  'Irán': 21,
  'Iraq': 24,
  'Corea del Norte': 18,
  'Pakistán': 20},
 112: {'Afganistán': 24,
  'Canadá': 20,
  'Irán': 22,
  'Iraq': 23,
  'Corea del Norte': 19},
 113: {'Afganistán': 20,
  'Canadá': 18,
  'Iraq': 21,
  'México': 19,
  'Rusia': 19},
 114: {'Afganistán': 21, 'Iraq': 24, 'México': 23, 'Rusia': 25, 'Siria': 23},
 115: {'China': 10, 'India': 9, 'Iraq': 10, 'Rusia': 11, 'Siria': 10}}
 } 

function get_positions(){ return c3.generate({
    bindto: '#chile-lines',
    data: {
      x: 'Congresos',
      columns: [
        ['Congresos',92,  93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115,116],
        ['Pakistán',null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 1, null, 2, null, null, null, null,null],
        ['Angola',null, null, 4, 2, 1, null, null, 3, 1, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,null],
        ['México',null, 5, 3, null, null, 4, 3, 4, null, null, null, null, 4, 5, null, 4, 4, 4, 4, null, null, 3, 3, null,null],
        ['Egipto',null, null, null, 1, null, null, 1, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,null],
        ['India',null, null, null, null, null, null, null, null, null, 3, null, null, null, null, null, null, null, null, null, null, null, null, null, 1,null],
        ['Corea del Norte',null, null, null, null, null, null, null, null, null, null, null, 2, null, null, null, null, null, null, null, 1, 1, null, null, null,null],
        ['Japón',null, null, null, null, null, null, null, null, null, 1, 3, null, null, null, null, null, null, null, null, null, null, null, null, null,null],
        ['Nicaragua',null, 4, null, null, null, null, 2, 2, 4, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,null],
        ['URSS',null, null, 2, 3, 4, null, null, null, 3, 5, 5, 1, 2, null, null, null, null, null, null, null, null, null, null, null,null],
        ['Canadá',null, null, null, null, null, 3, null, null, null, null, null, null, null, null, null, 3, null, null, null, null, 2, 1, null, null,null],
        ['Afganistán',null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 5, 5, 3, 5, 5, 4, 1, null,null],
        ['Panamá',null, null, null, null, 2, null, null, null, null, 4, null, null, null, null, null, null, null, null, null, null, null, null, null, null,null],
        ['Israel',null, null, null, 4, null, null, null, null, 2, null, 4, 5, 3, 2, 1, null, 2, null, 2, null, null, null, null, null,null],
        ['Irán',null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2, null, null, 1, 3, 3, null, null, null,null],
        ['China',null, null, null, null, null, null, null, null, null, 2, 2, null, 1, null, 3, 5, 1, 2, null, null, null, null, null, 4,null],
        ['Haití',null, 3, null, null, 5, 5, 5, 5, null, null, null, 4, null, 4, 5, null, null, null, null, null, null, null, null, null,null],
        ['Iraq',null, null, null, null, null, null, null, null, null, null, 1, null, null, null, null, null, 3, 3, 5, 4, 4, 5, 4, 3,null],
        ['El Salvador',null, null, null, null, null, null, 4, 1, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,null],
        ['Polonia',null, null, 1, null, null, 1, null, null, 5, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,null],
        ['Vietnam',null, null, 5, 5, 3, 2, null, null, null, null, null, null, null, 1, 2, null, null, null, null, null, null, null, null, null,null],
        ['Siria',null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2, 2,null],
        ['Rusia',null, null, null, null, null, null, null, null, null, null, null, 3, 5, 3, 4, 1, null, null, null, null, null, 2, 5, 5,null],
      ],
      labels: true,
      type: 'scatter',
    },
    axis: {
      x: {
        label: 'Congresos',
        position: 'outer-middle',
        tick: [92,  93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115,116],
      },
       y: {
        default: [0,6],
        show: false
      }
    },
    legend: {
        show: true,
    },
    padding: {
        right: 0,
        top: 20,
        left: 10,
    },
    tooltip: {
      grouped: false
    },
    tooltip: {
        format: {
            title: function(d) {return d+' Congreso'},
            value: function(value,id,x,d) { 
            return 'Posición '+(6-value)+' - '+get_pos_data()[d+92][x]+ ' coincidencias'},
        } 
    },
        point: {
          r: function (d) {
            if((d.x!=92)&&(d.x!=116))
                return get_pos_data()[d.x][d.id]/2+2;
          }
        }
});
}


// generic window resize listener event
function handleResize() {
    

    var height = window.innerHeight-70;
    var width = window.innerWidth-16;
    $('.halfgraph').css({'min-width':Math.floor(width/2),'transform':'translateY(40%)'});
    disp
        .style('width', width + 'px')
        .style('height', height+30+'px');
    graphic1
        .style('width', width + 'px')
        .style('height', height + 'px');

    gcontent1
        .style('width', width+'px')
        .style('height', height+ 'px');
    

    graphic2
        .style('width', width + 'px')
        .style('height', height + 'px');

    gcontent2
        .style('width', width+'px')
        .style('height', height+ 'px');

    graphic3
        .style('width', width + 'px')
        .style('height', height + 'px');

    gcontent3
        .style('width', width+'px')
        .style('height', height+ 'px');


    // 3. tell scrollama to update new element dimensions
    scroller1.resize();
    scroller2.resize();
    scroller3.resize();
}



// scrollama event handlers
function handleStepEnter1(response) {
    if (response.index==1){
        if (response.direction=='down'){
            get_detail_bills();
            
        }else{
            get_general_bills();
        }
    }
    if (response.index==2){
        if (response.direction=='down'){
            get_chambers_bills();
        }else{
            get_detail_bills();
        }
    }
    if (response.index==3){
        if (response.direction=='down'){
            get_detail_res();
        }else{
            get_chambers_bills();
        }
    }
    if (response.index==4){
        if (response.direction=='down'){
           res =  get_begin_res();
        }else{
            get_detail_res();
        }
    }
    if (response.index==5){
        if (response.direction=='down'){
            res.load({columns: [['Concurrent Resolutions - No passed', 95,28],['Concurrent Resolutions - Passed', 4,1]]});
        }else{
            res.unload(['Concurrent Resolutions - No passed','Concurrent Resolutions - Passed'])
        }
    }
    if (response.index==6){
        if (response.direction=='down'){
            res.load({columns: [['Joint Resolutions - No Laws', 42,8],['Joint Resolutions - Laws', 9,1]]});
        }else{
            res.unload(['Joint Resolutions - No Laws','Joint Resolutions - Laws'])
        }
    } 
    if (response.index==7){
        if (response.direction=='down'){
           get_detail_amends();
        }else{
           res = get_complete_res();
        }
    }
}

function handleStepEnter2(response) {
    
    if (response.index==1){
        if (response.direction=='down'){
            setTimeout(function () {
            lines.load({columns:[['Laws',null, null, null,0, 2, 6, 12, 6, 8, 9, 10, 15, 12, 9, 8, 12, 7, 8, 6, 6, 5, 14, 9, 8, 7, 3, null, null]]})}
        ,200);
         setTimeout(function () {
            lines.load({columns:[
        ['Passed Resolutions',null,null,null,0, 0, 0, 0, 0, 1, 1, 0, 4, 2, 1, 3, 2, 6, 7, 7, 10, 8, 4, 7, 4, 4, 0,null,null]]})}
        ,500);
         setTimeout(function (){lines.focus(['Laws','Passed Resolutions'])},1000);
        }else{
            lines.unload(['Laws','Passed Resolutions']);
        }
    }
    
    if (response.index==2){
        if (response.direction=='down'){
            lines.revert();
            lines.zoom([91,103]);
            lines.regions.add({start:93,end:101,class:"region1"});
        }else{
            lines.zoom([90,117]);
            lines.regions.remove({classes:['region1']});
        }
    }
    if (response.index==3){
        if (response.direction=='down'){
            lines.zoom([102,108]);
            lines.regions.add({start:103,end:106,class:"region2"});
        }else{
            lines.zoom([91,103]);
            lines.regions.remove({classes:['region2']});
        }
    }
    if (response.index==4){
        if (response.direction=='down'){
            lines.zoom([106,112]);
            lines.regions.add({start:108,end:110,class:"region3"});
            lines.hide(['Propuestas']);
        }else{
            lines.show(['Propuestas']);
            lines.zoom([102,108]);
            lines.regions.remove({classes:['region3']});
        }
    }
    if (response.index==5){
        if (response.direction=='down'){
            lines.show(['Propuestas']);
            lines.zoom([109,116]);
            lines.regions.add({start:111,end:114,class:"region4"});
        }else{
            lines.zoom([106,112]);
            lines.hide(['Propuestas']);
            lines.regions.remove({classes:['region4']});
        }
    }
    if (response.index==6){
        if (response.direction=='down'){
            lines.zoom([90,117]);
        }else{
            lines.zoom([109,116]);
        }
    }
}   

function handleStepEnter3(response) {
    if (response.index==1){
        if (response.direction=='down'){
            $('#cl').addClass('select-country');
            $('#il').fadeOut(50);
            $('#ca').fadeOut(100);
            $('#iq').fadeOut(150);
            $('#vn').fadeOut(200);
            $('#su').fadeOut(250);
            $('#cn').fadeOut(300);
            $('#jp').fadeOut(350);
            $('#af').fadeOut(400);
            $('#ir').fadeOut(450);
            $('#pa').fadeIn(500);
            $('#ht').fadeIn(550);
            $('#ni').fadeIn(600);
            $('#uy').fadeIn(650);
            $('#co').fadeIn(700);
            $('#pe').fadeIn(750);
            $('#ar').fadeIn(800);
            $('#bo').fadeIn(850);
        }else{
            $('#cl').removeClass('select-country');
            $('.am').hide();
            $('.noam').show(200);
        }
    }
    if (response.index==2){
        if (response.direction=='down'){
            console.log('Entra');
                $('#countries').hide();
                $("#chile-lines").show();
        }else{
            $("#chile-lines").hide();
            $('#countries').show();             
        }
    }
    if (response.index==3){
        if (response.direction=='down'){
            $('#chile-lines').hide();
            $('#countries2').show();
        }else{
            $('#countries2').hide();
            chile = get_chile_lines();
            $('#chile-lines').show();
        }
    }
    if (response.index==4){
        if (response.direction=='down'){
            $('#su2').addClass('select-country');
            $('#ru').addClass('select-country');
        }else{
            $('#su2').removeClass('select-country');
            $('#ru').removeClass('select-country');
        }
    }
    if (response.index==5){
        if (response.direction=='down'){
            positions = get_positions();
            $('#countries2').hide();
            $('#chile-lines').show();
        }else{
            $('#chile-lines').hide();
            $('#countries2').show();
            $('#su2').addClass('select-country');
            $('#ru').addClass('select-country');
        }
    }
    if (response.index==6){
        if (response.direction=='down'){
            positions.focus(['Angola']);
        }else{
            positions.revert();
        }
    }
    if (response.index==7){
        if (response.direction=='down'){
            positions.focus(['Afganistán','Irán','Iraq','Siria']);
        }else{
            positions.focus(['Angola']);
        }
    }
    if (response.index==8){
        if (response.direction=='down'){
            positions.focus([]);
        }else{
            positions.focus(['Afganistán','Irán','Iraq','Siria']);
        }
    }
    
}

function handleStepExit1(response) {
}
function handleStepExit2(response) {
}
function handleStepExit3(response) {
}

function handleContainerEnter1(response) {
}

function handleContainerEnter2(response) {
}

function handleContainerEnter3(response) {
}

function handleContainerExit1(response) {
}

function handleContainerExit2(response) {
}

function handleContainerExit3(response) {
}

function setupStickyfill() {
    d3.selectAll('.sticky').each(function () {
        Stickyfill.add(this);
    });
}

function init() {
    setupStickyfill();
    handleResize();
    
    scroller1.setup({
        container: '#scroll1',
        graphic: '#scroll_graphic1',
        text: '#scroll_text1',
        step: '#scroll_text1 .step1',
        debug: false,
        offset: 0.5
    })
        .onStepEnter(handleStepEnter1)
        .onStepExit(handleStepExit1)
        .onContainerEnter(handleContainerEnter1)
        .onContainerExit(handleContainerExit1);
        
    scroller2.setup({
        container: '#scroll2',
        graphic: '#scroll_graphic2',
        text: '#scroll_text2',
        step: '#scroll_text2 .step2',
        debug: false,
        offset: 0.5
    })
        .onStepEnter(handleStepEnter2)
        .onContainerEnter(handleContainerEnter2)
        .onContainerExit(handleContainerExit2);
        
    scroller3.setup({
        container: '#scroll3',
        graphic: '#scroll_graphic3',
        text: '#scroll_text3',
        step: '#scroll_text3 .step3',
        debug: false,
        offset: 0.5
    })
        .onStepEnter(handleStepEnter3)
        .onStepExit(handleStepExit3)
        .onContainerEnter(handleContainerEnter3)
        .onContainerExit(handleContainerExit3);

    // setup resize event
    window.addEventListener('resize', handleResize);
}

// kick things off
init();

var countries = {'AF': {'name':'Afganistán','total':2291},
                 'AO': {'name':'Angola','total':306},
                 'AR': {'name':'Argentina','total':285},
                 'BO': {'name':'Bolivia','total':285},
                 'BR': {'name':'Brasil','total':452},
                 'CA': {'name':'Candá','total':4091},
                 'CL': {'name':'Chile','total':2622},
                 'CN': {'name':'China','total':2944},
                 'CO': {'name':'Colombia','total':654},
                 'CR': {'name':'Costa Rica','total':241},
                 'DO': {'name':'República Dominicana','total':273},
                 'EC': {'name':'Ecuador','total':235},
                 'EG': {'name':'Egipto','total':832},
                 'SV': {'name':'El Salvador','total':617},
                 'FR': {'name':'Francia','total':1454},
                 'DE': {'name':'Alemania','total':1781},
                 'GT': {'name':'Guatemala','total':413},
                 'HT': {'name':'Haití','total':877},
                 'HN': {'name':'Honduras','total':407},
                 'IN': {'name':'India','total':984},
                 'IR': {'name':'Irán','total':2011},
                 'IQ': {'name':'Iraq','total':3604},
                 'IL': {'name':'Israel','total':6020},
                 'IT': {'name':'Italia','total':842},
                 'JP': {'name':'Japón','total':2383},
                 'LY': {'name':'Libia','total':676},
                 'MX': {'name':'México','total':31854},
                 'NA': {'name':'Namibia','total':100},
                 'NI': {'name':'Nicaragua','total':727},
                 'NG': {'name':'Nigeria','total':251},
                 'KP': {'name':'Corea del Norte','total':885},
                 'PK': {'name':'Pakistán','total':922},
                 'PS': {'name':'Palestina','total':470},
                 'PA': {'name':'Panamá','total':1233},
                 'PY': {'name':'Paraguay','total':81},
                 'PE': {'name':'Perú','total':385},
                 'PL': {'name':'Polonia','total':961},
                 'RU': {'name':'Rusia','total':1774},
                 'SO': {'name':'Somalia','total':418},
                 'ZA': {'name':'Sudáfrica','total':792},
                 'ES': {'name':'España','total':635},
                 'SD': {'name':'Sudán','total':636},
                 'SY': {'name':'Siria','total':1096},
                 'TR': {'name':'Turquía','total':1107},
                 'UA': {'name':'Ucrania','total':709},
                 'UK': {'name':'Reino Unido','total':1731},
                 'UY': {'name':'Uruguay','total':704},
                 'VE': {'name':'Venezuela','total':272},
                 'VN': {'name':'Vietnam','total':3362},
                 'YE': {'name':'Yemen','total':309},
                 'CU': {'name':'Cuba','total':1894}}

map = new jvm.Map({map: 'world_mill',backgroundColor: 'transparent', container:$("#map"),
            series: {
                    regions: [{
                    attribute: 'fill',
                    scale: ['#C8EEFF', '#0071A4'],
                    normalizeFunction: 'polynomial',
                    values: {'AF': 2291,
                             'AO': 306,
                             'AR': 285,
                             'BO': 285,
                             'BR': 452,
                             'CA': 4091,
                             'CL': 2622,
                             'CN': 2944,
                             'CO': 654,
                             'CR': 241,
                             'DO': 273,
                             'EC': 235,
                             'EG': 832,
                             'SV': 617,
                             'FR': 1454,
                             'DE': 1781,
                             'GT': 413,
                             'HT': 877,
                             'HN': 407,
                             'IN': 984,
                             'IR': 2011,
                             'IQ': 3604,
                             'IL': 6020,
                             'IT': 842,
                             'JP': 2383,
                             'LY': 676,
                             'MX': 31854,
                             'NA': 100,
                             'NI': 727,
                             'NG': 251,
                             'KP': 885,
                             'PK': 922,
                             'PS': 470,
                             'PA': 1233,
                             'PY': 81,
                             'PE': 385,
                             'PL': 961,
                             'RU': 1774,
                             'SO': 418,
                             'ZA': 792,
                             'ES': 635,
                             'SD': 636,
                             'SY': 1096,
                             'TR': 1107,
                             'UA': 709,
                             'UK': 1731,
                             'UY': 704,
                             'VE': 272,
                             'VN': 3362,
                             'YE': 309,
                             'CU': 1894},
                    min: 1,
                    max: 31854,
                    }]
                },
                 onRegionTipShow: function(e, el, code){
                if (code in countries)
                        el.html('<img class="flag-min" src="../../assets/images/flags-mini/'+code.toLowerCase()+'.png"> '+countries[code]['name']+'<br> '+countries[code]['total']+' propuestas legislativas');
                else
                        el.html(el.html()+' - no fue analizado');
                
        },
        zoomOnScroll: false,
            regionStyle: {
              initial: {
                fill: '#8f8f8f'
                
              }
}});


bills = get_general_bills();
lines = get_lines();
chile = get_chile_lines();

function get_line_g(did){ return c3.generate({
    bindto: did,
    data: {
      x: 'Congresos',
      columns: [
        ['Congresos', 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115,116, 117],
        ['Propuestas', null, null, null,16, 28, 36, 59, 59, 75, 58, 86, 106, 95, 53, 89, 82, 106, 84, 103, 114, 109, 155, 100, 86, 143, 52, null, null],
        ['Laws',null, null, null,0, 2, 6, 12, 6, 8, 9, 10, 15, 12, 9, 8, 12, 7, 8, 6, 6, 5, 14, 9, 8, 7, 3, null, null],
        ['Passed Resolutions',null,null,null,0, 0, 0, 0, 0, 1, 1, 0, 4, 2, 1, 3, 2, 6, 7, 7, 10, 8, 4, 7, 4, 4, 0,null,null],
      ],
      labels: true,
      type: 'spline',
      colors: {'Propuestas': c_proposals,'Laws':c_bills_law,'Passed Resolutions': c_res_pass,'Laws + Passed Resolutions':c_amends},
    },
    axis: {
      x: {
        label: 'Congresos',
        position: 'outer-middle',
      },
       y: {
        default: [0,180],
        label: 'Cantidad',
        position: 'outer-middle',
      }
    },
    legend: {
        show: true,
    },
    padding: {
        right: 0
    },
    tooltip: {
      grouped: true
    },
    tooltip: {
        format: {
            title: function(d) {return d+' Congreso'}
        } 
    },
     grid: {
      x: {
        lines: [{'value':91,'text':'Richard Nixon'},{'value':93.5,'text':'Gerald Ford'},{'value':95,'text':'Jimmy Carter'},
        {'value':99,'text':'Ronald Reagan'},{'value':103,'text':'William Clinton'},
        {'value':107,'text':'George Bush Jr.'},{'value':111,'text':'Barack Obama'},{'value':115,'text':'Donald Trump'}]
    }
    },
        subchart: {
          show: false
    }
});
}

var g7=get_line_g('#g7');
var g8=get_line_g('#g8');
g8.zoom([91,103]);
g8.regions.add({start:93,end:101,class:"region1"});
var g9=get_line_g('#g9');
g9.zoom([102,108]);
g9.regions.add({start:103,end:106,class:"region2"});
var g10=get_line_g('#g10');
g10.zoom([106,112]);
g10.regions.add({start:108,end:110,class:"region3"});
g10.hide(['Propuestas']);
var g11=get_line_g('#g11');
g11.zoom([109,116]);
g11.regions.add({start:111,end:114,class:"region4"});
var g12=get_line_g('#g12');
g12.regions.add({start:93,end:101,class:"region1"});
g12.regions.add({start:103,end:106,class:"region2"});
g12.regions.add({start:108,end:110,class:"region3"});
g12.regions.add({start:111,end:114,class:"region4"});

var g14 = c3.generate({
    bindto: '#g14',
    data: {
      x: 'Congresos',
      columns: [
        ['Congresos',92,  93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115,116],
        ['Pakistán',null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 1, null, 2, null, null, null, null,null],
        ['Angola',null, null, 4, 2, 1, null, null, 3, 1, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,null],
        ['México',null, 5, 3, null, null, 4, 3, 4, null, null, null, null, 4, 5, null, 4, 4, 4, 4, null, null, 3, 3, null,null],
        ['Egipto',null, null, null, 1, null, null, 1, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,null],
        ['India',null, null, null, null, null, null, null, null, null, 3, null, null, null, null, null, null, null, null, null, null, null, null, null, 1,null],
        ['Corea del Norte',null, null, null, null, null, null, null, null, null, null, null, 2, null, null, null, null, null, null, null, 1, 1, null, null, null,null],
        ['Japón',null, null, null, null, null, null, null, null, null, 1, 3, null, null, null, null, null, null, null, null, null, null, null, null, null,null],
        ['Nicaragua',null, 4, null, null, null, null, 2, 2, 4, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,null],
        ['URSS',null, null, 2, 3, 4, null, null, null, 3, 5, 5, 1, 2, null, null, null, null, null, null, null, null, null, null, null,null],
        ['Canadá',null, null, null, null, null, 3, null, null, null, null, null, null, null, null, null, 3, null, null, null, null, 2, 1, null, null,null],
        ['Afganistán',null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 5, 5, 3, 5, 5, 4, 1, null,null],
        ['Panamá',null, null, null, null, 2, null, null, null, null, 4, null, null, null, null, null, null, null, null, null, null, null, null, null, null,null],
        ['Israel',null, null, null, 4, null, null, null, null, 2, null, 4, 5, 3, 2, 1, null, 2, null, 2, null, null, null, null, null,null],
        ['Irán',null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2, null, null, 1, 3, 3, null, null, null,null],
        ['China',null, null, null, null, null, null, null, null, null, 2, 2, null, 1, null, 3, 5, 1, 2, null, null, null, null, null, 4,null],
        ['Haití',null, 3, null, null, 5, 5, 5, 5, null, null, null, 4, null, 4, 5, null, null, null, null, null, null, null, null, null,null],
        ['Iraq',null, null, null, null, null, null, null, null, null, null, 1, null, null, null, null, null, 3, 3, 5, 4, 4, 5, 4, 3,null],
        ['El Salvador',null, null, null, null, null, null, 4, 1, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,null],
        ['Polonia',null, null, 1, null, null, 1, null, null, 5, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,null],
        ['Vietnam',null, null, 5, 5, 3, 2, null, null, null, null, null, null, null, 1, 2, null, null, null, null, null, null, null, null, null,null],
        ['Siria',null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2, 2,null],
        ['Rusia',null, null, null, null, null, null, null, null, null, null, null, 3, 5, 3, 4, 1, null, null, null, null, null, 2, 5, 5,null],
      ],
      labels: true,
      type: 'scatter',
    },
    axis: {
      x: {
        label: 'Congresos',
        position: 'outer-middle',
        tick: [92,  93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115,116],
      },
       y: {
        default: [0,6],
        show: false
      }
    },
    legend: {
        show: true,
    },
    padding: {
        right: 0,
        top: 20,
        left: 10,
    },
    tooltip: {
      grouped: false
    },
    tooltip: {
        format: {
            title: function(d) {return d+' Congreso'},
            value: function(value,id,x,d) { 
            return 'Posición '+(6-value)+' - '+get_pos_data()[d+92][x]+ ' coincidencias'},
        } 
    },
        point: {
          r: function (d) {
            if((d.x!=92)&&(d.x!=116))
                return get_pos_data()[d.x][d.id]/2+2;
          }
        }
});

var g13 = c3.generate({
    bindto: '#g13',
    data: {
      x: 'Congresos',
      columns: [
        ['Congresos',  92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115,116],
        ['Cuba',  null,16, 28, 36, 59, 59, 75, 58, 86, 106, 95, 53, 89, 82, 106, 84, 103, 114, 109, 155, 100, 86, 143, 52, null],
        ['Chile', null,204, 169, 149, 138, 394, 371, 436, 499, 22, 14, 9, 5, 29, 23, 14, 28, 26, 29, 19, 13, 13, 9, 9, null],
      ],
      labels: true,
      type: 'spline',
      colors: {'Cuba': c_proposals,'Chile': chile},
    },
    axis: {
      x: {
        label: 'Congresos',
        position: 'outer-middle',
      },
       y: {
        default: [0,180],
        label: 'Propuestas',
        position: 'outer-middle',
      }
    },
    legend: {
        show: true,
    },
    padding: {
        right: 0
    },
    tooltip: {
      grouped: true
    },
    tooltip: {
        format: {
            title: function(d) {return d+' Congreso'},
        } 
    },
     grid: {
      x: {
        lines: [{'value':100.5,'text':'Plebiscito Nacional de Chile de 1988'}]
    }
    },
    regions : [{start:92,end:100.5}],
});

var g6= c3.generate({
    bindto: '#g6',
    data: {
      columns: [
        ['Amendments - No Passed', 217],
        ['Amendments - Passed', 60],
      ],
      type: 'pie',
      labels: true,
      colors: {'Amendments - No Passed': c_amends,'Amendments - Passed':c_amends_pass},
    },
    legend: {
        show: true,
    },
    interaction: {
      enabled: true
    },
    padding: {
        right: 30
    },
    tooltip: {
        format: {
            title: function(d) {return d},
            value: function(value, ratio, id) { return d3.format(",.1f")(ratio*100)+'% ('+value+')' },
        } 
    }
});

var g5 = c3.generate({
    bindto: '#g5',
    data: {
      x: 'Cámara',
      columns: [
        ['Cámara','Cámara de Representantes','Senado'],
        ['Simple Resolutions - No Passed', 91,60],
        ['Simple Resolutions - Passed', 27,39],
        ['Concurrent Resolutions - No passed', 95,28],
        ['Concurrent Resolutions - Passed', 4,1],
        ['Joint Resolutions - No Laws', 42,8],
        ['Joint Resolutions - Laws', 9,1],
      ],
      groups: [['Simple Resolutions - No Passed','Simple Resolutions - Passed'],
      ['Concurrent Resolutions - No passed','Concurrent Resolutions - Passed'],
      ['Joint Resolutions - No Laws','Joint Resolutions - Laws']
      ],
      type: 'bar',
      labels: true,
      colors: {'Simple Resolutions - No Passed': c_res_simp, "Simple Resolutions - Passed": c_res_pass,
      'Concurrent Resolutions - No passed': c_res_conc, "Concurrent Resolutions - Passed": c_res_pass,
      'Joint Resolutions - No Laws': c_res_join, "Joint Resolutions - Laws": c_bills_law
      }
    },
    legend: {
        show: true,
    },axis: {
          x: {
           type: 'categorized',
           label: 'Cámara'
          }
        },
    interaction: {
      enabled: true
    },
        padding: {
            right: 30
        }
});

var g4 = c3.generate({
    bindto: '#g4',
    data: {
      columns: [
        ['Simple', 217],
        ['Concurrent', 128],
        ['Joint', 60]
      ],
      type: 'donut',
      labels: true,
      colors: {'Simple':c_res_simp,"Concurrent":c_res_conc,"Joint":c_res_join},
    },
    legend: {
        show: true,
    },
    interaction: {
      enabled: true
    },
    tooltip: {
        format: {
            title: function(d) {return d},
            value: function(value, ratio, id) { return d3.format(",.1f")(ratio*100)+'% ('+value+')' },
        } 
    },
    donut : {
        title: '405 Resolutions' 
    },
        padding: {
            right: 30
        }
});

var g3 = c3.generate({
        bindto: '#g3',
        data: {
          x: 'Cámara',
          columns: [
            ['Cámara','Cámara de Representantes','Senado'],
            ['Bills - No Laws', 683, 417],
            ['Bills - Laws',148, 24],
          ],
          groups: [['Bills - No Laws','Bills - Laws']],
          type: 'bar',
          labels: true,
          colors:{'Bills - No Laws':c_bills,'Bills - Laws':c_bills_law}
        },
        padding: {
            right: 30
        },
        axis: {
          x: {
           type: 'categorized',
           label: 'Cámara'
          }
        },
        tooltip: {
            format: {
                title: function(d) {return d},
                value: function(value, id) { return ''+value+'' },
            } 
        }
});

var g2 = c3.generate({
    bindto: '#g2',
    data: {
      columns: [
        ['Bills - No Laws', 1100],
        ['Bills - Laws', 172],
      ],
      type: 'donut',
      labels: true,
      colors: {'Bills':c_bills,'Resolutions':c_res,'Amendments':c_amends,
      'Bills - No Laws': c_bills,"Bills - Laws":c_bills_law},
    },
    legend: {
        show: true,
    },
    padding: {
        right: 30
    },
    donut : {
        title: '1272 Bills' 
    },
    interaction: {
      enabled: true
    },
    tooltip: {
        format: {
            title: function(d) {return d},
            value: function(value, ratio, id) { return d3.format(",.1f")(ratio*100)+'% ('+value+')' },
        } 
    }
}); 
var g1 = c3.generate({
    bindto: '#g1',
    data: {
      columns: [
        ['Bills', 1272],
        ['Resolutions', 405],
        ['Amendments', 217]
      ],
      type: 'donut',
      labels: true,
      colors: {'Bills':c_bills,'Resolutions':c_res,'Amendments':c_amends,
      'Bills - No Laws': c_bills,"Bills - Laws":c_bills_law},
    },
    legend: {
        show: true,
    },
    padding: {
        right: 30
    },
    donut : {
        title: '1894 propuestas' 
    },
    interaction: {
      enabled: true
    },
    tooltip: {
        format: {
            title: function(d) {return d},
            value: function(value, ratio, id) { return d3.format(",.1f")(ratio*100)+'% ('+value+')' },
        } 
    }
}); 


