import React from 'react';
import _ from 'lodash';
import { statusTitles } from './utils';

export default ({ result }) =>
    <div className={`promise-item promise-status-${result._source.status}`}>
        <div className="row">
            <div className="col-md-6">
                <h5 className="promise-status">
                    {statusTitles[result._source.status] || `Ukjent`}
                </h5>

                <div
                    className="promise-row promise-text"
                    dangerouslySetInnerHTML={{
                        __html:
                            '«' +
                            _.get(
                                result,
                                'highlight.text',
                                result._source.text
                            ) +
                            '»'
                    }}
                />
            </div>

            <div className="col-md-6">
                <div className="promise-row">
                    <h6>Forklaring</h6>
                    {result._source.explanation
                        ? result._source.explanation
                              .split('\n')
                              .map((para, idx) =>
                                  <p key={idx}>
                                      {para}
                                  </p>
                              )
                        : null}
                </div>

                {result._source.propositions &&
                result._source.propositions.length
                    ? <div className="promise-row">
                          <h6>Relevante forslag</h6>
                          <ul>
                              {result._source.propositions.map(l =>
                                  <li key={l.url}>
                                      <a href={l.url}>
                                          {l.title || l.host}
                                      </a>
                                  </li>
                              )}
                          </ul>
                      </div>
                    : null}

                <div className="promise-row">
                    <h6>Departement</h6>
                    <p>
                        {result._source.ministry}
                    </p>
                </div>
            </div>
        </div>
    </div>;
