/*
 CRUD
 Create, Read, Update & Delete
 CREATE // POST - typically body data
 READ   // GET
 UPDATE // PUT/PATCH - put updates full object / patch updates obj property
 DELETE // Delete
*/

(function() {
	"use strict";

	const movieModule = function() {
		const searchForm = document.querySelector('.search-form');
		const apiKey = '230dad24aa940a540fb59d2c90298965';
		let token = '0a1f98a8705150b7df97f4a24a81ede0e41da094';
		let sessionId = 'effd01ee89774466fe2475652f2edb7343304614';

		class MovieDetails {
			constructor(movieObj) {
				this.movieId = movieObj.id;
				this.image = `https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movieObj.poster_path}`;
				this.title = movieObj.title;
				this.overview = movieObj.overview;
				this.build();
				console.log(this);
			}

			build() {
				// grab a string of html
				const source = $('#movie-template').html();
				//turns that string into a handlebars function
				const template = Handlebars.compile(source);

				const context = {
					image: this.image,
					title: this.title,
					overview: this.overview,
					movieId: this.movieId
				};
				const html = template(context);

				$('.content').prepend(html);


			} // end build func
		} // end of CLASS

		function bindEvents() {
			searchForm.addEventListener('submit', () => {
				event.preventDefault();
				clearContent();
				const searchValue = event.target[0].value;
				// console.log(searchValue);
				getSearchResults(searchValue);
				searchForm.reset();
			});
			// dynamic - parent > related-search-link > then run this etc.
			$('.content').on('click', '.related-search-link', function() {
				const id = $(this).attr('data-id');
				// console.log(id);
				getRelatedMovies(id);
			});
			// use es5 function type to use 'this'
			$('.content').on('click', '.close', function() {
				$(this).parents('.movie-container').fadeOut('slow', function() {
					// this = movie-container here!
					$(this).remove();
				});
			});
			// update rating
			$('.content').on('change', '.movie-rating', function() {
				if ($(this).val()) {
					const rating = $(this).val(); // event.target[0].value
					const movieId = $(this).attr('data-id');

					if (rating === 'delete') {
						deleteRating(movieId);
					} else {
						rateMovie(rating, movieId);
					}
				}
			});
		} // END BIND EVENTS

		function clearContent() {
			// html is a get/send type
			$('.content').html('');
		}

		function createSession() {
			// Request the access token
			$.get(`https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`).then((data) => {
				token = data.request_token;
				console.log('token ' + token);
				// verify token
				return $.get(`https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}&username=shanem&password=tiydurham2017&request_token=${token}`);
			}).then(() => {
				//create session
				return $.get(`https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${token}`);
			}).then((data) => {
				sessionId = data.session_id;
				console.log('sessions ' + sessionId);
			});
		}

		function deleteRating(movieId) {
			$.ajax({
				method: 'DELETE',
				url: `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${apiKey}&session_id=${sessionId}`,
				header: {
					"content-type": "application/json;charset=utf-8"
				}

			}).then((response) => {
				console.log(response);
			}).catch((error) => {
				console.log(error);
			});
		}

		function getUserRating(movieId) {
			$.get(`https://api.themoviedb.org/3/movie/${movieId}/account_states?api_key=${apiKey}&session_id=${sessionId}`).then((response) => {
				$(`.movie-rating[data-id=${response.id}]`).val(response.rated.value);
			});
		}

		function getRelatedMovies(id) {
			// default returns promise // access  to 'then'
			$.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}`)
				.then((response) => {
					// console.log(response);
					let topRelated = response.results.splice(0, 5);
					console.log(topRelated);
					clearContent();

					for (let i = 0; i < topRelated.length; i++) {
						new MovieDetails(topRelated[i]);
					}
				}).catch((error) => {
					console.log(error);
				});
		}

		function getSearchResults(query) {
			query = encodeURIComponent(query);

			$.get(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}`)
				.then((response) => {
					// console.log(response);
					// const fullMovieDetails = response[0];
					new MovieDetails(response.results[0]);
					getUserRating(response.results[0].id);
				});
		} // end function

		function rateMovie(rating, movie) {
			const settings = {
				method: 'POST',
				url: `https://api.themoviedb.org/3/movie/${movie}/rating?api_key=${apiKey}&session_id=${sessionId}`,
				headers: {
					"content-type": "application/json;charset=utf-8"
				},
				data: JSON.stringify({
					"value": rating
				})
			};
			$.ajax(settings).then((response) => {
				console.log('we made it!');
			}).catch((error) => {
				console.log('error in ajax ' + error);
			});
		}

		function init() {
			bindEvents();
		} // end of init

		return {
			init: init
		}; // end return
	}; // end construct

	const movieApp = movieModule();
	movieApp.init();
})();
