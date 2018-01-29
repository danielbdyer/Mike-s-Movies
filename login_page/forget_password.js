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

const resetEmail = document.getElementById('resetEmail')
const btnReset = document.getElementById('btnReset')

//Sen Add send reset password Link
btnReset.addEventListener('click', function(){
  var auth = firebase.auth();
  var emailAddress = resetEmail.value;

  auth.sendPasswordResetEmail(emailAddress).then(function() {
    console.log("Email sent")
  }).catch(function(error) {
    console.log("something wrong happened")
  });

})
