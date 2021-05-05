const endpoint = "https://striveschool-api.herokuapp.com/api/movies/";
let category;
let categoryContent = [];
let contentDiv = document.getElementById("genre-content");
let moviesData = [];

function populateContent() {
  contentDiv.innerHTML = `<h2 style="margin-bottom: 20px;">${category.toUpperCase()}</h2>`;
  contentDiv.innerHTML += `<div class="row" id='movies-row'></div>`;
  let moviesRow = document.getElementById("movies-row");
  categoryContent.forEach((item) => {
    moviesRow.innerHTML += `<div class="col-md-4">
          <div class="card mb-4 shadow-sm">
            <img src="assets/media/${item.imageUrl}" alt="">
            <div class="card-body">
              <p class="card-text">${item.description}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary">Play</button>
                  
                </div>
                <small class="text-muted">9 mins</small>
              </div>
            </div>
          </div>
        </div>`;
  });
}

async function getCategoryContent() {
  const response = await fetch(endpoint + category, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgwMTk0N2IxZjBmYjAwMTVkOTE3ODYiLCJpYXQiOjE2MTkwMDc4MTUsImV4cCI6MTYyMDIxNzQxNX0.5aA8jMjlV02DqZlvnNr3gvugFDUf0vHMnmO5PZaiUi4",
    },
  });

  categoryContent = await response.json();
  populateContent();
}

function createGenres() {
  let genreDiv = document.getElementById("genres-list");
  let temp = moviesData.sort(function (a, b) {
    // ASC  -> a.length - b.length
    // DESC -> b.length - a.length
    return a.length - b.length;
  });
  temp.forEach((genre) => {
    genreDiv.innerHTML += `<a class="dropdown-item" href="./genre.html?category=${genre}">${genre.toUpperCase()}</a>`;
  });
}

async function getContent() {
  const response = await fetch(endpoint, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgwMTk0N2IxZjBmYjAwMTVkOTE3ODYiLCJpYXQiOjE2MTkwMDc4MTUsImV4cCI6MTYyMDIxNzQxNX0.5aA8jMjlV02DqZlvnNr3gvugFDUf0vHMnmO5PZaiUi4",
    },
  });

  moviesData = await response.json();
  listLength = moviesData.length;
  createGenres();
}

window.onload = function () {
  let params = new URLSearchParams(document.location.search);
  category = params.get("category");
  getContent();
  getCategoryContent();
};
