import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// Material UI
import { Box, Button, Container, Fab, Stack } from "@mui/material";
import { Add } from "@mui/icons-material";
// Components
import logo from "../assets/logo-fond-transparent-sans-police.svg";
// Slices
import { setActivePage } from "../Store/Slices/navBarSlice";
import { setSelectFamily } from "../Store/Slices/familiesSlice";


function SettingsPage() {
  // UTILS
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // STATES
  const families = useSelector((state) => state.families.listFamilies || []);

  // USEEFFECT
  useEffect(() => {
    dispatch(setActivePage("settingsPage"));
  }, [dispatch]);

  const handleCreateFamily = () => {
    navigate("/namefamily");
  }

  const handleFamily = (family) => {
    dispatch(setSelectFamily(family))
    navigate("/familysettings");
  }


  return (
    <Container>
      <Box component="img" src={logo} alt="logo The family Goal" sx={{maxWidth:"50%", margin:"auto"}}/>
      <Stack spacing={1}>
        {families[0] && families.map((family) => (
          <Button key={family.id} variant="contained" onClick={() => handleFamily(family)}>{family.name}</Button>
          ))}
      </Stack>
      <Fab variant="extended" color="primary" onClick={handleCreateFamily} sx={{position: 'absolute', bottom: 70, right: 16}}>
          <Add sx={{ mr: 1 }}/>
          famille
      </Fab>
    </Container>
  );
}
export default SettingsPage;