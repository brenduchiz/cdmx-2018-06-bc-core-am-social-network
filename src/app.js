

/*Registro de usuario*/ 
const registryUser = () => {
    let emailDom = document.getElementById("email").value;
    let passwordDom = document.getElementById("password").value;
    
    firebase.auth().createUserWithEmailAndPassword(emailDom, passwordDom)
    .then(function(){
      check()
    })

    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
}

/*Ingresa el usaurio*/ 
const enterUser = () => {
    let emailUserDom = document.getElementById("emailUser").value;
    let passwordUserDom = document.getElementById("passwordUser").value;

    
    firebase.auth().signInWithEmailAndPassword(emailUserDom, passwordUserDom)
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode)
        console.log(errorMessage)
        // ...
      });
}

/*Verifica el usuario*/ 
const observer = () => {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log("existe usuario");
            
            enterUserPrint(user);
            
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          console.log("****************");
          console.log(user.emailVerified)
          console.log("****************");


          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // ...
        }   else {
              console.log("no existe usuario");
                   // User is signed out.
                     // ...
            }
    });
}
observer();

const enterUserPrint = (user) => {
    let userr = user;
    let userPrint = document.getElementById("userName");
    if (userr.emailVerified) {
        document.getElementById("delate").style.display ="none";
        userPrint.innerHTML = `
        <h4>Bienvenid@</h4>
        <button onclick="signOut()" type="button" class="btn btn-secondary" data-dismiss="modal1">Cerrar sesión</button>
        `
        ;
    }
    
}

const signOut = () => {
    firebase.auth().signOut()
    .then(function(){
        console.log("Saliendo...")
        document.getElementById("userName").style.display ="none";
        document.getElementById("delate").style.display ="block";
    })
    .catch(function(error){
        console.log(error)
    })

}


/*Envía un mensaje de verificación al usuario*/

const check= () => {
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function() {
      // Email sent.

      console.log("Enviando Correo")
    }).catch(function(error) {

        console.log(error)
      // An error happened.
    });

}