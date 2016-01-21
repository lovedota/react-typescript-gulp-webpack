import { dispatch } from "../dispatcher/app-dispatcher";
import { Guid } from "../utils/custom-type";

export default {
    getLinks() {
        dispatch({type: "main/links"});
    },

    getCurrentView(viewId: Guid) {
        dispatch({type: "main/current", viewId});
    }
};
