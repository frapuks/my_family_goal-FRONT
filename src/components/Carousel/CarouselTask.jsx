import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Material UI
import Carousel from "react-material-ui-carousel";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import { Alert, Button, Card, Box} from "@mui/material";
// Components
import { Btn } from "../Common/Button";
import CardTask from "../Cards/CardTask";
import { Colors } from "../../constants/Colors";
import { TextField } from "../Common/TextField";
import { ValidateButton } from "../Common/ValidateButton";
// Slices
import { setFamilies } from "../../store/slices/familiesSlice";
// Style
import styles from "./Carousel.module.scss";


function CarouselTask() {
    // UTILS
    const dispatch = useDispatch();
    // STATES
    const user = useSelector(state => state.user.user);
    const token = useSelector(state => state.user.token);
    const family = useSelector(state => state.families.selectFamily || state.families.listFamilies[0]);
    const taskData = useSelector(state => state.tasks.listTasks);
    const [addCard, setAddCard] = useState(false);
    const [title, setTitle] = useState("Title");
    const [description, setDescription] = useState("");
    const [gain, setGain] = useState("0");
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
        const gainNumber = parseInt(gain);

        // API => POST new reward
        const responsePostTask = await fetch(import.meta.env.VITE_API_ROOT + `/family/${family.id}/task`, {
            method: "POST",
            headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
            body: JSON.stringify({ title, description, gain: gainNumber }),
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
        <Box>
            <Card variant="outlined" sx={{bgcolor: "#00b3ff"}}>
                <div className={styles.containerCardTask}>
                    <form onSubmit={onSubmit} className={styles.form}>
                        <TextField label="" value={title} onChange={setTitle} />
                        <TextField label="" value={description} onChange={setDescription} />
                        <TextField label="" value={gain} onChange={setGain} />

                        <div className={styles.formButton}>
                            <ValidateButton text="Valider" />
                            <Btn text="Annuler" color={Colors.Warning} onClick={handleCancelForm} />
                        </div>

                        {isError && (
                            <Alert severity="warning">
                                Une erreur est survenue. Veuillez réessayer plus tard.
                            </Alert>
                        )}
                    </form>
                </div>
            </Card>
        </Box>
    );

    return (
        <>
            <h2 className={styles.title}>
                <RocketLaunchOutlinedIcon />
                OBJECTIFS
                {isParent &&
                <Button onClick={handleClickBtnAddCard}>
                    <AddCircleOutlineIcon sx={{ color: "green" }} />
                </Button>
                }
            </h2>

            {addCard ? addCardFormContent : (
                <Carousel sx={{ minWidth: "30%", maxHeight: "30%" }} autoPlay={false}>
                    {taskData.map(data => (
                        <CardTask key={data.id} {...data} />
                    ))}
                </Carousel>
            )}
        </>
    );
}

export default CarouselTask;