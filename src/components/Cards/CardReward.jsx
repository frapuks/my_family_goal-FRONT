import React from "react";
import PropTypes from 'prop-types';
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// Material UI
import ButtonMui from "@mui/material/Button";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import { Alert,Box ,Button, ButtonGroup, Card,CardContent ,CardActions ,Dialog,DialogActions ,DialogContent ,DialogContentText  ,DialogTitle , TextField,Typography, Stack } from "@mui/material";
// Components
import { Btn } from "../Common/Button";
import { Colors } from "../../constants/Colors";
import { ValidateButton } from "../Common/ValidateButton";
// Slices
import { setRewards } from "../../store/slices/rewardsSlice";
import { setMembers } from "../../store/slices/membersSlice";
import { selectToken } from "../../store/slices/userSlice";
// Styles
import styles from "./Card.module.scss"
import { TaskAlt } from "@mui/icons-material";


function CardReward({ title, price, isPurchase, id }) {
  // UTILS
  const dispatch = useDispatch();
  // STATES
  const family = useSelector(state => state.families.selectFamily);
  const user = useSelector((state) => state.user.user);
  const token = useSelector(selectToken);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedPrice, setEditedPrice] = useState(price);
  const [openDeleteModale, setOpenDeleteModale] = useState(false);
  const [openBuyModale, setOpenBuyModale] = useState(false);
  const [isError, setIsError] = useState(false);
  // VARIABLES
  const isParent = family?.isParent;

  // METHODS

  // Open form Edit
  const handleEditClick = () => {
    setIsEditing(true);
  };
  
  // Close form Edit
  const handleCancel = () => {
    setIsEditing(false);
  };

  // Open modale
  const handleDelete = () => {
    setOpenDeleteModale(true);
  };

  // Close modale
  const cancelDelete = () => {
    setOpenDeleteModale(false);
  };
  
  // Open modale to confirm to buy
  const buyReward = (event) => {
    event.preventDefault();
    setOpenBuyModale(true);
  };

  // Close Modale Buy
  const cancelBuy = () => {
    setOpenBuyModale(false);
  };

  // Handle click confirm delete
  const confirmDelete = async (event) => {
    event.preventDefault();
    setIsError(false);

    // API => DELETE
    const isDelete = await fetch(import.meta.env.VITE_API_ROOT + `/reward/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
    });

    // API => GET family
    const getFamily = await fetch(import.meta.env.VITE_API_ROOT + `/family/${family.id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` }
    });

    // treatment
    if (isDelete.ok && getFamily.ok) {
      // get data from responses
      const family = await getFamily.json();
      const rewards = family.rewards || [];

      // dispatch states
      dispatch(setRewards(rewards));

      // close modale & editing
      setOpenDeleteModale(false);
      setIsEditing(false);      
    } else {
        setIsError(true);
    }
  };
  
  // Confirm buy
  const confirmBuy = async (event) => {
    event.preventDefault();
    setIsError(false);

    // BUY
    const isBuy = await fetch(import.meta.env.VITE_API_ROOT + `/reward/${id}/user/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
    });

    // API => GET family
    const getFamily = await fetch(import.meta.env.VITE_API_ROOT + `/family/${family.id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` }
    });
    
    // treatment
    if (isBuy.ok && getFamily.ok) {
      // get data from responses
      const family = await getFamily.json();
      const rewards = family.rewards;
      const members = family.members;

      // dispatch states
      dispatch(setRewards(rewards));
      dispatch(setMembers(members));

      // close modale
      setOpenBuyModale(false);
    } else {
        setIsError(true);
    }
  };

  // Submit form to edit
  const validateEdit = async (event) => {
    event.preventDefault();
    setIsError(false);

    // API => UPDATE
    const updateReward = await fetch(import.meta.env.VITE_API_ROOT + `/reward/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
      body: JSON.stringify({
        "title" : editedTitle,
        "price" : editedPrice,
        "isPurchase" : isPurchase
      })
    });

    // API => GET family
    const getFamily = await fetch(import.meta.env.VITE_API_ROOT + `/family/${family.id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` }
    });
    
    // treatment
    if (updateReward.ok && getFamily.ok) {
      // get data from responses
      const family = await getFamily.json();
      const rewards = family.rewards;

      // dispatch states
      dispatch(setRewards(rewards));

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
      </CardContent>
      <CardActions>
        <Button variant="contained" onClick={buyReward} disabled={isPurchase || isParent}>{isPurchase ? <TaskAlt/> : `${price} crédits`}</Button>
        {isParent && <Button onClick={handleEditClick}>Modifier</Button>}
      </CardActions>
    </>
  );

  const formEditContent = (
    <>
      <Box component="form" onSubmit={validateEdit}>
        <CardContent>
          <Stack spacing={1}>
            <TextField size="small" label="Nom de l'objectif" name="title" defaultValue={title} required/>
            <TextField size="small" type="number" label="Prix" name="price" defaultValue={price} required/>
          </Stack>
          {isError && <Alert severity="warning">Une erreur est survenue. Veuillez réessayer plus tard.</Alert>}
        </CardContent>
        <CardActions>
          <Button type="submit" variant="contained">Valider</Button>
          <Button variant="outlined" onClick={handleCancel}>Annuler</Button>
          <Button variant="contained" color="error" onClick={handleDelete}>Supprimer</Button>
        </CardActions>
      </Box>
    </>
  );

  return (
    <>
      <Card variant="outlined">
        {isEditing ? formEditContent : cardContent}
      </Card>

      <Dialog open={openBuyModale}>
        <DialogTitle>ACHAT</DialogTitle>
        <DialogContent>
          <DialogContentText> Etes-vous sur de vouloir acheter cette récompense?</DialogContentText>
          <DialogActions>
            <Button variant="outlined" onClick={cancelBuy}>Annuler</Button>
            <Button variant="contained" onClick={confirmBuy}>Supprimer</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      <Dialog open={openDeleteModale}>
        <DialogTitle>ATTENTION</DialogTitle>
        <DialogContent>
          <DialogContentText> Etes-vous sur de vouloir supprimer cette récompense?</DialogContentText>
          <DialogActions>
            <Button variant="outlined" onClick={cancelDelete}>Annuler</Button>
            <Button variant="contained" onClick={confirmDelete} color="error">Supprimer</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}

CardReward.propTypes = {
  title: PropTypes.string,
  price: PropTypes.number,
  isPurchase: PropTypes.bool,
  id: PropTypes.number,
};

export default CardReward;