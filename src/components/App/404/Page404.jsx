import { Btn } from "../../Common/Button";
import logo404 from "../../../assets/logo404.jpg";
import style from "./Page404.module.scss";
import { Colors } from "../../../constants/Colors";

function Page404() {
    return (
        <div className={style.container}>
            <div className={style.title}>
                <h1>Ho ho! </h1>
                <h2>Il y a un problème</h2>
            </div>
            <img className={style.img} src={logo404} alt="Logo page 404" />

            <Btn className={style.btn} color={Colors.Primary} href="/" text="Retour à la page d'acceuil"></Btn>
        </div>
    );
}
export default Page404;
