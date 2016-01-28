import "./css/home-page.scss";

import * as React from "react";
import * as ReactDOM from "react-dom";

import {Store} from "flux/utils";
import {Container} from "flux/utils";

import HomeCityStore from "../../stores/home/home-city-store";
import HomeWeatherStore from "../../stores/home/home-weather-store";

import HomeActions from "../../actions/home-actions";

import HomeCities from "./home-cities";
import HomeMap from "./home-map";
import HomeWeather from "./home-weather";

interface Refs {
    [key: string]: any;
    homeWeather: HomeWeather;
    homeMap: HomeMap;
}

interface State {
    cities: City[];
    isLoading: boolean;
    selectedCityIds: string[];
    citiesWeather: any;
    selectedWeatherId: string;
}

class HomePage extends React.Component<any, State> implements PageComponent {
    public refs: Refs;

    public static getStores(): Array<Store> {
        return [HomeCityStore, HomeWeatherStore];
    }

    public static calculateState(prevState?: State): any {
        let homeState = HomeCityStore.getState(),
            weatherState = HomeWeatherStore.getState();

        console.log("HomePage: calculateState");

        return {
            isLoading: homeState.get("isLoading"),
            cities: homeState.get("cities"),
            selectedCityIds: homeState.get("selectedCityIds"),
            citiesWeather: weatherState.get("citiesWeather"),
            selectedWeatherId: weatherState.get("selectedWeatherId")
        };
    }

    public componentDidMount() {
        if (!this.state.cities.length) {
            console.log("HomePage: calling API to load cities");
            HomeActions.getCities();
        }
    }

    public componentDidUpdate() {
        let $map = $(ReactDOM.findDOMNode(this.refs.homeMap)),
            $weather = $(ReactDOM.findDOMNode(this.refs.homeWeather));

        if (this.state.citiesWeather.size) {
            if (this.state.isLoading) {
                $map.block();
                $weather.block();
            } else {
                $map.unblock();
                $weather.unblock();
            }
        }
    }

    public render() {
        let { citiesWeather, selectedWeatherId } = this.state,
            weatherContent;

        if (citiesWeather.size) {
            weatherContent = (
                <div>
                    <div className="map pull-left">
                        <HomeMap
                            ref="homeMap"
                            selectedWeatherId={selectedWeatherId}
                            citiesWeather={citiesWeather}
                        />
                    </div>

                    <div className="weather pull-left">
                        <HomeWeather
                            ref="homeWeather"
                            selectedWeatherId={selectedWeatherId}
                            citiesWeather={citiesWeather}
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
