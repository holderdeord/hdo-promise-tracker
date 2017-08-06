import React from 'react';

import {
    SearchkitManager,
    SearchkitProvider,
    SideBar,
    ActionBar,
    ActionBarRow,
    HitsStats,
    SelectedFilters,
    SearchBox,
    Hits,
    NoHits,
    RefinementListFilter,
    Pagination,
    PaginationSelect
} from 'searchkit';

import PromiseItem from './PromiseItem';

import { translations, customHighlight } from './utils';
import 'searchkit/release/theme.css';

const sk = new SearchkitManager(
    'https://search.holderdeord.no/hdo-promise-tracker-2017/'
);

sk.translateFunction = key => translations[key];

export default props =>
    <SearchkitProvider searchkit={sk}>
        <div className="hdo-card container promise-list">
            <div className="row">
                <div className="col-md-8">
                    <SearchBox
                        autofocus
                        searchOnChange
                        prefixQueryFields={['text']}
                    />
                </div>

                <div className="col-md-4 text-md-right">
                    <ActionBar>
                        <ActionBarRow>
                            <HitsStats />
                            <SelectedFilters />
                        </ActionBarRow>
                    </ActionBar>
                </div>
            </div>

            <div>
                <Hits
                    hitsPerPage={30}
                    highlightFields={['text']}
                    customHighlight={customHighlight}
                    itemComponent={PromiseItem}
                    scrollTo=".promise-list"
                />

                <NoHits suggestionsField="text" />

                <Pagination
                    showNumbers={true}
                    pageScope={1}
                    showFirst={false}
                    showText={true}
                />
                <PaginationSelect />
            </div>
        </div>
    </SearchkitProvider>;
