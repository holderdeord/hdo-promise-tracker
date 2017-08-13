import React from 'react';

export default () =>
    <div className="row">
        <div className="col-md-8 col-md-offset-2">
            <div id="comments" className="hdo-card p-a-2">
                <h3>Kommentarer</h3>

                <div
                    className="fb-comments"
                    data-href={`https://sjekk.holderdeord.no`}
                    data-width="100%"
                    data-numposts="5"
                    data-colorscheme="light"
                />
            </div>
        </div>
    </div>;
