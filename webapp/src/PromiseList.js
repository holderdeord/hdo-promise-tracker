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

import {
    translations,
    customHighlight
} from './utils';

const sk = new SearchkitManager('https://search.holderdeord.no/hdo-promise-tracker-2017/_search');

sk.translateFunction = (key) => translations[key]

export default (props) => (
	 <SearchkitProvider searchkit={sk}>
            <Layout>
                <TopBar>
                    <SearchBox
                      autofocus
                      searchOnChange
                      prefixQueryFields={["body"]}
                    />
                </TopBar>
                <LayoutBody>
                    <SideBar>
                        <RefinementListFilter
                            id="period"
                            title="Stortingsperiode"
                            field="parliament_period_name"
                            size={10}
                            orderKey="_term"
                        />

                        <RefinementListFilter
                            id="parties"
                            title="Partier og regjeringer"
                            field="promisor_name"
                            size={10}
                            operator="OR"
                            orderKey="_term"
                        />

                        <RefinementListFilter
                            id="categories"
                            title="Kategorier"
                            field="category_names"
                            size={10}
                        />
                    </SideBar>

                    <LayoutResults>
                        <ActionBar>
                          <ActionBarRow>
                            <HitsStats />
                            <SelectedFilters />
                          </ActionBarRow>
                        </ActionBar>

                        <Hits
                          hitsPerPage={30}
                          highlightFields={["body"]}
                          customHighlight={customHighlight}
                          itemComponent={PromiseItem}
                        />

                        <NoHits suggestionsField="body" />

                        <Pagination showNumbers={true} pageScope={1} showFirst={false} showText={true} />
                        <PaginationSelect />

                  </LayoutResults>
                </LayoutBody>
              </Layout>
        </SearchkitProvider>
);