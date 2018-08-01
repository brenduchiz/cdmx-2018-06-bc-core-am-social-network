// Verifica el usuario 
/* Función de firebase que nos ayuda a observar el estado de un usuario */
const observer = () => {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user !== null) {
      name = user.displayName;
      email = user.email;
      uid = user.uid;
      photoUrl = user.photoUrl;
      console.log('existe usuario');
      // console.log(user);
      enterUserPrint(user);
      getUserName(user);
      PerfileUsers(user);

      console.log(user);
    } else {
      console.log('no existe usuario');
    }
  });
};
observer();

// Traer el nombre del usuario activo
/* Con esta función podemos traer el nombre del usuario activo de acuerdo a la base de
datos de firebase */
const getUserName = (user) => {
  return firebase.auth().currentUser.displayName;
};

// Traer el uid del usuario activo
/* Esta información se puede utilizar para reconocer a usuarios especificos */
const getUserUid = (user) => {
  return firebase.auth().currentUser.uid;
};

// Traer imagen de usuario
const getUserImage = () => {
  let user = firebase.auth().currentUser;
  let image;
  if (user.providerData['0'].photoURL !== null) {
    image = user.providerData['0'].photoURL;
  } else {
    image = '../../images/usuario.jpg';
  }
  return image;
};

// Cierra Sesión

buttonSingOut.addEventListener('click', element => {
  firebase.auth().signOut()
    .then(function() {
      console.log('Saliendo...');
      window.location.assign('../views/index.html');
    })
    .catch(function(error) {
      console.log(error);
    });
});

// Función para obtener fecha

const datePost = () => {
  let dateFormat = new Date();
  let day = dateFormat.getUTCDate();
  let month = dateFormat.getMonth() + 1;
  let year = dateFormat.getFullYear();
  return day = day + '/' + month + '/' + year;
};

// Eliminar comentario
/* Esta función se llama directamente de los botones, cada botón tiene un ID único que
permite localizar la información en la base de datos. */
const deletePost = (keyPost) => {
  if (confirm('¿Quieres borrar este mensaje?')) {
    database.ref('post').child(keyPost).remove();
  } else {
    return false;
  }  
};

// Función para Likes

let likes = 0;
const like = (keyPost) => {
  likes++;
  let ref = database.ref('post').child(keyPost);
  let post = document.getElementById(keyPost).value;
  return ref.update({
    name: getUserName(),
    uid: getUserUid(),
    date: datePost(),
    post: post,
    keyPost: keyPost,
    like: likes
  });
};

// Función dislikes
const dislike = (keyPost) => {
  dislikes = likes--;
  let ref = database.ref('post').child(keyPost);
  let post = document.getElementById(keyPost).value;
  return ref.update({
    name: getUserName(),
    uid: getUserUid(),
    date: datePost(),
    post: post,
    keyPost: keyPost,
    like: dislikes
  });
};

// Subir imagenes (en construcción)
let imageFile;

const imagePost = () => {
  let image;
  if (imageFile)
    image = imageFile.files[0];
};