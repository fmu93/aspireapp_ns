import { Kinvey } from "kinvey-nativescript-sdk";
import { User } from "./../../shared/user.model";

export class BackendService {
    static isLoggedIn(): boolean {
      console.log(Kinvey.User.getActiveUser() && true + " isLoggedIn");

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
  }
