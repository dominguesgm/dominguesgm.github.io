import React, { useState, useEffect, useRef } from 'react';
import classNames from 'class-names';
import useWindowDimension from '../../hooks/window-dimension/useWindowDimension';
import { clampValue } from '../../utils';
import styles from './Presentation.css';

const Presentation = () => {
	const containerRef = useRef();
	const greetingRef = useRef();
	const jobRef = useRef();
	const [entered, setEntered] = useState(false);
	const windowDimension = useWindowDimension();
	const heightThreshold = windowDimension.height;

	const moveContainer = () => {
		const yDistance = clampValue(window.scrollY, 0, heightThreshold);
		const percentage = yDistance / heightThreshold;

		if(!containerRef.current.style.position ||
			(containerRef.current.style.position === 'relative' && yDistance < heightThreshold)) {
			containerRef.current.style.position = 'sticky';
		} else if(containerRef.current.style.position === 'sticky' && yDistance >= heightThreshold) {
			containerRef.current.style.position = 'relative';
		}

		greetingRef.current.style.opacity = 1 - percentage;
		greetingRef.current.style.transform = `scale(${(percentage * 1) + 1}) translateY(${-percentage*10}rem)`;
		jobRef.current.style.opacity = 1 - percentage;
		jobRef.current.style.transform = `scale(${(percentage * 1) + 1})  translateY(${percentage*10}rem)`;
	};


	useEffect(() => {
		setEntered(true);

		typeof(window) !== undefined && window.addEventListener('scroll', moveContainer, { passive: true });
		return () => typeof(window) !== undefined && window.removeEventListener('scroll', moveContainer, { passive: true });
	});

	return (
		<div className={styles.wrapper} ref={containerRef}>
			<h2 className={styles.title}>
				<div className={classNames(styles.greetingWrapper, entered && styles.entered)}>
					<div className={styles.greeting} ref={greetingRef}>Hello, I'm</div>
				</div>
				<div className={styles.name}>Gil Domingues</div>
				<div className={classNames(styles.jobWrapper, entered && styles.entered)}>
					<div className={styles.job} ref={jobRef}>Software Engineer</div>
				</div>
			</h2>
		</div>
	);
};

export default Presentation;
