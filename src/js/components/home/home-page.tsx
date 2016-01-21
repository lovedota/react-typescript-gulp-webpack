import * as React from "react";
import {Store} from "flux/utils";
import {Container} from "flux/utils";

import HomeStore from "../../stores/home-store";
import HomeActions from "../../actions/home-actions";
import HomeCities from "./home-cities";
import HomeMap from "./home-map";
import HomeWeather from "./home-weather";

interface State {
    cities: City[];
    isLoading: boolean;
    selectedCityId: string;
    weather: any;
}

class HomePage extends React.Component<any, State> implements PageComponent {

    static getStores(): Array<Store> {
        return [HomeStore];
    }

    static calculateState(prevState?: State): any {
        let state = HomeStore.getState();

        return {
            isLoading: state.get("isLoading"),
            cities: state.get("cities"),
            selectedCityId: state.get("selectedCityId"),
            weather: state.get("weather")
        };
    }

    componentDidMount() {
        if (!this.state.cities.length) {
            console.log("HomePage: calling API to load cities");
            HomeActions.getCities();
        }
    }

    onCityChanged(event: React.SyntheticEvent) {
        HomeActions.changeCity(event.target["value"]);
    }

    render() {
        let { weather } = this.state,
            weatherContent;

        if (weather) {
            weatherContent = (
                <div className="well">
                    <HomeWeather
                        weather={weather.weather[0]}
                        main={weather.main}
                    />
                    <HomeMap
                        lat={weather.coord.lat}
                        lon={weather.coord.lon}
                    />
                </div>
            );
        }

        return (
            <div>
                <h3>City Weather Forecast</h3>
                <HomeCities
                    cities={this.state.cities}
                    selectedCityId={this.state.selectedCityId}
                    isDisabled={this.state.isLoading}
                />
                <hr/>
                {weatherContent}
            </div>
        );
    }
}

export default Container.create(HomePage);
