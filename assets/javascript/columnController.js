define([ "zepto", "TweenLite", "CSSPlugin", "EasePack", "Draggable", "ThrowPropsPlugin" ], function( $ ) {

	this.appNS = this.appNS || {};


	var ColumnController = function( $column, $pos ) {

		console.log( "[ColumnController] CONSTRUCT" );

		this._$column = $column;
		this._xPos = $pos;

		this._init();
	}

	ColumnController.prototype = {


		isActive: false,

		_id: null,
		_type: null,

		_$draggable: null,
		_$column: null,
		
		_posStartY: 0,
		_posMax: 0,
		_xPos: 0,

		_imgHeight: 0,
		_imgMargin: 0,

		_$images: null,
		_totalImages: 0,

		_draggable: null,
		// _draggableSnapping: null,



		_init: function() {

			console.log( "[ColumnController] INIT" );

			// Add the event listeners
			this._addEventListeners();

			// Set the position of the column
			this._setPosition();

			// Setup the variables
			this._setVaraiables();

			// Create the draggable instance
			this._createDraggable();

			// Render the shadows before we get started
			this.render();
		},


		_addEventListeners: function() {

			// Add any event listeners
			$( window ).on( 'resize', { self:this }, this._onResize );
		},



		_setPosition: function() {

			TweenLite.set( this._$column, { left: this._xPos });
		},



		_setVaraiables: function() {

			// Get the work list
			this._$draggable = this._$column.find( ".draggable" );

			// Get the ID of the list
			this._id = this._$draggable.attr( "id" );

			// Calculate the max position that the list can move to
			this._posMax = Math.round( parseFloat( this._$column.css( "height" )));


			// Get the bg items and the total
			this._$images = this._$column.find( ".work_image" );

			// Get the total number images
			this._totalImages = this._$images.length;


			// Set the default type
			this._type = "text";

			console.log( "[ColumnController] TOTAL IMAGES:", this._totalImages );
			

			// Check to see if we have any images
			if ( this._totalImages > 0 )
			{
				//  Because we have images we want to set the type to "images"
				this._type = "images";

				// Get the first image in the items
				var $firstImg = this._$images.first();

				// Calculate the height and its margin before it is transformed
				this._imgHeight = Math.round( parseFloat( $firstImg.css( "height" )));
				this._imgMargin = Math.round( parseFloat( $firstImg.css( "margin-bottom" )));

				// Reduce the maximum height
				this._posMax -= ( this._imgHeight + this._imgMargin );

				console.log( "[ColumnController] IMG HEIGHT:", this._imgHeight );
				console.log( "[ColumnController] IMG MARGIN:", this._imgMargin );

				// Set the maximum width of the works detail
				this._$column.find( ".work_detail" ).css( "max-width", this._imgHeight );
			}
			
			// this._posMax = (( this._imgHeight + this._imgMargin ) * this._totalItems );

			console.log( "[ColumnController] MAX POS:", this._posMax );

		},



		// _createSnapPoints: function() {

		// 	// Clear and create the snapping array
		// 	this._draggableSnapping = [];

		// 	// Calculate the item height
		// 	var height = this._imgHeight+this._imgMargin;

		// 	// Get the total number of items
		// 	var totalItems = this._totalItems;

		// 	// Loop throught the total number of items and multiply the height by i
		// 	for ( var i=0; i<totalItems+1; i++ )
		// 	{
		// 		this._draggableSnapping.push( 0 - ( height * i ));
		// 	}
		// },



		_createDraggable:function() {

			console.log( "[ColumnController] CREATE DRAGGABLE:", this._id );

			// Craete the new instance
			var draggable = Draggable.create( "#"+this._id, { 
				type: "y", 
				edgeResistance: 0.75, 
				throwProps: true, 
				lockAxis: true,
				bounds: { maxX: 0, minX: 0, maxY:0, minY: -this._posMax },
				dragClickables: true,
				// snap: this._draggableSnapping,
				trigger: "body"
			});

			// Get the draggable instance and set the variable
			this._draggable = Draggable.get( "#"+this._id );//draggable[0];
			
			// Disable the draggable so that the controller can activate it
			this._draggable.disable();
		},


		_updateDraggable:function() {

			if ( !this._draggable ) return;

			// Setup the variables
			this._setVaraiables();

			// Update the draggable instance
			this._draggable.update();

			// Update the draggable bounds
			this._draggable.applyBounds({ maxX: 0, minX: 0, maxY:0, minY: -this._posMax });
		},



		_onResize: function( e ) {

			// Get the scope
			var self = e.data.self;

			// Initalise the scroll
			self._updateDraggable();
		},



		_onMouseScroll: function( e ) {

			// Get the scope
			var self = e.data.self;

			// Check to see if we have a draggable instance
			if ( !self._draggable ) return;

			// Holder var for delta
			var delta;

			// Check which delta value we can use
			if ( e.deltaY ) delta = e.deltaY;
			else if ( e.wheelDelta ) delta = e.wheelDelta;
			else if ( e.detail ) delta = -e.detail;

			// If Delta is NAN then set it to 0
			if ( isNaN( delta )) delta = 0;

			// Get the draggable Y position
			var y = self._draggable.y;

			// Now decrease the Y using the delta
			y -= ( delta * 2 );


			// If scrolling goes over the max, then stop it
			if ( y < ( 0 - self._posMax )) y = ( 0 - self._posMax );
			
			// If the scrolling goes past 0
			if ( y > 0 ) y = 0;
			
			// Tween the work list and update the draggable instance
			TweenLite.to( "#"+self._id, 0.5, { y:y, ease: Sine.easeOut, onUpdate: self._draggable.update });
		},






		enable: function() {

			if ( !this._draggable ) return;

			console.log( "[ColumnController] ENABLE DRAGGABLE:", this._id );

			this._draggable.enable();

			// On Scroll Wheel
			$( window ).on( 'mousewheel', { self:this }, this._onMouseScroll );
			$( window ).on( 'DOMMouseScroll', { self:this }, this._onMouseScroll );
		},



		disable: function() {

			if ( !this._draggable ) return;

			console.log( "[ColumnController] DISABLE DRAGGABLE:", this._id );
			this._draggable.disable();

			// On Scroll Wheel
			$( window ).off( 'mousewheel' );
			$( window ).off( 'DOMMouseScroll' );
		},



		render: function() {

			// If we dont have a draggable instance then return
			if ( !this._draggable || this._totalImages == 0 ) return;

			var pos = this._draggable.y,
				dist,
				imgHeight = this._imgHeight + this._imgMargin,
				sX = -9,
				sY = 9,
				sB = 2,
				sA = 0.5,
				distPerc, x, y, b, a,
				$target,
				boxShadow,
				totalImages = this._totalImages,
				images = this._$images,
				abs = Math.abs;

			var i = totalImages-1;
			
			// for ( var i=0; i<bgItemsTotal; i++ )
			while( i-- )
			{
				// Get the target
				$target = images[i];

				// Calculate the distance from 0
				dist = pos+( imgHeight * i );

				// Turn the distance intp a percentage based on 0-500
				distPerc = ( dist / 500 );
				
				// Set the X position of the shadow
				x = sX;//( sX - ( 3 * Math.abs( distPerc )));

				// Set the Y position of the shadow
				y = ( sY - ( -3 * distPerc ));

				// Set the Blue value of the shadow
				b = abs( sB - ( 4 * distPerc ));

				// Set the alpha of the shadow
				a = sA - ( 0.15 * abs( distPerc ));

				// Set the mininimum values for Blur and Alpha
				if ( b > 20 ) b = 20;
				if ( a < 0.1 ) a = 0.1;

				// Set the box shadow
				boxShadow = ""+x+"px "+y+"px "+b+"px 0px rgba(0,0,0,"+a+")";

				// Apply the box shadow
				TweenLite.set( $target, { boxShadow: boxShadow });
				// $($target).css( "box-shadow", boxShadow );	
			};

		}
	};


	this.appNS.ColumnController = ColumnController;

	return ColumnController;
	
});
