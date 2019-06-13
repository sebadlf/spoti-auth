let token = "";

// Obtiene el listado de artistas y lo guarda en una variable global
function getToken() {
  return fetch("/auth")
    .then(function(response) {
      // transforma la respuesta en un objeto de js
      return response.json();
    })
    .then(function(data) {
      // guarda el token de autenticacion en una variable global
      token = data.access_token;
    });
}

// Obtiene un listado de artistas para un nombre determinado
function requestArtists(artistName) {
  return fetch(
    `https://api.spotify.com/v1/search?q=${artistName}&type=artist`,
    {
      headers: {
        // Los llamados a spotify requieren un token de autenticacion valido
        Authorization: `Bearer ${token}`
      }
    }
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      // retorna solo la lista de artistas a partir de la estructura devuelta por el servidor
      // chequear estructura en la solapa de request
      return data.artists.items;
    });
}

function renderGenres(genres, artistDiv) {
  const genresList = document.createElement("ul");
  artistDiv.appendChild(genresList);

  for (let i = 0; i < genres.length; i++) {
    const genreName = genres[i];

    const genreElem = document.createElement("li");
    genreElem.innerHTML = genreName;
    genresList.appendChild(genreElem);
  }
}

function renderArtistElement(artist, divContainer) {
  const name = artist.name;
  const imageUrl = artist.images.length ? artist.images[0].url : "";
  const genresList = artist.genres;

  // Genra un elemento de la lista
  const div = document.createElement("div");
  div.className = "artist";

  // Agrega el artista a la lista
  divContainer.appendChild(div);

  // Agrega el nombre del artista
  const nombre = document.createElement("div");
  nombre.className = "nombre";
  nombre.innerHTML = name;
  div.appendChild(nombre);

  // Si existe, agrega una imagen
  if (imageUrl && imageUrl.length) {
    const imagen = document.createElement("img");
    imagen.className = "imagen";
    imagen.src = imageUrl;

    div.appendChild(imagen);
  }

  //Genera el listado de generos
  renderGenres(genresList, div);
}

function renderArtists(artists) {
  // Obtiene la referencia a la lista de artistas
  const artistList = document.querySelector("#artistList");

  // Borra el contenido de la lista
  artistList.innerHTML = null;

  for (let i = 0; i < artists.length; i++) {
    const artist = artists[i];

    renderArtistElement(artist, artistList);
  }
}

function searchArtist() {
  const artistName = document.querySelector("#artistName");

  const artistNameValue = artistName.value;

  requestArtists(artistNameValue).then(function(artists) {
    renderArtists(artists);
  });
}

//curl -X GET "https://api.spotify.com/v1/search?q=tania%20bowra&type=artist" -H
