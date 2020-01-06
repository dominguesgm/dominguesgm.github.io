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

	for(let i = 0; i < text.length; i++) {
		const name = new TextGeometry(text[i], {
			font: this.options.font,
			size: this.options.fontSize,
			height: this.options.fontExtrusion,
			curveSegments: this.options.curveSegments,
		});

		const mesh = new Mesh(name, this.material);

		this.letterMeshes.push(mesh);
	}

	this.addToScene = function (scene) {
		this.letterMeshes.forEach((letter) => scene.add(letter));
	};

	this.applyToAll = function (func) {
		this.letterMeshes.forEach((letter) => func(letter));
	};
};

export default Text;
