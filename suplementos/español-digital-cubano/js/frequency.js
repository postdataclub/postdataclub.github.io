$.getJSON("data/words.json", function (data) {
  var chartDom = document.getElementById("frequency-chart");
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
        left: 60,
        right: 50,
        height: "35%",
      },
      {
        left: 60,
        right: 50,
        top: "55%",
        height: "35%",
      },
    ],
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        axisLine: { onZero: true },
        data: key.map((x) => x.split(" ")[0]),
      },
      {
        gridIndex: 1,
        type: "category",
        boundaryGap: false,
        axisLine: { onZero: true },
        data: key.map((x) => x.split(" ")[0]),
        position: "top",
      },
    ],
    yAxis: [
      {
        name: "Cantidad de Palabras",
        type: "value",
        max: 500,
      },
      {
        gridIndex: 1,
        name: "Cantidad de Palabras Unicas",
        type: "value",
        inverse: true,
      },
    ],

    // grid: [
    //   {
    //     // top: 50,
    //     width: "50%",
    //     height: "80%",
    //     bottom: "0%",
    //     left: "0%",
    //     containLabel: true,
    //   },
    // ],

    // xAxis: [
    //   {
    //     type: "category",
    //     axisTick: { show: false },
    //     data: key.map((x) => x.split(" ")[0]),
    //   },
    // ],
    // yAxis: [
    //   {
    //     type: "value",
    //   },
    // yAxis: [
    //   {
    //     type: "value",
    //     max: builderJson.all,
    //     splitLine: {
    //       show: false,
    //     },
    //   },
    // ],
    // xAxis: [
    //   {
    //     type: "category",
    //     data: Object.keys(builderJson.charts),
    //     axisLabel: {
    //       interval: 0,
    //       rotate: 30,
    //     },
    //     splitLine: {
    //       show: false,
    //     },
    //   },
    // ]
    series: [
      {
        name: "Cantidad de Palabras por dia",
        type: "line",
        symbolSize: 8,
        data: key.map((x) => dayF[x]),
      },
      {
        name: "Cantidad de Palabras que solo ocurrieron un dia",
        type: "line",
        symbolSize: 8,
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: key.map((x) => (uniqueF[x] ? uniqueF[x] : 0)),
      },

      // {
      //   name: "Cantidad de Palabras que solo aparecieron un dia",
      //   type: "line",
      //   stack: "Total",
      //   areaStyle: {},
      //   emphasis: {
      //     focus: "series",
      //   },
      //   data: key.map((x) => (uniqueF[x] ? uniqueF[x] : 0)),
      // },
      // {
      //   name: "En la RAE",
      //   type: "bar",
      //   barGap: 0,
      //   label: labelOption,
      //   emphasis: {
      //     focus: "series",
      //   },
      //   data: barRae,
      // },
      // {
      //   name: '"Errores Ortigráficos"',
      //   type: "bar",
      //   label: labelOption,
      //   emphasis: {
      //     focus: "series",
      //   },
      //   data: barOutRae,
      // },

      // {
      //   type: "bar",
      //   stack: "chart",
      //   z: 3,
      //   label: {
      //     position: "right",
      //     show: true,
      //   },
      //   data: Object.keys(builderJson.charts).map(function (key) {
      //     return builderJson.charts[key];
      //   }),
      // },
      // {
      //   type: "bar",
      //   stack: "chart",
      //   silent: true,
      //   itemStyle: {
      //     color: "#eee",
      //   },
      //   data: Object.keys(builderJson.charts).map(function (key) {
      //     return builderJson.all - builderJson.charts[key];
      //   }),
      // },
      // {
      //   type: "pie",
      //   radius: "80%",
      //   center: ["20%", "60%"],
      //   data: [
      //     {
      //       name: "En la RAE",
      //       value: totalRae,
      //     },
      //     { name: '"Errores Ortigráficos"', value: totalOutRae },
      //   ],
      //   label: {
      //     formatter: "{d}%",
      //     position: "inner",
      //     fontSize: 14,
      //   },
      //   emphasis: {
      //     label: {
      //       show: true,
      //       // fontSize: "40",
      //       fontWeight: "bold",
      //     },
      //   },
      //   labelLine: {
      //     show: true,
      //   },
      // },
      // {
      //   type: "pie",
      //   radius: [0, "30%"],
      //   center: ["75%", "75%"],
      //   data: Object.keys(themeJson).map(function (key) {
      //     return {
      //       name: key.replace(".js", ""),
      //       value: themeJson[key],
      //     };
      //   }),
      // },
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
