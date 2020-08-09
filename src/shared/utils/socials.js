import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

import cv from '../media/files/CV.pdf';

export const socialOnly = [
	{
		name: 'Twitter',
		url: 'https://twitter.com/dominguesgm',
	},
	{
		name: 'LinkedIn',
		url: 'https://www.linkedin.com/in/gildomingues',
		icon: faLinkedin,
	},
];

export const otherExternals = [
	{
		name: 'Github',
		url: 'https://github.com/dominguesgm',
		icon: faGithub,
	},
	{
		name: 'CV',
		url: cv,
		icon: faFileAlt,
	},
];

export const socialData = [
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
