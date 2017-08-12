import React from 'react';

import { statusColors } from './utils';

const ReactHighcharts = require('react-highcharts'); // Expects that Highcharts was loaded in the code.
const TITLE = 'Etter departement';

function getMinistryChart(data, opts = {}) {
    const exporting = !!opts.exporting;
    const unit = opts.unit || 'percentage';

    const extractName = window.innerWidth < 768 ?
        e => e.name.slice(0, 10).trim() + (e.name.length > 10 ? '…' : '') :
        e => e.name;

    if (unit === 'percentage') {
        data = data.sort((a, b) => (b.statuses.broken ? b.statuses.broken[unit] : 0) - (a.statuses.broken ? a.statuses.broken[unit] : 0));
    } else {
        data = data.sort((a, b) => b.totalCount - a.totalCount);
    }

    return {
        chart: {
            type: 'bar',
            height: 450
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
                            enabled: false,
                            color: '#777',
                            formatter: function() {
                                return unit === 'percentage' ? `${Math.round(this.percentage)} % (${this.y})` : `${this.y} (${Math.round(this.percentage)} %)`;
                            }
                        }
                    }
                }
            }
        },


        xAxis: {
            categories: data.map(extractName)
        },

        yAxis: {
            min: 0,
            labels: {
                format: unit === 'percentage' ? '{value} %' : '{value}'
            },
            title: {
                text: unit === 'percentage' ? 'Prosent' : 'Antall løfter'
            },
            label: {
                text: unit === 'percentage' ? 'Prosent' : 'Antall løfter'
            }
        },
        tooltip: {
            pointFormatter: function() {
                return `<strong>${this.series.name}:</strong> ${Math.round(this.percentage)}% (${this._data.count}/${this._total})`;
            }
        },

        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: unit === 'percentage' ? 'percent' : 'normal'
            },
        },
        series: [
            {
                name: 'Holdt',
                color: statusColors.kept,
                data: data.map(e => ({
                    name: e.name,
                    _total: e.totalCount,
                    _data: e.statuses.kept,
                    y: e.statuses.kept ? e.statuses.kept[unit] : 0
                }))
            },
            {
                name: 'Delvis holdt',
                color: statusColors['partially-kept'],
                data: data.map(e => ({
                    name: e.name,
                    _total: e.totalCount,
                    _data: e.statuses['partially-kept'],
                    y: e.statuses['partially-kept'] ? e.statuses['partially-kept'][unit] : 0
                }))
            },
            {
                name: 'Kan ikke etterprøves',
                color: statusColors.uncheckable,
                data: data.map(e => ({
                    name: e.name,
                    _total: e.totalCount,
                    _data: e.statuses.uncheckable,
                    y: e.statuses.uncheckable ? e.statuses.uncheckable[unit] : 0
                }))
            },
            {
                name: 'Brutt',
                color: statusColors.broken,
                data: data.map(e => ({
                    name: e.name,
                    _total: e.totalCount,
                    _data: e.statuses.broken,
                    y: e.statuses.broken ? e.statuses.broken[unit] : 0
                }))
            }
        ]
    }
}

export default props =>
    props.data ? <ReactHighcharts config={getMinistryChart(props.data, {exporting: props.exporting, unit: props.unit})} /> : null;