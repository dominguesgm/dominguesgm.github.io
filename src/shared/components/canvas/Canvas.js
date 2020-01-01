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
} from 'three';
import fontAsset from '../../media/fonts/League Spartan_Regular.json';

import styles from './Canvas.css';

const Canvas = () => {
	const canvas = useRef(null);

	useEffect(() => {
		const fontLoader = new FontLoader();
		const scene = new Scene();
		const camera = new PerspectiveCamera(75, canvas.current.clientWidth / canvas.current.clientHeight, 0.1, 1000);

		const renderer = new WebGLRenderer({ canvas: canvas.current });
		renderer.setSize(canvas.current.clientWidth, canvas.current.clientHeight);
		renderer.setClearColor('#000');

		const font = fontLoader.parse(fontAsset);
		const name = new TextGeometry('Gil Domingues', {
			font: font,
			size: 20,
			height: 2,
			curveSegments: 12,
		});
		const material = new MeshLambertMaterial( { color: 0xffffff } );
		const mesh = new Mesh( name, material );
		const bounding = new Box3().setFromObject( mesh );
		mesh.position.set(- bounding.getSize().x / 2, - bounding.getSize().y / 2, 0);

		const light = new PointLight(0xffffff, 1, 100, 0);
		light.position.set(0, 0, 100);

		scene.add(mesh);
		scene.add(light);
		camera.position.z = 100;

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
