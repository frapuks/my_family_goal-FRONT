import React from 'react';
import { Button } from "@mui/material";
import Carousel from 'react-material-ui-carousel';
import CardObjectif from "../Cards/CardObjectif";

import styles from "./Carousel.module.scss"

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';

const objectifData=
[
    {
        "id": 1,
        "title": "Faire une page en HTML",
        "description": null,
        "gain": 200,
        "isComplete": false,
        "family_id": 1
    },
    {
        "id": 2,
        "title": "faire un site en EJS",
        "description": "Et n surtout pas oublier les commentaires sinon on capte rien",
        "gain": 100,
        "isComplete": false,
        "family_id": 1
    },
    {
        "id": 3,
        "title": "Déployer",
        "description": "Sur le serveur de ton choix, mais comme j'aime bien Elon Musk on pourrait faire sur un serveur AWS",
        "gain": 500,
        "isComplete": false,
        "family_id": 1
    },
    {
        "id": 4,
        "title": "Faire une SPA en react",
        "description": "Faut que ca claque, on est pas là pour rigoler ok ?",
        "gain": 10,
        "isComplete": false,
        "family_id": 2
    },
    {
        "id": 5,
        "title": "Utiliser axios",
        "description": null,
        "gain": 50,
        "isComplete": false,
        "family_id": 2
    },
    {
        "id": 6,
        "title": "Déployer",
        "description": "Sur le serveur de ton choix, mais comme j'aime bien Elon Musk on pourrait faire sur un serveur AWS",
        "gain": 100,
        "isComplete": false,
        "family_id": 2
    },
    {
        "id": 7,
        "title": "Faire un MCD",
        "description": "Ne pas utiliser le terme ID, ca doit être lisible pour le client",
        "gain": 1000,
        "isComplete": false,
        "family_id": 3
    },
    {
        "id": 8,
        "title": "Faire un MLD",
        "description": "Si possible en anglais, que ça se rapproche au plus proche ds champs de la BDD",
        "gain": 500,
        "isComplete": false,
        "family_id": 3
    },
    {
        "id": 9,
        "title": "Déployer",
        "description": null,
        "gain": 2000,
        "isComplete": false,
        "family_id": 3
    }
]

function CarouselObjectif() {

    return (

        <>
            <h2 className={styles.title}> <RocketLaunchOutlinedIcon/>OBJECTIFS<Button><AddCircleOutlineIcon sx={{color: "green"}}/></Button></h2>
        
            <Carousel autoPlay={false}>
                {
                objectifData.map( (data) => <CardObjectif key={data.id} {...data}/> )
                }
            </Carousel>

        </>

    )
    
}


export default CarouselObjectif;