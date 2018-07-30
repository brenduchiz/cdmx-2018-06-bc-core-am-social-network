// Elementos Dom
const txtEmail = document.getElementById('email');
const txtName = document.getElementById('name');
const txtPassword = document.getElementById('password');
const passwordUser = document.getElementById('passwordUser');
const emailUser = document.getElementById('emailUser');
const buttonRegistry = document.getElementById('registry');
const buttonEnter = document.getElementById('enter');
const buttonGoogle = document.getElementById('loginGoogle');
const buttonFacebook = document.getElementById('loginFacebook');

// Verifica el usuario 


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log('existe usuario');
    window.location.assign('../views/home.html');
  } else {
    console.log('no existe usuario');
  }
});


// Registro de usuario

buttonRegistry.addEventListener('click', registry => {
  let email = txtEmail.value;
  let password = txtPassword.value;
  let name = txtName.value;
  let ref = database.ref('user');
  let data = {
    name: name,
    email: email,
  };
  let userNew = ref.push(data);
  let keyUser = userNew.getKey();
  console.log(keyUser); // este es el identificador de la base de datos con lo que se guarda
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function() {
      check();
      alert('Te enviamos un correo para que confirmes tu cuenta');
      window.location.assign('../views/index.html');
    })
    .catch(function(error) {
      let errorCode = error.code;
      let errorMessage = 'Revisa la información';
      console.log(errorCode);
      alert(errorMessage);
    });
  nameDisplay(name);
});

// Función guardar nombre en currentUser.displayName

const nameDisplay = (name) => {
  firebase.auth().onAuthStateChanged(function(user) {
    user.updateProfile({
      displayName: name
    });
  });
};

// Envía un mensaje de verificación al usuario

const check = () => {
  let user = firebase.auth().currentUser; 
  user.sendEmailVerification().then(function() {
    
  }).catch(function(error) {
    console.log(error);
  });
};

// Registro usuario con Google

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

// Ingresa el usuario

buttonEnter.addEventListener('click', enter =>{
  let email = emailUser.value;
  let password = passwordUser.value;
 
  firebase.auth().signInWithEmailAndPassword(email, password)
  
    .then(function() {
      setTimeout((event) => {
        window.location.reload();
      }, 2000);
    })
    .catch(function(error) {
      let errorCode = error.code;
      let errorMessage = 'Escribe un usuario o contraseña validos';
      console.log(errorCode);
      alert(errorMessage);
    });
});