import React from "react";
import PropTypes from 'prop-types';
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// Material UI
import ButtonMui from "@mui/material/Button";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { Alert,Box,Button,ButtonGroup,Card,CardContent,CardActions,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,TextField,Typography } from "@mui/material";
// Components
import { Btn } from "../Common/Button";
import { Colors } from "../../constants/Colors";
import { ValidateButton } from "../Common/ValidateButton";
import SelectUserValidatingTask from "./SelectUserValidatingTask";
// Slices
import { setTasks } from "../../store/slices/tasksSlice";
import { setCredit } from "../../store/slices/membersSlice";
import { completeTask } from "../../store/slices/tasksSlice";
// Styles
import styles from "./Card.module.scss";


function CardTask({ title, gain, description, isComplete, id }) {
    // UTILS
    const dispatch = useDispatch();
    // STATES
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
        <React.Fragment>
            <Typography variant="h5" component="div">
                {title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {description}
            </Typography>
            <Button sx={{ color: "green", fontSize: 20, border: 3, borderRadius: 7 }}>
                <MonetizationOnOutlinedIcon />
                {gain}
            </Button>
            <CardActions>
                <div className={styles.buttons}>
                    {isComplete && <TaskAltIcon></TaskAltIcon>}
                    {!isComplete && isParent &&
                        <Button
                            onClick={handleValidateClick}
                            sx={{ bgcolor: "", color: "black", boxShadow: 5 }}
                        >
                            Valider la tâche !
                        </Button>
                    }
                    {isParent && 
                        <Button onClick={handleEditClick}>
                            <BorderColorOutlinedIcon sx={{ color: "black" }} />
                        </Button>
                    }
                </div>
            </CardActions>
        </React.Fragment>
    );
    
    const modaleContent = (
        <>
        <DialogTitle id="alert-dialog-title">{"ATTENTION"}</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Etes-vous sur de vouloir supprimer cet objectif?
            </DialogContentText>
            <DialogActions>
                <ButtonMui onClick={cancelDelete}>Annuler</ButtonMui>
            </DialogActions>
            <ButtonMui onClick={confirmDelete} color={Colors.Error} autoFocus>
                Supprimer
            </ButtonMui>
        </DialogContent>
        </>
    );

    const formEditContent = (
        <React.Fragment>
            <form action="" onSubmit={handleSubmit}>
                <TextField
                    label=""
                    type="text"
                    value={editedTitle}
                    onChange={e => setEditedTitle(e.target.value)}
                />
                <TextField
                    label=""
                    type="text"
                    value={editedDescription || ""}
                    onChange={e => setEditedDescription(e.target.value)}
                />
                <TextField
                    label=""
                    type="text"
                    value={editedGain}
                    onChange={e => setEditedGain(e.target.value)}
                />
                <CardActions>
                    <ButtonGroup>
                        <ValidateButton onClick={validateEdit} text="Enregistrer" />
                        <Btn text="Annuler" color={Colors.Info} onClick={handleCancel} />
                        <Btn text="Supprimer" color={Colors.Error} onClick={handleDelete} />
                    </ButtonGroup>
                </CardActions>
                <Dialog open={openModale} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" >
                    {modaleContent}
                </Dialog>
                {isError && ( <Alert severity="warning"> Une erreur est survenue. Veuillez réessayer plus tard. </Alert> )}
            </form>
        </React.Fragment>
    );


    const formValidateContent = (
        <form onSubmit={onCompleteTask}>
            <SelectUserValidatingTask personId={personId} setPersonId={setPersonId} />
            <div>
                <ValidateButton />
                <Btn text="Annuler" onClick={handleCancelClick} color={Colors.Warning} />
            </div>
        </form>
    );


    return (
        <>
            <Box sx={{ minWidth: "30%", maxHeight: "30%" }}>
                <Card variant="outlined" sx={{ borderRadius: 2 }}>
                    <div className={styles.containerCardTask}>
                        <React.Fragment>
                            <CardContent>
                                {openListMembers? formValidateContent : (
                                    isEditing ? formEditContent : cardContent
                                )}
                            </CardContent>
                        </React.Fragment>
                    </div>
                </Card>
            </Box>
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