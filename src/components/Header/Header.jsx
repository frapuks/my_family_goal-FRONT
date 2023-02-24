import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ButtonFamily from "../ButtonFamily/ButtonFamily"


function Header() {
  return (
    <AppBar position="sticky" color="secondary">
      <Toolbar>

        <Typography variant="h6" color="white" component="div" sx={{ flexGrow: 1 }}>
        
        </Typography>
        
          <ButtonFamily/>

      </Toolbar>  
    </AppBar>
    
  );
}

export default Header;