class GoogleMapHelper {
    public loadScript() {
        let script = document.createElement("script");

        script.type = "text/javascript";
        script.src = "https://maps.googleapis.com/maps/api/js?v=3.exp" +
            "&key=AIzaSyAiwTZLriIDD0NlJQFU7FWYAKGOqsDCmyI&callback=googleMapInitialize";

        document.body.appendChild(script);
    }

    public loadMap() {
        return new Promise(resolve => {
            if (window.google) {
                resolve();
            } else {
                window.googleMapInitialize = () => {
                    resolve();
                };

                this.loadScript();
            }
        });
    }

    public pinSymbol(color) {
        return {
            path: "M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2," +
            "-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0",
            fillColor: color,
            fillOpacity: 1,
            strokeColor: "#000",
            strokeWeight: 2,
            scale: 1
        };
    }
}

export default new GoogleMapHelper();
