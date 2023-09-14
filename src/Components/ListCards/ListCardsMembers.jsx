import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Material UI
import { Alert, Autocomplete, Box, Button, Card, CardActions, CardContent, Stack, TextField } from "@mui/material";
import { AddCircleOutline, ArrowCircleUp } from "@mui/icons-material";
// Components
import { CardMember } from "../index.jsx";
// slices
import { setFamilies } from "../../Store/Slices/familiesSlice";


function ListCardsMembers() {
  // UTILS
  const dispatch = useDispatch();
  // STATES
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const family = useSelector((state) => state.families.selectFamily || state.families.listFamilies[0]);
  const memberData = useSelector((state) => state.members.listMembers);
  const [addCard, setAddCard] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [isError, setIsError] = useState(false);
  const [resultSearch, setResultSearch] = useState([]);
  const [userIdSelected, setUserIdSelected] = useState(0);
  // VARIABLES
  const isParent = family.isParent;

  // METHODS

  // Handle click on button + to add card
  const handleClickBtnAddCard = () => {
    setAddCard(!addCard);
  };

  // onChange form
  const onChange = async (event) => {
    setIsError(false);
    const pseudo = event.target.value;
    setPseudo(pseudo);

    if (pseudo) {
      // API => POST research
      const responseSearchUsers = await fetch(import.meta.env.VITE_API_ROOT + `/search/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
        body: JSON.stringify({ pseudo }),
      }
      );
      const list = await responseSearchUsers.json();
      setResultSearch(list);
    }
  };

  // handle pseudo in list to complete input
  const handlePseudo = (event) => {
    // Get data
    const userId = event.currentTarget.dataset.userid;
    const selectPseudo = event.currentTarget.textContent;
    // Set states
    setUserIdSelected(userId);
    setPseudo(selectPseudo);
  };

  // on submit form
  const onSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const userSelected = resultSearch.find((user) => user.pseudo == form.get('pseudo'));
    setIsError(false);
    if (!userSelected) return setIsError(true);

    // API => POST
    const createLink = await fetch(import.meta.env.VITE_API_ROOT + `/family/${family.id}/user/${userSelected.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
    }
    );

    // API => GET
    const responseGetUser = await fetch(import.meta.env.VITE_API_ROOT + `/user/${user.id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
    }
    );

    // treatment
    if (responseGetUser.ok && createLink.ok) {
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
          <Autocomplete renderInput={(params) => <TextField {...params} label="Pseudo" name="pseudo" />} options={resultSearch.map((user) => user.pseudo)} onInputChange={onChange} />
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
      {memberData.map((data) => <CardMember key={data.id} {...data} />)}

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

export default ListCardsMembers;