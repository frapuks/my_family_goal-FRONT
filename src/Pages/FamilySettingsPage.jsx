import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
// Components
import { FamilySettingsForm } from "../Components";
import logo from "../Assets/logo-fond-transparent-sans-police.svg";
// Slices
import { setActivePage } from '../Store/Slices/navBarSlice';
import { Box, Container } from "@mui/material";


function FamilySettingsPage() {
    // UTILS
  const dispatch = useDispatch();

  // USEEFFECT
  useEffect(() => {
    dispatch(setActivePage('settingsPage'));
  }, [dispatch]);


  return(
    <Container>
      <Box component="img" src={logo} alt="logo The family Goal" sx={{maxWidth:"50%", margin:"auto"}}/>
      <FamilySettingsForm />
    </Container>
  );
}

export default FamilySettingsPage;