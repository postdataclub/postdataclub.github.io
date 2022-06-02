$.getJSON("data/divorcios.json", function (data) {

  years=['2015','2016','2017','2018','2019','2020'];

  var less_1=[];
  var year_1=[];
  var year_2=[];
  var year_3_5=[];
  var year_6_9=[];
  var year_10_14=[];
  var year_15=[];
  var total=[];

  
  for (let index = 0; index < years.length; index++) {
    const element = years[index];
    less_1.push(data.divorcios[element]["menos_1"]);
    year_1.push(data.divorcios[element]["1_anno"]);
    year_2.push(data.divorcios[element]["2_annos"]);
    year_3_5.push(data.divorcios[element]["3-5_annos"]);
    year_6_9.push(data.divorcios[element]["6-9_annos"]);
    year_10_14.push(data.divorcios[element]["10-14_annos"]);
    year_15.push(data.divorcios[element]["15_o_mas"]);
    total.push(data.divorcios[element]["total"]);
  }  
  
  var divorcesDiv = document.getElementById('matrimonio-chart');
  var myChart = echarts.init(divorcesDiv);

  const labelOption = {
    show: true,
    position: 'insideBottom',
    distance: 15,
    align: 'left',
    verticalAlign: 'middle',
    rotate: 90,
    formatter: '{name|{a}}',
    fontSize: 16,
    rich: {
      name: {}
    }
  };

  option = {
    title: {
      text: 'Número de divorcios según los años de matrimonio',
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
          name: 'Número de divorcios',
          nameLocation: 'middle',
          nameGap: 45,
          min: 500,
          max: 11500,
          interval: 1000,
          axisLabel: {
                formatter: '{value}'
              }
        },
      ],
      
      series: [
        {
          name: 'Menos de un año',
          type: 'bar',
          // yAxisIndex: 1,
          areaStyle: {},
          tooltip: {
            valueFormatter: function (value) {
              return value;
            }
          },
        label: labelOption,
        emphasis: {
          focus: 'series'
        },
        data: less_1
        },
        {
          name: '1 año',
          type: 'bar',
          // yAxisIndex: 2,
          areaStyle: {},
          tooltip: {
            valueFormatter: function (value) {
              return value;
            }
          },
          label: labelOption,
          emphasis: {
          focus: 'series'
        },
          data: year_1
        },
        {
          name: '2 años',
          type: 'bar',
          // yAxisIndex: 2,
          areaStyle: {},
          tooltip: {
            valueFormatter: function (value) {
              return value;
            }
          },
          label: labelOption,
        emphasis: {
          focus: 'series'
        },
          data: year_2
        },
        {
          name: '3 a 5 años',
          type: 'bar',
          // yAxisIndex:2,
          areaStyle: {},
          tooltip: {
            valueFormatter: function (value) {
              return value;
            }
          },
          label: labelOption,
        emphasis: {
          focus: 'series'
        },
          data: year_3_5
        },
        {
          name: '6 a 9 años',
          type: 'bar',
          // yAxisIndex:2,
          areaStyle: {},
          tooltip: {
            valueFormatter: function (value) {
              return value;
            }
          },
          label: labelOption,
        emphasis: {
          focus: 'series'
        },
          data: year_6_9
        },
        {
          name: '10 a 14 años',
          type: 'bar',
          // yAxisIndex:2,
          areaStyle: {},
          tooltip: {
            valueFormatter: function (value) {
              return value;
            }
          },
          label: labelOption,
        emphasis: {
          focus: 'series'
        },
          data: year_10_14
        },
        {
          name: '15 años o más',
          type: 'bar',
          // yAxisIndex:2,\
          areaStyle: {},
          tooltip: {
            valueFormatter: function (value) {
              return value;
            }
          },
          label: labelOption,
        emphasis: {
          focus: 'series'
        },
          data: year_15
        }
      ],
      legend: {
        data: ['Menos de un año', '1 año', '2 años', '3 a 5 años','6 a 9 años','10 a 14 años','15 años o más'],
        orient: "horizontal",
        x: "center",
        y: "bottom"
      }
    }
  

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
}) 
