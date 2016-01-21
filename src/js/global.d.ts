interface BaseAction {
    type: string;
}

interface PageComponent {

}

interface Coordinate {
    lon: number;
    lat: number;
}

interface City {
    _id: number;
    name: string;
    country: string;
    coord: Coordinate;
}
