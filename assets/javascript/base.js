define([ "zepto" ], function( $ ) {

	this.appNS = this.appNS || {};


	var Base = function(){
		console.log( "[Base] CONSTRUCT" );

		appNS._base = this;

		this._init();
	}

	Base.prototype = {


		// scene: null,
		// camera: null,
		// renderer: null,



		_init: function() {

			console.log( "[Base] INIT" );


			// Disable the page scroll
			this._disablePageScroll();

			
			// Createt the Scene
			// this._createScene();
			
			// Create the Camera
			// this._createCamera();

			// Create the Renderer
			// this._createRenderer();

			// Create the Floor
			// this._createFloor();

			// Create the Grid
			// this._createGrid();

			// Create the Light
			// this._createLight();


			// Add any event listeners
			// $( window ).on( 'resize', { self:this }, this._onResize );

			$( document ).on( "load", { self:this }, this._onLoad );
			
			$( "a" ).on( "click", { self:this }, this._onHijackLinks );
			
		},



		_disablePageScroll: function() {

			$( 'body' ).on( 'touchmove', function( e ) { e.preventDefault() });
		},


		_openLink: function() {

			if ( !this._activeLink ) return;

			window.open( this._activeLink, "_self" );
		},


		_onHijackLinks: function( e ) {

			e.preventDefault(); 

			var self = e.data.self;
			var $parent = $( e.target ).parent();
			var href = $parent.attr( "href" );
			
			self._activeLink = href;

			self.hide();

			return false; 
		
		},


		_onLoad: function( e ) {

			var self = e.data.self;

			$( document ).off( "load" )
		},


		// _onResize: function( e ) {

			// var self = e.data.self,
			// 	renderer = self.renderer,
			// 	camera = self.camera;

			// console.log( "[Base] ON RESIZE" );

			// renderer.setSize( window.innerWidth, window.innerHeight );

			// camera.aspect = window.innerWidth / window.innerHeight;
			// camera.updateProjectionMatrix();
		// },


		// _createScene: function() {

		// 	// Create the Scene
		// 	var scene = new THREE.Scene();

		// 	this.scene = scene;
		// },


		// _createCamera: function() {

		// 	// Create the camera
		// 	var camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.10, 100 );
		// 		camera.position.set( 17, 40, 14 );
		// 		camera.lookAt( this.scene.position );

		// 	this.camera = camera;
		// },


		// _createRenderer: function() {

		// 	// Create the renderer
		// 	var renderer = new THREE.WebGLRenderer();
		// 		renderer.setSize( window.innerWidth, window.innerHeight );
		// 		renderer.setClearColor( 0xDDDDDD, 1 );
		// 		renderer.shadowMap.enabled = true;
		// 		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		// 		renderer.antialias = true;
		// 		renderer.setPixelRatio( 1 );

		// 	// Add the renderer to the DOM
		// 	document.body.appendChild( renderer.domElement );

		// 	this.renderer = renderer;
		// },


		// _createFloor: function() {

		// 	var geometry = new THREE.PlaneGeometry( 200, 200, 1, 1 );
		// 	var material = new THREE.MeshStandardMaterial({ color: 0xDDDDDD, emissive: 0xDDDDDD });

		// 	var floor = new THREE.Mesh( geometry, material );
		// 	floor.receiveShadow = true;
		// 	floor.rotation.set( -1.57, 0, 0 );
			
		// 	this.scene.add( floor );
		// },


		// _createGrid: function() {

		// 	var grid = new THREE.GridHelper( 200, 5 );
		// 		grid.setColors( 0xDDDDDD, 0xDDDDDD );
		// 		grid.position.y = 0.1;
				
		// 	this.scene.add( grid );
		// },


		// _createLight: function() {

		// 	var light = new THREE.SpotLight( 0xffffff, 2 );
		// 		light.position.set( 0, 25, 0 );
		// 		light.castShadow = true;
		// 		light.angle = 2;
		// 		light.intensity = 0.25;
		// 		light.penumbra = 1;
		// 		light.decay = 0.2;
		// 		light.distance = 50;
		// 		light.shadow.mapSize.width = 1024;
		// 		light.shadow.mapSize.height = 1024;
			
		// 	this.scene.add( light );
		// },


		// render: function() {

		// 	this.renderer.render( this.scene, this.camera );
		// },


		show: function() {

			console.log( "[Base] SHOW" );
		},


		hide: function() {

			console.log( "[Base] HIDE" );

			this._openLink();
		},


		showError: function() {

			console.log( "[Base] SHOW ERROR" );
		}
		

	};


	this.appNS.Base = Base;

	return Base;
	
});
