import React from "react";
import PropTypes from "prop-types";
import MUIButton from "@mui/material/Button";
import { AddCircle, CheckCircle, Delete, Info, Settings } from "@mui/icons-material";
import { Link } from "react-router-dom";

import { Icons } from "../../constants/Icons";
import { ButtonType } from "./ButtonType";
import { Colors } from "../../constants/Colors";

const LinkBehavior = React.forwardRef((props, ref) => {
    const { href, ...other } = props;
    // Map href (MUI) -> to (react-router)
    return <Link data-testid="custom-link" ref={ref} to={href} {...other} />;
});

export const Btn = props => {
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

function getIcon(icon) {
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
}

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
