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
    ItemComponent,
    CheckboxItemList,
} from 'searchkit';

import PromiseItem from './PromiseItem';

import { translations, customHighlight, statusTitles } from './utils';
import 'searchkit/release/theme.css';

const sk = new SearchkitManager(
    'https://search.holderdeord.no/hdo-promise-tracker-2017/'
);

sk.translateFunction = key => translations[key];
let initial = true;

sk.addResultsListener((results)=>{
    if (!initial) {
        document.querySelector('.promise-list').scrollIntoView();
    }

    initial = false;
})

export default class PromiseList extends Component {
    state = { mobileFiltersShown: false }

    render() {
        return (
            <SearchkitProvider searchkit={sk}>
                <div className="hdo-card promise-list">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-10">
                                <SearchBox
                                    searchOnChange
                                    prefixQueryFields={['text']}
                                />
                            </div>

                            <div className="col-xs-2">
                                <div
                                    className="filter-button"
                                    onClick={() => this.setState({mobileFiltersShown: !this.state.mobileFiltersShown})}
                                />

                                <div className="hidden-sm-down text-xs-right" style={{paddingTop: '10px'}}>
                                    <HitsStats />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xs-12 hidden-sm-up">
                                <HitsStats />
                            </div>
                        </div>
                    </div>

                    <hr style={{margin: '.5rem 0 0 0'}} />

                    <div className="row">
                        <div className="col-md-3">
                            <div className="filter-container" style={this.state.mobileFiltersShown ? {display: 'block'} : {}}>
                                <div className="filter">
                                    <RefinementListFilter
                                        listComponent={CheckboxItemList}
                                        itemComponent={props => <ItemComponent {...props} label={statusTitles[props.label]}/>}
                                        id="status"
                                        title="Løftestatus"
                                        field="status"
                                        operator="OR"
                                        size={10}
                                    />
                                </div>

                                <div className="filter">
                                    <RefinementListFilter
                                        id="ministry"
                                        title="Departement"
                                        field="ministry"
                                        operator="OR"
                                        size={20}
                                    />
                                </div>

                                <div className="filter">
                                    <RefinementListFilter
                                        id="categories"
                                        title="Kategorier"
                                        field="categories"
                                        operator="AND"
                                        size={20}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-9">
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
                </div>
            </SearchkitProvider>
        );
    }
}

