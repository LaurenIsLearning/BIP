import styles from "../style/VerificationForm.module.css";

function VerificationForm () {

    return (
        <>
            <section className={styles.verify}>
                <section className={styles.group}>
                    <label>Attach image of yourself for admin to verify</label>
                    <input type="file" id="imageInput" accept="image/png, image/jpeg, image/gif"></input>
                </section>
                <section className={styles.group}>
                    <label>Enter your name (first and last): </label>
                    <input type="text"></input>
                </section>
                <section className={styles.group}>
                    <label>Enter your team name: </label>
                    <input type="text"></input>
                </section>  
                <button className="button_light">Submit</button>
            </section>
        </>
    )
}

export default VerificationForm;