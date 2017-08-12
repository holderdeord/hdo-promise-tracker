import React from 'react';

import StatusTotals from './StatusTotals';
import StatusByMinistry from './StatusByMinistry';
import StatusTable from './StatusTable';
import cn from 'classnames';

export default class StatusCharts extends React.Component {
    state = {
        detailsOpen: false,
        unit: 'percentage'
    };

    render() {
        const { stats, config } = this.props;
        const { unit, detailsOpen} = this.state;

        if (!stats.totals) {
            return (
                <div className="hdo-card">
                    <div
                        className="text-xs-center"
                        style={{ color: '#777', padding: '1rem' }}
                    >
                        <i className="fa fa-circle-o-notch fa-spin fa-2x fa-fw" />
                    </div>
                </div>
            );
        }

        return (
            <div className="hdo-card">
                <div className="row">
                    <div className="col-md-12 col-lg-5">
                        <div style={{ padding: '1rem' }}>
                            <StatusTotals
                                data={stats.totals}
                                type={config.statusTotals}
                                exporting={config.exporting}
                                unit={unit}
                            />
                        </div>
                    </div>

                    <div className="col-md-12 col-lg-7">
                        <div style={{ padding: '1rem' }}>
                            <StatusByMinistry
                                data={stats.ministries}
                                exporting={config.exporting}
                                unit={unit}
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 col-md-offset-3 text-xs-center">
                        <div className="toggle-unit" data-reactid=".0.1.0.1.0">
                            <div
                                className="btn-group btn-toggle"
                            >
                                <input
                                    type="button"
                                    value="Andel"
                                    onClick={() => this.setState({unit: 'percentage'})}
                                    className={cn('btn btn-sm', {'btn-primary': unit === 'percentage', 'btn-default': unit !== 'percentage'})}
                                />
                                <input
                                    type="button"
                                    value="Antall"
                                    onClick={() => this.setState({unit: 'count'})}
                                    className={cn('btn btn-sm', {'btn-primary': unit === 'count', 'btn-default': unit !== 'count'})}
                                />
                            </div>
                        </div>

                        <div
                            className="toggle-details"
                            onClick={() => this.setState({ detailsOpen: true })}
                            data-ga-on="click"
                            data-ga-event-category="Se detaljer"
                            data-ga-event-action="click"
                            style={{
                                display: detailsOpen
                                    ? 'none'
                                    : 'inline-block'
                            }}
                        >
                            <div>Se detaljer</div>
                            <div>
                                <i className="fa fa-chevron-down" />
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className={`row details ${this.state.detailsOpen
                        ? 'open'
                        : ''}`}
                >
                    <div className="col-md-12">
                        <StatusTable stats={stats} />
                        <p>
                            På grunn av avrunding vil totaler kunne avvike fra
                            summen av undergrupper.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
