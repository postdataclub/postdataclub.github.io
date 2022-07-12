function read(f) {
  let obj = {};
  return $.getJSON("data/words0.json", function (data) {
    obj = Object.assign(obj, data);
    $.getJSON("data/words1.json", function (data) {
      obj = Object.assign(obj, data);
      $.getJSON("data/words2.json", function (data) {
        obj = Object.assign(obj, data);
        $.getJSON("data/words3.json", function (data) {
          obj = Object.assign(obj, data);
          $.getJSON("data/words4.json", function (data) {
            obj = Object.assign(obj, data);
            $.getJSON("data/words5.json", function (data) {
              obj = Object.assign(obj, data);
              $.getJSON("data/words6.json", function (data) {
                obj = Object.assign(obj, data);
                $.getJSON("data/words7.json", function (data) {
                  obj = Object.assign(obj, data);
                  $.getJSON("data/words8.json", function (data) {
                    obj = Object.assign(obj, data);
                    $.getJSON("data/words9.json", function (data) {
                      obj = Object.assign(obj, data);
                      $.getJSON("data/words10.json", function (data) {
                        obj = Object.assign(obj, data);
                        return f(obj);
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
}

read(function (data) {
  var chartDom = document.getElementById("errors-2-chart");
  var myChart = echarts.init(chartDom);
  var option;
  const socialIndex = {
    Telegram: 2,
    CubaDebate: 3,
    Facebook: 4,
    Twitter: 5,
    Youtube: 6,
  };

  const n = ["Name", 0, 0, 0, 0, 0, 0];
  const r = ["Recurrentes", 0, 0, 0, 0, 0, 0];
  const d = ["Digital", 0, 0, 0, 0, 0, 0];
  const u = ["Unisex", 0, 0, 0, 0, 0, 0];
  const o = ["Otros", 0, 0, 0, 0, 0, 0];

  for (const key in data) {
    const obj = data[key];
    if (!obj.is_natural_word) continue;
    if (obj.in_rae) continue;
    else if (obj.error_type === "name") n[1]++;
    else if (obj.error_type === "recurrent") r[1]++;
    else if (obj.error_type === "digital") d[1]++;
    else if (obj.error_type === "unisex") u[1]++;
    else o[1]++;
    for (const social of obj.social_network) {
      if (obj.error_type === "name") n[socialIndex[social]]++;
      else if (obj.error_type === "recurrent") r[socialIndex[social]]++;
      else if (obj.error_type === "digital") d[socialIndex[social]]++;
      else if (obj.error_type === "unisex") u[socialIndex[social]]++;
      else o[socialIndex[social]]++;
    }
  }

  const pieConfig = {
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
        r,
        d,
        u,
        o,
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
});
