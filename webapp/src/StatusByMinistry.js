import React from 'react';

import { statusColors } from './utils';

const ReactHighcharts = require('react-highcharts'); // Expects that Highcharts was loaded in the code.
const TITLE = 'Etter departement';

function getMinistryChart(data, key = 'percentage', exporting = false) {
    data = data.sort((a, b) => (b.statuses.broken ? b.statuses.broken[key] : 0) - (a.statuses.broken ? a.statuses.broken[key] : 0));

    return {
        chart: {
            type: 'bar',
        },
        title: {
            text: TITLE,
            enabled: false
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
                            enabled: true,
                            color: '#777'
                        }
                    }
                }
            }
        },


        xAxis: {
            categories: data.map(e => e.name)
        },
        yAxis: {
            min: 0,
            max: 100,
            labels: {
                format: '{value} %'
            },
            title: {
                text: 'Prosent'
            },
            label: {
                text: 'Prosent'
            }
        },
        tooltip: {
            pointFormatter: function() {
                return `<strong>${this.series.name}:</strong> ${Math.round(this.y)} %`;
            }
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        series: [
            {
                name: 'Holdt',
                color: statusColors.kept,
                data: data.map(e => ({
                    name: e.name,
                    y: e.statuses.kept ? e.statuses.kept[key] : 0
                }))
            },
            {
                name: 'Delvis holdt',
                color: statusColors['partially-kept'],
                data: data.map(e => ({
                    name: e.name,
                    y: e.statuses['partially-kept'] ? e.statuses['partially-kept'][key] : 0
                }))
            },
            {
                name: 'Kan ikke etterprøves',
                color: statusColors.uncheckable,
                data: data.map(e => ({
                    name: e.name,
                    y: e.statuses.uncheckable ? e.statuses.uncheckable[key] : 0
                }))
            },
            {
                name: 'Brutt',
                color: statusColors.broken,
                data: data.map(e => ({
                    name: e.name,
                    y: e.statuses.broken ? e.statuses.broken[key] : 0
                }))
            }
        ]
    }
}

export default props =>
    props.data ? <ReactHighcharts config={getMinistryChart(props.data, 'percentage', props.exporting)} /> : null;