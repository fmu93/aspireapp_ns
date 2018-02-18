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
            // homeViewModel.img.src = element.fileUri;
            BackendService.uploadImage(element.fileUri, String(milliseconds));

            // element.getImage().then((imageSource) => {
            //     console.log("This image: " + String(imageSource));
            //     // const folder = fs.knownFolders.documents();
            //     // const path = fs.path.join(folder.path, milliseconds + ".png");
            //     BackendService.uploadImage(String(imageSource), String(milliseconds));
            //     // const saved = imageSource.saveToFile(path, "png");
            //     // homeViewModel.img.src = path;
            //     // console.log("Saved image: " + path);
            // });
        });
    });
}

export function imgDownload() {
    const promise = BackendService.stream2url("65949bb1-a948-43d5-916a-5370dcb19c5e")
    .then((response) => {
        homeViewModel.img.src = response._downloadURL;
        console.log("Downloaded: " + homeViewModel.img.src);
    }).catch((error) => {
        console.log(error);
    });
}
