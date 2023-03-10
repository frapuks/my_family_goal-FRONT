import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { Button, TextField, ButtonGroup, Alert } from "@mui/material";

import Typography from "@mui/material/Typography";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

import styles from "./Card.module.scss";

import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { Colors } from "../../constants/Colors";
import { Btn } from "../Common/Button";
import { ValidateButton } from "../Common/ValidateButton";
import SelectUserValidatingTask from "./SelectUserValidatingTask";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ButtonMui from "@mui/material/Button";
import { setTasks } from "../../store/slices/tasksSlice";

import { completeTask } from "../../store/slices/tasksSlice";
import { setCredit } from "../../store/slices/membersSlice";

function CardTask({ title, gain, description, isComplete, id }) {
    const family = useSelector(state => state.families.selectFamily);
    const isParent = family.isParent;

    const [isEditing, setIsEditing] = React.useState(false);
    const [editedTitle, setEditedTitle] = React.useState(title);
    const [editedDescription, setEditedDescription] = React.useState(description);
    const [editedGain, setEditedGain] = React.useState(gain);
    const [openModale, setOpenModale] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [addCard, setAddCard] = React.useState(false);

    const token = useSelector(state => state.user.token);

    const dispatch = useDispatch();

    const handleSubmit = event => {
        event.preventDefault();
        setIsEditing(false);
    };

    // Open Modal
    const handleDelete = () => {
        setOpenModale(true);
    };

    const confirmDelete = async event => {
        event.preventDefault();
        setIsError(false);

        // DELETE
        const isDelete = await fetch(import.meta.env.VITE_API_ROOT + `/task/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
        });

        // Get family
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

    const cancelDelete = () => {
        setOpenModale(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    // const [personName, setPersonName] = React.useState();
    const [personId, setPersonId] = React.useState();

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
    };

    const handleValidateClick = () => {
        console.log("id de ma tache", id);
        setAddCard(!addCard);
    };

    const handleCancelClick = () => {
        setAddCard(!addCard);
    };

    const onCompleteTask = async e => {
        e.preventDefault();

        const response = await fetch(import.meta.env.VITE_API_ROOT + `/task/${id}/user/${personId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
        });

        if (response.ok) {
            const responseJson = await response.json();
            dispatch(completeTask(id));
            dispatch(setCredit({ memberId: personId, newCredit: responseJson.credit }));

            setAddCard(!addCard);
            //setIsComplete(true);
        }
    };

    const validateEdit = async (event) => {
        event.preventDefault();
        setIsError(false);
    
        // UPDATE
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
    
        // Get family
        const getFamily = await fetch(import.meta.env.VITE_API_ROOT + `/family/${family.id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` }
        });
        
        // treatment
        if (updateTask.ok && getFamily.ok) {
          
          // get data from responses
          const family = await getFamily.json();
          const tasks = family.tasks;
    
          // dispatch states
          dispatch(setTasks(tasks));
    
          // close form
          setIsEditing(false);
        } else {
            setIsError(true);
        }
      }

    const card = (
        <div className={styles.containerCardTask}>
            <React.Fragment>
                <CardContent>
                    {isEditing ? (
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
                                <ButtonGroup>
                                    <ValidateButton onClick={validateEdit} text="Enregistrer" />
                                    <Btn text="Supprimer" color={Colors.Warning} onClick={handleDelete} />
                                    <Btn text="Annuler" color={Colors.Info} onClick={handleCancel} />
                                </ButtonGroup>
                                <Dialog
                                    open={openModale}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">{"ATTENTION"}</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Etes-vous sure de vouloir supprimer cet objectif?
                                        </DialogContentText>
                                        <DialogActions>
                                            <ButtonMui onClick={cancelDelete}>Annuler</ButtonMui>
                                        </DialogActions>
                                        <ButtonMui onClick={confirmDelete} color={Colors.Error} autoFocus>
                                            Supprimer
                                        </ButtonMui>
                                    </DialogContent>
                                </Dialog>
                                {isError && (
                                    <Alert severity="warning">
                                        Une erreur est survenue. Veuillez réessayer plus tard.
                                    </Alert>
                                )}
                            </form>
                        </React.Fragment>
                    ) : (
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
                    )}
                </CardContent>
            </React.Fragment>
        </div>
    );

    return (
        <>
            {addCard ? (
                <Box>
                    <Card variant="outlined">
                        <div>
                            <form onSubmit={onCompleteTask}>
                                <SelectUserValidatingTask personId={personId} setPersonId={setPersonId} />

                                <div>
                                    <ValidateButton />
                                    <Btn text="Annuler" onClick={handleCancelClick} color={Colors.Warning} />
                                </div>
                            </form>
                        </div>
                    </Card>
                </Box>
            ) : (
                <Box sx={{ minWidth: "30%", maxHeight: "30%" }}>
                    <Card variant="outlined">{card}</Card>
                </Box>
            )}
        </>
    );
}

export default CardTask;
