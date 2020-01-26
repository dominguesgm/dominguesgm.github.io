import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

import styles from './Header.css';

const Header = () => (
	<div className={ styles.header }>
		<a href="https://www.linkedin.com/in/gildomingues" className={ styles.anchorIcon }>
			<FontAwesomeIcon icon={ faLinkedin } size="2x" className={ styles.icon }/>
		</a>
		<a href="https://github.com/dominguesgm" className={ styles.anchorIcon }>
			<FontAwesomeIcon icon={ faGithub } size="2x" className={ styles.icon }/>
		</a>
	</div>
);

export default Header;
