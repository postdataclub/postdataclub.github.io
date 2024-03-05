function daily(data) {
  var chartDom = document.getElementById("daily-frequency-chart");
  var myChart = echarts.init(chartDom);
  var option;

  const dayF = {};
  const uniqueF = {};

  for (const key in data) {
    const obj = data[key];
    if (!obj.in_rae) continue;
    if (obj.date.length === 1) {
      let date = +echarts.number.parseDate(obj.date[0].split(" ")[0]);
      date = echarts.format.formatTime("yyyy-MM-dd", date);
      if (uniqueF[date]) uniqueF[date]++;
      else uniqueF[date] = 1;
    }

    for (let date of obj.date) {
      date = +echarts.number.parseDate(date.split(" ")[0]);
      date = echarts.format.formatTime("yyyy-MM-dd", date);
      if (dayF[date]) dayF[date]++;
      else dayF[date] = 1;
    }
  }

  function getVirtulData(year) {
    year = year || "2017";
    var date = +echarts.number.parseDate(year + "-01-01");
    var end = +echarts.number.parseDate(+year + 1 + "-01-01");
    var dayTime = 3600 * 24 * 1000;
    var data = [];
    for (var time = date; time < end; time += dayTime) {
      const date = echarts.format.formatTime("yyyy-MM-dd", time);
      data.push([
        date,
        Math.floor(uniqueF[date] || 0),
        // Math.floor(dayF[date] || 0),
      ]);
    }
    return data;
  }

  option = {
    title: {
      top: 5,
      left: "center",
      text: "Palabras que solo fueron escrita un único día entre 2017-2022",
    },
    tooltip: {},
    visualMap: {
      min: 1,
      max: 300,
      type: "piecewise",
      orient: "horizontal",
      left: "center",
      top: 60,
    },
    calendar: [
      {
        top: 120,
        // left: 30,
        // right: 30,
        cellSize: ["auto", 13],
        range: "2020",
        itemStyle: {
          borderWidth: 0.5,
        },
        // yearLabel: { show: false },
      },
      {
        top: 240,
        // left: 30,
        // right: 30,
        cellSize: ["auto", 13],
        range: "2021",
        itemStyle: {
          borderWidth: 0.5,
        },
        // yearLabel: { show: false },
      },
      {
        top: 360,
        // left: 30,
        // right: 30,
        cellSize: ["auto", 13],
        range: "2022",
        itemStyle: {
          borderWidth: 0.5,
        },
        // yearLabel: { show: false },
      },
    ],
    series: [
      {
        type: "heatmap",
        coordinateSystem: "calendar",
        calendarIndex: 0,
        data: getVirtulData("2020"),
        emphasis: {
          label: {
            show: true,
            // formatter: (a) => {
            //   return `${a.data[0]}  ${a.data[1]} from ${Math.floor(
            //     dayF[a.data[0]] || 0
            //   )}`;
            // },
            // fontSize: "40",
            fontWeight: "bold",
          },
        },
      },
      {
        type: "heatmap",
        coordinateSystem: "calendar",
        calendarIndex: 1,
        data: getVirtulData("2021"),
      },

      {
        type: "heatmap",
        coordinateSystem: "calendar",
        calendarIndex: 2,
        data: getVirtulData("2022"),
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
