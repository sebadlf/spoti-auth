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

function searchArtist() {
  const artistName = document.querySelector("#artistName");

  requestArtists(artistName.value).then(artists => console.log(artists));
}

//curl -X GET "https://api.spotify.com/v1/search?q=tania%20bowra&type=artist" -H
