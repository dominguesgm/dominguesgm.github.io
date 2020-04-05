import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'class-names';
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
	animationCallbacks = [];


	componentDidMount() {
		window.addEventListener('mousemove', this.handleMouseMove);
		window.addEventListener('resize', this.handleResize);

		window.addEventListener('load', () => {
			this.pageHasLoaded = true;
		});

		this.setupTHREE();

		this.requestAnimationFrameID = requestAnimationFrame( this.animate );
	}

	componentWillUnmount() {
		// remove event listener
		window.removeEventListener('mousemove', this.handleMouseMove);
		cancelAnimationFrame(this.requestAnimationFrameID);
	}

	render () {
		return (
			<canvas className={ classNames(styles.canvas, !this.props.isTouchable && styles.notTouchable) } ref={ this.canvas } />
		);
	}

	handleResize = () => {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();

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

	animate = (time) => {
		if(!this.pageHasLoaded) {
			this.requestAnimationFrameID = requestAnimationFrame( this.animate );
			return false;
		}

		if(this.trueStart == undefined) {
			this.trueStart = time;
		}

		this.animationCallbacks.forEach((callback) => {
			callback(time - this.trueStart);
		});

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
