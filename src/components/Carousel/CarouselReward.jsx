import React from "react";
import CardReward from "../Cards/CardReward";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Carousel.module.scss";
import Carousel from "react-material-ui-carousel";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { Alert } from "@mui/material";
import { Button } from "@mui/material";
import { ValidateButton } from "../Common/ValidateButton";
import { TextField } from "../Common/TextField";
import { Btn } from "../Common/Button";
import { Colors } from "../../constants/Colors";
import { setFamilies } from "../../store/slices/familiesSlice";

// Import des Icones Material UI
import MilitaryTechOutlinedIcon from "@mui/icons-material/MilitaryTechOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

function CarouselReward() {
  const dispatch = useDispatch();

  const user = useSelector(state => state.user.user);
  const token = useSelector(state => state.user.token);
  const family = useSelector(state => state.families.selectFamily || state.families.listFamilies[0]);
  const rewardData = useSelector((state) => state.rewards.listRewards);
  // define local state
  const [addCard, setAddCard] = useState(false);
  const [title, setTitle] = useState("Title");
  const [price, setPrice] = useState("0");
  const [isError, setIsError] = useState(false);
  
  // Handle click on button + to add card
  const handleClickBtnAddCard = () => {
    setAddCard(!addCard);
  };

  // on submit form
  const onSubmit = async (event) => {
    event.preventDefault();
    setIsError(false);
    const priceNumber = parseInt(price);

    // POST new reward
    const responsePostReward = await fetch(import.meta.env.VITE_API_ROOT + `/family/${family.id}/reward`, {
        method: "POST",
        headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
        body: JSON.stringify({title, price : priceNumber}),
    });

    const responseGetUser = await fetch(import.meta.env.VITE_API_ROOT + `/user/${user.id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` }
  });

      // treatment
      if (responsePostReward.ok && responseGetUser.ok) {
        
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
    const handleCancelForm = (event) => {
      event.preventDefault();
      setAddCard(false);
      setTitle("Title");
      setPrice("0");
    };

  return (
    <>
      <h2 className={styles.title}>
        <MilitaryTechOutlinedIcon />
        RECOMPENSES
        <Button onClick={handleClickBtnAddCard}>
          <AddCircleOutlineIcon sx={{ color: "green" }} />
        </Button>
      </h2>
      
      {addCard ? (
        <Box >
          <Card variant="outlined">
            <div >
              <form onSubmit={onSubmit} className={styles.form}>
                <TextField label="Title" value={title} onChange={setTitle} />
                <TextField label="Price" value={price} onChange={setPrice} />

                <div className={styles.formButton}>
                  <ValidateButton text="Valider" />
                  <Btn
                    text="Annuler"
                    color={Colors.Warning}
                    onClick={handleCancelForm}
                  />
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
      ) : (
        <Carousel  autoPlay={false}>
          {rewardData.map((data) => <CardReward key={data.id} {...data} />)}
        </Carousel>
      )}
    </>
  );
}

export default CarouselReward;
