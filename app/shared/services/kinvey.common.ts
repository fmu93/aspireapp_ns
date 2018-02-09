const Kinvey = require("kinvey-nativescript-sdk").Kinvey;
const config = require("./config");

/* ***********************************************************
* The {N} Kinvey plugin initialization is explained in the plugin readme here:
* http://devcenter.kinvey.com/nativescript/guides/getting-started#ConfigureYourApp
* In this template, Kinvey is set up with a custom existing project, so that
* You can build and run this template without creating your own Kinvey project.
*************************************************************/
Kinvey.init({
    appKey: config.kinveyAppKey,
    appSecret: config.kinveyAppSecret
});
Kinvey.ping()
    .then((response) => {
        console.log(`Kinvey Ping Success. Kinvey Service is alive, version:
        ${response.version}, response: ${response.kinvey}`);
    })
    .catch((error) => {
        console.log(`Kinvey Ping Failed. Response: ${error.description}`);
    });
