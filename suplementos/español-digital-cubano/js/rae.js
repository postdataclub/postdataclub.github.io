$.getJSON("data/words.json", function (data) {
  var chartDom = document.getElementById("rae-chart");
  var myChart = echarts.init(chartDom);
  var option;

  const socialIndex = {
    Telegram: 0,
    Youtube: 1,
    CubaDebate: 2,
    Twitter: 3,
    Facebook: 4,
  };

  const barRae = [0, 0, 0, 0, 0];
  const barOutRae = [0, 0, 0, 0, 0];
  let totalRae = 0;
  let totalOutRae = 0;

  for (const key in data) {
    const obj = data[key];
    if (!obj.is_natural_word) continue;
    if (obj.in_rae) totalRae++;
    else totalOutRae++;
    for (const social of obj.social_network) {
      if (obj.in_rae) barRae[socialIndex[social]]++;
      else barOutRae[socialIndex[social]]++;
    }
  }

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
    tooltip: {},
    legend: {
      top: "5%",
      left: "center",
    },
    title: [
      {
        text: "Distribución en Todo el Corpus",
        subtext: "",
        left: "21%",
        top: "12%",
        textAlign: "center",
      },
      {
        text: "Distribución Por Red Social",
        subtext: "",
        left: "70%",
        top: "15%",
        textAlign: "center",
      },
    ],

    grid: [
      {
        // top: 50,
        width: "50%",
        height: "80%",
        bottom: "0%",
        left: "50%",
        containLabel: true,
      },
    ],

    xAxis: [
      {
        type: "category",
        axisTick: { show: false },
        data: ["Telegram", "Youtube", "CubaDebate", "Twitter", "Facebook"],
      },
    ],
    yAxis: [
      {
        type: "value",
      },
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
    ],
    series: [
      {
        name: "En la RAE",
        type: "bar",
        barGap: 0,
        label: labelOption,
        emphasis: {
          focus: "series",
        },
        data: barRae,
      },
      {
        name: '"Errores Ortigráficos"',
        type: "bar",
        label: labelOption,
        emphasis: {
          focus: "series",
        },
        data: barOutRae,
      },

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
      {
        type: "pie",
        radius: "70%",
        center: ["22%", "55%"],
        data: [
          {
            name: "En la RAE",
            value: totalRae,
          },
          { name: '"Errores Ortigráficos"', value: totalOutRae },
        ],
        label: {
          formatter: "{d}%",
          position: "inner",
          fontSize: 14,
        },
        emphasis: {
          label: {
            show: true,
            // fontSize: "40",
            fontWeight: "bold",
          },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        labelLine: {
          show: true,
        },
      },
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
