import React, { Component } from 'react';

import Intro from './Intro';
import PromiseList from './PromiseList';
import SearchApi from './SearchApi';
import StatusCharts from './StatusCharts';

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

        return (
            <div>
                <Intro count={stats.totalCount} />
                <StatusCharts stats={stats} />
                <PromiseList />
            </div>
        );
    }
}


