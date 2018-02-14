import { EventData, Observable } from "data/observable";
import { ImageSource } from "tns-core-modules/image-source/image-source";
import view = require("ui/core/view");
import * as frameModule from "ui/frame";
import { Image } from "ui/image";
import { StackLayout } from "ui/layouts/stack-layout";
import { BackendService } from "../.././shared/services/backend.service";
import { HomeViewModel } from "./home-view-model";

export function onLoaded(args: EventData) {
    const component = <StackLayout>args.object;
    component.bindingContext = new HomeViewModel();

    const img = <Image>view.getViewById(component, "img");
    const promise = BackendService.stream2url("f5b138d2-d3b9-4d3e-bf05-d331871eb25d")
    .then((response) => {
    img.src = response._downloadURL;
    });

}
