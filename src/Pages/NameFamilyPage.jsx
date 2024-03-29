import React from "react";
// Components
import { NameFamilyForm } from "../Components";
import logo from "../Assets/logo-fond-transparent-sans-police.svg";
import { Box, Container } from "@mui/material";


function NameFamilyPage() {
  return (
    <Container>
      <Box component="img" src={logo} alt="logo The family Goal" sx={{maxWidth:"50%", margin:"auto"}}/>
      <NameFamilyForm />
    </Container>
  );
}

export default NameFamilyPage;