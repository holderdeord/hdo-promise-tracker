import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const ReactHighcharts = require('react-highcharts');

ReactHighcharts.Highcharts.setOptions({
       global: {
           useUTC: false
       },

       lang: {
           numericSymbols: null,
           decimalPoint: ',',
           months: ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'],
           shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'],
           weekdays: ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'],
           thousandsSep: ' '
       },

       colors: [
           'rgb(0, 166, 212)',
           '#fadd00',
           'rgb(43, 43, 43)',
           '#b8bfcc',
           '#d00',
           '#FA0',
           '#006800',
           '#97D3EB'
       ],

       chart: {
           reflow: true, // see https://github.com/highcharts/highcharts/issues/3478
           backgroundColor: 'transparent',

           style: {
               width: '100%'
           }
       },

       xAxis: {
           lineColor: '#ddd',
           gridLineWidth: 0,
           minorGridLineWidth: 0,
           tickWidth: 0,
           labels: {
               style: {
                   fontWeight: '600'
               }
           }
       },

       yAxis: {
           min: 0,
           tickPosition: 'inside',
           gridLineWidth: 1,
           gridLineColor: 'rgba(221, 221, 221, 0.6)',
           title: {
               enabled: false
           },
           labels: {
               style: {
                   fontWeight: 'normal',
                   color: '#999'
               }
           }
       },

       title: {
           style: {
               color: '#111',
               font: 'bold 16px "Roboto", Helvetica Neue", "Helvetica", Arial, sans-serif'
           }
       },

       subtitle: {
           style: {
               color: '#666',
               font: 'normal lighter 12px "Roboto", "Helvetica Neue", "Helvetica", Arial, sans-serif'
           }
       },

       legend: {
           itemStyle: {
               font: '9pt "Roboto", "Helvetica Neue", "Helvetica", Arial, sans-serif',
               color: '#111'
           },

           itemHoverStyle: {
               color: 'gray'
           }
       },

       plotOptions: {
           area: {
               marker: {
                   enabled: false
               }
           }
       },

       credits: {
           enabled: false
       }
   });


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
