import React, { Component } from 'react';

import Intro from './Intro';
import PromiseSearch from './PromiseSearch';
import SearchApi from './SearchApi';
import StatusCharts from './StatusCharts';
import Method from './Method';
import BrokenReason from './BrokenReason';

export default class Main extends Component {
    api = new SearchApi();

    state = {
        stats: { totals: null, ministries: null, totalCount: null }
    }

    componentDidMount() {
        this.api.getStats().then(stats => this.setState({stats}))
    }

    render() {
        const { stats } = this.state;
        const { query } = this.props;

        if (query.brokenReason === 'true') {
            return <BrokenReason api={this.api} />
        }

        return (
            <div>
                <Intro count={stats.totalCount} />
                <StatusCharts stats={stats} config={{
                    statusTotals: query.statusTotals || 'column',
                    exporting: query.exporting === 'true' && window.innerWidth > 768
                }} />
                <PromiseSearch showIds={query.ids === 'true'} />
                <Method />
            </div>
        );
    }
}


