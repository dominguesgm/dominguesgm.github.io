import {
	MeshLambertMaterial,
	Mesh,
	TextGeometry,
} from 'three';

const Text = function (text, material, options) {
	this.text = text;
	this.options = options;
	this.material = material || new MeshLambertMaterial( { color: 0xf7f7f2 } );
	this.letterMeshes = [];

	console.log('this.options.font', this.options.font);

	let offsetX = 0;
	const scale = this.options.fontSize / this.options.font.data.resolution;

	for(let i = 0; i < text.length; i++) {
		const name = new TextGeometry(text[i], {
			font: this.options.font,
			size: this.options.fontSize,
			height: this.options.fontExtrusion,
			curveSegments: this.options.curveSegments,
		});

		console.log('name', name);
		name.translate(offsetX, 0, 0);

		console.log('name', name);
		const mesh = new Mesh(name, this.material);

		this.letterMeshes.push(mesh);

		// To understand why we do this, please see create path function of Threejs's Font implementation (glyph width * font scale)
		offsetX += this.options.font.data.glyphs[text[i]].ha * scale;

		console.log('this.options.font.data.glyphs[text[i]].ha', this.options.font.data.glyphs[text[i]].ha);
		console.log('scale', scale);
		console.log('offsetX', offsetX);

	}

	this.width = offsetX;

	this.addToScene = function (scene) {
		this.letterMeshes.forEach((letter) => scene.add(letter));
	};

	this.setPosition = function (x, y, z) {
		this.letterMeshes.forEach((letter) => {
			letter.position.set(x, y, z);
		});
	};
};

export default Text;
