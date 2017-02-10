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
	////////////////////////////////////////////
	// Work Flow ::::
	// iifee ---> jq/ready ---> constr ---> init()
	// init() --> bindEvents() -> searchInput
	// init() --> CLASS: -> BUILD -> generates Template(input)
	//
	////////////////////////////////////////////
	/*****************************************/
	/*      CONSTRUCT    */
	/*****************************************/
	const FoodcartModule = function() {
		const searchForm = document.querySelector('.search-form');
		const apiKey = '230dad24aa940a540fb59d2c90298965'; // TEMP VARIABLE FOR TESTING **REMOVE

		////////////////////////////////////////////
		// CLASS :
		////////////////////////////////////////////
		class FoodcartDetails {

			// our keys  ||| object keys we are pulling from
			constructor(foodcartObj) {
				this.avgRating = foodcartObj.id;
				this.image = `https://image.tmdb.org/t/p/w185_and_h278_bestv2/${foodcartObj.poster_path}`;
				this.name = foodcartObj.title;
				this.description = foodcartObj.overview;
				/* Real API obj
				// FOOD CART //
					this.id = foodcartObj. ??? // NEEDS UPDATE // check real object name
					this.name = foodcartObj.name;
					this.description = foodcartObj.description;
					this.image = `? url/${foodcartObj.image}`; // NEEDS UPDATE ONCE API IS LIVE
					this.averageRating = foodcartObj.averageRating;
				// FOOD ITEMS //
					this.foodName = foodcartObj.foodName;
					this.vegetarian = foodcartObj.vegetarian;
				*/

				this.build();
				console.log('class this --> ' + this);
			}

			////////////////////////////////////////////
			// BUILD :: GENERATE TEMPLATE
			build() {
				// grab a string of html
				const source = $('#fc-template').html();
				//turns that string into a handlebars function
				const template = Handlebars.compile(source);

				const context = {
					image: this.image,
					name: this.name,
					description: this.description,
					avgRating: this.avgRating

					/*
					// Real API context
						name: this.name,
						description: this.description,
						image: this.image,
						averageRating: this.averageRating,

						foodName: this.foodName,
						vegetarian: this.vegetarian
					*/

				};
				const html = template(context);

				$('.template-container').prepend(html);

			} // end build func
		} // end of CLASS
		/////////////////////////////////////
		// FUNCTION: API CALL // SEARCH RESULTS
		/////////////////////////////////////
		function APIRequest(query) {
			query = encodeURIComponent(query);

			$.get(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}`)
				.then((response) => {
					console.log(response);
					new FoodcartDetails(response.results[0]);
				});
		} // end function

		/////////////////////////////////////
		// FUNCTION: CLEAR PAGE OF SEARCH
		/////////////////////////////////////
		function clearContent() {
			// html is a get/send type
			$('.template-container').html('');
			$('.veggie').addClass('is-visibility-hidden');

		}

		/////////////////////////////////////
		// FUNCTION: BIND EVENTS
		/////////////////////////////////////
		function bindEvents() {
			searchForm.addEventListener('submit', () => {
				event.preventDefault();
				clearContent();
				const searchValue = event.target[0].value; //grab value from input
				console.log(searchValue);
				APIRequest(searchValue); // pass value to APIRequest()
				$('.veggie').removeClass('is-visibility-hidden');
				searchForm.reset(); // clear form
			});

			$('.template-container').on('click', '.btn-see-rate', function() {
				// console.log('in');
				$('.rr-container').removeClass('is-hidden'); // add fadeIn later
			});
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
