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
		// const apiKey = '230dad24aa940a540fb59d2c90298965'; // TEMP VARIABLE FOR TESTING **REMOVE

		////////////////////////////////////////////
		// CLASS :
		////////////////////////////////////////////
		class FoodcartDetails {

			// our keys  ||| object keys we are pulling from
			constructor(foodcartObj) {
				// this.id = foodcartObj.id; // NEEDS UPDATE // check real object name
				this.name = foodcartObj.name;
				this.description = foodcartObj.description;
				//this.image = `https://foodcarts2017.herokuapp.com/${foodcartObj.image}`; // NEEDS UPDATE ONCE API IS LIVE
				this.averageRating = foodcartObj.averageRating;
				this.foodName = foodcartObj.foodName;
				this.vegetarian = foodcartObj.vegetarian;

				console.log('CLASS : this --> ', this);
				this.build();
				// console.log('class this --> ' + this);
			}

			////////////////////////////////////////////
			// BUILD :: GENERATE TEMPLATE
			build() {
				// grab a string of html
				const source = $('#fc-template').html();
				//turns that string into a handlebars function
				const template = Handlebars.compile(source);

				const context = {
					name: this.name,
					description: this.description,
					//	image: this.image,
					averageRating: this.averageRating,
					foodName: this.foodName,
					vegetarian: this.vegetarian
				};
				const html = template(context);

				$('.template-container').prepend(html);

			} // end build func
		} // end of CLASS

		/////////////////////////////////////
		// FUNCTION: API CALL // SEARCH RESULTS
		/////////////////////////////////////
		// function APIRequest(query) {
		// 	query = encodeURIComponent(query);
		// 	console.log('query --> ' + query);
		// 	$.get(`https://foodcarts2017.herokuapp.com/api/foodcarts?query=${query}`)
		// 		.then((response) => {
		// 			console.log(response);
		// 			new FoodcartDetails(response.results); // [0]
		// 		});
		// } // end function

		/////////////////////////////////////
		// FUNCTION:
		/////////////////////////////////////
		function APIRequest(query) {
			query = encodeURIComponent(query);
			$.ajax({
				method: 'GET',
				url: `https://foodcarts2017.herokuapp.com/api/foodcarts?query=${query}`,
				header: {
					"content-type": "application/json;charset=utf-8"
				}
			}).then((response) => {
				console.log('response TEST --> ', response);
				console.log('response 1 TEST --> ', response[1]);


				console.log('response results --> ', response.results);
				new FoodcartDetails(response); // [0]
				console.log('new FoodcartDetails response --> ', response);
			}).catch((error) => {
				console.log(error);
			});
		}
		/////////////////////////////////////
		// FUNCTION:
		/////////////////////////////////////

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
			///////////// ON CLICK : GET INPUT  /////////////
			/////////////////////////////////////////////////////////
			searchForm.addEventListener('submit', () => {
				event.preventDefault();
				clearContent();
				const searchValue = event.target[0].value; //grab value from input
				console.log('input --> ', searchValue);
				APIRequest(searchValue); // pass value to APIRequest()
				$('.veggie').removeClass('is-visibility-hidden');
				searchForm.reset(); // clear form
			});

			///////////// ON CLICK : SEE RATING BUTTON  /////////////
			/////////////////////////////////////////////////////////
			$('.template-container').on('click', '.btn-see-rate', function() {
				// console.log('in');
				$('.rr-container').toggleClass('is-hidden'); // add fadeIn later
			});

			///////////// ON CLICK : MAKE RATING BUTTON  /////////////
			//////////////////////////////////////////////////////////
			$('.template-container').on('click', '.btn-make-rate', function() {
				// console.log('in');
				$('.gr-container').toggleClass('is-hidden'); // add fadeIn later
			});
			///////////// ON CLICK : CLOSE TMPLATE CONTAINER  /////////////
			//////////////////////////////////////////////////////////
			$('.template-container').on('click', '.fc-close', function() {
				$(this).parents('.fc-main-container', '.gr-container', '.rr-container').toggleClass('is-hidden');
				// $('.gr-container', '.rr-container').toggleClass('is-hidden');
			});
			$('.template-container').on('click', '.gr-close', function() {
				$(this).parents('.gr-container').toggleClass('is-hidden');

			});
			$('.template-container').on('click', '.rr-close', function() {
				$(this).parents('.rr-container').toggleClass('is-hidden');
			});

			///////////// ON CLICK : SEE BUILD CONTAINER /////////////
			/////////////////////////////////////////////////////////
			$('.build-cart').on('click', function() {
				$('.build-foodcart-container, .build-foodcart-container-form').toggleClass('is-hidden');
			}); // *** NEED TO FIX ***

		} // END BIND EVENTS


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
