import styles from "../style/Login.module.css"
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function CreateAccountForm () {
    const [error, setError] = useState(null);
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secPassword, setSecPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const navigate = useNavigate();

    // Get the login function from AuthContext
    const auth = useContext(AuthContext);
    if (!auth) {
        throw new Error("LoginForm must be used inside an AuthProvider");
    }
    const { login } = auth;

    // Handle submit function
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Make sure password == secondPassword
        if(password == secPassword)
        {
            setPasswordsMatch(true);

            console.log("Passwords match, so sending data to backend");

            // Create a POST request and have the data in the body
            const response = await fetch("https://bip-backend.fly.dev/api/users/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userEmail, password }),
            });

            // Get data
            const data = await response.json();  

            // Make sure no errors
            if(response.ok) {
                // Remove any possible errors
                setError(null);

                // login through AuthContext
                login({
                    user: data.user,
                    token: data.token,
                });

                // Go to home page
                navigate('/');
                return data;
            }
            else {
                console.log(data.error)
                setError(data.error);
            }
        }
        else {
            // Setting this to false shows the user that the passwords do not match
            setPasswordsMatch(false);
        }
    }

    return (
        <>
            <section className={styles.login_section}>
                <form className={styles.login_form} onSubmit={handleSubmit}>
                    <h3>Create an Account</h3>
                    <section className={styles.group}>
                        <label>User Email: </label>
                        <input type="email" onChange={(e) => setUserEmail(e.target.value)} value={userEmail}></input>
                    </section>
                    <section className={styles.group}>
                        <label>Password: </label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password}></input>
                    </section>
                    <section className={styles.group}>
                        <label>Re-enter Password: </label>
                        <input type="password" onChange={(e) => setSecPassword(e.target.value)} value={secPassword}></input>
                    </section>
                    {!passwordsMatch && <><p className={styles.error_mssg}>Passwords do not match</p></>}
                    <button type="submit">Submit</button>
                    {error && <p className={styles.error_mssg}>{error}</p>}
                </form>
            </section>
        </>
    )
}

export default CreateAccountForm;