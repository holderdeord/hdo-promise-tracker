import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { promiseLink } from './utils';

export default class Corrections extends Component {
    state = { corrections: null };

    componentDidMount() {
        fetch(
            `https://files.holderdeord.no/gdrive/1q8faLlWdoWxrAM4r9I-q4Tn7nPdl7myw0fJ3jod11WU.json?origin=${encodeURIComponent(
                window.location.host
            )}`
        )
            .then(res => (res.ok ? res.json() : []))
            .then(doc => this.setState({ corrections: doc.data.rettelser }));
    }

    render() {
        const { corrections } = this.state;

        if (!corrections || !corrections.length) {
            return null;
        }

        return (
            <ul className="list-unstyled" style={{ fontSize: '.9rem' }}>
                {corrections
                    .filter(c => c.dato && c.tid && c['hva er endret'])
                    .map((c, i) =>
                        <li key={i}>
                            <div>
                                <strong>
                                    {c.dato} {c.tid}
                                </strong>:{' '}
                            </div>
                            <div className="p-l-2">
                                {c['hva er endret']}
                                {' '}
                                {c.id
                                    ? <span><a href={promiseLink(c.id)}>Se løftet</a>.</span>
                                    : null}
                            </div>

                        </li>
                    )}
            </ul>
        );
    }
}
