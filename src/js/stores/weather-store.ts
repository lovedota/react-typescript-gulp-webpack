import {ReduceStore} from "flux/utils";
import Dispatcher from "../dispatcher/app-dispatcher";

import { Map } from "immutable";

interface Action extends BaseAction {
    weathers: any;
}

class WeatherStore extends ReduceStore<any> {
    public getInitialState(): Map<string, any> {
        return Map({
            weathers: []
        });
    }

    public reduce(state: Map<string, any>, action: Action): any {
        switch (action.type) {
            case "home/city/weather/success":
                return state.set("weathers", action.weathers);

            default:
                return state;
        }
    }
}

export default new WeatherStore(Dispatcher);
