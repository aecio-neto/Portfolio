/* Links úteis
https://swiperjs.com/
https://developers.themoviedb.org/3/getting-started/introduction
api key  - 
813d93e896605a2bcbd5b1ab9a618aac
api ulr - 
https://api.themoviedb.org/3/movie/76341?api_key=<<api_key>>
exemplo requisição - 
https://api.themoviedb.org/3/movie/550?api_key=813d93e896605a2bcbd5b1ab9a618aac
token leitura api - 
eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTNkOTNlODk2NjA1YTJiY2JkNWIxYWI5YTYxOGFhYyIsInN1YiI6IjY0M2U5MmU4YzYwMDZkMDRmZjgwYjc5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.V5pOy6fbFIKdbta9zNUL2oQHCTJGs5xKHNqg-a2hyMY
*/

/* Recursos 

Slider na primeira página - ok
20 filmes ou séries na primeira página - ok
Paginação no resultado da pesquisa
Alerta, caso a busca não tenha nada escrito
 */

/* Passo a passo
Inserir slider na página principal ok 
Buscar dados dos filmes via fetch api e popular esse slider. - ok
Popular o feed de filmes populares - ok
Usar a página de movie-detais. 

Dúvidas / Bugs
Onde guardar as chaves das apis? 
Como trabalhar com menos requests a cada inserção de dados/imagens?
Como mudar o formato da data?
Inserir classes/ids no html e modificar o conteúdo a partir das consts? 
Problema com carregamento do nome das produtoras, alguns filmes não são carregados.
Slider não funciona ao inverso (primeiro item)

*/

const apiKey = `813d93e896605a2bcbd5b1ab9a618aac`
const path = window.location.pathname
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

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
            ${movie.overview}
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

const init = () => {
  if (path === `/index.html`) {
    createSlide()
    fetchNowPlayingMovies()
    fetchPopularMovies()
  } else if (path.includes`/movie-details.html`) {
    fetchMovieDetails()
  }
}

document.addEventListener('DOMContentLoaded', init)