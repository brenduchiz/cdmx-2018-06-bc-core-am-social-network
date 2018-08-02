let buttonPerfile = document.getElementById('perfile');// boton dropdown 
let buttonPerfileUsers = document.getElementById('perfilUsers');// boton pefil usuario
let buttonPostPerfile = document.getElementById('lasPost');// boton vista post
let commentarysPerfil = document.getElementById('commentarysPerfil');
let userInformation = document.getElementById('userInformation');
const buttonSingOut2 = document.getElementById('singOut2');

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log('existe usuario');
    let imagePerfile = getUserImage();
    userInformation.innerHTML = `
    <div class="row justify-content-md-center ">
    <div class="col col-12   col-lg-3">
    </div>
    <div class="col col-sm-6 col-lg-6">
    <div class="alert " role="alert">
    <h6 class="alert-heading"><strong>Hola soy ${user.displayName}</strong></h6>
    <p></p>
    <img src=${imagePerfile} width="60px" class="img-fluid z-depth-1 rounded-circle" alt="Responsive image"></img>
    <p></p>
    <h7 class="alert-heading"><strong> Correo: </strong> ${user.email}</h7><br>
    <p></p>
    <h7 class="alert-heading"> <strong>Cumpleaños: </strong> </h7><br>
    <p></p>
    <h7 class="alert-heading"><strong> ${user.displayName}</strong> es una persona con:</h7><br>
    <p></p>
    <h7 class="alert-heading"> <strong>${user.displayName}</strong> utiliza:</h7><br>
    <p></p>
    <h6 class="alert-heading"><strong>Sobre mÍ</strong></h6>
    <textarea class="form-control"id="" rows="1"></textarea>
    
  </div>
</div>
    <div class="col  col-12 col-lg-3">
    
    </div>

</div>     

   `;
 
  } else {
    console.log('no existe usuario');
  }
});

buttonPerfile.addEventListener('click', element => {
  window.location.assign('../views/perfile.html');
  console.log(user);
});


buttonSingOut2.addEventListener('click', element => {
  firebase.auth().signOut()
    .then(function() {
      console.log('Saliendo...');
      window.location.assign('../views/index.html');
    })
    .catch(function(error) {
      console.log(error);
    });
});
