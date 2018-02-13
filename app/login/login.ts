import { fromObject } from "data/observable";
import { Kinvey, KinveyError } from "kinvey-nativescript-sdk";
import { View } from "ui/core/view";
import * as dialogs from "ui/dialogs";
import { AnimationCurve } from "ui/enums";
import * as frameModule from "ui/frame";
import { Page } from "ui/page";
import { BackendService } from "../shared/services/backend.service";
import { User } from "./../shared/user.model";

const user = new User();

export function onLoaded(args) {
    // check if existing user on local storage
    user.retrieveUser();

    const page = <Page>args.object;
    page.bindingContext = user;

    const logo = <View> page.getViewById("logo");
    logo.animate({
        opacity: 1,
        duration: 2000,
        // translate: { x: 0, y: 100},
        curve: AnimationCurve.easeOut
    });
 }

export function signIn(args) {
        // Actually, the only way to be logged in at this point is after successful regisrtration
        // or successful login. Maybe a switch user does make sense.
        const oldUser = user.username;
        const promise = BackendService.logout()
        .then(() => {
            const promise2 = BackendService.login(user)
            .then(() => {
                if (BackendService.isLoggedIn()) {
                    frameModule.topmost().navigate("tabs/tabs-page");
                } else {
                    dialogs.alert("user not logged in: " + user.username);
                }
            }).catch((error: KinveyError) => {
                dialogs.alert("Error logging in: " + user.username);
                // console.log(error.stack);
        }).catch((error: Kinvey.BaseError) => {
            console.log("error loggin off");
        });
        });
}

export function register(args) {
    frameModule.topmost().navigate("register/register");
}
