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
				this.foodCartId = foodcartObj.items[0].foodcart_id;
				this.name = foodcartObj.name;
				this.description = foodcartObj.description;
				this.image = foodcartObj.image;
				this.average_rating = foodcartObj.average_rating;
				this.food_name = foodcartObj.items.food_name;
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
					id: this.foodCartId,
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
		// FUNCTION: API CALL // SEARCH RESULTS
		/////////////////////////////////////
		// function APIRequest(query) {
		// 	query = encodeURIComponent(query);
		// 	console.log('query --> ' + query);
		// 	$.get(`https://foodcarts2017.herokuapp.com/api/foodcarts?query=${query}`)
		// 		.then((response) => {
		// 			console.log('response TEST --> ', response);
		// 			console.log('response 0 TEST --> ', response[0]);
		// 			console.log('response 1 TEST --> ', response[1]);
		// 			console.log('response 2 TEST --> ', response[2]);
		// 			console.log('response 3 TEST --> ', response[3]);
		// 			console.log('response 4 TEST --> ', response[4]);
		// 			console.log('response 5 TEST --> ', response[5]);
		// 			console.log('response 6 TEST --> ', response[6]);
		// 			new FoodcartDetails(response); // [0]
		// 			console.log('new FoodcartDetails response --> ', response);
		// 		});
		// } // end function

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
				console.log('response TEST --> ', response);
				console.log('response 1 TEST --> ', response[1]);

				let topResults = response.splice(0, 5);
				console.log('topResults --> ', topResults);
				for (let i = 0; i < topResults.length; i++) {
					new FoodcartDetails(topResults[i]);
				}
				// new FoodcartDetails(response[0]); // [0]
				console.log('new FoodcartDetails response --> ', response);
			}).catch((error) => {
				console.log(error);
			});
		}
		/////////////////////////////////////
		// FUNCTION:
		/////////////////////////////////////
		function buildAFoodCart() {
			// const settings = {
			// 	method: 'POST',
			// 	url: `https://api.themoviedb.org/3/movie/${movie}/rating?api_key=${apiKey}&session_id=${sessionId}`,
			// 	headers: {
			// 		"content-type": "application/json;charset=utf-8"
			// 	},
			// 	data: JSON.stringify({
			// 		"value": rating
			// 	})
			// };
			// $.ajax(settings).then((response) => {
			// 	console.log('we made it!');
			// }).catch((error) => {
			// 	console.log('error in ajax ' + error);
			// });
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
			foodcartForm.addEventListener('submit', () => {
				event.preventDefault();
				$('.build-foodcart-container').toggleClass('is-visibility-hidden');
				foodcartForm.reset(); // clear form
			});

			$('.build-cart-btn').on('click', function() {
				$('.build-foodcart-container-form').toggleClass('is-visibility-hidden');
				// $('.template-container').toggleClass('is-hidden'); // * may need to implement somehow?*
			});

			///////////// ON CLICK : CLOSE BUILD CONTAINER  /////////////
			//////////////////////////////////////////////////////////

			$('.build-fc-close').on('click', function() {
				$('.build-foodcart-container').toggleClass('is-visibility-hidden');
			});

		} // END BIND EVENTS

		///////////// ON CLICK : GET RATINGS, REVIEWS, & ID  /////////////
		//////////////////////////////////////////////////////////


		// grForm.addEventListener('submit', () => {
		// 	event.preventDefault();
		// 	const descriptionValue = event.target[0].value;
		//
		// 	return descriptionValue;
		//  });

		$('.template-container').on('submit', '.gr-form', function() {
			event.preventDefault();
			const rating = $('.food-cart-rating').val();
			console.log(rating);
			const foodCartID = $('.food-cart-rating').attr('data-id');
			console.log(foodCartID);
			const review = event.target[1].value;
			console.log(review);

			createRatings(foodCartID, rating, review);
		});

		/////////////////////////////////////
		// FUNCTION: CREATE RATINGS/REVIEWS
		/////////////////////////////////////
		function createRatings(foodCartID, rating, review) {
			const settings = {
				method: 'POST',
				url: 'https://foodcarts2017.herokuapp.com/api/rating',
				headers: {
					"content-type": "application/json;charset=utf-8"
				},
				data: JSON.stringify({
					"foodCartId": foodCartID,
					"review": review,
					"score": rating
				})
			};
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
