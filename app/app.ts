import * as app from "application";
import "./bundle-config";

// added this here so we can do some wiring
import "./shared/firebase.common";

app.start({ moduleName: "./views/tabs/tabs-page" });

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
