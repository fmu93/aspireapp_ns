import { EventData, fromObject, Observable } from "data/observable";
import { Kinvey } from "kinvey-nativescript-sdk";
import { View } from "ui/core/view";
import * as dialogs from "ui/dialogs";
import { EditableTextBase } from "ui/editable-text-base";
import * as frameModule from "ui/frame";
import { Page } from "ui/page";
import { BackendService } from "./../../shared/services/backend.service";
import { User } from "./../../shared/user.model";

const user = new User();

export function onLoaded(args) {
    const page = args.object;
    page.bindingContext = user;
}

export function signUp() {
    if (BackendService.isLoggedIn()) {
        const oldUser = user.username;
        const promise1 = BackendService.logout()
        .then(() => {
            dialogs.alert("user logged off").then(() => {
                completeRegistration();
                console.log("success loggin off");
        }).catch((error: Kinvey.BaseError) => {
            console.log("error loggin off");
        });
        });
    } else if (user.isValidEmail()) {
        completeRegistration();
    } else {
        dialogs.alert({
            message: "Enter a valid email address.",
            okButtonText: "OK"
        });
        completeRegistration();
    }
}

export function completeRegistration() {
    BackendService.exists(user).then((exists) => {
        if (exists) {
            dialogs.alert("Username already exists");
        } else {
            const promise = BackendService.register(user)
            .then(() => {
            // trying to save user into local storage on first singup
            user.storeUser();
            console.log(user.username + " pass: " + user.password);
            })
            .then(() => {
            dialogs.alert("User registered and stored: " + user.username);
            frameModule.topmost().navigate("views/login/login");
            })
            .catch((error: Kinvey.BaseError) => {
            console.log(error.stack);
            });
        }
    });
}

export function goBack() {
    return frameModule.topmost().navigate("views/login/login");
}

let closeTimeout = 0;
export function onPageTapped(args: EventData) {
    const page = <Page>args.object;
    if (!closeTimeout) {
        closeTimeout = setTimeout(() => {
            page.getViewById<EditableTextBase>("username").dismissSoftInput();
            page.getViewById<EditableTextBase>("email").dismissSoftInput();
            page.getViewById<EditableTextBase>("password").dismissSoftInput();
            page.getViewById<EditableTextBase>("bio").dismissSoftInput();
            closeTimeout = 0;
        }, 20);
    }
}
