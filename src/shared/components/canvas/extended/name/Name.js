import { Scene,
	PerspectiveCamera,
	WebGLRenderer,
	FontLoader,
	PointLight,
	AmbientLight,
} from 'three';
import Canvas from '../../';
import Text from '../../helpers/Text';
import {
	zDepthFinder,
	generateVectors,
	gaussianFunction,
} from '../../../../utils';

import fontAsset from '../../../../media/fonts/League Spartan_Regular.json';

const GAUSSIAN_PEAK = 50;

class NameCanvas extends Canvas {
	text = null;
	vectors = null;

	// Font stuff
	fontSize = 65;
	fontExtrusion = 10;
	zDepth = 0;

	setupScene() {
		const fontLoader = new FontLoader();
		this.scene = new Scene();
		const fov = 45;

		const font = fontLoader.parse(fontAsset);

		this.camera = new PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 10000);

		this.renderer = new WebGLRenderer({ canvas: this.canvas.current, antialias: true });
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.setClearColor('#08090A');

		const options = {
			font: font,
			fontSize: this.fontSize,
			fontExtrusion: 10,
			titleLeftMargin: 100,
		};

		this.zDepth = zDepthFinder(window.innerHeight, fov) - this.fontExtrusion;

		// Creating text mesh and adding to scene
		this.text = new Text('Gil Domingues', null, options);
		this.text.addToScene(this.scene);
		this.vectors = generateVectors(13, this.zDepth, GAUSSIAN_PEAK);

		// Setting up rest of the scene
		const light = new PointLight(0xffffff, 1, 100, 0);
		const ambLight = new AmbientLight(0xffffff, 0.2);
		light.position.set(0, 0, 100);

		// scene.add(mesh);
		this.scene.add(light);
		this.scene.add(ambLight);

		this.renderer.render( this.scene, this.camera );
	}

	animateScene(time) {
		// interaction stuff
		// TODO: setup better values
		const stdDevX = 150;
		const stdDevY = 100;

		const cameraAnimation = this.animateCamera(time);

		this.camera.rotation.x = cameraAnimation.value;

		this.text.setPosition(
			- this.text.width / 2,
			- this.fontSize / 2,
			this.zDepth
		);

		this.text.letterMeshes.forEach((letter) => {
			letter.mesh.position.x += letter.transX;
		});

		const shouldAnimateText = cameraAnimation.isDone &&
			((this.mouse.x !== this.mouse.oldX &&
			this.mouse.y !== this.mouse.oldY) ||
			this.mouse.x !== null);

		if(shouldAnimateText) {
			this.text.letterMeshes.forEach((letter, index) => {
				const xAlongText = this.mouse.x - (window.innerWidth/2) + (this.text.width/2);
				const yAlongText = this.mouse.y - (window.innerHeight/2) + (this.text.height/2);

				const gaussianFactorX = gaussianFunction(
					letter.transX,
					xAlongText,
					stdDevX
				);
				const gaussianFactorY = gaussianFunction(
					yAlongText,
					0,
					stdDevY
				);

				const gaussianFactor = GAUSSIAN_PEAK * gaussianFactorX * gaussianFactorY;

				letter.mesh.position.x = letter.transX + letter.posX + this.vectors[index].x * gaussianFactor;
				letter.mesh.position.y = letter.transY + letter.posY + this.vectors[index].y * gaussianFactor;
				letter.mesh.position.z = letter.transY + letter.posZ + this.vectors[index].z * gaussianFactor;

				// Rotation
				// letter.mesh.rotation.y = this.vectors[index].rotY * gaussianFactor;
				// letter.mesh.rotation.z = this.vectors[index].rotZ * gaussianFactor;
			});
		}

		this.renderer.render( this.scene, this.camera );
	}

	animateCamera(time) {
		const startTime = 0;
		const duration = 2000;
		const finalTime = startTime + duration;

		if(time >= finalTime) {
			return {
				isDone: true,
				value: 0,
			};
		}
		const progress = Math.max(((time - startTime) / duration), 0);

		// Rotate along x axis
		const initialRotation = -Math.PI/2;

		// Ease out quad formula
		// const easingProgress =  progress * (2 - progress);
		// Ease in out quad formula
		const easingProgress = progress < .5 ?
			2 * progress * progress :
			-1 + (4 - 2 * progress) * progress;

		const rotation = initialRotation - easingProgress * initialRotation;

		return {
			isDone: false,
			value: rotation,
		};
	}
}

export default NameCanvas;
