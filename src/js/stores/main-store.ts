import {ReduceStore} from "flux/utils";
import Dispatcher from "../dispatcher/app-dispatcher";

import { Guid } from "../utils/custom-type";

import { Map, List } from "immutable";

interface Action extends BaseAction {
    viewId: string;
}

interface View {
    id: Guid;
    title: string;
    component: PageComponent;
}

interface Link {
    viewId: string;
    viewTitle: string;
}

interface State {
    links: Link[];
    currentView: View;
}

class MainStore extends ReduceStore<any> {
    private _state;
    private _views = List<View>();

    public getInitialState(): any {
        return Map({
            links: [],
            currentView: null
        });
    }

    public registerComponent(title: string, component: PageComponent, isDefault = false) {
        let view: View = {
            id: Guid.newGuid(),
            title,
            component
        };

        this._views = this._views.push(view);

        if (isDefault) {
            this._state = this._state.set("currentView", view);
        }
    }

    public reduce(state: Map<string, any>, action: Action): any {
        switch (action.type) {
            case "main/current":
                let currentView = this._views.find(view => view.id.toString() === action.viewId);

                return state.set("currentView", currentView);

            case "main/links":
                let links = this._views.map(view => {
                    return { viewId: view.id.toString(), viewTitle: view.title };
                });

                return state.set("links", links.toJS());
            default:
                return state;
        }
    }
}

export default new MainStore(Dispatcher);
