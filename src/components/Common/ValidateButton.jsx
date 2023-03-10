import PropTypes from "prop-types";
// Components
import { Btn } from "./Button";
import { Colors } from "../../constants/Colors";
import { ButtonType } from "./ButtonType";


const ValidateButton = (props) => (
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

export default ValidateButton;