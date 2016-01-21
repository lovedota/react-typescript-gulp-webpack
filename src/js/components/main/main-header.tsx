import * as React from "react";

import MainActions from "../../actions/main-actions";

interface Props {
    currentViewId: string;
    links: any[];
};

class MainHeader extends React.Component<Props, any> {
    render() {
        return (
            <ul className="nav nav-tabs">
            {this.props.links.map(link => (
                <li
                    className={link.viewId === this.props.currentViewId ? "active" : ""}
                    key={link.viewId}
                    onClick={this.onLinkClicked.bind(this, link.viewId)}>
                    <a href="#">{link.viewTitle}</a>
                </li>
            ))}
            </ul>
        );
    }

    private onLinkClicked(viewId) {
        MainActions.getCurrentView(viewId);
    }
}

export default MainHeader;
