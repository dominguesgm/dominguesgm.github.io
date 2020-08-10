import React from 'react';
import { Canvas, Hero, Bio } from '../../shared/components';
import ScrollHint from '../../shared/components/scroll-hint';

import styles from './Main.css';

const Main = () => (
	<div className={ styles.root }>
		<Canvas isTouchable={ false } />
		<Hero />
		<ScrollHint />
		<Bio />
	</div>
);

export default Main;
