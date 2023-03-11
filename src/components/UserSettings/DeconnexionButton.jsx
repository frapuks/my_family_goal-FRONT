import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// Components
import { Btn } from "../Common/Button";
import { Colors } from "../../constants/Colors";
// Slices
import { deleteToken } from "../../store/slices/userSlice";
import { resetFamily } from "../../store/slices/familiesSlice";
// Styles
import styles from "./UserSettingsForm.module.scss";


function DeconnextionButton() {
    // UTILS
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // METHODS

    // Disconnect
    const onDeconnexionButton = () => {
        dispatch(deleteToken());
        dispatch(resetFamily());
        navigate("/");
    };

    return (
        <div className={styles.formButton}>
            <Btn text="Déconnexion" onClick={onDeconnexionButton} color={Colors.Success} />
        </div>
    );
}

export default DeconnextionButton;