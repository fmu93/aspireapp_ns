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
    completeRegistration();
}

export function completeRegistration() {
    if (BackendService.isLoggedIn()) {
        const oldUser = user.username;
        const promise1 = BackendService.logout()
        .then(() => {
            dialogs.alert("user logged off").then(() => {
                console.log("success loggin off");
        }).catch((error: Kinvey.BaseError) => {
            console.log("error loggin off");
        });
        });
    }
    console.log(user.username + " pass: " + user.password);
    const promise = BackendService.register(user);
    //     // .then((user: Kinvey.User) => {
    //     // localStorage.setItem('newUser', JSON.stringify(user.toJSON()));

    //     // return user;
    //     // })
    //     .then(() => {
    //       console.log("User registered: " + user.username);
    //       console.log(BackendService.isLoggedIn());
    //       frameModule.topmost().navigate("login/login");
    //     })
    //     .catch((error: Kinvey.BaseError) => {
    //       console.log(error.stack);
    //     });


    // user.signup()
    //     .then({
    //         dialogsModule
    //             .alert("Your account was successfully created.")
    //             .then({
    //                 frameModule.topmost().navigate("views/login/login");
	// 			});
	// 	}).catch(function(error) {
	// 		console.log(error);
	// 		dialogsModule
	// 			.confirm({
	// 				message: "Unfortunately we were unable to create your account.",
	// 				okButtonText: "OK"
	// 			});
	// 	});
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
