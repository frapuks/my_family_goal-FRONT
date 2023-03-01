import styles from "./UserSettingsForm.module.scss";
import { Button } from "../Common/Button";
import { Colors } from "../../constants/Colors";

function DeleteButton() {
    return (
        <div className={styles.formButton}>
            <Button text="Supprimer le compte" color={Colors.Warning} />
        </div>
    );
}
export default DeleteButton;
