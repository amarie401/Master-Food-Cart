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
		const foodcartForm = document.querySelector('.build-foodcart-container-form');
		const grForm = document.querySelector('.gr-form');
		////////////////////////////////////////////
		// CLASS :
		////////////////////////////////////////////
		class FoodcartDetails {

			// our keys  ||| object keys we are pulling from
			constructor(foodcartObj) {
				// this.id = foodcartObj.id; // NEEDS UPDATE // check real object name
				let selectItems = [];
				const selectItemsLoop = function() { // loop through foodItems
					for (let i = 0; i < foodcartObj.items.length; i++) {

						selectItems.push(foodcartObj.items[i].food_name);
					}
					return selectItems;
				};

				this.foodcart_id = foodcartObj.items[0].foodcart_id;
				this.name = foodcartObj.name;
				this.description = foodcartObj.description;
				this.image = foodcartObj.image;
				this.average_rating = foodcartObj.average_rating;
				this.food_name = selectItemsLoop();
				// this.food_name = foodcartObj.items[0].food_name; //old
				this.vegetarian = foodcartObj.items.vegetarian;
				console.log('CLASS : this --> ', this);
				this.build();
			}
			////////////////////////////////////////////
			// BUILD :: GENERATE TEMPLATE
			build() {
				// grab a string of html
				const source = $('#fc-template').html();
				//turns that string into a handlebars function
				const template = Handlebars.compile(source);
				const context = {
					id: this.foodcart_id,
					name: this.name,
					description: this.description,
					image: this.image,
					average_rating: this.average_rating,
					food_name: this.food_name,
					vegetarian: this.vegetarian
				};
				const html = template(context);

				$('.template-container').prepend(html);

			} // end build func
		} // end of CLASS

		/////////////////////////////////////
		// FUNCTION:  API CALL // SEARCH RESULTS
		/////////////////////////////////////
		function APIRequest(query) {
			query = encodeURIComponent(query);
			$.ajax({
				method: 'GET',
				url: `https://foodcarts2017.herokuapp.com/api/foodcarts?query=${query}`,
				dataType: 'json',
				header: {
					"content-type": "application/json;charset=utf-8"
				}

			}).then((response) => {
				console.log(response[0]);
				let topResults = response.splice(0, 5);
				for (let i = 0; i < topResults.length; i++) {
					new FoodcartDetails(topResults[i]);
				}
				// console.log('new FoodcartDetails response --> ', response);
			}).catch((error) => {
				console.log(error);
			});
		}
		/////////////////////////////////////
		// FUNCTION:
		/////////////////////////////////////
		function buildAFoodCart() {
			//TBD
		}
		/////////////////////////////////////
		// FUNCTION: LOOP TEMPLATE RESULTS/COUNTER
		/////////////////////////////////////
		function slackingIsNowAVerb() {
			let templateCounter = [];

			$('div .fc-main-container').each(function(index) {
				templateCounter.push(index);
				console.log('tmp indx --> ', index);
				return templateCounter;
			});
		}


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
			searchForm.addEventListener('submit', () => {
				event.preventDefault();
				// clearContent();
				const searchValue = event.target[0].value; //grab value from input
				console.log('input --> ', searchValue);
				APIRequest(searchValue); // pass value to APIRequest()
				// $('.veggie').removeClass('is-visibility-hidden');

				searchForm.reset(); // clear form
			});

			///////////// ON CLICK : SEE RATING BUTTON  /////////////
			$('.template-container').on('click', '.btn-see-rate', function() {
				$(this).parents('.mega-container').find('.rr-container').toggleClass('is-hidden');
			});

			///////////// ON CLICK : MAKE RATING BUTTON  /////////////
			$('.template-container').on('click', '.btn-make-rate', function() {
				$(this).parents('.mega-container').find('.gr-container').toggleClass('is-hidden');
			});
			///////////// ON CLICK : CLOSE TMPLATE CONTAINER  /////////////
			$('.template-container').on('click', '.fc-close', function() {
				$(this).parents('.mega-container').find('.fc-main-container').toggleClass('is-hidden');
				$(this).parents('.mega-container').find('.gr-container').toggleClass('is-hidden');
				$(this).parents('.mega-container').find('.rr-container').toggleClass('is-hidden');
				// $(this).parents('.fc-main-container', '.gr-container', '.rr-container').toggleClass('is-hidden');
			});
			$('.template-container').on('click', '.gr-close', function() {
				$(this).parents('.gr-container').toggleClass('is-hidden');

			});
			$('.template-container').on('click', '.rr-close', function() {
				$(this).parents('.rr-container').toggleClass('is-hidden');
			});

			///////////// ON CLICK : SEE BUILD CONTAINER /////////////
			foodcartForm.addEventListener('submit', () => {
				event.preventDefault();
				slackingIsNowAVerb(); // test function <----------------------

				const buildCart = event.target[0].value;
				console.log('buildcart ', buildCart);
				createCart(buildCart);
				$('.build-foodcart-form')[0].reset();
			});

			$('.build-cart-btn').on('click', function() {
				$('.build-foodcart-container-form').toggleClass('is-visibility-hidden');
				// $('.template-container').toggleClass('is-hidden'); // * may need to implement somehow?*
			});

			///////////// ON CLICK : CLOSE BUILD CONTAINER  /////////////
			$('.build-fc-close').on('click', function() {
				$('.build-foodcart-container').toggleClass('is-visibility-hidden');
			});

			// foodcartForm.addEventListener('submit', () => {
			// 	event.preventDefault();
			// 	const buildCart = event.target[0].value;
			// 	console.log(buildCart);
			// 	console.log('buildcart ', buildCart);
			// });

			$('.template-container').on('submit', '.gr-form', function() {
				event.preventDefault();
				const GetRating = $('.food-cart-rating').val();
				const rating = parseInt(GetRating); // make sure its a number
				const GetFoodCartID = $('.food-cart-rating').attr('data-id');
				const foodCartID = parseInt(GetFoodCartID); //make sure its a number
				const review = event.target[1].value;

				createRatings(foodCartID, rating, review);
				$('.gr-form').each(function() { //reset form
					this.reset();
				});
			});

		} // END BIND EVENTS

		///////////// ON CLICK : GET RATINGS, REVIEWS, & ID  /////////////
		// grForm.addEventListener('submit', () => {
		// 	event.preventDefault();
		// 	const descriptionValue = event.target[0].value;
		//
		// 	return descriptionValue;
		//  });

		/////////////////////////////////////
		// FUNCTION: BUILD CART
		/////////////////////////////////////
		function createCart(name) {
			const settings = {
				method: 'POST',
				url: `https://foodcarts2017.herokuapp.com/api/foodcart`,
				crossDomain: true,
				dataType: 'json',
				contentType: 'application/json',
				headers: {
					"content-type": "application/json;charset=utf-8"
				},
				data: JSON.stringify({
					"name": name,
					"image": "imanimage",
					"description": "descyo!"
				})
			};
			console.log(name);
			$.ajax(settings).then((response) => {
				console.log('success!');
			}).catch((error) => {
				console.log('error in ajax ', error);
			});
		}

		/////////////////////////////////////
		// FUNCTION: CREATE RATINGS/REVIEWS
		/////////////////////////////////////
		function createRatings(foodCartID, rating, review) {
			const settings = {
				method: 'POST',
				url: `https://foodcarts2017.herokuapp.com/api/rating`,
				crossDomain: true,
				dataType: 'json',
				headers: {
					"content-type": "application/json;charset=utf-8"
				},
				data: JSON.stringify({
					"foodcart_id": foodCartID,
					"score": rating,
					"review": review
				})
			};
			console.log('response0 ', response[0]);
			$.ajax(settings).then((response) => {
				console.log('success!');
			}).catch((error) => {
				console.log('error in ajax ' + error);
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
