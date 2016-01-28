import * as React from "react";
import GoogleMapMarkers from "../_common/google-map-markers";

interface Props {
    citiesWeather: CityWeather[];
    selectedWeatherId: string;
}

interface Refs {
    [key: string]: any;
    googleMapMarkers: GoogleMapMarkers;
}

enum GoogleMapMode {
    directions,
    search,
    view,
    streetview
}

class HomeMap extends React.Component<Props, any> {
    public refs: Refs;

    public shouldComponentUpdate(nextProps: Props) {
        if (this.props.selectedWeatherId !== nextProps.selectedWeatherId) {
            let cityWeather = this.props.citiesWeather.find(c => c.id === nextProps.selectedWeatherId);
            this.refs.googleMapMarkers.setCenter({lat: cityWeather.coord.lat, lng: cityWeather.coord.lon});
        }

        return this.props.citiesWeather !== nextProps.citiesWeather;
    }

    public render() {
        let places = this.props.citiesWeather.map<Place>(weather => {
            return {
                position: {lat: weather.coord.lat, lng: weather.coord.lon},
                label: weather.name
            };
        });

        console.log("HomeMap render");

        return (
            <GoogleMapMarkers
                ref="googleMapMarkers"
                places={places}
            />
        );
    }
}

export default HomeMap;
