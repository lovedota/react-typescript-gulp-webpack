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

    public componentDidMount() {
        this.$select = $(ReactDOM.findDOMNode(this)).selectpicker();

        this.$select.selectpicker("val", this.props.defaultValue || []);

        this.$select.on("changed.bs.select", () => {
            this.props.onChange(this.$select.selectpicker("val"));
        });
    }

    public componentWillUnmount() {
        this.$select.off("changed.bs.select");
        this.$select.selectpicker("destroy");
    }

    public componentDidUpdate() {
        this.$select.selectpicker("refresh");
    }

    public setValue(newValue) {
        this.$select.selectpicker("val", newValue);
        this.$select.selectpicker("refresh");
    }

    public hide() {
        this.$select.parent("div.bootstrap-select").removeClass("open");
    }

    public render() {
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
