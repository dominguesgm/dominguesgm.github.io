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
			<div className={styles.text} ref={textRef}>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc fermentum magna in mattis vehicula. Sed ornare consequat erat, quis semper turpis maximus et. Donec eleifend convallis dolor vel eleifend. In consequat ornare nulla, quis ultricies libero pharetra et. Aliquam nulla neque, lobortis non nisi ac, egestas sodales velit. Cras tristique interdum elit, sit amet imperdiet velit maximus ut. Proin volutpat ligula ac commodo luctus. Vestibulum bibendum scelerisque venenatis. Vestibulum bibendum lorem neque, ut luctus risus fringilla vel. Nunc in risus eleifend, ornare nisi eu, aliquet est. Quisque nibh orci, bibendum gravida rhoncus a, gravida et metus.
			</div>
		</div>
	);
};

export default Bio;
