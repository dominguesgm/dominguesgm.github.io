import React from 'react';
import BaseApp from 'next/app';
import '../../shared/styles/index.css';

class App extends BaseApp {
    render() {
        const { Component, pageProps } = this.props;

        return (
            <Component { ...pageProps } />
        );
    }
}

export default App;
