import { AppBar, Button, Select, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ButtonFamily } from "../components";

const Header = () => {
  // Utils
  const navigate = useNavigate();
  const listFamilies = useSelector(state => state.families.listFamilies);

  // METHODS
  const handleClickTitle = () => {
    navigate("/");
  }

  return (
    <AppBar component="header" position="static">
      <Toolbar>
        <Typography variant="h6" component="div" onClick={handleClickTitle} sx={{ flexGrow: 1 }}>My Family Goal</Typography>
        {listFamilies[0] && <ButtonFamily/>}
      </Toolbar>
    </AppBar>
  );
};

export default Header;