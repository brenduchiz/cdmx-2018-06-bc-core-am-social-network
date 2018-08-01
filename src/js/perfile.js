let buttonPerfile = document.getElementById('perfile');// boton dropdown 
let buttonPerfileUsers = document.getElementById('PerfilUsers');//boton pefil usuario
let buttonPostPerfile = document.getElementById('lasPost');//boton vista post




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

    <img src="../../images/usuario.jpg" width="80px" class="img-fluid z-depth-1 rounded-circle" alt="Responsive image"></img> <h7 class="alert-heading"><strong>    Correo: </strong> ${user.email}</h7><br>
    
    <p></p>

    

    <p></p>
    <h7 class="alert-heading"><strong> ${user.displayName}</strong> es una persona con: <textarea class="form-control"id="textone" rows="1"></textarea></h7><br>

    <p></p>
    <h7 class="alert-heading"> <strong>${user.displayName}</strong> utiliza: <textarea class="form-control"id="textwo" rows="1"></textarea></h7><br>

    <p></p>
    <h6 class="alert-heading"><strong>Sobre mÍ</strong></h6>
    <textarea class="form-control"id="txtthree" rows="1"></textarea>
    <p></p>
    <input onclick = "buttonPerfileInfo(textone,textwo,txtthree)"   class="btn btn-raised btn-secondary btn-sm" type="button" value="Guardar" id="buttonInfoUsers">
    </div>
    </div>
    <div class="col  col-12 col-lg-3">
    
    </div>

</div>     

   `
});

buttonPostPerfile .addEventListener('click', element => {
   
    window.location.assign('../views/perfile.html');
});


buttonPerfileInfo = (valueOne,valuetwo,valuethree)=> {
 let txtOne = valueOne.value;
 let txtTwo = valuetwo.value;
 let textThree = valuethree.value;
 

 UserInformation.innerHTML=`
<div class="row justify-content-md-center ">
  <div class="col col-12   col-lg-3">

  </div>
  <div class="col col-sm-6 col-lg-6">

  <div class="alert " role="alert">
  
  <h6 class="alert-heading"><strong>Hola soy ${user.displayName}</strong></h6>
  <p></p>

  <img src="../../images/usuario.jpg" width="80px" class="img-fluid z-depth-1 rounded-circle" alt="Responsive image"></img> <h7 class="alert-heading"><strong>    Correo: </strong> ${user.email}</h7><br>
  
  <p></p>

  

  <p></p>
  <h7 class="alert-heading"><strong> ${user.displayName}</strong> es una persona con:   <label>${txtOne}</label>

  <p></p>
  <h7 class="alert-heading"> <strong>${user.displayName}</strong> utiliza:  <label>${txtTwo}</label>

  <p></p>
  <h6 class="alert-heading"><strong>Sobre mÍ</strong></h6>
  <label>${textThree}</label>
  <p></p>
  <input onclick = "buttonPerfileInfo(textone,textwo,txtthree)"   class="btn btn-raised btn-secondary btn-sm" type="button" value="Guardar" id="buttonInfoUsers">
  </div>
  </div>
  <div class="col  col-12 col-lg-3">
  
  </div>

</div>     
` 
   document.getElementById("buttonInfoUsers").style.display = "none";
};
 
}