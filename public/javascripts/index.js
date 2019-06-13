let token = "";

function getToken() {
  return fetch("/auth")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      //console.log(data);
      token = data.access_token;
    });
}

getToken();

function requestArtists(name) {
  return fetch(`https://api.spotify.com/v1/search?q=${name}&type=artist`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      return data.artists.items;
    });
}

function renderArtists(artists) {
  const artistList = document.querySelector("#artists");
  artistList.innerHTML = null;

  artists.forEach(artist => {
    const name = artist.name;
    const imageUrl = artist.images.length ? artist.images[0].url : "";
    const genresList = artist.genres;

    const div = document.createElement("div");
    div.className = "artist";

    const nombre = document.createElement("div");
    nombre.className = "nombre";
    nombre.innerHTML = name;

    div.appendChild(nombre);

    if (imageUrl && imageUrl.length) {
      const imagen = document.createElement("img");
      imagen.className = "imagen";
      imagen.src = imageUrl;

      div.appendChild(imagen);
    }

    const genres = document.createElement("ul");
    div.appendChild(genres);

    genresList.forEach(function(genre) {
      const genreElem = document.createElement("li");

      genreElem.innerHTML = genre;

      genres.appendChild(genreElem);
    });

    artistList.appendChild(div);
  });
}

function searchArtist() {
  const artistName = document.querySelector("#artistName");

  requestArtists(artistName.value).then(artists => renderArtists(artists));
}

//curl -X GET "https://api.spotify.com/v1/search?q=tania%20bowra&type=artist" -H
