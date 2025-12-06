import { useState } from "react";
import image from "../assets/ryan_temp_image.jpeg";
import VerificationForm from "./VerificationForm.tsx";
import styles from "../style/ProfileCard.module.css";
import { useNavigate } from "react-router-dom";


function ProfileCard () {
    const [verified, setVerified] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    // This funtionallity will be changed later
    const toggleVerified = () => {
        setVerified(prev => !prev);

        if(!verified)
        {
            togglePopup();
        }
    }

    function togglePopup() {
      setShowPopup(!showPopup);
    }

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user')

        // dispatch logout action
        // dispatch({ type: 'LOGOUT' })

        // Go to the Home page
        navigate('/'); 
    }

    return (
        <>
        <section className={styles.profile_card}>
            <section className={styles.inline_box}>
                <img
                    src={image} // Eventually given image of player
                    alt="First Last Name"
                    className={styles.player_image}
                ></img>
                <section className={styles.info_box}>
                    {/* most of the data displayed in this section will vary 
                    depending on if the account is verified or not */}
                    <h3 className={styles.name_user}>First Last</h3>
                    <h4>Team Name</h4>
                    <h4>email@gmail.com</h4>
                    <section className={styles.btn_section}>
                        <button className="button_light" onClick={logout}>Logout</button>
                        {/* CHANGE THESE BUTTONS' FUNCTIONALITY LATER!!!!*/}
                        {!verified && <button className="button_light" onClick={toggleVerified}>Verify</button>}
                        {verified && <button className="button_light" onClick={toggleVerified}>Remove Verification</button>}
                    </section>
                </section>
                
            </section>
            <hr />
            {showPopup && <>
                <section className={styles.verify_form}>
                    <VerificationForm />
                    <button className="button_light" onClick={togglePopup}>Cancel Verification</button>
                </section>
                <hr />
            </>  
            }
            <section className={styles.stat_section}>
                <p>
                    You are not verified yet, so there are no recorded stats 
                    for you. In order to see detailed stats, you need to verify 
                    your account.
                </p>
            </section>
        </section>
        
        </>
    )
}

export default ProfileCard;