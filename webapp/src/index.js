import React from 'react';
import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.css';
import 'babel-polyfill';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import ReactHighcharts from 'react-highcharts';

import Exporting from 'highcharts/modules/exporting.src.js';
import OfflineExporting from 'highcharts/modules/offline-exporting.src.js';

Exporting(ReactHighcharts.Highcharts);
OfflineExporting(ReactHighcharts.Highcharts);

require('smoothscroll-polyfill').polyfill();
require('raf/polyfill');

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
           thousandsSep: ' ',
           downloadJPEG: 'Last ned JPEG',
           downloadPDF: 'Last ned PDF',
           downloadPNG: 'Last ned PNG',
           downloadSVG: 'Last ned SVG',
           printChart: 'Skriv ut'
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
                   fontWeight: '600',
                   color: 'black'
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
               color: 'black',
               font: 'bold 16px "Roboto Slab",Georgia,Times New Roman,Times,serif'
           }
       },

       subtitle: {
           style: {
               color: '#666',
               font: 'normal lighter 12px Roboto Slab,Georgia,Times New Roman,Times,serif'
           }
       },

       legend: {
           itemStyle: {
               font: '9pt Lato,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,Helvetica,arial,sans-serif',
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
