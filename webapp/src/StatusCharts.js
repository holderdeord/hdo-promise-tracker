import React from 'react';

import StatusTotals from './StatusTotals';
import StatusByMinistry from './StatusByMinistry';

export default ({ stats, config }) =>
    <div className="row">
        <div className="col-md-12 col-lg-5">
            <div className="hdo-card" style={{padding: '1rem'}}>
                <StatusTotals data={stats.totals} type={config.statusTotals}/>
            </div>
        </div>

        <div className="col-md-12 col-lg-7">
            <div className="hdo-card" style={{padding: '1rem'}}>
                <StatusByMinistry data={stats.ministries} />
            </div>
        </div>
    </div>;
