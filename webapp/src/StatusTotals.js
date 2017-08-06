import React from 'react';

import { statusColors, statusTitles } from './utils';
import ReactHighcharts from 'react-highcharts';

const TITLE = 'Løftestatus';

function getBarConfig(data) {
    const statuses = ['kept', 'partially-kept', 'broken', 'uncheckable'].sort((a, b) => data[b].percentage - data[a].percentage);

    const conf = {
        chart: {
            type: 'column'
        },

        title: {
            text: TITLE
        },

        legend: {
            enabled: false
        },

        xAxis: {
            categories: statuses.map(e => statusTitles[e])
        },

        yAxis: {
            labels: {
                format: '{value} %'
            }
        },

        tooltip: {
            pointFormatter: function() {
                return `${Math.round(this.y)} % (${this._data.count})`;
            }
        },


        series: [
            {
                name: 'Prosent av alle løfter',
                colorByPoint: true,
                data: statuses.map(s => ({
                    y: data[s].percentage,
                    _data: data[s],
                    color: statusColors[s]
                }))
            }
        ]
    };

    return conf;
}

function getPieConfig(data) {
    return {
        chart: {
            type: 'pie'
        },

        title: {
            text: TITLE
        },

        plotOptions: {
            pie: {
                shadow: false,
                center: ['50%', '50%'],
                allowPointSelect: true
                // cursor: 'pointer',
                //     dataLabels: {
                //         enabled: window.innerWidth >= 768
                //     },
                //     showInLegend: window.innerWidth < 768
            }
        },

        responsive: {
            rules: [
                {
                    condition: {
                        maxWidth: 400
                    },
                    chartOptions: {
                        series: [
                            {
                                id: 'versions',
                                dataLabels: {
                                    enabled: false
                                },
                                showInLegend: true
                            }
                        ]
                    }
                }
            ]
        },

        series: [
            {
                name: 'Antall løfter',
                colorByPoint: true,
                innerSize: '60%',
                data: [
                    {
                        name: `Holdt: ${Math.round(data.kept.percentage)} %`,
                        color: statusColors.kept,
                        y: data.kept.count
                    },
                    {
                        name: `Delvis holdt: ${Math.round(
                            data['partially-kept'].percentage
                        )} %`,
                        color: statusColors['partially-kept'],
                        y: data['partially-kept'].count
                    },
                    {
                        name: `Brutt: ${Math.round(data.broken.percentage)} %`,
                        color: statusColors.broken,
                        y: data.broken.count
                    },
                    {
                        name: `Kan ikke etterprøves: ${Math.round(
                            data.uncheckable.percentage
                        )} %`,
                        color: statusColors.uncheckable,
                        y: data.uncheckable.count
                    }
                ]
            }
        ]
    };
}

export default props => {
    if (!props.data) {
        return null;
    }

    let config;

    if (props.type === 'donut') {
        config = getPieConfig(props.data);
    } else {
        config = getBarConfig(props.data)
        config.chart.type = props.type === 'column' ? 'column' : 'bar';
    }

    return <ReactHighcharts config={config} />;
}
