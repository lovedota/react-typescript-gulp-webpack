import * as React from "react";

interface Props {
    lat: number;
    lon: number;
}

enum GoogleMapMode {
    directions,
    search,
    view,
    streetview
}

class HomeMap extends React.Component<Props, any> {
    render() {
        let center = `${this.props.lat},${this.props.lon}`,
            key = "AIzaSyD2oG_njp7xIzzZabkEiQ2SAPci84d1WDA",
            src = `https://www.google.com/maps/embed/v1/${GoogleMapMode[GoogleMapMode.view]}?center=${center}&zoom=12&key=${key}`;

        return (
            <div className="embed-responsive embed-responsive-16by9">
                <iframe
                  width="600"
                  height="450"
                  src={src}
                >
                </iframe>
            </div>
        );
    }
}

export default HomeMap;
