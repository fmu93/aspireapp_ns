// import { Injectable } from "core";
// import { Headers, Http, Response } from "http";
import { Kinvey, User } from "kinvey-nativescript-sdk";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";

// import { BackendService } from "./../shared/services/backend.service";
// import { User } from "./../shared/user.model";

// @Injectable()
export class LoginService {
  // constructor(http: Http) { }

  register(user: User) {
    return Kinvey.User.signup(user);
  }

  login(user: User) {
    return Kinvey.User.login(user.username, user.password);
  }

  loginWithMIC() {
    return Kinvey.User.loginWithMIC("http://redirecturi");
  }

  logoout() {
    return Kinvey.User.logout();
  }

  resetPassword(email) {
    return Kinvey.User.resetPassword(email);
  }
}
