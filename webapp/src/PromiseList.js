import React, { Component } from 'react';

import {
    SearchkitManager,
    SearchkitProvider,
    HitsStats,
    SearchBox,
    Hits,
    NoHits,
    RefinementListFilter,
    Pagination,
    PaginationSelect,
    Toggle,
    Tabs,
    ItemList,
    ItemComponent,
    Select,
    CheckboxItemList,
    ItemHistogramList
} from 'searchkit';

import PromiseItem from './PromiseItem';

import { translations, customHighlight, statusTitles } from './utils';
import 'searchkit/release/theme.css';

const sk = new SearchkitManager(
    'https://search.holderdeord.no/hdo-promise-tracker-2017/'
);

sk.translateFunction = key => translations[key];

export default class PromiseList extends Component {
    state = { filtersShown: false }

    render() {
        return (
            <SearchkitProvider searchkit={sk}>
                <div className="hdo-card promise-list">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-10">
                                <SearchBox
                                    autofocus
                                    searchOnChange
                                    prefixQueryFields={['text']}
                                />
                            </div>

                            <div className="col-xs-2">
                                <div
                                    className="filter-button"
                                    onClick={() => this.setState({filtersShown: !this.state.filtersShown})}
                                />
                            </div>
                        </div>

                        <div className="row" style={{display: this.state.filtersShown ? 'block' : 'none'}}>
                            <div className="col-md-4">
                                <RefinementListFilter
                                    // listComponent={ItemList}
                                    itemComponent={props => <ItemComponent {...props} label={statusTitles[props.label]}/>}
                                    id="status"
                                    title="Løftestatus"
                                    field="status"
                                    operator="OR"
                                    size={10}
                                />
                            </div>

                            <div className="col-md-4">
                                <RefinementListFilter
                                    // listComponent={ItemList}
                                    // itemComponent={props => <ItemComponent {...props} label={statusTitles[props.label]}/>}
                                    id="ministry"
                                    title="Departement"
                                    field="ministry"
                                    operator="OR"
                                    size={20}
                                />
                            </div>

                            <div className="col-md-4">
                                <RefinementListFilter
                                    // listComponent={ItemList}
                                    // itemComponent={props => <ItemComponent {...props} label={statusTitles[props.label]}/>}
                                    id="categories"
                                    title="Kategorier"
                                    field="categories"
                                    operator="AND"
                                    size={20}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xs-12">
                                <HitsStats />
                            </div>
                        </div>
                    </div>



                    <hr style={{margin: '.5rem 0 0 0'}} />

                    <div>
                        <Hits
                            hitsPerPage={30}
                            highlightFields={['text']}
                            customHighlight={customHighlight}
                            itemComponent={props => <PromiseItem {...props} showIds={this.props.showIds}/>}
                            scrollTo=".promise-list"

                        />

                        <div style={{padding: '.5rem 0'}}>
                            <NoHits suggestionsField="text" />
                        </div>

                        <div style={{padding: '.5rem 0'}}>
                            <Pagination
                                showNumbers={true}
                                pageScope={1}
                                showFirst={false}
                                showText={true}
                            />
                        </div>
                    </div>
                </div>
            </SearchkitProvider>
        );
    }
}

