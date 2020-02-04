import React, { Component } from "react";
import "./App.css";

import Header from "./Header";
import Main from "./Main";
import RelatedServices from "./RelatedServices";
import FacebookComments from "./FacebookComments";
import Footer from "./Footer";
import qs from "query-string";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />

        <div className="m-t-1">
          <div className="alert alert-info">
            <strong>Holder de ord</strong> legges ned i løpet av 2020.
          </div>
        </div>

        <Main query={qs.parse(window.location.search.slice(1))} />
        <RelatedServices />
        <FacebookComments />
        <Footer />
      </div>
    );
  }
}

export default App;
