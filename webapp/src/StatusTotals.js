import React from 'react';

import { statusColors, statusTitles } from './utils';
import ReactHighcharts from 'react-highcharts';

const TITLE = 'Løftestatus';

function getBarConfig(data, opts = {}) {
    const unit = opts.unit || 'percentage'
    const exporting = !!opts.exporting;
    const statuses = ['kept', 'partially-kept', 'broken', 'uncheckable'].sort((a, b) => data[b][unit] - data[a][unit]);

    const conf = {
        chart: {
            type: 'column',
            height: 450
        },

        title: {
            text: TITLE
        },

        exporting: {
            enabled: exporting,

            chartOptions: {
                chart: {
                    backgroundColor: 'white'
                },

                title: {
                    enabled: true,
                    text: TITLE
                },

                credits: {
                    enabled: true,
                    text: 'sjekk.holderdeord.no',
                    href: 'https://sjekk.holderdeord.no',
                    position: { align: 'right' }
                },

                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: false,
                            color: '#777'
                        }
                    }
                }
            }
        },

        legend: {
            enabled: false
        },

        xAxis: {
            categories: statuses.map(e => statusTitles[e])
        },

        yAxis: {
            labels: {
                format: unit === 'percentage' ? '{value} %' : '{value}'
            }
        },

        tooltip: {
            pointFormatter: function() {
                return unit === 'percentage' ? `${Math.round(this.y)} % (${this._data.count})` : `${this._data.count} (${Math.round(this._data.percentage)} %)`;
            }
        },


        series: [
            {
                name: unit === 'percentage' ? `Prosent av alle løfter` : 'Antall løfter',
                colorByPoint: true,
                data: statuses.map(s => ({
                    y: data[s][unit],
                    _data: data[s],
                    color: statusColors[s]
                }))
            }
        ]
    };

    return conf;
}

export default props => {
    if (!props.data) {
        return null;
    }

    return <ReactHighcharts config={getBarConfig(props.data, {exporting: props.exporting, unit: props.unit})} />;
}
