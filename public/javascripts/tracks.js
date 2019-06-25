let token = "";

// Obtiene el listado de artistas y lo guarda en una variable global
function getToken() {
  return fetch("https://spoti-auth.herokuapp.com/auth")
    .then(function(response) {
      // transforma la respuesta en un objeto de js
      return response.json();
    })
    .then(function(data) {
      // guarda el token de autenticacion en una variable global
      token = data.access_token;
    });
}

function getTracks() {
  const urlParams = new URLSearchParams(window.location.search);
  const artistId = urlParams.get("id");

  return fetch(
    `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=ar`,
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
      return data.tracks;
    });
}

function renderTrack(track) {
  const trackListDiv = document.getElementById("tracks");

  // Genra un elemento de la lista
  const trackDiv = document.createElement("div");
  trackDiv.className = "track";
  // Agrega el artista a la lista
  trackListDiv.appendChild(trackDiv);

  // Genra un elemento de la lista
  const nameDiv = document.createElement("div");
  nameDiv.innerHTML = track.name;
  nameDiv.className = "name";
  trackDiv.appendChild(nameDiv);

  // Genra un elemento de la lista
  const audioDiv = document.createElement("audio");
  audioDiv.className = "audio";
  audioDiv.controls = 'controls';
  audioDiv.src      = track.preview_url;
  audioDiv.type     = 'audio/mpeg';

  trackDiv.appendChild(audioDiv);
}


function renderTracks(tracks) {
    console.log('renderTracks')

    for (let i = 0; i < tracks.length; i++) {
        const track = tracks[i];

        renderTrack(track);
      }
}

function init() {
  console.log("init");

  getToken().then(function() {

    console.log('getToken');
    getTracks().then(function(tracks) {
        console.log('getTracks');

        renderTracks(tracks)
    })
  });
}
