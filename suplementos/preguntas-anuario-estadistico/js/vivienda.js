$.getJSON("data/vivienda.json", function (data) {
  let materials = data["materiales"]

  let series = []
  for (let i = 0; i < materials.length; i++) {
    let elem = materials[i]
    let years = Object.values(elem.years)
    let normalized = years.map(e => (e / Math.max(...years) * 100).toFixed(2))
    series.push({
      type: 'line',
      name: elem.label,
      data: normalized,
      tooltip: {
        valueFormatter: e => e + `% (${years[normalized.findIndex(v => v === e)]} ${elem.unit})`
      }
    })
  };

  // Initialize the echarts instance based on the prepared dom
  var viviendaDiv = document.getElementById('vivienda-chart');
  var myChart = echarts.init(viviendaDiv);

  option = {
    title: {
      text: 'Producción de materiales de construcción (porciento respecto al máximo del período)',
      left: "center"
    },
    legend: {
      orient: "horizontal",
      x: "center",
      y: "bottom"
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
    xAxis: {
      type: 'category',
      data: ['2016', '2017', '2018', '2019', '2020']
    },
    yAxis: {
      type: 'value',
      name: 'Porciento respecto al máximo del período',
      nameTextStyle: {
        padding: 15
      },
      nameLocation: 'middle'
    },
    series: series
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
