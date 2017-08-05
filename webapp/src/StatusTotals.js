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
    <section className="container-fluid mTop">
        <div className="row">
            <div className="col-sm-12 col-lg-7">
                {props.data ? <ReactHighcharts config={getChartConfig(props.data)} /> : null}
            </div>
            <div className="col-sm-12 col-lg-5">
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
        </div>
    </section>;
