import * as React from "react";
import GoogleMapMarkers from "../_common/google-map-markers";

interface Props {
    weathers: any[];
}

enum GoogleMapMode {
    directions,
    search,
    view,
    streetview
}

class HomeMap extends React.Component<Props, any> {
    public render() {
        let places = this.props.weathers.map<Place>(weather => {
            return {
                position: {lat: weather.coord.lat, lng: weather.coord.lon},
                label: weather.name
            };
        });

        return (
            <GoogleMapMarkers
                places={places}
            />
        );
    }
}

export default HomeMap;
