import styles from "./UserSettingsForm.module.scss";
import { Button } from "../Common/Button";
import { Colors } from "../../constants/Colors";
import { setToken } from "../../store/slices/userSlice";
import { setFamilies, setSelectFamily } from "../../store/slices/familiesSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


function DeconnextionButton() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onDeconnexionButton = () => {
        dispatch(setToken()),
        dispatch(setFamilies([])),
        dispatch(setSelectFamily(null)),
        navigate('/')
    }

    return (
        <div className={styles.formButton}>
            <Button text="Déconnexion" onClick={onDeconnexionButton} color={Colors.Success} />
        </div>
    );
}
export default DeconnextionButton;
