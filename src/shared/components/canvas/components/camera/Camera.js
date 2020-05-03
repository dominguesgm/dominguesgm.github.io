import {
	PerspectiveCamera,
} from 'three';

const cameraOptions = {
	fov: 45,
	near: 0.1,
	far: 10000,
};

class Camera {
	instance = null;
	zDepth;

	constructor() {
		this.instance = new PerspectiveCamera(
			cameraOptions.fov,
			window.innerWidth / window.innerHeight,
			cameraOptions.near,
			cameraOptions.far
		);

		this.updateZDepth();
	}

	updateZDepth = () => {
		const splitAngle = cameraOptions.fov/2;

		// Use tangent formula to find adjacent side
		this.zDepth = -(window.innerHeight) / (Math.abs(Math.tan(splitAngle*Math.PI/180)) * 2);
	};

	animate = (time) => {
		const startTime = 0;
		const duration = 2000;
		const finalTime = startTime + duration;
		const finalPosition = 0;


		if(time >= finalTime) {
			this.instance.position.y = finalPosition;
			return {
				isDone: true,
			};
		}
		const progress = Math.max(((time - startTime) / duration), 0);

		// Translate along y axis
		const initialPosition = window.innerHeight;

		// Ease out quad formula
		// const easingProgress =  progress * (2 - progress);
		// Ease in out quad formula
		const easingProgress = progress < .5 ?
			2 * progress * progress :
			-1 + (4 - 2 * progress) * progress;

		const position = initialPosition - easingProgress * initialPosition;
		this.instance.position.y = position;

		return {
			isDone: false,
		};
	}

	handleResize = () => {
		this.instance.aspect = window.innerWidth / window.innerHeight;
		this.instance.updateProjectionMatrix();
	}
}

export default Camera;
