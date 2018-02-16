import { Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import { BackendService } from "../../../shared/services/backend.service";
import { User } from "../../../shared/user.model";

export class BrowseViewModel extends Observable {
    users: ObservableArray<User>;

    constructor() {
        super();
    }

    setUsers(observableArray: ObservableArray<User>) {
        return this.users = observableArray;
    }
}
