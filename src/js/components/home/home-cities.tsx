import * as React from "react";

import HomeActions from "../../actions/home-actions";

interface Props {
    cities: City[];
    isDisabled: boolean;
    selectedCityId: string;
}

class HomeCities extends React.Component<Props, any> {
    render() {
        let options = [
            <option key="default">Select City</option>
        ];

        this.props.cities.forEach(city => {
            options.push(
                <option
                    key={city._id}
                    value={city._id.toString()}>{city.name}
                </option>
            );
        });

        return (
            <div>
                <select
                    disabled={this.props.isDisabled}
                    value={this.props.selectedCityId}
                    onChange={this.onCityChanged.bind(this)}
                >
                    {options}
                </select>
            </div>
        );
    }

    private onCityChanged(event: React.SyntheticEvent) {
        HomeActions.changeCity(event.target["value"]);
    }
}

export default HomeCities;
