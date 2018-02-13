import { EventData } from "data/observable";
import * as frameModule from "ui/frame";
import { StackLayout } from "ui/layouts/stack-layout";

import { SearchViewModel } from "./search-view-model";

export function onLoaded(args: EventData) {
    const component = <StackLayout>args.object;
    component.bindingContext = new SearchViewModel();
    frameModule.topmost().navigate("login/login");
}
