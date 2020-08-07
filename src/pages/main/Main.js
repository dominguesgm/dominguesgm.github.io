import React from 'react';
import { Header, Canvas, Presentation, Bio } from '../../shared/components';

import styles from './Main.css';

const Main = () => (
	<div className={ styles.root }>
		<Header />
		<Canvas isTouchable={ false } />
		<Presentation />
		<Bio />
	</div>
);

export default Main;
