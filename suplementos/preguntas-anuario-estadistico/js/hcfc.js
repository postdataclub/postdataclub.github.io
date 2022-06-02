$.getJSON("data/hcfc.json", function (data) {

  var years = ["2016", "2017", "2018", "2019", "2020"];
  var hcfc = []
  
  for (let index = 0; index < years.length; index++) {
    const element = years[index];
    if (data[element]["critical"])
      hcfc.push({ value: data[element]["hcfc"], itemStyle: { color: '#a90000' } });
    else
      hcfc.push({ value: data[element]["hcfc"], itemStyle: { color: '#0000a9' } });
  }

  var hcfcDiv = document.getElementById('contaminacion-chart');

  var hcfcChart = echarts.init(hcfcDiv, "dark");
  option = {
    title: {
      text: 'Consumo de Hidroclorofluorocarbonos',
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
    xAxis: {
      type: 'category',
      boundaryGap: true,
      data: years
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: "HCFC",
        data: hcfc,
        type: 'bar',
        areaStyle: {},
      }
    ]
  };

  // Display the chart using the configuration items and data just specified.
  hcfcChart.setOption(option);


  $(window).on('resize', resize);
  // Resize function
  function resize() {
    setTimeout(function () {
      // Resize chart
      hcfcChart.resize();
    }, 200);
  }

});