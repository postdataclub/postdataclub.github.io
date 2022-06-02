const levelNames = {
    'circ_inf': 'Círculo infantil',
    'preescolar': 'Preescolar',
    'primaria': 'Primaria',
    'media': 'Media',
    'superior': 'Superior',
    'adultos': 'Adulto',
    'especial': 'Especial'
};

function getLevelData(data, level) {
    var perc = [];
    var lvl = data[level];
    for (var i = 0; i < lvl.total.length; i++) {
        if (lvl.mujeres[i] != null)
            perc.push((lvl.mujeres[i] * 100 / lvl.total[i]).toPrecision(4));
    }
    return perc;
}

function getYearData(data, year) {
    var perc = [];
    Object.entries(data).forEach(([k, v]) => {
        if (v.mujeres[year] != null)
            perc.push(v.mujeres[year] * 100 / v.total[year])
    })
    return perc;
}


function plotAllLevels(data, div) {

    const labelOption = {
        show: true,
        position: 'insideBottom',
        distance: 15,
        align: 'left',
        verticalAlign: 'middle',
        rotate: 90,
        formatter: '{name|{a}}',
        fontSize: 16,
        rich: {
            name: {}
        }
    };
    var series = []
    Object.entries(data).forEach(([k, v]) => {
        series.push({
            name: levelNames[k],
            data: getLevelData(data, k),
            type: 'bar',
            label: labelOption,
            emphasis: {
                focus: 'series'
            },
            tooltip: {
                valueFormatter: function (value) {
                    return value + '%';
                }
            },
        });
    })
    var title = '';
    var chartDom = document.getElementById(div);
    var myChart = echarts.init(chartDom, "dark");


    var option;

    option = {
        title: {
            text: 'Porciento de mujeres frente a las aulas',
            left: "center"
        },
        toolbox: {
            feature: {
                saveAsImage: { show: true }
            }
        },
        tooltip: { trigger: 'axis' },
        legend: { orient: 'horizontal', x: 'center', y: '95%', itemWidth: 20, },
        xAxis: {
            name: 'Año',
            nameLocation: 'middle',
            nameGap: 25,
            data: ['2015', '2016', '2017', '2018', '2019', '2020'],
        },
        yAxis: {
            type: 'value',
            name: 'Porciento',
            nameLocation: 'middle',
            nameGap: 35,
        },
        series: series,
    };
    option && myChart.setOption(option);

    $(window).on('resize', resize);

    // Resize function
    function resize() {
        setTimeout(function () {
            // Resize chart
            myChart.resize();
        }, 200);
    }
}

$.getJSON("data/womens_educ.json", function (data) {
    plotAllLevels(data, 'educacion-chart');

});