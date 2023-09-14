import React from "react";
// Material UI
import { Box, Container } from "@mui/material";
// Components
import { SignUpForm } from "../components";
import logo from "../assets/logo-fond-transparent-sans-police.svg";


function SignUpPage() {
    return (
        <Container>
            <Box component="img" src={logo} alt="logo The family Goal" sx={{ maxWidth: "50%", margin: "auto" }} />
            <SignUpForm />
        </Container>
    );
}

export default SignUpPage;