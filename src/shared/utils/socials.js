import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

import cv from '../media/files/CV.pdf';

export const socialOnly = [
	{
		name: 'LinkedIn',
		url: 'https://www.linkedin.com/in/gildomingues',
		icon: faLinkedin,
	},
	{
		name: 'Twitter',
		url: 'https://twitter.com/dominguesgm',
	},
];

export const otherExternals = [
	{
		name: 'CV',
		url: cv,
		icon: faFileAlt,
	},
	{
		name: 'Github',
		url: 'https://github.com/dominguesgm',
		icon: faGithub,
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
