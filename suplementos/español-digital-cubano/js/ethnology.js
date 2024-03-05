function ethnology(data) {
  var chartDom = document.getElementById("ethnology-chart");
  var myChart = echarts.init(chartDom);
  var option;

  const socialIndex = {
    Telegram: 0,
    Youtube: 1,
    CubaDebate: 2,
    Twitter: 3,
    Facebook: 4,
  };

  // const barRae = [0, 0, 0, 0, 0];
  // const barOutRae = [0, 0, 0, 0, 0];
  // let totalRae = 0;
  // let totalOutRae = 0;

  const set = {};
  let with_origin = 0;
  let without_origin = 0;
  let stop = 0;
  for (const key in data) {
    const obj = data[key];
    if (!obj.is_natural_word) continue;
    if (obj.origin_key) {
      if (set[obj.origin_key]) set[obj.origin_key]++;
      else set[obj.origin_key] = 1;

      with_origin++;
    } else if (obj.in_rae) {
      if (obj.is_stop) stop++;
      else without_origin++;
    }
  }

  var app = {};

  const keys = Object.keys(set);

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

  option = {
    title: {
      top: 5,
      left: "center",
      text: "Distribución en % de los origenes detectados, contando y sin contar al latín  ",
    },
    legend: [
      {
        orient: "vertical",
        right: "30%",
        top: "15%",
        // bottom: 20,
        data: keys.splice(0, 15),
      },
      {
        orient: "vertical",
        right: "8%",
        top: "15%",
        // bottom: 20,
        data: keys,
      },
    ],
    tooltip: {
      trigger: "item",
    },

    series: [
      {
        type: "pie",
        radius: "52%",
        center: ["30%", "55%"],
        avoidLabelOverlap: false,
        data: Object.keys(set).map((name) => {
          return {
            name: name,
            value: set[name],
          };
        }),
        // itemStyle: {
        //   borderRadius: 10,
        //   borderColor: "#fff",
        //   borderWidth: 2,
        // },
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
          show: false,
        },
      },
      {
        type: "pie",
        radius: ["90%", "58%"],
        center: ["30%", "55%"],
        avoidLabelOverlap: false,

        data: Object.keys(set)
          .filter((name) => !name.includes("latín"))
          .map((name) => {
            return {
              name: name,
              value: set[name],
            };
          }),
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
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
          show: false,
        },
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
}
