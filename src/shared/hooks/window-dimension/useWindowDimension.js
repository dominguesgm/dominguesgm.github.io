import { useState, useEffect } from 'react';

const useWindowDimension = () => {
	const isSSR = typeof(window) === 'undefined';

	const [windowSize, setWindowSize] = useState({
		width: isSSR ? 1440 : window.innerWidth,
		height: isSSR ? 800 : window.innerHeight,
	});

	const resizeWindow = () => {
		setWindowSize({ width: window.innerWidth, height: window.innerHeight });
	};

	useEffect(() => {
		window.addEventListener('resize', resizeWindow);

		return () => window.removeEventListener('resize', resizeWindow);
	}, []);

	return windowSize;
};

export default useWindowDimension;
