
// Initialize Firebase
const config = {
    apiKey: "AIzaSyC4xJczHrcejbkI0VeKFnBVpeUkq6E_YFk",
    authDomain: "mikesmovies-c3799.firebaseapp.com",
    databaseURL: "https://mikesmovies-c3799.firebaseio.com",
    projectId: "mikesmovies-c3799",
    storageBucket: "mikesmovies-c3799.appspot.com",
    messagingSenderId: "840246158041"
  };
  firebase.initializeApp(config);

//Get Elements
const txtEmail = document.getElementById('txtEmail')
const txtPassword = document.getElementById('txtPassword')
const formLogin = document.getElementById('formLogin')
const btnSignup = document.getElementById('btnSignup')
const btnGoogleLogin = document.getElementById('btnGoogleLogin')
// sen added lines below
const btnForgetPassword = document.getElementById('btnForgetPassword')

//Add Login event
formLogin.addEventListener('submit', e => {
    e.preventDefault()
    //get email and password
    const email = txtEmail.value
    const pass = txtPassword.value
    const auth = firebase.auth();

//sign in
const promise = auth.signInWithEmailAndPassword(email, pass)

promise.catch(e => console.log(e.message))
promise.catch(e => alert("User not found"))

})
//sign in with Google
btnGoogleLogin.addEventListener('click', e => {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
})


// Sen Add forget password action

btnForgetPassword.addEventListener('click', function(){

window.location = 'forget_password.html';

})



//Add a realtime listener

firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser)
        window.location = '../user_page/user_home.html'; //After successful login, user will be redirected to home.html
            }

    else {
        console.log('Not logged in');
    }
})
