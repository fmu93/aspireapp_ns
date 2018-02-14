import { EventData, Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import { Kinvey } from "kinvey-nativescript-sdk";
import * as frameModule from "ui/frame";
import { GridLayout } from "ui/layouts/grid-layout";
import { BackendService } from "../.././shared/services/backend.service";
import { SearchViewModel } from "./search-view-model";

let members;
const tmobservable = new Observable();

export function onLoaded(args: EventData) {
    const component = <GridLayout>args.object;

    members = new ObservableArray();
    const dataStore = Kinvey.DataStore.collection("memberList", Kinvey.DataStoreType.Network);

    // load members data
    const subscription = dataStore.find()
    .subscribe((entities: Array<{}>) => {
        // console.log(JSON.stringify(entities));

        while (members.length > 0) {
            members.pop();
        }
        let i;
        for (i = 0; i < entities.length; i++) {
            members.push(entities[i]);
        }

        members.set("member", members);
        tmobservable.set("memberList", members);
        component.bindingContext = tmobservable;

    }, (error: Kinvey.BaseError) => {
        console.log(error);
    }, () => {
        console.log("Finished pulling member data");
    });

    // component.bindingContext = new SearchViewModel();
}
