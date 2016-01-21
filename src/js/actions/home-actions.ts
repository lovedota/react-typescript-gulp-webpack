import { dispatch } from "../dispatcher/app-dispatcher";
import * as $ from "jquery";

export default {
    getCities() {
        dispatch({type: "home/cities"});

        $.getJSON("./data/city.list.json")
            .done((data: any) => {
                dispatch({type: "home/cities/success", cities: data.cities});
            })
            .fail(error => {
                dispatch({type: "home/cities/error", error});
            });
    },

    changeCity(selectedCityId: string) {
        dispatch({type: "home/city/change", selectedCityId});

        $.get(`http://api.openweathermap.org/data/2.5/weather?id=${selectedCityId}&units=metric&appid=2de143494c0b295cca9337e1e96b00e0`)
            .done((data: any) => {
                console.log(data);
                dispatch({type: "home/city/weather", weather: data});
            });
    }
};
