import React from 'react';

const ReactHighcharts = require('react-highcharts'); // Expects that Highcharts was loaded in the code.
 
const barchartConfig = {
	chart: {
    	type: 'bar'
    },
    title: {
        text: 'Stacked bar chart'
    },
    xAxis: {
        categories: ['Dep 1', 'Dep 2', 'Dep 3', 'Dep 4', 'Dep 5', 'Dep 6', 'Dep 7', 'Dep 8', 'Dep 9', 'Dep 10', 'Dep 11', 'Dep 12',]
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Totalt antall løfter'
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
    series: [{
        name: 'Holdt',
        data: [5, 3, 4, 7, 2, 4, 3, 3, 1, 6, 7, 9]
    }, {
        name: 'Delvis holdt',
        data: [2, 2, 3, 2, 1, 5, 3, 4, 1, 7, 7, 9]
    }, {
    	name: 'Brutt',
        data: [2, 2, 3, 4, 3, 4, 1, 7, 7, 9, 2, 1]
    }, {
        name: 'Kan ikke etterprøves',
        data: [3, 4, 3, 4, 1, 6, 7, 9, 4, 4, 2, 5]
    }]
};

export default (props) => (
	<section className="container mBottom mTop">
		<div className="row">
			<div className="col-sm-12 col-lg-5 flexCentered">
				<h2 className="flexStart">Her kan man skrive litt tekst</h2>	
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean posuere facilisis orci, 
				nec semper turpis sodales in. Aliquam lobortis magna et erat dignissim, vel feugiat sem scelerisque. Nunc tristique urna sed massa dignissim consequat. Praesent vitae nunc lectus. Suspendisse finibus nibh at sollicitudin interdum. Nulla non massa egestas enim aliquam pulvinar. Ut ut sapien augue. 
				Integer ac erat massa. Maecenas lacinia mi nibh, a porta sapien vestibulum at. Ut eget dui arcu. Praesent feugiat quis turpis ut tincidunt. Suspendisse laoreet arcu augue, vel tristique nibh feugiat ac. 
				Vestibulum scelerisque, turpis et dignissim dictum, metus neque ultrices neque, quis auctor dui diam at dui.</p>
			</div>
			<div className="col-sm-12 col-lg-7 flexCentered">
				<ReactHighcharts config = {barchartConfig}></ReactHighcharts>
			</div>
		</div>
	</section>	
);
