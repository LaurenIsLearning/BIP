import styles from "../style/Login.module.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm () {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Handle submit function
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Create a POST request and have the data in the body
        // I am not sure how we are accessing the data
        const response = await fetch("http://localhost:8080/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userName, password }),
        });

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

    return (
        <>
            <section className={styles.login_section}>
                <form className={styles.login_form} onSubmit={handleSubmit}>
                    <h3>Login</h3>
                    <section className={styles.group}>
                        <label>User Name: </label>
                        <input type="text" onChange={(e) => setUserName(e.target.value)} value={userName}></input>
                    </section>
                    <section className={styles.group}>
                        <label>Password: </label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password}></input>
                    </section>
                    <button type="submit">Submit</button>
                </form>
            </section>
        </>
    )
}

export default LoginForm;