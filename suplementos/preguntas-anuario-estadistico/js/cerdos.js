var app = {};


var cerdosOption;

const posList = [
    'left',
    'right',
    'top',
    'bottom',
    'inside',
    'insideTop',
    'insideLeft',
    'insideRight',
    'insideBottom',
    'insideTopLeft',
    'insideTopRight',
    'insideBottomLeft',
    'insideBottomRight'
];
app.configParameters = {
    rotate: {
        min: -90,
        max: 90
    },
    align: {
        cerdosOptions: {
            left: 'left',
            center: 'center',
            right: 'right'
        }
    },
    verticalAlign: {
        cerdosOptions: {
            top: 'top',
            middle: 'middle',
            bottom: 'bottom'
        }
    },
    position: {
        cerdosOptions: posList.reduce(function(map, pos) {
            map[pos] = pos;
            return map;
        }, {})
    },
    distance: {
        min: 0,
        max: 100
    }
};
app.config = {
    rotate: 90,
    align: 'left',
    verticalAlign: 'middle',
    position: 'insideBottom',
    distance: 15,
    onChange: function() {
        const labelcerdosOption = {
            rotate: app.config.rotate,
            align: app.config.align,
            verticalAlign: app.config.verticalAlign,
            position: app.config.position,
            distance: app.config.distance
        };
        cerdosChart.setOption({
            series: [{
                    label: labelcerdosOption
                },
                {
                    label: labelcerdosOption
                }
            ]
        });
    }
};
const labelcerdosOption = {
    show: true,
    position: app.config.position,
    distance: app.config.distance,
    align: app.config.align,
    verticalAlign: app.config.verticalAlign,
    rotate: app.config.rotate,
    formatter: '{c}  {name|{a}}',
    fontSize: 16,
    rich: {
        name: {}
    }
};

$.getJSON("data/cerdos.json", function(data) {

    var years = ['2016', '2017', '2018', '2019', '2020'];
    var nacimientos = [];
    var sacrificios = [];

    for (let index = 0; index < years.length; index++) {
        const element = years[index];
        nacimientos.push(data.Cerdos[element]["Nacimientos"]);
        sacrificios.push(data.Cerdos[element]["Sacrificios"]);

    }

    // Initialize the echarts instance based on the prepared dom
    var cerdosDiv = document.getElementById('cerdos-chart');
    var cerdosChart = echarts.init(cerdosDiv, "dark");

    // Specify the configuration items and data for the chart
    cerdosOption = {
        title: {
			text: 'Nacimientos y sacrificios de cerdos',
			left: "center"
		},
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['Nacimientos', 'Sacrificios'],
            orient: "horizontal",
            x: "center",
            y: "bottom"
        },
        toolbox: {
            show: true,
            feature: {
                magicType: { show: true, type: ['line', 'bar'] },
                saveAsImage: { show: true }
            }
        },
        xAxis: [{
            type: 'category',
            axisTick: { show: false },
            data: ['2016', '2017', '2018', '2019', '2020']
        }],
        yAxis: [{
            type: 'value'
        }],
        series: [{
                name: 'Nacimientos',
                type: 'bar',
                barGap: 0,
                //label: labelcerdosOption,
                emphasis: {
                    focus: 'series'
                },
                data: nacimientos
            },
            {
                name: 'Sacrificios',
                type: 'bar',
                //label: labelcerdosOption,
                emphasis: {
                    focus: 'series'
                },
                data: sacrificios
            }
        ]
    };

    // Display the chart using the configuration items and data just specified.
    cerdosChart.setOption(cerdosOption);

    $(window).on('resize', resize);

    // Resize function
    function resize() {
        setTimeout(function() {
            // Resize chart
            cerdosChart.resize();
        }, 200);
    }

});