import {
	FontLoader,
} from 'three';
import Text from './helpers/Text';
import {
	generateVectors,
	gaussianFunction,
} from '../../../../utils';

import fontAsset from '../../../../media/fonts/Montserrat_Medium.json';

const GAUSSIAN_PEAK = 50;

class Name {
	text = null;
	vectors = null;

	// Font stuff
	fontSize = 65;
	fontExtrusion = 10;
	zDepth = 0;

	constructor(camera, scene) {
		this.camera = camera;

		// TODO: Rethink responsivity

		const fontLoader = new FontLoader();
		const font = fontLoader.parse(fontAsset);

		const options = {
			font: font,
			fontSize: this.fontSize,
			fontExtrusion: 10,
			titleLeftMargin: 100,
		};

		// Creating text mesh and adding to scene
		this.text = new Text('Gil Domingues', null, options);
		this.text.addToScene(scene);
		this.vectors = generateVectors(13, this.camera.zDepth, GAUSSIAN_PEAK);

		this.text.letterMeshes.forEach((letter) => {
			letter.posX = letter.transX - this.text.width / 2;
			letter.posZ = this.camera.zDepth;

			letter.mesh.position.x = letter.posX;
			letter.mesh.position.z = letter.posZ;
		});
	}

	handleResize = () => {
		// This resize must come after camera resize

		this.text.letterMeshes.forEach((letter) => {
			letter.posZ = this.camera.zDepth;
		});
	}

	animate(time, mouse, enableInteraction) {
		const stdDevX = 0.3;
		const stdDevY = 2.5;

		const shouldAnimateText = enableInteraction &&
			((mouse.x !== mouse.oldX &&
			mouse.y !== mouse.oldY) ||
			mouse.x !== null);

		if(shouldAnimateText) {
			const xAlongText = (mouse.x - (window.innerWidth/2) + (this.text.width/2)) / this.text.width;
			const yAlongText = (mouse.y - (window.innerHeight/2) + (this.text.height/2)) / this.text.height;

			this.text.letterMeshes.forEach((letter, index) => {
				const gaussianFactorX = gaussianFunction(
					letter.transX / this.text.width,
					xAlongText,
					stdDevX
				);
				const gaussianFactorY = gaussianFunction(
					yAlongText,
					0,
					stdDevY
				);

				const rotationGaussianFactor = gaussianFactorX * gaussianFactorY;
				const translationGaussianFactor = GAUSSIAN_PEAK * rotationGaussianFactor;

				letter.mesh.position.x += (letter.posX + this.vectors[index].x * translationGaussianFactor - letter.mesh.position.x) * 0.1;
				letter.mesh.position.y += (letter.posY + this.vectors[index].y * translationGaussianFactor - letter.mesh.position.y) * 0.1;
				letter.mesh.position.z += (letter.posZ + this.vectors[index].z * translationGaussianFactor - letter.mesh.position.z) * 0.1;

				// Rotation
				letter.mesh.rotation.x += (this.vectors[index].rotX * rotationGaussianFactor - letter.mesh.rotation.x) * 0.1;
				letter.mesh.rotation.y += (this.vectors[index].rotY * rotationGaussianFactor - letter.mesh.rotation.y) * 0.1;
				letter.mesh.rotation.z += (this.vectors[index].rotZ * rotationGaussianFactor - letter.mesh.rotation.z) * 0.1;
			});
		}
	}
}

export default Name;
