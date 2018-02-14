import { Kinvey } from "kinvey-nativescript-sdk";
// const http = require("http");
import { User } from "./../../shared/user.model";
const config = require("./config");

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

    static lookUp() {
      // const query = new Kinvey.Query();
      // query.equalTo('firstName', 'John');
      // const subscription = Kinvey.User.lookup(query)
      // .subscribe((user: Kinvey.User) => {
      //   // ...
      // });
    }

    static invokeTest() {
      Kinvey.CustomEndpoint.execute("hello-world", {
        username: Kinvey.User.getActiveUser().username
        })
        .then((response) => {
          console.log(JSON.stringify(response));
        })
        .catch((error) => {
          console.log(error.stack);
        });
    }

    static collectionTest() {
      const dataStore = Kinvey.DataStore.collection("hello-world");
      const subscription = dataStore.find()
      .subscribe((entities: {}) => {
        console.log(entities);
      }, (error: Kinvey.BaseError) => {
        console.log(error);
      }, () => {
        console.log("finished pulling data!");
      });
    }

    static blobUrlTest(fileId: string) {
      const promise = Kinvey.Files.stream(fileId)
      .then((response) => {
      console.log(response._downloadURL);

      return response._downloadURL;
      });
    }

    // static toJSON(user: User) {
    //   return JSON.stringify(Kinvey.User.toJSON());
    // }
  }
