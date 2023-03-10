import React from "react";
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';
// Material UI
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";

//const ITEM_HEIGHT = 48;
//const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//     PaperProps: {
//         style: {
//             maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//             width: 250,
//         },
//     },
// };

function SelectUserValidatingTask({ personId, setPersonId }) {
    const members = useSelector(state => state.members.listMembers);

    const handleChange = e => {
        setPersonId(e.target.value);
        // On autofill we get a stringified value.
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-name-label">Name</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    onChange={handleChange}
                    input={<OutlinedInput label="Name" />}
                    // MenuProps={MenuProps}
                    value={personId ?? ""}
                >
                    {members
                        .filter(member => !member.isParent)
                        .map(member => (
                            <MenuItem key={member.id} value={member.id} name={member.firstName}>
                                {member.firstname}
                            </MenuItem>
                        ))}
                </Select>
            </FormControl>
        </div>
    );
}

SelectUserValidatingTask.propTypes = {
    personId: PropTypes.string,
    setPersonId: PropTypes.string,
};


export default SelectUserValidatingTask;