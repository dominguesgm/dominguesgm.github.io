import React from 'react';
import styles from './Presentation.css';

//TODO: attempt to use 3d fonts with threejs for the name

const Presentation = () => {
	return (
		<div className={styles.wrapper}>
			<h1 className={styles.title}>
				<span className={styles.greeting}>Hello</span>, I'm<br/>
				<span className={styles.name}>Gil Domingues</span>
				<br/>Software Engineer
			</h1>
		</div>
	);
};

export default Presentation;
