export const translations = {
    "searchbox.placeholder": "Søk",
    "reset.clear_all": "Nullstill",
    "facets.view_more": "Se flere",
    "facets.view_less": "Se færre",
    "facets.view_all": "Se alle",
    "NoHits.NoResultsFound": "Ingen treff for {query}.",
    "NoHits.DidYouMean": "Søk etter {suggestion}",
    "NoHits.SearchWithoutFilters": "Søk etter {query} uten filtre",
    "NoHits.NoResultsFoundDidYouMean": "Ingen treff for {query}. Mente du «{suggestion}»?",
    "hitstats.results_found": "Viser {hitCount} løfter.",
    "pagination.previous": "Forrige",
    "pagination.next": "Neste"
};

export const customHighlight = {
    pre_tags: ['<mark>'],
    post_tags: ['</mark>'],
    fields: {
        body: {
            fragment_size: 800 // longest promise is ~600 chars
        }
    }
};


// if you change this, also change promise-status-* classes in App.css
export const statusColors = {
    kept: 'rgb(0, 166, 212)',
    'partially-kept': '#fadd00',
    broken: 'rgb(43, 43, 43)',
    uncheckable: '#b8bfcc'
}

export const statusTitles = {
    kept: 'Holdt',
    'partially-kept': 'Delvis holdt',
    broken: 'Brutt',
    uncheckable: 'Kan ikke etterprøves'
};