import React from "react";
// Components
import SignUpForm from "../components/SignUp/SignUpForm";
import logo from "../assets/logo-fond-transparent-sans-police.svg";
import { Box, Container, Stack } from "@mui/material";


function SignUpPage() {
    return (
        <Container>
            <Box component="img" src={logo} alt="logo The family Goal" sx={{maxWidth:"50%", margin:"auto"}}/>
            <SignUpForm />
        </Container>
    );
}

export default SignUpPage;