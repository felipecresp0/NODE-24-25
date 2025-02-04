document.addEventListener("DOMContentLoaded", () => {
    fetchMovies();
});

function fetchMovies() {
    fetch("http://localhost:3000/peliculas")
        .then(response => response.json())
        .then(data => displayMovies(data))
        .catch(error => console.error("Error al obtener las películas:", error));
}

function displayMovies(movies) {
    const container = document.getElementById("movies-container");
    container.innerHTML = "";

    movies.forEach(movie => {
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");
        movieElement.innerHTML = `
            <img src="${movie.imagen_url}" alt="${movie.titulo}">
            <div class="movie-info">
                <h3>${movie.titulo}</h3>
                <p>Año: ${movie.anio}</p>
                <p>Género: ${movie.genero}</p>
                <button class="play-btn" onclick="playTrailer('${movie.trailer_url}')">▶ Reproducir</button>
                <button class="fav-btn" onclick="addToFavorites('${movie.titulo}')">❤️ Favorito</button>
            </div>
        `;

        // Evento para mostrar la información al pasar el mouse
        movieElement.addEventListener("mouseover", () => {
            movieElement.querySelector(".movie-info").style.opacity = "1";
        });

        // Evento para ocultar la información al salir el mouse
        movieElement.addEventListener("mouseleave", () => {
            movieElement.querySelector(".movie-info").style.opacity = "0";
        });

        container.appendChild(movieElement);
    });
}
function playTrailer(trailerUrl) {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn" onclick="closeModal()">&times;</span>
            <iframe width="100%" height="400px" src="${trailerUrl}" frameborder="0" allowfullscreen></iframe>
        </div>
    `;
    document.body.appendChild(modal);
}
function closeModal() {
    document.querySelector(".modal").remove();
}
function addToFavorites(movieTitle) {
    alert(`${movieTitle} ha sido añadida a Favoritos`);
}

        // Evento para mostrar la información al pasar el mouse
        movieElement.addEventListener("mouseover", () => {
            movieElement.querySelector(".movie-info").style.opacity = "1";
        });

        // Evento para ocultar la información al salir el mouse
        movieElement.addEventListener("mouseleave", () => {
            movieElement.querySelector(".movie-info").style.opacity = "0";
        });

        container.appendChild(movieElement);
        


function searchMovies() {
    const query = document.getElementById("search").value;
    fetch(`http://localhost:3000/peliculas`)
        .then(response => response.json())
        .then(data => {
            const filteredMovies = data.filter(movie => movie.titulo.toLowerCase().includes(query.toLowerCase()));
            displayMovies(filteredMovies);
        });
}

function filterByGenre(genre) {
    fetch(`http://localhost:3000/peliculas/genero/${genre}`)
        .then(response => response.json())
        .then(data => displayMovies(data));
}

function filterByCategory(category) {
    fetch(`http://localhost:3000/peliculas/categoria/${category}`)
        .then(response => response.json())
        .then(data => displayMovies(data));
}

document.getElementById("home-btn").addEventListener("click", () => {
    fetchMovies(); // Carga todas las películas
});



//caRRUSEL


let slideIndex = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const carousel = document.querySelector(".carousel");

function showSlide(index) {
    slideIndex = index;
    const offset = -index * 100;  // 🔥 Mueve el carrusel en lugar de ocultar imágenes
    carousel.style.transform = `translateX(${offset}%)`;
    
    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
}

function moveSlide(step) {
    slideIndex += step;
    if (slideIndex >= slides.length) slideIndex = 0;
    if (slideIndex < 0) slideIndex = slides.length - 1;
    showSlide(slideIndex);
}

function currentSlide(index) {
    showSlide(index);
}

function autoPlay() {
    moveSlide(1);
    setTimeout(autoPlay, 4000);
}

document.addEventListener("DOMContentLoaded", () => {
    showSlide(slideIndex);
    setTimeout(autoPlay, 4000);
});
