import * as React from "react";

interface Props {
    weather: any;
    main: any;
}

class HomeWeather extends React.Component<Props, any> {

    render() {
        let { weather, main } = this.props;

        return (
            <div className="media" key={weather.id}>
                <div className="media-left">
                    <img src={`http://openweathermap.org/img/w/${weather.icon}.png`} />
                </div>
                <div className="media-body">
                    <h4 className="media-heading">
                        {weather.main} &nbsp;
                        <em>{main.temp} °C</em>
                    </h4>
                    {weather.description}
                </div>
            </div>
        );
    }
}

export default HomeWeather;
