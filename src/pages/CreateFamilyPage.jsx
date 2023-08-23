import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// Components
import logo from "../assets/logo-fond-transparent-sans-police.svg";
import { Colors } from "../constants/Colors";
import { ValidateButton } from "../components/Common/ValidateButton";
// Slices
import { selectToken } from "../store/slices/userSlice";
import { setActivePage } from "../store/slices/navBarSlice";
import { Box, Button, Card, CardActions, CardContent, Container, Stack, Typography } from "@mui/material";


function CreateFamilyPage() {
    // UTILS
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // STATES
    const token = useSelector(selectToken);
    const user = useSelector(state => state.user.user);
    // VARIABLES
    const pseudo = user.pseudo;

    // USEEFFECT
    useEffect(() => {
        dispatch(setActivePage("dashBoardPage"));
    }, [dispatch]);

    // METHODS

    // Check valid token
    const checkToken = () => {
        if (token) navigate("/namefamily");
    };


    return (
        <Container>
            <Box component="img" src={logo} alt="logo The family Goal" sx={{maxWidth:"50%", margin:"auto"}}/>
            
            <Stack spacing={1}>
                <Typography variant="h4" align="center">Merci pour votre inscription</Typography>

                <Card>
                    <CardContent>
                        <Typography variant="body1">
                            Bonjour les parents, il est temps de créer votre Famille et de choisir le nom que vous souhaitez lui
                            donner.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick={checkToken}>Créer ma famille</Button>
                    </CardActions>
                </Card>
                
                <Card>
                    <CardContent>
                        <Typography variant="body1">
                            Bonjour les enfants ! Il n&apos;y a plus qu&apos;a attendre l&apos;invitation à rejoindre votre
                            famille. Pour que vos parents puissent vous ajouter, vous aurez besoin de leur communiquer votre
                            pseudo:
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Typography variant="overline" sx={{margin:"auto"}}>{pseudo}</Typography>
                    </CardActions>
                </Card>
            </Stack>
            
        </Container>
    );
}

export default CreateFamilyPage;