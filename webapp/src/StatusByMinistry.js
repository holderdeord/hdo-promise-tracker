import React from 'react';

const ReactHighcharts = require('react-highcharts'); // Expects that Highcharts was loaded in the code.

function getMinistryChart(data) {
    console.log(data);

    return {
        chart: {
            type: 'bar',
        },
        title: {
            text: 'Løftestatus etter departement'
        },
        xAxis: {
            categories: data.map(e => e.name)
        },
        yAxis: {
            min: 0,
            max: 100,
            title: {
                text: 'Prosent'
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
                data: data.map(e => e.statuses.kept ? e.statuses.kept.percentage : 0)
            },
            {
                name: 'Delvis holdt',
                data: data.map(e => e.statuses['partially-kept'] ? e.statuses['partially-kept'].percentage : 0)
            },
            {
                name: 'Brutt',
                data: data.map(e => e.statuses.broken ? e.statuses.broken.percentage : 0)
            },
            {
                name: 'Kan ikke etterprøves',
                data: data.map(e => e.statuses.uncheckable ? e.statuses.uncheckable.percentage : 0)
            }
        ]
    }
}

export default props =>
    <section className="container mBottom mTop">
        <div className="row">
            <div className="col-sm-12 col-lg-5 flexCentered">
                <h2 className="flexStart">Her kan man skrive litt tekst</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean posuere facilisis orci, nec semper turpis sodales in.
                    Aliquam lobortis magna et erat dignissim, vel feugiat sem
                    scelerisque. Nunc tristique urna sed massa dignissim
                    consequat. Praesent vitae nunc lectus. Suspendisse finibus
                    nibh at sollicitudin interdum. Nulla non massa egestas enim
                    aliquam pulvinar. Ut ut sapien augue. Integer ac erat massa.
                    Maecenas lacinia mi nibh, a porta sapien vestibulum at. Ut
                    eget dui arcu. Praesent feugiat quis turpis ut tincidunt.
                    Suspendisse laoreet arcu augue, vel tristique nibh feugiat
                    ac. Vestibulum scelerisque, turpis et dignissim dictum,
                    metus neque ultrices neque, quis auctor dui diam at dui.
                </p>
            </div>
            <div className="col-sm-12 col-lg-7 flexCentered">
                {props.data ? <ReactHighcharts config={getMinistryChart(props.data)} /> : null}
            </div>
        </div>
    </section>;
