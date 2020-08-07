import React from 'react';
import { Header, Canvas, Hero, Bio } from '../../shared/components';

import styles from './Main.css';

const Main = () => (
	<div className={ styles.root }>
		<Header />
		<Canvas isTouchable={ false } />
		<Hero />
		<Bio />
	</div>
);

export default Main;
