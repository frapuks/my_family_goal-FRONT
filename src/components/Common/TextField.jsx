import PropTypes from "prop-types";
import MUITextField from "@mui/material/TextField";

export const TextField = props => {
    const onChangeInternal = e => props.onChange(e.currentTarget.value);

    return (
        <MUITextField
            error={!!props.errorText}
            helperText={props.errorText}
            label={props.label}
            variant="outlined"
            onChange={onChangeInternal}
            name={props.name}
            required={props.required}
        />
    );
};

TextField.propTypes = {
    errorText: PropTypes.string,
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    onChange: PropTypes.func,
    required: PropTypes.bool,
    value: PropTypes.string,
};
