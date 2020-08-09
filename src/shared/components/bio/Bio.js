import React, { useRef, useEffect, useState } from 'react';

import ExternalLinks from './components/external-links';
import useWindowDimension from '../../hooks/window-dimension/useWindowDimension';
import { clampValue } from '../../utils';

import styles from './Bio.css';

const Bio = () => {
	const containerRef = useRef();
	const textRef = useRef();
	const [visible, setVisible] = useState(false);
	const windowDimension = useWindowDimension();
	const heightStart = windowDimension.height;
	const heightEnd = windowDimension.height * 2;

	const moveContainer = () => {
		const yDistance = clampValue(window.scrollY, heightStart, heightEnd);
		const percentage = (yDistance - heightStart) / (heightEnd - heightStart);

		textRef.current.style.opacity = percentage;
		textRef.current.style.transform = `scale(${ (0.7 + (percentage * 0.3)) })`;

		!visible && percentage >= 0.75 && setVisible(true);
	};


	useEffect(() => {
		typeof(window) !== undefined && window.addEventListener('scroll', moveContainer, { passive: true });
		return () => typeof(window) !== undefined && window.removeEventListener('scroll', moveContainer, { passive: true });
	});

	return (
		<div className={styles.wrapper} ref={containerRef}>
			<div className={styles.container} ref={textRef}>
				<div className={styles.bio}>
					<div className={styles.miniBio}>
						I'm a Software Engineer currently based in <strong>Porto</strong>, with an interest in all aspects of software.
						From frontend to backend, high or low level: if it envolves building software, it's my <i>thing</i>.
					</div>
				</div>
				<ExternalLinks visible={visible} />
			</div>
		</div>
	);
};

export default Bio;
