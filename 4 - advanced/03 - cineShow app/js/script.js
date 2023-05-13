const apiKey = `api_key=813d93e896605a2bcbd5b1ab9a618aac`
const searchForm = document.querySelector('.search-form')
const path = window.location.pathname
const urlParams = new URLSearchParams(window.location.search)
const id = urlParams.get('id')

console.log(path)

const createSlide = () => {
    const swiper = new Swiper('.swiper', {
      direction: 'horizontal',
      loop: true,
      spaceBetween: 30,
      breakpoints: { 
        320: {
          slidesPerView: 1,
        },
        480: {
          slidesPerView: 2,
        },
        960: { 
          slidesPerView: 4,
        },
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    })
}

const fetchData = async (url, callback) => {
  try {
    const response = await fetch(url)
    const data = await response.json()
    callback(data.results)
  } catch (error) {
    console.error('Erro na chamada da API', error)
  }
}

// No Cinema
const fetchNowPlayingMovies = async () => {
  const nowPlayingURL = `https://api.themoviedb.org/3/movie/now_playing?${apiKey}&language=pt-BR`
  fetchData(nowPlayingURL, displayNowPlayingIntoDOM)
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
  })
}

// Popular Movies
const fetchPopularMovies = async () => {
  const moviesUrl = `https://api.themoviedb.org/3/movie/popular?${apiKey}&language=pt-BR&page=1`
  fetchData(moviesUrl, displayPopularMoviesIntoDOM)
}

const displayPopularMoviesIntoDOM = movies => {
  const popularMovies = document.querySelector('#popular-movies')

  movies.forEach(movie => {
    let date = `${movie.release_date}`
    date = date.split("-").reverse().join("/")
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
            <small class="text-muted">Lançamento: ${date}</small>
          </p>
      </div>
    </div>`
  })
}

// Movie Details
const fetchMovieDetails = async () => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?${apiKey}&language=pt-BR`)
    const movie = await response.json()

    insertMoviesDetailsIntoDom(movie)
  } catch (error) {
    console.error('Erro na chamada da API', error)
  }
}

const insertMoviesDetailsIntoDom = movie => {
  const containerBg = document.querySelector('#container-bg')
  const movieDetails = document.querySelector('#movie-details')
  const imageUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
  const backdropImg = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
  const genresList = movie.genres.map(genre => `<li>${genre.name}</li>`).join('')
  const companiesList = movie.production_companies.map(company => company.name).join(', ')
  const overviewText = movie.overview && movie.overview !== "" ? movie.overview : "Sinopse indisponível"
  
  containerBg.style.background = `url(${backdropImg}) no-repeat center center/cover`
  movieDetails.style.backgroundColor = `rgba(0, 0, 0, 0.7)`

  let date = `${movie.release_date}`
  date = date.split("-").reverse().join("/")
  
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
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Lançamento: ${date}</p>
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
const loadPopularMovies = async () => {
  const showsUrl = `https://api.themoviedb.org/3/tv/popular?${apiKey}&language=pt-BR&page=1`
  fetchData(showsUrl, displayPopularTvShowsIntoDOM) 
}

const displayPopularTvShowsIntoDOM = movies => {
  const popularShows = document.querySelector('#popular-shows')

  movies.forEach(show => {
    const imageUrl = `https://image.tmdb.org/t/p/w500/${show.poster_path}`

    let date = `${show.first_air_date}`
    date = date.split("-").reverse().join("/")

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
          <small class="text-muted">Exibido: ${date}</small>
        </p>
      </div>
    </div>`
  })
}

const loadShowDetails = async () => {
  const showUrl = `https://api.themoviedb.org/3/tv/${id}?${apiKey}&language=pt-BR`
  
  try {
    const response = await fetch(showUrl)
    const show = await response.json()
    insertShowDetailsIntoDom(show)

  } catch (error) {
    console.error('Erro na chamada da API', error)
  }
}

const insertShowDetailsIntoDom = show => {
  const showBackground = document.querySelector('#show-background')
  const showDetails = document.querySelector('#show-details')
  const imageUrl = `https://image.tmdb.org/t/p/w500/${show.poster_path}`
  const backdropImg = `https://image.tmdb.org/t/p/original/${show.backdrop_path}`
  const genresList = show.genres.map(genre => `<li>${genre.name}</li>`).join('')
  const companiesList = show.production_companies.map(company => company.name).join(', ')
  const overviewText = show.overview && show.overview !== "" 
  ? show.overview 
  : `A sinopse deste programa não está disponível. Para mais informações, acesse o site oficial.`
  
  const siteBtnText = show.homepage === "" ? `Site indisponível` : `Site Oficial`

  showBackground.style.background = `url(${backdropImg}) no-repeat center center/cover`
  showDetails.style.backgroundColor = `rgba(0, 0, 0, 0.7)`

  let date = `${show.first_air_date}`
  date = date.split("-").reverse().join("/")

  let lastEpisodeDate = `${show.last_episode_to_air.air_date}`
  lastEpisodeDate = lastEpisodeDate.split("-").reverse().join("/")

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
          ${show.vote_average.toFixed(1)} / 10
        </p>
        <p class="text-muted">Lançamento: ${date}</p>
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
          <span class="text-secondary">Último episódio transmitido:</span> ${lastEpisodeDate}
        </li>
        <li><span class="text-secondary">Status:</span> ${show.status}</li>
      </ul>
      <h4>Produtoras</h4>
      <div class="list-group">${companiesList}</div>
    </div>`
}

const searchMoviesOrShows = (e) => {
  e.preventDefault()

  const selectedRadio = document.querySelector('.search-radio input[type="radio"]:checked').value
  const querie = document.querySelector('#search-term').value
  const searchTerm = document.querySelector('#search-term')
  const searchError = document.querySelector('#search-error')

  if (!searchTerm.value.trim()) {
    searchError.value = 'Digite um termo de pesquisa válido.'
    searchError.classList.add('alert')

    setTimeout(() => searchError.remove(), 2000)
    return
  }
  
  searchForm.action = `
  /search.html?type=${encodeURIComponent(selectedRadio)}&search-term=${encodeURIComponent(querie)}`
  window.location.href = searchForm.action
  searchForm.reset()
}

const updatePagination = (currentPage, totalPages) => {
  const showDetails = document.querySelector('#search-results')
  const pagination = document.querySelector('#pagination')
  const prevButton = pagination.querySelector('#prev')
  const nextButton = pagination.querySelector('#next')
  const pageCounter = pagination.querySelector('.page-counter')

  pageCounter.textContent = `Página ${currentPage} de ${totalPages}`
  prevButton.disabled = currentPage === 1
  nextButton.disabled = currentPage === totalPages

  prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--
      showDetails.innerHTML = ''
      fetchSearchQuerie(currentPage)
      updatePagination(currentPage)
    }
  })

  nextButton.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++
      showDetails.innerHTML = ''
      fetchSearchQuerie(currentPage)
      updatePagination(currentPage)
    }
  })
}

const fetchSearchQuerie = async (currentPage = 1) => {
  const searchTerm = urlParams.get('search-term')
  const type = urlParams.get('type')
  const searchUrl = `
  https://api.themoviedb.org/3/search/${type}?${apiKey}&language=pt-BR&query=${searchTerm}&page=${currentPage}&include_adult=false`
  
  const response = await fetch(searchUrl)
  const data = await response.json()
  
  const resultsPerPage = 20
  let totalResults = data.total_results
  let totalPages = Math.ceil(totalResults / resultsPerPage)
  
  updatePagination(currentPage, totalPages)
  insertSearchResultsIntoDom(data.results)
}

const insertSearchResultsIntoDom = shows => {
  const showDetails = document.querySelector('#search-results')
  const type = urlParams.get('type')

  showDetails.innerHTML = ''

  shows.forEach((show) => {
    let imageUrl = ``
    let detailsLink = ``
    const title = show.name ? show.name : show.title
    let releaseDate = show.release_date ? show.release_date : show.first_air_date

    if (releaseDate) {
      releaseDate = releaseDate.split("-").reverse().join("/")    
    }

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
  if (path === `/` || path === `/index.html`) {
    createSlide()
    fetchNowPlayingMovies()
    fetchPopularMovies()
    searchForm.addEventListener('submit', searchMoviesOrShows)
  } else if (path.includes(`/movie-details.html`)) {
    fetchMovieDetails()
  } else if (path.includes(`/shows.html`)){
    loadPopularMovies()
  } else if (path.includes(`/tv-details.html`)) {
    loadShowDetails()
  } else if (path.includes(`/search.html`)) {
    searchForm.addEventListener('submit', searchMoviesOrShows)
    fetchSearchQuerie()
  }
}

document.addEventListener('DOMContentLoaded', init)