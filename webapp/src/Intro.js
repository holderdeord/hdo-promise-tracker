import React from 'react';

export default ({count}) =>
    <div className="intro">
        <div className="row">
            <div className="col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-2">
                <p className="lead text-xs-center">
                    Vi har sjekket alle {count ? count : ''} løftene i Sundvoldenerklæringen - plattformen som regjeringen fremforhandlet etter valget i 2013. Her kan du se status på alle løftene og finne ut hva som har blitt gjort i perioden.
                </p>
            </div>
        </div>
    </div>;
