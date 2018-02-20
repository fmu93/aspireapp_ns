import firebase = require("nativescript-plugin-firebase");
import { BackendService } from "./backend.service";
const config = require("./config");

setTimeout(() => {
    firebase.init({
        storageBucket: config.storageBucket,
        onAuthStateChanged(data) { // optional but useful to immediately re-logon the user when he re-visits your app
            console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
            if (data.loggedIn) {
                BackendService.token = data.user.uid;
                config.uid = data.user.uid;
                console.log("user's email address: " + (data.user.email ? data.user.email : "N/A"));
            } else {
                BackendService.token = "";
            }
        }
    })
    .then((instance) => console.log("Firebase initialised!!"))
    .catch((error) => console.log(error));
}
, 1000);
