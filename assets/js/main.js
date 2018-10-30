const service = new Service();

function getImagePath(image) {
    return (image) ? `https://image.tmdb.org/t/p/w185/${image}` : 'assets/img/no-image.jpg';
}

function formatDate(date) {
    const monthName = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
    let release_date = new Date(date);
    return `${release_date.getDate()} de ${monthName[release_date.getMonth()]} de ${release_date.getFullYear()}`;
}

function renderMovies(movies) {
    document.querySelector('#movies').innerHTML = `
        <div class='row mt-2'>
            ${movies.map(movie => `
                <div class="col-sm-12 col-md-6">
                    <div class="movie">
                        <a href="#" class="play-trailer" onclick="showTrailer(${movie.id})">
                            <div class="movie-poster">
                                <img alt="${movie.title}" src="${getImagePath(movie.poster_path)}">
                                <span class="score">${movie.vote_average}</span>
                                <div class="overlay-icon">
                                    <img src="assets/img/icons8-next-64.png" alt="Assistir ao Trailer" />
                                </div>
                            </div>
                        </a>
                        <div class="movie-body">
                            <h3 class="movie-title">${movie.title}</h3>
                            <span>${formatDate(movie.release_date)}</span>
                            <p>${truncateString(movie.overview)} <a href="https://www.themoviedb.org/movie/${movie.id}" target="_blank" class="more-link">ler mais</a></p>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function searchMovie(event) {
    let search = event.target.value;
    setTimeout(() => {
        if (document.querySelector('input').value === search) {
            service.searchMovie(search).then(({
                results
            }) => renderMovies(results));
        }
    }, 500);
}

function truncateString(string) {
    return (string.length > 140) ? string.substring(0, 140) + '...' : string;
}

function getMoviesByGenre(event, genre) {
    let target = (event.target.nodeName == 'IMG' || event.target.nodeName == 'SPAN') ? event.target.parentNode : event.target;
    if (target.classList.contains('active')) return;
    service.getMoviesByGenre(genre).then(({ results }) => renderMovies(results));
    document.querySelectorAll('a.active').forEach(item => item.classList.remove('active'));
    target.classList.add('active');
  }

function showTrailer(movieId) {
    service.getMovieTrailers(movieId)
        .then(({
            results
        }) => {
            $('#modal iframe').attr('src', `https://www.youtube.com/embed/${results[0].key}?autoplay=1`);
            $('#modal').modal('show');
        });
}

window.addEventListener("load", function (event) {
    service.getPopular().then(({
        results
    }) => renderMovies(results));
    $('#modal').on('hidden.bs.modal', function (event) {
        $('#modal iframe').removeAttr('src');
    });
});