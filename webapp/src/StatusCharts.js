import React from 'react';

import StatusTotals from './StatusTotals';
import StatusByMinistry from './StatusByMinistry';
import StatusTable from './StatusTable';

export default class StatusCharts extends React.Component {
    state = {detailsOpen: false};

    render() {
        const { stats, config } = this.props;

        return (
            <div className="hdo-card">
                <div className="row">
                    <div className="col-md-12 col-lg-5">
                        <div style={{padding: '1rem'}}>
                            <StatusTotals data={stats.totals} type={config.statusTotals} exporting={config.exporting}/>
                        </div>
                    </div>

                    <div className="col-md-12 col-lg-7">
                        <div style={{padding: '1rem'}}>
                            <StatusByMinistry data={stats.ministries} exporting={config.exporting} />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 col-md-offset-3 text-xs-center">
                        <div className="toggle-details" onClick={() => this.setState({detailsOpen: true})} style={{display: this.state.detailsOpen ? 'none' : 'inline-block'}}>
                            <div>Se detaljer</div>
                            <div><i className="fa fa-chevron-down"></i></div>
                        </div>
                    </div>
                </div>

                <div className={`row details ${this.state.detailsOpen ? 'open' : ''}`}>
                    <div className="col-md-12">
                        <StatusTable stats={stats} />
                        <p>På grunn av avrunding vil totaler kunne avvike fra summen av undergrupper.</p>
                    </div>
                </div>
            </div>
        );
    }
}
