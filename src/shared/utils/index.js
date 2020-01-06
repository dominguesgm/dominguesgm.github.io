const zDepthFinder = (canvasHeight, fov ) => {
	const splitAngle = fov/2;

	// Use tangent formula to find adjacent side
	const result = -(canvasHeight) / (Math.abs(Math.tan(splitAngle*Math.PI/180)) * 2);

	return result;
};

export {
	zDepthFinder,
};
