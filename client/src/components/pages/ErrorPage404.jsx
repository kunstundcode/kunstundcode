import React, { Component } from 'react';

export default class ErrorPage404 extends Component {

    render() {
        return (
          <div id="notfound">
            <div class="notfound">
              <div class="notfound-404">
                <h3>Oops! Page not found</h3>
                <h1><span>4</span><span>0</span><span>4</span></h1>
              </div>
              <h2>It looks like nothing was found at this location.</h2>
              <h3>Maybe try one of the links in the menu or press back to go to the previous page.</h3>
            </div>
          </div>
        );
    }
}