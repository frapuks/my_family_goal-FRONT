import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Material UI
import { Alert, Box, Button, Card, CardActions, CardContent, TextField, Stack } from "@mui/material";
// Components
import { CardReward } from "../Cards/CardReward";
// Slices
import { setFamilies } from "../../Store/Slices/familiesSlice";
import { AddCircleOutline, ArrowCircleUp } from "@mui/icons-material";


function ListCardsRewards() {
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
    const form = new FormData(event.currentTarget);
    const title = form.get('title');
    const price = form.get('price');

    // API => POST new reward
    const responsePostReward = await fetch(import.meta.env.VITE_API_ROOT + `/family/${family.id}/reward`, {
      method: "POST",
      headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
      body: JSON.stringify({ title, price }),
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
  const handleCancelForm = () => {
    setAddCard(false);
  };

  // CONTENT
  const addCardFormContent = (
    <Card variant="outlined">
      <Box component="form" onSubmit={onSubmit}>
        <CardContent>
          <Stack spacing={1}>
            <TextField label="Nom de la récompense" name="title" required />
            <TextField type="number" label="Prix" name="price" required />
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
    <Stack spacing={1}>
      {rewardData.map((data) => <CardReward key={data.id} {...data} />)}

      {addCard && addCardFormContent}

      {isParent &&
        <Button onClick={handleClickBtnAddCard}>
          {addCard
            ? <ArrowCircleUp color="success" sx={{ mr: 1 }} />
            : <AddCircleOutline color="success" sx={{ mr: 1 }} />
          }
        </Button>
      }
    </Stack>
  );
}

export default ListCardsRewards;
