import { Kinvey } from "kinvey-nativescript-sdk";
import * as dialogs from "ui/dialogs";
import * as frameModule from "ui/frame";
import { BackendService } from "../shared/services/backend.service";
import { LoginService } from "./../login/login.service";
import { User } from "./../shared/user.model";

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
    } else {
        completeRegistration();
    }
}

export function completeRegistration() {
    const promise = BackendService.register(user)
        .then(() => {
        // trying to save user into local storage on first singup
        user.storeUser();
        console.log(user.username + " pass: " + user.password);
        })
        .then(() => {
          dialogs.alert("User registered and stored: " + user.username);
          frameModule.topmost().navigate("login/login");
        })
        .catch((error: Kinvey.BaseError) => {
          console.log(error.stack);
        });

}

// export function register() {
// 	if (user.isValidEmail()) {
// 		completeRegistration();
// 	} else {
// 		dialogsModule.alert({
// 			message: "Enter a valid email address.",
// 			okButtonText: "OK"
// 		});
// 	}
// }
