import React, { useState, useEffect } from 'react';
import classNames from 'class-names';
import styles from './Presentation.css';

//TODO: attempt to use 3d fonts with threejs for the name

const Presentation = () => {

	const [entered, setEntered] = useState(false);


	useEffect(() => {
		setEntered(true);
	});

	return (
		<div className={styles.wrapper}>
			<h1 className={styles.title}>
				<div className={classNames(styles.greeting, entered && styles.entered)}>Hello, I'm</div>
				<div className={styles.name}>Gil Domingues</div>
				<div className={classNames(styles.job, entered && styles.entered)}>Software Engineer</div>
			</h1>
		</div>
	);
};

export default Presentation;
