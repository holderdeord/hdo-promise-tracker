import React from 'react';

import StatusTotals from './StatusTotals';
import StatusByMinistry from './StatusByMinistry';

export default ({ stats }) =>
    <div className="row">
        <div className="col-md-12 col-lg-6">
            <div className="hdo-card" style={{padding: '2rem'}}>
                <StatusTotals data={stats.totals} />
            </div>
        </div>

        <div className="col-md-12 col-lg-6">
            <div className="hdo-card" style={{padding: '2rem'}}>
                <StatusByMinistry data={stats.ministries} />
            </div>
        </div>
    </div>;
