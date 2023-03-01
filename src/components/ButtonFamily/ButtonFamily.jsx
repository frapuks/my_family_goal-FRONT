import * as React from "react";
import { styled, alpha } from "@mui/material/styles";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { setSelectFamily } from "../../store/slices/familiesSlice";

import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";

const StyledMenu = styled((props) => (
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
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
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
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));


function ButtonFamily() {

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // function au click qui referme le menu déroulant
  const handleClose = () => {
    setAnchorEl(null);    
  };

  // function au click qui change le state de la selectFamily
  const selectNameFamily = (family) => {    
    dispatch(setSelectFamily(family.name))
  };

  const families = useSelector(state => state.families.families);
  const selectFamily = useSelector(state => state.families.selectFamily);
  console.log(selectFamily);

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
        sx={{ mr: "auto", borderRadius: 4 }}
        color="info"
      >
        {/* Affichage de la famille active */}
        {selectFamily}

      </Button>
      <StyledMenu 
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {families.map((family) => (
          <MenuItem key={family.id} onClick={() => {
            handleClose();
            selectNameFamily(family);
          }} 
          disableRipple>
            <FamilyRestroomIcon />
            {family.name}
          </MenuItem>
        ))
        };
      </StyledMenu>
    </div>
  );
}

export default ButtonFamily;
