
$.getJSON("data/pernoctaciones_cubanos.json", function (data) {

  var years = ['2016', '2017', '2018', '2019', '2020'];
  var h5 = [];
  var h4 = [];  
  var h3 = [];
  var h2 = []; 
  var h1 = [];
  
  for (let index = 0; index < years.length; index++) {
      const element = years[index];
      h5.push(data.establecimientos[element]["Hotel 5E"]);
      h4.push(data.establecimientos[element]["Hotel 4E"]);
      h3.push(data.establecimientos[element]["Hotel 3E"]);
      h2.push(data.establecimientos[element]["Hotel 2E"]);
      h1.push(data.establecimientos[element]["Hotel 1E"]);
    }

  var pernoctacionesDiv = document.getElementById('hoteles-chart');
  var hotelsChart = echarts.init(pernoctacionesDiv);

  option = {
    title: {
			text: 'Pernoctaciones de cubanos en hoteles según su categoría',
			left: "center"
		},
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Hotel 5E', 'Hotel 4E','Hotel 3E','Hotel 2E','Hotel 1E'],
      orient: "horizontal",
      x: "center",
      y: "bottom"
    },

    toolbox: {
      show: true,
      feature: {
        magicType: {show:true, type: ['line', 'bar'] },
        saveAsImage: {show: true,}
      }
    },

    xAxis: {
      type: 'category',
      data: years
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Hotel 5E',
        type: 'line',
        data: h5,
        markPoint: {
          label: {
            normal: {
                formatter: function (param) {
                    return "Los hoteles 5E se posicionan en primer lugar dentro \nde la preferencia nacional";
                },
                position: 'top'
            }
        },
          data: [
            {  name: 'Max', /*value:"Los hoteles 5E se posicionan en primer lugar dentro \nde la preferencia nacional"*/ xAxis: "2019", yAxis: 1340000 }
          ],
          symbolSize:10,
          symbol:""
        }
      },
      {
        name: 'Hotel 4E',
        type: 'line',
        data: h4
      },
      {
        name: 'Hotel 3E',
        type: 'line',
        data: h3
      },
      {
        name: 'Hotel 2E',
        type: 'line',
        data: h2
      },
      {
        name: 'Hotel 1E',
        type: 'line',
        data: h1
      }
    ]
  };
  
  option && hotelsChart.setOption(option);


  hotelsChart.setOption(option);

  $(window).on('resize', resize);

  // Resize function
  function resize() {
    setTimeout(function () {
      // Resize chart
      hotelsChart.resize();
    }, 200);
  }

});