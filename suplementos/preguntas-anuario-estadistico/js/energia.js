
$.getJSON("data/energia.json", function (data) {

  var years = ['2016', '2017', '2018', '2019', '2020'];
  var elect = [];
  var panels = [];
  var aerogens = [];
  var aeroparks = [];

  for (let index = 0; index < years.length; index++) {
    const element = years[index];
    panels.push(data.dispositivos[element]["paneles-fotovoltaicos"]);
    aerogens.push(data.dispositivos[element]["aerogeneradores"]);
    aeroparks.push(data.dispositivos[element]["parques-eolicos"]);
    elect.push(data.generacion[element]["eolica-fotovoltaica"]);
  }

  // Initialize the echarts instance based on the prepared dom
  var energiaDiv = document.getElementById('energia-chart');
  var myChart = echarts.init(energiaDiv, "dark");

  // Specify the configuration items and data for the chart
  option = {
    title: {
      text: 'Generación Eólica y Fotovoltáica vs Dispositos de Generación',
      left: "center"
    },
    grid: {
      bottom: 100
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // Use axis to trigger tooltip
        type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
      }
    },
    toolbox: {
      feature: {
        saveAsImage: { show: true }
      }
    },
    legend: {
      data: ['Generación Electrica - Eólica y Fotovoltaica', 'Paneles fotovoltaicos', 'Aerogeneradores', "Parques eólicos"],
      orient: "horizontal",
      x: "center",
      y: "bottom"
    },
    xAxis: [
      {
        type: 'category',
        data: years,
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: 'Generación de Electricidad Bruta - Eólica y Fotovoltaica',
        min: 0,
        max: 300,
        interval: 50,
        position: 'left',
        alignTicks: true,
        nameLocation: 'middle',
        nameGap: 40
      },
      {
        type: 'value',
        name: 'Dispositivos Fotovoltaicos',
        min: 0,
        max: 4800,
        interval: 800,
        position: 'right',
        alignTicks: true,
        nameLocation: 'middle',
        nameGap: 50
      },
      {
        type: 'value',
        name: 'Dispositivos Eólicos',
        min: 0,
        max: 18,
        interval: 3,
        position: 'right',
        alignTicks: true,
        offset: 60,
        nameLocation: 'middle',
        nameGap: 25
      }
    ],
    series: [
      {
        name: 'Generación Electrica - Eólica y Fotovoltaica',
        type: 'bar',
        areaStyle: {},
        tooltip: {
          valueFormatter: function (value) {
            return value + ' GWh';
          }
        },
        data: elect
      },
      {
        name: 'Paneles fotovoltaicos',
        type: 'line',
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: function (value) {
            return value + ' unidades';
          }
        },
        data: panels
      },
      {
        name: 'Aerogeneradores',
        type: 'line',
        yAxisIndex: 2,
        tooltip: {
          valueFormatter: function (value) {
            return value + ' unidades';
          }
        },
        data: aerogens
      },
      {
        name: 'Parques eólicos',
        type: 'line',
        yAxisIndex: 2,
        tooltip: {
          valueFormatter: function (value) {
            return value + ' unidades';
          }
        },
        data: aeroparks
      }
    ]
  };

  // Display the chart using the configuration items and data just specified.
  myChart.setOption(option);

  $(window).on('resize', resize);

  // Resize function
  function resize() {
    setTimeout(function () {
      // Resize chart
      myChart.resize();
    }, 200);
  }

});

