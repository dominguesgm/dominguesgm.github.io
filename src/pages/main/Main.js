import React from 'react';
import { Canvas, Presentation } from '../../shared/components';

import styles from './Main.css';

const Main = () => {

	return (
		<div className={ styles.root }>
			<Canvas />
			<Presentation />
		</div>
	);
};

export default Main;
