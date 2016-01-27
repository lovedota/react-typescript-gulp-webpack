import "./css/home-page.scss";

import * as React from "react";
import {Store} from "flux/utils";
import {Container} from "flux/utils";

import HomeStore from "../../stores/home-store";
import WeatherStore from "../../stores/weather-store";

import HomeActions from "../../actions/home-actions";

import HomeCities from "./home-cities";
import HomeMap from "./home-map";
import HomeWeather from "./home-weather";

interface State {
    cities: City[];
    isLoading: boolean;
    selectedCityIds: string;
    weathers: any;
}

class HomePage extends React.Component<any, State> implements PageComponent {
    public static getStores(): Array<Store> {
        return [HomeStore, WeatherStore];
    }

    public static calculateState(prevState?: State): any {
        let homeState = HomeStore.getState(),
            weatherState = WeatherStore.getState();

        console.log("HomePage: calculateState");

        return {
            isLoading: homeState.get("isLoading"),
            cities: homeState.get("cities"),
            selectedCityIds: homeState.get("selectedCityIds"),
            weathers: weatherState.get("weathers")
        };
    }

    public componentDidMount() {
        if (!this.state.cities.length) {
            console.log("HomePage: calling API to load cities");
            HomeActions.getCities();
        }
    }

    public render() {
        let { weathers } = this.state,
            weatherContent;

        if (weathers.length) {
            weatherContent = (
                <div>
                    <div className="map pull-left">
                        <HomeMap
                            weathers={weathers}
                        />
                    </div>

                    <div className="weather pull-left">
                        <HomeWeather
                            weathers={weathers}
                        />
                    </div>
                </div>
            );
        }

        return (
            <div className="home-page">
                <h3>City Weather Forecast</h3>
                <HomeCities
                    cities={this.state.cities}
                    selectedCityIds={this.state.selectedCityIds}
                    isDisabled={this.state.isLoading}
                />
                <hr/>
                {weatherContent}
            </div>
        );
    }
}

export default Container.create(HomePage);
