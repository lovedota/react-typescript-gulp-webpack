interface BaseAction {
    type: string;
}

interface PageComponent {

}

interface Coordinate {
    lat: number | any;
    lng: number | any;
}

interface Place {
    position: Coordinate;
    label: string | any;
}

interface WeatherCoordinate {
    lon: number;
    lat: number;
}

interface City {
    _id: number;
    name: string;
    country: string;
    coord: Coordinate;
}

interface Window {
    google: any;
    googleMapInitialize: () => void;
}
