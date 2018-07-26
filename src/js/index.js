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
const buttonFile = document.getElementById('file');


buttonRegistry.addEventListener('click', registryUser);
buttonEnter.addEventListener('click', enterUser);
buttonGoogle.addEventListener('click', loginGoogle);
buttonSingOut.addEventListener('click', signOut);
buttonPost.addEventListener('click', writeNewCommentary);
buttonFile.addEventListener('click', saveImage);

// Verifica el usuario 

const observer = () => {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user !== null) {
      name = user.displayName;
      email = user.email;
      uid = user.uid,
      photoUrl = user.photoUrl;
      console.log('existe usuario');
      enterUserPrint(user);
      console.log(user);
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
  };
  let userNew = ref.push(data);
  let keyUser = userNew.getKey();
  // console.log(keyUser); // este es el identificador de la base de datos con lo que se guarda
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function() {
      check();
    })
    .catch(function(error) {
      let errorCode = error.code;
      let errorMessage = 'Revisa la información';
      console.log(errorCode);
      alert(errorMessage);
    });
  nameDisplay(name);
  getKeyUser(keyUser);
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
    alert('Te enviamos un correo para que confirmes tu cuenta');
  }).catch(function(error) {
    console.log(error);
  });
};

// Registro usuario con Google

const provider = new firebase.auth.GoogleAuthProvider();
const loginGoogle = () => {
  firebase.auth().signInWithPopup(provider).then(function(result) {
    let user = result.user;
    // console.log(user);
    let data = {
      name: user.displayName,
      uid: user.uid,
      email: user.email
    }; 
    // console.log(data);
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
};

// Ingresa el usuario
 
const enterUser = () => {
  let email = emailUser.value;
  let password = passwordUser.value;
      
  firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(function(error) {
      let errorCode = error.code;
      let errorMessage = 'Escribe un usuario o contraseña validos';
      console.log(errorCode);
      alert(errorMessage);
    });
};
// Traer el nombre del usuario activo
const getUserName = (user) => {
  return firebase.auth().currentUser.displayName;
};

// Traer el uid del usuario activo
const getUserUid = (user) => {
  return firebase.auth().currentUser.uid;
};

// Traer imagen de usuario
const getUserImage = (user) => {
  return firebase.auth().currentUser.photoUrl;
};

// Traer la llave de identificación de firebase
const getKeyUser = (keyUser) => {
  const keyUserLoggedIn = keyUser;
  return keyUserLoggedIn;
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

// Función para obtener fecha

const datePost = () => {
  let dateFormat = new Date();
  let day = dateFormat.getUTCDate();
  let month = dateFormat.getMonth() + 1;
  let year = dateFormat.getFullYear();
  return day = day + '/' + month + '/' + year;
};

// Nuevo comentario

const writeNewCommentary = () => {
  const post = txtPost.value;
  if (post.length === 0 || /^\s+$/.test(post)) {
    alert('No has escrito nada');
  } else {
    firebase.database().ref('post').push({
      name: getUserName(),
      uid: getUserUid(),
      date: datePost(),
      post: post
    });
  }
};

// Subir imagenes (en construcción)

const saveImage = (element) => {
  let file = element.target.files[0];
  let storageRef = storage().ref('photos/' + file.name);
  storageRef.put(file);
};

// Eliminar comentario (en construcción)

const deletePost = (keyPost) => {
  database.ref('post').child(keyPost).remove();
};
