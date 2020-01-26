import React from 'react';
import { NameCanvas, Presentation } from '../../shared/components';

import styles from './Main.css';

const Main = () => {

	return (
		<div className={ styles.root }>
			<NameCanvas />
			<Presentation />
		</div>
	);
};

export default Main;
