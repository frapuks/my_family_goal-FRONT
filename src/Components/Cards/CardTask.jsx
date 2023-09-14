import React from "react";
import PropTypes from 'prop-types';
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// Material UI
import { Box, Button, Card, CardContent, CardActions, TextField, Typography, Stack, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { TaskAlt } from "@mui/icons-material";
// Slices
import { setTasks } from "../../Store/Slices/tasksSlice";
import { setCredit } from "../../Store/Slices/membersSlice";
import { completeTask } from "../../Store/Slices/tasksSlice";


function CardTask({ title, gain, description, isComplete, id }) {
    // UTILS
    const dispatch = useDispatch();
    // STATES
    const members = useSelector(state => state.members.listMembers);
    const family = useSelector(state => state.families.selectFamily);
    const token = useSelector(state => state.user.token);
    const [personId, setPersonId] = useState();
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedDescription, setEditedDescription] = useState(description);
    const [editedGain, setEditedGain] = useState(gain);
    const [openModale, setOpenModale] = useState(false);
    const [isError, setIsError] = useState(false);
    const [openListMembers, setOpenListMembers] = useState(false);
    // VARIABLES
    const isParent = family?.isParent;

    // METHODS

    // Open form
    const handleEditClick = () => {
        setIsEditing(true);
    };

    // Close form
    const handleCancel = () => {
        setIsEditing(false);
    };

    // Open Modale
    const handleDelete = () => {
        setOpenModale(true);
    };
    
    // Close modale
    const cancelDelete = () => {
         setOpenModale(false);
    };

    // Close form Edit
    const handleSubmit = event => {
        event.preventDefault();
        setIsEditing(false);
    };

    // Open form to attribute credit to member
    const handleValidateClick = () => {
        setOpenListMembers(true);
    };

    // Close form to attribute credit to member
    const handleCancelClick = () => {
        setOpenListMembers(false);
    };

    // Handle click confirm delete
    const confirmDelete = async event => {
        event.preventDefault();
        setIsError(false);

        // API => DELETE
        const isDelete = await fetch(import.meta.env.VITE_API_ROOT + `/task/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
        });

        // API => GET family
        const getFamily = await fetch(import.meta.env.VITE_API_ROOT + `/family/${family.id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
        });

        // treatment
        if (isDelete.ok && getFamily.ok) {
            // get data from responses
            const family = await getFamily.json();
            const tasks = family.tasks || [];

            // dispatch states
            dispatch(setTasks(tasks));

            // close modale & editing
            setOpenModale(false);
            setIsEditing(false);
        } else {
            setIsError(true);
        }
    };

    // Handle click validate task
    const onCompleteTask = async event => {
        event.preventDefault();
        setIsError(false);

        // API => PATCH
        const response = await fetch(import.meta.env.VITE_API_ROOT + `/task/${id}/user/${personId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
        });

        if (response.ok) {
            // get data from responses
            const responseJson = await response.json();

            // dispatch 
            dispatch(completeTask(id));
            dispatch(setCredit({ memberId: personId, newCredit: responseJson.credit }));

            // close form
            setOpenListMembers(!openListMembers);
        } else {
            setIsError(true);
        }
    };

    // Submit form to edit
    const validateEdit = async (event) => {
        event.preventDefault();
        setIsError(false);
    
        // API => PATCH
        const updateTask = await fetch(import.meta.env.VITE_API_ROOT + `/task/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
            body: JSON.stringify({
                "title" : editedTitle,
                "description" : editedDescription,
                "gain" : editedGain,
                "isComplete" : isComplete
            })
        });
    
        // API => GET family
        const getFamily = await fetch(import.meta.env.VITE_API_ROOT + `/family/${family.id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` }
        });
        
        // Treatment
        if (updateTask.ok && getFamily.ok) {
            // get data from responses
            const family = await getFamily.json();
            const tasks = family.tasks;

            // Dispatch states
            dispatch(setTasks(tasks));

            // close form
            setIsEditing(false);
        } else {
            setIsError(true);
        }
    };

    // CONTENT

    const cardContent = (
        <>
            <CardContent>
                <Typography variant="h5" textAlign="center">{title}</Typography>
                <Typography variant="caption">{description}</Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" onClick={handleValidateClick} disabled={isComplete || !isParent}>{isComplete ? <TaskAlt/> : `${gain} crédits`}</Button>
                {isParent && <Button onClick={handleEditClick}>Modifier</Button>}
            </CardActions>
        </>
    );

    const formEditContent = (
        <>
            <Box component="form" onSubmit={handleSubmit}>
                <CardContent>
                    <Stack spacing={1}>
                        <TextField size="small" label="Nom de l'objectif" name="title" defaultValue={title} required/>
                        <TextField size="small" label="Description" name="description" defaultValue={description} required/>
                        <TextField size="small" type="number" label="Gain" name="gain" defaultValue={gain} required/>
                    </Stack>
                </CardContent>
                <CardActions>
                    <Button type="submit" variant="contained">Valider</Button>
                    <Button variant="outlined" onClick={handleCancel}>Annuler</Button>
                    <Button variant="contained" color="error" onClick={handleDelete}>Supprimer</Button>
                </CardActions>
            </Box>
        </>
    );


    const formValidateContent = (
        <Box component="form"onSubmit={onCompleteTask}>
            <CardContent>
                <FormControl fullWidth>
                    <InputLabel id="label">Qui a rempli l'objectif ?</InputLabel>
                    <Select labelId="label">
                        {members.map(member => <MenuItem key={member.id} value={member.id}>{member.pseudo}</MenuItem>)}
                    </Select>
                </FormControl>
            </CardContent>
            <CardActions>
                <Button type="submit" variant="contained">Valider</Button>
                <Button variant="outlined" onClick={handleCancelClick}>Annuler</Button>
            </CardActions>
        </Box>
    );


    return (
        <>
            <Card variant="outlined">
                {openListMembers? formValidateContent : (
                    isEditing ? formEditContent : cardContent
                )}
            </Card>
        </>
    );
}

CardTask.propTypes = {
    title: PropTypes.string,
    gain: PropTypes.number,
    description: PropTypes.string,
    isComplete: PropTypes.bool,
    id: PropTypes.number,
};

export default CardTask;