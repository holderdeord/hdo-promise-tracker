const Promise = require('bluebird');
const elasticsearch = require('elasticsearch');
const fetch = require('node-fetch');
const log = require('debug')('hdo-promise-tracker:indexer');
const fs = require('fs');

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
        body: doc
    });
}

function convertRawToDoc(raw) {
    log('raw', raw);

    try {
        const uncheckable = (raw['Kan ikke etterprøves'] || '').toLowerCase() === 'ja';

        return {
            id: raw.ID,
            text: raw.LØFTE,
            categories: (raw.Kategori || '').split(';').map(e => e.trim()).filter(e => e.length),
            ministry: (raw['Ansvarlig dep.'] || 'Ukjent').trim(),
            status: uncheckable ? 'Kan ikke etterprøves' : statusFor(raw['Holdt?']),
            completed: raw['Ferdigsjekka?'].toLowerCase() === 'ja',
            explanation: (raw['Kommentar/Forklaring']).trim(),
            checker: (raw['Hvem sjekker?'] || 'Ukjent').trim(),
            uncheckable,
            propositions: raw['Relevante forslag']
        };
    } catch (error) {
        errors.push({error, raw});
        return {};
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
            throw new Error(`unknown status: ${JSON.stringify(str)}`)
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
                                categories: { type: 'string', index: 'not_analyzed' },
                                ministry: { type: 'string', index: 'not_analyzed' },
                                status: { type: 'string', index: 'not_analyzed' },
                                completed: { type: 'boolean' },
                                explanation: { type: 'string' },
                                checker: { type: 'string', index: 'not_analyzed' },
                                uncheckable: { type: 'boolean' },
                            }
                        }
                    }
                }
            });
        });
}

const ignoredIDs = [
    'må ha ny id',
    'null'
];

const errors = [];

createIndex()
    .then(fetchRaw)
    .then(doc => doc.data.promises)
    .filter(raw => raw.Slettes !== 'Ja' && !ignoredIDs.includes((raw.ID || 'null').toLowerCase()))
    .map(promise => indexPromise(convertRawToDoc(promise)), {concurrency: 3})
    .then(() => {
        if (errors.length) {
            log('found errors, check errors.json');
            fs.writeFileSync('errors.json', JSON.stringify(errors))
        }
    })
    .then(() => console.log('done'));
