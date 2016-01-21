import {ReduceStore} from "flux/utils";
import Dispatcher from "../dispatcher/app-dispatcher";

import { Map, List } from "immutable";

interface Action extends BaseAction {
    cities: City[];
    error: any;
    selectedCityId: string;
    weather: any;
}

class MainStore extends ReduceStore<any> {
    getInitialState(): any {
        return Map<string, any>({
            cities: <City[]>[],
            selectedCityId: null,
            isLoading: false,
            weather: null
        });
    }

    reduce (state: Map<string, any>, action: Action): any {
        switch (action.type) {
            case "home/cities":
                return state.set("isLoading", true);

            case "home/cities/success":
                return state
                        .set("isLoading", false)
                        .set("cities", action.cities);

            case "home/cities/error":
                return state.set("isLoading", false);

            case "home/city/change":
                return state
                        .set("isLoading", true)
                        .set("selectedCityId", action.selectedCityId);

            case "home/city/weather":
                return state
                        .set("isLoading", false)
                        .set("weather", action.weather);

            default:
                return state;
         }
    }
}

export default new MainStore(Dispatcher);
