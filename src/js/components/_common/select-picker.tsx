import * as React from "react";
import * as ReactDOM from "react-dom";

interface Props {
    onChange: (value: any[] | any) => void;
    defaultValue?: any[] | any;
    children?: any;
    className?: string;
    title: string;
    disabled?: boolean;
    multiple: boolean;
}

class SelectPicker extends React.Component<Props, any> {
    private $select: JQuery;

    componentDidMount() {
        this.$select = $(ReactDOM.findDOMNode(this)).selectpicker();

        this.$select.selectpicker("val", this.props.defaultValue || []);

        this.$select.on("changed.bs.select", () => {
            this.props.onChange(this.$select.selectpicker("val"));
        });
    }

    componentWillUnmount() {
        this.$select.off("changed.bs.select");
        this.$select.selectpicker("destroy");
    }

    componentDidUpdate() {
        this.$select.selectpicker("refresh");
    }

    setValue(newValue) {
        this.$select.selectpicker("val", newValue);
        this.$select.selectpicker("refresh");
    }

    render() {
        let newProps = {};

        for (let prop in this.props) {
            if (prop === "className") {
                newProps[prop] = `selectpicker ${this.props.className || ""}`;
            } else if (prop !== "onChange") {
                newProps[prop] = this.props[prop];
            }
        }

        return (
            <select {...newProps}>
                {this.props.children}
            </select>

        );
    }
}

export default SelectPicker;
