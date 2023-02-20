import PropTypes from "prop-types";

import { Colors } from "../../constants/Colors";
import { Icons } from "../../constants/Icons";
import { Button } from "./Button";
import { ButtonType } from "./ButtonType";

export const SettingsButton = props => (
    <Button
        type={ButtonType.Contained}
        text="Settings"
        color={Colors.Secondary}
        onClick={props.onClick}
        icon={Icons.Gear}
    />
);

SettingsButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};
