import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import laptopAsset from '../../../../media/files/laptop.glb';

class Laptop {
	isReady = false;
	scene;
	keyboard;
	display;
	displayMesh;


	constructor(camera, scene) {
		this.camera = camera;

		const loader = new GLTFLoader();

		loader.load(laptopAsset, (file) => {
			this.isReady = true;
			this.scene = file.scene;

			file.scene.children.forEach((element) => {
				if(element.name === 'keyboard') {
					this.keyboard = element;
				} else {
					this.display = element;
				}
			});

			this.displayMesh = this.display.children.find((child) => child.name === 'display');
			scene.add(file.scene);
			file.scene.position.set(0, -window.innerHeight*0.9, this.camera.zDepth);
			this.keyboard.rotateX((Math.PI / 180) * 40);
			this.display.rotateX(-((Math.PI / 180) * 85));
		});




		// TODO: Load textures

	}

	animate(time, mouse, enableInteraction) {
		// TODO: Create spin and open animation for entrance (triggered by a specific scrollY value)

		// TODO: Create spin and change texture animation for project transition (triggered by a button/key press)

		// TODO: Create spin and close animation for exit (triggered by a specific scrollY value)
	}

	onResize() {
		// reposition letters respective to new zDepth
	}
}

export default Laptop;
