$.getJSON('data/inversion.json', function (data) {
    var inversionDiv = document.getElementById('inversion-i-chart');
    var myChart = echarts.init(inversionDiv);

    myChart.hideLoading();
    var itemStyle = {
        opacity: 0.8
    };
    var sizeFunction = function (x) {
        var y = Math.sqrt(x / 5e2) + 0.1;
        // console.log(y * 80);
        // return Math.sqrt(x/2);
        return y * 50;
    };
    // Schema:
    var schema = [{
        name: 'Poblacion',
        index: 0,
        text: 'Población',
        unit: 'Millones de Personas',
    },
    {
        name: 'Inversion',
        index: 2,
        text: 'Inversión',
        unit: 'Millones de pesos',
    },
    {
        name: 'Extension',
        index: 1,
        text: 'Extensión',
        unit: 'km²',
    },
    {
        name: 'Provincia',
        index: 3,
        text: 'Provincia',
        unit: ''
    }
    ];
    option = {
        baseOption: {
            timeline: {
                axisType: 'category',
                orient: 'vertical',
                autoPlay: true,
                inverse: true,
                playInterval: 3000,
                left: null,
                right: 0,
                top: 20,
                bottom: 20,
                width: 55,
                height: null,
                symbol: 'none',
                checkpointStyle: {
                    borderWidth: 2
                },
                controlStyle: {
                    showNextBtn: false,
                    showPrevBtn: false
                },
                data: []
            },
            toolbox: {
                feature: {
                    saveAsImage: { show: true }
                }
            },
            title: [{
                text: data.timeline[0],
                textAlign: 'center',
                left: '63%',
                top: '55%',
                textStyle: {
                    fontSize: 100
                }
            },
            {
                text: 'Inversión por Provincia',
                left: 'center'
            }
            ],
            tooltip: {
                padding: 5,
                borderWidth: 1,
                formatter: function (obj) {
                    var value = obj.value;
                    // prettier-ignore
                    return schema[3].text + '：' + value[3] + '<br>' +
                        schema[1].text + '：' + value[2] + " " + schema[1].unit + '<br>' +
                        schema[0].text + '：' + value[0] + " " + schema[0].unit + '<br>' +
                        schema[2].text + '：' + value[1] + " " + schema[2].unit + '<br>';
                }
            },
            grid: {
                top: 100,
                containLabel: true,
                left: 30,
                right: '110'
            },
            legend: {
                data: data.counties,
                orient: "horizontal",
                x: "center",
                y: "bottom"
            },
            xAxis: {
                type: 'log',
                name: 'Poblacion',
                max: 2500000,
                min: 100000,
                nameGap: 25,
                nameLocation: 'middle',
                nameTextStyle: {
                    fontSize: 18
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    formatter: '{value} M'
                }
            },
            yAxis: {
                type: 'value',
                name: 'Extensión',
                max: 16000,
                nameTextStyle: {
                    fontSize: 18
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    formatter: '{value} km²'
                }
            },
            animationDurationUpdate: 500,
            animationEasingUpdate: 'quinticInOut'
        },
        options: []
    };
    for (var n = 0; n < data.timeline.length; n++) {
        pseries = [];
        names = []
        for (var p = 0; p < data.series[n].length; p++) {
            pseries.push(
                {
                    name: data.series[n][p][3],
                    type: 'scatter',
                    itemStyle: itemStyle,
                    data: [data.series[n][p]],
                    symbolSize: function (val) {
                        return sizeFunction(val[2]);
                    }
                }
            );
        }
        option.baseOption.timeline.data.push(data.timeline[n]);
        option.options.push({
            title: {
                show: true,
                text: data.timeline[n] + ''
            },
            series: pseries
        });
    }

    myChart.setOption(option);

    $(window).on('resize', resize);

    function resize() {
        setTimeout(function () {

            myChart.resize();
        }, 200);
    }

});