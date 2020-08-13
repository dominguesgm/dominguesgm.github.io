import React, { useRef, useEffect, useState } from 'react';
import classNames from 'class-names';

import styles from './Cursor.css';

const Cursor = () => {
	const cursorRef = useRef();
	const [visible, setVisible] = useState(false);

	const handleMouseMove = (e) => {
		if(typeof(window) !== 'undefined') {
			cursorRef.current.style.transform =
				`translate(${e.clientX - window.innerWidth/2}px, ${e.clientY - window.innerHeight/2}px)`;
		}

		if(!visible) {
			setVisible(true);
		}
	};

	useEffect(() => {
		window.addEventListener('mousemove', handleMouseMove, { passive: true });

		return () => {
			window.window.removeEventListener('mousemove', handleMouseMove, { passive: true });
		};
	}, [visible]);

	return (
		<div className={classNames(styles.cursor, {
			[styles.visible]: visible }) }
		ref={cursorRef} />
	);
};

export default Cursor;
