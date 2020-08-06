import { useState, useEffect } from 'react';

const useWindowDimension = () => {
	const isSSR = window === undefined;

	const [windowSize, setWindowSize] = useState({
		width: isSSR ? 1440 : undefined,
		height: isSSR ? 800 : undefined,
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
