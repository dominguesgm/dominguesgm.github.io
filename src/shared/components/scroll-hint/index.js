import React, { useEffect, useState, useRef, useCallback } from 'react';
import classNames from 'class-names';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import useWindowDimension from '../../hooks/window-dimension/useWindowDimension';

import styles from './ScrollHint.css';

const ScrollHint = () => {
	const [visible, setVisible] = useState(false);
	const hideAfterScroll = useRef(false);
	const windowDimensions = useWindowDimension();

	const handleClick = useCallback(() => {
		window.scrollTo({ top:windowDimensions.height*2, behavior: 'smooth' });
	}, [windowDimensions]);

	const handleKeyPress = useCallback((event) => {
		if(event.key === 'Enter') handleClick();
	}, [windowDimensions]);

	const handleScroll = () => {
		if(!hideAfterScroll.current && window.scrollY > 100) {
			hideAfterScroll.current = true;
			setVisible(false);
		}
	};

	useEffect(() => {
		setVisible(true);
		if(typeof(window) !== 'undefined') {
			window.addEventListener('scroll', handleScroll, { passive: true });
		}

		() => {
			window.removeEventListener('scroll', handleScroll, { passive: true });
		};
	}, []);

	return (
		<div className={classNames(styles.hint, visible && styles.visible)}
			onClick={handleClick}
			onKeyPress={handleKeyPress}
			tabIndex="0"
			role="button">
			<div className={classNames(styles.text, visible && styles.visible)}>
				About me
			</div>
			<div className={classNames(styles.arrow, visible && styles.visible)}>
				<FontAwesomeIcon icon={ faArrowDown }/>
			</div>
		</div>
	);
};

export default ScrollHint;
