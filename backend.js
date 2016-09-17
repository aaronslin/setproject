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




firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		// User is signed in
		console.log("inside authStateChanged (user exists)");
	} else {
		// User is not signed in
		// Change the displays for the login button/features
		console.log("inside authStateChanged (user DNE)");
	}
});

function logIn(email, password) {
	console.log("inside logIn");
	firebase.auth().signInWithEmailAndPassword(email, password).
		catch(function(error, userData) {
			if (error) {
				console.log("Error signing in:", error);
			} else {
				console.log("Logged in:", userData);
			}
		});
}

function createUser(email, password) {
	firebase.auth().createUserWithEmailAndPassword(email, password).
		catch(function(error, userData) {
			if(error) {
				console.log("Error creating user:", error);
			} else {
				console.log("Successfully created account:", userData);
			}
		});
	logIn(email, password);
	// TODO: ^ race conditions! Does createUser... auto-login?
}

$("#loginForm").on("submit", function(event) {
	event.preventDefault();

	userObj = {};
	$(this).serializeArray().map(function(x) {
		userObj[x.name] = x.value;
	});
	// TODO: This ^ part is bad style: copy-pasted from regForm submit
	logIn(userObj.email, userObj.password);
});

$("#regForm").on("submit", function(event) {
	event.preventDefault();

	userObj = {};
	$(this).serializeArray().map(function(x) {
		userObj[x.name] = x.value;
	});
	createUser(userObj.email, userObj.password);
	// Note: these object property names (email, password) are currently hard-coded
	// TODO: clear form
});

