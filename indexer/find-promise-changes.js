const Promise = require('bluebird');
const fetch = require('node-fetch');
const fs = require('fs');
const { groupBy } = require('lodash');

function fetchJson(url) {
    return Promise.resolve(fetch(url)).then(
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

fetchJson(
    'https://files.holderdeord.no/gdrive/14LtkMlUJ3K7BPz_bJOEVjtktBK9V3tVeDLu5D1qiRnQ.json'
).then(doc => {
    const promises = doc.data.promises;

    return Promise.map(
        doc.data.promises,
        (raw, idx) => {
            console.log({ id: raw.ID });

            return fetch(`https://data.holderdeord.no/api/promises/${raw.ID}`)
                .then(
                    res =>
                        res.ok
                            ? res.json()
                            : {
                                  id: `error-${idx}:${raw.ID}`,
                                  type: 'error',
                                  status: res.status,
                                  statusText: res.statusText
                              }
                )
                .then(found => ({ raw, found }));
        },
        { concurrency: 3 }
    ).then(promises => {
        const newPromises = [],
            splitPromises = [],
            removePromises = [];

        promises.forEach(promise => {
            if (promise.raw.Slettes === 'Ja') {
                removePromises.push(promise);
            } else if ((promise.raw.ID || '').match(/^\d+-\d/)) {
                splitPromises.push(promise);
            } else if (promise.found.type === 'error') {
                newPromises.push(promise);
            }
        });

        fs.writeFileSync(
            'promise-changes.json',
            JSON.stringify({
                splitPromises: groupBy(splitPromises, p => p.found._links.self.href),
                newPromises,
                removePromises,
            })
        );
    });
});
