import React, { useState, useEffect, useRef } from 'react';
import classNames from 'class-names';
import useWindowDimension from '../../hooks/window-dimension/useWindowDimension';
import { clampValue } from '../../utils';
import styles from './Hero.css';

const Hero = () => {
	const containerRef = useRef();
	const titleRef = useRef();
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

		titleRef.current.style.opacity = 1 - percentage;
		titleRef.current.style.transform = `scale(${(percentage * 2) + 1})`;
	};


	useEffect(() => {
		setEntered(true);

		typeof(window) !== undefined && window.addEventListener('scroll', moveContainer, { passive: true });
		return () => typeof(window) !== undefined && window.removeEventListener('scroll', moveContainer, { passive: true });
	});

	return (
		<div className={styles.wrapper} ref={containerRef}>
			<h2 className={styles.title} ref={titleRef}>
				<div className={classNames(styles.greetingWrapper, entered && styles.entered)}>
					Hello, I'm
				</div>
				<div className={styles.name}>Gil Domingues</div>
				<div className={classNames(styles.jobWrapper, entered && styles.entered)}>
					Software Engineer
				</div>
			</h2>
		</div>
	);
};

export default Hero;
