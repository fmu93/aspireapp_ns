import { EventData, Observable } from "data/observable";
import view = require("ui/core/view");
import * as frameModule from "ui/frame";
import { Label } from "ui/label";
import { StackLayout } from "ui/layouts/stack-layout";
import { BackendService } from "../.././shared/services/backend.service";
import { User } from "./../../shared/user.model";
import { BrowseViewModel } from "./browse-view-model";

// const users = Array<{}>();
// const tmobservable = new Observable();
let component;

export function onLoaded(args: EventData) {
    component = <StackLayout>args.object;
    component.bindingContext = new BrowseViewModel();
}

export function lookUp() {
    BackendService.customEndPoint("look-up", {message: "popo"})
    .then((response: Array<{}>) => {
        // while (users.length > 0) {
        //     users.pop();
        // }
        // let i;
        // for (i = 0; response.length; i++) {
        //     // console.log(response[i].username);
        //     users.push(response[i]);
        // }
        const label = <Label>view.getViewById(component, "user-count");
        label.text = String(response.length);

        // tmobservable.set("users", users);
        // component.bindingContext = tmobservable;
    })
    .catch((error) => {
        console.log(error);
    });
}
