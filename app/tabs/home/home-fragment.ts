import { EventData, Observable } from "data/observable";
import { Kinvey } from "kinvey-nativescript-sdk";
import { ImageSource } from "tns-core-modules/image-source/image-source";
import view = require("ui/core/view");
import * as frameModule from "ui/frame";
import { Image } from "ui/image";
import { StackLayout } from "ui/layouts/stack-layout";
import { BackendService } from "../.././shared/services/backend.service";
import { HomeViewModel } from "./home-view-model";

const tmobservable = new Observable();

export function onLoaded(args: EventData) {
    const component = <StackLayout>args.object;
    component.bindingContext = new StackLayout();

    const img = <Image>view.getViewById(component, "img");
    // const imgUrl = BackendService.blobUrlTest("f5b138d2-d3b9-4d3e-bf05-d331871eb25d");
    // img.src = imgUrl;
    console.log("image src: " + img.src);

    const promise = Kinvey.Files.stream("f5b138d2-d3b9-4d3e-bf05-d331871eb25d")
    .then((response) => {
    console.log(response._downloadURL);
    img.src = response._downloadURL;
    });

    // tmobservable.set("imgUrl", imgUrl);

}
