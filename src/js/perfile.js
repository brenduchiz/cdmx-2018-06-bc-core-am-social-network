let buttonPerfile = document.getElementById('perfile');// boton dropdown 
let buttonPerfileUsers = document.getElementById('PerfilUsers');//boton pefil usuario
let buttonPostPerfile = document.getElementById('lasPost');//boton vista post
//let buttonPostPerfileOnly = document.getElementById('postPerfile');//boton publicar post
//let txtOnlyPerfil = document.getElementById('commentaryPerfil');






buttonPerfile.addEventListener('click', element => {
   
        window.location.assign('../views/perfile.html');

    
});

PerfileUsers = (user) => {


buttonPerfileUsers.addEventListener('click', element => {

 
 
  document.getElementById("commentarysPerfil").style.display = "none";
    console.log(user)
    UserInformation.innerHTML= `
    <div class="row justify-content-md-center ">
    <div class="col col-12   col-lg-3">

    </div>
    <div class="col col-sm-6 col-lg-6">

    <div class="alert " role="alert">
    
    <h6 class="alert-heading"><strong>Hola soy ${user.displayName}</strong></h6>
    <p></p>

    <img src="../../images/usuario.jpg" width="60px" class="img-fluid z-depth-1 rounded-circle" alt="Responsive image"></img>
    
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

   `
});
}
buttonPostPerfile .addEventListener('click', element => {
   
    window.location.assign('../views/perfile.html');

});

// Nuevo comentario

/*buttonPostPerfileOnly.addEventListener('click', element => {
    let postt = txtOnlyPerfil.value;
    console.log(postt)
    if (postt.length === 0 || /^\s+$/.test(postt)) {
      alert('No has escrito nada');
    } else {
      txtOnlyPerfil.value = '';
      firebase.database().ref('post').push();
      let postNeww = firebase.database().ref('post').push();
      let keyPostt = postNeww.getKey();
      firebase.database().ref(`post/${keyPostt}`).set({
        name: getUserName(),
        uid: getUserUid(),
        photo: getUserImage(),
        date: datePost(),
        post: postt,
        keyPost: keyPostt
      });
      
    }
  });*/




 

