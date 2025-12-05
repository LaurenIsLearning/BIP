import { useState, useContext } from "react";
import image from "../assets/ryan_temp_image.jpeg";
import styles from "../style/ProfileCard.module.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext.tsx";


function ProfileCard () {
    // Variables that get updated as user types
    const [imageVal, setImageVal] = useState('');
    const [nameVal, setNameVal] = useState('');
    const [teamVal, setTeamVal] = useState('');

    // Variables that change UI info
    const [userImage, setUserImage] = useState('');
    const [userName, setUserName] = useState('');
    const [userTeam, setUserTeam] = useState('');

    // Get the logout function
    const auth = useContext(AuthContext);
    if (!auth) {
        throw new Error("LoginForm must be used inside an AuthProvider");
    }
    const { logout } = auth;

    const [editingProf, setEditingProf] = useState(false);
    const navigate = useNavigate();

    const toggleForm = () => {

        if(editingProf)
        {
            setEditingProf(false);
        } else {
            setEditingProf(true);
        }
    }

    const callLogout = () => {
        // Logout through AuthContext
        logout();

        // Go to the Home page
        navigate('/'); 
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        setUserImage(imageVal);
        setUserName(nameVal);
        setUserTeam(teamVal);

        toggleForm();


    }

    // Update user info in backend

    return (
        <>
        <section className={styles.profile_card}>
            <section className={styles.inline_box}>
                <img
                    src={userImage || image} // Eventually given image of player
                    alt="User Image"
                    className={styles.player_image}
                ></img>
                <section className={styles.info_box}>
                    {/* most of the data displayed in this section will vary 
                    depending on if the account is verified or not */}
                    <h3 className={styles.name_user}>{userName || "User Name"}</h3>
                    <h4>{userTeam || "No team"}</h4>
                    <h4>email@gmail.com</h4>
                    <section className={styles.btn_section}>
                        <button className="button_light" onClick={callLogout}>Logout</button>
                        {/* CHANGE THESE BUTTONS' FUNCTIONALITY LATER!!!!*/}
                        {!editingProf && <button className="button_light" onClick={toggleForm}>Edit Account Info</button>}
                        {editingProf && <button className="button_light" onClick={toggleForm}>Cancel Account Edit</button>}
                        
                    </section>
                </section>
                
            </section>
            <hr />
            {editingProf && <>
                <section className={styles.verify_form}>
                    <form className={styles.verify} onSubmit={handleSubmit}>
                                    <section className={styles.group}>
                                        <label>Attach image of yourself for admin to verify: </label>
                                        <input type="file" id="imageInput" accept="image/png, image/jpeg, image/gif"
                                        onChange={(e) => setImageVal(e.target.value)} value={imageVal}  />
                                    </section>
                                    <section className={styles.group}>
                                        <label>Enter your name (first and last): </label>
                                        <input type="text"   onChange={(e) => setNameVal(e.target.value)} value={nameVal}/>
                                    </section>
                                    <section className={styles.group}>
                                        <label>Enter your team name: </label>
                                        <input type="text"  onChange={(e) => setTeamVal(e.target.value)} value={teamVal}/>
                                    </section>  
                                    <button type="submit" className="button_light">Submit</button>
                                </form>
                </section>
                <hr />
            </>  
            }
            <section className={styles.stat_section}>
                <p>
                    Your account is not synced with a player. 
                </p>
            </section>
        </section>
        
        </>
    )
}

export default ProfileCard;