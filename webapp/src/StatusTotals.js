import React from 'react';

import { statusColors} from './utils';
import ReactHighcharts from 'react-highcharts';

function getChartConfig(data) {
    return {
        chart: {
            type: 'pie'
        },

        title: {
            text: 'Status'
        },

        plotOptions: {
            pie: {
                shadow: false,
                center: ['50%', '50%'],
                allowPointSelect: true,
                // cursor: 'pointer',
            //     dataLabels: {
            //         enabled: window.innerWidth >= 768
            //     },
            //     showInLegend: window.innerWidth < 768
            }
        },

        responsive: {
                rules: [{
                condition: {
                    maxWidth: 400
                },
                chartOptions: {
                    series: [{
                        id: 'versions',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }]
                }
            }]
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

export default props =>
    props.data ? <ReactHighcharts config={getChartConfig(props.data)} /> : null;
