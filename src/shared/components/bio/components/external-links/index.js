import React from 'react';
import classNames from 'class-names';

import { socialOnly, otherExternals } from '../../../../utils/socials';

import styles from './ExternalLinks.css';

const ExternalLinks = ({ visible }) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.others}>
				{
					otherExternals.map(({ name, url }, index) => {
						const delay = index * 0.3 + 0.8;
						return (
							<a
								key={name}
								className={classNames(styles.link, visible && styles.visible)}
								target="_blank"
								href={url}
								style={{ transitionDelay: `${delay}s, ${delay}s, 0s` }}>
								<span className={styles.innerOtherLink}>{name}</span>
							</a>
						);})
				}
			</div>

			<h5 className={classNames(styles.titles, visible && styles.visible)}>
				<span className={classNames(styles.reach, visible && styles.visible)}>
							Reach Me
				</span> / <span className={classNames(styles.more, visible && styles.visible)}>
							More Stuff
				</span></h5>
			<div className={styles.socials}>
				{
					socialOnly.map(({ name, url }, index) => {
						const delay = index * 0.3 + 0.8 + (otherExternals.length * 0.3);
						return (
							<a
								key={name}
								className={classNames(styles.link, visible && styles.visible)}
								target="_blank"
								href={url}
								style={{ transitionDelay: `${delay}s, ${delay}s, 0s` }}>
								<span className={styles.innerSocialLink}>{name}</span>
							</a>
						);})
				}
			</div>
		</div>
	);
};

export default ExternalLinks;
