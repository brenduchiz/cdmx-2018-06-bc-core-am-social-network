// Elementos Dom

const buttonSingOut = document.getElementById('singOut');
const txtPost = document.getElementById('commentary');
const buttonPost = document.getElementById('button-topost');
const post = document.getElementById('commentarys');
const buttonFile = document.getElementById('file');
const userLoggen = document.getElementById('userLoggen');
const welcomeName = document.getElementById('WelcomeName');
const postName = document.getElementById('toPostName');


// Se Pinta usuario 
/* Una vez que el usuario es identificado como activo, entra a la segunda pantalla y se
pinta su nombre */
const enterUserPrint = (user) => {
  if (user) {
    // console.log(user);
    welcomeName.innerHTML = `<strong> Bienvenidx </strong>  ${user.displayName}`;
    // console.log(welcomeName);
    toPostName.innerHTML = `
      
      <strong>${user.displayName}</strong> escribe un comentario`;
  }
};
  
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
                  <li class="list-inline-item"><a href="#" class="white-text id= "like${data.keyPost}" onclick="like('${data.keyPost}')"><i class="far fa-star fa-xs icon"></i>  Me gusta</a>
                  <label id="resultLikes">  ${data.like} </label> </li> 
                  <li class="list-inline-item"><a href="#" class="white-text id= "dislike${data.keyPost}" onclick="dislike('${data.keyPost}')"><i class="far fa-thumbs-down icon"></i></i>  No me gusta</a>
                  </li>
                  </ul> 
              </div>
            </div>
            </div>
   `;
    }
  });
});
  
// Actualiza la información Post Perfile
/* Información que se utiliza en el perfil */
database.ref('post').on('value', function(snapshot) {
  commentarysPerfil.innerHTML = '';
  snapshot.forEach(function(element) {
    let data = element.val();
    if (data !== null) {
      commentarysPerfil.innerHTML += `
        <div class="card border-light mb-3" style="max-width: 50rem;" id="card-social">
            <div class="card-header" id="toPostName">
                <img src=${data.photo} width="30px" class="img-fluid z-depth-1 rounded-circle" alt="Responsive image"></img>
                ${data.name}
            </div>
            <div class="card-body">
            <textarea class="form-control text-sm-left" readOnly id="${data.keyPost}" rows="1">${data.post}</textarea>
              <div class="rounded-bottom mdb-c olor lighten-3 text-right pt-3">
                <ul class="list-unstyled list-inline font-small" style="max-width: 50rem;">
  
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


// Nuevo comentario
/* Con esta función se registra el comentario que se genera en la base de firebase en
tiempo real. Es importante identificar el key del post para poder iterar la data más
adelante. */
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
      // image: imagePost(),
      post: post,
      keyPost: keyPost
    });
  }
});

// Editar comentario (En construcción)
/* Con la key del comentario podemos identificar cuál es el que se debe de modificar
sin alterar la demás información */
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
  