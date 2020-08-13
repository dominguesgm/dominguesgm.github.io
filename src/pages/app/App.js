import React from 'react';
import BaseApp from 'next/app';
import Head from 'next/head';
import '../../shared/styles/index.css';

// Dirty hack to be absolutely certain that this callback is called.
// It's needed because very rarely, the event listener was being added after
// the page had loaded, so it wouldn't be called.
// We use this global variable in canvas to sync webgl and css transitions
if(typeof(window) !== 'undefined') {
	window.GLOBAL_PAGE_HAS_LOADED = false;

	window.addEventListener('load', () => {
		window.GLOBAL_PAGE_HAS_LOADED = true;
	});
}

class App extends BaseApp {

	constructor() {
		super();

		// Prevent scroll restoration
		if(typeof(history) !== 'undefined') {
			history.scrollRestoration = 'manual';
		}
	}

	render() {
		const { Component, pageProps } = this.props;

		return (
			<>
				<Head>
					<title>
                        Gil Domingues
					</title>
				</Head>
				<Component { ...pageProps } />
			</>
		);
	}
}

export default App;
