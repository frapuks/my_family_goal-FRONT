import styles from "../UserSettingsForm.module.scss";
import { Button } from "../../Common/Button";
import { Colors } from "../../../constants/Colors";
import { useSelector } from "react-redux";

function DeleteButton() {
    const user = useSelector(state => state.user.user);
    const token = useSelector(state => state.user.token);
    console.log(user);

    const onDeleteButton = async () => {
        console.log("moi tout supprimer");

        const response = await fetch(import.meta.env.VITE_API_ROOT + `/user/${user.id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
        });

        if (response.ok) {
            console.log("vous avez été supprimer...");
        }
    };
    return (
        <div className={styles.formButton}>
            <Button text="Supprimer le compte" color={Colors.Warning} onClick={onDeleteButton} />
        </div>
    );
}
export default DeleteButton;
