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
// há vários paths para fazer requests. TV, Movies, Now Playing.

const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  slidesPerView: 3,
  spaceBetween: 30,
  // Pagination buttons
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

const slider = document.querySelector('.swiper-wrapper')

const fetchData = async () => {
  const response = await fetch(nowPlayingURL)
  const movies = await response.json()

  console.log(movies.results[1])
  displayNowPlayingIntoDOM(movies.results[0])
}

const displayNowPlayingIntoDOM = movie => {
  // como gerar múltiplos slides? 7, por exemplo? 
  const imageUrl = `https://image.tmdb.org/t/p/w400/${movie.poster_path}`

  slider.innerHTML = `
          <div class="swiper-slide">
            <a href="movie-details.html?id=1">
              <img src="./images/no-image.jpg" alt="Movie Title" />
            </a>
            <h4 class="swiper-rating">
              <i class="fas fa-star text-secondary"></i> 8 / 10
            </h4>
          </div>
            <div class="swiper-slide">
              <a href="movie-details.html?id=1">
                <img src="${imageUrl}" alt="${movie.title}" />
              </a>
              <h4 class="swiper-rating">
                <i class="fas fa-star text-secondary"></i>${movie.vote_average} / 10
              </h4>
            </div>`
}

fetchData()

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


