// Verifica el usuario 
/* Por medio de esta función se verifica el estado del usuario para saber si 
existe un registro de este en la base de datos de firebase */
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log('existe usuario');
    window.location.assign('../views/home.html');
  } else {
    console.log('no existe usuario');
  }
});

// Función guardar nombre en currentUser.displayName
/* Con esta función capturamos el nombre del usuario que se registro y lo actualizamos
al perfil que nos genera automaticamente firebase */

const nameDisplay = (name) => {
  firebase.auth().onAuthStateChanged(function(user) {
    user.updateProfile({
      displayName: name
    });
  });
};

// Envía un mensaje de verificación al usuario
/* Una vez que el usuario se registra se envía un correo de verificación para 
que el usuario este al tanto de su ingreso a la red social */

const check = () => {
  let user = firebase.auth().currentUser; 
  user.sendEmailVerification().then(function() {
  //window.location.assign('../views/home.html');
  }).catch(function(error) {
    console.log(error);
  });
};

// Registro usuario con Google
/* Una opción que tienen el usuario es entrar utilizando una red social */

buttonGoogle.addEventListener('click', google => {
  let provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    let user = result.user;
    let data = {
      name: user.displayName,
      uid: user.uid,
      email: user.email
    }; 
    database.ref('user').update(data);
    let keyUser = userNew.getKey();
    getKeyUser(keyUser);
  })
    .catch(function(error) {
    // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
    // ...
    });
});

// Ingresar con Facebook

buttonFacebook.addEventListener('click', facebook => {
  let provider = new firebase.auth.FacebookAuthProvider();
  console.log(provider);
  provider = provider.addScope('public_profile');
  console.log(provider);
  firebase.auth().signInWithPopup(provider).then(function(result) {
    console.log(provider);
    let token = result.credential.accesstoken;
    console.log(token);
    let user = result.user;
    let data = {
      name: user.displayName,
      uid: user.uid,
      email: user.email
    }; 
    database.ref('user').update(data);
    let keyUser = userNew.getKey();
    getKeyUser(keyUser);
  })
    .catch(function(error) {
    // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
    // ...
    });
});

