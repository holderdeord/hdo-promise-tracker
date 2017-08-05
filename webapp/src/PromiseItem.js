import React from 'react';
import _ from 'lodash';

export default (props) => (
    <div className="promise-item padded">
        <div className="" dangerouslySetInnerHTML={{
            __html: _.get(props.result, "highlight.body", props.result._source.status)
        }} />
        <div className="" dangerouslySetInnerHTML={{
            __html: _.get(props.result, "highlight.body", props.result._source.ministry)
        }} />
        <div className="" dangerouslySetInnerHTML={{
            __html: _.get(props.result, "highlight.body", props.result._source.text)
        }} />
        <a href={props.result._source.propositions} className="" dangerouslySetInnerHTML={{
            __html: _.get(props.result, "highlight.body", props.result._source.propositions)
        }} />
    </div>
);
