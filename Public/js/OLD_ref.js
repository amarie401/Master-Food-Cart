(function() {
    "use strict";

    const movieModule = function() {
        const apiKey = '84d2690223f00a8cc05141e0c91c56b8';

        class MovieDetails {
            constructor(details) {
                this.movieId = details.id;
                this.title = details.title;
                this.overview = details.overview;
                this.poster = `https://image.tmdb.org/t/p/w185_and_h278_bestv2${details.poster_path}`;
                this.build();
            }

            build() {
                const source = $("#movie-template").html();
                const template = Handlebars.compile(source);
                const context = {
                    movieId: this.movieId,
                    title: this.title,
                    image: this.poster,
                    overview: this.overview
                };
                const html = template(context);
                $('.content').prepend(html);
            }
        }

        function bindEvents() {
            $('.search-form').on('submit', function() {
                event.preventDefault();
                const value = event.target[0].value;

                getSearchResults(value);
                this.reset();
            });
        }

        function getSearchResults(query) {
            query = encodeURIComponent(query);
            const settings = {
                "async": true,
                "crossDomain": true,
                "url": `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}`,
                "method": "GET"
            };

            $.ajax(settings).then(function(response) {
                new MovieDetails(response.results[0]);
            });
        }

        function init() {
            bindEvents();
        }

        return {
            init: init
        };
    };

    const movieApp = movieModule();
    movieApp.init();
})();
