 /*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/
import * as app from "application";
import "./bundle-config";
<<<<<<< HEAD

// added this here so we can do some wiring
require("nativescript-plugin-firebase");
=======
>>>>>>> parent of b825c32... trying to get it...

app.start({ moduleName: "./views/tabs/tabs-page" });

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
