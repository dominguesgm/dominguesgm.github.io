import React from 'react';
import { Header, Canvas, Presentation } from '../../shared/components';

import styles from './Main.css';

const Main = () => (
	<div className={ styles.root }>
		<Header />
		<Canvas isTouchable={ false } />
		<Presentation />
	</div>
);

export default Main;
