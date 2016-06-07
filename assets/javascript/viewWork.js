define([ "zepto", "columnController" ], function( $, ColumnController ) {

	this.appNS = this.appNS || {};


	var ViewWork = function( $base ) {

		console.log( "[ViewWork] CONSTRUCT" );

		// Set the global view
		appNS._view = this;

		// Set the base controller
		this._base = $base;

		// Call init
		this._init();
	}



	ViewWork.prototype = {


	/************************************************ 
	 * PRIVATE VARIABLES
	 ************************************************/

		// Setup the private variables
		_base: null,
		_columns: null,


	/************************************************ 
	 * PUBLIC VARIABLES
	 ************************************************/

		// Setup the public variables
		_activeColumn: null,




	/************************************************ 
	 * PRIVATE FUNCTIONS
	 ************************************************/

		_init: function() {

			console.log( "[ViewWork] INIT" );

			$( window ).on( "load", { self:this }, this._onLoaded );
		},


		_onLoaded: function( e ) {

			// Remove the load event handler
			$( window ).off( "load" );

			var self = e.data.self;

			// Create the draggable instance
			self._createControllers();
		},



		_createControllers: function() {

			// Create the columns array
			this._columns = [];

			var columns = $( ".work_column" );
			var total = columns.length;
			var column;
			var $target;
			var columnWidth = 0;
			var posX = 0;

			console.log( "[ViewWork] TOTAL COLUMNS:", total );

			for ( var i=0; i<total; i++ )
			{
				// Get the column
				$target = $( columns[i] );

				// Create the new column
				column = new ColumnController( $target, posX );

				// Calculate the width of the column
				columnWidth = $target.css( "width" );

				// Add the column to the array
				this._columns.push( column );

				// Increate the column width
				posX += columnWidth;
			}

			// Set the active column 
			this._activeColumn = this._columns[0];

			// Enable the active column
			this._activeColumn.enable();
		},




	/************************************************ 
	 * PUBLIC FUNCTIONS
	 ************************************************/


		render: function() {

			// If we dont have an active column then return
			if ( !this._activeColumn ) return;

			// Render the active column
			this._activeColumn.render();
		}
	};


	this.appNS.ViewWork = ViewWork;

	return ViewWork;
	
});
