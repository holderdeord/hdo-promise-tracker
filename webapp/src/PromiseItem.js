import React, { Component } from 'react';
import _ from 'lodash';
import { statusTitles } from './utils';
import cn from 'classnames';

export default class PromiseItem extends Component {
    state = { expanded: false };

    render() {
        const { result, showIds } = this.props;

        return (
            <div
                className={`promise-item promise-status-${result._source
                    .status}`}
            >
                <div className="row">
                    <div className="col col-md-6 col-lg-5">
                        <div className="promise-row">
                            <div className="promise-status">
                                <h5>
                                    {statusTitles[result._source.status] ||
                                        `Ukjent`}:
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col col-md-6 col-lg-5">
                        <div className="promise-row">
                            <div
                                className="promise-text"
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

                            <div
                                className={cn('promise-read-more', {
                                    'promise-read-more-expanded': this.state
                                        .expanded
                                })}
                            >
                                <div
                                    onClick={() =>
                                        this.setState({ expanded: true })}
                                    data-ga-on="click"
                                    data-ga-event-category="Les hvorfor"
                                    data-ga-event-action="click"

                                >
                                    Les hvorfor{' '}
                                    <i className="fa fa-chevron-down" />
                                </div>
                            </div>
                        </div>

                        {showIds
                            ? <div className="promise-row">
                                  <div>
                                      <strong>ID:</strong> {result._source.id}
                                  </div>
                                  <div>
                                      <strong>Sjekket av:</strong>{' '}
                                      {result._source.checker}
                                  </div>
                              </div>
                            : null}
                    </div>

                    <div
                        className={cn('col col-md-6 col-lg-7 promise-details', {
                            'promise-details-expanded': this.state.expanded
                        })}
                    >
                        <div className="promise-row">
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

                        <div className="row">
                            <div className={`col-lg-${result._source.propositions.length ? '6' : '12'}`}>
                                <div className="promise-row">
                                    <small>
                                        <strong>Departement</strong>
                                        <p
                                            className="promise-ministry"
                                            title={result._source.ministry}
                                        >
                                            {result._source.ministry}
                                        </p>
                                    </small>
                                </div>
                            </div>

                            {result._source.propositions &&
                            result._source.propositions.length
                                ? <div className="col-lg-6">
                                      <div className="promise-row">
                                        <small>
                                              <strong>Kilder</strong>
                                              <ul>
                                                  {result._source.propositions.map(
                                                      (l, i) =>
                                                          <li
                                                              key={l.url + i}
                                                              title={
                                                                  l.title || l.host
                                                              }
                                                          >
                                                              <a href={l.url}>
                                                                  {l.title ||
                                                                      l.host}
                                                              </a>
                                                          </li>
                                                  )}
                                              </ul>
                                        </small>
                                      </div>
                                  </div>
                                : null}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
