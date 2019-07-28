$("[data='cu']").parent().addClass("cuba");

$('.flag-mini.popup').mouseover(function(){
	var at = $(this).attr("data");
	$("[data='"+at+"']").parent().addClass("history");
});

$('.flag-mini.popup').mouseleave(function(){
	var at = $(this).attr("data");
	$("[data='"+at+"']").parent().removeClass("history");
});

var chartp = c3.generate({
        bindto: '#medallasp',
        data: {
            x: 'Años',
          columns: [
 ['Años','1951','1955','1959','1963','1967','1971','1975','1979','1983','1987','1991','1995','1999','2003','2007','2011','2015'],
 ["Oro",9,1,2,4,7,31,56,64,79,75,140,112,70,72,59,58,36],
 ["Plata",9,6,4,6,16,49,45,47,53,52,62,66,40,41,35,35,27],
 ["Bronce",10,6,4,4,24,25,23,34,43,48,63,60,47,39,41,43,34],
 ["Total",28,13,10,14,47,105,134,135,165,175,265,238,157,152,135,136,97]
          ],
          types: {
           Artículos: 'spline',
        },
        colors: {
                'Artículos': '#EE1C25',
            }
        },
         axis: {
            x: {
                label: 'Años'
            },
            y: {
                label: 'Cantidad de Medallas',
                position: 'outer-middle',
            }
        },
        
      });
      
 var charto = c3.generate({
        bindto: '#medallaso',
        data: {
            x: 'Años',
          columns: [
 ['Años','1952','1956','1960','1964','1968','1972','1976','1980','1984','1988','1992','1996','2000','2004','2008','2012','2016'],
 ["Oro",0,0,0,0,0,3,6,8,null,null,14,9,11,9,3,5,5],
 ["Plata",0,0,0,1,4,1,4,7,null,null,6,8,11,7,10,3,2],
 ["Bronce",0,0,0,0,0,4,3,5,null,null,11,8,7,11,17,7,4],
 ["Total",0,0,0,1,4,8,13,20,null,null,31,25,29,27,30,15,11]
          ],
          types: {
           Artículos: 'spline',
        },
        colors: {
                'Artículos': '#EE1C25',
            }
        },
         axis: {
            x: {
                label: 'Años'
            },
            y: {
                label: 'Cantidad de Medallas',
                position: 'outer-middle',
            }
        },
        
      });
var chartc = c3.generate({
        bindto: '#medallasc',
        data: {
            x: 'Años',
          columns: [
 ['Años','1954','1959','1962','1966','1970','1974','1978','1982','1986','1990','1993','1998','2002','2006','2010','2014','2018'],
 ["Oro",29,null,12,35,99,101,116,173,170,180,227,191,null,138,null,123,102],
 ["Plata",19,null,11,19,60,55,45,71,82,90,76,74,null,86,null,66,72],
 ["Bronce",20,null,13,34,50,33,17,38,44,52,61,69,null,61,null,65,68],
 ["Total",68,null,36,88,209,189,178,282,296,322,364,334,null,285,null,254,242]
          ],
          types: {
           Artículos: 'spline',
        },
        colors: {
                'Artículos': '#EE1C25',
            }
        },
         axis: {
            x: {
                label: 'Años'
            },
            y: {
                label: 'Cantidad de Medallas',
                position: 'outer-middle',
            }
        },
        
      });
      
$('#medallaso').hide();
$('#medallasc').hide();
      
$('#game').on('change', function(e){
		var g = $('#game').val();
		$('.mevol').hide();
		$('#'+g).show();
});
      
$.getJSON("data/prediction.json",function(data){
	var pan = "-get_panam_info-";
	var oli = "-get_olympic_info-";
	
	function setPredictionInfo(){
		var country = $('#country').val();
		var model = $('#model').val();
		var oro = "images/"+country;
		var plata = "images/"+country;
		var bronce = "images/"+country;
		if (model=="pan") {
			oro = oro + pan+'oro.png';
			$('#oro-can').html(Math.round(data[country]['panam']['oro']['cant']));
			plata = plata + pan+'plata.png';
			$('#plata-can').html(Math.round(data[country]['panam']['plata']['cant']));
			bronce = bronce + pan+'bronce.png';	
			$('#bronce-can').html(Math.round(data[country]['panam']['bronce']['cant']));
		} else {
			oro = oro + oli+'oro.png';
			$('#oro-can').html(Math.round(data[country]['olympic']['oro']['cant']));
			plata = plata + oli+'plata.png';
			$('#plata-can').html(Math.round(data[country]['olympic']['plata']['cant']));
			bronce = bronce + oli+'bronce.png';
			$('#bronce-can').html(Math.round(data[country]['olympic']['bronce']['cant']));	
		}
		$('#img-oro').attr('src',oro);
		$('#img-plata').attr('src',plata);
		$('#img-bronce').attr('src',bronce);
	}
	
	$('#model').on('change',function(e){
		setPredictionInfo();	
	});
	$('#country').on('change',function(e){
		setPredictionInfo();	
	});
});
