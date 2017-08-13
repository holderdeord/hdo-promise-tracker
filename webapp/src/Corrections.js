import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { promiseLink } from './utils';

export default class Corrections extends Component {
    state = { corrections: null };

    componentDidMount() {
        fetch(
            'https://files.holderdeord.no/gdrive/1q8faLlWdoWxrAM4r9I-q4Tn7nPdl7myw0fJ3jod11WU.json'
        )
            .then(res => (res.ok ? res.json() : []))
            .then(doc => this.setState({ corrections: doc.data.rettelser }));
    }

    render() {
        const { corrections } = this.state;

        if (!corrections) {
            return null;
        }

        return (
            <div className="row" id="rettelser">
                <div className="col-md-12">
                    <div className="hdo-card p-a-1">
                        <div className="row">
                            <div className="col-md-3 text-md-right">
                                <h4>Rettelser</h4>
                            </div>
                            <div className="col-md-8">
                                <table className="table table-sm">
                                    <thead>
                                        <tr>
                                            <th>Når</th>
                                            <th style={{maxWidth: '200px'}}>Hva er endret</th>
                                            <th></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {corrections
                                            .filter(
                                                c =>
                                                    c.dato &&
                                                    c.tid &&
                                                    c['hva er endret']
                                            )
                                            .map((c, i) =>
                                                <tr key={i}>
                                                    <td className="nowrap">
                                                        {c.dato} {c.tid}
                                                    </td>
                                                    <td>
                                                        {c['hva er endret']}
                                                    </td>
                                                    <td>{c.id ? <a href={promiseLink(c.id)}><i className="fa fa-link" /></a> : null}</td>
                                                </tr>
                                            )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
