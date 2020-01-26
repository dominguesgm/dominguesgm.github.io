import React, { Component } from 'react';
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

	componentDidMount() {
		window.addEventListener('mousemove', this.handleMouseMove);

		this.setupScene();

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
		this.mouse.oldX = this.mouse.x;
		this.mouse.oldY = this.mouse.y;
		this.mouse.x = event.clientX;
		this.mouse.y = event.clientY;
	}

	animate = (time) => {
		this.animateScene(time);

		this.prevTime = time;
		this.requestAnimationFrameID = requestAnimationFrame( this.animate );
	}

}

export default Canvas;
