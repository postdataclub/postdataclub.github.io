function naturalPie(data) {
  var chartDom = document.getElementById("natural-2-chart");
  var myChart = echarts.init(chartDom);
  var option;
  const social_index = {
    Telegram: 2,
    CubaDebate: 3,
    Facebook: 4,
    Twitter: 5,
    Youtube: 6,
  };

  const n = ["Combinación de letras", 0, 0, 0, 0, 0, 0];
  const s = ["Símbolos", 0, 0, 0, 0, 0, 0];
  const nn = ["Números y fechas", 0, 0, 0, 0, 0, 0];
  const u = ["Alteración del idioma desconocida", 0, 0, 0, 0, 0, 0];

  for (const key in data) {
    const obj = data[key];
    if (obj.is_symbol) s[1]++;
    else if (obj.is_natural_word) n[1]++;
    else if (obj.is_numeral) nn[1]++;
    else u[1]++;
    for (const social in social_index) {
      if (obj.social_network.includes(social)) {
        const socialIndex = social_index[social];
        if (obj.is_symbol) s[socialIndex]++;
        else if (obj.is_natural_word) n[socialIndex]++;
        else if (obj.is_numeral) nn[socialIndex]++;
        else u[socialIndex]++;
      }
    }
  }

  const pieConfig = {
    name: "Access From",
    type: "pie",
    radius: "60%",
    encode: {
      itemName: "Unidad de Texto",
      value: "General",
    },
    // avoidLabelOverlap: false,
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
      show: true,
    },
    // itemStyle: {
    //   color: "#c23531",
    //   shadowBlur: 300,
    //   shadowColor: "rgba(0, 0, 0, 2)",
    // },
  };

  option = {
    // color: ["#4a0505", "#1168f5", "#11f55d", "#7811f5"],
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "1%",
      left: "center",
    },
    dataset: {
      source: [
        [
          "Unidad de Texto",
          "General",
          "Telegram",
          "Cubadebate",
          "Facebook",
          "Twitter",
          "Youtube",
        ],
        n,
        nn,
        s,
        u,
      ],
    },

    series: [
      {
        ...pieConfig,
        // radius: "80%",
        center: ["7%", "47%"],
        encode: {
          itemName: "Unidad de Texto",
          value: "General",
        },
      },
      {
        ...pieConfig,
        center: ["24%", "47%"],
        encode: {
          itemName: "Unidad de Texto",
          value: "Cubadebate",
        },
      },
      {
        ...pieConfig,
        center: ["42%", "47%"],
        encode: {
          itemName: "Unidad de Texto",
          value: "Facebook",
        },
      },
      {
        ...pieConfig,
        center: ["59%", "47%"],
        encode: {
          itemName: "Unidad de Texto",
          value: "Telegram",
        },
      },

      {
        ...pieConfig,
        center: ["76%", "47%"],
        encode: {
          itemName: "Unidad de Texto",
          value: "Twitter",
        },
      },
      {
        ...pieConfig,
        center: ["92%", "47%"],
        encode: {
          itemName: "Unidad de Texto",
          value: "Youtube",
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
