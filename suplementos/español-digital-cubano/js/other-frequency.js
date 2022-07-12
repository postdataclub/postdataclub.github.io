$.getJSON("data/words.json", function (data) {
  $.getJSON("data/texts_in_date.json", function (data_time) {
    var chartDom = document.getElementById("other-frequency-chart");
    var myChart = echarts.init(chartDom);
    var option;

    const socialIndex = {
      Telegram: 0,
      Youtube: 1,
      CubaDebate: 2,
      Twitter: 3,
      Facebook: 4,
    };

    const dayF = {};
    const uniqueF = {};

    for (const key in data) {
      const obj = data[key];
      if (!obj.in_rae) continue;
      if (obj.date.length === 1) {
        if (uniqueF[obj.date[0]]) uniqueF[obj.date[0]]++;
        else uniqueF[obj.date[0]] = 1;
      }

      for (const date of obj.date) {
        if (dayF[date]) dayF[date]++;
        else dayF[date] = 1;
      }
    }

    const key = Object.keys(dayF).sort((a, b) => {
      return new Date(a.split(" ")[0]) > new Date(b.split(" ")[0]) ? 1 : -1;
    });

    var app = {};

    const posList = [
      "left",
      "right",
      "top",
      "bottom",
      "inside",
      "insideTop",
      "insideLeft",
      "insideRight",
      "insideBottom",
      "insideTopLeft",
      "insideTopRight",
      "insideBottomLeft",
      "insideBottomRight",
    ];
    app.configParameters = {
      rotate: {
        min: -90,
        max: 90,
      },
      align: {
        options: {
          left: "left",
          center: "center",
          right: "right",
        },
      },
      verticalAlign: {
        options: {
          top: "top",
          middle: "middle",
          bottom: "bottom",
        },
      },
      position: {
        options: posList.reduce(function (map, pos) {
          map[pos] = pos;
          return map;
        }, {}),
      },
      distance: {
        min: 0,
        max: 100,
      },
    };
    app.config = {
      rotate: 90,
      align: "left",
      verticalAlign: "middle",
      position: "insideBottom",
      distance: 15,
      onChange: function () {
        const labelOption = {
          rotate: app.config.rotate,
          align: app.config.align,
          verticalAlign: app.config.verticalAlign,
          position: app.config.position,
          distance: app.config.distance,
        };
        myChart.setOption({
          series: [
            {
              label: labelOption,
            },
            {
              label: labelOption,
            },
            {
              label: labelOption,
            },
            {
              label: labelOption,
            },
          ],
        });
      },
    };
    const labelOption = {
      show: true,
      position: app.config.position,
      distance: app.config.distance,
      align: app.config.align,
      verticalAlign: app.config.verticalAlign,
      rotate: app.config.rotate,
      formatter: "{c}  {name|{a}}",
      fontSize: 16,
      rich: {
        name: {},
      },
    };

    option = {
      legend: {
        top: "5%",
        left: "center",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          animation: false,
        },
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: "none",
          },
          restore: {},
          saveAsImage: {},
        },
      },
      axisPointer: {
        link: [
          {
            xAxisIndex: "all",
          },
        ],
      },
      dataZoom: [
        {
          show: true,
          realtime: true,
          start: 30,
          end: 70,
          xAxisIndex: [0, 1],
        },
        {
          type: "inside",
          realtime: true,
          start: 30,
          end: 70,
          xAxisIndex: [0, 1],
        },
      ],
      grid: [
        {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
      ],
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: key.map((x) => x.split(" ")[0]),
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],

      series: [
        {
          name: "Cantidad de Palabras que solo Ocurrieron un Dia",
          type: "line",
          stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: key.map((x) => (uniqueF[x] ? uniqueF[x] : 0)),
        },
        {
          name: "Cantidad de Palabras por Dia",
          type: "line",
          stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: key.map((x) => dayF[x]),
        },
        {
          name: "Cantidad de Textos por un Dia",
          type: "line",
          stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: key.map((x) => data_time[x]),
        },
      ],
    };

    option && myChart.setOption(option);

    $(window).on("resize", resize);

    // Resize function
    function resize() {
      setTimeout(function () {
        // Resize chart
        myChart.resize();
      }, 200);
    }
  });
});
