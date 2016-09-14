// backend

// Goal 1: Add user accounts?
//			Find a way to regi

// Initialize Firebase
var config = {
	apiKey: "AIzaSyDZnCVGk4o-A3YGCCjVA8u4iBJuG7L98es",
	authDomain: "setproject-9792a.firebaseapp.com",
	databaseURL: "https://setproject-9792a.firebaseio.com",
	storageBucket: "setproject-9792a.appspot.com",
};
firebase.initializeApp(config);

var firebaseRef = new firebase.database().ref();


function createUser(userObj) {
	firebaseRef.createUser(userObj, function(error, userData) {
		if(error) {
			console.log("Error creating user:", error);
		} else {
			console.log("Successfully created account:", userData);
		}
	});
}

$("#regForm").on("submit", function(event) {
	event.preventDefault();

	userObj = {};
	$(this).serializeArray().map(function(x) {
		userObj[x.name] = x.value;
	});
	createUser(userObj);
});



// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     // User is signed in.
//   } else {
//     // No user is signed in.
//   }
// });



// // pseudocode
// $("login_button").on("submit", function {

// });