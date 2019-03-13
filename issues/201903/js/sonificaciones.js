var names = {
	'pri': 'Pinar del Río',
	'art': 'Artemisa',
	'ijv': 'Isla de la Juventud',
	'lha': 'La Habana',
	'may': 'Mayabeque',
	'mat': 'Matanzas',
	'cfg': 'Cienfuegos',
	'vcl': 'Villa Clara',
	'ssp': 'Sancti Spíritus',
	'cav': 'Ciego de Ávila',
	'cam': 'Camagüey',
	'ltu': 'Las Tunas',
	'hol': 'Holguín',
	'gra': 'Granma',
	'stg': 'Santiago de Cuba',
	'gtm': 'Guantánamo'
}

var cols = {
	'pri': 'rgb(0,85,61)',
	'art': 'rgb(255,6,0)',
	'ijv': 'rgb(56,179,150)',
	'lha': 'rgb(7,7,137)',
	'may': 'rgb(253,29,20)',
	'mat': 'rgb(255,36,18)',
	'cfg': 'rgb(0,162,97)',
	'vcl': 'rgb(255,131,1)',
	'ssp': 'rgb(0,65,133)',
	'cav': 'rgb(0,141,208)',
	'cam': 'rgb(219,33,50)',
	'ltu': 'rgb(0,144,88)',
	'hol': 'rgb(0,124,201)',
	'gra': 'rgb(10,75,160)',
	'stg': 'rgb(255,4,14)',
	'gtm': 'rgb(255,189,0)'
}

var sounds = {
		'pri': '<iframe width="100%" height="150" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/588619845&color=%23487e2f&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>',
		'art': '<iframe width="100%" height="150" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/588612984&color=%23ca2027&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>',
		'lha': '<iframe width="100%" height="150" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/588617346&color=%2306007e&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>',
		'may': '<iframe width="100%" height="150" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/588619035&color=%23e91515&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>',
		'mat': '<iframe width="100%" height="150" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/588618060&color=%23ff0028&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>',
		'vcl': '<iframe width="100%" height="150" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/588620733&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>',
		'cfg': '<iframe width="100%" height="150" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/588614619&color=%230e903e&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>',
		'ssp': '<iframe width="100%" height="150" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/588620118&color=%23135c95&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>',
		'cav': '<iframe width="100%" height="150" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/588614091&color=%230e8590&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>',
		'cam': '<iframe width="100%" height="150" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/588613770&color=%23900e13&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>',
		'ltu': '<iframe width="100%" height="150" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/588617706&color=%23007e54&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>',
		'hol': '<iframe width="100%" height="150" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/588616557&color=%2300207e&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>',
		'gra': '<iframe width="100%" height="150" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/588615918&color=%231f85ec&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>',
		'stg': '<iframe width="100%" height="150" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/588620433&color=%23ff0037&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>',
		'gtm': '<iframe width="100%" height="150" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/588616254&color=%23ecd91f&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>',
		'ijv': '<iframe width="100%" height="150" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/588616923&color=%23077e00&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>',
}



var provs = ['pri','art','ijv','lha','may','mat','cfg','vcl','ssp','cav','cam','ltu','hol','gra','stg','gtm'];

var hash = window.location.hash;
hash = hash.replace('#','');
hash = hash.trim();
hash.toLowerCase();

$.getJSON("data/tasas.json",function(tasas){
	console.log(tasas);
	
	function setGraph(prov){
		var years = ['Año'].concat(tasas['years']);
		var int = ['Tasa migratoria interna'].concat(tasas['provinces'][prov]['in']);
		var ext = ['Tasa migratoria externa'].concat(tasas['provinces'][prov]['out']);
		console.log(years, int,ext);
		
		c3.generate({
            bindto: "#sounds-graph-item",
            data: {
              x : 'Año',
              columns: [
				years,
				int,
				ext
              ],
              type: 'line',
            },
            axis: {
              x: {
                label: 'Año',
                min: 1984.7,
                max: 2017.3
              },
              y: {
                label: 'Valor de la tasa por mil habitantes',
              }
            }
		});  
			
	}
	
	function setSoundInfo(prov){
		if (provs.indexOf(prov)!=-1){
			window.location.hash = '#'+prov;
			$('#sounds-graph').show();
			$('#sounds-province').html(names[prov]);
			$('#sounds-province').css('color',cols[prov]);
			$('#sounds-image-link').html('<img src="images/'+prov+'-lea.jpg">');
			$('#sounds-image > a').attr('href','migracion.html#'+prov);
			$('#sounds-soundcloud').html(sounds[prov]);
			setGraph(prov);
			$('#prov-sounds').val(prov);
		} else {
			window.location.hash =' ';
			$('#sounds-graph').hide();	
		}
	}
	
	setSoundInfo(hash);
	
	$('#prov-sounds').on('change',function(e){
		var val = $('#prov-sounds').val();
		setSoundInfo(val);
	});
 
});
