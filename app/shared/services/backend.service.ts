import fs = require("file-system");
import { Kinvey } from "kinvey-nativescript-sdk";
import { Observable } from "tns-core-modules/ui/page/page";
import { User } from "./../../shared/user.model";
import { Config } from "./../config";

export class BackendService {
    static isLoggedIn(): boolean {
        return Kinvey.User.getActiveUser() && true;
    }

    static register(user: User) {
        return Kinvey.User.signup(user);
    }

    static login(user: User) {
        return Kinvey.User.login(user.username, user.password);
    }

    static loginWithMIC() {
        return Kinvey.User.loginWithMIC("http://redirecturi");
    }

    static logout() {
        return Kinvey.User.logout();
    }

    static resetPassword(email) {
        return Kinvey.User.resetPassword(email);
    }

    static exists(user: User) {
        return Kinvey.User.exists(user.username);
    }

    static stream2url(fileId: string) {
        return Kinvey.Files.stream(fileId);
    }

    static collection2dataStore(collectionName: string) {
        return Kinvey.DataStore.collection(collectionName, Kinvey.DataStoreType.Network);
    }

    static removeUser() {
      // TODO no remove function in User
      //   const promise = Kinvey.User.remove(Kinvey.User.getActiveUser().username, {
      //     hard: true
      //   })
      //     .then(() => {
      //       // ...
      //     })
      //     .catch((error: Kinvey.BaseError) => {
      //       // ...
      //     });
    }

    static customEndPoint(endPoint: string, body: {}) {
        return Kinvey.CustomEndpoint.execute(endPoint, body);
    }

    static uploadImage(filePathShort: string, fileId: string) {
        const filePath = fs.path.join(fs.knownFolders.currentApp().path, filePathShort);
        const file = fs.File.fromPath(filePath);
        const metadata = {
            filename: fileId + file.extension,
            mimeType: "image/png", // TODO format
            size: file.readSync().length,
            public: true
        };
        const promise = Kinvey.Files.upload(file, metadata)
            .then((result: any) => {
            console.log("Uploaded: " + JSON.stringify(result));
            })
            .catch((error: Kinvey.BaseError) => {
            console.log(error);
            });
    }

}
