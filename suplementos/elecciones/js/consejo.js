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

$("#mt8").flip({
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
}

for(var i=9;i<32;i++){
    $("#m"+i).flip({
        axis: "y",
        reverse: true,
        trigger: "manual"
    });
}




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
            //back_change_in_cs(data,1976);
            back_change_no_vp();
        } 
    } 
    if (response.index==1){
        if (response.direction=='down'){
            //change_in_cs(data,1976);
            change_no_vp();
            
        } 
        else {
            //back_change_cs(data,1976);
            //back_change_no_vp();
            back_change_presidency();
        }
    } 
    if (response.index==2){
        if (response.direction=='down'){
            //change_cs(data,1981);
            change_presidency();
        } 
        else {
            //back_change_in_cs(data,1981);
            back_change_vp_cm();
        }
    }
    if (response.index==3){
        if (response.direction=='down'){
            //change_in_cs(data,1981);
            change_vp_cm();
        } 
        else {
            //back_change_cs(data,1981);
             back_change_ministers();
            
        }
    } 
    if (response.index==4){
        if (response.direction=='down'){
            change_ministers();
        } 
        else {
            //back_change_in_cs(data,1986);
           back_change_contralor();
        }
    }
    if (response.index==5){
        if (response.direction=='down'){
            //change_cs(data,1993);
            
            change_contralor();
        } 
        else {
            //back_change_in_cs(data,1993);
            back_change_institutions();
        }
    } 
    if (response.index==6){
        if (response.direction=='down'){
            //change_cs(data,1998);
            change_institutions();
        } 
        else {
            //back_change_in_cs(data,1998);
            back_change_beatriz();
        }
    }
    if (response.index==7){
        if (response.direction=='down'){
            //change_cs(data,2003);
            change_beatriz();
        } 
        else {
            //back_change_in_cs(data,2003);
            back_change_organizations()
        }
    }
    if (response.index==8){
        if (response.direction=='down'){
            //change_cs(data,2008);
            change_organizations();
        } 
        else {
            //back_change_in_cs(data,2008);
            back_change_guillermo();
        }
    }
    if (response.index==9){
		console.log(response);
        if (response.direction=='down'){
            //change_in_cs(data,2008);
            change_guillermo();
        } 
        else {
            //back_change_cs(data,2008);
            back_change_past();
        }
    }
    if (response.index==10){
        if (response.direction=='down'){
            //change_cs(data,2013); 
            change_past();
        } 
        else {
            //back_change_in_cs(data,2013);
            back_change_rest();
        }
    }
    if (response.index==11){
        if (response.direction=='down'){
            //change_in_cs(data,2013);
            change_rest();
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

    
    function init_council(){
        $('#m1 .front #m1-name').html("Miguel Díaz Canel"); 
        $("#m1 .front #m1-image img").prop('src','images/cs_canel.jpg');
        $('#m1 .back #m1-name').html("Esteban Lazo"); 
        $("#m1 .back #m1-image img").prop('src','images/cs_lazo.jpg');
        $('#m2 .front #m2-name').html("Salvador Valdés"); 
        $("#m2 .front #m2-image img").prop('src','images/cs_salvador.jpg');
        $('#m2 .back #m2-name').html("Ana M. Mari Machado"); 
        $("#m2 .back #m2-image img").prop('src','images/cs_ana.jpg');
        $('#m8 .front #m8-name').html("Homero Acosta"); 
        $("#m8 .front #m8-image img").prop('src','images/cs_homero.jpg');
        $('#mt8 .front #mt8-name').html("Homero Acosta"); 
        $("#mt8 .front #mt8-image img").prop('src','images/cs_homero.jpg');
        $('#m8 .back #m8-name').html("Miriam Brito"); 
        $("#m8 .back #m8-image img").prop('src','images/cs_brito.jpg');
        
        $('#mt3 .front #mt3-name').html("Ramiro Valdés"); 
        $("#mt3 .front #mt3-image img").prop('src','images/cs_ramiro.jpg');
        $('#mt4 .front #mt4-name').html("Gladys M. Bejeraron"); 
        $("#mt4 .front #mt4-image img").prop('src','images/cs_gladys.jpg');
        $('#mt5 .front #mt5-name').html("Inés Chapman"); 
        $("#mt5 .front #mt5-image img").prop('src','images/cs_ines.jpg');
        $('#mt6 .front #mt6-name').html("Roberto T. Morales"); 
        $("#mt6 .front #mt6-image img").prop('src','images/cs_roberto.jpg');
        $('#mt7 .front #mt7-name').html("Beatriz Johnson"); 
        $("#mt7 .front #mt7-image img").prop('src','images/cs_beatriz.jpg');
        $('#m3 .front #m3-name').html("Ramiro Valdés"); 
        $("#m3 .front #m3-image img").prop('src','images/cs_ramiro.jpg');
        $('#m4 .front #m4-name').html("Gladys M. Bejeraron"); 
        $("#m4 .front #m4-image img").prop('src','images/cs_gladys.jpg');
        $('#m5 .front #m5-name').html("Inés Chapman"); 
        $("#m5 .front #m5-image img").prop('src','images/cs_ines.jpg');
        $('#m6 .front #m6-name').html("Roberto T. Morales"); 
        $("#m6 .front #m6-image img").prop('src','images/cs_roberto.jpg');
        $('#m7 .front #m7-name').html("Beatriz Johnson"); 
        $("#m7 .front #m7-image img").prop('src','images/cs_beatriz.jpg');
        
        $('#m9 .front #m9-name').html("Leopoldo Cintra"); 
        $("#m9 .front #m9-image img").prop('src','images/cs_leopoldo.jpg');   
        $('#m11 .front #m11-name').html("Teresa Amarelle"); 
        $("#m11 .front #m11-image img").prop('src','images/cs_teresa.jpg');
        $('#m12 .front #m12-name').html("Ulises Guilarte"); 
        $("#m12 .front #m12-image img").prop('src','images/cs_ulises.jpg');
        $('#m13 .front #m13-name').html("Miriam Nicado"); 
        $("#m13 .front #m13-image img").prop('src','images/cs_miriam.jpg');
        $('#m14 .front #m14-name').html("Guillermo García"); 
        $("#m14 .front #m14-image img").prop('src','images/cs_guillermo.jpg');
        $('#m15 .front #m15-name').html("Bruno Rodríguez"); 
        $("#m15 .front #m15-image img").prop('src','images/cs_bruno.jpg');
        $('#m17 .front #m17-name').html("Carlos R. Miranda"); 
        $("#m17 .front #m17-image img").prop('src','images/cs_carlos.jpg');
        $('#m18 .front #m18-name').html("Rafael Santiesteban"); 
        $("#m18 .front #m18-image img").prop('src','images/cs_rafael.jpg');
        $('#m19 .front #m19-name').html("Miguel Barnet"); 
        $("#m19 .front #m19-image img").prop('src','images/cs_barnet.jpg');
        $('#m19 .back #m19-name').html("Luis Morlote"); 
        $("#m19 .back #m19-image img").prop('src','images/cs_morlote.jpg');
        $('#m20 .front #m20-name').html("Susely Morfa"); 
        $("#m20 .front #m20-image img").prop('src','images/cs_susely.jpg');
        $('#m21 .front #m21-name').html("Martha del C. Mesa"); 
        $("#m21 .front #m21-image img").prop('src','images/cs_martha.jpg');
        $('#m22 .front #m22-name').html("Ileana A. Flores"); 
        $("#m22 .front #m22-image img").prop('src','images/cs_ileana.jpg');
        $('#m23 .front #m23-name').html("Raúl Palmero"); 
        $("#m23 .front #m23-image img").prop('src','images/cs_raul.jpg');
        $('#m23 .back #m23-name').html("José Ángel Fernández"); 
        $("#m23 .back #m23-image img").prop('src','images/cs_josef.jpg');
        $('#m24 .front #m24-name').html("Jorge A. Berlanga"); 
        $("#m24 .front #m24-image img").prop('src','images/cs_berlanga.jpg');
        $('#m25 .front #m25-name').html("Yipsi Moreno"); 
        $("#m25 .front #m25-image img").prop('src','images/cs_yipsi.jpg');
        $('#m26 .front #m26-name').html("Elizabeth Peña"); 
        $("#m26 .front #m26-image img").prop('src','images/cs_elizabeth.jpg');
        $('#m27 .front #m27-name').html("Yoerky Sánchez"); 
        $("#m27 .front #m27-image img").prop('src','images/cs_yoerky.jpg');
        $('#m28 .front #m28-name').html("Bárbara A. Terry"); 
        $("#m28 .front #m28-image img").prop('src','images/cs_barbara.jpg');
        $('#m29 .front #m29-name').html("Reyna Salermo"); 
        $("#m29 .front #m29-image img").prop('src','images/cs_reyna.jpg');
        $('#m30 .front #m30-name').html("Rosalina Fournies"); 
        $("#m30 .front #m30-image img").prop('src','images/cs_rosalina.jpg');
        $('#m31 .front #m31-name').html("Carlos A. Martínez"); 
        $("#m31 .front #m31-image img").prop('src','images/cs_martinez.jpg');
        $('#m10 .front #m10-name').html("Felicia Martínez"); 
        $("#m10 .front #m10-image img").prop('src','images/cs_felicia.jpg');
        $('#m16 .front #m16-name').html("Ivis N. Villa"); 
        $("#m16 .front #m16-image img").prop('src','images/cs_ivis.jpg');
    }
    
    function change_no_vp(){
		$('#vps').fadeOut();
		setTimeout(function (){
			$('#m3, #m4, #m5, #m6, #m7').fadeIn();
		},300);
	}
	function back_change_no_vp(){
		$('#m3, #m4, #m5, #m6, #m7').fadeOut();
		setTimeout(function (){
			$('#vps').fadeIn();		
		},300);
	}
	
	function change_presidency(){
		$('#m1').flip('toggle');
		//$('#m1 .back #m1-name').addClass("bd"); 
		$('#m2').flip('toggle');
		//$('#m2 .back #m2-name').addClass("bd"); 
		$('#m8').flip('toggle');
		//$('#m8 .back #m8-name').addClass("bd"); 
		$('#mt8').fadeIn();
		
	}
	
	function back_change_presidency(){
		$('#m1').flip('toggle');
		$('#m2').flip('toggle');
		$('#m8').flip('toggle');
		$('#mt8').fadeOut();
	}
	
	function change_vp_cm(){
		$('#m3, #m5, #m6').fadeOut();	
	}
	
	function back_change_vp_cm(){
		$('#m3, #m5, #m6').fadeIn();	
	}
	
	function change_contralor(){
		$('#m4').fadeOut();	
	}
	function back_change_contralor(){
		$('#m4').fadeIn();	
	}
	
	function change_ministers(){
		$('#m9, #m15').fadeOut();	
	}
	
	function back_change_ministers(){
		$('#m9, #m15').fadeIn();	
	}
	
	function change_institutions(){
		$('#m19, #m23').flip('toggle');	
	}
	
	function back_change_institutions(){
		$('#m19, #m23').flip('toggle');	
	}
	
	function change_beatriz(){
		$('#m7 .front #m7-name').addClass("bdv");	
	}
	
	function back_change_beatriz(){
		$('#m7 .front #m7-name').removeClass("bdv");	
	}
	
	function change_organizations(){
		$('#m11 .front #m11-name').addClass("bdv");	
		$('#m12 .front #m12-name').addClass("bdv");	
		$('#m17 .front #m17-name').addClass("bdv");	
		$('#m18 .front #m18-name').addClass("bdv");	
		$('#m20 .front #m20-name').addClass("bdv");	
	}
	
	function back_change_organizations(){
		$('#m11 .front #m11-name').removeClass("bdv");	
		$('#m12 .front #m12-name').removeClass("bdv");	
		$('#m17 .front #m17-name').removeClass("bdv");	
		$('#m18 .front #m18-name').removeClass("bdv");	
		$('#m20 .front #m20-name').removeClass("bdv");	
	}
	
	function change_guillermo(){
		$('#m14 .front #m14-name').addClass("bdv");	
	}
	
	function back_change_guillermo(){
		$('#m14 .front #m14-name').removeClass("bdv");	
	}
	
	function change_past(){
		$('#m13 .front #m13-name').addClass("bdv");	
		$('#m21 .front #m21-name').addClass("bdv");	
		$('#m22 .front #m22-name').addClass("bdv");
	}
	
	function back_change_past(){
		$('#m13 .front #m13-name').removeClass("bdv");	
		$('#m21 .front #m21-name').removeClass("bdv");	
		$('#m22 .front #m22-name').removeClass("bdv");
	}
	
	function change_rest(){
		$('#m24 .front #m24-name').addClass("bdv");	
		$('#m25 .front #m25-name').addClass("bdv");	
		$('#m26 .front #m26-name').addClass("bdv");
		$('#m27 .front #m27-name').addClass("bdv");	
		$('#m31 .front #m31-name').addClass("bdv");
		setTimeout(function(){
			$('#m28, #m29, #m30, #m10, #m16').fadeOut();
		},300);	
	}
	
	function back_change_rest(){
		$('#m24 .front #m24-name').removeClass("bdv");	
		$('#m25 .front #m25-name').removeClass("bdv");	
		$('#m26 .front #m26-name').removeClass("bdv");
		$('#m27 .front #m27-name').removeClass("bdv");	
		$('#m31 .front #m31-name').removeClass("bdv");
		$('#m28, #m29, #m30, #m10, #m16').fadeIn();
		
	}
    
    init_council();
    
    
    
        
    
    
   
    
    
    
      
    
    
   

