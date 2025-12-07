import styles from "../style/VerificationForm.module.css";
import { useState } from "react";

function VerificationForm () {
    const [playerImage, setPlayerImage] = useState('');
    const [playerName, setPlayerName] = useState('');
    const [playerTeam, setPlayerTeam] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Create a fetch request to:
            // a.) update user and player data, or
            // b.) submit request to admin

        return;
    }

    return (
        <>
            <form className={styles.verify} onSubmit={handleSubmit}>
                <section className={styles.group}>
                    <label>Attach image of yourself for admin to verify: </label>
                    <input type="file" id="imageInput" accept="image/png, image/jpeg, image/gif"
                    onChange={(e) => setPlayerImage(e.target.value)} value={playerImage} />
                </section>
                <section className={styles.group}>
                    <label>Enter your name (first and last): </label>
                    <input type="text" onChange={(e) => setPlayerName(e.target.value)} value={playerName} />
                </section>
                <section className={styles.group}>
                    <label>Enter your team name: </label>
                    <input type="text" onChange={(e) => setPlayerTeam(e.target.value)} value={playerTeam} />
                </section>  
                <button type="submit" className="button_light">Submit</button>
            </form>
        </>
    )
}

export default VerificationForm;