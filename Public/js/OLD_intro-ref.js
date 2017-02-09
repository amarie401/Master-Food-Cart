/*****************************************/
/*      Traditional Synchronous Loops    */
/*****************************************/
// const animals = ['bear', 'moose', 't-rex'];
// animals.forEach((animal) => {
//     console.log(animal);
// });
// console.log('This runs after the forEach');


/*****************************************/
/*           jQuery Async $.get          */
/*      Comparable to XMLHttpRequest     */
/*****************************************/
// $.get('data/music.json', (response) => {
//     console.log(response);
// });
// console.log('Will run before the $.get completes');



/*****************************************/
/*          jQuery Async $.ajax          */
/*     Callback Hell - Arrow of Death    */
/*****************************************/
// $.ajax({
//     type: "get",
//     url: "data/music.json",
//     success(data) {
//         console.log(data);
//
//         $.ajax({
//             type: "get",
//             url: "data/albums.json",
//             success(data) {
//                 console.log(data);
//
//                 $.ajax({
//                     type: "get",
//                     url: "data/dogs.json",
//                     success(data) {
//                         console.log(data);
//
//                     },
//                     error(jqXHR, textStatus, error) {
//                         console.log(error);
//                     }
//                 });
//
//             },
//             error(jqXHR, textStatus, error) {
//                 console.log(error);
//             }
//         });
//
//     },
//     error(jqXHR, textStatus, error) {
//         console.log(error);
//     }
// });

/*****************************************/
/*           Promise Chaining            */
/*         with XMLHttpRequests          */
/*****************************************/

// function get(url) {
//     return new Promise((resolve, reject) => {
//         const http = new XMLHttpRequest();
//         http.open('GET', url, true);
//         http.onload = function() {
//             if (http.status === 200) {
//                 resolve(JSON.parse(http.response));
//             } else {
//                 reject(http.statusText);
//             }
//         };
//         http.onerror = function() {
//             reject(http.statusText);
//         };
//         http.send();
//     });
// }
// const music = get('data/music.json');
//
// // console.log(music);
//
// music.then((music) => {
//     console.log(music);
//     return get('data/albums.json');
// }).then((albums) => {
//     console.log(albums);
//     return get('data/dogs.json');
// }).then((dogs) => {
//     console.log(dogs);
// }).catch((status) => {
//     console.log(status);
// });


/*****************************************/
/*           Promise Chaining            */
/*              with jQuery              */
/*****************************************/

// $.get('data/music.json').then((music) => {
//     console.log(music);
//     return $.get('data/albums.json');
// }).then((albums) => {
//     console.log(albums);
//     return $.get('data/dogs.json');
// }).then((dogs) => {
//     console.log(dogs);
// });

// $.ajax({
//     type: 'GET',
//     url: 'data/music.json'
// }).then((music) => {
//     console.log(music);
//     return $.ajax({
//         type: 'GET',
//         url: 'https://raw.githubusercontent.com/yuschick/31-Nights-of-Horror-2016/master/movies.json'
//     });
// }).then((movies) => {
//     console.log(JSON.parse(movies));
//     return $.ajax({
//         type: 'get',
//         url: 'data/albums.json'
//     });
// }).then((albums) => {
//     console.log(albums);
// });
