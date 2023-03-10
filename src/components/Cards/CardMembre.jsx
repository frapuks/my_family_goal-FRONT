import * as React from "react";
import { useSelector, useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { Button, TextField, ButtonGroup, Select, InputLabel, MenuItem, Alert} from "@mui/material";
import styles from "./Card.module.scss";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ButtonMui from "@mui/material/Button";
import { ValidateButton } from "../Common/ValidateButton";
import { Btn } from "../Common/Button";
import { Colors } from "../../constants/Colors";

import { selectToken } from "../../store/slices/userSlice";
import { setMembers } from "../../store/slices/membersSlice";

import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";

function CardMembre({ firstname, lastname, pseudo, isParent, credit, id }) {
  const dispatch = useDispatch();

  const family = useSelector(state => state.families.selectFamily);
  const isParentRole = family.isParent;
  const token = useSelector(selectToken); 

  const [isEditing, setIsEditing] = React.useState(false);
  const [openModale, setOpenModale] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [selectIsParent, setSelectIsParent] = React.useState(isParent);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    setOpenModale(true);
  };

  const confirmDelete = async (event) => {
    event.preventDefault();
    setIsError(false);

    // DELETE
    const isDelete = await fetch(import.meta.env.VITE_API_ROOT + `/family/${family.id}/user/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
    });

    // Get family
    const getFamily = await fetch(import.meta.env.VITE_API_ROOT + `/family/${family.id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` }
    });

    // treatment
    if (isDelete.ok && getFamily.ok) {
      // get data from responses
      const family = await getFamily.json();
      const members = family.members || [];
      console.log(members);

      // dispatch states
      dispatch(setMembers(members));

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

  const handleChangeRole = (event) => {
    setSelectIsParent(event.target.value);
  };
  
  const handleSubmitChangeRole = async (event) => {
    event.preventDefault();
    setIsError(false);

    // UPDATE
    const updateMember = await fetch(import.meta.env.VITE_API_ROOT + `/family/${family.id}/user/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
      body: JSON.stringify({
        "isParent" : selectIsParent
      })
    });

    // Get family
    const getFamily = await fetch(import.meta.env.VITE_API_ROOT + `/family/${family.id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` }
    });
    
    // treatment
    if (updateMember.ok && getFamily.ok) {
      
      // get data from responses
      const family = await getFamily.json();
      const members = family.members;

      // dispatch states
      dispatch(setMembers(members));

      // close form
      setIsEditing(false);
    } else {
        setIsError(true);
    }
  };
  
  const card = (
    <div className={styles.containerCardMembre}>
      <React.Fragment>
        <CardContent>
          {isEditing ? (
            <React.Fragment>
              <form action="" onSubmit={handleSubmitChangeRole}>
                <InputLabel id="role">Role</InputLabel>
                <Select
                  labelId="role"
                  id="isParent"
                  value={selectIsParent}
                  label="isParent"
                  onChange={handleChangeRole}
                >
                  <MenuItem value={true}>Parent</MenuItem>
                  <MenuItem value={false}>Enfant</MenuItem>
                </Select>
                <ButtonGroup>
                  <ValidateButton text= "Enregistrer"/>
                  <Btn  text="Supprimer" color={Colors.Warning} onClick={handleDelete}/>
                  <Btn text="Annuler" color={Colors.Info} onClick={handleCancel}/>
                </ButtonGroup>
                <Dialog open={openModale} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                  <DialogTitle id="alert-dialog-title">{"ATTENTION"}</DialogTitle>
                  <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                          Etes-vous sure de vouloir supprimer ce membre?
                      </DialogContentText>
                      <DialogActions>
                          <ButtonMui onClick={cancelDelete}>Annuler</ButtonMui>
                      </DialogActions>
                          <ButtonMui onClick={confirmDelete} color={Colors.Error} autoFocus>Supprimer</ButtonMui>
                  </DialogContent>
                </Dialog>
                {isError && <Alert severity="warning">Une erreur est survenue. Veuillez réessayer plus tard.</Alert>}
              </form>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {firstname} {lastname}
    
              </Typography>
              <Typography variant="h5" component="div">
                {pseudo}
              </Typography>
    
              {isParent ? (
                <Typography variant="body2" sx={{color: "white"}}>Parent</Typography>
                ) : (
                  <>
                    <Typography variant="body2" sx={{color: "black"}}>Enfant</Typography>
                    <Typography variant="body2" sx={{color: "red"}}>{credit}</Typography>
                  </>
              )}
              <CardActions>
                <div className={styles.buttons}>
                  {isParentRole && 
                  <Button onClick={handleEditClick}>
                    <BorderColorOutlinedIcon sx={{ color: "black" }}/>
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
    <Box>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}

export default CardMembre;
