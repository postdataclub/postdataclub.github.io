$.getJSON("data/words.json", function (data) {
  var chartDom = document.getElementById("digital-chart");
  var myChart = echarts.init(chartDom);
  var option;

  const socialIndex = {
    Telegram: 0,
    Youtube: 1,
    CubaDebate: 2,
    Twitter: 3,
    Facebook: 4,
  };

  let barEmojis = [0, 0, 0, 0, 0];
  let barTags = [0, 0, 0, 0, 0];
  let barUser = [0, 0, 0, 0, 0];
  let barUrls = [0, 0, 0, 0, 0];
  let barOthers = [0, 0, 0, 0, 0];
  let totalEmojis = 0;
  let totalTags = 0;
  let totalUser = 0;
  let totalUrls = 0;
  let totalOthers = 0;

  for (const key in data) {
    const obj = data[key];
    if (obj.is_natural_word) continue;
    if (obj.is_numeral) continue;
    if (obj.is_symbol) continue;
    if (obj.is_emoji) totalEmojis++;
    else if (obj.is_hashtag) totalTags++;
    else if (obj.is_user) totalUser++;
    else if (obj.is_url) totalUrls++;
    else totalOthers++;
    for (const social of obj.social_network) {
      if (obj.is_emoji) barEmojis[socialIndex[social]]++;
      else if (obj.is_hashtag) barTags[socialIndex[social]]++;
      else if (obj.is_user) barUser[socialIndex[social]]++;
      else if (obj.is_url) barUrls[socialIndex[social]]++;
      else barOthers[socialIndex[social]]++;
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
    ],
    series: [
      {
        name: "emojis",
        type: "bar",
        barGap: 0,
        label: labelOption,
        emphasis: {
          focus: "series",
        },
        data: barEmojis,
      },
      {
        name: "hashtags",
        type: "bar",
        label: labelOption,
        emphasis: {
          focus: "series",
        },
        data: barTags,
      },
      {
        name: "user-tags",
        type: "bar",
        label: labelOption,
        emphasis: {
          focus: "series",
        },
        data: barUser,
      },
      {
        name: "urls",
        type: "bar",
        label: labelOption,
        emphasis: {
          focus: "series",
        },
        data: barUrls,
      },
      {
        name: "otros",
        type: "bar",
        label: labelOption,
        emphasis: {
          focus: "series",
        },
        data: barOthers,
      },

      {
        type: "pie",
        radius: "70%",
        center: ["22%", "55%"],
        data: [
          {
            name: "emojis",
            value: totalEmojis,
          },
          { name: "hashtags", value: totalTags },
          { name: "user-tags", value: totalUser },
          { name: "urls", value: totalUrls },
          { name: "otros", value: totalOthers },
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
