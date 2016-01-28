import * as React from "react";
import * as ReactDOM from "react-dom";
import GoogleMapHelpers from "../../utils/google-map-helpers";

interface Props {
    places: Place[];
}

class GoogleMapMarkers extends React.Component<Props, any> {
    private $map: any;

    public componentDidMount() {
        GoogleMapHelpers.loadMap().then(() => {
            let defaultOptions = {
                    zoom: 6,
                    center: new window.google.maps.LatLng(49.47805, -123.84716),
                    mapTypeId: window.google.maps.MapTypeId.ROADMAP
                };

            this.$map = new window.google.maps.Map(ReactDOM.findDOMNode(this), defaultOptions);
            this.processMarkers(this.props.places);
        });
    }

    public componentDidUpdate() {
        this.processMarkers(this.props.places);
    }

    public setCenter(postion, zoom = 15) {
        this.$map.setZoom(zoom);
        this.$map.setCenter(postion);
    }

    public render() {
        return (
            <div id="map-canvas" style={{height: 400}}></div>
        );
    }

    private processMarkers(places: Place[]) {
        let bounds = new window.google.maps.LatLngBounds(),
            map = this.$map;

        places.forEach((loc) => {
            let infoWindow = new window.google.maps.InfoWindow({
                   content: loc.label
                }),
                marker = new window.google.maps.Marker({
                   position: loc.position,
                   map,
                   title: loc.label
                });

            infoWindow.open(this.$map, marker);

            bounds.extend(marker.position);
        });

        map.fitBounds(bounds);
    }
}

export default GoogleMapMarkers;
