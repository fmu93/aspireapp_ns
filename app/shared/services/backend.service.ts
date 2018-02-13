import { Kinvey, User } from "kinvey-nativescript-sdk";

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
      console.log("Logging out");
      
      return Kinvey.User.logout();
    }
  
    static resetPassword(email) {
      return Kinvey.User.resetPassword(email);
    }
  }
