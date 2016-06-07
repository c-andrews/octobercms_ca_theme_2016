define([ "zepto" ], function( $ ) {

	this.appNS = this.appNS || {};


	var ViewDefault = function( $base ){
		console.log( "[ViewDefault] CONSTRUCT" );

		// Set the global view
		appNS._view = this;

		this._base = $base;

		this._init();
	}

	ViewDefault.prototype = {


		_base: null,
		// _cube: null,
		// _loadingManager: null,


		_init: function() {

			console.log( "[ViewDefault] INIT" );

			// Add the event listeners
			this._addEventListeners();
		},


		_addEventListeners: function() {

			// Add any event listeners
			$( window ).on( 'resize', { self:this }, this._onResize );

			// On Scroll Wheel
			// $( window ).on( 'mousewheel', { self:this }, this._onMouseScroll );
			// $( window ).on( 'DOMMouseScroll', { self:this }, this._onMouseScroll );
		},



		
		_onResize: function( e ) {

			// // Get the scope
			// var self = e.data.self;

			// // If we are not loaded then return
			// if ( self._loaded === false ) return;

			// // Initalise the scroll
			// self._initScroll();
		},





		render: function() {

		}
	};


	this.appNS.ViewDefault = ViewDefault;

	return ViewDefault;
	
});
