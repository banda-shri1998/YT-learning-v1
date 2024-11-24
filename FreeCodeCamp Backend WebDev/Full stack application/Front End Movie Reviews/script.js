const APILINK =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=41ee980e4b5f05f6693fda00eb7c4fd4&page=1";

const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
// const SEARCHAPI = "";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=41ee980e4b5f05f6693fda00eb7c4fd4&query=";

const main = document.getElementById("section");
const form = document.querySelector(".form");
const search = document.getElementById("query");

returnMovies(APILINK);
function returnMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      data.results.forEach((element) => {
        main.innerHTML += `
        <div class="row">
          <div class="column">
            <div class="card">
              <center>
                <img src="${IMG_PATH + element.poster_path}" alt="Movie Poster" class="thumbnail" />
              </center>
              <h3>${element.title}<br><a href="movie.html?id=${element.id}&title=${element.title}">Reviews</a></h3>
            </div>
          </div>
        </div>`;
      });
    });
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchItem = search.value;
  if (searchItem) {
    debugger
    main.innerHTML = ``;
    returnMovies(SEARCHAPI + searchItem);
    search.value = "";
  }
});
