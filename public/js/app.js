(function() {
	"use strict";
	/*
	 CRUD
	 Create, Read, Update & Delete
	 CREATE // POST - typically body data
	 READ   // GET
	 UPDATE // PUT/PATCH - put updates full object / patch updates obj property
	 DELETE // Delete
	*/
	/*****************************************/
	/*      CONSTRUCT    */
	/*****************************************/
	const FoodcartModule = function() {

		////////////////////////////////////////////
		// CLASS :
		////////////////////////////////////////////
		class FoodcartDetails {
			constructor(foodcartObj) {

				this.build();
				// console.log(this);
			}
			////////////////////////////////////////////
			// BUILD :: GENERATE TEMPLATE
			build() {
				// grab a string of html
				const source = $('#fc-template').html();
				//turns that string into a handlebars function
				const template = Handlebars.compile(source);

				const context = {
					// image: this.image,
					// title: this.title,
					// overview: this.overview,
					// movieId: this.movieId
				};
				const html = template(context);

				$('.template-container').prepend(html);

			} // end build func
		} // end of CLASS

		/////////////////////////////////////
		// FUNCTION: BIND EVENTS
		/////////////////////////////////////
		function bindEvents() {

		}

		/////////////////////////////////////
		// FUNCTION: INIT
		/////////////////////////////////////
		function init() {
			bindEvents();
		} // end of init

		return {
			init: init
		}; // end return
	}; // end construct

	const foodcartApp = FoodcartModule();
	foodcartApp.init();
})(); // END END
