const endpoint = "https://striveschool-api.herokuapp.com/api/movies/";
let categories = [];
let parentElement = document.getElementsByClassName(
  "container-fluid content"
)[0];

const getCategories = async () => {
  try {
    const response = await fetch(endpoint, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgwMTk0N2IxZjBmYjAwMTVkOTE3ODYiLCJpYXQiOjE2MTkwMDc4MTUsImV4cCI6MTYyMDIxNzQxNX0.5aA8jMjlV02DqZlvnNr3gvugFDUf0vHMnmO5PZaiUi4",
      },
    });
    categories = await response.json();

    if (response.ok) {
      await populateCarousel(categories);
    }
  } catch (error) {
    console.log(error);
  }
};

window.onload = async () => {
  getCategories();
};

/* 
 const res = await fetch(url, {
   headers: {
     Authorization:
       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgwMTk0N2IxZjBmYjAwMTVkOTE3ODYiLCJpYXQiOjE2MTkwMDc4MTUsImV4cCI6MTYyMDIxNzQxNX0.5aA8jMjlV02DqZlvnNr3gvugFDUf0vHMnmO5PZaiUi4",
   },
 }); */

const populateCarousel = async () => {
  const moviesArr = await Promise.all(
    categories.map(async (category) => {
      const res = await fetch(endpoint + category, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgwMTk0N2IxZjBmYjAwMTVkOTE3ODYiLCJpYXQiOjE2MTkwMDc4MTUsImV4cCI6MTYyMDIxNzQxNX0.5aA8jMjlV02DqZlvnNr3gvugFDUf0vHMnmO5PZaiUi4",
        },
      });
      return await res.json();
    })
  );

  moviesArr.forEach((movie) => {
    let chuncks = [];
    let k = 0;

    while (k < movie.length) {
      chuncks.push(movie.slice(k, (k += 6)));
      console.log(chuncks);
    }

    const gallery = `<div class="gallery">
      <h5>${movie[0].category}</h5>
      <div id="${
        movie[0].category
      }" class="carousel slide" data-bs-slide="carousel">
        <div class="carousel-inner">
        ${chuncks
          .map(
            (chunck, i) => `<div class="carousel-item ${
              i === 0 ? "active" : ""
            }">
            <div class="slide1">
              <div class="row">
              ${chunck
                .map(
                  (item) => `<div class="col-md-2">
                  <img src="assets/media/${item.imageUrl}" alt="" class="movie-image" />
                </div>`
                )
                .join("")}
                
               
              </div>
            </div>
          </div>`
          )
          .join("")}
          
          
        </div>
        <a class="carousel-control-prev" href="#${
          movie[0].category
        }" role="button" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        </a>
        <a class="carousel-control-next" href="#${
          movie[0].category
        }" role="button" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
        </a>
      </div>
    </div>`;

    parentElement.innerHTML += gallery;
  });
};
