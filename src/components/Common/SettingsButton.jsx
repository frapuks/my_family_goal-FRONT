import PropTypes from "prop-types";
// Components
import { Btn } from "./Button";
import { Icons } from "../../constants/Icons";
import { Colors } from "../../constants/Colors";
import { ButtonType } from "./ButtonType";


const SettingsButton = props => (
    <Btn
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

export default SettingsButton;