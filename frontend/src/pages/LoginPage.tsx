import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";
import CreateAccountForm from "../components/CreateAccountForm";
import { useState } from "react";

import ProfilePage from "./ProfilePage";

function LoginPage () {
    const [loggingIn, setLoggingIn] = useState(true);

    // Function to toggle the value of loggingIn
  const toggleForm = () => {
        setLoggingIn(prevLoggingIn => !prevLoggingIn);
    }

    return(
        <>
            <NavBar />
            {loggingIn ? <LoginForm /> : <CreateAccountForm />}

            {loggingIn ? (
                <button onClick={toggleForm} className="button_dark">Don't have an account? Sign Up</button>
            ) : (
                <button onClick={toggleForm} className="button_dark">Already have an account? Log In</button>
            )}
            <Footer />
            <ProfilePage />
        </>    
    )
}

export default LoginPage