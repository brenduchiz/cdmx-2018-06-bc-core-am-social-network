const txtEmail = document.getElementById('email');
const txtName = document.getElementById('name');
const txtNameLast = document.getElementById('nameLast');
const txtPassword = document.getElementById('password');
const passwordUser = document.getElementById('passwordUser');
const emailUser = document.getElementById('emailUser');
const buttonRegistry = document.getElementById('registry');
const buttonEnter = document.getElementById('enter');
const buttonGoogle = document.getElementById('loginGoogle');
const buttonSingOut = document.getElementById('singOut');
const buttonPost = document.getElementById('button-topost');






buttonRegistry.addEventListener('click', registryUser);
buttonEnter.addEventListener('click', enterUser );
buttonGoogle.addEventListener('click', loginGoogle);
//buttonPost.addEventListener('click', writeNewCommentary);