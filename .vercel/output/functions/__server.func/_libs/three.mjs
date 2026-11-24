import { r as __exportAll } from "../_runtime.mjs";
import { $ as Timer, A as MeshBasicMaterial, C as InterpolateLinear, D as MathUtils, E as LinearMipmapNearestFilter, F as NearestFilter, G as RGBADepthPacking, H as PropertyBinding, I as NearestMipmapLinearFilter, J as RepeatWrapping, L as NearestMipmapNearestFilter, M as MeshLambertMaterial, N as MeshStandardMaterial, O as Matrix4, P as MirroredRepeatWrapping, Q as TextureSource, R as Object3D, T as LinearMipmapLinearFilter, U as Quaternion, V as PointLight, X as Scene, Z as ShaderMaterial, b as ImageUtils, d as BufferGeometry, et as UniformsUtils, h as CompressedTexture, j as MeshDepthMaterial, k as Mesh, l as BoxGeometry, m as Color, nt as Vector3, p as ClampToEdgeWrapping, rt as WebGLRenderTarget, tt as Vector2, u as BufferAttribute, v as Float32BufferAttribute, w as LinearFilter, x as InstancedMesh, y as HalfFloatType, z as OrthographicCamera } from "./@react-three/drei+[...].mjs";
//#region node_modules/three/examples/jsm/shaders/CopyShader.js
/**
* @module CopyShader
* @three_import import { CopyShader } from 'three/addons/shaders/CopyShader.js';
*/
/**
* Full-screen copy shader pass.
*
* @constant
* @type {ShaderMaterial~Shader}
*/
var CopyShader = {
	name: "CopyShader",
	uniforms: {
		"tDiffuse": { value: null },
		"opacity": { value: 1 }
	},
	vertexShader: `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,
	fragmentShader: `

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`
};
//#endregion
//#region node_modules/three/examples/jsm/postprocessing/Pass.js
/**
* Abstract base class for all post processing passes.
*
* This module is only relevant for post processing with {@link WebGLRenderer}.
*
* @abstract
* @three_import import { Pass } from 'three/addons/postprocessing/Pass.js';
*/
var Pass = class {
	/**
	* Constructs a new pass.
	*/
	constructor() {
		/**
		* This flag can be used for type testing.
		*
		* @type {boolean}
		* @readonly
		* @default true
		*/
		this.isPass = true;
		/**
		* If set to `true`, the pass is processed by the composer.
		*
		* @type {boolean}
		* @default true
		*/
		this.enabled = true;
		/**
		* If set to `true`, the pass indicates to swap read and write buffer after rendering.
		*
		* @type {boolean}
		* @default true
		*/
		this.needsSwap = true;
		/**
		* If set to `true`, the pass clears its buffer before rendering
		*
		* @type {boolean}
		* @default false
		*/
		this.clear = false;
		/**
		* If set to `true`, the result of the pass is rendered to screen. The last pass in the composers
		* pass chain gets automatically rendered to screen, no matter how this property is configured.
		*
		* @type {boolean}
		* @default false
		*/
		this.renderToScreen = false;
	}
	/**
	* Sets the size of the pass.
	*
	* @abstract
	* @param {number} width - The width to set.
	* @param {number} height - The height to set.
	*/
	setSize() {}
	/**
	* This method holds the render logic of a pass. It must be implemented in all derived classes.
	*
	* @abstract
	* @param {WebGLRenderer} renderer - The renderer.
	* @param {WebGLRenderTarget} writeBuffer - The write buffer. This buffer is intended as the rendering
	* destination for the pass.
	* @param {WebGLRenderTarget} readBuffer - The read buffer. The pass can access the result from the
	* previous pass from this buffer.
	* @param {number} deltaTime - The delta time in seconds.
	* @param {boolean} maskActive - Whether masking is active or not.
	*/
	render() {
		console.error("THREE.Pass: .render() must be implemented in derived pass.");
	}
	/**
	* Frees the GPU-related resources allocated by this instance. Call this
	* method whenever the pass is no longer used in your app.
	*
	* @abstract
	*/
	dispose() {}
};
var _camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
var FullscreenTriangleGeometry = class extends BufferGeometry {
	constructor() {
		super();
		this.setAttribute("position", new Float32BufferAttribute([
			-1,
			3,
			0,
			-1,
			-1,
			0,
			3,
			-1,
			0
		], 3));
		this.setAttribute("uv", new Float32BufferAttribute([
			0,
			2,
			0,
			0,
			2,
			0
		], 2));
	}
};
var _geometry = new FullscreenTriangleGeometry();
/**
* This module is a helper for passes which need to render a full
* screen effect which is quite common in context of post processing.
*
* The intended usage is to reuse a single full screen quad for rendering
* subsequent passes by just reassigning the `material` reference.
*
* This module can only be used with {@link WebGLRenderer}.
*
* @augments Mesh
* @three_import import { FullScreenQuad } from 'three/addons/postprocessing/Pass.js';
*/
var FullScreenQuad = class {
	/**
	* Constructs a new full screen quad.
	*
	* @param {?Material} material - The material to render te full screen quad with.
	*/
	constructor(material) {
		this._mesh = new Mesh(_geometry, material);
	}
	/**
	* Frees the GPU-related resources allocated by this instance. Call this
	* method whenever the instance is no longer used in your app.
	*/
	dispose() {
		this._mesh.geometry.dispose();
	}
	/**
	* Renders the full screen quad.
	*
	* @param {WebGLRenderer} renderer - The renderer.
	*/
	render(renderer) {
		renderer.render(this._mesh, _camera);
	}
	/**
	* The quad's material.
	*
	* @type {?Material}
	*/
	get material() {
		return this._mesh.material;
	}
	set material(value) {
		this._mesh.material = value;
	}
};
//#endregion
//#region node_modules/three/examples/jsm/postprocessing/ShaderPass.js
/**
* This pass can be used to create a post processing effect
* with a raw GLSL shader object. Useful for implementing custom
* effects.
*
* ```js
* const fxaaPass = new ShaderPass( FXAAShader );
* composer.addPass( fxaaPass );
* ```
*
* @augments Pass
* @three_import import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
*/
var ShaderPass = class extends Pass {
	/**
	* Constructs a new shader pass.
	*
	* @param {Object|ShaderMaterial} [shader] - A shader object holding vertex and fragment shader as well as
	* defines and uniforms. It's also valid to pass a custom shader material.
	* @param {string} [textureID='tDiffuse'] - The name of the texture uniform that should sample
	* the read buffer.
	*/
	constructor(shader, textureID = "tDiffuse") {
		super();
		/**
		* The name of the texture uniform that should sample the read buffer.
		*
		* @type {string}
		* @default 'tDiffuse'
		*/
		this.textureID = textureID;
		/**
		* The pass uniforms.
		*
		* @type {?Object}
		*/
		this.uniforms = null;
		/**
		* The pass material.
		*
		* @type {?ShaderMaterial}
		*/
		this.material = null;
		if (shader instanceof ShaderMaterial) {
			this.uniforms = shader.uniforms;
			this.material = shader;
		} else if (shader) {
			this.uniforms = UniformsUtils.clone(shader.uniforms);
			this.material = new ShaderMaterial({
				name: shader.name !== void 0 ? shader.name : "unspecified",
				defines: Object.assign({}, shader.defines),
				uniforms: this.uniforms,
				vertexShader: shader.vertexShader,
				fragmentShader: shader.fragmentShader
			});
		}
		this._fsQuad = new FullScreenQuad(this.material);
	}
	/**
	* Performs the shader pass.
	*
	* @param {WebGLRenderer} renderer - The renderer.
	* @param {WebGLRenderTarget} writeBuffer - The write buffer. This buffer is intended as the rendering
	* destination for the pass.
	* @param {WebGLRenderTarget} readBuffer - The read buffer. The pass can access the result from the
	* previous pass from this buffer.
	* @param {number} deltaTime - The delta time in seconds.
	* @param {boolean} maskActive - Whether masking is active or not.
	*/
	render(renderer, writeBuffer, readBuffer) {
		if (this.uniforms[this.textureID]) this.uniforms[this.textureID].value = readBuffer.texture;
		this._fsQuad.material = this.material;
		if (this.renderToScreen) {
			renderer.setRenderTarget(null);
			this._fsQuad.render(renderer);
		} else {
			renderer.setRenderTarget(writeBuffer);
			if (this.clear) renderer.clear(renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil);
			this._fsQuad.render(renderer);
		}
	}
	/**
	* Frees the GPU-related resources allocated by this instance. Call this
	* method whenever the pass is no longer used in your app.
	*/
	dispose() {
		this.material.dispose();
		this._fsQuad.dispose();
	}
};
//#endregion
//#region node_modules/three/examples/jsm/postprocessing/MaskPass.js
/**
* This pass can be used to define a mask during post processing.
* Meaning only areas of subsequent post processing are affected
* which lie in the masking area of this pass. Internally, the masking
* is implemented with the stencil buffer.
*
* ```js
* const maskPass = new MaskPass( scene, camera );
* composer.addPass( maskPass );
* ```
*
* @augments Pass
* @three_import import { MaskPass } from 'three/addons/postprocessing/MaskPass.js';
*/
var MaskPass = class extends Pass {
	/**
	* Constructs a new mask pass.
	*
	* @param {Scene} scene - The 3D objects in this scene will define the mask.
	* @param {Camera} camera - The camera.
	*/
	constructor(scene, camera) {
		super();
		/**
		* The scene that defines the mask.
		*
		* @type {Scene}
		*/
		this.scene = scene;
		/**
		* The camera.
		*
		* @type {Camera}
		*/
		this.camera = camera;
		/**
		* Overwritten to perform a clear operation by default.
		*
		* @type {boolean}
		* @default true
		*/
		this.clear = true;
		/**
		* Overwritten to disable the swap.
		*
		* @type {boolean}
		* @default false
		*/
		this.needsSwap = false;
		/**
		* Whether to inverse the mask or not.
		*
		* @type {boolean}
		* @default false
		*/
		this.inverse = false;
	}
	/**
	* Performs a mask pass with the configured scene and camera.
	*
	* @param {WebGLRenderer} renderer - The renderer.
	* @param {WebGLRenderTarget} writeBuffer - The write buffer. This buffer is intended as the rendering
	* destination for the pass.
	* @param {WebGLRenderTarget} readBuffer - The read buffer. The pass can access the result from the
	* previous pass from this buffer.
	* @param {number} deltaTime - The delta time in seconds.
	* @param {boolean} maskActive - Whether masking is active or not.
	*/
	render(renderer, writeBuffer, readBuffer) {
		const context = renderer.getContext();
		const state = renderer.state;
		state.buffers.color.setMask(false);
		state.buffers.depth.setMask(false);
		state.buffers.color.setLocked(true);
		state.buffers.depth.setLocked(true);
		let writeValue, clearValue;
		if (this.inverse) {
			writeValue = 0;
			clearValue = 1;
		} else {
			writeValue = 1;
			clearValue = 0;
		}
		state.buffers.stencil.setTest(true);
		state.buffers.stencil.setOp(context.REPLACE, context.REPLACE, context.REPLACE);
		state.buffers.stencil.setFunc(context.ALWAYS, writeValue, 4294967295);
		state.buffers.stencil.setClear(clearValue);
		state.buffers.stencil.setLocked(true);
		renderer.setRenderTarget(readBuffer);
		if (this.clear) renderer.clear();
		renderer.render(this.scene, this.camera);
		renderer.setRenderTarget(writeBuffer);
		if (this.clear) renderer.clear();
		renderer.render(this.scene, this.camera);
		state.buffers.color.setLocked(false);
		state.buffers.depth.setLocked(false);
		state.buffers.color.setMask(true);
		state.buffers.depth.setMask(true);
		state.buffers.stencil.setLocked(false);
		state.buffers.stencil.setFunc(context.EQUAL, 1, 4294967295);
		state.buffers.stencil.setOp(context.KEEP, context.KEEP, context.KEEP);
		state.buffers.stencil.setLocked(true);
	}
};
/**
* This pass can be used to clear a mask previously defined with {@link MaskPass}.
*
* ```js
* const clearPass = new ClearMaskPass();
* composer.addPass( clearPass );
* ```
*
* @augments Pass
*/
var ClearMaskPass = class extends Pass {
	/**
	* Constructs a new clear mask pass.
	*/
	constructor() {
		super();
		/**
		* Overwritten to disable the swap.
		*
		* @type {boolean}
		* @default false
		*/
		this.needsSwap = false;
	}
	/**
	* Performs the clear of the currently defined mask.
	*
	* @param {WebGLRenderer} renderer - The renderer.
	* @param {WebGLRenderTarget} writeBuffer - The write buffer. This buffer is intended as the rendering
	* destination for the pass.
	* @param {WebGLRenderTarget} readBuffer - The read buffer. The pass can access the result from the
	* previous pass from this buffer.
	* @param {number} deltaTime - The delta time in seconds.
	* @param {boolean} maskActive - Whether masking is active or not.
	*/
	render(renderer) {
		renderer.state.buffers.stencil.setLocked(false);
		renderer.state.buffers.stencil.setTest(false);
	}
};
//#endregion
//#region node_modules/three/examples/jsm/postprocessing/EffectComposer.js
/**
* Used to implement post-processing effects in three.js.
* The class manages a chain of post-processing passes to produce the final visual result.
* Post-processing passes are executed in order of their addition/insertion.
* The last pass is automatically rendered to screen.
*
* This module can only be used with {@link WebGLRenderer}.
*
* ```js
* const composer = new EffectComposer( renderer );
*
* // adding some passes
* const renderPass = new RenderPass( scene, camera );
* composer.addPass( renderPass );
*
* const glitchPass = new GlitchPass();
* composer.addPass( glitchPass );
*
* const outputPass = new OutputPass()
* composer.addPass( outputPass );
*
* function animate() {
*
* 	composer.render(); // instead of renderer.render()
*
* }
* ```
*
* @three_import import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
*/
var EffectComposer = class {
	/**
	* Constructs a new effect composer.
	*
	* @param {WebGLRenderer} renderer - The renderer.
	* @param {WebGLRenderTarget} [renderTarget] - This render target and a clone will
	* be used as the internal read and write buffers. If not given, the composer creates
	* the buffers automatically.
	*/
	constructor(renderer, renderTarget) {
		/**
		* The renderer.
		*
		* @type {WebGLRenderer}
		*/
		this.renderer = renderer;
		this._pixelRatio = renderer.getPixelRatio();
		if (renderTarget === void 0) {
			const size = renderer.getSize(new Vector2());
			this._width = size.width;
			this._height = size.height;
			renderTarget = new WebGLRenderTarget(this._width * this._pixelRatio, this._height * this._pixelRatio, { type: HalfFloatType });
			renderTarget.texture.name = "EffectComposer.rt1";
		} else {
			this._width = renderTarget.width;
			this._height = renderTarget.height;
		}
		this.renderTarget1 = renderTarget;
		this.renderTarget2 = renderTarget.clone();
		this.renderTarget2.texture.name = "EffectComposer.rt2";
		/**
		* A reference to the internal write buffer. Passes usually write
		* their result into this buffer.
		*
		* @type {WebGLRenderTarget}
		*/
		this.writeBuffer = this.renderTarget1;
		/**
		* A reference to the internal read buffer. Passes usually read
		* the previous render result from this buffer.
		*
		* @type {WebGLRenderTarget}
		*/
		this.readBuffer = this.renderTarget2;
		/**
		* Whether the final pass is rendered to the screen (default framebuffer) or not.
		*
		* @type {boolean}
		* @default true
		*/
		this.renderToScreen = true;
		/**
		* An array representing the (ordered) chain of post-processing passes.
		*
		* @type {Array<Pass>}
		*/
		this.passes = [];
		/**
		* A copy pass used for internal swap operations.
		*
		* @private
		* @type {ShaderPass}
		*/
		this.copyPass = new ShaderPass(CopyShader);
		this.copyPass.material.blending = 0;
		/**
		* The internal timer for managing time data.
		*
		* @private
		* @type {Timer}
		*/
		this.timer = new Timer();
	}
	/**
	* Swaps the internal read/write buffers.
	*/
	swapBuffers() {
		const tmp = this.readBuffer;
		this.readBuffer = this.writeBuffer;
		this.writeBuffer = tmp;
	}
	/**
	* Adds the given pass to the pass chain.
	*
	* @param {Pass} pass - The pass to add.
	*/
	addPass(pass) {
		this.passes.push(pass);
		pass.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
	}
	/**
	* Inserts the given pass at a given index.
	*
	* @param {Pass} pass - The pass to insert.
	* @param {number} index - The index into the pass chain.
	*/
	insertPass(pass, index) {
		this.passes.splice(index, 0, pass);
		pass.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
	}
	/**
	* Removes the given pass from the pass chain.
	*
	* @param {Pass} pass - The pass to remove.
	*/
	removePass(pass) {
		const index = this.passes.indexOf(pass);
		if (index !== -1) this.passes.splice(index, 1);
	}
	/**
	* Returns `true` if the pass for the given index is the last enabled pass in the pass chain.
	*
	* @param {number} passIndex - The pass index.
	* @return {boolean} Whether the pass for the given index is the last pass in the pass chain.
	*/
	isLastEnabledPass(passIndex) {
		for (let i = passIndex + 1; i < this.passes.length; i++) if (this.passes[i].enabled) return false;
		return true;
	}
	/**
	* Executes all enabled post-processing passes in order to produce the final frame.
	*
	* @param {number} deltaTime - The delta time in seconds. If not given, the composer computes
	* its own time delta value.
	*/
	render(deltaTime) {
		this.timer.update();
		if (deltaTime === void 0) deltaTime = this.timer.getDelta();
		const currentRenderTarget = this.renderer.getRenderTarget();
		let maskActive = false;
		for (let i = 0, il = this.passes.length; i < il; i++) {
			const pass = this.passes[i];
			if (pass.enabled === false) continue;
			pass.renderToScreen = this.renderToScreen && this.isLastEnabledPass(i);
			pass.render(this.renderer, this.writeBuffer, this.readBuffer, deltaTime, maskActive);
			if (pass.needsSwap) {
				if (maskActive) {
					const context = this.renderer.getContext();
					const stencil = this.renderer.state.buffers.stencil;
					stencil.setFunc(context.NOTEQUAL, 1, 4294967295);
					this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, deltaTime);
					stencil.setFunc(context.EQUAL, 1, 4294967295);
				}
				this.swapBuffers();
			}
			if (MaskPass !== void 0) {
				if (pass instanceof MaskPass) maskActive = true;
				else if (pass instanceof ClearMaskPass) maskActive = false;
			}
		}
		this.renderer.setRenderTarget(currentRenderTarget);
	}
	/**
	* Resets the internal state of the EffectComposer.
	*
	* @param {WebGLRenderTarget} [renderTarget] - This render target has the same purpose like
	* the one from the constructor. If set, it is used to setup the read and write buffers.
	*/
	reset(renderTarget) {
		if (renderTarget === void 0) {
			const size = this.renderer.getSize(new Vector2());
			this._pixelRatio = this.renderer.getPixelRatio();
			this._width = size.width;
			this._height = size.height;
			renderTarget = this.renderTarget1.clone();
			renderTarget.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
		}
		this.renderTarget1.dispose();
		this.renderTarget2.dispose();
		this.renderTarget1 = renderTarget;
		this.renderTarget2 = renderTarget.clone();
		this.writeBuffer = this.renderTarget1;
		this.readBuffer = this.renderTarget2;
	}
	/**
	* Resizes the internal read and write buffers as well as all passes. Similar to {@link WebGLRenderer#setSize},
	* this method honors the current pixel ration.
	*
	* @param {number} width - The width in logical pixels.
	* @param {number} height - The height in logical pixels.
	*/
	setSize(width, height) {
		this._width = width;
		this._height = height;
		const effectiveWidth = this._width * this._pixelRatio;
		const effectiveHeight = this._height * this._pixelRatio;
		this.renderTarget1.setSize(effectiveWidth, effectiveHeight);
		this.renderTarget2.setSize(effectiveWidth, effectiveHeight);
		for (let i = 0; i < this.passes.length; i++) this.passes[i].setSize(effectiveWidth, effectiveHeight);
	}
	/**
	* Sets device pixel ratio. This is usually used for HiDPI device to prevent blurring output.
	* Setting the pixel ratio will automatically resize the composer.
	*
	* @param {number} pixelRatio - The pixel ratio to set.
	*/
	setPixelRatio(pixelRatio) {
		this._pixelRatio = pixelRatio;
		this.setSize(this._width, this._height);
	}
	/**
	* Frees the GPU-related resources allocated by this instance. Call this
	* method whenever the composer is no longer used in your app.
	*/
	dispose() {
		this.renderTarget1.dispose();
		this.renderTarget2.dispose();
		this.copyPass.dispose();
	}
};
//#endregion
//#region node_modules/three/examples/jsm/postprocessing/RenderPass.js
/**
* This class represents a render pass. It takes a camera and a scene and produces
* a beauty pass for subsequent post processing effects.
*
* ```js
* const renderPass = new RenderPass( scene, camera );
* composer.addPass( renderPass );
* ```
*
* @augments Pass
* @three_import import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
*/
var RenderPass = class extends Pass {
	/**
	* Constructs a new render pass.
	*
	* @param {Scene} scene - The scene to render.
	* @param {Camera} camera - The camera.
	* @param {?Material} [overrideMaterial=null] - The override material. If set, this material is used
	* for all objects in the scene.
	* @param {?(number|Color|string)} [clearColor=null] - The clear color of the render pass.
	* @param {?number} [clearAlpha=null] - The clear alpha of the render pass.
	*/
	constructor(scene, camera, overrideMaterial = null, clearColor = null, clearAlpha = null) {
		super();
		/**
		* The scene to render.
		*
		* @type {Scene}
		*/
		this.scene = scene;
		/**
		* The camera.
		*
		* @type {Camera}
		*/
		this.camera = camera;
		/**
		* The override material. If set, this material is used
		* for all objects in the scene.
		*
		* @type {?Material}
		* @default null
		*/
		this.overrideMaterial = overrideMaterial;
		/**
		* The clear color of the render pass.
		*
		* @type {?(number|Color|string)}
		* @default null
		*/
		this.clearColor = clearColor;
		/**
		* The clear alpha of the render pass.
		*
		* @type {?number}
		* @default null
		*/
		this.clearAlpha = clearAlpha;
		/**
		* Overwritten to perform a clear operation by default.
		*
		* @type {boolean}
		* @default true
		*/
		this.clear = true;
		/**
		* If set to `true`, only the depth can be cleared when `clear` is to `false`.
		*
		* @type {boolean}
		* @default false
		*/
		this.clearDepth = false;
		/**
		* Overwritten to disable the swap.
		*
		* @type {boolean}
		* @default false
		*/
		this.needsSwap = false;
		/**
		* This flag indicates that this pass renders the scene itself.
		*
		* @type {boolean}
		* @readonly
		* @default true
		*/
		this.isRenderPass = true;
		this._oldClearColor = new Color();
	}
	/**
	* Performs a beauty pass with the configured scene and camera.
	*
	* @param {WebGLRenderer} renderer - The renderer.
	* @param {WebGLRenderTarget} writeBuffer - The write buffer. This buffer is intended as the rendering
	* destination for the pass.
	* @param {WebGLRenderTarget} readBuffer - The read buffer. The pass can access the result from the
	* previous pass from this buffer.
	* @param {number} deltaTime - The delta time in seconds.
	* @param {boolean} maskActive - Whether masking is active or not.
	*/
	render(renderer, writeBuffer, readBuffer) {
		const oldAutoClear = renderer.autoClear;
		renderer.autoClear = false;
		let oldClearAlpha, oldOverrideMaterial;
		if (this.overrideMaterial !== null) {
			oldOverrideMaterial = this.scene.overrideMaterial;
			this.scene.overrideMaterial = this.overrideMaterial;
		}
		if (this.clearColor !== null) {
			renderer.getClearColor(this._oldClearColor);
			renderer.setClearColor(this.clearColor, renderer.getClearAlpha());
		}
		if (this.clearAlpha !== null) {
			oldClearAlpha = renderer.getClearAlpha();
			renderer.setClearAlpha(this.clearAlpha);
		}
		if (this.clearDepth == true) renderer.clearDepth();
		renderer.setRenderTarget(this.renderToScreen ? null : readBuffer);
		if (this.clear === true) renderer.clear(renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil);
		renderer.render(this.scene, this.camera);
		if (this.clearColor !== null) renderer.setClearColor(this._oldClearColor);
		if (this.clearAlpha !== null) renderer.setClearAlpha(oldClearAlpha);
		if (this.overrideMaterial !== null) this.scene.overrideMaterial = oldOverrideMaterial;
		renderer.autoClear = oldAutoClear;
	}
};
//#endregion
//#region node_modules/three/examples/jsm/shaders/LuminosityHighPassShader.js
/**
* @module LuminosityHighPassShader
* @three_import import { LuminosityHighPassShader } from 'three/addons/shaders/LuminosityHighPassShader.js';
*/
/**
* Luminosity high pass shader.
*
* @constant
* @type {ShaderMaterial~Shader}
*/
var LuminosityHighPassShader = {
	name: "LuminosityHighPassShader",
	uniforms: {
		"tDiffuse": { value: null },
		"luminosityThreshold": { value: 1 },
		"smoothWidth": { value: 1 },
		"defaultColor": { value: new Color(0) },
		"defaultOpacity": { value: 0 }
	},
	vertexShader: `

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,
	fragmentShader: `

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`
};
//#endregion
//#region node_modules/three/examples/jsm/postprocessing/UnrealBloomPass.js
/**
* This pass is inspired by the bloom pass of Unreal Engine. It creates a
* mip map chain of bloom textures and blurs them with different radii. Because
* of the weighted combination of mips, and because larger blurs are done on
* higher mips, this effect provides good quality and performance.
*
* When using this pass, tone mapping must be enabled in the renderer settings.
*
* Reference:
* - [Bloom in Unreal Engine](https://docs.unrealengine.com/latest/INT/Engine/Rendering/PostProcessEffects/Bloom/)
*
* ```js
* const resolution = new THREE.Vector2( window.innerWidth, window.innerHeight );
* const bloomPass = new UnrealBloomPass( resolution, 1.5, 0.4, 0.85 );
* composer.addPass( bloomPass );
* ```
*
* @augments Pass
* @three_import import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
*/
var UnrealBloomPass = class UnrealBloomPass extends Pass {
	/**
	* Constructs a new Unreal Bloom pass.
	*
	* @param {Vector2} [resolution] - The effect's resolution.
	* @param {number} [strength=1] - The Bloom strength.
	* @param {number} radius - The Bloom radius.
	* @param {number} threshold - The luminance threshold limits which bright areas contribute to the Bloom effect.
	*/
	constructor(resolution, strength = 1, radius, threshold) {
		super();
		/**
		* The Bloom strength.
		*
		* @type {number}
		* @default 1
		*/
		this.strength = strength;
		/**
		* The Bloom radius. Must be in the range `[0,1]`.
		*
		* @type {number}
		*/
		this.radius = radius;
		/**
		* The luminance threshold limits which bright areas contribute to the Bloom effect.
		*
		* @type {number}
		*/
		this.threshold = threshold;
		/**
		* The effect's resolution.
		*
		* @type {Vector2}
		* @default (256,256)
		*/
		this.resolution = resolution !== void 0 ? new Vector2(resolution.x, resolution.y) : new Vector2(256, 256);
		/**
		* The effect's clear color
		*
		* @type {Color}
		* @default (0,0,0)
		*/
		this.clearColor = new Color(0, 0, 0);
		/**
		* Overwritten to disable the swap.
		*
		* @type {boolean}
		* @default false
		*/
		this.needsSwap = false;
		this.renderTargetsHorizontal = [];
		this.renderTargetsVertical = [];
		this.nMips = 5;
		let resx = Math.round(this.resolution.x / 2);
		let resy = Math.round(this.resolution.y / 2);
		this.renderTargetBright = new WebGLRenderTarget(resx, resy, {
			type: HalfFloatType,
			depthBuffer: false
		});
		this.renderTargetBright.texture.name = "UnrealBloomPass.bright";
		this.renderTargetBright.texture.generateMipmaps = false;
		for (let i = 0; i < this.nMips; i++) {
			const renderTargetHorizontal = new WebGLRenderTarget(resx, resy, {
				type: HalfFloatType,
				depthBuffer: false
			});
			renderTargetHorizontal.texture.name = "UnrealBloomPass.h" + i;
			renderTargetHorizontal.texture.generateMipmaps = false;
			this.renderTargetsHorizontal.push(renderTargetHorizontal);
			const renderTargetVertical = new WebGLRenderTarget(resx, resy, {
				type: HalfFloatType,
				depthBuffer: false
			});
			renderTargetVertical.texture.name = "UnrealBloomPass.v" + i;
			renderTargetVertical.texture.generateMipmaps = false;
			this.renderTargetsVertical.push(renderTargetVertical);
			resx = Math.round(resx / 2);
			resy = Math.round(resy / 2);
		}
		const highPassShader = LuminosityHighPassShader;
		this.highPassUniforms = UniformsUtils.clone(highPassShader.uniforms);
		this.highPassUniforms["luminosityThreshold"].value = threshold;
		this.highPassUniforms["smoothWidth"].value = .01;
		this.materialHighPassFilter = new ShaderMaterial({
			uniforms: this.highPassUniforms,
			vertexShader: highPassShader.vertexShader,
			fragmentShader: highPassShader.fragmentShader
		});
		this.separableBlurMaterials = [];
		const kernelSizeArray = [
			6,
			10,
			14,
			18,
			22
		];
		resx = Math.round(this.resolution.x / 2);
		resy = Math.round(this.resolution.y / 2);
		for (let i = 0; i < this.nMips; i++) {
			this.separableBlurMaterials.push(this._getSeparableBlurMaterial(kernelSizeArray[i]));
			this.separableBlurMaterials[i].uniforms["invSize"].value = new Vector2(1 / resx, 1 / resy);
			resx = Math.round(resx / 2);
			resy = Math.round(resy / 2);
		}
		this.compositeMaterial = this._getCompositeMaterial(this.nMips);
		this.compositeMaterial.uniforms["blurTexture1"].value = this.renderTargetsVertical[0].texture;
		this.compositeMaterial.uniforms["blurTexture2"].value = this.renderTargetsVertical[1].texture;
		this.compositeMaterial.uniforms["blurTexture3"].value = this.renderTargetsVertical[2].texture;
		this.compositeMaterial.uniforms["blurTexture4"].value = this.renderTargetsVertical[3].texture;
		this.compositeMaterial.uniforms["blurTexture5"].value = this.renderTargetsVertical[4].texture;
		this.compositeMaterial.uniforms["bloomStrength"].value = strength;
		this.compositeMaterial.uniforms["bloomRadius"].value = .1;
		const bloomFactors = [
			1,
			.8,
			.6,
			.4,
			.2
		];
		this.compositeMaterial.uniforms["bloomFactors"].value = bloomFactors;
		this.bloomTintColors = [
			new Vector3(1, 1, 1),
			new Vector3(1, 1, 1),
			new Vector3(1, 1, 1),
			new Vector3(1, 1, 1),
			new Vector3(1, 1, 1)
		];
		this.compositeMaterial.uniforms["bloomTintColors"].value = this.bloomTintColors;
		this.copyUniforms = UniformsUtils.clone(CopyShader.uniforms);
		this.blendMaterial = new ShaderMaterial({
			uniforms: this.copyUniforms,
			vertexShader: CopyShader.vertexShader,
			fragmentShader: CopyShader.fragmentShader,
			premultipliedAlpha: true,
			blending: 2,
			depthTest: false,
			depthWrite: false,
			transparent: true
		});
		this._oldClearColor = new Color();
		this._oldClearAlpha = 1;
		this._basic = new MeshBasicMaterial();
		this._fsQuad = new FullScreenQuad(null);
	}
	/**
	* Frees the GPU-related resources allocated by this instance. Call this
	* method whenever the pass is no longer used in your app.
	*/
	dispose() {
		for (let i = 0; i < this.renderTargetsHorizontal.length; i++) this.renderTargetsHorizontal[i].dispose();
		for (let i = 0; i < this.renderTargetsVertical.length; i++) this.renderTargetsVertical[i].dispose();
		this.renderTargetBright.dispose();
		for (let i = 0; i < this.separableBlurMaterials.length; i++) this.separableBlurMaterials[i].dispose();
		this.compositeMaterial.dispose();
		this.blendMaterial.dispose();
		this._basic.dispose();
		this._fsQuad.dispose();
	}
	/**
	* Sets the size of the pass.
	*
	* @param {number} width - The width to set.
	* @param {number} height - The height to set.
	*/
	setSize(width, height) {
		let resx = Math.round(width / 2);
		let resy = Math.round(height / 2);
		this.renderTargetBright.setSize(resx, resy);
		for (let i = 0; i < this.nMips; i++) {
			this.renderTargetsHorizontal[i].setSize(resx, resy);
			this.renderTargetsVertical[i].setSize(resx, resy);
			this.separableBlurMaterials[i].uniforms["invSize"].value = new Vector2(1 / resx, 1 / resy);
			resx = Math.round(resx / 2);
			resy = Math.round(resy / 2);
		}
	}
	/**
	* Performs the Bloom pass.
	*
	* @param {WebGLRenderer} renderer - The renderer.
	* @param {WebGLRenderTarget} writeBuffer - The write buffer. This buffer is intended as the rendering
	* destination for the pass.
	* @param {WebGLRenderTarget} readBuffer - The read buffer. The pass can access the result from the
	* previous pass from this buffer.
	* @param {number} deltaTime - The delta time in seconds.
	* @param {boolean} maskActive - Whether masking is active or not.
	*/
	render(renderer, writeBuffer, readBuffer, deltaTime, maskActive) {
		renderer.getClearColor(this._oldClearColor);
		this._oldClearAlpha = renderer.getClearAlpha();
		const oldAutoClear = renderer.autoClear;
		renderer.autoClear = false;
		renderer.setClearColor(this.clearColor, 0);
		if (maskActive) renderer.state.buffers.stencil.setTest(false);
		if (this.renderToScreen) {
			this._fsQuad.material = this._basic;
			this._basic.map = readBuffer.texture;
			renderer.setRenderTarget(null);
			renderer.clear();
			this._fsQuad.render(renderer);
		}
		this.highPassUniforms["tDiffuse"].value = readBuffer.texture;
		this.highPassUniforms["luminosityThreshold"].value = this.threshold;
		this._fsQuad.material = this.materialHighPassFilter;
		renderer.setRenderTarget(this.renderTargetBright);
		renderer.clear();
		this._fsQuad.render(renderer);
		let inputRenderTarget = this.renderTargetBright;
		for (let i = 0; i < this.nMips; i++) {
			this._fsQuad.material = this.separableBlurMaterials[i];
			this.separableBlurMaterials[i].uniforms["colorTexture"].value = inputRenderTarget.texture;
			this.separableBlurMaterials[i].uniforms["direction"].value = UnrealBloomPass.BlurDirectionX;
			renderer.setRenderTarget(this.renderTargetsHorizontal[i]);
			renderer.clear();
			this._fsQuad.render(renderer);
			this.separableBlurMaterials[i].uniforms["colorTexture"].value = this.renderTargetsHorizontal[i].texture;
			this.separableBlurMaterials[i].uniforms["direction"].value = UnrealBloomPass.BlurDirectionY;
			renderer.setRenderTarget(this.renderTargetsVertical[i]);
			renderer.clear();
			this._fsQuad.render(renderer);
			inputRenderTarget = this.renderTargetsVertical[i];
		}
		this._fsQuad.material = this.compositeMaterial;
		this.compositeMaterial.uniforms["bloomStrength"].value = this.strength;
		this.compositeMaterial.uniforms["bloomRadius"].value = this.radius;
		this.compositeMaterial.uniforms["bloomTintColors"].value = this.bloomTintColors;
		renderer.setRenderTarget(this.renderTargetsHorizontal[0]);
		renderer.clear();
		this._fsQuad.render(renderer);
		this._fsQuad.material = this.blendMaterial;
		this.copyUniforms["tDiffuse"].value = this.renderTargetsHorizontal[0].texture;
		if (maskActive) renderer.state.buffers.stencil.setTest(true);
		if (this.renderToScreen) {
			renderer.setRenderTarget(null);
			this._fsQuad.render(renderer);
		} else {
			renderer.setRenderTarget(readBuffer);
			this._fsQuad.render(renderer);
		}
		renderer.setClearColor(this._oldClearColor, this._oldClearAlpha);
		renderer.autoClear = oldAutoClear;
	}
	_getSeparableBlurMaterial(kernelRadius) {
		const coefficients = [];
		const sigma = kernelRadius / 3;
		for (let i = 0; i < kernelRadius; i++) coefficients.push(.39894 * Math.exp(-.5 * i * i / (sigma * sigma)) / sigma);
		const offsets = [];
		const weights = [];
		for (let i = 1; i < kernelRadius; i += 2) {
			const wa = coefficients[i];
			const wb = i + 1 < kernelRadius ? coefficients[i + 1] : 0;
			const w = wa + wb;
			offsets.push((i * wa + (i + 1) * wb) / w);
			weights.push(w);
		}
		return new ShaderMaterial({
			defines: { "KERNEL_PAIRS": offsets.length },
			uniforms: {
				"colorTexture": { value: null },
				"invSize": { value: new Vector2(.5, .5) },
				"direction": { value: new Vector2(.5, .5) },
				"centerWeight": { value: coefficients[0] },
				"gaussianOffsets": { value: offsets },
				"gaussianWeights": { value: weights }
			},
			vertexShader: `

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,
			fragmentShader: `

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`
		});
	}
	_getCompositeMaterial(nMips) {
		return new ShaderMaterial({
			defines: { "NUM_MIPS": nMips },
			uniforms: {
				"blurTexture1": { value: null },
				"blurTexture2": { value: null },
				"blurTexture3": { value: null },
				"blurTexture4": { value: null },
				"blurTexture5": { value: null },
				"bloomStrength": { value: 1 },
				"bloomFactors": { value: null },
				"bloomTintColors": { value: null },
				"bloomRadius": { value: 0 }
			},
			vertexShader: `

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,
			fragmentShader: `

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`
		});
	}
};
UnrealBloomPass.BlurDirectionX = new Vector2(1, 0);
UnrealBloomPass.BlurDirectionY = new Vector2(0, 1);
//#endregion
//#region node_modules/three/examples/jsm/shaders/BokehShader.js
/**
* @module BokehShader
* @three_import import { BokehShader } from 'three/addons/shaders/BokehShader.js';
*/
/**
* Depth-of-field shader with bokeh ported from
* [GLSL shader by Martins Upitis](http://artmartinsh.blogspot.com/2010/02/glsl-lens-blur-filter-with-bokeh.html).
*
* @constant
* @type {ShaderMaterial~Shader}
*/
var BokehShader = {
	name: "BokehShader",
	defines: {
		"DEPTH_PACKING": 1,
		"PERSPECTIVE_CAMERA": 1
	},
	uniforms: {
		"tColor": { value: null },
		"tDepth": { value: null },
		"focus": { value: 1 },
		"aspect": { value: 1 },
		"aperture": { value: .025 },
		"maxblur": { value: .01 },
		"nearClip": { value: 1 },
		"farClip": { value: 1e3 }
	},
	vertexShader: `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,
	fragmentShader: `

		#include <common>

		varying vec2 vUv;

		uniform sampler2D tColor;
		uniform sampler2D tDepth;

		uniform float maxblur; // max blur amount
		uniform float aperture; // aperture - bigger values for shallower depth of field

		uniform float nearClip;
		uniform float farClip;

		uniform float focus;
		uniform float aspect;

		#include <packing>

		float getDepth( const in vec2 screenPosition ) {
			#if DEPTH_PACKING == 1
			return unpackRGBAToDepth( texture2D( tDepth, screenPosition ) );
			#else
			return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		float getViewZ( const in float depth ) {
			#if PERSPECTIVE_CAMERA == 1
			return perspectiveDepthToViewZ( depth, nearClip, farClip );
			#else
			return orthographicDepthToViewZ( depth, nearClip, farClip );
			#endif
		}


		void main() {

			vec2 aspectcorrect = vec2( 1.0, aspect );

			float viewZ = getViewZ( getDepth( vUv ) );

			float factor = ( focus + viewZ ); // viewZ is <= 0, so this is a difference equation

			vec2 dofblur = vec2 ( clamp( factor * aperture, -maxblur, maxblur ) );

			vec2 dofblur9 = dofblur * 0.9;
			vec2 dofblur7 = dofblur * 0.7;
			vec2 dofblur4 = dofblur * 0.4;

			vec4 col = vec4( 0.0 );

			col += texture2D( tColor, vUv.xy );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur9 );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur7 );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.4,   0.0  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur4 );

			gl_FragColor = col / 41.0;
			gl_FragColor.a = 1.0;

		}`
};
//#endregion
//#region node_modules/three/examples/jsm/postprocessing/BokehPass.js
/**
* Pass for creating depth of field (DOF) effect.
*
* ```js
* const bokehPass = new BokehPass( scene, camera, {
* 	focus: 500,
* 	aperture: 5,
* 	maxblur: 0.01
* } );
* composer.addPass( bokehPass );
* ```
*
* @augments Pass
* @three_import import { BokehPass } from 'three/addons/postprocessing/BokehPass.js';
*/
var BokehPass = class extends Pass {
	/**
	* Constructs a new Bokeh pass.
	*
	* @param {Scene} scene - The scene to render the DOF for.
	* @param {Camera} camera - The camera.
	* @param {BokehPass~Options} params - The pass options.
	*/
	constructor(scene, camera, params) {
		super();
		/**
		* The scene to render the DOF for.
		*
		* @type {Scene}
		*/
		this.scene = scene;
		/**
		* The camera.
		*
		* @type {Camera}
		*/
		this.camera = camera;
		const focus = params.focus !== void 0 ? params.focus : 1;
		const aperture = params.aperture !== void 0 ? params.aperture : .025;
		const maxblur = params.maxblur !== void 0 ? params.maxblur : 1;
		this._renderTargetDepth = new WebGLRenderTarget(1, 1, {
			minFilter: NearestFilter,
			magFilter: NearestFilter,
			type: HalfFloatType
		});
		this._renderTargetDepth.texture.name = "BokehPass.depth";
		this._materialDepth = new MeshDepthMaterial();
		this._materialDepth.depthPacking = RGBADepthPacking;
		this._materialDepth.blending = 0;
		const bokehUniforms = UniformsUtils.clone(BokehShader.uniforms);
		bokehUniforms["tDepth"].value = this._renderTargetDepth.texture;
		bokehUniforms["focus"].value = focus;
		bokehUniforms["aspect"].value = camera.aspect;
		bokehUniforms["aperture"].value = aperture;
		bokehUniforms["maxblur"].value = maxblur;
		bokehUniforms["nearClip"].value = camera.near;
		bokehUniforms["farClip"].value = camera.far;
		/**
		* The pass bokeh material.
		*
		* @type {ShaderMaterial}
		*/
		this.materialBokeh = new ShaderMaterial({
			defines: Object.assign({}, BokehShader.defines),
			uniforms: bokehUniforms,
			vertexShader: BokehShader.vertexShader,
			fragmentShader: BokehShader.fragmentShader
		});
		/**
		* The pass uniforms.  Use this object if you want to update the
		* `focus`, `aperture` or `maxblur` values at runtime.
		*
		* ```js
		* pass.uniforms.focus.value = focus;
		* pass.uniforms.aperture.value = aperture;
		* pass.uniforms.maxblur.value = maxblur;
		* ```
		*
		* @type {Object}
		*/
		this.uniforms = bokehUniforms;
		this._fsQuad = new FullScreenQuad(this.materialBokeh);
		this._oldClearColor = new Color();
	}
	/**
	* Performs the Bokeh pass.
	*
	* @param {WebGLRenderer} renderer - The renderer.
	* @param {WebGLRenderTarget} writeBuffer - The write buffer. This buffer is intended as the rendering
	* destination for the pass.
	* @param {WebGLRenderTarget} readBuffer - The read buffer. The pass can access the result from the
	* previous pass from this buffer.
	* @param {number} deltaTime - The delta time in seconds.
	* @param {boolean} maskActive - Whether masking is active or not.
	*/
	render(renderer, writeBuffer, readBuffer) {
		this.scene.overrideMaterial = this._materialDepth;
		renderer.getClearColor(this._oldClearColor);
		const oldClearAlpha = renderer.getClearAlpha();
		const oldAutoClear = renderer.autoClear;
		renderer.autoClear = false;
		renderer.setClearColor(16777215);
		renderer.setClearAlpha(1);
		renderer.setRenderTarget(this._renderTargetDepth);
		renderer.clear();
		renderer.render(this.scene, this.camera);
		this.uniforms["tColor"].value = readBuffer.texture;
		this.uniforms["nearClip"].value = this.camera.near;
		this.uniforms["farClip"].value = this.camera.far;
		if (this.renderToScreen) {
			renderer.setRenderTarget(null);
			this._fsQuad.render(renderer);
		} else {
			renderer.setRenderTarget(writeBuffer);
			renderer.clear();
			this._fsQuad.render(renderer);
		}
		this.scene.overrideMaterial = null;
		renderer.setClearColor(this._oldClearColor);
		renderer.setClearAlpha(oldClearAlpha);
		renderer.autoClear = oldAutoClear;
	}
	/**
	* Sets the size of the pass.
	*
	* @param {number} width - The width to set.
	* @param {number} height - The height to set.
	*/
	setSize(width, height) {
		this.materialBokeh.uniforms["aspect"].value = width / height;
		this._renderTargetDepth.setSize(width, height);
	}
	/**
	* Frees the GPU-related resources allocated by this instance. Call this
	* method whenever the pass is no longer used in your app.
	*/
	dispose() {
		this._renderTargetDepth.dispose();
		this._materialDepth.dispose();
		this.materialBokeh.dispose();
		this._fsQuad.dispose();
	}
};
//#endregion
//#region node_modules/three/examples/jsm/environments/RoomEnvironment.js
/**
* This class represents a scene with a basic room setup that can be used as
* input for {@link PMREMGenerator#fromScene}. The resulting PMREM represents the room's
* lighting and can be used for Image Based Lighting by assigning it to {@link Scene#environment}
* or directly as an environment map to PBR materials.
*
* The implementation is based on the [EnvironmentScene](https://github.com/google/model-viewer/blob/master/packages/model-viewer/src/three-components/EnvironmentScene.ts)
* component from the `model-viewer` project.
*
* ```js
* const environment = new RoomEnvironment();
* const pmremGenerator = new THREE.PMREMGenerator( renderer );
*
* const envMap = pmremGenerator.fromScene( environment ).texture;
* scene.environment = envMap;
* ```
*
* @augments Scene
* @three_import import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
*/
var RoomEnvironment = class extends Scene {
	constructor() {
		super();
		this.name = "RoomEnvironment";
		this.position.y = -3.5;
		const geometry = new BoxGeometry();
		geometry.deleteAttribute("uv");
		const roomMaterial = new MeshStandardMaterial({ side: 1 });
		const boxMaterial = new MeshStandardMaterial();
		const mainLight = new PointLight(16777215, 900, 28, 2);
		mainLight.position.set(.418, 16.199, .3);
		this.add(mainLight);
		const room = new Mesh(geometry, roomMaterial);
		room.position.set(-.757, 13.219, .717);
		room.scale.set(31.713, 28.305, 28.591);
		this.add(room);
		const boxes = new InstancedMesh(geometry, boxMaterial, 6);
		const transform = new Object3D();
		transform.position.set(-10.906, 2.009, 1.846);
		transform.rotation.set(0, -.195, 0);
		transform.scale.set(2.328, 7.905, 4.651);
		transform.updateMatrix();
		boxes.setMatrixAt(0, transform.matrix);
		transform.position.set(-5.607, -.754, -.758);
		transform.rotation.set(0, .994, 0);
		transform.scale.set(1.97, 1.534, 3.955);
		transform.updateMatrix();
		boxes.setMatrixAt(1, transform.matrix);
		transform.position.set(6.167, .857, 7.803);
		transform.rotation.set(0, .561, 0);
		transform.scale.set(3.927, 6.285, 3.687);
		transform.updateMatrix();
		boxes.setMatrixAt(2, transform.matrix);
		transform.position.set(-2.017, .018, 6.124);
		transform.rotation.set(0, .333, 0);
		transform.scale.set(2.002, 4.566, 2.064);
		transform.updateMatrix();
		boxes.setMatrixAt(3, transform.matrix);
		transform.position.set(2.291, -.756, -2.621);
		transform.rotation.set(0, -.286, 0);
		transform.scale.set(1.546, 1.552, 1.496);
		transform.updateMatrix();
		boxes.setMatrixAt(4, transform.matrix);
		transform.position.set(-2.193, -.369, -5.547);
		transform.rotation.set(0, .516, 0);
		transform.scale.set(3.875, 3.487, 2.986);
		transform.updateMatrix();
		boxes.setMatrixAt(5, transform.matrix);
		this.add(boxes);
		const light1 = new Mesh(geometry, createAreaLightMaterial(50));
		light1.position.set(-16.116, 14.37, 8.208);
		light1.scale.set(.1, 2.428, 2.739);
		this.add(light1);
		const light2 = new Mesh(geometry, createAreaLightMaterial(50));
		light2.position.set(-16.109, 18.021, -8.207);
		light2.scale.set(.1, 2.425, 2.751);
		this.add(light2);
		const light3 = new Mesh(geometry, createAreaLightMaterial(17));
		light3.position.set(14.904, 12.198, -1.832);
		light3.scale.set(.15, 4.265, 6.331);
		this.add(light3);
		const light4 = new Mesh(geometry, createAreaLightMaterial(43));
		light4.position.set(-.462, 8.89, 14.52);
		light4.scale.set(4.38, 5.441, .088);
		this.add(light4);
		const light5 = new Mesh(geometry, createAreaLightMaterial(20));
		light5.position.set(3.235, 11.486, -12.541);
		light5.scale.set(2.5, 2, .1);
		this.add(light5);
		const light6 = new Mesh(geometry, createAreaLightMaterial(100));
		light6.position.set(0, 20, 0);
		light6.scale.set(1, .1, 1);
		this.add(light6);
	}
	/**
	* Frees internal resources. This method should be called
	* when the environment is no longer required.
	*/
	dispose() {
		const resources = /* @__PURE__ */ new Set();
		this.traverse((object) => {
			if (object.isMesh) {
				resources.add(object.geometry);
				resources.add(object.material);
			}
		});
		for (const resource of resources) resource.dispose();
	}
};
function createAreaLightMaterial(intensity) {
	return new MeshLambertMaterial({
		color: 0,
		emissive: 16777215,
		emissiveIntensity: intensity
	});
}
//#endregion
//#region node_modules/three/examples/jsm/exporters/GLTFExporter.js
var GLTFExporter_exports = /* @__PURE__ */ __exportAll({ GLTFExporter: () => GLTFExporter });
/**
* The KHR_mesh_quantization extension allows these extra attribute component types
*
* @see https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_mesh_quantization/README.md#extending-mesh-attributes
*/
var KHR_mesh_quantization_ExtraAttrTypes = {
	POSITION: [
		"byte",
		"byte normalized",
		"unsigned byte",
		"unsigned byte normalized",
		"short",
		"short normalized",
		"unsigned short",
		"unsigned short normalized"
	],
	NORMAL: ["byte normalized", "short normalized"],
	TANGENT: ["byte normalized", "short normalized"],
	TEXCOORD: [
		"byte",
		"byte normalized",
		"unsigned byte",
		"short",
		"short normalized",
		"unsigned short"
	]
};
/**
* An exporter for `glTF` 2.0.
*
* glTF (GL Transmission Format) is an [open format specification](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0)
* for efficient delivery and loading of 3D content. Assets may be provided either in JSON (.gltf)
* or binary (.glb) format. External files store textures (.jpg, .png) and additional binary
* data (.bin). A glTF asset may deliver one or more scenes, including meshes, materials,
* textures, skins, skeletons, morph targets, animations, lights, and/or cameras.
*
* GLTFExporter supports the [glTF 2.0 extensions](https://github.com/KhronosGroup/glTF/tree/master/extensions/):
*
* - KHR_lights_punctual
* - KHR_materials_clearcoat
* - KHR_materials_dispersion
* - KHR_materials_emissive_strength
* - KHR_materials_ior
* - KHR_materials_iridescence
* - KHR_materials_specular
* - KHR_materials_sheen
* - KHR_materials_transmission
* - KHR_materials_unlit
* - KHR_materials_volume
* - KHR_mesh_quantization
* - KHR_texture_transform
* - EXT_materials_bump
* - EXT_mesh_gpu_instancing
* - EXT_texture_webp
*
* The following glTF 2.0 extension is supported by an external user plugin:
*
* - [KHR_materials_variants](https://github.com/takahirox/three-gltf-extensions)
*
* ```js
* const exporter = new GLTFExporter();
* const data = await exporter.parseAsync( scene, options );
* ```
*
* @three_import import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
*/
var GLTFExporter = class {
	/**
	* Constructs a new glTF exporter.
	*/
	constructor() {
		/**
		* A reference to a texture utils module.
		*
		* @type {?(WebGLTextureUtils|WebGPUTextureUtils)}
		* @default null
		*/
		this.textureUtils = null;
		this.pluginCallbacks = [];
		this.register(function(writer) {
			return new GLTFLightExtension(writer);
		});
		this.register(function(writer) {
			return new GLTFMaterialsUnlitExtension(writer);
		});
		this.register(function(writer) {
			return new GLTFMaterialsTransmissionExtension(writer);
		});
		this.register(function(writer) {
			return new GLTFMaterialsVolumeExtension(writer);
		});
		this.register(function(writer) {
			return new GLTFMaterialsIorExtension(writer);
		});
		this.register(function(writer) {
			return new GLTFMaterialsSpecularExtension(writer);
		});
		this.register(function(writer) {
			return new GLTFMaterialsClearcoatExtension(writer);
		});
		this.register(function(writer) {
			return new GLTFMaterialsDispersionExtension(writer);
		});
		this.register(function(writer) {
			return new GLTFMaterialsIridescenceExtension(writer);
		});
		this.register(function(writer) {
			return new GLTFMaterialsSheenExtension(writer);
		});
		this.register(function(writer) {
			return new GLTFMaterialsAnisotropyExtension(writer);
		});
		this.register(function(writer) {
			return new GLTFMaterialsEmissiveStrengthExtension(writer);
		});
		this.register(function(writer) {
			return new GLTFMaterialsBumpExtension(writer);
		});
		this.register(function(writer) {
			return new GLTFMeshGpuInstancing(writer);
		});
	}
	/**
	* Registers a plugin callback. This API is internally used to implement the various
	* glTF extensions but can also used by third-party code to add additional logic
	* to the exporter.
	*
	* @param {function(writer:GLTFWriter)} callback - The callback function to register.
	* @return {GLTFExporter} A reference to this exporter.
	*/
	register(callback) {
		if (this.pluginCallbacks.indexOf(callback) === -1) this.pluginCallbacks.push(callback);
		return this;
	}
	/**
	* Unregisters a plugin callback.
	*
	* @param {Function} callback - The callback function to unregister.
	* @return {GLTFExporter} A reference to this exporter.
	*/
	unregister(callback) {
		if (this.pluginCallbacks.indexOf(callback) !== -1) this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(callback), 1);
		return this;
	}
	/**
	* Sets the texture utils for this exporter. Only relevant when compressed textures have to be exported.
	*
	* Depending on whether you use {@link WebGLRenderer} or {@link WebGPURenderer}, you must inject the
	* corresponding texture utils {@link module:WebGLTextureUtils} or {@link module:WebGPUTextureUtils}.
	*
	* @param {WebGLTextureUtils|WebGPUTextureUtils} utils - The texture utils.
	* @return {GLTFExporter} A reference to this exporter.
	*/
	setTextureUtils(utils) {
		this.textureUtils = utils;
		return this;
	}
	/**
	* Parses the given scenes and generates the glTF output.
	*
	* @param {Scene|Array<Scene>} input - A scene or an array of scenes.
	* @param {GLTFExporter~OnDone} onDone - A callback function that is executed when the export has finished.
	* @param {GLTFExporter~OnError} onError - A callback function that is executed when an error happens.
	* @param {GLTFExporter~Options} options - options
	*/
	parse(input, onDone, onError, options) {
		const writer = new GLTFWriter();
		const plugins = [];
		for (let i = 0, il = this.pluginCallbacks.length; i < il; i++) plugins.push(this.pluginCallbacks[i](writer));
		writer.setPlugins(plugins);
		writer.setTextureUtils(this.textureUtils);
		writer.writeAsync(input, onDone, options).catch(onError);
	}
	/**
	* Async version of {@link GLTFExporter#parse}.
	*
	* @param {Scene|Array<Scene>} input - A scene or an array of scenes.
	* @param {GLTFExporter~Options} options - options.
	* @return {Promise<ArrayBuffer|string>} A Promise that resolved with the exported glTF data.
	*/
	parseAsync(input, options) {
		const scope = this;
		return new Promise(function(resolve, reject) {
			scope.parse(input, resolve, reject, options);
		});
	}
};
var WEBGL_CONSTANTS = {
	POINTS: 0,
	LINES: 1,
	LINE_LOOP: 2,
	LINE_STRIP: 3,
	TRIANGLES: 4,
	TRIANGLE_STRIP: 5,
	TRIANGLE_FAN: 6,
	BYTE: 5120,
	UNSIGNED_BYTE: 5121,
	SHORT: 5122,
	UNSIGNED_SHORT: 5123,
	INT: 5124,
	UNSIGNED_INT: 5125,
	FLOAT: 5126,
	ARRAY_BUFFER: 34962,
	ELEMENT_ARRAY_BUFFER: 34963,
	NEAREST: 9728,
	LINEAR: 9729,
	NEAREST_MIPMAP_NEAREST: 9984,
	LINEAR_MIPMAP_NEAREST: 9985,
	NEAREST_MIPMAP_LINEAR: 9986,
	LINEAR_MIPMAP_LINEAR: 9987,
	CLAMP_TO_EDGE: 33071,
	MIRRORED_REPEAT: 33648,
	REPEAT: 10497
};
var KHR_MESH_QUANTIZATION = "KHR_mesh_quantization";
var THREE_TO_WEBGL = {};
THREE_TO_WEBGL[NearestFilter] = WEBGL_CONSTANTS.NEAREST;
THREE_TO_WEBGL[NearestMipmapNearestFilter] = WEBGL_CONSTANTS.NEAREST_MIPMAP_NEAREST;
THREE_TO_WEBGL[NearestMipmapLinearFilter] = WEBGL_CONSTANTS.NEAREST_MIPMAP_LINEAR;
THREE_TO_WEBGL[LinearFilter] = WEBGL_CONSTANTS.LINEAR;
THREE_TO_WEBGL[LinearMipmapNearestFilter] = WEBGL_CONSTANTS.LINEAR_MIPMAP_NEAREST;
THREE_TO_WEBGL[LinearMipmapLinearFilter] = WEBGL_CONSTANTS.LINEAR_MIPMAP_LINEAR;
THREE_TO_WEBGL[ClampToEdgeWrapping] = WEBGL_CONSTANTS.CLAMP_TO_EDGE;
THREE_TO_WEBGL[RepeatWrapping] = WEBGL_CONSTANTS.REPEAT;
THREE_TO_WEBGL[MirroredRepeatWrapping] = WEBGL_CONSTANTS.MIRRORED_REPEAT;
var PATH_PROPERTIES = {
	scale: "scale",
	position: "translation",
	quaternion: "rotation",
	morphTargetInfluences: "weights"
};
var DEFAULT_SPECULAR_COLOR = new Color();
var GLB_HEADER_BYTES = 12;
var GLB_HEADER_MAGIC = 1179937895;
var GLB_VERSION = 2;
var GLB_CHUNK_PREFIX_BYTES = 8;
var GLB_CHUNK_TYPE_JSON = 1313821514;
var GLB_CHUNK_TYPE_BIN = 5130562;
/**
* Compare two arrays
*
* @private
* @param {Array} array1 Array 1 to compare
* @param {Array} array2 Array 2 to compare
* @return {boolean}        Returns true if both arrays are equal
*/
function equalArray(array1, array2) {
	return array1.length === array2.length && array1.every(function(element, index) {
		return element === array2[index];
	});
}
/**
* Converts a string to an ArrayBuffer.
*
* @private
* @param {string} text
* @return {ArrayBuffer}
*/
function stringToArrayBuffer(text) {
	return new TextEncoder().encode(text).buffer;
}
/**
* Is identity matrix
*
* @private
* @param {Matrix4} matrix
* @returns {boolean} Returns true, if parameter is identity matrix
*/
function isIdentityMatrix(matrix) {
	return equalArray(matrix.elements, [
		1,
		0,
		0,
		0,
		0,
		1,
		0,
		0,
		0,
		0,
		1,
		0,
		0,
		0,
		0,
		1
	]);
}
/**
* Get the min and max vectors from the given attribute
*
* @private
* @param {BufferAttribute} attribute Attribute to find the min/max in range from start to start + count
* @param {number} start Start index
* @param {number} count Range to cover
* @return {Object} Object containing the `min` and `max` values (As an array of attribute.itemSize components)
*/
function getMinMax(attribute, start, count) {
	const output = {
		min: new Array(attribute.itemSize).fill(Number.POSITIVE_INFINITY),
		max: new Array(attribute.itemSize).fill(Number.NEGATIVE_INFINITY)
	};
	for (let i = start; i < start + count; i++) for (let a = 0; a < attribute.itemSize; a++) {
		let value;
		if (attribute.itemSize > 4) value = attribute.array[i * attribute.itemSize + a];
		else {
			if (a === 0) value = attribute.getX(i);
			else if (a === 1) value = attribute.getY(i);
			else if (a === 2) value = attribute.getZ(i);
			else if (a === 3) value = attribute.getW(i);
			if (attribute.normalized === true) value = MathUtils.normalize(value, attribute.array);
		}
		output.min[a] = Math.min(output.min[a], value);
		output.max[a] = Math.max(output.max[a], value);
	}
	return output;
}
/**
* Get the required size + padding for a buffer, rounded to the next 4-byte boundary.
* https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#data-alignment
*
* @private
* @param {number} bufferSize The size the original buffer. Should be an integer.
* @returns {number} new buffer size with required padding as an integer.
*
*/
function getPaddedBufferSize(bufferSize) {
	return Math.ceil(bufferSize / 4) * 4;
}
/**
* Returns a buffer aligned to 4-byte boundary.
*
* @private
* @param {ArrayBuffer} arrayBuffer Buffer to pad
* @param {number} [paddingByte=0] Should be an integer
* @returns {ArrayBuffer} The same buffer if it's already aligned to 4-byte boundary or a new buffer
*/
function getPaddedArrayBuffer(arrayBuffer, paddingByte = 0) {
	const paddedLength = getPaddedBufferSize(arrayBuffer.byteLength);
	if (paddedLength !== arrayBuffer.byteLength) {
		const array = new Uint8Array(paddedLength);
		array.set(new Uint8Array(arrayBuffer));
		if (paddingByte !== 0) for (let i = arrayBuffer.byteLength; i < paddedLength; i++) array[i] = paddingByte;
		return array.buffer;
	}
	return arrayBuffer;
}
function getCanvas() {
	if (typeof document === "undefined" && typeof OffscreenCanvas !== "undefined") return new OffscreenCanvas(1, 1);
	return document.createElement("canvas");
}
function getToBlobPromise(canvas, mimeType) {
	if (typeof OffscreenCanvas !== "undefined" && canvas instanceof OffscreenCanvas) {
		let quality;
		if (mimeType === "image/jpeg") quality = .92;
		else if (mimeType === "image/webp") quality = .8;
		return canvas.convertToBlob({
			type: mimeType,
			quality
		});
	} else return new Promise((resolve) => canvas.toBlob(resolve, mimeType));
}
/**
* Writer
*
* @private
*/
var GLTFWriter = class {
	constructor() {
		this.plugins = [];
		this.options = {};
		this.pending = [];
		this.buffers = [];
		this.byteOffset = 0;
		this.buffers = [];
		this.nodeMap = /* @__PURE__ */ new Map();
		this.skins = [];
		this.extensionsUsed = {};
		this.extensionsRequired = {};
		this.uids = /* @__PURE__ */ new Map();
		this.uid = 0;
		this.json = { asset: {
			version: "2.0",
			generator: "THREE.GLTFExporter r187"
		} };
		this.cache = {
			meshes: /* @__PURE__ */ new Map(),
			attributes: /* @__PURE__ */ new Map(),
			attributesNormalized: /* @__PURE__ */ new Map(),
			materials: /* @__PURE__ */ new Map(),
			textures: /* @__PURE__ */ new Map(),
			images: /* @__PURE__ */ new Map(),
			normalMaps: /* @__PURE__ */ new Map()
		};
		this.textureUtils = null;
	}
	setPlugins(plugins) {
		this.plugins = plugins;
	}
	setTextureUtils(utils) {
		this.textureUtils = utils;
	}
	/**
	* Parse scenes and generate GLTF output
	*
	* @param {Scene|Array<Scene>} input Scene or Array of THREE.Scenes
	* @param {Function} onDone Callback on completed
	* @param {Object} options options
	*/
	async writeAsync(input, onDone, options = {}) {
		this.options = Object.assign({
			binary: false,
			trs: false,
			onlyVisible: true,
			maxTextureSize: Infinity,
			animations: [],
			includeCustomExtensions: false,
			copyright: null
		}, options);
		if (this.options.animations.length > 0) this.options.trs = true;
		await this.processInputAsync(input);
		await Promise.all(this.pending);
		const writer = this;
		const buffers = writer.buffers;
		const json = writer.json;
		options = writer.options;
		const extensionsUsed = writer.extensionsUsed;
		const extensionsRequired = writer.extensionsRequired;
		const blob = new Blob(buffers, { type: "application/octet-stream" });
		const extensionsUsedList = Object.keys(extensionsUsed);
		const extensionsRequiredList = Object.keys(extensionsRequired);
		if (extensionsUsedList.length > 0) json.extensionsUsed = extensionsUsedList;
		if (extensionsRequiredList.length > 0) json.extensionsRequired = extensionsRequiredList;
		if (json.buffers && json.buffers.length > 0) json.buffers[0].byteLength = blob.size;
		if (options.copyright) json.asset.copyright = options.copyright;
		if (options.binary === true) {
			const reader = new FileReader();
			reader.readAsArrayBuffer(blob);
			reader.onloadend = function() {
				const binaryChunk = getPaddedArrayBuffer(reader.result);
				const binaryChunkPrefix = /* @__PURE__ */ new DataView(/* @__PURE__ */ new ArrayBuffer(GLB_CHUNK_PREFIX_BYTES));
				binaryChunkPrefix.setUint32(0, binaryChunk.byteLength, true);
				binaryChunkPrefix.setUint32(4, GLB_CHUNK_TYPE_BIN, true);
				const jsonChunk = getPaddedArrayBuffer(stringToArrayBuffer(JSON.stringify(json)), 32);
				const jsonChunkPrefix = /* @__PURE__ */ new DataView(/* @__PURE__ */ new ArrayBuffer(GLB_CHUNK_PREFIX_BYTES));
				jsonChunkPrefix.setUint32(0, jsonChunk.byteLength, true);
				jsonChunkPrefix.setUint32(4, GLB_CHUNK_TYPE_JSON, true);
				const header = /* @__PURE__ */ new ArrayBuffer(GLB_HEADER_BYTES);
				const headerView = new DataView(header);
				headerView.setUint32(0, GLB_HEADER_MAGIC, true);
				headerView.setUint32(4, GLB_VERSION, true);
				const totalByteLength = GLB_HEADER_BYTES + jsonChunkPrefix.byteLength + jsonChunk.byteLength + binaryChunkPrefix.byteLength + binaryChunk.byteLength;
				headerView.setUint32(8, totalByteLength, true);
				const glbBlob = new Blob([
					header,
					jsonChunkPrefix,
					jsonChunk,
					binaryChunkPrefix,
					binaryChunk
				], { type: "application/octet-stream" });
				const glbReader = new FileReader();
				glbReader.readAsArrayBuffer(glbBlob);
				glbReader.onloadend = function() {
					onDone(glbReader.result);
				};
			};
		} else if (json.buffers && json.buffers.length > 0) {
			const reader = new FileReader();
			reader.readAsDataURL(blob);
			reader.onloadend = function() {
				const base64data = reader.result;
				json.buffers[0].uri = base64data;
				onDone(json);
			};
		} else onDone(json);
	}
	/**
	* Serializes a userData.
	*
	* @param {THREE.Object3D|THREE.Material|THREE.BufferGeometry|THREE.AnimationClip} object
	* @param {Object} objectDef
	*/
	serializeUserData(object, objectDef) {
		if (Object.keys(object.userData).length === 0) return;
		const options = this.options;
		const extensionsUsed = this.extensionsUsed;
		try {
			const json = JSON.parse(JSON.stringify(object.userData));
			if (options.includeCustomExtensions && json.gltfExtensions) {
				if (objectDef.extensions === void 0) objectDef.extensions = {};
				for (const extensionName in json.gltfExtensions) {
					objectDef.extensions[extensionName] = json.gltfExtensions[extensionName];
					extensionsUsed[extensionName] = true;
				}
				delete json.gltfExtensions;
			}
			if (Object.keys(json).length > 0) objectDef.extras = json;
		} catch (error) {
			console.warn("THREE.GLTFExporter: userData of '" + object.name + "' won't be serialized because of JSON.stringify error - " + error.message);
		}
	}
	/**
	* Returns ids for buffer attributes.
	*
	* @param {Object} attribute
	* @param {boolean} [isRelativeCopy=false]
	* @return {number} An integer
	*/
	getUID(attribute, isRelativeCopy = false) {
		if (this.uids.has(attribute) === false) {
			const uids = /* @__PURE__ */ new Map();
			uids.set(true, this.uid++);
			uids.set(false, this.uid++);
			this.uids.set(attribute, uids);
		}
		return this.uids.get(attribute).get(isRelativeCopy);
	}
	/**
	* Checks if normal attribute values are normalized.
	*
	* @param {BufferAttribute} normal
	* @returns {boolean}
	*/
	isNormalizedNormalAttribute(normal) {
		if (this.cache.attributesNormalized.has(normal)) return false;
		const v = new Vector3();
		for (let i = 0, il = normal.count; i < il; i++) if (Math.abs(v.fromBufferAttribute(normal, i).length() - 1) > 5e-4) return false;
		return true;
	}
	/**
	* Creates normalized normal buffer attribute.
	*
	* @param {BufferAttribute} normal
	* @returns {BufferAttribute}
	*
	*/
	createNormalizedNormalAttribute(normal) {
		const cache = this.cache;
		if (cache.attributesNormalized.has(normal)) return cache.attributesNormalized.get(normal);
		const attribute = normal.clone();
		const v = new Vector3();
		for (let i = 0, il = attribute.count; i < il; i++) {
			v.fromBufferAttribute(attribute, i);
			if (v.x === 0 && v.y === 0 && v.z === 0) v.setX(1);
			else v.normalize();
			attribute.setXYZ(i, v.x, v.y, v.z);
		}
		cache.attributesNormalized.set(normal, attribute);
		return attribute;
	}
	/**
	* Applies a texture transform, if present, to the map definition. Requires
	* the KHR_texture_transform extension.
	*
	* @param {Object} mapDef
	* @param {THREE.Texture} texture
	*/
	applyTextureTransform(mapDef, texture) {
		let didTransform = false;
		const transformDef = {};
		if (texture.offset.x !== 0 || texture.offset.y !== 0) {
			transformDef.offset = texture.offset.toArray();
			didTransform = true;
		}
		if (texture.rotation !== 0) {
			transformDef.rotation = texture.rotation;
			didTransform = true;
		}
		if (texture.repeat.x !== 1 || texture.repeat.y !== 1) {
			transformDef.scale = texture.repeat.toArray();
			didTransform = true;
		}
		if (didTransform) {
			mapDef.extensions = mapDef.extensions || {};
			mapDef.extensions["KHR_texture_transform"] = transformDef;
			this.extensionsUsed["KHR_texture_transform"] = true;
		}
	}
	async buildMetalRoughTextureAsync(metalnessMap, roughnessMap) {
		if (metalnessMap === roughnessMap) return metalnessMap;
		function getEncodingConversion(map) {
			if (map.colorSpace === "srgb") return function SRGBToLinear(c) {
				return c < .04045 ? c * .0773993808 : Math.pow(c * .9478672986 + .0521327014, 2.4);
			};
			return function LinearToLinear(c) {
				return c;
			};
		}
		if (metalnessMap instanceof CompressedTexture) metalnessMap = await this.decompressTextureAsync(metalnessMap);
		if (roughnessMap instanceof CompressedTexture) roughnessMap = await this.decompressTextureAsync(roughnessMap);
		const metalness = metalnessMap ? metalnessMap.image : null;
		const roughness = roughnessMap ? roughnessMap.image : null;
		const width = Math.max(metalness ? metalness.width : 0, roughness ? roughness.width : 0);
		const height = Math.max(metalness ? metalness.height : 0, roughness ? roughness.height : 0);
		const canvas = getCanvas();
		canvas.width = width;
		canvas.height = height;
		const context = canvas.getContext("2d", { willReadFrequently: true });
		context.fillStyle = "#00ffff";
		context.fillRect(0, 0, width, height);
		const composite = context.getImageData(0, 0, width, height);
		if (metalness) {
			context.drawImage(metalness, 0, 0, width, height);
			const convert = getEncodingConversion(metalnessMap);
			const data = context.getImageData(0, 0, width, height).data;
			for (let i = 2; i < data.length; i += 4) composite.data[i] = convert(data[i] / 256) * 256;
		}
		if (roughness) {
			context.drawImage(roughness, 0, 0, width, height);
			const convert = getEncodingConversion(roughnessMap);
			const data = context.getImageData(0, 0, width, height).data;
			for (let i = 1; i < data.length; i += 4) composite.data[i] = convert(data[i] / 256) * 256;
		}
		context.putImageData(composite, 0, 0);
		const texture = (metalnessMap || roughnessMap).clone();
		texture.source = new TextureSource(canvas);
		texture.colorSpace = "";
		texture.channel = (metalnessMap || roughnessMap).channel;
		if (metalnessMap && roughnessMap && metalnessMap.channel !== roughnessMap.channel) console.warn("THREE.GLTFExporter: UV channels for metalnessMap and roughnessMap textures must match.");
		console.warn("THREE.GLTFExporter: Merged metalnessMap and roughnessMap textures.");
		return texture;
	}
	/**
	* Builds a copy of the given normal map with the red and/or green channels
	* inverted (`color = 255 - color`). This is used to bake the sign of
	* `material.normalScale` and the tangent-space convention into the texture,
	* since glTF only supports OpenGL-style normal maps with a univariate,
	* positive scale.
	*
	* @param {THREE.Texture} normalMap The source normal map.
	* @param {boolean} flipX Whether to invert the red channel (normal X).
	* @param {boolean} flipY Whether to invert the green channel (normal Y).
	* @return {Promise<THREE.Texture>} The derived normal map texture.
	*/
	async buildNormalMapTextureAsync(normalMap, flipX, flipY) {
		if (normalMap instanceof CompressedTexture) normalMap = await this.decompressTextureAsync(normalMap);
		const image = normalMap.image;
		const canvas = getCanvas();
		canvas.width = image.width;
		canvas.height = image.height;
		const context = canvas.getContext("2d", { willReadFrequently: true });
		context.drawImage(image, 0, 0, canvas.width, canvas.height);
		const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
		const data = imageData.data;
		for (let i = 0; i < data.length; i += 4) {
			if (flipX) data[i + 0] = 255 - data[i + 0];
			if (flipY) data[i + 1] = 255 - data[i + 1];
		}
		context.putImageData(imageData, 0, 0);
		const texture = normalMap.clone();
		texture.source = new TextureSource(canvas);
		return texture;
	}
	async decompressTextureAsync(texture, maxTextureSize = Infinity) {
		if (this.textureUtils === null) throw new Error("THREE.GLTFExporter: setTextureUtils() must be called to process compressed textures.");
		return await this.textureUtils.decompress(texture, maxTextureSize);
	}
	/**
	* Process a buffer to append to the default one.
	* @param {ArrayBuffer} buffer
	* @return {0}
	*/
	processBuffer(buffer) {
		const json = this.json;
		const buffers = this.buffers;
		if (!json.buffers) json.buffers = [{ byteLength: 0 }];
		buffers.push(buffer);
		return 0;
	}
	/**
	* Process and generate a BufferView
	* @param {BufferAttribute} attribute
	* @param {number} componentType
	* @param {number} start
	* @param {number} count
	* @param {number} [target] Target usage of the BufferView
	* @return {Object}
	*/
	processBufferView(attribute, componentType, start, count, target) {
		const json = this.json;
		if (!json.bufferViews) json.bufferViews = [];
		let componentSize;
		switch (componentType) {
			case WEBGL_CONSTANTS.BYTE:
			case WEBGL_CONSTANTS.UNSIGNED_BYTE:
				componentSize = 1;
				break;
			case WEBGL_CONSTANTS.SHORT:
			case WEBGL_CONSTANTS.UNSIGNED_SHORT:
				componentSize = 2;
				break;
			default: componentSize = 4;
		}
		let byteStride = attribute.itemSize * componentSize;
		if (target === WEBGL_CONSTANTS.ARRAY_BUFFER) byteStride = Math.ceil(byteStride / 4) * 4;
		const byteLength = getPaddedBufferSize(count * byteStride);
		const dataView = new DataView(new ArrayBuffer(byteLength));
		let offset = 0;
		for (let i = start; i < start + count; i++) {
			for (let a = 0; a < attribute.itemSize; a++) {
				let value;
				if (attribute.itemSize > 4) value = attribute.array[i * attribute.itemSize + a];
				else {
					if (a === 0) value = attribute.getX(i);
					else if (a === 1) value = attribute.getY(i);
					else if (a === 2) value = attribute.getZ(i);
					else if (a === 3) value = attribute.getW(i);
					if (attribute.normalized === true) value = MathUtils.normalize(value, attribute.array);
				}
				if (componentType === WEBGL_CONSTANTS.FLOAT) dataView.setFloat32(offset, value, true);
				else if (componentType === WEBGL_CONSTANTS.INT) dataView.setInt32(offset, value, true);
				else if (componentType === WEBGL_CONSTANTS.UNSIGNED_INT) dataView.setUint32(offset, value, true);
				else if (componentType === WEBGL_CONSTANTS.SHORT) dataView.setInt16(offset, value, true);
				else if (componentType === WEBGL_CONSTANTS.UNSIGNED_SHORT) dataView.setUint16(offset, value, true);
				else if (componentType === WEBGL_CONSTANTS.BYTE) dataView.setInt8(offset, value);
				else if (componentType === WEBGL_CONSTANTS.UNSIGNED_BYTE) dataView.setUint8(offset, value);
				offset += componentSize;
			}
			if (offset % byteStride !== 0) offset += byteStride - offset % byteStride;
		}
		const bufferViewDef = {
			buffer: this.processBuffer(dataView.buffer),
			byteOffset: this.byteOffset,
			byteLength
		};
		if (target !== void 0) bufferViewDef.target = target;
		if (target === WEBGL_CONSTANTS.ARRAY_BUFFER) bufferViewDef.byteStride = byteStride;
		this.byteOffset += byteLength;
		json.bufferViews.push(bufferViewDef);
		return {
			id: json.bufferViews.length - 1,
			byteLength: 0
		};
	}
	/**
	* Process and generate a BufferView from an image Blob.
	* @param {Blob} blob
	* @return {Promise<number>} An integer
	*/
	processBufferViewImage(blob) {
		const writer = this;
		const json = writer.json;
		if (!json.bufferViews) json.bufferViews = [];
		return new Promise(function(resolve) {
			const reader = new FileReader();
			reader.readAsArrayBuffer(blob);
			reader.onloadend = function() {
				const buffer = getPaddedArrayBuffer(reader.result);
				const bufferViewDef = {
					buffer: writer.processBuffer(buffer),
					byteOffset: writer.byteOffset,
					byteLength: buffer.byteLength
				};
				writer.byteOffset += buffer.byteLength;
				resolve(json.bufferViews.push(bufferViewDef) - 1);
			};
		});
	}
	/**
	* Process attribute to generate an accessor
	* @param {BufferAttribute} attribute Attribute to process
	* @param {?BufferGeometry} [geometry] Geometry used for truncated draw range
	* @param {number} [start=0]
	* @param {number} [count=Infinity]
	* @return {?number} Index of the processed accessor on the "accessors" array
	*/
	processAccessor(attribute, geometry, start, count) {
		const json = this.json;
		const types = {
			1: "SCALAR",
			2: "VEC2",
			3: "VEC3",
			4: "VEC4",
			9: "MAT3",
			16: "MAT4"
		};
		let componentType;
		if (attribute.array.constructor === Float32Array) componentType = WEBGL_CONSTANTS.FLOAT;
		else if (attribute.array.constructor === Int32Array) componentType = WEBGL_CONSTANTS.INT;
		else if (attribute.array.constructor === Uint32Array) componentType = WEBGL_CONSTANTS.UNSIGNED_INT;
		else if (attribute.array.constructor === Int16Array) componentType = WEBGL_CONSTANTS.SHORT;
		else if (attribute.array.constructor === Uint16Array) componentType = WEBGL_CONSTANTS.UNSIGNED_SHORT;
		else if (attribute.array.constructor === Int8Array) componentType = WEBGL_CONSTANTS.BYTE;
		else if (attribute.array.constructor === Uint8Array) componentType = WEBGL_CONSTANTS.UNSIGNED_BYTE;
		else throw new Error("THREE.GLTFExporter: Unsupported bufferAttribute component type: " + attribute.array.constructor.name);
		if (start === void 0) start = 0;
		if (count === void 0 || count === Infinity) count = attribute.count;
		if (count === 0) return null;
		const minMax = getMinMax(attribute, start, count);
		let bufferViewTarget;
		if (geometry !== void 0) bufferViewTarget = attribute === geometry.index ? WEBGL_CONSTANTS.ELEMENT_ARRAY_BUFFER : WEBGL_CONSTANTS.ARRAY_BUFFER;
		const bufferView = this.processBufferView(attribute, componentType, start, count, bufferViewTarget);
		const accessorDef = {
			bufferView: bufferView.id,
			byteOffset: bufferView.byteOffset,
			componentType,
			count,
			max: minMax.max,
			min: minMax.min,
			type: types[attribute.itemSize]
		};
		if (attribute.normalized === true) accessorDef.normalized = true;
		if (!json.accessors) json.accessors = [];
		return json.accessors.push(accessorDef) - 1;
	}
	/**
	* Process image
	* @param {Image} image to process
	* @param {number} format Identifier of the format (RGBAFormat)
	* @param {boolean} flipY before writing out the image
	* @param {string} mimeType export format
	* @return {number}     Index of the processed texture in the "images" array
	*/
	processImage(image, format, flipY, mimeType = "image/png") {
		if (image !== null) {
			const writer = this;
			const cache = writer.cache;
			const json = writer.json;
			const options = writer.options;
			const pending = writer.pending;
			if (!cache.images.has(image)) cache.images.set(image, {});
			const cachedImages = cache.images.get(image);
			const key = mimeType + ":flipY/" + flipY.toString();
			if (cachedImages[key] !== void 0) return cachedImages[key];
			if (!json.images) json.images = [];
			const imageDef = { mimeType };
			const canvas = getCanvas();
			canvas.width = Math.min(image.width, options.maxTextureSize);
			canvas.height = Math.min(image.height, options.maxTextureSize);
			const ctx = canvas.getContext("2d", { willReadFrequently: true });
			if (flipY === true) {
				ctx.translate(0, canvas.height);
				ctx.scale(1, -1);
			}
			if (image.data !== void 0) {
				if (format !== 1023) console.error("GLTFExporter: Only RGBAFormat is supported.", format);
				if (image.width > options.maxTextureSize || image.height > options.maxTextureSize) console.warn("GLTFExporter: Image size is bigger than maxTextureSize", image);
				const data = new Uint8ClampedArray(image.height * image.width * 4);
				for (let i = 0; i < data.length; i += 4) {
					data[i + 0] = image.data[i + 0];
					data[i + 1] = image.data[i + 1];
					data[i + 2] = image.data[i + 2];
					data[i + 3] = image.data[i + 3];
				}
				ctx.putImageData(new ImageData(data, image.width, image.height), 0, 0);
			} else if (typeof HTMLImageElement !== "undefined" && image instanceof HTMLImageElement || typeof HTMLCanvasElement !== "undefined" && image instanceof HTMLCanvasElement || typeof ImageBitmap !== "undefined" && image instanceof ImageBitmap || typeof OffscreenCanvas !== "undefined" && image instanceof OffscreenCanvas) ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
			else throw new Error("THREE.GLTFExporter: Invalid image type. Use HTMLImageElement, HTMLCanvasElement, ImageBitmap or OffscreenCanvas.");
			if (options.binary === true) pending.push(getToBlobPromise(canvas, mimeType).then((blob) => writer.processBufferViewImage(blob)).then((bufferViewIndex) => {
				imageDef.bufferView = bufferViewIndex;
			}));
			else imageDef.uri = ImageUtils.getDataURL(canvas, mimeType);
			const index = json.images.push(imageDef) - 1;
			cachedImages[key] = index;
			return index;
		} else throw new Error("THREE.GLTFExporter: No valid image data found. Unable to process texture.");
	}
	/**
	* Process sampler
	* @param {Texture} map Texture to process
	* @return {number}      Index of the processed texture in the "samplers" array
	*/
	processSampler(map) {
		const json = this.json;
		if (!json.samplers) json.samplers = [];
		const samplerDef = {
			magFilter: THREE_TO_WEBGL[map.magFilter],
			minFilter: THREE_TO_WEBGL[map.minFilter],
			wrapS: THREE_TO_WEBGL[map.wrapS],
			wrapT: THREE_TO_WEBGL[map.wrapT]
		};
		return json.samplers.push(samplerDef) - 1;
	}
	/**
	* Process texture
	* @param {Texture} map Map to process
	* @return {Promise<number>} Index of the processed texture in the "textures" array
	*/
	async processTextureAsync(map) {
		const options = this.options;
		const cache = this.cache;
		const json = this.json;
		if (cache.textures.has(map)) return cache.textures.get(map);
		if (!json.textures) json.textures = [];
		if (map instanceof CompressedTexture) map = await this.decompressTextureAsync(map, options.maxTextureSize);
		const mimeType = map.userData.mimeType;
		const imageIndex = this.processImage(map.image, map.format, map.flipY, mimeType);
		const textureDef = { sampler: this.processSampler(map) };
		if (mimeType === "image/webp") {
			textureDef.extensions = textureDef.extensions || {};
			textureDef.extensions["EXT_texture_webp"] = { source: imageIndex };
			this.extensionsUsed["EXT_texture_webp"] = true;
			this.extensionsRequired["EXT_texture_webp"] = true;
		} else textureDef.source = imageIndex;
		if (map.name) textureDef.name = map.name;
		await this._invokeAllAsync(async function(ext) {
			ext.writeTexture && await ext.writeTexture(map, textureDef);
		});
		const index = json.textures.push(textureDef) - 1;
		cache.textures.set(map, index);
		return index;
	}
	/**
	* Process material
	* @param {THREE.Material} material Material to process
	* @param {THREE.BufferGeometry} [geometry] Geometry the material is used with.
	* @return {Promise<?number>} Index of the processed material in the "materials" array
	*/
	async processMaterialAsync(material, geometry) {
		const cache = this.cache;
		const json = this.json;
		const hasTangent = geometry !== void 0 && geometry.hasAttribute("tangent");
		const cacheKey = material.normalMap ? material.uuid + ":" + hasTangent : material.uuid;
		if (cache.materials.has(cacheKey)) return cache.materials.get(cacheKey);
		if (material.isShaderMaterial) {
			console.warn("GLTFExporter: THREE.ShaderMaterial not supported.");
			return null;
		}
		if (!json.materials) json.materials = [];
		const materialDef = { pbrMetallicRoughness: {} };
		if (material.isMeshStandardMaterial !== true && material.isMeshBasicMaterial !== true) console.warn("GLTFExporter: Use MeshStandardMaterial or MeshBasicMaterial for best results.");
		const color = material.color.toArray().concat([material.opacity]);
		if (!equalArray(color, [
			1,
			1,
			1,
			1
		])) materialDef.pbrMetallicRoughness.baseColorFactor = color;
		if (material.isMeshStandardMaterial) {
			materialDef.pbrMetallicRoughness.metallicFactor = material.metalness;
			materialDef.pbrMetallicRoughness.roughnessFactor = material.roughness;
		} else {
			materialDef.pbrMetallicRoughness.metallicFactor = 0;
			materialDef.pbrMetallicRoughness.roughnessFactor = 1;
		}
		if (material.metalnessMap || material.roughnessMap) {
			const metalRoughTexture = await this.buildMetalRoughTextureAsync(material.metalnessMap, material.roughnessMap);
			const metalRoughMapDef = {
				index: await this.processTextureAsync(metalRoughTexture),
				texCoord: metalRoughTexture.channel
			};
			this.applyTextureTransform(metalRoughMapDef, metalRoughTexture);
			materialDef.pbrMetallicRoughness.metallicRoughnessTexture = metalRoughMapDef;
		}
		if (material.map) {
			const baseColorMapDef = {
				index: await this.processTextureAsync(material.map),
				texCoord: material.map.channel
			};
			this.applyTextureTransform(baseColorMapDef, material.map);
			materialDef.pbrMetallicRoughness.baseColorTexture = baseColorMapDef;
		}
		if (material.emissive) {
			const emissive = material.emissive;
			if (Math.max(emissive.r, emissive.g, emissive.b) > 0) materialDef.emissiveFactor = material.emissive.toArray();
			if (material.emissiveMap) {
				const emissiveMapDef = {
					index: await this.processTextureAsync(material.emissiveMap),
					texCoord: material.emissiveMap.channel
				};
				this.applyTextureTransform(emissiveMapDef, material.emissiveMap);
				materialDef.emissiveTexture = emissiveMapDef;
			}
		}
		if (material.normalMap) {
			const normalScale = material.normalScale;
			const flipX = normalScale.x < 0;
			const flipY = hasTangent ? normalScale.y < 0 : normalScale.y > 0;
			let normalMap = material.normalMap;
			if (flipX || flipY) {
				if (cache.normalMaps.has(material.normalMap) === false) cache.normalMaps.set(material.normalMap, {});
				const cachedVariants = cache.normalMaps.get(material.normalMap);
				const cacheKey = `${flipX}:${flipY}`;
				if (cachedVariants[cacheKey] === void 0) cachedVariants[cacheKey] = await this.buildNormalMapTextureAsync(material.normalMap, flipX, flipY);
				normalMap = cachedVariants[cacheKey];
			}
			const normalMapDef = {
				index: await this.processTextureAsync(normalMap),
				texCoord: material.normalMap.channel
			};
			if (Math.abs(normalScale.x) !== 1) normalMapDef.scale = Math.abs(normalScale.x);
			this.applyTextureTransform(normalMapDef, material.normalMap);
			materialDef.normalTexture = normalMapDef;
		}
		if (material.aoMap) {
			const occlusionMapDef = {
				index: await this.processTextureAsync(material.aoMap),
				texCoord: material.aoMap.channel
			};
			if (material.aoMapIntensity !== 1) occlusionMapDef.strength = material.aoMapIntensity;
			this.applyTextureTransform(occlusionMapDef, material.aoMap);
			materialDef.occlusionTexture = occlusionMapDef;
		}
		if (material.transparent) materialDef.alphaMode = "BLEND";
		else if (material.alphaTest > 0) {
			materialDef.alphaMode = "MASK";
			materialDef.alphaCutoff = material.alphaTest;
		}
		if (material.side === 2) materialDef.doubleSided = true;
		if (material.name !== "") materialDef.name = material.name;
		this.serializeUserData(material, materialDef);
		await this._invokeAllAsync(async function(ext) {
			ext.writeMaterialAsync && await ext.writeMaterialAsync(material, materialDef);
		});
		const index = json.materials.push(materialDef) - 1;
		cache.materials.set(cacheKey, index);
		return index;
	}
	/**
	* Process mesh
	* @param {THREE.Mesh} mesh Mesh to process
	* @return {Promise<?number>} Index of the processed mesh in the "meshes" array
	*/
	async processMeshAsync(mesh) {
		const cache = this.cache;
		const json = this.json;
		const meshCacheKeyParts = [mesh.geometry.uuid];
		if (Array.isArray(mesh.material)) for (let i = 0, l = mesh.material.length; i < l; i++) meshCacheKeyParts.push(mesh.material[i].uuid);
		else meshCacheKeyParts.push(mesh.material.uuid);
		const meshCacheKey = meshCacheKeyParts.join(":");
		if (cache.meshes.has(meshCacheKey)) return cache.meshes.get(meshCacheKey);
		const geometry = mesh.geometry;
		let mode;
		if (mesh.isLineSegments) mode = WEBGL_CONSTANTS.LINES;
		else if (mesh.isLineLoop) mode = WEBGL_CONSTANTS.LINE_LOOP;
		else if (mesh.isLine) mode = WEBGL_CONSTANTS.LINE_STRIP;
		else if (mesh.isPoints) mode = WEBGL_CONSTANTS.POINTS;
		else mode = mesh.material.wireframe ? WEBGL_CONSTANTS.LINES : WEBGL_CONSTANTS.TRIANGLES;
		const meshDef = {};
		const attributes = {};
		const primitives = [];
		const targets = [];
		const nameConversion = {
			uv: "TEXCOORD_0",
			uv1: "TEXCOORD_1",
			uv2: "TEXCOORD_2",
			uv3: "TEXCOORD_3",
			color: "COLOR_0",
			skinWeight: "WEIGHTS_0",
			skinIndex: "JOINTS_0"
		};
		const originalNormal = geometry.getAttribute("normal");
		if (originalNormal !== void 0 && !this.isNormalizedNormalAttribute(originalNormal)) {
			console.warn("THREE.GLTFExporter: Creating normalized normal attribute from the non-normalized one.");
			geometry.setAttribute("normal", this.createNormalizedNormalAttribute(originalNormal));
		}
		let modifiedAttribute = null;
		for (let attributeName in geometry.attributes) {
			if (attributeName.slice(0, 5) === "morph") continue;
			const attribute = geometry.attributes[attributeName];
			attributeName = nameConversion[attributeName] || attributeName.toUpperCase();
			if (!/^(POSITION|NORMAL|TANGENT|TEXCOORD_\d+|COLOR_\d+|JOINTS_\d+|WEIGHTS_\d+)$/.test(attributeName) && !attributeName.startsWith("_")) attributeName = "_" + attributeName;
			if (cache.attributes.has(this.getUID(attribute))) {
				attributes[attributeName] = cache.attributes.get(this.getUID(attribute));
				continue;
			}
			modifiedAttribute = null;
			const array = attribute.array;
			if (attributeName === "JOINTS_0" && !(array instanceof Uint16Array) && !(array instanceof Uint8Array)) {
				console.warn("GLTFExporter: Attribute \"skinIndex\" converted to type UNSIGNED_SHORT.");
				modifiedAttribute = GLTFExporter.Utils.toTypedBufferAttribute(attribute, Uint16Array);
			} else if ((array instanceof Uint32Array || array instanceof Int32Array) && !attributeName.startsWith("_")) {
				console.warn(`GLTFExporter: Attribute "${attributeName}" converted to type FLOAT.`);
				modifiedAttribute = GLTFExporter.Utils.toTypedBufferAttribute(attribute, Float32Array);
			}
			const accessor = this.processAccessor(modifiedAttribute || attribute, geometry);
			if (accessor !== null) {
				if (!attributeName.startsWith("_")) this.detectMeshQuantization(attributeName, attribute);
				attributes[attributeName] = accessor;
				cache.attributes.set(this.getUID(attribute), accessor);
			}
		}
		if (originalNormal !== void 0) geometry.setAttribute("normal", originalNormal);
		if (Object.keys(attributes).length === 0) return null;
		if (mesh.morphTargetInfluences !== void 0 && mesh.morphTargetInfluences.length > 0) {
			const weights = [];
			const targetNames = [];
			const reverseDictionary = {};
			if (mesh.morphTargetDictionary !== void 0) for (const key in mesh.morphTargetDictionary) reverseDictionary[mesh.morphTargetDictionary[key]] = key;
			for (let i = 0; i < mesh.morphTargetInfluences.length; ++i) {
				const target = {};
				let warned = false;
				for (const attributeName in geometry.morphAttributes) {
					if (attributeName !== "position" && attributeName !== "normal") {
						if (!warned) {
							console.warn("GLTFExporter: Only POSITION and NORMAL morph are supported.");
							warned = true;
						}
						continue;
					}
					const attribute = geometry.morphAttributes[attributeName][i];
					const gltfAttributeName = attributeName.toUpperCase();
					const baseAttribute = geometry.attributes[attributeName];
					if (cache.attributes.has(this.getUID(attribute, true))) {
						target[gltfAttributeName] = cache.attributes.get(this.getUID(attribute, true));
						continue;
					}
					const relativeAttribute = attribute.clone();
					if (!geometry.morphTargetsRelative) for (let j = 0, jl = attribute.count; j < jl; j++) for (let a = 0; a < attribute.itemSize; a++) {
						if (a === 0) relativeAttribute.setX(j, attribute.getX(j) - baseAttribute.getX(j));
						if (a === 1) relativeAttribute.setY(j, attribute.getY(j) - baseAttribute.getY(j));
						if (a === 2) relativeAttribute.setZ(j, attribute.getZ(j) - baseAttribute.getZ(j));
						if (a === 3) relativeAttribute.setW(j, attribute.getW(j) - baseAttribute.getW(j));
					}
					target[gltfAttributeName] = this.processAccessor(relativeAttribute, geometry);
					cache.attributes.set(this.getUID(baseAttribute, true), target[gltfAttributeName]);
				}
				targets.push(target);
				weights.push(mesh.morphTargetInfluences[i]);
				if (mesh.morphTargetDictionary !== void 0) targetNames.push(reverseDictionary[i]);
			}
			meshDef.weights = weights;
			if (targetNames.length > 0) {
				meshDef.extras = {};
				meshDef.extras.targetNames = targetNames;
			}
		}
		const isMultiMaterial = Array.isArray(mesh.material);
		if (isMultiMaterial && geometry.groups.length === 0) return null;
		let didForceIndices = false;
		if (isMultiMaterial && geometry.index === null) {
			const indices = [];
			for (let i = 0, il = geometry.attributes.position.count; i < il; i++) indices[i] = i;
			geometry.setIndex(indices);
			didForceIndices = true;
		}
		const materials = isMultiMaterial ? mesh.material : [mesh.material];
		const groups = isMultiMaterial ? geometry.groups : [{
			materialIndex: 0,
			start: void 0,
			count: void 0
		}];
		for (let i = 0, il = groups.length; i < il; i++) {
			const primitive = {
				mode,
				attributes
			};
			this.serializeUserData(geometry, primitive);
			if (targets.length > 0) primitive.targets = targets;
			if (geometry.index !== null) {
				let cacheKey = this.getUID(geometry.index);
				if (groups[i].start !== void 0 || groups[i].count !== void 0) cacheKey += ":" + groups[i].start + ":" + groups[i].count;
				if (cache.attributes.has(cacheKey)) primitive.indices = cache.attributes.get(cacheKey);
				else {
					primitive.indices = this.processAccessor(geometry.index, geometry, groups[i].start, groups[i].count);
					cache.attributes.set(cacheKey, primitive.indices);
				}
				if (primitive.indices === null) delete primitive.indices;
			}
			const material = await this.processMaterialAsync(materials[groups[i].materialIndex], geometry);
			if (material !== null) primitive.material = material;
			primitives.push(primitive);
		}
		if (didForceIndices === true) geometry.setIndex(null);
		meshDef.primitives = primitives;
		if (!json.meshes) json.meshes = [];
		await this._invokeAllAsync(function(ext) {
			ext.writeMesh && ext.writeMesh(mesh, meshDef);
		});
		const index = json.meshes.push(meshDef) - 1;
		cache.meshes.set(meshCacheKey, index);
		return index;
	}
	/**
	* If a vertex attribute with a
	* [non-standard data type](https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html#meshes-overview)
	* is used, it is checked whether it is a valid data type according to the
	* [KHR_mesh_quantization](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_mesh_quantization/README.md)
	* extension.
	* In this case the extension is automatically added to the list of used extensions.
	*
	* @param {string} attributeName
	* @param {THREE.BufferAttribute} attribute
	*/
	detectMeshQuantization(attributeName, attribute) {
		if (this.extensionsUsed[KHR_MESH_QUANTIZATION]) return;
		let attrType = void 0;
		switch (attribute.array.constructor) {
			case Int8Array:
				attrType = "byte";
				break;
			case Uint8Array:
				attrType = "unsigned byte";
				break;
			case Int16Array:
				attrType = "short";
				break;
			case Uint16Array:
				attrType = "unsigned short";
				break;
			default: return;
		}
		if (attribute.normalized) attrType += " normalized";
		const attrNamePrefix = attributeName.split("_", 1)[0];
		if (KHR_mesh_quantization_ExtraAttrTypes[attrNamePrefix] && KHR_mesh_quantization_ExtraAttrTypes[attrNamePrefix].includes(attrType)) {
			this.extensionsUsed[KHR_MESH_QUANTIZATION] = true;
			this.extensionsRequired[KHR_MESH_QUANTIZATION] = true;
		}
	}
	/**
	* Process camera
	* @param {THREE.Camera} camera Camera to process
	* @return {number} Index of the processed mesh in the "camera" array
	*/
	processCamera(camera) {
		const json = this.json;
		if (!json.cameras) json.cameras = [];
		const isOrtho = camera.isOrthographicCamera;
		const cameraDef = { type: isOrtho ? "orthographic" : "perspective" };
		if (isOrtho) cameraDef.orthographic = {
			xmag: camera.right,
			ymag: camera.top,
			zfar: camera.far <= 0 ? .001 : camera.far,
			znear: camera.near < 0 ? 0 : camera.near
		};
		else cameraDef.perspective = {
			aspectRatio: camera.aspect,
			yfov: MathUtils.degToRad(camera.fov),
			zfar: camera.far <= 0 ? .001 : camera.far,
			znear: camera.near < 0 ? 0 : camera.near
		};
		if (camera.name !== "") cameraDef.name = camera.type;
		return json.cameras.push(cameraDef) - 1;
	}
	/**
	* Creates glTF animation entry from AnimationClip object.
	*
	* Status:
	* - Only properties listed in PATH_PROPERTIES may be animated.
	*
	* @param {THREE.AnimationClip} clip
	* @param {THREE.Object3D} root
	* @return {?number}
	*/
	processAnimation(clip, root) {
		const json = this.json;
		const nodeMap = this.nodeMap;
		if (!json.animations) json.animations = [];
		clip = GLTFExporter.Utils.mergeMorphTargetTracks(clip.clone(), root);
		const tracks = clip.tracks;
		const channels = [];
		const samplers = [];
		for (let i = 0; i < tracks.length; ++i) {
			const track = tracks[i];
			const trackBinding = PropertyBinding.parseTrackName(track.name);
			let trackNode = PropertyBinding.findNode(root, trackBinding.nodeName);
			const trackProperty = PATH_PROPERTIES[trackBinding.propertyName];
			if (trackBinding.objectName === "bones") {
				if (trackNode.isSkinnedMesh === true) trackNode = trackNode.skeleton.getBoneByName(trackBinding.objectIndex);
				else trackNode = void 0;
			}
			if (!trackNode || !trackProperty) {
				console.warn("THREE.GLTFExporter: Could not export animation track \"%s\".", track.name);
				continue;
			}
			const inputItemSize = 1;
			let outputItemSize = track.values.length / track.times.length;
			if (trackProperty === PATH_PROPERTIES.morphTargetInfluences) outputItemSize /= trackNode.morphTargetInfluences.length;
			let interpolation;
			if (track.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline === true) {
				interpolation = "CUBICSPLINE";
				outputItemSize /= 3;
			} else if (track.getInterpolation() === 2300) interpolation = "STEP";
			else interpolation = "LINEAR";
			samplers.push({
				input: this.processAccessor(new BufferAttribute(track.times, inputItemSize)),
				output: this.processAccessor(new BufferAttribute(track.values, outputItemSize)),
				interpolation
			});
			channels.push({
				sampler: samplers.length - 1,
				target: {
					node: nodeMap.get(trackNode),
					path: trackProperty
				}
			});
		}
		const animationDef = {
			name: clip.name || "clip_" + json.animations.length,
			samplers,
			channels
		};
		this.serializeUserData(clip, animationDef);
		json.animations.push(animationDef);
		return json.animations.length - 1;
	}
	/**
	* @param {THREE.Object3D} object
	* @return {?number}
	*/
	processSkin(object) {
		const json = this.json;
		const nodeMap = this.nodeMap;
		const node = json.nodes[nodeMap.get(object)];
		const skeleton = object.skeleton;
		if (skeleton === void 0) return null;
		const rootJoint = object.skeleton.bones[0];
		if (rootJoint === void 0) return null;
		const joints = [];
		const inverseBindMatrices = new Float32Array(skeleton.bones.length * 16);
		const temporaryBoneInverse = new Matrix4();
		for (let i = 0; i < skeleton.bones.length; ++i) {
			joints.push(nodeMap.get(skeleton.bones[i]));
			temporaryBoneInverse.copy(skeleton.boneInverses[i]);
			temporaryBoneInverse.multiply(object.bindMatrix).toArray(inverseBindMatrices, i * 16);
		}
		if (json.skins === void 0) json.skins = [];
		json.skins.push({
			inverseBindMatrices: this.processAccessor(new BufferAttribute(inverseBindMatrices, 16)),
			joints,
			skeleton: nodeMap.get(rootJoint)
		});
		return node.skin = json.skins.length - 1;
	}
	/**
	* Process Object3D node
	* @param {THREE.Object3D} object Object3D to processNodeAsync
	* @return {Promise<number>} Index of the node in the nodes list
	*/
	async processNodeAsync(object) {
		const json = this.json;
		const options = this.options;
		const nodeMap = this.nodeMap;
		if (!json.nodes) json.nodes = [];
		if (object.pivot !== null) return await this._processNodeWithPivotAsync(object);
		const nodeDef = {};
		if (options.trs) {
			const rotation = object.quaternion.toArray();
			const position = object.position.toArray();
			const scale = object.scale.toArray();
			if (!equalArray(rotation, [
				0,
				0,
				0,
				1
			])) nodeDef.rotation = rotation;
			if (!equalArray(position, [
				0,
				0,
				0
			])) nodeDef.translation = position;
			if (!equalArray(scale, [
				1,
				1,
				1
			])) nodeDef.scale = scale;
		} else {
			if (object.matrixAutoUpdate) object.updateMatrix();
			if (isIdentityMatrix(object.matrix) === false) nodeDef.matrix = object.matrix.elements;
		}
		if (object.name !== "") nodeDef.name = String(object.name);
		this.serializeUserData(object, nodeDef);
		if (object.isMesh || object.isLine || object.isPoints) {
			const meshIndex = await this.processMeshAsync(object);
			if (meshIndex !== null) nodeDef.mesh = meshIndex;
		} else if (object.isCamera) nodeDef.camera = this.processCamera(object);
		if (object.isSkinnedMesh) this.skins.push(object);
		const nodeIndex = json.nodes.push(nodeDef) - 1;
		nodeMap.set(object, nodeIndex);
		if (object.children.length > 0) {
			const children = [];
			for (let i = 0, l = object.children.length; i < l; i++) {
				const child = object.children[i];
				if (child.visible || options.onlyVisible === false) {
					const childNodeIndex = await this.processNodeAsync(child);
					if (childNodeIndex !== null) children.push(childNodeIndex);
				}
			}
			if (children.length > 0) nodeDef.children = children;
		}
		await this._invokeAllAsync(function(ext) {
			ext.writeNode && ext.writeNode(object, nodeDef);
		});
		return nodeIndex;
	}
	/**
	* Process Object3D node with pivot using container approach
	* @param {THREE.Object3D} object Object3D with pivot
	* @return {Promise<number>} Index of the container node
	*/
	async _processNodeWithPivotAsync(object) {
		const json = this.json;
		const options = this.options;
		const nodeMap = this.nodeMap;
		const pivot = object.pivot;
		const containerDef = {};
		const rotation = object.quaternion.toArray();
		const position = [
			object.position.x + pivot.x,
			object.position.y + pivot.y,
			object.position.z + pivot.z
		];
		const scale = object.scale.toArray();
		if (!equalArray(rotation, [
			0,
			0,
			0,
			1
		])) containerDef.rotation = rotation;
		if (!equalArray(position, [
			0,
			0,
			0
		])) containerDef.translation = position;
		if (!equalArray(scale, [
			1,
			1,
			1
		])) containerDef.scale = scale;
		containerDef.extras = { pivot: pivot.toArray() };
		if (object.name !== "") containerDef.name = String(object.name);
		this.serializeUserData(object, containerDef);
		const containerIndex = json.nodes.push(containerDef) - 1;
		nodeMap.set(object, containerIndex);
		const childDef = {};
		const childPosition = [
			-pivot.x,
			-pivot.y,
			-pivot.z
		];
		if (!equalArray(childPosition, [
			0,
			0,
			0
		])) childDef.translation = childPosition;
		if (object.isMesh || object.isLine || object.isPoints) {
			const meshIndex = await this.processMeshAsync(object);
			if (meshIndex !== null) childDef.mesh = meshIndex;
		} else if (object.isCamera) childDef.camera = this.processCamera(object);
		if (object.isSkinnedMesh) this.skins.push(object);
		const containerChildren = [json.nodes.push(childDef) - 1];
		if (object.children.length > 0) {
			const grandchildren = [];
			for (let i = 0, l = object.children.length; i < l; i++) {
				const child = object.children[i];
				if (child.visible || options.onlyVisible === false) {
					const childNodeIndex = await this.processNodeAsync(child);
					if (childNodeIndex !== null) grandchildren.push(childNodeIndex);
				}
			}
			if (grandchildren.length > 0) childDef.children = grandchildren;
		}
		containerDef.children = containerChildren;
		await this._invokeAllAsync(function(ext) {
			ext.writeNode && ext.writeNode(object, containerDef);
		});
		return containerIndex;
	}
	/**
	* Process Scene
	* @param {Scene} scene Scene to process
	*/
	async processSceneAsync(scene) {
		const json = this.json;
		const options = this.options;
		if (!json.scenes) {
			json.scenes = [];
			json.scene = 0;
		}
		const sceneDef = {};
		if (scene.name !== "") sceneDef.name = scene.name;
		json.scenes.push(sceneDef);
		const nodes = [];
		for (let i = 0, l = scene.children.length; i < l; i++) {
			const child = scene.children[i];
			if (child.visible || options.onlyVisible === false) {
				const nodeIndex = await this.processNodeAsync(child);
				if (nodeIndex !== null) nodes.push(nodeIndex);
			}
		}
		if (nodes.length > 0) sceneDef.nodes = nodes;
		this.serializeUserData(scene, sceneDef);
	}
	/**
	* Creates a Scene to hold a list of objects and parse it
	* @param {Array<THREE.Object3D>} objects List of objects to process
	*/
	async processObjectsAsync(objects) {
		const scene = new Scene();
		scene.name = "AuxScene";
		for (let i = 0; i < objects.length; i++) scene.children.push(objects[i]);
		await this.processSceneAsync(scene);
	}
	/**
	* @param {THREE.Object3D|Array<THREE.Object3D>} input
	*/
	async processInputAsync(input) {
		const options = this.options;
		input = input instanceof Array ? input : [input];
		await this._invokeAllAsync(function(ext) {
			ext.beforeParse && ext.beforeParse(input);
		});
		const objectsWithoutScene = [];
		for (let i = 0; i < input.length; i++) if (input[i] instanceof Scene) await this.processSceneAsync(input[i]);
		else objectsWithoutScene.push(input[i]);
		if (objectsWithoutScene.length > 0) await this.processObjectsAsync(objectsWithoutScene);
		for (let i = 0; i < this.skins.length; ++i) this.processSkin(this.skins[i]);
		if (input.length === 1) for (let i = 0; i < options.animations.length; ++i) this.processAnimation(options.animations[i], input[0]);
		else for (let i = 0; i < input.length; i++) {
			const animations = options.animations[i] || [];
			for (let j = 0; j < animations.length; ++j) this.processAnimation(animations[j], input[i]);
		}
		await this._invokeAllAsync(function(ext) {
			ext.afterParse && ext.afterParse(input);
		});
	}
	async _invokeAllAsync(func) {
		for (let i = 0, il = this.plugins.length; i < il; i++) await func(this.plugins[i]);
	}
};
/**
* Punctual Lights Extension
*
* Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_lights_punctual
*
* @private
*/
var GLTFLightExtension = class {
	constructor(writer) {
		this.writer = writer;
		this.name = "KHR_lights_punctual";
	}
	writeNode(light, nodeDef) {
		if (!light.isLight) return;
		if (!light.isDirectionalLight && !light.isPointLight && !light.isSpotLight) {
			console.warn("THREE.GLTFExporter: Only directional, point, and spot lights are supported.", light);
			return;
		}
		const writer = this.writer;
		const json = writer.json;
		const extensionsUsed = writer.extensionsUsed;
		const lightDef = {};
		if (light.name) lightDef.name = light.name;
		lightDef.color = light.color.toArray();
		lightDef.intensity = light.intensity;
		if (light.isDirectionalLight) lightDef.type = "directional";
		else if (light.isPointLight) {
			lightDef.type = "point";
			if (light.distance > 0) lightDef.range = light.distance;
		} else if (light.isSpotLight) {
			lightDef.type = "spot";
			if (light.distance > 0) lightDef.range = light.distance;
			lightDef.spot = {};
			lightDef.spot.innerConeAngle = (1 - light.penumbra) * light.angle;
			lightDef.spot.outerConeAngle = light.angle;
		}
		if (light.decay !== void 0 && light.decay !== 2) console.warn("THREE.GLTFExporter: Light decay may be lost. glTF is physically-based, and expects light.decay=2.");
		if (light.target && (light.target.parent !== light || light.target.position.x !== 0 || light.target.position.y !== 0 || light.target.position.z !== -1)) console.warn("THREE.GLTFExporter: Light direction may be lost. For best results, make light.target a child of the light with position 0,0,-1.");
		if (!extensionsUsed[this.name]) {
			json.extensions = json.extensions || {};
			json.extensions[this.name] = { lights: [] };
			extensionsUsed[this.name] = true;
		}
		const lights = json.extensions[this.name].lights;
		lights.push(lightDef);
		nodeDef.extensions = nodeDef.extensions || {};
		nodeDef.extensions[this.name] = { light: lights.length - 1 };
	}
};
/**
* Unlit Materials Extension
*
* Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_unlit
*
* @private
*/
var GLTFMaterialsUnlitExtension = class {
	constructor(writer) {
		this.writer = writer;
		this.name = "KHR_materials_unlit";
	}
	async writeMaterialAsync(material, materialDef) {
		if (!material.isMeshBasicMaterial) return;
		const extensionsUsed = this.writer.extensionsUsed;
		materialDef.extensions = materialDef.extensions || {};
		materialDef.extensions[this.name] = {};
		extensionsUsed[this.name] = true;
		materialDef.pbrMetallicRoughness.metallicFactor = 0;
		materialDef.pbrMetallicRoughness.roughnessFactor = .9;
	}
};
/**
* Clearcoat Materials Extension
*
* Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_clearcoat
*
* @private
*/
var GLTFMaterialsClearcoatExtension = class {
	constructor(writer) {
		this.writer = writer;
		this.name = "KHR_materials_clearcoat";
	}
	async writeMaterialAsync(material, materialDef) {
		if (!material.isMeshPhysicalMaterial || material.clearcoat === 0) return;
		const writer = this.writer;
		const extensionsUsed = writer.extensionsUsed;
		const extensionDef = {};
		extensionDef.clearcoatFactor = material.clearcoat;
		if (material.clearcoatMap) {
			const clearcoatMapDef = {
				index: await writer.processTextureAsync(material.clearcoatMap),
				texCoord: material.clearcoatMap.channel
			};
			writer.applyTextureTransform(clearcoatMapDef, material.clearcoatMap);
			extensionDef.clearcoatTexture = clearcoatMapDef;
		}
		extensionDef.clearcoatRoughnessFactor = material.clearcoatRoughness;
		if (material.clearcoatRoughnessMap) {
			const clearcoatRoughnessMapDef = {
				index: await writer.processTextureAsync(material.clearcoatRoughnessMap),
				texCoord: material.clearcoatRoughnessMap.channel
			};
			writer.applyTextureTransform(clearcoatRoughnessMapDef, material.clearcoatRoughnessMap);
			extensionDef.clearcoatRoughnessTexture = clearcoatRoughnessMapDef;
		}
		if (material.clearcoatNormalMap) {
			const clearcoatNormalMapDef = {
				index: await writer.processTextureAsync(material.clearcoatNormalMap),
				texCoord: material.clearcoatNormalMap.channel
			};
			if (material.clearcoatNormalScale.x !== 1) clearcoatNormalMapDef.scale = material.clearcoatNormalScale.x;
			writer.applyTextureTransform(clearcoatNormalMapDef, material.clearcoatNormalMap);
			extensionDef.clearcoatNormalTexture = clearcoatNormalMapDef;
		}
		materialDef.extensions = materialDef.extensions || {};
		materialDef.extensions[this.name] = extensionDef;
		extensionsUsed[this.name] = true;
	}
};
/**
* Materials dispersion Extension
*
* Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_dispersion
*
* @private
*/
var GLTFMaterialsDispersionExtension = class {
	constructor(writer) {
		this.writer = writer;
		this.name = "KHR_materials_dispersion";
	}
	async writeMaterialAsync(material, materialDef) {
		if (!material.isMeshPhysicalMaterial || material.dispersion === 0) return;
		const extensionsUsed = this.writer.extensionsUsed;
		const extensionDef = {};
		extensionDef.dispersion = material.dispersion;
		materialDef.extensions = materialDef.extensions || {};
		materialDef.extensions[this.name] = extensionDef;
		extensionsUsed[this.name] = true;
	}
};
/**
* Iridescence Materials Extension
*
* Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_iridescence
*
* @private
*/
var GLTFMaterialsIridescenceExtension = class {
	constructor(writer) {
		this.writer = writer;
		this.name = "KHR_materials_iridescence";
	}
	async writeMaterialAsync(material, materialDef) {
		if (!material.isMeshPhysicalMaterial || material.iridescence === 0) return;
		const writer = this.writer;
		const extensionsUsed = writer.extensionsUsed;
		const extensionDef = {};
		extensionDef.iridescenceFactor = material.iridescence;
		if (material.iridescenceMap) {
			const iridescenceMapDef = {
				index: await writer.processTextureAsync(material.iridescenceMap),
				texCoord: material.iridescenceMap.channel
			};
			writer.applyTextureTransform(iridescenceMapDef, material.iridescenceMap);
			extensionDef.iridescenceTexture = iridescenceMapDef;
		}
		extensionDef.iridescenceIor = material.iridescenceIOR;
		extensionDef.iridescenceThicknessMinimum = material.iridescenceThicknessMinimum;
		extensionDef.iridescenceThicknessMaximum = material.iridescenceThicknessMaximum;
		if (material.iridescenceThicknessMap) {
			const iridescenceThicknessMapDef = {
				index: await writer.processTextureAsync(material.iridescenceThicknessMap),
				texCoord: material.iridescenceThicknessMap.channel
			};
			writer.applyTextureTransform(iridescenceThicknessMapDef, material.iridescenceThicknessMap);
			extensionDef.iridescenceThicknessTexture = iridescenceThicknessMapDef;
		}
		materialDef.extensions = materialDef.extensions || {};
		materialDef.extensions[this.name] = extensionDef;
		extensionsUsed[this.name] = true;
	}
};
/**
* Transmission Materials Extension
*
* Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_transmission
*
* @private
*/
var GLTFMaterialsTransmissionExtension = class {
	constructor(writer) {
		this.writer = writer;
		this.name = "KHR_materials_transmission";
	}
	async writeMaterialAsync(material, materialDef) {
		if (!material.isMeshPhysicalMaterial || material.transmission === 0) return;
		const writer = this.writer;
		const extensionsUsed = writer.extensionsUsed;
		const extensionDef = {};
		extensionDef.transmissionFactor = material.transmission;
		if (material.transmissionMap) {
			const transmissionMapDef = {
				index: await writer.processTextureAsync(material.transmissionMap),
				texCoord: material.transmissionMap.channel
			};
			writer.applyTextureTransform(transmissionMapDef, material.transmissionMap);
			extensionDef.transmissionTexture = transmissionMapDef;
		}
		materialDef.extensions = materialDef.extensions || {};
		materialDef.extensions[this.name] = extensionDef;
		extensionsUsed[this.name] = true;
	}
};
/**
* Materials Volume Extension
*
* Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_volume
*
* @private
*/
var GLTFMaterialsVolumeExtension = class {
	constructor(writer) {
		this.writer = writer;
		this.name = "KHR_materials_volume";
	}
	async writeMaterialAsync(material, materialDef) {
		if (!material.isMeshPhysicalMaterial || material.transmission === 0) return;
		const writer = this.writer;
		const extensionsUsed = writer.extensionsUsed;
		const extensionDef = {};
		extensionDef.thicknessFactor = material.thickness;
		if (material.thicknessMap) {
			const thicknessMapDef = {
				index: await writer.processTextureAsync(material.thicknessMap),
				texCoord: material.thicknessMap.channel
			};
			writer.applyTextureTransform(thicknessMapDef, material.thicknessMap);
			extensionDef.thicknessTexture = thicknessMapDef;
		}
		if (material.attenuationDistance !== Infinity) extensionDef.attenuationDistance = material.attenuationDistance;
		extensionDef.attenuationColor = material.attenuationColor.toArray();
		materialDef.extensions = materialDef.extensions || {};
		materialDef.extensions[this.name] = extensionDef;
		extensionsUsed[this.name] = true;
	}
};
/**
* Materials ior Extension
*
* Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_ior
*
* @private
*/
var GLTFMaterialsIorExtension = class {
	constructor(writer) {
		this.writer = writer;
		this.name = "KHR_materials_ior";
	}
	async writeMaterialAsync(material, materialDef) {
		if (!material.isMeshPhysicalMaterial || material.ior === 1.5) return;
		const extensionsUsed = this.writer.extensionsUsed;
		const extensionDef = {};
		extensionDef.ior = material.ior;
		materialDef.extensions = materialDef.extensions || {};
		materialDef.extensions[this.name] = extensionDef;
		extensionsUsed[this.name] = true;
	}
};
/**
* Materials specular Extension
*
* Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_specular
*
* @private
*/
var GLTFMaterialsSpecularExtension = class {
	constructor(writer) {
		this.writer = writer;
		this.name = "KHR_materials_specular";
	}
	async writeMaterialAsync(material, materialDef) {
		if (!material.isMeshPhysicalMaterial || material.specularIntensity === 1 && material.specularColor.equals(DEFAULT_SPECULAR_COLOR) && !material.specularIntensityMap && !material.specularColorMap) return;
		const writer = this.writer;
		const extensionsUsed = writer.extensionsUsed;
		const extensionDef = {};
		if (material.specularIntensityMap) {
			const specularIntensityMapDef = {
				index: await writer.processTextureAsync(material.specularIntensityMap),
				texCoord: material.specularIntensityMap.channel
			};
			writer.applyTextureTransform(specularIntensityMapDef, material.specularIntensityMap);
			extensionDef.specularTexture = specularIntensityMapDef;
		}
		if (material.specularColorMap) {
			const specularColorMapDef = {
				index: await writer.processTextureAsync(material.specularColorMap),
				texCoord: material.specularColorMap.channel
			};
			writer.applyTextureTransform(specularColorMapDef, material.specularColorMap);
			extensionDef.specularColorTexture = specularColorMapDef;
		}
		extensionDef.specularFactor = material.specularIntensity;
		extensionDef.specularColorFactor = material.specularColor.toArray();
		materialDef.extensions = materialDef.extensions || {};
		materialDef.extensions[this.name] = extensionDef;
		extensionsUsed[this.name] = true;
	}
};
/**
* Sheen Materials Extension
*
* Specification: https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_sheen
*
* @private
*/
var GLTFMaterialsSheenExtension = class {
	constructor(writer) {
		this.writer = writer;
		this.name = "KHR_materials_sheen";
	}
	async writeMaterialAsync(material, materialDef) {
		if (!material.isMeshPhysicalMaterial || material.sheen == 0) return;
		const writer = this.writer;
		const extensionsUsed = writer.extensionsUsed;
		const extensionDef = {};
		if (material.sheenRoughnessMap) {
			const sheenRoughnessMapDef = {
				index: await writer.processTextureAsync(material.sheenRoughnessMap),
				texCoord: material.sheenRoughnessMap.channel
			};
			writer.applyTextureTransform(sheenRoughnessMapDef, material.sheenRoughnessMap);
			extensionDef.sheenRoughnessTexture = sheenRoughnessMapDef;
		}
		if (material.sheenColorMap) {
			const sheenColorMapDef = {
				index: await writer.processTextureAsync(material.sheenColorMap),
				texCoord: material.sheenColorMap.channel
			};
			writer.applyTextureTransform(sheenColorMapDef, material.sheenColorMap);
			extensionDef.sheenColorTexture = sheenColorMapDef;
		}
		extensionDef.sheenRoughnessFactor = material.sheenRoughness;
		extensionDef.sheenColorFactor = material.sheenColor.toArray();
		materialDef.extensions = materialDef.extensions || {};
		materialDef.extensions[this.name] = extensionDef;
		extensionsUsed[this.name] = true;
	}
};
/**
* Anisotropy Materials Extension
*
* Specification: https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_anisotropy
*
* @private
*/
var GLTFMaterialsAnisotropyExtension = class {
	constructor(writer) {
		this.writer = writer;
		this.name = "KHR_materials_anisotropy";
	}
	async writeMaterialAsync(material, materialDef) {
		if (!material.isMeshPhysicalMaterial || material.anisotropy == 0) return;
		const writer = this.writer;
		const extensionsUsed = writer.extensionsUsed;
		const extensionDef = {};
		if (material.anisotropyMap) {
			const anisotropyMapDef = { index: await writer.processTextureAsync(material.anisotropyMap) };
			writer.applyTextureTransform(anisotropyMapDef, material.anisotropyMap);
			extensionDef.anisotropyTexture = anisotropyMapDef;
		}
		extensionDef.anisotropyStrength = material.anisotropy;
		extensionDef.anisotropyRotation = material.anisotropyRotation;
		materialDef.extensions = materialDef.extensions || {};
		materialDef.extensions[this.name] = extensionDef;
		extensionsUsed[this.name] = true;
	}
};
/**
* Materials Emissive Strength Extension
*
* Specification: https://github.com/KhronosGroup/glTF/blob/5768b3ce0ef32bc39cdf1bef10b948586635ead3/extensions/2.0/Khronos/KHR_materials_emissive_strength/README.md
*
* @private
*/
var GLTFMaterialsEmissiveStrengthExtension = class {
	constructor(writer) {
		this.writer = writer;
		this.name = "KHR_materials_emissive_strength";
	}
	async writeMaterialAsync(material, materialDef) {
		if (!material.isMeshStandardMaterial || material.emissiveIntensity === 1) return;
		const extensionsUsed = this.writer.extensionsUsed;
		const extensionDef = {};
		extensionDef.emissiveStrength = material.emissiveIntensity;
		materialDef.extensions = materialDef.extensions || {};
		materialDef.extensions[this.name] = extensionDef;
		extensionsUsed[this.name] = true;
	}
};
/**
* Materials bump Extension
*
* Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/EXT_materials_bump
*
* @private
*/
var GLTFMaterialsBumpExtension = class {
	constructor(writer) {
		this.writer = writer;
		this.name = "EXT_materials_bump";
	}
	async writeMaterialAsync(material, materialDef) {
		if (!material.isMeshStandardMaterial || material.bumpScale === 1 && !material.bumpMap) return;
		const writer = this.writer;
		const extensionsUsed = writer.extensionsUsed;
		const extensionDef = {};
		if (material.bumpMap) {
			const bumpMapDef = {
				index: await writer.processTextureAsync(material.bumpMap),
				texCoord: material.bumpMap.channel
			};
			writer.applyTextureTransform(bumpMapDef, material.bumpMap);
			extensionDef.bumpTexture = bumpMapDef;
		}
		extensionDef.bumpFactor = material.bumpScale;
		materialDef.extensions = materialDef.extensions || {};
		materialDef.extensions[this.name] = extensionDef;
		extensionsUsed[this.name] = true;
	}
};
/**
* GPU Instancing Extension
*
* Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Vendor/EXT_mesh_gpu_instancing
*
* @private
*/
var GLTFMeshGpuInstancing = class {
	constructor(writer) {
		this.writer = writer;
		this.name = "EXT_mesh_gpu_instancing";
	}
	writeNode(object, nodeDef) {
		if (!object.isInstancedMesh) return;
		const writer = this.writer;
		const mesh = object;
		const translationAttr = new Float32Array(mesh.count * 3);
		const rotationAttr = new Float32Array(mesh.count * 4);
		const scaleAttr = new Float32Array(mesh.count * 3);
		const matrix = new Matrix4();
		const position = new Vector3();
		const quaternion = new Quaternion();
		const scale = new Vector3();
		for (let i = 0; i < mesh.count; i++) {
			mesh.getMatrixAt(i, matrix);
			matrix.decompose(position, quaternion, scale);
			position.toArray(translationAttr, i * 3);
			quaternion.toArray(rotationAttr, i * 4);
			scale.toArray(scaleAttr, i * 3);
		}
		const attributes = {
			TRANSLATION: writer.processAccessor(new BufferAttribute(translationAttr, 3)),
			ROTATION: writer.processAccessor(new BufferAttribute(rotationAttr, 4)),
			SCALE: writer.processAccessor(new BufferAttribute(scaleAttr, 3))
		};
		if (mesh.instanceColor) attributes._COLOR_0 = writer.processAccessor(mesh.instanceColor);
		nodeDef.extensions = nodeDef.extensions || {};
		nodeDef.extensions[this.name] = { attributes };
		writer.extensionsUsed[this.name] = true;
		writer.extensionsRequired[this.name] = true;
	}
};
/**
* Static utility functions
*
* @private
*/
GLTFExporter.Utils = {
	insertKeyframe: function(track, time) {
		const tolerance = .001;
		const valueSize = track.getValueSize();
		const times = new track.TimeBufferType(track.times.length + 1);
		const values = new track.ValueBufferType(track.values.length + valueSize);
		const interpolant = track.createInterpolant(new track.ValueBufferType(valueSize));
		let index;
		if (track.times.length === 0) {
			times[0] = time;
			for (let i = 0; i < valueSize; i++) values[i] = 0;
			index = 0;
		} else if (time < track.times[0]) {
			if (Math.abs(track.times[0] - time) < tolerance) return 0;
			times[0] = time;
			times.set(track.times, 1);
			values.set(interpolant.evaluate(time), 0);
			values.set(track.values, valueSize);
			index = 0;
		} else if (time > track.times[track.times.length - 1]) {
			if (Math.abs(track.times[track.times.length - 1] - time) < tolerance) return track.times.length - 1;
			times[times.length - 1] = time;
			times.set(track.times, 0);
			values.set(track.values, 0);
			values.set(interpolant.evaluate(time), track.values.length);
			index = times.length - 1;
		} else for (let i = 0; i < track.times.length; i++) {
			if (Math.abs(track.times[i] - time) < tolerance) return i;
			if (track.times[i] < time && track.times[i + 1] > time) {
				times.set(track.times.slice(0, i + 1), 0);
				times[i + 1] = time;
				times.set(track.times.slice(i + 1), i + 2);
				values.set(track.values.slice(0, (i + 1) * valueSize), 0);
				values.set(interpolant.evaluate(time), (i + 1) * valueSize);
				values.set(track.values.slice((i + 1) * valueSize), (i + 2) * valueSize);
				index = i + 1;
				break;
			}
		}
		track.times = times;
		track.values = values;
		return index;
	},
	mergeMorphTargetTracks: function(clip, root) {
		const tracks = [];
		const mergedTracks = {};
		const sourceTracks = clip.tracks;
		for (let i = 0; i < sourceTracks.length; ++i) {
			let sourceTrack = sourceTracks[i];
			const sourceTrackBinding = PropertyBinding.parseTrackName(sourceTrack.name);
			const sourceTrackNode = PropertyBinding.findNode(root, sourceTrackBinding.nodeName);
			if (sourceTrackBinding.propertyName !== "morphTargetInfluences" || sourceTrackBinding.propertyIndex === void 0) {
				tracks.push(sourceTrack);
				continue;
			}
			if (sourceTrack.createInterpolant !== sourceTrack.InterpolantFactoryMethodDiscrete && sourceTrack.createInterpolant !== sourceTrack.InterpolantFactoryMethodLinear) {
				if (sourceTrack.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline) throw new Error("THREE.GLTFExporter: Cannot merge tracks with glTF CUBICSPLINE interpolation.");
				console.warn("THREE.GLTFExporter: Morph target interpolation mode not yet supported. Using LINEAR instead.");
				sourceTrack = sourceTrack.clone();
				sourceTrack.setInterpolation(InterpolateLinear);
			}
			const targetCount = sourceTrackNode.morphTargetInfluences.length;
			const targetIndex = sourceTrackNode.morphTargetDictionary[sourceTrackBinding.propertyIndex];
			if (targetIndex === void 0) throw new Error("THREE.GLTFExporter: Morph target name not found: " + sourceTrackBinding.propertyIndex);
			let mergedTrack;
			if (mergedTracks[sourceTrackNode.uuid] === void 0) {
				mergedTrack = sourceTrack.clone();
				const values = new mergedTrack.ValueBufferType(targetCount * mergedTrack.times.length);
				for (let j = 0; j < mergedTrack.times.length; j++) values[j * targetCount + targetIndex] = mergedTrack.values[j];
				mergedTrack.name = (sourceTrackBinding.nodeName || "") + ".morphTargetInfluences";
				mergedTrack.values = values;
				mergedTracks[sourceTrackNode.uuid] = mergedTrack;
				tracks.push(mergedTrack);
				continue;
			}
			const sourceInterpolant = sourceTrack.createInterpolant(new sourceTrack.ValueBufferType(1));
			mergedTrack = mergedTracks[sourceTrackNode.uuid];
			for (let j = 0; j < mergedTrack.times.length; j++) mergedTrack.values[j * targetCount + targetIndex] = sourceInterpolant.evaluate(mergedTrack.times[j]);
			for (let j = 0; j < sourceTrack.times.length; j++) {
				const keyframeIndex = this.insertKeyframe(mergedTrack, sourceTrack.times[j]);
				mergedTrack.values[keyframeIndex * targetCount + targetIndex] = sourceTrack.values[j];
			}
		}
		clip.tracks = tracks;
		return clip;
	},
	toTypedBufferAttribute: function(srcAttribute, TypedArray) {
		const dstAttribute = new BufferAttribute(new TypedArray(srcAttribute.count * srcAttribute.itemSize), srcAttribute.itemSize, false);
		if (!srcAttribute.normalized && !srcAttribute.isInterleavedBufferAttribute) {
			dstAttribute.array.set(srcAttribute.array);
			return dstAttribute;
		}
		for (let i = 0, il = srcAttribute.count; i < il; i++) for (let j = 0; j < srcAttribute.itemSize; j++) dstAttribute.setComponent(i, j, srcAttribute.getComponent(i, j));
		return dstAttribute;
	}
};
//#endregion
export { RenderPass as a, UnrealBloomPass as i, RoomEnvironment as n, EffectComposer as o, BokehPass as r, GLTFExporter_exports as t };
