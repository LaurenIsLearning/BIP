import { useState, useContext, useEffect } from "react";
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

    const [editingProf, setEditingProf] = useState(false);
    const navigate = useNavigate();

    // Get the logout function
    const auth = useContext(AuthContext);
    if (!auth) {
        throw new Error("LoginForm must be used inside an AuthProvider");
    }
    const { logout, user } = auth;

    const userEmail = user?.email;

    // Decides if the edit profile section is shown or not
    const toggleForm = () => {

        if(editingProf)
        {
            setEditingProf(false);
        } else {
            setEditingProf(true);
        }
    }

    // Logoun
    const callLogout = () => {
        // Logout through AuthContext
        logout();

        // Go to the Home page
        navigate('/'); 
    }

    useEffect(() => {
        if (user) {
            setUserName(user.name || "");
            setUserTeam(user.team || "");
        }
    }, [user, ]);

    // Change the user's data after they submit Edit Profile
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!user) {
            console.error("User is null — cannot update.");
            return;
        }

        // Create PATCH request to edit user data
        const response = await fetch(`https://bip-backend.fly.dev/api/users/change/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nameVal, teamVal }),
        });

        // Get data
        const data = await response.json(); 

        console.log(response);

        // Make sure we have an okay response
        if(!response.ok) {
            auth.updateUser({ ...user, name: '', team: ''});
            return;
        }

        const msg = data.message?.toString().trim();
        const currUser = data.data;

        console.log(currUser.id);
        console.log(currUser.email);
        console.log(currUser.name);

        console.log("data.message:", data.message, typeof data.message);
        console.log("Full response data:", data);

        // Check if the user is valid
        if (msg == "Valid Player") {
            auth.updateUser({ ...user, name: currUser.name, player_id: currUser.player_id, team_id: currUser.team_id, team: currUser.team_name});
            console.log("Valid Acount");
        } else if(msg == "Invalid Player") {
            auth.updateUser({ ...user, name: currUser.name, player_id: '0', team_id: '0', team: ''});
            console.log("Invalid Account");
        } else {
            console.log("We are in the else")
        }


        // Don't show the edit form section
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
                    <h3 className={styles.name_user}>{userName || "Name"}</h3>
                    <h4>{userTeam || "No team"}</h4>
                    {userEmail || <h4>example@email.com</h4>}
                    <section className={styles.btn_section}>
                        <button className="button_light" onClick={callLogout}>Logout</button>
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
        </section>
        
        </>
    )
}

export default ProfileCard;