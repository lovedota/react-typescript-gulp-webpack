import * as React from "react";
import * as ReactDOM from "react-dom";
import GoogleMapHelpers from "../../utils/google-map-helpers";

interface Props {
    places: Place[];
}

class GoogleMapMarkers extends React.Component<Props, any> {
    private $map: any;

    componentDidMount() {
        GoogleMapHelpers.loadMap().then(() => {
            let defaultOptions = {
                    zoom: 12,
                    center: new window.google.maps.LatLng(49.47805, -123.84716),
                    mapTypeId: window.google.maps.MapTypeId.ROADMAP
                };

            this.$map = new window.google.maps.Map(ReactDOM.findDOMNode(this), defaultOptions);
            this.processMarkers(this.props.places);
        });
    }

    componentDidUpdate() {
        this.processMarkers(this.props.places);
    }

    processMarkers(places: Place[]) {
        let defaultOptions = {
               zoom: 6,
               center: new window.google.maps.LatLng(49.47805, -123.84716),
               mapTypeId: window.google.maps.MapTypeId.ROADMAP
            },
            bounds = new window.google.maps.LatLngBounds(),
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

    render() {
        return (
            <div id="map-canvas" style={{height: 400}}></div>
        );
    }
}

export default GoogleMapMarkers;
