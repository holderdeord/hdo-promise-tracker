import React from 'react';

import StatusTotals from './StatusTotals';
import StatusByBuckets from './StatusByBuckets';

export default ({ stats, config }) =>
    <div className="hdo-card">
        <div className="row">
            <div className="col-md-12 col-lg-6 col-lg-offset-3">
                <div style={{padding: '1rem'}}>
                    <StatusTotals data={stats.totals} type={config.statusTotals} exporting={config.exporting}/>
                </div>
            </div>
        </div>

        <div className="row">
            <div className="col-md-6">
                <div style={{padding: '1rem'}}>
                    <StatusByBuckets title="Departement" data={stats.ministries} exporting={config.exporting} />
                </div>
            </div>

            <div className="col-md-6">
                <div style={{padding: '1rem'}}>
                    <StatusByBuckets title="Topp 10 kategorier" data={stats.categories} exporting={config.exporting} />
                </div>
            </div>
        </div>
    </div>;
