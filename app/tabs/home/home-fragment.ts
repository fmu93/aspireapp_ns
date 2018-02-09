import { EventData } from "data/observable";
import * as frameModule from "ui/frame";
import { StackLayout } from "ui/layouts/stack-layout";
import { BackendService } from "../.././shared/services/backend.service";
import { HomeViewModel } from "./home-view-model";

const topmost = frameModule.topmost();
export function onLoaded(args: EventData) {
    const component = <StackLayout>args.object;
    component.bindingContext = new HomeViewModel();
    if (!BackendService.isLoggedIn()) {
        return topmost.navigate("login");
    }
}
