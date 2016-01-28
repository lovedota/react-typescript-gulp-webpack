import {ReduceStore} from "flux/utils";
import Dispatcher from "../../dispatcher/app-dispatcher";

import { List, Map } from "immutable";

interface Action extends BaseAction {
    selectedWeatherId: string;
    citiesWeather: CityWeather[];
}

class HomeWeatherStore extends ReduceStore<any> {
    public getInitialState(): Map<string, any> {
        return Map({
            selectedWeatherId: null,
            citiesWeather: List<CityWeather>()
        });
    }

    public reduce(state: Map<string, any>, action: Action): any {
        switch (action.type) {
            case "home/weather/success":
                return state
                        .set("selectedWeatherId", (action.citiesWeather.length && action.citiesWeather[0].id))
                        .set("citiesWeather", List<CityWeather>(action.citiesWeather));

            case "home/city/weather/selected":
                return state.set("selectedWeatherId", action.selectedWeatherId);

            default:
                return state;
        }
    }
}

export default new HomeWeatherStore(Dispatcher);
