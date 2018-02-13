import { fromObject } from "data/observable";
import { Kinvey, KinveyError } from "kinvey-nativescript-sdk";
import view = require("ui/core/view");
import * as dialogs from "ui/dialogs";
import { AnimationCurve } from "ui/enums";
import * as frameModule from "ui/frame";
import { Page } from "ui/page";
import { BackendService } from "../shared/services/backend.service";

const user = new Kinvey.User({
    _id: "user-id",
    _acl: { /* ACL */ },
    _kmd: { /* Metadata */ },
    username: "username!!",
    password: "password",
    email: "email"
  });

//   user.data.customProp = "foo";

export function onLoaded(args) {
    const page = <Page>args.object;
    page.bindingContext = user;

    const logo = <view.View> page.getViewById("logo");
    logo.animate({
        opacity: 1,
        duration: 2000,
        // translate: { x: 0, y: 100},
        curve: AnimationCurve.easeOut
    });

    // loginService.login(user);
    // user.login(user.username, user.password);

    // Create new user if not existing
    // const promise = Kinvey.User.signup()
    //     .then((user: Kinvey.User) => {
    //       console.log("Kivney.User");
    //     })
    //     .catch((error: Kinvey.BaseError) => {
    //       // ...
    //     });
}

export function signIn(args) {
    if (BackendService.isLoggedIn()) {
        const oldUser = user.username;
        const promise = BackendService.logout()
        .then(() => {
            dialogs.alert("user logged off: " + oldUser).then(() => {
                // console.log(user.me());
        }).catch((error: Kinvey.BaseError) => {
            console.log("error loggin off");
        });
        });
    } else {
        user.login(user.username, user.password)
        .catch((error: KinveyError) => {
            console.log("Login error");
        });
    }
    console.log("signIn " + user.username);
}

export function register(args) {
    console.log("register");
    frameModule.topmost().navigate("register/register");

}
