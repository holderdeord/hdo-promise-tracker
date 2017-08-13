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
        const { unit, detailsOpen } = this.state;
        const tableDataUri = detailsOpen ? '#' : this.createCsvUri();

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
                            <div className="btn-group btn-toggle">
                                <input
                                    type="button"
                                    value="Andel"
                                    onClick={() =>
                                        this.setState({ unit: 'percentage' })}
                                    className={cn('btn btn-sm', {
                                        'btn-primary': unit === 'percentage',
                                        'btn-default': unit !== 'percentage'
                                    })}
                                />
                                <input
                                    type="button"
                                    value="Antall"
                                    onClick={() =>
                                        this.setState({ unit: 'count' })}
                                    className={cn('btn btn-sm', {
                                        'btn-primary': unit === 'count',
                                        'btn-default': unit !== 'count'
                                    })}
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
                                display: detailsOpen ? 'none' : 'inline-block'
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
                    className={`row details ${detailsOpen
                        ? 'open'
                        : ''}`}
                >
                    <div className="col-md-12">
                        <StatusTable stats={stats} />

                        <p>
                            På grunn av avrunding vil totaler kunne avvike fra
                            summen av undergrupper. Du kan laste ned{' '}
                            <a
                                href={this.createCsvUri()}
                                download="holder-de-ords-loftesjekk-2017-oversikt.csv"
                            >
                                denne tabellen
                            </a>{' '}
                            eller{' '}
                            <a href="https://files.holderdeord.no/data/csv/loftesjekk-2017.csv">
                                hele datasettet
                            </a>{' '}
                            som CSV.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    createCsvUri() {
        const { stats } = this.props;

        if (!stats.totals) {
            return '#';
        }

        const rows = [
            [
                'Departement',
                'Holdt',
                'Holdt %',
                'Delvis holdt',
                'Delvis holdt %',
                'Brutt',
                'Brutt %',
                'Kan ikke etterprøves',
                'Kan ikke etterprøves %',
                'Totalt'
            ]
        ];

        stats.ministries.forEach(m => {
            rows.push([
                m.name,
                m.statuses.kept ? m.statuses.kept.count : 0,
                m.statuses.kept ? m.statuses.kept.percentage : 0,
                m.statuses['partially-kept']
                    ? m.statuses['partially-kept'].count
                    : 0,
                m.statuses['partially-kept']
                    ? m.statuses['partially-kept'].percentage
                    : 0,
                m.statuses.broken ? m.statuses.broken.count : 0,
                m.statuses.broken ? m.statuses.broken.percentage : 0,
                m.statuses.uncheckable ? m.statuses.uncheckable.count : 0,
                m.statuses.uncheckable ? m.statuses.uncheckable.percentage : 0,
                m.totalCount
            ]);
        });

        if (stats.totals) {
            rows.push([
                'Totalt',
                stats.totals.kept ? stats.totals.kept.count : 0,
                stats.totals.kept ? stats.totals.kept.percentage : 0,
                stats.totals['partially-kept']
                    ? stats.totals['partially-kept'].count
                    : 0,
                stats.totals['partially-kept']
                    ? stats.totals['partially-kept'].percentage
                    : 0,
                stats.totals.broken ? stats.totals.broken.count : 0,
                stats.totals.broken ? stats.totals.broken.percentage : 0,
                stats.totals.uncheckable ? stats.totals.uncheckable.count : 0,
                stats.totals.uncheckable
                    ? stats.totals.uncheckable.percentage
                    : 0,
                stats.totalCount
            ]);
        }

        const uri =
            `data:text/csv;charset=utf-8,` +
            rows.map(e => e.join(',')).join('\n');
        return encodeURI(uri);
    }
}
