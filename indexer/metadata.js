const Promise = require('bluebird');
const fs = require('fs-extra');
const fetch = require('node-fetch');
const log = require('debug')('hdo-promise-tracker:indexer:metadata');
const uri = require('url');

const errors = {};
let cache = {};
const cacheFilePath = '.url-metadata-cache.json';

if (fs.existsSync(cacheFilePath)) {
    cache = JSON.parse(fs.readFileSync(cacheFilePath, 'utf-8'));
}

function placeholderFor(url) {
    return {
        url,
        canonicalUrl: url,
        host: uri.parse(url).host,
        title: null
    }
}

function writeErrors() {
    fs.writeFileSync('url-metadata-errors.json', JSON.stringify(errors));
};



module.exports = function metadataFor(url) {
    log(url);
    const hit = cache[url];

    if (hit) {
        log('hit');
        return Promise.resolve(hit);
    }

    log('miss');

    if (process.env.METADATA_API_URL && process.env.METADATA_API_AUTH) {
        log('lookup');
        return Promise.resolve(
            fetch(
                `${process.env.METADATA_API_URL}/${encodeURIComponent(url)}`,
                {
                    headers: {
                        Authorization: process.env.METADATA_API_AUTH
                    }
                }
            )
        )
            .then(
                res =>
                    res.ok
                        ? res.json()
                        : res
                              .text()
                              .then(t =>
                                  Promise.reject(
                                      new Error(
                                          `${res.url} ${res.status} ${res.statusText}:\n${t}`
                                      )
                                  )
                              )
            )
            .tap(data => {
                cache[url] = Object.assign(data, {
                    url,
                    host: uri.parse(url).host
                });
                return fs.writeFile(cacheFilePath, JSON.stringify(cache));
            })
            .then(() => cache[url])
            .catch(err => {
                log('error', err)
                errors[url] = err.toString();
                writeErrors();

                return null;
            });
    } else {
        log('placeholder');
        return Promise.resolve(placeholderFor(url));
    }
};
