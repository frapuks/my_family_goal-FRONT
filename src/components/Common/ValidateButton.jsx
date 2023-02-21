import PropTypes from "prop-types";

import { Colors } from "../../constants/Colors";
import { Button } from "./Button";
import { ButtonType } from "./ButtonType";

export const ValidateButton = props => (
    <Button text="Valider" type={ButtonType.Contained} onClick={props.onClick} color={Colors.Success} />
);

ValidateButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};
