import * as application from "application";
import { Color } from "color";
import { EventData, fromObject, Observable } from "data/observable";
import * as platform from "platform";
import { View } from "ui/core/view";
import { EditableTextBase } from "ui/editable-text-base";
import * as frameModule from "ui/frame";
import { Page } from "ui/page";
import * as linearGradient from "../../common/linear-gradient";

declare let android: any;
// const observable = new Observable();

export function onPageNavigatingTo(args: EventData) {
    const page = <Page>args.object;
    const viewModel = fromObject({
        username: "ILoveNS",
        email: "team@mail.com",
        password: "password",
        bio: undefined,
        isPublic: true,
        showPassword: false
    });
    page.bindingContext = viewModel;
}

export function onContentLoaded(args: EventData) {
    const view = <View>args.object;

    // if (platform.device.os === platform.platformNames.ios) {
    //     view.ios.backgroundColor = UIColor.whiteColor();
    //     view.ios.layer.masksToBounds = false;
    //     view.ios.layer.shadowColor = UIColor.blackColor().CGColor;
    //     view.ios.layer.shadowOffset = CGSizeMake(5.0, 5.0);
    //     view.ios.layer.shadowOpacity = 0.5;
    //     view.ios.layer.bord
    // }
}

export function onBackgroundLoaded(args: EventData) {
    const background = <View>args.object;
    const colors = new Array<Color>(new Color("#667297"), new Color("#5C687C"));
    const orientation = linearGradient.Orientation.Top_Bottom;

    switch (platform.device.os) {
        case platform.platformNames.android:
            linearGradient.drawBackground(background, colors, orientation);
            break;
        case platform.platformNames.ios:
            // The iOS view has to be sized in order to apply a background
            setTimeout(() => {
                linearGradient.drawBackground(background, colors, orientation);
            });
            break;
    }
}

export function onProfilePictureTapped(args: EventData) {
    notify("Change Image Tapped!");
}

export function onUpdateButtonTapped(args: EventData) {
    notify("Update Tapped!");
}

function notify(msg: string) {
    switch (platform.device.os) {
        case platform.platformNames.android:
            android.widget.Toast.makeText(application.android.context, msg, android.widget.Toast.LENGTH_SHORT).show();
            break;
        case platform.platformNames.ios:
            console.log(msg);
            break;
    }
}

export function onShowPasswordTapped(args: EventData) {
    const view = <View>args.object;
    const viewModel = view.page.bindingContext;
    viewModel.showPassword = !viewModel.showPassword;
}

let closeTimeout = 0;
export function onTextInputTapped(args: EventData) {
    if (closeTimeout) {
        clearTimeout(closeTimeout);
    }
    closeTimeout = setTimeout(() => {
        closeTimeout = 0;
    }, 20);
}

export function onPageTapped(args: EventData) {
    const page = <Page>args.object;
    if (!closeTimeout) {
        closeTimeout = setTimeout(() => {
            page.getViewById<EditableTextBase>("username").dismissSoftInput();
            page.getViewById<EditableTextBase>("email").dismissSoftInput();
            page.getViewById<EditableTextBase>("password").dismissSoftInput();
            page.getViewById<EditableTextBase>("bio").dismissSoftInput();
            closeTimeout = 0;
        }, 20);
    }
}

export function goBack(args) {
    frameModule.topmost().navigate("login/login");
}
