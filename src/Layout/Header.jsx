import { AppBar, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ButtonFamily } from "../components";
import { selectToken } from "../store/slices/userSlice";

const Header = () => {
  // Utils
  const navigate = useNavigate();
  const listFamilies = useSelector(state => state.families.listFamilies);
  const token = useSelector(selectToken);

  // METHODS
  const handleClickTitle = () => {
    token ? navigate("/dashboard") : navigate("/");
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