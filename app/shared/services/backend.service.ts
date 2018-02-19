import firebase = require("nativescript-plugin-firebase");
import { Observable } from "tns-core-modules/ui/page/page";
import { User } from "./../../shared/user.model";
const config = require("./config");
import { getString, setString } from "application-settings";
import fs = require("file-system");

const tokenKey = "token";
const currentUser = new User();

export class BackendService {

  static isLoggedIn(): boolean {
    return !!getString("token");
  }

  static get token(): string {
    return getString("token");
  }

  static set token(theToken: string) {
    setString("token", theToken);
  }

  static getCurrentUser(): User {
    return currentUser;
  }

  static register(user: User) {
    return firebase.createUser({
      email: user.email,
      password: user.password
    }).then((response) => {
      console.log(JSON.stringify(response));

      return response;
      }
    ).catch((error) => {
      console.log(error);
    });
  }

  static updateUser(user: User) {
    firebase.updateProfile({
      displayName: user.username
    }).then(() => {
          // called when update profile was successful
        },
        (errorMessage) => {
          console.log(errorMessage);
        }
    );
  }

  static login(user: User) {
    return firebase.login({
      type: firebase.LoginType.PASSWORD,
      passwordOptions: {
        email: user.email,
        password: user.password
      }
    }).then((response) => {
        console.log(JSON.stringify(response));
        config.uid = response.uid;

        return response;
      });
  }

  static logout() {
    this.token = "";

    return firebase.logout();
  }

  static resetPassword(email) {
    // return Kinvey.User.resetPassword(email);
  }

  static exists(user: User) {
    // return Kinvey.User.exists(user.username);
  }

  static stream2url(fileId: string) {
    // return Kinvey.Files.stream(fileId);
  }

  static collection2dataStore(collectionName: string) {
    // return Kinvey.DataStore.collection(collectionName, Kinvey.DataStoreType.Network);
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
    // return Kinvey.CustomEndpoint.execute(endPoint, body);
  }

  static uploadImage(filePathShort: string, fileId: string) {
  //   const filePath = fs.path.join(fs.knownFolders.currentApp().path, filePathShort);
  //   const file = fs.File.fromPath(filePath);
  //   const metadata = {
  //     filename: fileId + file.extension,
  //     mimeType: "image/png", // TODO format
  //     size: file.readSync().length,
  //     public: true
  //   };
  //   const promise = Kinvey.Files.upload(file, metadata)
  //     .then((result: any) => {
  //       console.log("Uploaded: " + JSON.stringify(result));
  //     })
  //     .catch((error: Kinvey.BaseError) => {
  //       console.log(error);
  //     });
  }

  static uploadFile(localPath: string, filename?: string): Promise<any> {
    const localFullPath2 = fs.path.join(fs.knownFolders.currentApp().path, localPath);
    const localFile = fs.File.fromPath(localFullPath2);

    return firebase.uploadFile({
      remoteFullPath: "uploads/images/" + filename + localFile.extension,
      localFullPath: localFullPath2,
      onProgress(status) {
          console.log("Uploaded fraction: " + status.fractionCompleted);
          console.log("Percentage complete: " + status.percentageCompleted);
      }
    }).then((uploadedFile) => {
        console.log("File uploaded: " + JSON.stringify(uploadedFile));
      },
      (error) => {
        console.log("File upload error: " + error);
      });
  }

  static getDownloadUrl(remoteFilePath: string): Promise<any> {
      return firebase.getDownloadUrl({
        remoteFullPath: remoteFilePath})
      .then((url: string) => {
          return url;
        },
        (errorMessage: any) => {
          console.log(errorMessage);
        });
  }

}
