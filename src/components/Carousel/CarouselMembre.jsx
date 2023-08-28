import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Material UI
import Carousel from "react-material-ui-carousel";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Diversity1OutlinedIcon from "@mui/icons-material/Diversity1Outlined";
import { Alert, Autocomplete, Box, Button, Card, CardActions, CardContent, MenuItem, Select, TextField, Typography } from "@mui/material";
// Components
import { Btn } from "../Common/Button";
import CardMembre from "../Cards/CardMembre";
import { Colors } from "../../constants/Colors";
import { ValidateButton } from "../Common/ValidateButton";
// slices
import { setFamilies } from "../../store/slices/familiesSlice";
import { AddCircleOutline, AddCircleOutlined, Diversity1Outlined } from "@mui/icons-material";


function CarouselMember() {
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
  // RESET STATES
  const resetLocalStates = () => {
    setAddCard(false);
    setPseudo("");
    setIsError(false);
    setResultSearch([]);
    setUserIdSelected(0);
  };
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
          headers: {"Content-Type": "application/json", authorization: `Bearer ${token}`},
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
        headers: {"Content-Type": "application/json", authorization: `Bearer ${token}`},
      }
    );

    // API => GET
    const responseGetUser = await fetch(import.meta.env.VITE_API_ROOT + `/user/${user.id}`, {
        method: "GET",
        headers: {"Content-Type": "application/json", authorization: `Bearer ${token}`},
      }
    );

    // treatment
    if (responseGetUser.ok && createLink.ok) {
      // get data from responses
      const { families } = await responseGetUser.json();

      // dispatch states
      dispatch(setFamilies(families));

      // Close form
      resetLocalStates();
    } else {
      setIsError(true);
    }
  };

  // on cancel form
  const handleCancelForm = (event) => {
    event.preventDefault();
    resetLocalStates();
  };

  // CONTENT
  const addCardFormContent = (
      <Card variant="outlined">
        <Box component="form" onSubmit={onSubmit}>
          <CardContent>
            <Autocomplete renderInput={(params) => <TextField {...params} label="Pseudo" name="pseudo"/>} options={resultSearch.map((user) => user.pseudo)} onInputChange={onChange}/>
            {/* <TextField select fullWidth label="Pseudo" defaultValue={pseudo} onChange={onChange}>
              {resultSearch.length > 0 && resultSearch.map((user) => (
                <MenuItem key={user.id} onClick={handlePseudo} data-userid={user.id}>{user.pseudo}</MenuItem>
              ))}
            </TextField> */}
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
        <Diversity1Outlined sx={{mr:1}}/>
        MEMBRES
        {isParent && <Button onClick={handleClickBtnAddCard}><AddCircleOutline color="success" /></Button>}
      </Typography>

      {addCard ? addCardFormContent : (
        <Carousel  autoPlay={false}>
          {memberData.map((data) => <CardMembre key={data.id} {...data} />)}
        </Carousel>
      )}
    </>
  );
}

export default CarouselMember;