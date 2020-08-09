import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'class-names';
import {
	WebGLRenderer,
	Scene,
} from 'three';

import {
	Lighting,
	Camera,
	Name,
	Laptop,
} from './components';

import styles from './Canvas.css';

class Canvas extends Component {
	requestAnimationFrameID = null;
	canvas = React.createRef();
	renderer = null;
	scene = null;
	camera = null;
	mouse = {
		x: null,
		y: null,
		oldX: null,
		oldY: null,
	};
	prevTime = 0;
	pageHasLoaded = false;
	objects = [];


	componentDidMount() {
		window.addEventListener('mousemove', this.handleMouseMove);
		window.addEventListener('resize', this.handleResize, { passive: true });

		window.addEventListener('load', () => {
			this.pageHasLoaded = true;
		});

		this.setup();

		this.requestAnimationFrameID = requestAnimationFrame( this.animate );
	}

	componentWillUnmount() {
		// remove event listener
		window.removeEventListener('mousemove', this.handleMouseMove);
		window.removeEventListener('resize', this.handleResize, { passive: true });
		cancelAnimationFrame(this.requestAnimationFrameID);
	}

	render () {
		return (
			<canvas className={ classNames(styles.canvas, !this.props.isTouchable && styles.notTouchable) } ref={ this.canvas } />
		);
	}

	handleResize = () => {
		this.camera.handleResize();
		this.objects.forEach((item) => item.handleResize());

		this.renderer.setSize( window.innerWidth, window.innerHeight );


		this.onResize && this.onResize();
	}

	handleMouseMove = (event) => {
		this.mouse.oldX = this.mouse.x;
		this.mouse.oldY = this.mouse.y;
		this.mouse.x = event.clientX;
		this.mouse.y = event.clientY;

		this.onMouseMove && this.onMouseMove();
	}

	setup = () => {
		this.scene = new Scene();

		this.renderer = new WebGLRenderer({ canvas: this.canvas.current, antialias: true, alpha: true });
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.setClearColor('#08090A', 0);

		this.camera = new Camera();

		this.lighting = new Lighting();
		this.lighting.lights.forEach((light) => {
			this.scene.add(light);
		});

		this.objects.push(new Name(this.camera, this.scene));
		// this.objects.push(new Laptop(this.camera, this.scene));

	}

	animate = (time) => {
		if(!this.pageHasLoaded) {
			this.requestAnimationFrameID = requestAnimationFrame( this.animate );
			return false;
		}

		if(this.trueStart == undefined) {
			this.trueStart = time;
		}

		// Call all animations
		const { isDone } = this.camera.animate(time - this.trueStart);
		this.objects.forEach((object) => {
			object.animate(time - this.trueStart, this.mouse, isDone);
		});

		// Render current frame and prepare next frame
		this.renderer.render( this.scene, this.camera.instance );
		this.prevTime = time;
		this.requestAnimationFrameID = requestAnimationFrame( this.animate );
	}

}

Canvas.propTypes = {
	isTouchable: PropTypes.bool,
};

Canvas.defaultProps = {
	isTouchable: true,
};

export default Canvas;
