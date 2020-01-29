import React from 'react';
import { Header, NameCanvas, Presentation } from '../../shared/components';

import styles from './Main.css';

const Main = () => {

	return (
		<div className={ styles.root }>
			<Header />
			<NameCanvas isTouchable={ false } />
			<Presentation />
		</div>
	);
};

export default Main;
