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
