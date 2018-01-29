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

const btnLogout = document.getElementById("btnLogout");

//Add logout event
btnLogout.addEventListener("click", e => {
  firebase.auth().signOut();
  window.location = "../login_page/user_login.html";
});
