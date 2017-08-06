const Promise = require('bluebird');
const elasticsearch = require('elasticsearch');
const csv = require('csv');
const { keyBy } = require('lodash');

const es = new elasticsearch.Client({
    host: process.env.ELASTICSEARCH_URL || 'localhost:9200',
    version: process.env.ELASTICSEARCH_VERSION || '5.4',
    log: 'warning',
    defer: () => Promise.defer()
});

es
    .search({
        index: 'hdo-promise-tracker-2017',
        type: 'promise',
        body: {
            query: {
                query_string: {
                    query: '*'
                }
            },
            aggs: {
                ministries: {
                    terms: {
                        field: 'ministry',
                        size: 100
                    },
                    aggs: {
                        statuses: {
                            terms: {
                                field: 'status'
                            }
                        }
                    }
                }
            },
            size: 0
        }
    })
    .then(res => {
        const out = csv.stringify({ delimiter: '\t' });
        out.pipe(process.stdout);

        out.write([
            'Departement',
            'Holdt',
            'Holdt %',
            'Delvis holdt',
            'Delvis holdt %',
            'Brutt',
            'Brutt %',
            'Ikke etterprøvbar',
            'Ikke etterprøvbar %',
            'Totalt'
        ]);

        res.aggregations.ministries.buckets.forEach(bucket => {
            const statuses = keyBy(bucket.statuses.buckets, 'key');
            out.write([
                bucket.key,
                statuses.kept ? statuses.kept.doc_count : 0,
                statuses.kept ? (statuses.kept.doc_count * 100 / bucket.doc_count).toFixed(2) : 0,
                statuses['partially-kept'] ? statuses['partially-kept'].doc_count : 0,
                statuses['partially-kept'] ? (statuses['partially-kept'].doc_count * 100 / bucket.doc_count).toFixed(2) : 0,
                statuses.broken ? statuses.broken.doc_count : 0,
                statuses.broken ? (statuses.broken.doc_count * 100 / bucket.doc_count).toFixed(2) : 0,
                statuses.uncheckable ? statuses.uncheckable.doc_count : 0,
                statuses.uncheckable ? (statuses.uncheckable.doc_count * 100 / bucket.doc_count).toFixed(2) : 0,
                bucket.doc_count
            ]);
        });

        out.end();
    });
