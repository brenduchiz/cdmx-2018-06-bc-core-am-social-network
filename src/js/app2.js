
// Elementos Dom

const buttonSingOut = document.getElementById('singOut');
const txtPost = document.getElementById('commentary');
const buttonPost = document.getElementById('button-topost');
const post = document.getElementById('commentarys');
const buttonFile = document.getElementById('file');
const userLoggen = document.getElementById('userLoggen');
const welcomeName = document.getElementById('WelcomeName');
const postName = document.getElementById('toPostName');

// Verifica el usuario 

const observer = () => {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('existe usuario');
      enterUserPrint(user);
      getUserName(user);
    } else {
      console.log('no existe usuario');
    }
  });
};
observer();

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
  if (user.emailVerified) {
    welcomeName.innerHTML = `Bienvenidx ${user.displayName}
    `;
    toPostName.innerHTML = `${user.displayName} Escribe un mensaje a tus amigos
    `;
  };
};

// Cierra Sesión

buttonSingOut.addEventListener('click', e => {
  firebase.auth().signOut()
    .then(function() {
      console.log('Saliendo...');
      window.location.assign('../views/index.html');
    })
    .catch(function(error) {
      console.log(error);
    });
});


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

buttonPost.addEventListener('click', e => {
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
});


// Subir imagenes (en construcción)

buttonFile.addEventListener('click', e => {
  let file = element.target.files[0];
  let storageRef = storage().ref('photos/' + file.name);
  storageRef.put(file);
});

// Eliminar comentario (en construcción)

const deletePost = (keyPost) => {
  database.ref('post').child(keyPost).remove();
};
