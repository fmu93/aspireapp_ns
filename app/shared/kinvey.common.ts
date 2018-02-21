import { Kinvey } from "kinvey-nativescript-sdk";
import { Config } from "./config";

/* ***********************************************************
* The {N} Kinvey plugin initialization is explained in the plugin readme here:
* http://devcenter.kinvey.com/nativescript/guides/getting-started#ConfigureYourApp
* In this template, Kinvey is set up with a custom existing project, so that
* You can build and run this template without creating your own Kinvey project.
*************************************************************/

Kinvey.init({
    appKey: "kid_HJpLpxsIG",
    appSecret: "93cbc008f7154f3fb09c1206e17c9ae0"
});

Kinvey.ping()
    .then((response) => {
        console.log(`Kinvey Ping Success. Kinvey Service is alive, version:
        ${response.version}, response: ${response.kinvey}`);
    })
    .catch((error) => {
        console.log(`Kinvey Ping Failed. Response: ${error.description}`);
    });
