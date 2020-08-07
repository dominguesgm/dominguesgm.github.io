import React, { useRef, useEffect } from 'react';

import useWindowDimension from '../../hooks/window-dimension/useWindowDimension';
import { clampValue } from '../../utils';

import styles from './Bio.css';

const Bio = () => {
	const containerRef = useRef();
	const textRef = useRef();
	const windowDimension = useWindowDimension();
	const heightStart = windowDimension.height;
	const heightEnd = windowDimension.height * 2;

	const moveContainer = () => {
		const yDistance = clampValue(window.scrollY, heightStart, heightEnd);
		const percentage = (yDistance - heightStart) / (heightEnd - heightStart);
		console.log('yDistance', yDistance);
		console.log('percentage', percentage);

		textRef.current.style.opacity = percentage;
		textRef.current.style.transform = `scale(${ 0.7 + (percentage * 0.3) })`;
	};


	useEffect(() => {
		typeof(window) !== undefined && window.addEventListener('scroll', moveContainer, { passive: true });
		return () => typeof(window) !== undefined && window.removeEventListener('scroll', moveContainer, { passive: true });
	});

	return (
		<div className={styles.wrapper} ref={containerRef}>
			<div className={styles.textContainer} ref={textRef}>
				<div className={styles.bio}>
					<div className={styles.miniBio}>
						I'm a Software Engineer currently based in <strong>Porto</strong>, working on frontend but with a strong interest in all aspects of the software world.
					</div>
					<div className={styles.reading}>

					</div>
				</div>
			</div>
		</div>
	);
};

export default Bio;
