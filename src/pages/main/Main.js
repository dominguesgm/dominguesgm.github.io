import React from 'react';
import { Header, NameCanvas, Presentation } from '../../shared/components';

import styles from './Main.css';

const Main = () => {

	return (
		<div className={ styles.root }>
			<Header />
			<NameCanvas />
			<Presentation />
		</div>
	);
};

export default Main;
