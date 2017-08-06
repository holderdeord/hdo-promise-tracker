import React, { Component } from 'react';

import Intro from './Intro';
import PromiseList from './PromiseList';
import SearchApi from './SearchApi';
import StatusCharts from './StatusCharts';

import textBalancer from 'text-balancer';

export default class Main extends Component {
    api = new SearchApi();

    state = {
        stats: { totals: null, ministries: null, totalCount: null }
    }

    componentDidMount() {
        this.api.getStats().then(stats => this.setState({stats}))
        textBalancer.balanceText();
    }

    componentDidUpdate() {
        textBalancer.balanceText();

    }

    render() {
        const { stats } = this.state;
        const { query } = this.props;

        return (
            <div>
                <Intro count={stats.totalCount} />
                <StatusCharts stats={stats} config={{
                    statusTotals: query.statusTotals || 'column'
                }} />
                <PromiseList showIds={query.ids === 'true'} />
            </div>
        );
    }
}


