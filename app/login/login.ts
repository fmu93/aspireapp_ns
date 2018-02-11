import { fromObject } from "data/observable";
import { Kinvey } from "kinvey-nativescript-sdk";
import view = require("ui/core/view");
import * as dialogs from "ui/dialogs";
import { AnimationCurve } from "ui/enums";
import { Page } from "ui/page";
import { LoginService } from "./login.service";

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

    LoginService.login(user);

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
    console.log("signIn");
    if (user.isActive) {
        dialogs.alert("no user active").then(() => {
            console.log("Dialog closed!");
        });
    }
    console.log(user.email);
}

export function register(args) {
    console.log("register");
}
