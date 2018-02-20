 /*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/
import * as app from "application";
import firebase = require("nativescript-plugin-firebase");
import "./bundle-config";
import { BackendService } from "./shared/services/backend.service";
const config = require("./shared/services/config");

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
}, 1000);

app.start({ moduleName: "./views/tabs/tabs-page" });

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
