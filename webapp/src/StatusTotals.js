import React from 'react';

import ReactHighcharts from 'react-highcharts';

function getChartConfig(data) {
    return {
        chart: {
            type: 'pie'
        },

        title: {
            text: 'Løftestatus'
        },

        series: [
            {
                name: 'Antall løfter',
                data: [
                    { name: 'Holdt', y: data.kept.count },
                    { name: 'Delvis holdt', y: data['partially-kept'].count },
                    { name: 'Brutt', y: data.broken.count },
                    { name: 'Kan ikke etterprøves', y: data.uncheckable.count }
                ]
            }
        ]
    };
}

export default props =>
    props.data ? <ReactHighcharts config={getChartConfig(props.data)} /> : null;
