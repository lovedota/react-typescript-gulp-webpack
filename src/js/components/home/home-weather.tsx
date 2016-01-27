import * as React from "react";

interface Props {
    weathers: any[];
}

class HomeWeather extends React.Component<Props, any> {

    render() {
        let cityWeathers = this.props.weathers.map(weather => {
            return {
                id: weather.id,
                main: weather.main,
                weather: weather.weather[0],
                name: weather.name
            };
        });

        return (
            <div>
                {cityWeathers.map(cityWeather => {
                    return (
                        <div className="media" key={cityWeather.id}>
                            <div className="media-left">
                                <img src={`http://openweathermap.org/img/w/${cityWeather.weather.icon}.png`} />
                            </div>
                            <div className="media-body">
                                <h6 className="media-heading">
                                    {cityWeather.name} &nbsp;
                                    <em>{cityWeather.weather.main} {cityWeather.main.temp} °C</em>
                                </h6>
                                {cityWeather.weather.description}
                            </div>
                        </div>
                    );
                })}
            </div>

        );
    }
}

export default HomeWeather;
