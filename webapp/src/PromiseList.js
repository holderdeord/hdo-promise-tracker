import React from 'react';

import {
    SearchkitManager,
    SearchkitProvider,
    Layout,
    LayoutBody,
    TopBar,
    SideBar,
    LayoutResults,
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
    <div className="hdo-card container">
        <SearchkitProvider searchkit={sk}>
            <Layout>
                    <SearchBox
                        autofocus
                        searchOnChange
                        prefixQueryFields={['text']}
                    />
                <LayoutBody>
                    <LayoutResults>
                        <ActionBar>
                            <ActionBarRow>
                                <HitsStats />
                                <SelectedFilters />
                            </ActionBarRow>
                        </ActionBar>

                        <Hits
                            hitsPerPage={30}
                            highlightFields={['text']}
                            customHighlight={customHighlight}
                            itemComponent={PromiseItem}
                            scrollTo={false}
                        />

                        <NoHits suggestionsField="text" />

                        <Pagination
                            showNumbers={true}
                            pageScope={1}
                            showFirst={false}
                            showText={true}
                        />
                        <PaginationSelect />
                    </LayoutResults>
                </LayoutBody>
            </Layout>
        </SearchkitProvider>;
    </div>
