import fetch from "isomorphic-fetch";
import { elasticUrl } from "./utils";

export default class SearchApi {
    getBrokenReasons() {
        return this.search({
            query: {
                query_string: {
                    query: "status:broken"
                }
            },
            size: 0,
            aggs: {
                brokenReason: {
                    terms: {
                        field: "brokenReason"
                    }
                }
            }
        }).then(res => {
            const result = {};
            const total = res.aggregations.brokenReason.buckets.reduce((a, e) => a + e.doc_count, 0);

            res.aggregations.brokenReason.buckets.map(bucket => result[bucket.key] = {
                count: bucket.doc_count,
                percentage: (bucket.doc_count * 100) / total
            });

            return result;
        });
    }

    getStats() {
        return this.search({
            aggs: {
                allStatuses: {
                    terms: {
                        field: "status"
                    }
                },
                ministries: {
                    terms: {
                        field: "ministry",
                        size: 50
                    },
                    aggs: {
                        statuses: {
                            terms: {
                                field: "status"
                            }
                        }
                    }
                }
            },
            size: 0
        }).then(res => {
            const totals = {};
            const ministries = [];

            const totalCount = res.hits.total;

            res.aggregations.allStatuses.buckets.forEach(bucket => {
                totals[bucket.key] = {
                    count: bucket.doc_count,
                    percentage: bucket.doc_count * 100 / totalCount
                };
            });

            res.aggregations.ministries.buckets.forEach(bucket => {
                ministries.push({
                    name: bucket.key,
                    totalCount: bucket.doc_count,
                    statuses: bucket.statuses.buckets.reduce(
                        (result, statusBucket) => ({
                            ...result,
                            [statusBucket.key]: {
                                count: statusBucket.doc_count,
                                percentage:
                                    statusBucket.doc_count *
                                    100 /
                                    bucket.doc_count
                            }
                        }),
                        {}
                    )
                });
            });

            return { ministries, totals, totalCount };
        });
    }

    search(body) {
        return fetch(elasticUrl + "/_search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(body)
        }).then(
            res =>
                res.ok
                    ? res.json()
                    : Promise.reject(
                          new Error(
                              `could not fetch ${res.url}: ${res.status} ${res.statusText}`
                          )
                      )
        );
    }
}
