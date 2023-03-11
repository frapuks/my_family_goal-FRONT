import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Material UI
import Carousel from "react-material-ui-carousel";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Alert, Button, Card } from "@mui/material";
import MilitaryTechOutlinedIcon from "@mui/icons-material/MilitaryTechOutlined";
// Components
import { Btn } from "../Common/Button";
import CardReward from "../Cards/CardReward";
import { Colors } from "../../constants/Colors";
import { TextField } from "../Common/TextField";
import { ValidateButton } from "../Common/ValidateButton";
// Slices
import { setFamilies } from "../../store/slices/familiesSlice";
// Styles
import styles from "./Carousel.module.scss";


function CarouselReward() {
  // UTILS
  const dispatch = useDispatch();
  // STATES
  const user = useSelector(state => state.user.user);
  const token = useSelector(state => state.user.token);
  const family = useSelector(state => state.families.selectFamily || state.families.listFamilies[0]);
  const rewardData = useSelector((state) => state.rewards.listRewards);
  const [addCard, setAddCard] = useState(false);
  const [title, setTitle] = useState("Title");
  const [price, setPrice] = useState("0");
  const [isError, setIsError] = useState(false);
  // VARIABLES
  const isParent = family.isParent;
  
  // METHODS

  // Handle click on button + to add card
  const handleClickBtnAddCard = () => {
    setAddCard(!addCard);
  };

  // on submit form
  const onSubmit = async (event) => {
    event.preventDefault();
    setIsError(false);
    const priceNumber = parseInt(price);

    // API => POST new reward
    const responsePostReward = await fetch(import.meta.env.VITE_API_ROOT + `/family/${family.id}/reward`, {
        method: "POST",
        headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
        body: JSON.stringify({title, price : priceNumber}),
    });

    // API => GET user
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

  // CONTENT
  const addCardFormContent = (
    <React.Fragment>
      <Card variant="outlined" sx={{bgcolor: "#dbc84e"}}>
        <div>
          <form onSubmit={onSubmit} className={styles.form}>
            <TextField label="" value={title} onChange={setTitle} />
            <TextField label="" value={price} onChange={setPrice} />

            <div className={styles.formButton}>
              <ValidateButton text="Valider" />
              <Btn text="Annuler" color={Colors.Warning} onClick={handleCancelForm}/>
            </div>

            {isError && <Alert severity="warning">Une erreur est survenue. Veuillez réessayer plus tard.</Alert>}
          </form>
        </div>
      </Card>
    </React.Fragment>
  );

  return (
    <>
      <h2 className={styles.title}>
        <MilitaryTechOutlinedIcon />
        RECOMPENSES
        {isParent && 
          <Button onClick={handleClickBtnAddCard}>
            <AddCircleOutlineIcon sx={{ color: "green" }} />
          </Button>
        }
      </h2>
      
      {addCard ? addCardFormContent : (
        <Carousel  autoPlay={false}>
          {rewardData.map((data) => <CardReward key={data.id} {...data} />)}
        </Carousel>
      )}
    </>
  );
}

export default CarouselReward;
