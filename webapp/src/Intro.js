import React from 'react';

export default ({count}) =>
    <div className="intro">
        <div className="row">
            <div className="col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-2">
                <p className="lead text-xs-center">
                    Vi har sjekket om Solberg-regjeringen har holdt det de lovet i regjeringserklæringen fra 2013. Her kan du se status på {count ? `${count} løfter` : 'alle løftene'} og finne ut hvilke som er holdt og brutt i perioden.
                </p>
            </div>
        </div>
    </div>;
