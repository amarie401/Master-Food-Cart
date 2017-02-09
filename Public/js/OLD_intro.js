/*****************************************/
/*      Traditional Synchronous Loops    */
/*****************************************/
// console.groupcollapsed('Fruits Group');
// const fruits = ['apple', 'blackberry', 'orange'];
// fruits.forEach((fruits) => {
// 	console.log(fruits);
// });
//
// console.groupEnd();
//
// /*****************************************/
// /*           jQuery Async $.get          */
// /*      Comparable to XMLHttpRequest     */
// /*****************************************/
// $.get('data/music.json', (response) => {
// 	console.log(response);
// });
// console.log('this runs before the get');


/*****************************************/
/*          jQuery Async $.ajax          */
/*     Callback Hell - Arrow of Death    */
/*****************************************/
// $.ajax({
// 	type: 'GET',
// 	url: 'some url',
// 	success(response) {
// 		console.log(JSON.parse(response));
//
// 		// on success get another file/url etc
// 		$.ajax({
// 			type: 'GET',
// 			url: 'another url or data file',
// 			success(response) {
// 				console.log(response);
// 			},
// 			error(jqXHR, textStatus, error) {
// 				console.log(error);
// 			}
// 		});
//
// 	},
// 	error(jqXHR, textStatus, error) {
// 		console.log(error);
// 	}
// });

// promises (?) to avoid arrows

/*****************************************/
/*           Promise Chaining            */
/*         with XMLHttpRequests          */
/*****************************************/
// function get(url) {
// 	return new Promise((resolve, reject) => {
// 		const http = new XMLHttpRequest();
// 		http.open('GET', url, true);
// 		http.onload = function() { // similar to http.readyState === 4
// 			if (http.status === 200) {
// 				resolve(JSON.parse(http.response));
// 			} else {
// 				reject(http.statusText);
// 			}
// 		};
// 		http.onerror = function() {
// 			reject(http.statusText);
// 		};
// 		http.send();
// 	});
// }
// const music = get('data/music.json');
// // console.log('music');
//
// music.then((response) => {
// 	console.log(response);
// 	// here you can chain promises
// 	return get('data/albums.json');
// }).then((albums) => {
// 	console.log(albums);
// }).catch((error) => {
// 	console.log(error);
// });

// there is an All Promise function - but all must resolve to work
// there is array of promises too.

/*****************************************/
/*           Promise Chaining            */
/*              with jQuery              */
/*****************************************/

$.get('data/music.json').then((bands) => {
	console.log(bands);
	return $.get('data/albums.json');
}).then((albums) => {
	console.log(albums);
	return $.get('data/dogs.json');
}).then((dogs) => {
	console.log(dogs);
}).catch((error) => {
	console.log(error);
});

// ajax version

$.ajax({
	type: 'GET',
	url: 'data/music.json',
}).then((bands) => {
	console.log(bands);

	return $.ajax({
		type: 'GET',
		url: 'data/albums.json'
	});

}).then((albums) => {
	console.log(albums);
}).catch((error) => {
	console.log(error);
});
