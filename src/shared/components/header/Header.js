import React, { useEffect, useState, useMemo } from 'react';
import classNames from 'class-names';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { socialData } from '../../utils/socials';

import styles from './Header.css';

const Header = () => {
	const [entered, setEntered] = useState(false);

	useEffect(() => {
		setEntered(true);
	}, []);

	const renderedIcons = useMemo(() => (
		socialData.map((element, index) => (
			<a href={ element.url }
				target="_blank"
				key={ index }
				className={ classNames(styles.anchorIcon, entered && styles.entered) }
				style={{ 'transitionDelay': `${index*0.2+2.5}s` }}>
				<FontAwesomeIcon icon={ element.icon } size="2x" className={ styles.icon }/>
			</a>
		))
	), [socialData, entered]);

	return (
		<div className={ styles.header }>
			{
				renderedIcons
			}
		</div>
	);
};

export default Header;
