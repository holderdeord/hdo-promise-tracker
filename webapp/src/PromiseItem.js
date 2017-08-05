import React from 'react';
import _ from 'lodash';

export default (props) => (
    <div className="promise-item">
        <div dangerouslySetInnerHTML={{
            __html: _.get(props.result, "highlight.body", props.result._source.body)
        }} />

        <small className="promise-details">
            {props.result._source.parliament_period_name} / {props.result._id}
        </small>
    </div>
);
