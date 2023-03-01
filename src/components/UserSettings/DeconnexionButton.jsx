import styles from "./UserSettingsForm.module.scss";
import { Button } from "../Common/Button";
import { Colors } from "../../constants/Colors";

function DeconnextionButton() {
    return (
        <div className={styles.formButton}>
            <Button text="Déconnexion" color={Colors.Success} href="/" />
        </div>
    );
}
export default DeconnextionButton;
