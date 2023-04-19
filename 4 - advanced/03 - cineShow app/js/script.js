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
Inserir slider na página principal
Buscar dados dos filmes via fetch api e popular esse slider. 

Dúvidas
Onde guardar as chaves das apis? 
Como trabalhar com menos requests a cada inserção de dados/imagens?
Como mudar o formato da data?

*/

const apiKey = `813d93e896605a2bcbd5b1ab9a618aac`
const apiUlr = `https://api.themoviedb.org/3/movie/76341?api_key=${apiKey}&language=pt-BR`
const nowPlayingURL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=pt-BR`
const moviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=813d93e896605a2bcbd5b1ab9a618aac&language=pt-BR&page=1`
const slider = document.querySelector('.swiper-wrapper')
const popularMovies = document.querySelector('#popular-movies')

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
  }
});

const fetchNowPlayingMovies = async () => {
  const response = await fetch(nowPlayingURL)
  const movies = await response.json()
  const moviesArray = movies.results

  displayNowPlayingIntoDOM(moviesArray)
}

const displayNowPlayingIntoDOM = movie => {
  const top10Movies = movie.slice(0, 9)
  
  top10Movies.forEach(item => {
    const imageUrl = `https://image.tmdb.org/t/p/w500/${item.poster_path}`

    slider.innerHTML += 
    `
    <div class="swiper-slide">
      <a href="movie-details.html?id=1">
        <img src="${imageUrl}" alt="${item.title}" />
      </a>
      <h4 class="swiper-rating">
        <i class="fas fa-star text-secondary"></i>${item.vote_average} / 10
      </h4>
    </div>`
  });
}

const fetchPopularMovies = async () => {
  const response = await fetch(moviesUrl)
  const movies = await response.json()
  const moviesArray = movies.results

  console.log(moviesArray)
  displayPopularMoviesIntoDOM(moviesArray)
}

const displayPopularMoviesIntoDOM = movies => {

  movies.forEach(movie => {
    const imageUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`

    popularMovies.innerHTML += 
    `<div class="card">
        <a href="movie-details.html?id=1">
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

// display movies
// preciso fazer o fetch
// alterar o dom com os movies. 
// quanto? 

const init = () => {
  fetchNowPlayingMovies()
  fetchPopularMovies()
}

document.addEventListener('DOMContentLoaded', init)

/* Propriedades do objeto movie / now playing

results[0-15]
results
propriedades do objeto

backdrop_path:
original_title
overview
poster_path
release_date
original_title
vote_average
*/


