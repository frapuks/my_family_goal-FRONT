import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ButtonFamily from "../ButtonFamily/ButtonFamily";
import { useSelector } from "react-redux";

function Header() {

  const families = useSelector((state) => state.families.families);
  console.log(families);

  return (
    <>
      {families[0] ? (
        <AppBar
          position="sticky"
          color="secondary"
          sx={{ borderBottomLeftRadius: 100, borderBottomRightRadius: 100 }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              color="white"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <ButtonFamily />
          </Toolbar>
        </AppBar>
      ) : (
       <></>
      )}
    </>
  );
}

export default Header;
