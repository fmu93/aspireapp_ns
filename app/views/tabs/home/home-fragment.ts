import { EventData, Observable } from "data/observable";
import fs = require("file-system");
import * as imageSourceModule from "image-source";
import imagepicker = require("nativescript-imagepicker");
import * as Toast from "nativescript-toast";
import { ImageSource } from "tns-core-modules/image-source/image-source";
import view = require("ui/core/view");
import * as frameModule from "ui/frame";
import { Image } from "ui/image";
import { StackLayout } from "ui/layouts/stack-layout";
import { BackendService } from "../../../shared/services/backend.service";
import { HomeViewModel } from "./home-view-model";

let component = new StackLayout();
const homeViewModel = new HomeViewModel();
const tmobservable = new Observable();

export function onLoaded(args: EventData) {
    component = <StackLayout>args.object;
    component.bindingContext = homeViewModel;

    const img = <Image>view.getViewById(component, "img");
    homeViewModel.set("img", img);
    // const promise = BackendService.stream2url("f5b138d2-d3b9-4d3e-bf05-d331871eb25d")
    // .then((response) => {
    //     homeViewModel.img.src = response._downloadURL;
    // });
}

export function imgTap() {
    Toast.makeText(String(homeViewModel.img.src)).show();
}

let milliseconds;
export function imgUpload() {
    milliseconds = (new Date()).getTime();
    const context = imagepicker.create({
        mode: "single"
    });
    context.authorize().then(() => {
        return context.present();
    }).then((selection) => {
        selection.forEach((element) => {
            BackendService.uploadFile(element.fileUri, String(milliseconds));
        });
    });
}

export function imgDownload() {
    // const promise = BackendService.stream2url("f5b138d2-d3b9-4d3e-bf05-d331871eb25d")
    // .then((response) => {
    //     homeViewModel.img.src = response._downloadURL;
    //     console.log("Downloaded: " + homeViewModel.img.src);
    // }).catch((error) => {
    //     console.log(error);
    // });
}
