/* 
Dúvidas 
  Onde guardar as chaves das apis? 
  Como trabalhar com menos requests a cada inserção de dados/imagens?
  Como reduzir o uso do innerHTML? 
    -classes/ids no html e modificar o conteúdo a partir das consts? 
  Como mudar o formato da data?

Bugs
  Slider não funciona ao inverso (primeiro item)
  Se overview das séries/filmes estiver vazio, fica um buraco no meio da tela. Pois há uma propriedade de justify-content: space-between; aplicada ao elemento pai. 
  Detalhes Série/Filmes - como voltar para busca ou para a última página vista?
    Isso funcionaria bem?

*/

const apiKey = `813d93e896605a2bcbd5b1ab9a618aac`
const path = window.location.pathname
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const searchTerm = urlParams.get('search-term')
const type = urlParams.get('type')

const createSlide = () => {
    const swiper = new Swiper('.swiper', {
      direction: 'horizontal',
      loop: true,
      breakpoints: { 
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 30
        },
        960: { 
          slidesPerView: 4,
          spaceBetween: 40
        },
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
}

// Now Playing 
const fetchNowPlayingMovies = async () => {
  const nowPlayingURL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=pt-BR`

  const response = await fetch(nowPlayingURL)
  const movies = await response.json()
  const moviesArray = movies.results

  displayNowPlayingIntoDOM(moviesArray)
}

const displayNowPlayingIntoDOM = movie => {
  const slider = document.querySelector('.swiper-wrapper')
  const top10Movies = movie.slice(0, 10)
  
  top10Movies.forEach(item => {
    const imageUrl = `https://image.tmdb.org/t/p/w500/${item.poster_path}`

    slider.innerHTML += 
    `
    <div class="swiper-slide">
      <a href="movie-details.html?id=${item.id}">
        <img src="${imageUrl}" alt="${item.title}" />
      </a>
      <h4 class="swiper-rating">
        <i class="fas fa-star text-secondary"></i>${item.vote_average} / 10
      </h4>
    </div>`
  });
}

// Popular Movies
const fetchPopularMovies = async () => {
  const moviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=813d93e896605a2bcbd5b1ab9a618aac&language=pt-BR&page=1`
  
  const response = await fetch(moviesUrl)
  const movies = await response.json()
  const moviesArray = movies.results

  displayPopularMoviesIntoDOM(moviesArray)
}

const displayPopularMoviesIntoDOM = movies => {
  const popularMovies = document.querySelector('#popular-movies')

  movies.forEach(movie => {
    const imageUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`

    popularMovies.innerHTML += 
    `<div class="card">
        <a href="movie-details.html?id=${movie.id}">
          <img
            src="${imageUrl}"
            class="card-img-top"
            alt="${movie.title}"
          />
        </a>
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text">
            <small class="text-muted">Lançamento: ${movie.release_date}</small>
          </p>
      </div>
    </div>`
  });
}

// Movie Details
const fetchMovieDetails = async () => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=813d93e896605a2bcbd5b1ab9a618aac&language=pt-BR`)
    const movie = await response.json()

    insertMoviesDetailsIntoDom(movie)
  } catch (error) {
    console.error('Erro na chamada da API', error)
  }
}

const insertMoviesDetailsIntoDom = movie => {
  const movieDetails = document.querySelector('#movie-details')
  const imageUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`

  const genresList = movie.genres.map(genre => `<li>${genre.name}</li>`).join('')
  const companiesList = movie.production_companies.map(company => company.name).join(', ')
  const overviewText = movie.overview && movie.overview !== "" ? movie.overview : "Sinopse indisponível";


  movieDetails.innerHTML = `
  <div class="details-top">
          <div>
            <img
              src="${imageUrl}"
              class="card-img-top"
              alt="${movie.title}"
            />
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average} / 10
            </p>
            <p class="text-muted">Lançamento: ${movie.release_date}</p>
            <p>
            ${overviewText}
            </p>
            <h5>Gêneros</h5>
            <ul class="list-group">
              ${genresList}
            </ul>
            <a href="${movie.homepage}" target="_blank" class="btn">Visitar página do Filme</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Detalhes</h2>
          <ul>
            <li><span class="text-secondary">Orçamento:</span> ${movie.budget}</li>
            <li><span class="text-secondary">Bilheteria:</span> ${movie.revenue}</li>
            <li><span class="text-secondary">Duração:</span> ${movie.runtime} minutos</li>
            <li><span class="text-secondary">Status:</span> ${movie.release_date}</li>
          </ul>
          <h4>Produtoras</h4>
          <div class="list-group">${companiesList}</div>
        </div>
  `
}

// Popular Shows
const fetchPopularTvShows = async () => {
  const showsUrl = `https://api.themoviedb.org/3/tv/popular?api_key=813d93e896605a2bcbd5b1ab9a618aac&language=pt-BR&page=1`
  
  const response = await fetch(showsUrl)
  const shows = await response.json()
  const showsArray = shows.results

  console.log(showsArray)

  displayPopularTvShowsIntoDOM(showsArray)
}

const displayPopularTvShowsIntoDOM = movies => {
  const popularShows = document.querySelector('#popular-shows')

  movies.forEach(show => {
    const imageUrl = `https://image.tmdb.org/t/p/w500/${show.poster_path}`

    popularShows.innerHTML += 
    `<div class="card">
      <a href="tv-details.html?id=${show.id}">
        <img
          src="${imageUrl}"
          class="card-img-top"
          alt="${show.name}"
        />
      </a>
      <div class="card-body">
        <h5 class="card-title">${show.name}</h5>
        <p class="card-text">
          <small class="text-muted">Exibido: ${show.first_air_date}</small>
        </p>
      </div>
    </div>`
  });
}

const fetchShowDetails = async () => {
  const showUrl = `https://api.themoviedb.org/3/tv/${id}?api_key=813d93e896605a2bcbd5b1ab9a618aac&language=pt-BR`
  try {
    const response = await fetch(showUrl)
    const show = await response.json()
    console.log(show, id)

    insertShowDetailsIntoDom(show)
  } catch (error) {
    console.error('Erro na chamada da API', error)
  }
}

const insertShowDetailsIntoDom = show => {
  const showDetails = document.querySelector('#show-details')
  
  const imageUrl = `https://image.tmdb.org/t/p/w500/${show.poster_path}`
  const genresList = show.genres.map(genre => `<li>${genre.name}</li>`).join('')
  const companiesList = show.production_companies.map(company => company.name).join(', ')
  const overviewText = show.overview && show.overview !== "" ? show.overview : "A sinopse deste programa não está disponível. Para mais informações, acesse o site oficial.";
  const siteBtnText = show.homepage === "" ? `Site indisponível` : `Site Oficial`

  showDetails.innerHTML = `
    <div class="details-top">
      <div>
        <img
          src="${imageUrl}"
          class="card-img-top"
          alt="${show.name}"
        />
      </div>
      <div>
        <h2>${show.name}</h2>
        <p>
          <i class="fas fa-star text-primary"></i>
          ${show.vote_average} / 10
        </p>
        <p class="text-muted">Lançamento: ${show.first_air_date}</p>
        <p>
        ${overviewText}
        </p>
        <h5>Gêneros</h5>
        <ul class="list-group">
        ${genresList}
        </ul>
        <a href="${show.homepage}" target="_blank" class="btn">${siteBtnText}</a>
      </div>
    </div>
    <div class="details-bottom">
      <h2>Mais informações</h2>
      <ul>
        <li><span class="text-secondary">Número de Episódios:</span> ${show.number_of_episodes}</li>
        <li>
          <span class="text-secondary">Último episódio transmitido:</span> ${show.last_episode_to_air.air_date}
        </li>
        <li><span class="text-secondary">Status:</span> ${show.status}</li>
      </ul>
      <h4>Produtoras</h4>
      <div class="list-group">${companiesList}</div>
    </div>`
}

// o código das fetchs é bem repetitivo. Como reutilizar isso? 
  // fazer funcionar primeiro. Refatorar depois.


const searchForm = document.querySelector('.search-form');

const searchMoviesOrShows = (e) => {
  e.preventDefault()

  const selectedRadio = document.querySelector('.search-radio input[type="radio"]:checked').value;
  const querie = document.querySelector('#search-term').value;
  
  searchForm.action = "/search.html?type=" + encodeURIComponent(selectedRadio) 
  + "&search-term=" + encodeURIComponent(querie);
  
  window.location.href = searchForm.action
  searchForm.reset()
}

const fetchSearchQuerie = async () => {
  const searchUrl = `https://api.themoviedb.org/3/search/${type}?api_key=813d93e896605a2bcbd5b1ab9a618aac&language=pt-BR&query=${searchTerm}&page=1&include_adult=false`

  const response = await fetch(searchUrl)
  const shows = await response.json()
  console.log(type, searchTerm, shows)

  insertSearchResultsIntoDom(shows.results)
}

const insertSearchResultsIntoDom = shows => {
  const showDetails = document.querySelector('#search-results')
  
  shows.forEach(show => {
    let imageUrl = ``
    let detailsLink = ``
    const title = show.name ? show.name : show.title
    const releaseDate = show.release_date ? show.release_date : show.first_air_date
    
    if (show.poster_path === null) {
      imageUrl = `images/no-image.jpg`
    } else {
      imageUrl = `https://image.tmdb.org/t/p/w500/${show.poster_path}`
    }

    if (type === `tv`) {
      detailsLink = `tv-details.html?id=${show.id}`
    } else {
      detailsLink = `movie-details.html?id=${show.id}`
    }

    showDetails.innerHTML += 
    `<div class="card">
      <a href="${detailsLink}">
        <img src="${imageUrl}" class="card-img-top" alt="${title}" />
      </a>
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">
          <small class="text-muted">Lançamento: ${releaseDate}</small>
        </p>
      </div>
    </div>`
  })
}

const init = () => {
  if (path === `/index.html`) {
    createSlide()
    fetchNowPlayingMovies()
    fetchPopularMovies()
    searchForm.addEventListener('submit', searchMoviesOrShows)
  } else if (path.includes(`/movie-details.html`)) {
    fetchMovieDetails()
  } else if (path.includes(`/shows.html`)){
    fetchPopularTvShows()
  } else if (path.includes(`/tv-details.html`)) {
    fetchShowDetails()
  } else if (path.includes(`/search.html`)) {
    fetchSearchQuerie()
  }
}

document.addEventListener('DOMContentLoaded', init)