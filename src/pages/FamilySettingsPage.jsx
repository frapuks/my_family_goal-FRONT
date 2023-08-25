import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
// Components
import FamilySettingsForm from "../components/FamilySettings/FamilySettingsForm";
// Slices
import { setActivePage } from '../store/slices/navBarSlice';
import { Box, Container } from "@mui/material";
import logo from "../assets/logo-fond-transparent-sans-police.svg";


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