// backend

// Goal 1: Add user accounts?

var myFirebaseRef = new Firebase("https://setproject-9792a.firebaseio.com/");




firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
  } else {
    // No user is signed in.
  }
});



// pseudocode
$("login_button").on("submit", function {

});