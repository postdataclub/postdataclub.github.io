$.getJSON("data/words.json", function (data) {
  $.getJSON("data/texts_in_date.json", function (data_time) {
    var chartDom = document.getElementById("digital-frequency-chart");
    var myChart = echarts.init(chartDom);
    var option;

    let barEmojis = {};
    let barTags = {};
    let barUser = {};

    for (const key in data) {
      const obj = data[key];

      if (obj.is_emoji) {
        if (barEmojis[obj.date[0]]) barEmojis[obj.date[0]]++;
        else barEmojis[obj.date[0]] = 1;
      } else if (obj.is_hashtag) {
        if (barTags[obj.date[0]]) barTags[obj.date[0]]++;
        else barTags[obj.date[0]] = 1;
      } else if (obj.is_user) {
        if (barUser[obj.date[0]]) barUser[obj.date[0]]++;
        else barUser[obj.date[0]] = 1;
      }
    }

    const key = Object.keys(data_time).sort((a, b) => {
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
      // toolbox: {
      //   feature: {
      //     dataZoom: {
      //       yAxisIndex: "none",
      //     },
      //     restore: {},
      //     saveAsImage: {},
      //   },
      // },
      // axisPointer: {
      //   link: [
      //     {
      //       xAxisIndex: "all",
      //     },
      //   ],
      // },
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
          name: "emojis",
          type: "line",
          stack: "Total",
          // areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: key.map((x) => (barEmojis[x] ? barEmojis[x] : 0)),
        },
        {
          name: "hashtags",
          type: "line",
          stack: "Total",
          // areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: key.map((x) => (barTags[x] ? barTags[x] : 0)),
        },
        {
          name: "user-tags",
          type: "line",
          stack: "Total",
          // areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: key.map((x) => (barUser[x] ? barUser[x] : 0)),
        },
        // {
        //   name: "Cantidad de Textos por un Dia",
        //   type: "line",
        //   stack: "Total",
        //   areaStyle: {},
        //   emphasis: {
        //     focus: "series",
        //   },
        //   data: key.map((x) => data_time[x]),
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
});
