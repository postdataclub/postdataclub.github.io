const activityNames = {
	"total": "Total",
	"agricultura": "Agricultura, ganadería, caza y silvicultura",
	"pesca": "Pesca",
	"mineria": "Explotación de minas y canteras",
	"azucarera": "Industria azucarera",
	"manufacurada": "Industria manufacturada",
	"electricidad": "Suministro de electricidad, gas y agua",
	"construccion": "Construcción",
	"comercio": "Comercio y reparación de efectos personal",
	"hoteles": "Hoteles y restaurantes",
	"transporte": "Transporte, almacenamiento y comunicaciones",
	"empresariales": "Servicio empresariales y actividades inmobiliarias",
	"administracion": "Administración pública",
	"ciencia": "Ciencia e Innovación",
	"educacion": "Educación",
	"salud": "Salud pública y asistencia social",
	"cultura": "Cultura y deporte",
	"otras": "Otras actividades",
	"intermediacion": "Intermediación financiera"
};


function getPercent(data, activity, y) {
	return data[activity][y] * 100 / data.total[y]
}
var myChart;

function plotTree(data, div, y) {
	var chartDom = document.getElementById("inversion-ii-chart");
	myChart = echarts.init(chartDom);
	var option = createOption(data, y)
	option && myChart.setOption(option);
	$(window).on('resize', resize);

	// Resize function
	function resize() {
		setTimeout(function () {
			// Resize chart
			myChart.resize();
		}, 200);
	}
}

function createOption(data, year) {
	var option;
	var series = [{ type: 'treemap',
	label:{
        fontWeight: "bold",
        fontFamily: "arial", //insertar la de la página
        fontSize: 14
      },
      roam: false,
      levels: [
        {
          itemStyle: {
            borderColor: '#555',
            borderWidth: 4,
            gapWidth: 4
          }
        },
        {
          colorSaturation: [0.3, 0.6],
          itemStyle: {
            borderColorSaturation: 0.7,
            gapWidth: 2,
            borderWidth: 2
          }
        },
        {
          colorSaturation: [0.3, 0.5],
          itemStyle: {
            borderColorSaturation: 0.6,
            gapWidth: 1
          }
        },
        {
          colorSaturation: [0.3, 0.5]
        }
      ], 
	data: [] }];
	Object.entries(data).forEach(([k, v]) => {
		if (k != "total") {
			series[0].data.push(
				{
					name: activityNames[k] + " " + getPercent(data, k, year).toString().slice(0, 5) + "%",
					value: v[year],
				}
			)
		}
	})
	option = {
		title: {
			text: 'Porciento de la inversión anual por clase de actividad económica',
			left: "center",
			textStyle: {
				color: "#FFFFFF"
			}
		},
		toolbox: {
			show: true,
			feature: {
				saveAsImage: { show: true }
			}
		},
		tooltip: {},
		series: series
	};
	return option
}

$.getJSON("data/inversiones.json", function (data) {
	$('#change').on("change", function (e) {
		var value = $('#change').val();
		var option = createOption(data, value);
		myChart.setOption(option);
	});
	plotTree(data, 'treeMapPlot', 4)
})

/*function change() {
	const $select = document.querySelector('#change')
	var value = $select.value
	$.getJSON("data/inversiones.json", function (data) {
		var option = createOption(data, value)
		option && myChart.setOption(option);
	})
}*/