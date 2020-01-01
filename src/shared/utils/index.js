const zDepthFinder = (canvasHeight, fov ) => {
	const splitAngle = fov/2;

	// Use tangent formula to find adjacent side
	console.log('split angle', splitAngle);
	console.log(2*Math.tan(splitAngle*Math.PI/180));
	const result = -(canvasHeight) / (Math.abs(Math.tan(splitAngle*Math.PI/180)) * 2);
	console.log('Result', result);

	return result;
};

export {
	zDepthFinder,
};
