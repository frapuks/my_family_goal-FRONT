import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Material UI
import Carousel from "react-material-ui-carousel";
import { Alert, Button, Card, Box, Typography, CardContent, CardActions, TextField, Stack} from "@mui/material";
// Components
import { CardTask } from "../";
// Slices
import { setFamilies } from "../../store/slices/familiesSlice";
import { AddCircleOutline, RocketLaunchOutlined } from "@mui/icons-material";


function CarouselTask() {
    // UTILS
    const dispatch = useDispatch();
    // STATES
    const user = useSelector(state => state.user.user);
    const token = useSelector(state => state.user.token);
    const family = useSelector(state => state.families.selectFamily || state.families.listFamilies[0]);
    const taskData = useSelector(state => state.tasks.listTasks);
    const [addCard, setAddCard] = useState(false);
    const [isError, setIsError] = useState(false);
    // VARIABLES
    const isParent = family.isParent;

    // METHODS

    // Handle click on button + to add card
    const handleClickBtnAddCard = () => {
        setAddCard(!addCard);
    };

    // on submit task validation form
    const onSubmit = async event => {
        event.preventDefault();
        setIsError(false);
        const form = new FormData(event.currentTarget);
        const title = form.get('title');
        const description = form.get('description');
        const gain = form.get('gain');
        // const gainNumber = parseInt(gain);

        // API => POST new reward
        const responsePostTask = await fetch(import.meta.env.VITE_API_ROOT + `/family/${family.id}/task`, {
            method: "POST",
            headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
            body: JSON.stringify({ title, description, gain }),
        });

        // API => GET
        const responseGetUser = await fetch(import.meta.env.VITE_API_ROOT + `/user/${user.id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
        });

        // treatment
        if (responsePostTask.ok && responseGetUser.ok) {
            // get data from responses
            const { families } = await responseGetUser.json();

            // dispatch states
            dispatch(setFamilies(families));

            // Close form
            setAddCard(false);
        } else {
            setIsError(true);
        }
    };

    // on cancel form
    const handleCancelForm = event => {
        event.preventDefault();
        setAddCard(false);
        setTitle("Title");
        setDescription("Description");
        setGain("0");
    };

    // CONTENT
    const addCardFormContent = (
        <Card variant="outlined">
            <Box component="form" onSubmit={onSubmit}>
                <CardContent>
                    <Stack spacing={1}>
                        <TextField label="Nom de l'objectif" name="title" required/>
                        <TextField label="Description" name="description" required/>
                        <TextField type="number" label="Gain" name="gain" required/>
                    </Stack>
                    {isError && <Alert severity="warning">Une erreur est survenue. Veuillez réessayer plus tard.</Alert>}
                </CardContent>
                <CardActions>
                    <Button type="submit" variant="contained">Valider</Button>
                    <Button variant="outlined" onClick={handleCancelForm}>Annuler</Button>
                </CardActions>
            </Box>
        </Card>
    );

    return (
        <>
            <Typography variant="h4">
                <RocketLaunchOutlined sx={{mr:1}}/>
                OBJECTIFS
                {isParent && <Button onClick={handleClickBtnAddCard}><AddCircleOutline color="success"/></Button>}
            </Typography>

            {addCard ? addCardFormContent : (
                <Carousel autoPlay={false} height="35vh">
                    {taskData.map((data) => <CardTask key={data.id} {...data} />)}
                </Carousel>
            )}
        </>
    );
}

export default CarouselTask;