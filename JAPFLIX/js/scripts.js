
const inputBuscar = document.getElementById('inputBuscar');
const btnBuscar = document.getElementById('btnBuscar');
const lista = document.getElementById('lista');


let datosPeliculas; // Store retrieved movie data

fetch('https://japceibal.github.io/japflix_api/movies-data.json')
    .then(response => response.json())
    .then(data => {
        datosPeliculas = data;
    })
    .catch(error => {
        console.error('Error al obtener los datos:', error);
    });

btnBuscar.addEventListener('click', () => {
    const busqueda = inputBuscar.value.toLowerCase(); // Get search term in lowercase

    if (!busqueda) {
        return; // Do nothing if search term is empty
    }

    const resultados = datosPeliculas.filter(pelicula => {
        const tituloMinus = pelicula.title.toLowerCase();
        const overviewMinus = pelicula.overview.toLowerCase();
        const taglinesMinus = pelicula.tagline?.toLowerCase(); // Optional chaining for tagline

        // Check for search term in title, overview, and tagline (if available)
        return (tituloMinus.includes(busqueda) ||
            overviewMinus.includes(busqueda) ||
            (taglinesMinus && taglinesMinus.includes(busqueda)));
    });

    lista.innerHTML = ''; // Clear previous search results

    if (resultados.length === 0) {
        lista.innerHTML = '<li>No se encontraron películas coincidentes.</li>';
    } else {
        resultados.forEach(pelicula => {
            const titulo = pelicula.title;
            const descripcion = pelicula.tagline;
            const calificacion = pelicula.vote_average;
            const overview = pelicula.overview;

            // Utilizando el método split() (ejemplo)
            const debut = pelicula.release_date.split('-')[0];
            console.log(debut);

            const duracion = pelicula.runtime
            const presupuesto = pelicula.budget
            const ganancias = pelicula.revenue
            const genres = [];
            for (const genre of pelicula.genres) {
                genres.push(genre.name);
            }



            let contenedor = '<div class="card"><div class="card-body">';
            // Calcula el número de estrellas a mostrar
            const estrellasLlenas = Math.round(calificacion / 2);
            const estrellasVacias = 5 - estrellasLlenas;

            // Crea las estrellas
            let estrellasHTML = '';
            for (let i = 0; i < estrellasLlenas; i++) {
                estrellasHTML += '<span class="fa fa-star checked"></span>';
            }
            for (let i = 0; i < estrellasVacias; i++) {
                estrellasHTML += '<span class="fa fa-star"></span>';
            }


            let listItem = `<div  type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop"> 
            <li><h3 class="card-title">${titulo}</h3>
      <p class="card-text">${descripcion}</p>
      <div class="rating">${estrellasHTML}</div>
    </li></div></div>
    <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasTopLabel"> ${titulo}</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <p> ${overview} </p> <hr> 
   <div id= "botones"> <p> ${genres} </p>

    <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    Más
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
  <p class="dropdown-item" > Año: ${debut} </p>
  <p class="dropdown-item" > Duración: ${duracion} </p>
  <p class="dropdown-item" > Presupuesto: $ ${presupuesto} </p>
  <p class="dropdown-item" > Ganancias: $ ${ganancias} </p>
  </ul>
</div>
</div>


  </div>
</div>`;

            lista.innerHTML += listItem;

        });
    }
});

const offcanvasElementList = document.querySelectorAll('.offcanvas')
const offcanvasList = [...offcanvasElementList].map(offcanvasEl => new bootstrap.Offcanvas(offcanvasEl))



