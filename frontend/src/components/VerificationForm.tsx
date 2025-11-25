
/*  We will want to get pass a User object to 
    this function so we have access to info
*/
function VerificationForm () {



    return (
        <>
        <form className="verify_form">
            <h3>This form will be sent to a site Admin, who 
                will verify your identity
            </h3>
            <label>Please submit a photo of yourself</label>
            <label>Name</label>
            {/* <input type="text" placeholder="First Last">Hello</input> */}
            <label>Team</label>
            {/* <input type="text">Team</input> */}
            <button>Submit</button>
        </form>
        </>
    )
}

export default VerificationForm;