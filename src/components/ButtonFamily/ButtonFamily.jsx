import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// Material UI
import { styled, alpha } from "@mui/material/styles";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Menu, MenuItem, Button } from "@mui/material";
// Slices
import { setSelectFamily } from "../../store/slices/familiesSlice";


const StyledMenu = styled(props => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "center",
        }}
        {...props}
    />
))(({ theme }) => ({
    "& .MuiPaper-root": {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color: theme.palette.mode === "light" ? "rgb(55, 65, 81)" : theme.palette.grey[300],
        boxShadow:
            "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
        "& .MuiMenu-list": {
            padding: "4px 0",
        },
        "& .MuiMenuItem-root": {
            "& .MuiSvgIcon-root": {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            "&:active": {
                backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
            },
        },
    },
}));

function ButtonFamily() {
    // UTILS
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // STATES
    const listFamilies = useSelector(state => state.families.listFamilies);
    const selectFamily = useSelector(state => state.families.selectFamily);
    const [anchorEl, setAnchorEl] = useState(null);
    // VARIABLES
    const open = Boolean(anchorEl);

    // METHODS

    // open menu dropdown
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    // close menu dropdown
    const handleClose = () => {
        setAnchorEl(null);
    };

    // handle select family
    const selectNameFamily = family => {
        dispatch(setSelectFamily(family));
        navigate("/dashboard");
    };

    // RETURN
    return (
        <div>
            <Button
                id="demo-customized-button"
                aria-controls={open ? "demo-customized-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
                sx={{borderRadius: 4, borderColor: "white", }}
                color="info"
            >
                {selectFamily ? selectFamily.name : listFamilies[0]?.name}
            </Button>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{"aria-labelledby": "demo-customized-button"}}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {
                    listFamilies.map(family => (
                        <MenuItem
                            key={family.name}
                            onClick={() => {
                                handleClose();
                                selectNameFamily(family);
                            }}
                            disableRipple
                        >
                            <FamilyRestroomIcon />
                            {family.name}
                        </MenuItem>
                    ))
                }
            </StyledMenu>
        </div>
    );
}

export default ButtonFamily;