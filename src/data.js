// Initialize Firebase

const config = {
    apiKey: 'AIzaSyDBuQ1AtjHYyog6rpCIBaWet68dp5RJv3Y',
    authDomain: 'red-social-4d185.firebaseapp.com',
    databaseURL: 'https://red-social-4d185.firebaseio.com/',
    projectId: 'red-social-4d185',
    storageBucket: 'red-social-4d185.appspot.com',
    messagingSenderId: '1044161778600'
  };
  firebase.initializeApp(config);
  const database = firebase.database();

// Elementos Dom
const txtEmail = document.getElementById('email');
const txtName = document.getElementById('name');
const txtPassword = document.getElementById('password');
const buttonRegistry = document.getElementById('registry');
const buttonEnter = document.getElementById('enter');
const buttonGoogle = document.getElementById('loginGoogle');

// Login
buttonEnter.addEventListener('click', e => {
    const email = txtEmail.value;
    const password = txtPassword.value;
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, password);
    promise.catch(e => console.log(e.message));
});

// SignUp

buttonRegistry.addEventListener('click', e => {
    const email = txtEmail.value;
    const password = txtPassword.value;
    const name = txtName.value;
    let ref = database.ref('user');
    let data = {
        name : name,
        email : email
    }
    ref.push(data);
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email, password);
    promise
    .catch(e => console.log(e.message));
});

firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
        console.log(firebaseUser);
    } else {
        console.log('No ha iniciado sesión')
    }

})

/*
buttonGoogle.addEventListener('click', function(e) {
  auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
});

auth.onAuthStateChanged(function(user) {
  if (user) {
    setUsername(user.displayName);
    console.log(user.displayName);
  } else {
    setUsername('No esta registrado');
  }
});
*/

