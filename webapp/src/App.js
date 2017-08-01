import React, { Component } from 'react';
import './App.css';

import Header from './Header';
import Main from './Main';
import RelatedServices from './RelatedServices';
import Footer from './Footer';

class App extends Component {
    render() {
        return (
            <div className="container">
                <Header />
                <Main />
                <RelatedServices />
                <Footer />
            </div>
        );
    }
}

export default App;
