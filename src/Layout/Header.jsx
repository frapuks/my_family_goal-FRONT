import { AppBar, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  // Utils
  const navigate = useNavigate();

  // METHODS
  const handleClickTitle = () => {
    navigate("/");
  }

  return (
    <AppBar component="header" position="static">
      <Toolbar>
        <Typography variant="h6" component="div" onClick={handleClickTitle}>My Family Goal</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;