//Inicia Firebase

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


 
const enterUser = () => {
  let email = emailUser.value;
  let password = passwordUser.value;
   
  firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(function(error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      alert("Verifica tus datos");
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
  let userPrint = document.getElementById('userName');
  
  if (user.emailVerified) {
 
    document.getElementById('delate').style.display = 'none';
    
    userPrint.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-light " id="navegador">
        <a class="navbar-brand" href="#" style="color:#ffffff;">Deafriend <img src="images/oido.png"></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
          
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="WelcomeName" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Bienvenid@ ${user.displayName}
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">Perfil</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#" onclick="signOut()"  >Cerrar Sesión</a>
              </div>
            </li>
            
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
           
            <button class="btn btn-outline-info my-2 my-sm-0  bg-white text-dark" type="submit">Search</button>
          </form>
        </div>
      </nav>
          <div class="container-fluid">
          <div class="card border-light mb-3" style="max-width: 50rem;" id="card-social">
          <div class="card-header" id="toPostName">${user.displayName} va a publicar un estado</div>
          <div class="card-body">
          <div class="form-group">
          <label for="exampleFormControlTextarea1">Escribe aqui tu estado</label>
          <textarea class="form-control" id="commentary" rows="3"></textarea>
          
          <button type="button" class="btn btn-raised " id="button-topost" onclick="writeNewCommentary()">Publicar</button>
          
          </div>
        </div>
          </div>
        </div>

    `;
    
  }else {
      console.log('no se ha accesado');
    }
    

    
    
  
};


/*firebase.auth().onAuthStateChanged(function(user) {
  if (user) { 
    console.log(user);
    window.location.assign('Inicio.html');


    WelcomeName.innerHTML = `
    Bienvenid@ ${user.displayName}
    `;

    toPostName.innerHTML = `
    ${user.displayName} va a publicar un estado
    `; 
  } else {
    // No user is signed in.
  }
});*/




// Cierra Sesión

 signOut = () => {
  firebase.auth().signOut()
    .then(function() {
      console.log('Saliendo...');
      window.location.assign('index.html');
    })
    .catch(function(error) {
      console.log(error);
    });
};

  // Cargar comentarios en el Muro pintar

window.onload = function() {


  database.ref('post').on('child_added', function(data) {
    commentarys.innerHTML += `
    <div class="container-fluid">
    <div class="card border-light mb-3" style="max-width: 50rem;" id="card-social">
    <div class="card-header" id="toPostNamee">${data.val().name}: publico un estado</div>
    <div class="card-header" id="toPostNamee">Desde: ${data.val().date}</div>
    <div class="card-body">
    <div class="form-group">
    <label for="exampleFormControlTextarea1">${data.val().post}</label>
    </div>
  </div>
    </div>
  </div>

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
  const txtPost = document.getElementById('commentary').value;
  console.log(txtPost);
  post = txtPost;
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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
    


