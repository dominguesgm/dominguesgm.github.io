import {
	PointLight,
	AmbientLight,
} from 'three';

class Lighting {
	lights = [];

	constructor() {
		// Setting up rest of the scene
		const light = new PointLight(0xffffff, 1, 100, 0);
		const ambLight = new AmbientLight(0xffffff, 0.2);
		light.position.set(0, 0, 100);

		this.lights.push(light);
		this.lights.push(ambLight);
	}
}

export default Lighting;
