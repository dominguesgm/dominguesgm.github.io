import React from 'react';
import BaseApp from 'next/app';
import Head from 'next/head';
import '../../shared/styles/index.css';

class App extends BaseApp {
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
