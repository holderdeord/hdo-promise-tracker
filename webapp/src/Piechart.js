import React from 'react';

const ReactHighcharts = require('react-highcharts'); // Expects that Highcharts was loaded in the code.
 
const piechartConfig = {
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
                /*{ name: 'Holdt',                y: stats.current.kept },
                { name: 'Delvis holdt',         y: stats.current.partly_kept },
                { name: 'Brutt',                y: stats.current.broken },
                { name: 'Kan ikke etterprøves', y: stats.current.bullshit },*/
                { name: 'Holdt',                y: 12 },
                { name: 'Delvis holdt',         y: 32 },
                { name: 'Brutt',                y: 13 },
                { name: 'Kan ikke etterprøves', y: 7	 },
              ]
            }
          ]
};

export default (props) => (
	<section className="container-fluid mTop">
		<div className="row">
			<div className="col-sm-12 col-lg-7">
				<ReactHighcharts config = {piechartConfig}></ReactHighcharts>
			</div>
			<div className="col-sm-12 col-lg-5">
				<h2 className="flexStart">Her kan man skrive litt tekst</h2>	
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean posuere facilisis orci, 
				nec semper turpis sodales in. Aliquam lobortis magna et erat dignissim, vel feugiat sem scelerisque. Nunc tristique urna sed massa dignissim consequat. Praesent vitae nunc lectus. Suspendisse finibus nibh at sollicitudin interdum. Nulla non massa egestas enim aliquam pulvinar. Ut ut sapien augue. 
				Integer ac erat massa. Maecenas lacinia mi nibh, a porta sapien vestibulum at. Ut eget dui arcu. Praesent feugiat quis turpis ut tincidunt. Suspendisse laoreet arcu augue, vel tristique nibh feugiat ac. 
				Vestibulum scelerisque, turpis et dignissim dictum, metus neque ultrices neque, quis auctor dui diam at dui.</p>
			</div>
		</div>
	</section>	
);
