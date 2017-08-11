import React, { Component } from 'react';

export default class StatusTable extends Component {
    state = {
        sortKey: 'broken',
        sortDirection: 'desc'
    }

    setSort(key) {
        if (key === this.state.sortKey) {
            this.setState({
                sortDirection: this.state.sortDirection === 'asc' ? 'desc' : 'asc'
            });
        } else {
            this.setState({sortKey: key});
        }
    }

    render() {
        const { stats}  = this.props;
        const { sortKey, sortDirection } = this.state;
        if (!stats.ministries) {
            return null;
        }

        let sortedMinistries;

        if (sortKey === 'totalCount') {
            sortedMinistries = [...stats.ministries].sort((a, b) => a.totalCount - b.totalCount);
        } else {
            sortedMinistries = [...stats.ministries].sort((a, b) => ((a.statuses[sortKey] ? a.statuses[sortKey].percentage : 0) - (b.statuses[sortKey] ? b.statuses[sortKey].percentage : 0)));
        }

        let sortIconClass;

        if (sortDirection === 'desc') {
            sortedMinistries.reverse();
            sortIconClass = 'fa-chevron-down';
        } else {
            sortIconClass = 'fa-chevron-up';
        }

        const sortIcon = <i className={`fa ${sortIconClass}`} />;

        return (
            <div className="table-responsive">
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th>Departement</th>
                            <th className="num text-xs-right" style={{cursor: 'pointer'}} onClick={this.setSort.bind(this, 'kept')}>{ sortKey === 'kept' ? sortIcon : ''} Holdt</th>
                            <th className="num text-xs-right" style={{cursor: 'pointer'}} onClick={this.setSort.bind(this, 'partially-kept')}>{ sortKey === 'partially-kept' ? sortIcon : ''} Delvis holdt</th>
                            <th className="num text-xs-right" style={{cursor: 'pointer'}} onClick={this.setSort.bind(this, 'broken')}>{ sortKey === 'broken' ? sortIcon : ''} Brutt</th>
                            <th className="num text-xs-right" style={{cursor: 'pointer'}} onClick={this.setSort.bind(this, 'uncheckable')}>{ sortKey === 'uncheckable' ? sortIcon : ''} Kan ikke etterprøves</th>
                            <th className="num text-xs-right" style={{cursor: 'pointer'}} onClick={this.setSort.bind(this, 'totalCount')}>{ sortKey === 'totalCount' ? sortIcon : ''} Totalt</th>
                        </tr>
                    </thead>

                    <tbody>
                        {sortedMinistries.map(m => (
                            <tr key={m.name}>
                                <td className="ministry-name">{m.name}</td>
                                <td className="num text-xs-right">
                                    {m.statuses.kept ? Math.round(m.statuses.kept.percentage) : 0} %{' '}
                                    ({m.statuses.kept ? m.statuses.kept.count : 0})
                                </td>
                                <td className="num text-xs-right">
                                    {m.statuses['partially-kept'] ? Math.round(m.statuses['partially-kept'].percentage) : 0} %{' '}
                                    ({m.statuses['partially-kept'] ? m.statuses['partially-kept'].count : 0})
                                </td>
                                <td className="num text-xs-right">
                                    {m.statuses.broken ? Math.round(m.statuses.broken.percentage) : 0} %{' '}
                                    ({m.statuses.broken ? m.statuses.broken.count : 0})
                                </td>
                                <td className="num text-xs-right">
                                    {m.statuses.uncheckable ? Math.round(m.statuses.uncheckable.percentage) : 0} %{' '}
                                    ({m.statuses.uncheckable ? m.statuses.uncheckable.count : 0})
                                </td>
                                <td className="num text-xs-right">
                                    {m.totalCount}
                                </td>
                            </tr>
                        ))}



                        {stats.totals ? (
                            <tr>
                                <th>Totalt</th>
                                <th className="num text-xs-right">
                                    {stats.totals.kept ? Math.round(stats.totals.kept.percentage) : 0} %{' '}
                                    ({stats.totals.kept ? stats.totals.kept.count : 0})
                                </th>
                                <th className="num text-xs-right">
                                    {stats.totals['partially-kept'] ? Math.round(stats.totals['partially-kept'].percentage) : 0} %{' '}
                                    ({stats.totals['partially-kept'] ? stats.totals['partially-kept'].count : 0})
                                </th>
                                <th className="num text-xs-right">
                                    {stats.totals.broken ? Math.round(stats.totals.broken.percentage) : 0} %{' '}
                                    ({stats.totals.broken ? stats.totals.broken.count : 0})
                                </th>
                                <th className="num text-xs-right">
                                    {stats.totals.uncheckable ? Math.round(stats.totals.uncheckable.percentage) : 0} %{' '}
                                    ({stats.totals.uncheckable ? stats.totals.uncheckable.count : 0})
                                </th>
                                <th className="num text-xs-right">
                                    {stats.totalCount}
                                </th>
                            </tr>
                        ) : null}
                    </tbody>
                </table>
            </div>
        )
    }
}