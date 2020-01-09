import React, { useRef, useEffect, useState } from 'react';
import { Scene,
	PerspectiveCamera,
	WebGLRenderer,
	TextGeometry,
	FontLoader,
	MeshLambertMaterial,
	PointLight,
	Mesh,
	Box3,
	AmbientLight,
	GridHelper,
	BoxGeometry,
	MeshBasicMaterial,
} from 'three';
import Text from './helpers/Text';
import {
	zDepthFinder,
} from '../../utils';
import fontAsset from '../../media/fonts/League Spartan_Regular.json';

import styles from './Canvas.css';

const Canvas = () => {
	const canvas = useRef(null);

	useEffect(() => {
		const fontLoader = new FontLoader();
		const scene = new Scene();
		const fov = 45;

		const font = fontLoader.parse(fontAsset);
		const fontSize = 65;
		const fontExtrusion = 10;
		const titleLeftMargin = 100;

		const camera = new PerspectiveCamera(fov, canvas.current.clientWidth / canvas.current.clientHeight, 0.1, 10000);

		const renderer = new WebGLRenderer({ canvas: canvas.current, antialias: true });
		renderer.setSize(canvas.current.clientWidth, canvas.current.clientHeight);
		renderer.setClearColor('#08090A');

		const options = {
			font: font,
			fontSize: fontSize,
			fontExtrusion: 10,
			titleLeftMargin: 100,
		};

		// Creating text mesh and adding to scene
		const text = new Text('Gil Domingues', null, options);
		text.addToScene(scene);
		text.setPosition(
			- text.width / 2, // titleLeftMargin - canvas.current.clientWidth / 2,
			- fontSize / 2,
			zDepthFinder(canvas.current.clientHeight, fov)-fontExtrusion
		);

		// Setting up rest of the scene
		const light = new PointLight(0xffffff, 1, 100, 0);
		const ambLight = new AmbientLight(0xffffff, 0.2);
		light.position.set(0, 0, 100);

		// scene.add(mesh);
		scene.add(light);
		scene.add(ambLight);

		renderer.render( scene, camera );
		function animate() {
			requestAnimationFrame( animate );
			renderer.render( scene, camera );
		}
		animate();
	});

	return (
		<canvas className={ styles.canvas } ref={ canvas } />
	);
};

export default Canvas;
