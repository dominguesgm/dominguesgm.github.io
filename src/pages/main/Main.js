import React, { useCallback, useState } from 'react';
import { Canvas, Presentation } from '../../shared/components';

import styles from './Main.css';

const Main = () => {

	const [mouse, setMouse] = useState({ x: 0, y: 0 });

	const handleMouseMove = useCallback((event) => {
		setMouse({
			x: event.clientX,
			y: event.clientY,
		});
	});


	return (
		<div className={ styles.root } onMouseMove={ handleMouseMove }>
			<Canvas mouseX={ mouse.x } mouseY={ mouse.y } />
			<Presentation />
		</div>
	);
};

export default Main;
