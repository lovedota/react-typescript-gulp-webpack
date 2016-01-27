import * as React from "react";
import {Store} from "flux/utils";
import {Container} from "flux/utils";

import MainStore from "../../stores/main-store";
import MainActions from "../../actions/main-actions";
import MainHeader from "./main-header";

interface State {
    links: any[];
    currentView: any;
};

class MainComponent extends React.Component<any, State> {
    public static getStores(): Array<Store> {
        return [MainStore];
    }

    public static calculateState(prevState?: State): any {
        console.log("MainComponent: calculateState");
        let state = MainStore.getState();

        return {
            links: state.get("links"),
            currentView: state.get("currentView")
        };
    }

    public componentDidMount() {
        // Call actions after MainComponent init Store
        setTimeout(() => {
            MainActions.getLinks();
        });
    }

    public render() {
        let currentView = this.state.currentView,
            rendered = currentView ? <currentView.component /> : null;

        return (
            <div className="container">
                <MainHeader
                    links={this.state.links}
                    currentViewId={currentView && currentView.id.toString()}
                />
                <div className="jumbotron">
                    {rendered}
                </div>
            </div>
        );
    }
}

export default Container.create(MainComponent);
