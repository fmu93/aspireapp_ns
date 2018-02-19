// import firebase = require("nativescript-plugin-firebase");
// const config = require("./config");

// firebase.init({
//     onAuthStateChanged(data) { // optional but useful to immediately re-logon the user when he re-visits your app
//         console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
//         if (data.loggedIn) {
//             console.log("user's email address: " + (data.user.email ? data.user.email : "N/A"));
//         }
//     }})
//     .then((instance) => console.log("Firebase initialised!!"))
//     .catch((error) => console.log(error));

// // configure a listener:
// const listener = {
//     onAuthStateChanged(data) {
//         console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
//         if (data.loggedIn) {
//             console.log("User info", data.user);
//         }
//     },
//     thisArg: this
// };

// // add the listener:
// firebase.addAuthStateListener(listener);

// // stop listening to auth state changes:
// firebase.removeAuthStateListener(listener);

// // check if already listening to auth state changes
// firebase.hasAuthStateListener(listener);
