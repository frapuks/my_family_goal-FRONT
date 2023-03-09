import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Button, TextField, ButtonGroup } from "@mui/material";
import Carousel from "react-material-ui-carousel";

import Typography from "@mui/material/Typography";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

import styles from "./Card.module.scss";

import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { Colors } from "../../constants/Colors";
import { Btn } from "../Common/Button";
import { ValidateButton } from "../Common/ValidateButton";
import { useDispatch, useSelector } from "react-redux";
import SelectUserValidatingTask from "./SelectUserValidatingTask";

import { completeTask } from "../../store/slices/tasksSlice";
import { setCredit } from "../../store/slices/membersSlice";

function CardTask({ id, title, gain, description, isComplete }) {
    const [isEditing, setIsEditing] = React.useState(false);
    const [editedTitle, setEditedTitle] = React.useState(title);
    const [editedDescription, setEditedDescription] = React.useState(description);
    const [editedGain, setEditedGain] = React.useState(gain);
    const [addCard, setAddCard] = React.useState(false);
    //const [isComplete, setIsComplete] = React.useState(false);

    const token = useSelector(state => state.user.token);

    const dispatch = useDispatch();

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

    const card = (
        <div className={styles.containerCardTask}>
            <React.Fragment>
                <CardContent>
                    {isEditing ? (
                        <React.Fragment>
                            <TextField type="text" value={editedTitle} onChange={e => setEditedTitle(e.target.value)} />
                            <TextField
                                type="text"
                                value={editedDescription || ""}
                                onChange={e => setEditedDescription(e.target.value)}
                            />
                            <TextField type="text" value={editedGain} onChange={e => setEditedGain(e.target.value)} />
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
                        </React.Fragment>
                    )}
                </CardContent>
                <CardActions>
                    {isEditing ? (
                        <ButtonGroup onClick={handleSaveClick}>
                            <ValidateButton text="Enregistrer" />
                            <Btn text="Supprimer" color={Colors.Warning} />
                            <Btn text="Annuler" color={Colors.Info} />
                        </ButtonGroup>
                    ) : (
                        <div className={styles.buttons}>
                            {isComplete ? (
                                <TaskAltIcon></TaskAltIcon>
                            ) : (
                                <Button
                                    onClick={handleValidateClick}
                                    sx={{ bgcolor: "", color: "black", boxShadow: 5 }}
                                >
                                    Valider la tâche !
                                </Button>
                            )}
                            <Button onClick={handleEditClick}>
                                <BorderColorOutlinedIcon sx={{ color: "black" }} />
                            </Button>
                        </div>
                    )}
                </CardActions>
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
