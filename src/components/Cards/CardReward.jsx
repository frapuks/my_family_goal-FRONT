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
import { Alert,Box ,Button, ButtonGroup, Card,CardContent ,CardActions ,Dialog,DialogActions ,DialogContent ,DialogContentText  ,DialogTitle , TextField,Typography } from "@mui/material";
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
  const [openModale, setOpenModale] = useState(false);
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
    setOpenModale(true);
  };

  // Close modale
  const cancelDelete = () => {
    setOpenModale(false);
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
      setOpenModale(false);
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

  const modaleContent = (
    <>
    <DialogTitle id="alert-dialog-title">{"ATTENTION"}</DialogTitle>
    <DialogContent>
        <DialogContentText id="alert-dialog-description">
            Etes-vous sur de vouloir supprimer cette récompense?
        </DialogContentText>
        <DialogActions>
            <ButtonMui onClick={cancelDelete}>Annuler</ButtonMui>
        </DialogActions>
            <ButtonMui onClick={confirmDelete} color={Colors.Error} autoFocus>Supprimer</ButtonMui>
    </DialogContent>
    </>
  );

  const modalBuyContent = (
    <>
    <DialogTitle id="alert-dialog-title">{"ATTENTION"}</DialogTitle>
    <DialogContent>
        <DialogContentText id="alert-dialog-description">
            Etes-vous sur de vouloir acheter cette récompense?
        </DialogContentText>
        <DialogActions>
            <ButtonMui onClick={cancelBuy}>Annuler</ButtonMui>
        </DialogActions>
            <ButtonMui onClick={confirmBuy} color={Colors.Secondary} autoFocus>Valider</ButtonMui>
    </DialogContent>
    </>
  );

  const cardContent = (
    <React.Fragment>
      <Typography variant="h5" component="div">
        {title}
      </Typography>

      <Button sx={{color: "red", fontSize:20, border:3, borderRadius:7,}}>
        <MonetizationOnOutlinedIcon />
        {price}
      </Button>

      <CardActions>
        <div className={styles.buttons}>
          {isPurchase && <TaskAltIcon></TaskAltIcon> }
          {!isPurchase && !isParent &&
            <Button onClick={buyReward} sx={{bgcolor: "gold", color: "black", boxShadow: 5,}}><PaymentOutlinedIcon/>DEPENSER !</Button>
          }
          {isParent && 
            <Button onClick={handleEditClick}>
              <BorderColorOutlinedIcon sx={{color:"black"}}/>
            </Button>
          }
          <Dialog open={openBuyModale} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
              {modalBuyContent}
          </Dialog>
        </div>
      </CardActions>
    </React.Fragment>
  );

  const formEditContent = (
    <React.Fragment>
      <form action="" >
        <TextField
          label=""
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
        />
        <TextField
          label=""
          type="text"
          value={editedPrice}
          onChange={(e) => setEditedPrice(e.target.value)}
        />
        <CardActions>
          <ButtonGroup>
            <ValidateButton onClick={validateEdit} text= "Enregistrer"/>
            <Btn text="Annuler" color={Colors.Info} onClick={handleCancel}/>
            <Btn  text="Supprimer" color={Colors.Error} onClick={handleDelete}/>
          </ButtonGroup>
        </CardActions>
        <Dialog open={openModale} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            {modaleContent}
        </Dialog>
        {isError && <Alert severity="warning">Une erreur est survenue. Veuillez réessayer plus tard.</Alert>}
      </form>
    </React.Fragment>
  );

  return (
    <Box sx={({ minWidth: "30%" , maxHeight: "30%"})}>
      <Card variant="outlined" sx={{ borderRadius: 2 }}>
        <div className={styles.containerCardReward}>
          <React.Fragment>
            <CardContent>
              {isEditing ? formEditContent : cardContent}
            </CardContent>
          </React.Fragment>
        </div>
      </Card>
    </Box>
  );
}

CardReward.propTypes = {
  title: PropTypes.string,
  price: PropTypes.number,
  isPurchase: PropTypes.bool,
  id: PropTypes.number,
};

export default CardReward;