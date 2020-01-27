import React, { useEffect, useState, useMemo } from 'react';
import classNames from 'class-names';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

import styles from './Header.css';

import cv from '../../media/files/CV.pdf';

console.log('cv', cv);

const socialData = [
	{
		url: 'https://github.com/dominguesgm',
		icon: faGithub,
	},
	{
		url: 'https://www.linkedin.com/in/gildomingues',
		icon: faLinkedin,
	},
	{
		url: cv,
		icon: faFileAlt,
	},
];

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
