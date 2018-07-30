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
    if (user != null) {
      name = user.displayName;
      email = user.email;
      uid = user.uid;
      photoUrl = user.photoUrl;
      console.log('existe usuario');
      // console.log(user);
      enterUserPrint(user);
      getUserName(user);

      console.log(user)
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

// Traer la llave de identificación de firebase
const getKeyUser = (keyUser) => {
  const keyUserLoggedIn = keyUser;
  return keyUserLoggedIn;
};

// Se Pinta usuario 

const enterUserPrint = (user) => {
  if (user) {
    // console.log(user);
    welcomeName.innerHTML = `Bienvenidx ${user.displayName}`;
    // console.log(welcomeName);
    toPostName.innerHTML = `${user.displayName} Escribe un comentario`;
  }
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


// Actualiza la información escuchando la base de datos los cambios que podría tener

database.ref('post').on('value', function(snapshot) {
  post.innerHTML = '';
  snapshot.forEach(function(element) {
    let data = element.val();
    if (data !== null) {
      post.innerHTML += `
      <div class="card border-light mb-3" style="max-width: 50rem;" id="card-social">
          <div class="card-header" id="toPostName">
              <img src=${data.photo} width="30px" class="img-fluid z-depth-1 rounded-circle" alt="Responsive image"></img>
              ${data.name}
          </div>
          <div class="card-body">
          <textarea class="form-control text-sm-left" readOnly id="${data.keyPost}" rows="1">${data.post}</textarea>
            <div class="rounded-bottom mdb-c olor lighten-3 text-right pt-3">
              <ul class="list-unstyled list-inline font-small" style="max-width: 50rem;">
                <li class="list-inline-item pr-1 grey-text"> ${data.date}</li>
                <li class="list-inline-item pr-2"><a href="#" class="white-text" onclick="deletePost ('${data.keyPost}')"><i class="far fa-trash-alt fa-xs icon"></i> Borrar</a></li>
                <li class="list-inline-item pr-2"><a href="#" class="white-text" id ="editar${data.keyPost}" onclick="updatePost ('${data.keyPost}')"><i class="far fa-edit fa-xs icon"> </i> Editar</a></li>
                <li class="list-inline-item"><a href="#" class="white-text id= "like${data.keyPost}" onclick="like('${data.keyPost}')"><i class="far fa-star fa-xs icon"></i>  Favorito</a>
                <label id="resultLikes">  ${data.like} </label> </li> 
                <li class="list-inline-item"><a href="#" class="white-text id= "dislike${data.keyPost}" onclick="dislike('${data.keyPost}')"><i class="far fa-thumbs-down icon"></i></i>No me gusta</a>
                </li>
                </ul> 
              
            </div>
          </div>
          </div>
      `;
    }
  });
});

// Cargar comentarios en el Muro

/* window.onload = function() {
  database.ref('post').on('child_added', function(data) {
    post.innerHTML += `
    <div class="card border-light mb-3" style="max-width: 50rem;" id="card-social">
        <div class="card-header" id="toPostName">
            <img src=${data.val().photo} width="30px" class="img-fluid z-depth-1 rounded-circle" alt="Responsive image"></img>
            ${data.val().name}
        </div>
        <div class="card-body">
        <textarea class="form-control text-sm-left" readOnly id="${data.val().keyPost}" rows="1">${data.val().post}</textarea>
          <div class="rounded-bottom mdb-color lighten-3 text-right pt-3">
            <ul class="list-unstyled list-inline font-small" style="max-width: 50rem;">
              <li class="list-inline-item pr-1 grey-text"> ${data.val().date}</li>
              <li class="list-inline-item pr-2"><a href="#" class="white-text" onclick="deletePost ('${data.val().keyPost}')"><i class="far fa-trash-alt fa-xs icon"></i> Borrar</a></li>
              <li class="list-inline-item pr-2"><a href="#" class="white-text" id ="editar${data.val().keyPost}" onclick="updatePost ('${data.val().keyPost}')"><i class="far fa-edit fa-xs icon"> </i> Editar</a></li>
              <li class="list-inline-item"><a href="#" class="white-text"><i class="far fa-star fa-xs icon"> </i> Favorito</a></li>
            </ul>  
          </div>
        </div>
        </div>
    `;
    // console.log(post);
  });
}; */

// Función para obtener fecha

const datePost = () => {
  let dateFormat = new Date();
  let day = dateFormat.getUTCDate();
  let month = dateFormat.getMonth() + 1;
  let year = dateFormat.getFullYear();
  return day = day + '/' + month + '/' + year;
};

// Nuevo comentario

buttonPost.addEventListener('click', element => {
  let post = txtPost.value;
  if (post.length === 0 || /^\s+$/.test(post)) {
    alert('No has escrito nada');
  } else {
    txtPost.value = '';
    firebase.database().ref('post').push();
    let postNew = firebase.database().ref('post').push();
    let keyPost = postNew.getKey();
    firebase.database().ref(`post/${keyPost}`).set({
      name: getUserName(),
      uid: getUserUid(),
      photo: getUserImage(),
      date: datePost(),
     // likes: like(),
      post: post,
      keyPost: keyPost
    });
  }
});

// Eliminar comentario

const deletePost = (keyPost) => {
  if (confirm('¿Quieres borrar este mensaje?')) {
    database.ref('post').child(keyPost).remove();
  } else {
    return false;
  }  
};

// Editar comentario (En construcción)

const updatePost = (keyPost) => {
  console.log(keyPost);
  document.getElementById(keyPost).readOnly = false;
  let buttonUpdate = document.getElementById('editar' + keyPost);
  console.log(buttonUpdate);
  buttonUpdate.innerHTML = 'Guardar';
  buttonUpdate.onclick = function() {
    let ref = database.ref('post').child(keyPost);
    let post = document.getElementById(keyPost).value;
    return ref.update({
      name: getUserName(),
      uid: getUserUid(),
      date: datePost(),
      post: post,
      keyPost: keyPost
    })
      .then(function() {
        buttonUpdate.innerHTML = 'Editar';
        document.getElementById(keyPost).readOnly = true;
      });
  };
}; 

let likes = 0;
const like = (keyPost) => {
  likes++;
 //alert(likes);
 let ref = database.ref('post').child(keyPost);
 let post = document.getElementById(keyPost).value;
 return ref.update({
   name: getUserName(),
   uid: getUserUid(),
   date: datePost(),
   post: post,
   keyPost: keyPost,
    like: likes
  
})

}


const dislike = (keyPost) => {
  dislikes= likes--;
 //alert(likes);
 let ref = database.ref('post').child(keyPost);
 let post = document.getElementById(keyPost).value;
 return ref.update({
   name: getUserName(),
   uid: getUserUid(),
   date: datePost(),
   post: post,
   keyPost: keyPost,
    like: dislikes
  
})

}





// Subir imagenes (en construcción)

/* buttonFile.addEventListener('click', e => {
  let file = element.target.files[0];
  let storageRef = storage().ref('photos/' + file.name);
  storageRef.put(file);
});
*/