import PropTypes from "prop-types";
import MUITextField from "@mui/material/TextField";

export const TextField = props => {
    const onChangeInternal = e => props.onChange?.(e.currentTarget.value);

    return (
        <MUITextField
            disabled={props.disabled}
            error={!!props.errorText}
            helperText={props.errorText}
            label={props.label}
            variant="outlined"
            onChange={onChangeInternal}
            name={props.name}
            required={props.required}
            type={props.type}
            placeholder={props.placeholder}
        />
    );
};

TextField.propTypes = {
    disabled: PropTypes.bool,
    errorText: PropTypes.string,
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    type: PropTypes.string,
    value: PropTypes.string,
};
