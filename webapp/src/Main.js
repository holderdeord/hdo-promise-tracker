import React from 'react';

import Piechart from './Piechart';
import Barchart from './Barchart';
import PromiseList from './PromiseList';

export default () =>
    <div>
        <div className="row">
            <div className="col-md-8 col-md-offset-2">
                <p className="lead text-xs-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio obcaecati soluta delectus asperiores eos, aliquid repellat tenetur architecto, ad consequuntur a animi eaque at blanditiis doloribus aut. Totam, atque, laborum!</p>
            </div>
        </div>

        <Piechart />
        <Barchart />
        <PromiseList />
        
    </div>;


