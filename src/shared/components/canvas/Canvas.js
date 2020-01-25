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

	componentDidMount() {
		window.addEventListener('mousemove', this.handleMouseMove);

		const fontLoader = new FontLoader();
		this.scene = new Scene();
		const fov = 45;

		const font = fontLoader.parse(fontAsset);
		const fontSize = 65;
		const fontExtrusion = 10;

		this.camera = new PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 10000);

		this.renderer = new WebGLRenderer({ canvas: this.canvas.current, antialias: true });
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.setClearColor('#08090A');

		const options = {
			font: font,
			fontSize: fontSize,
			fontExtrusion: 10,
			titleLeftMargin: 100,
		};

		const zDepth = zDepthFinder(window.innerHeight, fov)-fontExtrusion;

		// Creating text mesh and adding to scene
		this.text = new Text('Gil Domingues', null, options);
		this.text.addToScene(this.scene);
		this.text.setPosition(
			- this.text.width / 2,
			- fontSize / 2,
			zDepth
		);
		this.vectors = generateVectors(13, zDepth, GAUSSIAN_PEAK);

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

		if(this.mouse.x !== null && this.mouse.y !== null) {
		// TODO: do gaussian factor on Y axis to affect letter rotation
			this.text.letterMeshes.forEach((letter, index) => {
				const xAlongText = this.mouse.x - (window.innerWidth/2) + (this.text.width/2);
				const yAlongText = this.mouse.y - (window.innerHeight/2) + (this.text.height/2);

				console.log('yAlongText', yAlongText);

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

				letter.mesh.position.x = letter.posX + this.vectors[index].x * gaussianFactor;
				letter.mesh.position.y = letter.posY + this.vectors[index].y * gaussianFactor;
				letter.mesh.position.z = letter.posZ + this.vectors[index].z * gaussianFactor;
			});
		}

		this.renderer.render( this.scene, this.camera );
		this.requestAnimationFrameID = requestAnimationFrame( this.animate );
	}

}

export default Canvas;
