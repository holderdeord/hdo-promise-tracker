import React, { Component } from "react";
import ReactHighcharts from "react-highcharts";

const reasonTitles = {
    'no-priority': 'Ikke prioritert',
    'changed-opinion': 'Snudd',
    'no-majority': 'Ikke flertall på Stortinget',
    'previous-government': 'Innført under forrige regjering'
};

export default class BrokenReason extends Component {
    state = { reasons: null };

    componentDidMount() {
        this.props.api
            .getBrokenReasons()
            .then(reasons => this.setState({ reasons }));
    }

    render() {
        const { reasons } = this.state;

        if (!reasons) {
            return null;
        }

        return (
            <div className="row">
                <div className="col-md-8 col-md-offset-2">
                    <ReactHighcharts config={this.getConfig()}/>
                </div>
            </div>
        );
    }

    getConfig() {
        const { reasons } = this.state;
        const reasonKeys = Object.keys(reasons);
        const unit = 'percentage';

        const conf = {
            chart: {
                type: 'column',
                height: 450
            },

            title: {
                text: 'Årsak til løftebrudd'
            },

            exporting: {
                enabled: true,
                chartOptions: {
                    chart: {
                        backgroundColor: 'white'
                    },

                    title: {
                        enabled: true,
                        text: 'Årsak til løftebrudd'
                    },

                    credits: {
                        enabled: true,
                        text: 'sjekk.holderdeord.no',
                        href: 'https://sjekk.holderdeord.no',
                        position: { align: 'right' }
                    },

                    tooltip: {
                        pointFormatter: function() {
                            return unit === 'percentage' ? `${Math.round(this.y)} % (${this._data.count})` : `${this._data.count} (${Math.round(this._data.percentage)} %)`;
                        }
                    },


                    plotOptions: {
                        series: {
                            dataLabels: {
                                enabled: false,
                                color: '#777'
                            }
                        }
                    }
                }
            },

            legend: {
                enabled: false
            },

            xAxis: {
                categories: reasonKeys.map(e => reasonTitles[e])
            },

            yAxis: {
                labels: {
                    format: unit === 'percentage' ? '{value} %' : '{value}'
                }
            },

            tooltip: {
                pointFormatter: function() {
                    return unit === 'percentage' ? `${Math.round(this.y)} % (${this._data.count})` : `${this._data.count} (${Math.round(this._data.percentage)} %)`;
                }
            },


            series: [
                {
                    name: unit === 'percentage' ? `Prosent av brutte løfter` : 'Antall løfter',
                    colorByPoint: true,
                    data: reasonKeys.map(s => ({
                        _data: reasons[s],
                        y: reasons[s][unit],
                        // color: 'rgb(43, 43, 43)'
                    }))
                }
            ]
        };

        return conf;

    }
}
