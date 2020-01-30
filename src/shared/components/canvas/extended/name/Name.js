import { Scene,
	PerspectiveCamera,
	WebGLRenderer,
	FontLoader,
	PointLight,
	AmbientLight,
} from 'three';
import Canvas from '../../';
import Text from './helpers/Text';
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
	cameraOptions = {
		fov: 45,
		near: 0.1,
		far: 10000,
	};

	// Font stuff
	fontSize = 65;
	fontExtrusion = 10;
	zDepth = 0;

	setupTHREE() {
		this.scene = new Scene();

		this.zDepth = zDepthFinder(window.innerHeight, this.cameraOptions.fov) - this.fontExtrusion;

		this.setupRenderer();

		this.setupCamera();

		this.setupLights();

		this.setupObjects();

	}

	setupRenderer() {
		this.renderer = new WebGLRenderer({ canvas: this.canvas.current, antialias: true, alpha: true });
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.setClearColor('#08090A', 0);
	}

	setupCamera() {
		this.camera = new PerspectiveCamera(
			this.cameraOptions.fov,
			window.innerWidth / window.innerHeight,
			this.cameraOptions.near,
			this.cameraOptions.far
		);
	}

	setupLights() {
		// Setting up rest of the scene
		const light = new PointLight(0xffffff, 1, 100, 0);
		const ambLight = new AmbientLight(0xffffff, 0.2);
		light.position.set(0, 0, 100);

		// scene.add(mesh);
		this.scene.add(light);
		this.scene.add(ambLight);
	}

	setupObjects() {
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
		this.text.addToScene(this.scene);
		this.vectors = generateVectors(13, this.zDepth, GAUSSIAN_PEAK);

		this.text.letterMeshes.forEach((letter) => {
			letter.posX = letter.transX - this.text.width / 2;
			letter.posZ = this.zDepth;

			letter.mesh.position.x = letter.posX;
			letter.mesh.position.z = letter.posZ;
		});
	}

	animateScene(time) {
		const cameraAnimation = this.updateCameraPosition(time);

		this.updateTextPosition(time, cameraAnimation.isDone);

		this.renderer.render( this.scene, this.camera );
	}

	updateCameraPosition(time) {
		const startTime = 0;
		const duration = 2000;
		const finalTime = startTime + duration;
		const finalPosition = 0;


		if(time >= finalTime) {
			this.camera.rotation.x = finalPosition;
			return {
				isDone: true,
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
		this.camera.rotation.x = rotation;

		return {
			isDone: false,
		};
	}

	updateTextPosition(time, enableInteraction) {
		// interaction stuff
		// TODO: setup better values
		const stdDevX = 150;
		const stdDevY = 150;

		const shouldAnimateText = enableInteraction &&
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

	onResize() {
		this.zDepth = zDepthFinder(window.innerHeight, this.cameraOptions.fov) - this.fontExtrusion;
	}
}

export default NameCanvas;
