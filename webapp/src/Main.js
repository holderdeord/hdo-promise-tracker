import React, { Component } from 'react';

import Intro from './Intro';
import StatusTotals from './StatusTotals';
import StatusByMinistry from './StatusByMinistry';
import PromiseList from './PromiseList';
import SearchApi from './SearchApi';

export default class Main extends Component {
    api = new SearchApi();

    state = {
        stats: { totals: null, ministries: null }
    }

    componentDidMount() {
        this.api.getStats().then(stats => this.setState({stats}))
    }

    render() {
        const { stats } = this.state;

        return (
            <div>
                <Intro />
                <StatusTotals data={stats.totals} />
                <StatusByMinistry data={stats.ministries} />

                <PromiseList />
            </div>
        );
    }
}


