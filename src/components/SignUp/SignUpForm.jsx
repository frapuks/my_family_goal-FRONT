import { TextField } from "../Common/TextField";
import { ValidateButton } from "../Common/ValidateButton";

const SignUpForm = () => {
    const onSubmit = e => {
        e.preventDefault();
    };

    return (
        <form onSubmit={onSubmit}>
            <TextField label="Nom" name="lastname" required />
            <TextField label="Prénom" name="firstname" required />
            <TextField label="Pseudo" name="pseudo" required />
            <TextField label="Email" name="email" required type="email" />
            <TextField label="Pseudo" name="pseudo" required />
            <TextField label="Mot de passe" name="password" required />
            <TextField label="Confirmation du mot de passe" name="password_confirm" required />

            <ValidateButton text="S'inscrire" />
        </form>
    );
};

export default SignUpForm;
