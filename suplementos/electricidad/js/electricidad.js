var rates = {
	100: {
		"old": 0.09,
		"new": 0.4,
		"percent": 22.5
	},
	150: {
		"old": 0.3,
		"new": 1.3,
		"percent": 15.4
	},
	200: {
		"old": 0.4,
		"new": 1.75,
		"percent": 17.6
	},
	250: {
		"old": 0.6,
		"new": 3.0,
		"percent": 15.9
	},
	300: {
		"old": 0.8,
		"new": 4.0,
		"percent": 10.9
	},
	350: {
		"old": 1.5,
		"new": 7.5,
		"percent": 6.9
	},
	500: {
		"old": 1.8,
		"new": 9,
		"percent": 7.7
	},
	1000: {
		"old": 2.0,
		"new": 10.0,
		"percent": 2.9
	},
	5000: {
		"old": 3.0,
		"new": 15.0,
		"percent": 0.2
	},
	5001: {
		"old": 5.0,
		"new": 25.0,
		"percent": 0
	}
}

var range = [100, 150, 200, 250, 300, 350, 500, 1000, 5000];

var rates_blocks = ['Kwh', 1, 100, 101, 150, 151, 200, 201, 250, 251, 300, 301, 350, 351, 500, 501, 1000, 1001, 5000];
var rates_block1 = ['1-100', 0.017, 0.017, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
var rates_block2 = ['101-150', null, null, 0.017, 0.029, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
var rates_block3 = ['151-200', null, null, null, null, 0.029, 0.040, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
var rates_block4 = ['201-250', null, null, null, null, null, null, 0.041, 0.057, null, null, null, null, null, null, null, null, null, null, null, null, null];
var rates_block5 = ['251-300', null, null, null, null, null, null, null, null, 0.058, 0.075, null, null, null, null, null, null, null, null, null, null, null];
var rates_block6 = ['301-350', null, null, null, null, null, null, null, null, null, null, 0.076, 0.109, null, null, null, null, null, null, null, null, null];
var rates_block7 = ['351-500', null, null, null, null, null, null, null, null, null, null, null, null, 0.110, 0.189, null, null, null, null, null, null, null];
var rates_block8 = ['501-1000', null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0.189, 0.303, null, null, null, null, null];
var rates_block9 = ['1001-5000', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0.303, 0.561, null, null, null];
var rates_block10 = ['5001-7000', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0.561, 0.604, 0.641];

c3.generate({
	bindto: "#us-kwh-evols",
	data: {
		x: rates_blocks[0],
		columns: [
			rates_blocks,
			rates_block1,
			rates_block2,
			rates_block3,
			rates_block4,
			rates_block5,
			rates_block6,
			rates_block7,
			rates_block8,
			rates_block9
		],
		type: 'spline'
	},
	subchart: {
		show: true
	},
	axis: {
		x: {
			label: 'Kwh',
			show: true,
			tick: {
				values: [100, 200, 300, 500, 1000, 5000]
			}
		},
		y: {
			label: 'Dólar',
			position: 'outer-middle',
		}
	},
	grid: {
		x: {
			lines: [
				{ value: 185, text: '185 kWh - Consumo medio en Cuba' },
				{ value: 414, text: '414 Kh - Consumo que iguala el precio de producción' }
			]
		},
		y: {
			lines: [
				{ value: 0.141, text: '$ 0.141 - Precio medio a nivel mundial' }
			]
		}
	}
});

c3.generate({
	bindto: "#blocks-distribution",
	data: {
		columns: [
			['1-100', 22.5],
			['101-150', 15.4],
			['151-200', 17.6],
			['201-250', 15.9],
			['251-300',10.9],
			['301-350',6.9],
			['351-500', 7.7],
			['501-1000', 2.9],
			['1001-5000', 0.2],
			['+5000',0]
		],
		type: 'pie'
	}
});


function getElectricityCost(kwatts, rate) {
	var price = 0;
	if (kwatts <= 100) {
		price += kwatts * rates[100][rate];
	} else {
		for (var i = 0; i < range.length; i++) {
			if (kwatts > range[i]) {
				if (i != 0) {
					price += (range[i] - range[i - 1]) * rates[range[i]][rate];
				} else {
					price += range[i] * rates[range[i]][rate];
				}
			} else {
				price += (kwatts - range[i - 1]) * rates[range[i]][rate];
				break;
			}
		}
	}
	if (kwatts > 5000) {
		price += (kwatts - 5000) * rates[5001][rate];
	}
	return price.toFixed(2);
}

function convertToUSD(amount) {
	return (amount / 24).toFixed(3);
}

function costByKWinUSD(kwatts, rate) {
	return (convertToUSD(getElectricityCost(kwatts, rate)) / kwatts).toFixed(3);
}

function updateCostsComparison(kwatts) {
	if (kwatts == 0) {
		$('#old-cup-cost').text(0);
		$('#new-cup-cost').text(0);
		$('#old-cup-rate').text(0);
		$('#new-cup-rate').text(0);
		$('#old-dolar-cost').text(0);
		$('#new-dolar-cost').text(0);
		$('#old-dolar-rate').text(0);
		$('#new-dolar-rate').text(0);
		$('#cost-times').text('');
	} else {
		old_cup_cost = getElectricityCost(kwatts, "old");
		new_cup_cost = getElectricityCost(kwatts, "new");
		old_cup_rate = (old_cup_cost / kwatts).toFixed(3);
		new_cup_rate = (new_cup_cost / kwatts).toFixed(3);
		old_dolar_cost = convertToUSD(old_cup_cost);
		new_dolar_cost = convertToUSD(new_cup_cost);
		old_dolar_rate = costByKWinUSD(kwatts, "old");
		new_dolar_rate = costByKWinUSD(kwatts, "new");
		$('#old-cup-cost').text(old_cup_cost);
		$('#new-cup-cost').text(new_cup_cost);
		$('#old-cup-rate').text(old_cup_rate);
		$('#new-cup-rate').text(new_cup_rate);
		$('#old-dolar-cost').text(old_dolar_cost);
		$('#new-dolar-cost').text(new_dolar_cost);
		$('#old-dolar-rate').text(old_dolar_rate);
		$('#new-dolar-rate').text(new_dolar_rate);
		$('#cost-times').text('Con la nueva tarifa el costo es ' + (new_cup_cost / old_cup_cost).toFixed(2) + ' veces el costo con la antigua');
	}
}

var first_consumption = $('#kwh-consumption').val();
updateCostsComparison(first_consumption);

$('#kwh-consumption').on("change", function (e) {
	var kwh_consumption = $('#kwh-consumption').val();
	if (kwh_consumption<0){
		kwh_consumption = 0;
		$('#kwh-consumption').val(0);
	}
	updateCostsComparison(kwh_consumption);
});

function getSalaryPercent(kwatts, salary) {
	var new_cost = getElectricityCost(kwatts, "new");
	var percent = (new_cost * 100 / salary).toFixed(2);
	return percent;
}

function updateSalaryPercent() {
	var salary = $('#salary').val();
	if (salary<1528){
		salary = 1528;
		$('#salary').val(1528);
	}
	var kwh_consumption = $('#kwh-consump').val();
	if (kwh_consumption<0){
		kwh_consumption = 0;
		$('#kwh-consump').val(0);
	}
	var percent = getSalaryPercent(kwh_consumption, salary);
	$('#cost-salary').text(getElectricityCost(kwh_consumption, 'new'));
	$('#percent-salary').text(percent);
}

updateSalaryPercent();

$('#salary').on("change", function (e) {
	updateSalaryPercent();
});

$('#kwh-consump').on("change", function (e) {
	updateSalaryPercent();
});



$.getJSON("data/countries.json", function (countries) {
	function comparePrice(a, b) {
		if (a['price-kw'] > b['price-kw']) return 1;
		if (a['price-kw'] < b['price-kw']) return -1;
		return 0;
	}

	var countries_price = countries["countries-price-kw"];
	var cuba = {
		"country": "Cuba",
		"price-kw": 0.037
	}

	countries_price.push(cuba);

	function updatePriceCountryList() {
		var kwh = $('#kwh-dolar').val();
		if (kwh<1){
			kwh = 1;
			$('#kwh-dolar').val(1);
		}
		var kwh_price = parseFloat(costByKWinUSD(kwh, "new"));
		cuba["price-kw"] = kwh_price;
		countries_price = countries_price.sort(comparePrice);
		var countries1 = "";
		var countries2 = "";
		var countries3 = "";
		
		var cuba_index = countries_price.indexOf(cuba);
		var color_class = "country-less";

		for(var i=0;i<48;i++){
			if (i>cuba_index) color_class= "country-more";
			else if (i==cuba_index) color_class= "country-cuba";
			countries1 += '<li class="countryp"><p><span class="country-name '+color_class+'">'+countries_price[i].country+'</span> ($'+countries_price[i]["price-kw"]+')</p></i>';
		}
		for(var i=48;i<96;i++){
			if (i>cuba_index) color_class= "country-more";
			else if (i==cuba_index) color_class= "country-cuba";
			countries2 += '<li class="countryp"><p><span class="country-name '+color_class+'">'+countries_price[i].country+'</span> ($'+countries_price[i]["price-kw"]+')</p></li>';
		}
		for(var i=96;i<countries_price.length;i++){
			if (i>cuba_index) color_class= "country-more";
			else if (i==cuba_index) color_class= "country-cuba";
			countries3 += '<li class="countryp"><p><span class="country-name '+color_class+'">'+countries_price[i].country+'</span> ($'+countries_price[i]["price-kw"]+')</p></li>';
		}
		$('#countries1').html(countries1);
		$('#countries2').html(countries2);
		$('#countries3').html(countries3);
		
	}

	updatePriceCountryList();

	$('#kwh-dolar').on("change", function (e) {
		updatePriceCountryList();
	});

});

$.getJSON("data/countries-eu.json", function (countries_eu) {
	function compareConsumption(a, b) {
		if (a['consumption'] > b['consumption']) return 1;
		if (a['consumption'] < b['consumption']) return -1;
		return 0;
	}

	function compareSpent(a, b) {
		if (a['spent'] > b['spent']) return 1;
		if (a['spent'] < b['spent']) return -1;
		return 0;
	}

	function comparePercent(a, b) {
		if (a['percent'] > b['percent']) return 1;
		if (a['percent'] < b['percent']) return -1;
		return 0;
	}

	var changeRateEuroDollar = 1.21544;
	
	var eu = [{'country':'Cuba','consumption':185},{'country':'Estados Unidos','consumption':877},{'country':'Costa Rica','consumption':232}];
	var eu_r = [{'country':'Cuba','spent':6.93,'spentlike':6.93},{'country':'Estados Unidos','spent':155.23,'spentlike':251.56},{'country':'Costa Rica','spent':35.96,'spentlike':12.02}];
	var eu_p = [{'country':'Cuba','percent':3.68 },{'country':'Estados Unidos','percent':2.85},{'country':'Costa Rica','percent':3.5}];
	var _eu = countries_eu.countries;
	for(var i=0;i<_eu.length;i++){
		eu.push({'country':_eu[i].country,'consumption':parseInt((_eu[i]["kw-year"]/12).toFixed(0))});
		eu_r.push({'country':_eu[i].country,'spent':parseFloat((_eu[i]["rate"]*_eu[i]["kw-year"]/12).toFixed(2)), "spentlike":(getElectricityCost(_eu[i]["kw-year"]/12,'new')/24).toFixed(2)});
		eu_p.push({'country':_eu[i].country,'percent':parseFloat((_eu[i]["rate"]*_eu[i]["kw-year"]*100/(_eu[i]["real-gdp-percapita"]*changeRateEuroDollar)).toFixed(2))});
	}
	eu = eu.sort(compareConsumption);
	eu_r = eu_r.sort(compareSpent);
	eu_p = eu_p.sort(comparePercent);
	
	var country_x = ['País'];
	var country_y = ['Consumo medio por mes'];
	var country_xr = ['País'];
	var country_yr = ['Gasto medio por mes en ese país'];
	var country_zr = ['Gasto en Cuba si se tuviera el consumo medio de ese país'];
	var country_xp = ['País'];
	var country_yp = ['Porciento del gasto medio de electricidad respecto al salario medio'];
	for(var i=0;i<eu.length;i++){
		country_x.push(eu[i].country);
		country_y.push(eu[i].consumption);
		country_xr.push(eu_r[i].country);
		country_yr.push(eu_r[i].spent);
		country_zr.push(eu_r[i].spentlike);
		country_xp.push(eu_p[i].country);
		country_yp.push(eu_p[i].percent);
	}

	c3.generate({
		bindto: "#countries-consumption",
		data: {
			x: country_x[0],
			columns: [
				country_x,
				country_y,
			],
			type: 'bar'
		},
		axis: {
			rotated: true,
			x: {
				label: 'País',
				type: 'categorical',
				tick: {
					rotate: -30,
					multiline: false
				},
				height: 55
			},
			y: {
				label: 'kWh',
				position: 'outer-middle',
			}
		},
		grid: {
			x: {
				lines: [
					{ value: "Cuba", text: 'Cuba' }
				]
			}
		}
	});

	c3.generate({
		bindto: "#countries-spent",
		data: {
			x: country_x[0],
			columns: [
				country_xr,
				country_yr,
				country_zr
			],
			type: 'bar',
			colors: {
				'Gasto medio por mes en ese país': 'mediumseagreen',
				'Gasto en Cuba si se tuviera el consumo medio de ese país': 'red'
			}
		},
		axis: {
			rotated: true,
			x: {
				label: 'País',
				type: 'categorical',
				tick: {
					rotate: -30,
					multiline: false
				},
				height: 55
			},
			y: {
				label: 'Dólar',
				position: 'outer-middle',
			}
		},
		grid: {
			x: {
				lines: [
					{ value: "Cuba", text: 'Cuba' }
				]
			}
		}
	});

	c3.generate({
		bindto: "#countries-percent",
		data: {
			x: country_x[0],
			columns: [
				country_xp,
				country_yp,
			],
			type: 'bar',
			colors: {
				'Porciento del gasto medio de electricidad respecto al salario medio': 'salmon'
			}
		},
		axis: {
			rotated: true,
			x: {
				label: 'País',
				type: 'categorical',
				tick: {
					rotate: -30,
					multiline: false
				},
				height: 55
			},
			y: {
				label: 'Porciento',
				position: 'outer-middle',
			}
		},
		grid: {
			x: {
				lines: [
					{ value: "Cuba", text: 'Cuba' }
				]
			}
		}
	});

});