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

Slider na primeira página
20 filmes ou séries na primeira página
Paginação no resultado da pesquisa
Alerta, caso a busca não tenha nada escrito
 */

/* Passo a passo
Inserir slider na página principal
Buscar dados dos filmes via fetch api e popular esse slider. 

Dúvidas
Onde guardar as chaves das apis? 
Como trabalhar com menos requests a cada inserção de dados/imagens?

*/

const apiKey = `813d93e896605a2bcbd5b1ab9a618aac`
const apiUlr = `https://api.themoviedb.org/3/movie/76341?api_key=${apiKey}&language=pt-BR`
const nowPlayingURL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=pt-BR`
const slider = document.querySelector('.swiper-wrapper')

const swiper = new Swiper('.swiper', {
  
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 2,
      spaceBetween: 30
    },
    // when window width is >= 920px
    920: {
      slidesPerView: 4,
      spaceBetween: 40
    },
  }
});

const fetchNowPlayingMovies = async () => {
  const response = await fetch(nowPlayingURL)
  const movies = await response.json()
  const moviesArray = movies.results

  console.log(moviesArray)
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

fetchNowPlayingMovies()

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


