import React, { Component } from 'react';
import './App.css';

import Header from './Header';
import Main from './Main';
import RelatedServices from './RelatedServices';
import Footer from './Footer';
import qs from 'query-string'

class App extends Component {
    render() {
        return (
            <div className="container">
                <Header />
                <Main query={qs.parse(window.location.search.slice(1))}/>
                <RelatedServices />
                <Footer />
            </div>
        );
    }
}

export default App;
