import styles from "./UserSettingsForm.module.scss";
import { Btn } from "../Common/Button";
import { Colors } from "../../constants/Colors";
import { deleteToken } from "../../store/slices/userSlice";
import { resetFamily } from "../../store/slices/familiesSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function DeconnextionButton() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
