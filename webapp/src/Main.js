import React, { Component } from 'react';

import Intro from './Intro';
import PromiseSearch from './PromiseSearch';
import SearchApi from './SearchApi';
import StatusCharts from './StatusCharts';
import Method from './Method';
import Corrections from './Corrections';

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

        return (
            <div>
                <Intro count={stats.totalCount} />
                <StatusCharts stats={stats} config={{
                    statusTotals: query.statusTotals || 'column',
                    exporting: query.exporting !== 'false' && window.innerWidth > 768
                }} />
                <PromiseSearch showIds={query.ids === 'true'} />
                <Method />
                <Corrections />
            </div>
        );
    }
}


