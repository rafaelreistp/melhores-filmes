const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'f72a3415735c8b772cfe41d9adb743db';

class Service {
    getPopular() {
        return new Promise((resolve, reject) => {
            fetch(`${BASE_URL}/discover/movie?language=pt-BR&api_key=${API_KEY}&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1&primary_release_year=2018&vote_count.gte=1000`)
                .then(data => resolve(data.json()))
                .catch(error => console.log(error) && reject(error));
        });
    }

    searchMovie(query) {
        return new Promise((resolve, reject) => {
            fetch(`${BASE_URL}/search/movie?language=pt-BR&api_key=${API_KEY}&query=${query}`)
                .then(data => resolve(data.json()))
                .catch(error => console.log(error) && reject(error));
        });
    }

    getMoviesByGenre(genre) {
        return new Promise((resolve, reject) => {
            fetch(`${BASE_URL}/discover/movie?language=pt-BR&api_key=${API_KEY}&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1&primary_release_year=2018&vote_count.gte=1000&with_genres=${genre}`)
                .then(data => resolve(data.json()))
                .catch(error => console.log(error) && reject(error));
        });
    }

    getMovieTrailers(movieId) {
        return new Promise((resolve, reject) => {
            fetch(`${BASE_URL}/movie/${movieId}/videos?language=pt-BR&api_key=${API_KEY}`)
                .then(data => resolve(data.json()))
                .catch(error => console.log(error) && reject(error));
        });
    }
}