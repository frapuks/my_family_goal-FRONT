import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// Components
import logo from "../assets/logo-fond-transparent-sans-police.svg";
import { Colors } from "../constants/Colors";
import { ValidateButton } from "../components/Common/ValidateButton";
// Slices
import { selectToken } from "../store/slices/userSlice";
import { setActivePage } from "../store/slices/navBarSlice";
// Styles
import styles from "./CreateFamilyPage.module.scss";


function CreateFamily() {
    // UTILS
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // STATES
    const token = useSelector(selectToken);
    const user = useSelector(state => state.user.user);
    // VARIABLES
    const pseudo = user.pseudo;

    // USEEFFECT
    useEffect(() => {
        dispatch(setActivePage("dashBoardPage"));
    }, [dispatch]);

    // METHODS

    // Check valid token
    const checkToken = () => {
        if (token) navigate("/namefamily");
    };


    return (
        <div className={styles.containerCreateFamily}>
            <img className={styles.logo} src={logo} />
            <h1 className={styles.h1}>Merci pour votre inscription</h1>
            <section className={styles.textWelcomeParents}>
                <p>
                    Bonjour les parents, il est temps de créer votre Famille et de choisir le nom que vous souhaitez lui
                    donner.
                </p>
                <ValidateButton text="Creer ma famille" onClick={checkToken} color={Colors.Primary} />
            </section>
            <section className={styles.textWelcomeChildrens}>
                <p>
                    Bonjour les enfants ! Il n&apos;y a plus qu&apos;a attendre l&apos;invitation à rejoindre votre
                    famille. Pour que vos parents puissent vous ajouter, vous aurez besoin de leur communiquer votre
                    pseudo: {pseudo}.{" "}
                </p>
            </section>
        </div>
    );
}

export default CreateFamily;