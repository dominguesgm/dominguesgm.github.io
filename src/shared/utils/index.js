const zDepthFinder = (canvasHeight, fov ) => {
	const splitAngle = fov/2;

	// Use tangent formula to find adjacent side
	const result = -(canvasHeight) / (Math.abs(Math.tan(splitAngle*Math.PI/180)) * 2);

	return result;
};

const generateVectors = (number) => {
	let vectors = [];

	for(let i = 0; i < number; i++) {
		const tempX = Math.random();
		const tempY = Math.random();
		const tempZ = Math.abs(Math.random());
		const magnitude = Math.sqrt(tempX*tempX + tempY*tempY + tempZ*tempZ);

		const vector = {
			x: tempX / magnitude,
			y: tempY / magnitude,
			z: tempZ / magnitude,
		};

		vectors.push(vector);
	}

	return vectors;
};

const gaussianFunction = (x, peakHeight, peakBase, stdDev) => {
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
