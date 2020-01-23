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

const gaussianPeak = 50;

const Canvas = ({ mouseX, mouseY }) => {
	const canvas = useRef(null);
	const requestRef = useRef();
	const renderer = useRef();
	const scene = useRef();
	const camera = useRef();
	const text = useRef();
	const vectors = useRef();
	const x = useRef();
	const y = useRef();

	x.current = mouseX;
	y.current = mouseY;

	const animate = (time) => {
		// interaction stuff
		// TODO: setup better values
		const stdDev = 150;

		// TODO: do gaussian factor on Y axis to affect letter rotation
		text.current.letterMeshes.forEach((letter, index) => {
			const xAlongText = x.current - (canvas.current.clientWidth/2) + (text.current.width/2);
			const gaussianFactor = gaussianFunction(
				letter.transX,
				gaussianPeak,
				xAlongText,
				stdDev
			);

			letter.mesh.position.x = letter.posX + vectors.current[index].x * gaussianFactor;
			letter.mesh.position.y = letter.posY + vectors.current[index].y * gaussianFactor;
			letter.mesh.position.z = letter.posZ + vectors.current[index].z * gaussianFactor;
		});

		renderer.current.render( scene.current, camera.current );
		requestRef.current = requestAnimationFrame(animate);
	};

	// Scene, camera and renderer setup
	useEffect(() => {
		const fontLoader = new FontLoader();
		scene.current = new Scene();
		const fov = 45;

		const font = fontLoader.parse(fontAsset);
		const fontSize = 65;
		const fontExtrusion = 10;

		camera.current = new PerspectiveCamera(fov, canvas.current.clientWidth / canvas.current.clientHeight, 0.1, 10000);

		renderer.current = new WebGLRenderer({ canvas: canvas.current, antialias: true });
		renderer.current.setSize(canvas.current.clientWidth, canvas.current.clientHeight);
		renderer.current.setClearColor('#08090A');

		const options = {
			font: font,
			fontSize: fontSize,
			fontExtrusion: 10,
			titleLeftMargin: 100,
		};

		const zDepth = zDepthFinder(canvas.current.clientHeight, fov)-fontExtrusion;

		// Creating text mesh and adding to scene
		text.current = new Text('Gil Domingues', null, options);
		text.current.addToScene(scene.current);
		text.current.setPosition(
			- text.current.width / 2,
			- fontSize / 2,
			zDepth
		);
		vectors.current = generateVectors(13, zDepth, gaussianPeak);

		// Setting up rest of the scene
		const light = new PointLight(0xffffff, 1, 100, 0);
		const ambLight = new AmbientLight(0xffffff, 0.2);
		light.position.set(0, 0, 100);

		// scene.add(mesh);
		scene.current.add(light);
		scene.current.add(ambLight);

		renderer.current.render( scene.current, camera.current );
		requestRef.current = requestAnimationFrame( animate );
	}, []);

	return (
		<canvas className={ styles.canvas } ref={ canvas } />
	);
};

export default Canvas;
