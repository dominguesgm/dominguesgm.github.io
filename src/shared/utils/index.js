const zDepthFinder = (canvasHeight, fov ) => {
	const splitAngle = fov/2;

	// Use tangent formula to find adjacent side
	const result = -(canvasHeight) / (Math.abs(Math.tan(splitAngle*Math.PI/180)) * 2);

	return result;
};

const generateVectors = (number, zDepth, peak) => {
	const vectors = [];

	for(let i = 0; i < number; i++) {
		const tempX = (Math.random() - 0.5) * 0.1;
		const tempY = Math.random() * (i % 2 === 0 ? 1 : -1);
		const tempZ = -zDepth / (peak * 1.5);
		const magnitude = Math.sqrt(tempX*tempX + tempY*tempY) || 1;

		const vector = {
			x: tempX / magnitude,
			y: tempY / magnitude,
			z: tempZ,
			rotX: (Math.random() * 2 - 1) * Math.PI,
			rotY: (Math.random() * 2 - 1) * Math.PI,
			rotZ: (Math.random() * 2 - 1) * Math.PI,
		};

		vectors.push(vector);
	}

	return vectors;
};

const gaussianFunction = (x, peakBase, stdDev) => {
	const peakHeight = 1; // this is so we can later apply the intensity we want
	const expNumerator = Math.pow(x - peakBase, 2);
	const expDenominator = 2 * stdDev * stdDev;
	const exponent = - expNumerator / expDenominator;
	const result = peakHeight * Math.exp(exponent);

	return result;
};

export {
	zDepthFinder,
	generateVectors,
	gaussianFunction,
};
