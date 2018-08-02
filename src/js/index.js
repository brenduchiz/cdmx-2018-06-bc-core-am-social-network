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


// Registro de usuario
/* Cuando es un usuario nuevo es necesario realizar la captura de información
dentro de esta función se llama a la función que nos ayudará actualizar la
información del perfil */
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

// Ingresa el usuario
/* Cuando el usuario ya ha hecho su registro anteriormente solo debe ingresar su
correo y contraseña */

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