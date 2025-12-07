import styles from "../style/Login.module.css"
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext.tsx";

function LoginForm () {
    const [error, setError] = useState(null);
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Get the login function
    const auth = useContext(AuthContext);
    if (!auth) {
        throw new Error("LoginForm must be used inside an AuthProvider");
    }
    const { login } = auth;

    // Handle submit function
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Create a POST request and have the data in the body
        const response = await fetch("https://bip-backend.fly.dev/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userEmail, password }),
        });

        // Get data
        const data = await response.json();  

        if(response.ok) {
            // Remove any possible errors
            setError(null);

            // Login through AuthContext
            login({
                user: data.user,
                token: data.token,
            });

            // Go to home page
            navigate('/');
            return data;
        }
        else {
            // Set the error message
            setError(data.error);
        }
    }

    return (
        <>
            <section className={styles.login_section}>
                <form className={styles.login_form} onSubmit={handleSubmit}>
                    <h3>Login</h3>
                    <section className={styles.group}>
                        <label>User Email: </label>
                        <input type="email" onChange={(e) => setUserEmail(e.target.value)} value={userEmail}></input>
                    </section>
                    <section className={styles.group}>
                        <label>Password: </label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password}></input>
                    </section>
                    <button type="submit">Submit</button>
                    {error && <p className={styles.error_mssg}>{error}</p>}
                </form>
            </section>
        </>
    )
}

export default LoginForm;
