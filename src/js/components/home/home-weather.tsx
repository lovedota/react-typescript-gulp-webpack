import "./css/home-weather.scss";

import * as React from "react";
import classNames from "classnames";

import HomeActions from "../../actions/home-actions";

import { List } from "immutable";

interface Props {
    citiesWeather: List<CityWeather>;
    selectedWeatherId: string;
}

class HomeWeather extends React.Component<Props, any> {
    public shouldComponentUpdate(nextProps: Props) {
        return (this.props.selectedWeatherId !== nextProps.selectedWeatherId) ||
               (this.props.citiesWeather !== nextProps.citiesWeather);
    }

    public render() {
        let citiesWeather = this.props.citiesWeather.map(weather => {
                return {
                    id: weather.id,
                    main: weather.main,
                    weather: weather.weather[0],
                    name: weather.name
                };
            }),
            selectedWeatherId = this.props.selectedWeatherId;

        console.log("HomeWeather render");

        return (
            <div className="home-weather">
                {citiesWeather.map(city => {
                    return (
                        <div
                            className={classNames("media", {"active": selectedWeatherId === city.id})}
                            key={city.id}
                            onClick={this.onWeatherClick.bind(this, city.id)}
                        >
                            <div className="media-left">
                                <img src={`http://openweathermap.org/img/w/${city.weather.icon}.png`} />
                            </div>
                            <div className="media-body">
                                <h6 className="media-heading">
                                    {city.name} &nbsp;
                                    <em>{city.weather.main} {city.main.temp} °C</em>
                                </h6>
                                {city.weather.description}
                            </div>
                        </div>
                    );
                })}
            </div>

        );
    }

    private onWeatherClick(weatherId: string) {
        HomeActions.changeSelectedWeather(weatherId);
    }
}

export default HomeWeather;
