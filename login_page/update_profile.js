let users = []
let rootRef = firebase.database().ref()
let userListRef = rootRef.child("users")
let userIDRef = userListRef.child("Info")

userInfoObservers()

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {

    const currentuser = firebase.auth().currentUser;
    

    const txtFirstName = document.getElementById('txtFirstName')
    const txtLastName = document .getElementById('txtLastName')
    const txtPhoneNumber = document.getElementById('txtPhoneNumber')
    const txtAddress = document.getElementById('txtAddress')
    const btnUpdateProfile = document.getElementById('btnUpdateProfile')

  //Sen Add send reset password Link
  btnUpdateProfile.addEventListener('click', e => {

  userIDRef = userListRef.child(currentuser.uid)
  u = userIDRef.child("Info")
  let user = new User(txtAddress.value, txtPhoneNumber.value, txtLastName.value, txtFirstName.value)
  u.set(user)

  alert("You have updated your information")

   window.location = '../user_page/user_home.html'

  })






  } else {
    console.log("something is wrong")
  }
});

function userInfoObservers() {
console.log("I am here")
userListRef.on('value', function(snapshot){
console.log("I am here")
  console.log(snapshot)
  for(key in snapshot.val()) {

    // get the title of the object
    let title = (snapshot.val()[key].title)
    let user = new User (title)
    users.push(user)
  }
  console.log(users)
})

}
