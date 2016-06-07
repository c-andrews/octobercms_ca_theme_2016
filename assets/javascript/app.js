

var GreenSockAMDPath = _appDir + "/javascript/vendor/greensock";

require.config({

	"baseUrl": _appDir + '/javascript/',

	"paths" : {

		// LIBS
		// "jquery"						: "vendor/jquery",
		"zepto"							: "vendor/zepto",
		// "three"								: "vendor/three",
		// "stats"								: "vendor/stats",
		
		// GREENSOCK
		"TweenLite"						: "vendor/greensock/TweenLite.min",
		"CSSPlugin"						: "vendor/greensock/CSSPlugin.min",
		// "TimelineLite"					: "vendor/greensock/TimelineLite.min",
		"EasePack"						: "vendor/greensock/EasePack.min",
		"ThrowPropsPlugin"				: "vendor/greensock/ThrowPropsPlugin.min",
		"Draggable"						: "vendor/greensock/Draggable.min",

		// CORE
		"base"							: "min/base",
		"viewDefault"					: "min/viewDefault",
		"viewWork"						: "min/viewWork",
		"columnController"				: "min/columnController",

	},

	"shim" : {

		// "backbone" : {
		// 	"deps" : [ "underscore", "jquery" ],
		// 	"exports" : "Backbone"
		// },

		// "TweenLite" : {
		// 	"deps" : [ "CSSPlugin", "EasePack" ]
		// },

		"zepto" : {
			exports: "$"
		}
	},

});


require([ "zepto" ], function( $ ) {

	// DEFINE THE APP NAMESPACE
	// this.appNS = this.appNS || {};

	// var stats;

	function init( e ) {

		console.log( "[app] INIT" );

		// Remove the ready event handler
		$( document ).off( "ready" );

		// window.scrollTo(0,2);


		var page;

		switch( _pageLayout )
		{
			case "default" : 	page = [ "base", "viewDefault" ];		break;
			case "work" : 		page = [ "base", "viewWork" ];			break;
			case "project" : 	page = [ "base", "viewWork" ];			break;
		}

		if ( !page )
		{
			console.log( "[app] NO PAGE TO LOAD:", _pageLayout );
			return;
		}

		// return;

		require( page, function( Base, View ){
			
			// Create the base
			var base = new Base();

			// CREATE THE APP
			var view = new View( base );

		// 	stats = new Stats();
		// 	stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
		// 	document.body.appendChild( stats.dom );

			// render();

			TweenLite.ticker.addEventListener( "tick", render, this, false, 1 );

			// TweenLite.delayedCall( 1, render );

		});
	}



	function render() {

		// console.log( "[app] RENDER" );

		// Request an animation frame
		// window.requestAnimationFrame( render );

		// Start the stats
		// stats.begin();

		// Update the renderer in the base
		// appNS._base.render();

		// Update the view
		appNS._view.render();

		// End the stats
		// stats.end();
	}



	console.log( "[app] READY STATE:", document.readyState );

	// CHECK THE READY STATE OF THE DOCUMENT
	if ( document.readyState == "complete" ) { init(); }
	else { $( document ).on( "ready", init ); }

});