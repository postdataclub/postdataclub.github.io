var rates = {
	100: {
		"old": 0.09,
		"new": 0.4,
		"mod": 0.33
	},
	150: {
		"old": 0.3,
		"new": 1.3,
		"mod": 1.07
	},
	200: {
		"old": 0.4,
		"new": 1.75,
		"mod": 1.43
	},
	250: {
		"old": 0.6,
		"new": 3.0,
		"mod": 2.46
	},
	300: {
		"old": 0.8,
		"new": 4.0,
		"mod": 3.0
	},
	350: {
		"old": 1.5,
		"new": 7.5,
		"mod": 4.0
	},
	400: {
		"old": 1.8,
		"new": 9.0,
		"mod": 5.0
	},
	450: {
		"old": 1.8,
		"new": 9.0,
		"mod": 6.0
	},
	500: {
		"old": 1.8,
		"new": 9.0,
		"mod": 7.0
	},
	600: {
		"old": 2.0,
		"new": 10.0,
		"mod": 9.2
	},
	700: {
		"old": 2.0,
		"new": 10.0,
		"mod": 9.45
	},
	1000: {
		"old": 2.0,
		"new": 10.0,
		"mod": 9.85
	},
	1800: {
		"old": 3.0,
		"new": 15.0,
		"mod": 10.8
	},
	2600: {
		"old": 3.0,
		"new": 15.0,
		"mod": 11.8
	},
	3400: {
		"old": 3.0,
		"new": 15.0,
		"mod": 12.9
	},
	4200: {
		"old": 3.0,
		"new": 15.0,
		"mod": 13.95
	},
	5000: {
		"old": 3.0,
		"new": 15.0,
		"mod": 15.0
	},
	5001: {
		"old": 5.0,
		"new": 25.0,
		"mod": 20.0
	}
}

var range = [100, 150, 200, 250, 300, 350, 400, 450, 500, 600, 700, 1000, 1800, 2600, 3400, 4200, 5000];

var rates_blocks = ['Kwh', 1, 100, 150, 200, 250, 300, 350, 400, 450, 500, 600, 700, 1000, 1800, 2600, 3400, 4200, 5000];
var rates_new = ['Tarifa propuesta', 0.017, 0.017, 0.029,0.04,0.057,0.075,0.109,0.142,0.168,0.189,0.227,0.254,0.303,0.446,0.501,0.53,0.548,0.561];
var rates_mod = ['Tarifa final', 0.014,0.014, 0.024,0.033,0.047,0.06,0.075,0.092,0.109,0.128,0.17,0.202,0.265,0.347,0.392,0.426,0.455,0.483];


c3.generate({
	bindto: "#us-kwh-evols",
	data: {
		x: rates_blocks[0],
		columns: [
			rates_blocks,
			rates_new,
			rates_mod
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
				values: [100, 200, 300, 400, 500, 600, 700, 1000, 1800, 2600, 3400, 4200, 5000]
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
				{ value: 185, text: '185 kWh - Consumo medio en Cuba' }
			]
		},
		y: {
			lines: [
				{ value: 0.141, text: '$ 0.141 - Precio medio a nivel mundial' }
			]
		}
	}
});


var rates_ran = ['Kwh', 250,500,800,1000,2000,5000,10000];
var rates_res = ['Tarifa residencial', 281.00,1531.00,4381.00,6351.00,17351.00,57911.00,157911.00];
var rates_b1 = ['Tarifa B1', 781.65,1563.30,2501.28,3126.60,6253.20,15633.00,31266.00];

c3.generate({
	bindto: "#b1-kwh-evols",
	data: {
		x: rates_ran[0],
		columns: [
			rates_ran,
			rates_b1,
			rates_res
		],
		type: 'line'
	},
	subchart: {
		show: true
	},
	axis: {
		x: {
			label: 'Kwh',
			show: true
		},
		y: {
			label: 'CUP',
			position: 'outer-middle',
		}
	},
	grid: {
		x: {
			lines: [
				{ value: 505, text: '505 kWh - Comienza a ser más cara la tarifa residencial que la B1' }
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
			['251-300', 10.9],
			['301-350', 6.9],
			['351-500', 7.7],
			['501-1000', 2.9],
			['1001-5000', 0.2],
			['+5000', 0]
		],
		type: 'pie'
	}
});

c3.generate({
	bindto: "#blocks-distribution2",
	data: {
		columns: [
			['1-500', 97.8],
			['501-700', 1.7],
			['701-1000', 0.3],
			['1001-5000', 0.2],
			['+5000', 0]
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
		$('#mod-cup-cost').text(0);
		$('#old-cup-rate').text(0);
		$('#new-cup-rate').text(0);
		$('#mod-cup-rate').text(0);
		$('#old-dolar-cost').text(0);
		$('#new-dolar-cost').text(0);
		$('#mod-dolar-cost').text(0);
		$('#old-dolar-rate').text(0);
		$('#new-dolar-rate').text(0);
		$('#mod-dolar-rate').text(0);
		$('#cost-times').text('');
		$('#cost-times-mod').text('');
	} else {
		old_cup_cost = getElectricityCost(kwatts, "old");
		new_cup_cost = getElectricityCost(kwatts, "new");
		mod_cup_cost = getElectricityCost(kwatts, "mod");
		old_cup_rate = (old_cup_cost / kwatts).toFixed(3);
		new_cup_rate = (new_cup_cost / kwatts).toFixed(3);
		mod_cup_rate = (mod_cup_cost / kwatts).toFixed(3);
		old_dolar_cost = convertToUSD(old_cup_cost);
		new_dolar_cost = convertToUSD(new_cup_cost);
		mod_dolar_cost = convertToUSD(mod_cup_cost);
		old_dolar_rate = costByKWinUSD(kwatts, "old");
		new_dolar_rate = costByKWinUSD(kwatts, "new");
		mod_dolar_rate = costByKWinUSD(kwatts, "mod");
		$('#old-cup-cost').text(old_cup_cost);
		$('#new-cup-cost').text(new_cup_cost);
		$('#mod-cup-cost').text(mod_cup_cost);
		$('#old-cup-rate').text(old_cup_rate);
		$('#new-cup-rate').text(new_cup_rate);
		$('#mod-cup-rate').text(mod_cup_rate);
		$('#old-dolar-cost').text(old_dolar_cost);
		$('#new-dolar-cost').text(new_dolar_cost);
		$('#mod-dolar-cost').text(mod_dolar_cost);
		$('#old-dolar-rate').text(old_dolar_rate);
		$('#new-dolar-rate').text(new_dolar_rate);
		$('#mod-dolar-rate').text(mod_dolar_rate);
		$('#cost-times').text('Con la tarifa propuesta el costo iba a ser ' + (new_cup_cost / old_cup_cost).toFixed(2) + ' veces el costo con la antigua');
		$('#cost-times-mod').text('Con la tarifa nueva el costo será ' + (mod_cup_cost / old_cup_cost).toFixed(2) + ' veces el costo con la antigua');
	}
}

var first_consumption = $('#kwh-consumption').val();
updateCostsComparison(first_consumption);

$('#kwh-consumption').on("change", function (e) {
	var kwh_consumption = $('#kwh-consumption').val();
	if (kwh_consumption < 0) {
		kwh_consumption = 0;
		$('#kwh-consumption').val(0);
	}
	updateCostsComparison(kwh_consumption);
});

function getSalaryPercent(kwatts, salary, type) {
	var new_cost = getElectricityCost(kwatts, type);
	var percent = (new_cost * 100 / salary).toFixed(2);
	return percent;
}

function updateSalaryPercent() {
	var salary = $('#salary').val();
	if (salary < 1528) {
		salary = 1528;
		$('#salary').val(1528);
	}
	var kwh_consumption = $('#kwh-consump').val();
	if (kwh_consumption < 0) {
		kwh_consumption = 0;
		$('#kwh-consump').val(0);
	}
	var percent = getSalaryPercent(kwh_consumption, salary, "new");
	var percent_mod = getSalaryPercent(kwh_consumption, salary, "mod");
	$('#cost-salary').text(getElectricityCost(kwh_consumption, 'new'));
	$('#percent-salary').text(percent);
	$('#cost-salary-mod').text(getElectricityCost(kwh_consumption, 'mod'));
	$('#percent-salary-mod').text(percent_mod);
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
		"country": "Cuba (Tarifa propuesta)",
		"price-kw": 0.037
	}

	var cuba_mod = {
		"country": "Cuba (Tarifa final)",
		"price-kw": 0.031
	}

	countries_price.push(cuba);
	countries_price.push(cuba_mod);

	function updatePriceCountryList() {
		var kwh = $('#kwh-dolar').val();
		if (kwh < 1) {
			kwh = 1;
			$('#kwh-dolar').val(1);
		}
		var kwh_price = parseFloat(costByKWinUSD(kwh, "new"));
		cuba["price-kw"] = kwh_price;
		var kwh_price_mod = parseFloat(costByKWinUSD(kwh, "mod"));
		cuba_mod["price-kw"] = kwh_price_mod;
		countries_price = countries_price.sort(comparePrice);
		var countries1 = "";
		var countries2 = "";
		var countries3 = "";

		var cuba_index = countries_price.indexOf(cuba);
		var cuba_index_mod = countries_price.indexOf(cuba_mod);
		var color_class = "country-less";

		for (var i = 0; i < 48; i++) {
			if (i > cuba_index) color_class = "country-more";
			else if ((i > cuba_index_mod) && (i < cuba_index)) color_class = "country-middle";
			else if ((i == cuba_index_mod) || (i == cuba_index)) color_class = "country-cuba";
			countries1 += '<li class="countryp"><p><span class="country-name ' + color_class + '">' + countries_price[i].country + '</span> ($' + countries_price[i]["price-kw"] + ')</p></i>';
		}
		for (var i = 48; i < 96; i++) {
			if (i > cuba_index) color_class = "country-more";
			else if ((i > cuba_index_mod) && (i < cuba_index)) color_class = "country-middle";
			else if ((i == cuba_index_mod) || (i == cuba_index)) color_class = "country-cuba";
			countries2 += '<li class="countryp"><p><span class="country-name ' + color_class + '">' + countries_price[i].country + '</span> ($' + countries_price[i]["price-kw"] + ')</p></li>';
		}
		for (var i = 96; i < countries_price.length; i++) {
			if (i > cuba_index) color_class = "country-more";
			else if ((i > cuba_index_mod) && (i < cuba_index)) color_class = "country-middle";
			else if ((i == cuba_index_mod) || (i == cuba_index)) color_class = "country-cuba";
			countries3 += '<li class="countryp"><p><span class="country-name ' + color_class + '">' + countries_price[i].country + '</span> ($' + countries_price[i]["price-kw"] + ')</p></li>';
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

	var eu = [{ 'country': 'Cuba', 'consumption': 185 }, { 'country': 'Estados Unidos', 'consumption': 877 }, { 'country': 'Costa Rica', 'consumption': 232 }];
	var eu_r = [{ 'country': 'Cuba', 'spent': 6.93, 'spentlike': 6.93, 'spentlike-mod': 5.69 }, { 'country': 'Estados Unidos', 'spent': 155.23, 'spentlike': 251.56, 'spentlike-mod': 214.14 }, { 'country': 'Costa Rica', 'spent': 35.96, 'spentlike': 12.02, 'spentlike-mod': 9.86 }];
	var eu_p = [{ 'country': 'Cuba (Tarifa final)', 'percent': 3.76 }, { 'country': 'Cuba (Tarifa propuesta)', 'percent': 4.58 }, { 'country': 'Estados Unidos', 'percent': 2.85 }, { 'country': 'Costa Rica', 'percent': 3.5 }];
	var _eu = countries_eu.countries;

	

	for (var i = 0; i < _eu.length; i++) {
		eu.push({ 'country': _eu[i].country, 'consumption': parseInt((_eu[i]["kw-year"] / 12).toFixed(0)) });
		eu_r.push({ 'country': _eu[i].country, 'spent': parseFloat((_eu[i]["rate"] * _eu[i]["kw-year"] / 12).toFixed(2)), "spentlike": (getElectricityCost(_eu[i]["kw-year"] / 12, 'new') / 24).toFixed(2), "spentlike-mod": (getElectricityCost(_eu[i]["kw-year"] / 12, 'mod') / 24).toFixed(2) });
		eu_p.push({ 'country': _eu[i].country, 'percent': parseFloat((_eu[i]["rate"] * _eu[i]["kw-year"] * 100 / (_eu[i]["real-gdp-percapita"] * changeRateEuroDollar)).toFixed(2)) });
	}
	eu = eu.sort(compareConsumption);
	eu_r = eu_r.sort(compareSpent);
	eu_p = eu_p.sort(comparePercent);

	var country_x = ['País'];
	var country_y = ['Consumo medio por mes'];
	var country_xr = ['País'];
	var country_yr = ['Gasto medio por mes en ese país'];
	var country_zr = ['Gasto en Cuba si se tuviera el consumo medio de ese país (Tarifa propuesta)'];
	var country_wr = ['Gasto en Cuba si se tuviera el consumo medio de ese país (Tarifa final)'];
	var country_xp = ['País'];
	var country_yp = ['Porciento del gasto medio de electricidad respecto al salario medio'];

	console.log(eu_p);

	for (var i = 0; i < eu.length; i++) {
		country_x.push(eu[i].country);
		country_y.push(eu[i].consumption);
		country_xr.push(eu_r[i].country);
		country_yr.push(eu_r[i].spent);
		country_zr.push(eu_r[i].spentlike);
		country_wr.push(eu_r[i]["spentlike-mod"]);
	}

	for (var i = 0; i < eu_p.length; i++) {
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
					{ value: "Cuba", text: '' }
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
				country_zr,
				country_wr
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
					{ value: "Cuba", text: '' }
				]
			}
		}
	});

	console.log(country_xp)
	console.log(country_yp)

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
					{ value: "Cuba (Tarifa propuesta)", text: 'Cuba (Tarifa propuesta)' },
					{ value: "Cuba (Tarifa final)", text: 'Cuba (Tarifa final)' }
				]
			}
		}
	});

});