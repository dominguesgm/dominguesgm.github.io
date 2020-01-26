import React, { Component, useRef, useEffect, useCallback } from 'react';
import { Scene,
	PerspectiveCamera,
	WebGLRenderer,
	FontLoader,
	PointLight,
	AmbientLight,
} from 'three';
import Text from './helpers/Text';
import {
	zDepthFinder,
	generateVectors,
	gaussianFunction,
} from '../../utils';
import fontAsset from '../../media/fonts/League Spartan_Regular.json';

import styles from './Canvas.css';

const GAUSSIAN_PEAK = 50;

class Canvas extends Component {
	requestAnimationFrameID = null;
	canvas = React.createRef();
	renderer = null;
	scene = null;
	camera = null;
	text = null;
	vectors = null;
	mouse = {
		x: null,
		y: null,
	};

	// Font stuff
	fontSize = 65;
	fontExtrusion = 10;
	zDepth = 0;

	componentDidMount() {
		window.addEventListener('mousemove', this.handleMouseMove);

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
		this.requestAnimationFrameID = requestAnimationFrame( this.animate );
	}

	componentWillUnmount() {
		// remove event listener
		window.removeEventListener('mousemove', this.handleMouseMove);
		cancelAnimationFrame(this.requestAnimationFrameID);
	}

	render () {
		return (
			<canvas className={ styles.canvas } ref={ this.canvas } />
		);
	}

	handleMouseMove = (event) => {
		this.mouse.x = event.clientX;
		this.mouse.y = event.clientY;
	}

	animate = (time) => {
		// interaction stuff
		// TODO: setup better values
		const stdDevX = 150;
		const stdDevY = 150;

		this.camera.rotation.x = this.animateCamera(time);

		this.text.setPosition(
			- this.text.width / 2,
			- this.fontSize / 2,
			this.zDepth
		);

		this.text.letterMeshes.forEach((letter) => {
			letter.mesh.position.x += letter.transX;
		});

		if(this.mouse.x !== null && this.mouse.y !== null) {
		// TODO: do gaussian factor on Y axis to affect letter rotation
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
		this.requestAnimationFrameID = requestAnimationFrame( this.animate );
	}

	animateCamera(time) {
		const finalTime = 2000;

		if(time >= finalTime) {
			return 0;
		}
		const progress = (time / finalTime);

		// Rotate along x axis
		const initialRotation = Math.PI/2;

		// Ease out quad formula
		const easingProgress =  progress * (2 - progress);

		const rotation = initialRotation - easingProgress * initialRotation;

		return rotation;
	}

}

export default Canvas;
