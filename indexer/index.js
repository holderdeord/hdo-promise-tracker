const Promise = require('bluebird');
const elasticsearch = require('elasticsearch');
const fetch = require('node-fetch');
const log = require('debug')('hdo-promise-tracker:indexer');
const fs = require('fs');
const getMetadata = require('./metadata');

const INDEX = 'hdo-promise-tracker-2017';

const es = new elasticsearch.Client({
    host: process.env.ELASTICSEARCH_URL || 'localhost:9200',
    version: process.env.ELASTICSEARCH_VERSION || '5.4',
    log: 'debug',
    defer: () => Promise.defer()
});

function fetchRaw() {
    return Promise.resolve(
        fetch(
            'https://files.holderdeord.no/gdrive/14LtkMlUJ3K7BPz_bJOEVjtktBK9V3tVeDLu5D1qiRnQ.json'
        )
    ).then(
        res =>
            res.ok
                ? res.json()
                : Promise.reject(
                      new Error(
                          `fetch failed: ${res.url} ${res.status} ${res.statusText}`
                      )
                  )
    );
}

function indexPromise(doc) {
    return es.index({
        index: INDEX,
        type: 'promise',
        id: doc.id,
        body: doc
    });
}

function brokenReasonFor(raw) {
    const noMajority = (raw['Ikke flertall på Stortinget'] || '').toLowerCase() === 'ja';
    const noPriority = (raw['Ikke prioritert'] || '').toLowerCase() === 'ja';
    const changedOpinion = (raw['Snudd'] || '').toLowerCase() === 'ja';

    const reasons = [noMajority, noPriority, changedOpinion].filter(e => !!e);

    if (reasons.length !== 1) {
        throw new Error(`multiple or no broken reasons`);
    }

    if (noMajority) {
        return 'no-majority';
    } else if (noPriority) {
        return 'no-priority';
    } else if (changedOpinion) {
        return 'changed-opinion';
    } else {
        return 'unknown';
    }
}

const ids = new Set();

function convertRawToDoc(raw) {
    log('raw', raw);

    try {
        const uncheckable =
            (raw['Kan ikke etterprøves'] || '').toLowerCase() === 'ja';

        const status = uncheckable ? 'uncheckable' : statusFor(raw['Holdt?']);

        const doc = {
            id: raw.ID,
            text: raw.LØFTE,
            categories: (raw.Kategori || '')
                .split(';')
                .map(e => e.trim())
                .filter(e => e.length),
            ministry: (raw['Ansvarlig dep.'] || 'Ukjent').trim(),
            status: status,
            completed: raw['Ferdigsjekka?'].toLowerCase() === 'ja',
            explanation: raw['Kommentar/Forklaring'].trim(),
            checker: (raw['Hvem sjekker?'] || 'Ukjent').trim(),
            uncheckable,
            propositions: (raw['Relevante forslag'] || '')
                .split(/ og |\s/)
                .map(e => e.trim())
                .filter(e => e.length),
            brokenReason: status === 'broken' ? brokenReasonFor(raw) : null
        };

        if (doc.id === null) {
            throw new Error(`missing id: ${doc.id}`);
        }

        if (ids.has(doc.id)) {
            throw new Error(`duplicate id: ${doc.id}`);
        }

        ids.add(doc.id);

        if (doc.propositions.length) {
            return Promise.props(
                Object.assign(doc, {
                    propositions: Promise.map(doc.propositions, getMetadata).filter(e => !!e)
                })
            );
        }

        return Promise.resolve(doc);
    } catch (error) {
        errors.push({
            error: error.toString(),
            raw: Object.assign(raw, { lofte: raw.LØFTE })
        });
        return Promise.resolve({});
    }
}

function statusFor(str) {
    switch (str.toLowerCase()) {
        case 'ja':
            return 'kept';
        case 'nei':
            return 'broken';
        case 'delvis':
            return 'partially-kept';
        case 'ikke enda':
            return 'not-yet';
        default:
            throw new Error(`unknown status: ${JSON.stringify(str)}`);
    }
}

function createIndex() {
    return es.indices
        .delete({
            index: INDEX,
            ignore: [404]
        })
        .then(i => {
            return es.indices.create({
                index: INDEX,
                body: {
                    mappings: {
                        promise: {
                            properties: {
                                id: { type: 'string', index: 'not_analyzed' },
                                text: { type: 'string' },
                                categories: {
                                    type: 'string',
                                    index: 'not_analyzed'
                                },
                                ministry: {
                                    type: 'string',
                                    index: 'not_analyzed'
                                },
                                status: {
                                    type: 'string',
                                    index: 'not_analyzed'
                                },
                                completed: { type: 'boolean' },
                                explanation: { type: 'string' },
                                checker: {
                                    type: 'string',
                                    index: 'not_analyzed'
                                },
                                uncheckable: { type: 'boolean' },
                                propositions: {
                                    properties: {
                                        canonicalUrl: {
                                            type: 'string',
                                            index: 'not_analyzed'
                                        },
                                        title: { type: 'string' },
                                        url: { type: 'string', index: 'not_analyzed' }
                                    }
                                }
                            }
                        }
                    }
                }
            });
        });
}

const errors = [];

createIndex()
    .then(fetchRaw)
    .then(doc => doc.data.promises)
    .filter(raw => raw.Slettes !== 'Ja')
    .map(promise => convertRawToDoc(promise).then(doc => indexPromise(doc)), {
        concurrency: 3
    })
    .then(() => {
        if (errors.length) {
            log('found errors, check errors.json');
            fs.writeFileSync('errors.json', JSON.stringify(errors));
        }
    })
    .then(() => console.log('done'));
