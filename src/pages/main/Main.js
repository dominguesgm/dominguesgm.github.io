import React from 'react';
import { Canvas, Hero, Bio } from '../../shared/components';
import ScrollHint from '../../shared/components/scroll-hint';
import Cursor from '../../shared/components/cursor';

import styles from './Main.css';

const Main = () => (
	<div className={ styles.root }>
		<Cursor />
		<Canvas isTouchable={ false } />
		<Hero />
		<ScrollHint />
		<Bio />
	</div>
);

export default Main;
