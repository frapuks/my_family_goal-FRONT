import PropTypes from "prop-types";

import { Colors } from "../../constants/Colors";
import { Btn } from "./Button";
import { ButtonType } from "./ButtonType";

export const ValidateButton = (props) => (
  <Btn
    text={props.text ?? "Valider"}
    type={ButtonType.Contained}
    onClick={props.onClick}
    color={Colors.Primary}
    isSubmit
    disabled={props.disabled}
  />
);

ValidateButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string,
};
