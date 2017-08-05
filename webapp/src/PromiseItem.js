import React from 'react';
import _ from 'lodash';
import { statusColors, statusTitles } from './utils';

export default ({result}) =>
    <div className="promise-item">
        <div style={{borderLeft: `3px solid ${statusColors[result._source.status]}`, paddingLeft: '1rem' }}>

            <div
                className="promise-text"

                dangerouslySetInnerHTML={{
                    __html: _.get(
                        result,
                        'highlight.text',
                        result._source.text
                    )
                }}
            />

            <div>
                <strong>Vår vurdering:</strong> {statusTitles[result._source.status]}
            </div>

            <div>
                <strong>Hvorfor:</strong> {result._source.explanation ? result._source.explanation.split('\n').map((para, idx) => <p key={idx}>{para}</p>) : null}
            </div>

            <div>
                <strong>Departement:</strong> {result._source.ministry}
            </div>

            <div>
                <strong>Kilder:</strong>
                <ul>
                    {(result._source.propositions || []).map(l => (
                        <li key={l}>
                            <a href={l}>{l}</a>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    </div>;
