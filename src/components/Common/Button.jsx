import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// Material UI
import MUIButton from "@mui/material/Button";
import { AddCircle, CheckCircle, Delete, Info, Settings } from "@mui/icons-material";
// Components
import { Icons } from "../../constants/Icons";
import { Colors } from "../../constants/Colors";
import { ButtonType } from "./ButtonType";


// UTILS
const LinkBehavior = React.forwardRef((props, ref) => {
    const { href, ...other } = props;
    // Map href (MUI) -> to (react-router)
    return <Link data-testid="custom-link" ref={ref} to={href} {...other} />;
});

const getIcon = (icon) => {
    switch (icon) {
        case Icons.Check:
            return <CheckCircle />;

        case Icons.Delete:
            return <Delete />;

        case Icons.Gear:
            return <Settings />;

        case Icons.Info:
            return <Info />;

        case Icons.Plus:
            return <AddCircle />;

        default:
            return undefined;
    }
};

// Component
const Btn = props => {
    const icon = getIcon(props.icon);
    const variant = props.type ?? ButtonType.Contained;
    const color = props.color ?? Colors.Primary;

    return (
        <MUIButton
            color={color}
            disabled={props.disabled}
            href={props.href}
            onClick={props.onClick}
            startIcon={icon}
            type={props.isSubmit ? "submit" : "button"}
            variant={variant}
            LinkComponent={props.href ? LinkBehavior : "a"}
        >
            {props.text}
        </MUIButton>
    );
};

Btn.propTypes = {
    color: PropTypes.oneOf(Object.values(Colors)),
    disabled: PropTypes.bool,
    href: PropTypes.string,
    icon: PropTypes.oneOf(Object.values(Icons)),
    onClick: PropTypes.func,
    isSubmit: PropTypes.bool,
    text: PropTypes.string,
    type: PropTypes.oneOf(Object.values(ButtonType)),
};

export default Btn;