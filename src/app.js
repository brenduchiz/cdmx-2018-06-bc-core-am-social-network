// Inicia Firebase

const config = {
  apiKey: 'AIzaSyDBuQ1AtjHYyog6rpCIBaWet68dp5RJv3Y',
  authDomain: 'red-social-4d185.firebaseapp.com',
  databaseURL: 'https://red-social-4d185.firebaseio.com/',
  projectId: 'red-social-4d185',
  storageBucket: 'red-social-4d185.appspot.com',
  messagingSenderId: '1044161778600'
};
firebase.initializeApp(config);

// Variables

const database = firebase.database();
let keyUser;
const user = firebase.auth().currentUser;

// Elementos Dom
const txtEmail = document.getElementById('email');
const txtName = document.getElementById('name');
const txtPassword = document.getElementById('password');
const passwordUser = document.getElementById('passwordUser');
const emailUser = document.getElementById('emailUser');
const buttonRegistry = document.getElementById('registry');
const buttonEnter = document.getElementById('enter');
const buttonGoogle = document.getElementById('loginGoogle');
const buttonSingOut = document.getElementById('singOut');
const txtPost = document.getElementById('commentary');
const buttonPost = document.getElementById('submit');
const post = document.getElementById('commentarys');

// Verifica el usuario 

let name, email, photoUrl, uid, emailVerified;

const observer = () => {
  firebase.auth().onAuthStateChanged(function(user) {
    // console.log(user);
    if (user != null) {
      name = user.displayName;
      email = user.email;
      uid = user.uid,
      photoUrl = user.photoUrl;
      console.log('existe usuario');
      enterUserPrint(user);
      getUserName(user);
    } else {
      console.log('no existe usuario');
    }
  });
};
observer();


// Registro de usuario

const registryUser = (user) => {
  let email = txtEmail.value;
  let password = txtPassword.value;
  let name = txtName.value;
  let ref = database.ref('user');
  let data = {
    name: name,
    email: email,
    uid: uid
  };
  let userNew = ref.push(data);
  keyUser = userNew.getKey();
  console.log(keyUser); // este es el identificador de la base de datos con lo que se guarda
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function() {
      check();
    })
    .catch(function(error) {
      let errorCode = error.code;
      let errorMessage = error.message;
    });
  console.log(name);
  nameDisplay(name);
};

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
    console.log('Enviando Correo');
  }).catch(function(error) {
    console.log(error);
  });
};

// Registro usuario con Google

let provider = new firebase.auth.GoogleAuthProvider();

const loginGoogle = () => {
  firebase.auth().signInWithPopup(provider).then(function(result) {
    let user = result.user;
    console.log(user);
    let ref = database.ref('user');
    console.log(ref);
    let data = {
      name: user.displayName,
      uid: user.uid,
      email: user.email
    }; 
    console.log(data);
    database.ref('user').push(data);
    let keyUser = userNew.getKey();
    console.log(keyUser);
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
};

// Perfil usuario
/*
const profile = (data) => {
  user.update({
    displayName: data.name
  }).then(function() {
    console.log(user);
  }).catch(function(error) {
  });
};
*/
// Ingresa el usuario
 
const enterUser = () => {
  let email = emailUser.value;
  let password = passwordUser.value;
      
  firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(function(error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
};
// Traer el nombre
const getUserName = (user) => {
  return firebase.auth().currentUser.displayName;
};

// Traer imagen de usuario
const getUserImage = (user) => {
  return firebase.auth().currentUser.photoUrl;
};

// Se Pinta usuario 

const enterUserPrint = (user) => {
  let userPrint = document.getElementById('usuario');
  if (user.emailVerified) {
    // document.getElementById('delate').style.display = 'none';
    userPrint.innerHTML = `
        <h4>Bienvenid@  ${user.displayName}</h4>
        `;
  };
};

// Cierra Sesión

const signOut = () => {
  firebase.auth().signOut()
    .then(function() {
      console.log('Saliendo...');
      document.getElementById('userName').style.display = 'none';
      document.getElementById('delate').style.display = 'block';
    })
    .catch(function(error) {
      console.log(error);
    });
};

// Cargar comentarios en el Muro

window.onload = function() {
  database.ref('post').on('child_added', function(data) {
    post.innerHTML += `
    <p> ${data.val().name} dice: ${data.val().post} </p>
    <p> ${data.val().date} </p>
    <input onclick"deletePost()"id="delete" type="button" value="Borrar"></input>
    `;
  });
};

// Fecha de post

const datePost = () => {
  let dateFormat = new Date();
  let day = dateFormat.getUTCDate();
  let month = dateFormat.getMonth() + 1;
  let year = dateFormat.getFullYear();
  return day = day + '/' + month + '/' + year;
};

// Nuevo comentario

const writeNewCommentary = (post) => {
  post = txtPost.value;
  let data = {
    name: getUserName(),
    date: datePost(),
    post: post
  };
  let newPost = database.ref('post').push(data);
  keyPost = newPost.getKey();
  console.log(keyPost); // Llave del post
};

// Eliminar comentario

const deletePost = (keyPost) => {
  database.ref('post').child(keyPost).remove();
};

// Función de prueba para la carga de mensajes, no funciona
/*
window.onload = function() {
  database.ref('post').on('value', function(snapshot) {
    post.innerHTML('');
    snapshot.forEach(element => {
      let Objeto = element.val();
      if (Objeto.post != null) {
        post.innerHTML += `
    <p> ${data.val().name} dice: ${data.val().post} </p>
    <p> ${data.val().date} </p>
    <input onclick"deletePost()"id="delete" type="button" value="Borrar"></input>
    `;
      }
    });
  });
};
*/

// Escuchar cambios en los mensajesno funciona
/*
const loadPost = () => {
  let callback = function(snap) {
    let data = snap.val();
    displayMessenge(snap.key, data.name, data.text, data.profilePicUrl);
  };
  firebase.database().ref('post').on('child_added', callback);
  firebase.database().ref('post').on('child_change', callback);
};
*/