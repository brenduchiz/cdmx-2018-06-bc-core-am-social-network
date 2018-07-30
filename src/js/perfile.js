let buttonPerfile = document.getElementById('perfile');
let buttonPerfileUsers = document.getElementById('PerfilUsers');
let buttonPostPerfile = document.getElementById('lasPost');


buttonPerfile.addEventListener('click', element => {
    
        window.location.assign('../views/perfile.html');
});

buttonPerfileUsers.addEventListener('click', element => {
    
    UserInformation.innerHTML= `
    <div class="row justify-content-md-center">
    <div class="col col-12   col-lg-3">

    </div>
    <div class="col col-sm-6 col-lg-6">

    <div class="alert " role="alert">
    <h4 class="alert-heading">hola soy Brenda</h4>
    <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
    <hr>
    <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
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
