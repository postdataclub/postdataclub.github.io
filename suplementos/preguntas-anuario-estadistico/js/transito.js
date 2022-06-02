$.getJSON("data/transito.json", function (data) {

  const poblacion = data.poblacion;
  const accidentes = data.accidentes;

  var provincias = [];
  var rural = [];
  var urbana = [];
  var accidentes_provs = [];
  $.each(poblacion, function (prov, val) {
    if (prov != "Total") {
      provincias.push(prov);
      rural.push(val.Rural);
      urbana.push(val.Urbana);
    };

  });
  $.each(accidentes, function (_, val) {
    accidentes_provs.push(val)
  });

  var myChart = echarts.init(document.getElementById('accidentes-chart'));
  option = {
    title: {
      text: 'Accidentes de tránsito vs Tipo de Población',
      left: "center"
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    toolbox: {
      feature: {
        saveAsImage: { show: true }
      }
    },
    legend: {
      data: ['Población Urbana', 'Población Rural', "Accidentes de tránsito"],
      orient: "horizontal",
      x: "center",
      y: "bottom"
    },

    xAxis: [
      {
        type: 'category',
        data: provincias,
        axisPointer: {
          type: 'shadow'
        },
        axisLabel: { interval: 0, rotate: 30 }
      }
    ],

    yAxis: [
      {
        type: 'value',
        name: 'Población',
        min: 0,
        max: 2800000,
        interval: 200000,
        position: 'left',
        alignTicks: true,
        nameGap: 40
      },
      {
        type: 'value',
        name: 'Accidentes de tránsito',
        min: 0,
        max: 2800,
        interval: 200,
        position: 'right',
        alignTicks: true,
        nameLocation: 'middle',
        nameGap: 50,

      }

    ],

    series: [
      {
        name: 'Población Urbana',
        data: urbana,
        type: 'bar',
        stack: 'x',
        encode: { x: 'provincia', y: 'rural' },

        //   label: {
        //     show: true
        //   },
        emphasis: {
          focus: 'series'
        }
      },
      {
        name: 'Población Rural',
        data: rural,
        type: 'bar',
        stack: 'x',
        //   label: {
        //     show: true
        //   },
        emphasis: {
          focus: 'series'
        },
        encode: { x: 'provincia', y: 'urbana' },

      },
      {
        name: 'Accidentes de tránsito',
        type: 'line',
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: function (value) {
            return value + ' accidentes';
          }
        },
        itemStyle: {
          color: '#a90000'
        },
        data: accidentes_provs
      },
    ]


  }



  myChart.setOption(option);

});
