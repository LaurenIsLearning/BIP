import styles from "../style/Login.module.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateAccountForm () {

    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secPassword, setSecPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const navigate = useNavigate();

    // Handle submit function
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Make sure password == secondPassword
        if(password == secPassword)
        {
            setPasswordsMatch(true);

            console.log("Passwords match, so sending data to backend");

            // Create a POST request and have the data in the body
            const response = await fetch("http://localhost:3000/api/users/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userEmail, password }),
            });

            // Make sure no errors
            if(response.ok) {
                const data = await response.json();  
                
                // save the user to local storage
                localStorage.setItem('user', JSON.stringify(data));
                // update the auth context
                //dispatch({type: 'LOGIN', payload: data});

                // Go to home page
                navigate('/');
                return data;
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
                </form>
            </section>
        </>
    )
}

export default CreateAccountForm;