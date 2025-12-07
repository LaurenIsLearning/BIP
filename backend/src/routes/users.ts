import express from "express"
import jwt from "jsonwebtoken"
import { pool } from "../db.js"
import bcrypt from "bcrypt";
import validator from "validator";

const router = express.Router();

// Create a json web token
const createToken = (id) => {
    return jwt.sign({id}, 'hd659snyc8ejbfixinevcimsn901jd9djbf', {expiresIn: '1h'})
}

// Get users
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id,
        email,
        role,
        name,
        player_id,
        team_id,
        created_at
      FROM users
      ORDER BY id ASC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Error fetching users" });
  }
});

// Login Route
router.post('/login', async (req, res) => {
    // Get username and password from request body
    const { userEmail, password } = req.body;
    console.log("Email: ", userEmail);

    try {
        // Make sure all fields are filled
        if(!userEmail || !password) {
            throw Error('All fields must be filled');
        }

        // Make sure userEmail is an email
        if(!validator.isEmail(userEmail)) {
            throw Error('Not a valid email address');
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Get user from database
        const selectQuery = 'SELECT * FROM users WHERE email = $1';
        const result = await pool.query(selectQuery, [userEmail]);
        const { rows } = result;

        // Check if user exists
        if (rows.length === 0) {
            // If the length is zero, that means a user does not exists
            throw Error('No account found for that username');
        } else {
            // We found the user
            console.log('User found:', rows[0]);

            // Get the user
            const currUser = rows[0];

            // Check if the password is correct
            const validPassword = await bcrypt.compare(password, currUser.password_hash);
            if(validPassword)
            {
                // Create token
                const token = createToken(currUser.id)

                // Send user and token
                res.status(200).json({
                    user: { 
                        id: currUser.id,
                        email: currUser.email,
                        role: currUser.role
                        },
                    token
                });
            } else {
                // If the password is incorrect, notify user
                throw Error('Incorrect password');
            }
        }
    } catch (err) {
        console.log("Login ERROR:", err); 
        res.status(400).json({error: err.message});
    }

})


// Signup Route
router.post('/signup', async (req, res) => {

    // Get username and password from request body
    const { userEmail, password } = req.body;

    console.log("SIGNUP VALUES:", userEmail, password);

    try {
        // Make sure all fields are filled
        if(!userEmail || !password) {
            throw Error('All fields must be filled');
        }

        // Make sure userEmail is an email
        if(!validator.isEmail(userEmail)) {
            throw Error('Not a valid email address');
        }

        // Check if the email is already in use
        const selectQuery = 'SELECT * FROM users WHERE email = $1';
        const initialResult = await pool.query(selectQuery, [userEmail]);
        if(initialResult.rows.length != 0)
        {
            throw Error('Account with that email is already in use')
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Insert new user into database
        await pool.query(
            `INSERT INTO users (email, password_hash, role)
            VALUES ($1, $2, 'player')
            ON CONFLICT (email) DO NOTHING`,
            [userEmail, passwordHash]
        ); 

        // Get the user we just created
        const result = await pool.query(selectQuery, [userEmail]);
        const currUser = result.rows[0];
        console.log('User added:', currUser);
        
        // Create token
        const token = createToken(currUser.id);

        // Make sure to also add token
        res.status(200).json({
            user: { 
                id: currUser.id,
                email: currUser.email,
                role: currUser.role
                },
            token
        });
    } catch (err) {
        console.log("SIGNUP ERROR:", err); 
        res.status(400).json({error: err.message});
    }

})

// Change user info
router.patch('/change/:id', async (req, res) => {
    // Get user id from url
    // const userId = req.params.id;
    const userId = Number(req.params.id);
    if (isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
    }

    // Get name and team from request body
    const { nameVal, teamVal } = req.body;

    console.log("Changing VALUES:", nameVal, teamVal);

    try {
        // Make sure all fields are filled
        if(!nameVal || !teamVal) {
            throw Error('All fields must be filled');
        }

        // Check if there is a player with the name
        const playerQuery = 'SELECT * FROM players WHERE name = $1';
        const playerResult = await pool.query(playerQuery, [nameVal]);

        let msg = "";

        // Make sure a player exists
        if(playerResult.rows.length != 0) {
            console.log("The player exists!");

            // Get the player
            const currPlayer = playerResult.rows[0];

            // Get the player's team
            const teamQuery = 'SELECT name FROM teams WHERE id = $1';
            const teamResult = await pool.query(teamQuery, [currPlayer.team_id]);

            // Check if the user's team matches the player's team
            if(teamResult.rows[0].name === teamVal) {
                console.log("The teams match!!!")

                // If they match, update the user's name and the player_id
                const editQuery = `UPDATE users
                    SET name = $1, player_id = $2, team_id = $3
                    WHERE id = $4`
                const editResult = await pool.query(editQuery, [nameVal, currPlayer.id, currPlayer.team_id, userId]);

                // Return response
                msg = "Valid Player";
            } else {
                // If the teams do not match, just update the user's name
                const editQuery = `UPDATE users
                    SET name = $1, player_id = null, team_id = null
                    WHERE id = $2`
                const editResult = await pool.query(editQuery, [nameVal, userId]);

                // Return response
                msg = "Invalid Player";
            }

        } else {
            // If a player with the user's name does not exist,
            // update the user's name, but not player_id
            const editQuery = `UPDATE users
                SET name = $1, player_id = null, team_id = null
                WHERE id = $2`
            const editResult = await pool.query(editQuery, [nameVal, userId]);

            msg = "Invalid Player";
        }   
        
        // Get the newly updated user
        const findQuery = `SELECT users.id, 
                            users.email, 
                            users.role, 
                            users.name, 
                            users.player_id, 
                            users.team_id, 
                            teams.name AS team_name
                            FROM users
                            LEFT JOIN teams ON users.team_id = teams.id
                            WHERE users.id = $1
                            `
        const findResult = await pool.query(findQuery, [userId]);

        const currUser = findResult.rows[0];
        res.status(200).json({data: currUser, message: msg});

    } catch(err) {
        console.log("UPDATE USER ERROR:", err); 
        res.status(400).json({error: err.message});
    }
})


// Find a user
router.get('/find/:id', async (req, res) => {
    try {
        const query = `
        SELECT 
            u.id,
            u.email,
            u.role,
        FROM users u
        WHERE u.id = $1
        `;

        // Find the user
        const result = await pool.query(query, [req.params.id]);

        if (result.rows.length == 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const currUser = result.rows[0];
        console.log('User found:', currUser);

        res.status(200).json({
            user: { 
                id: currUser.id,
                email: currUser.email,
                role: currUser.role
                }
        });

    } catch(err) {
        console.log("SEARCH ERROR:", err); 
        res.status(400).json({error: err.message});
    }
})

//delete a user
router.delete("/:id", async (req, res) => {
    const userId = Number(req.params.id);

    if (isNaN(userId)) {
        return res.status(404).json({ error: "Invalid user ID"});
    }

    try {
        // remove user (also player_id and team_id justincase)
        await pool.query(
            `DELETE FROM users WHER id = $1`,
            [userId]
        );
        res.status(200).json({ message: "User deleted"});
    }catch (err) {
        console.error("DELETE USER ERROR:", err);
        res.status(500).json({error:"Failed to delete user"});
    }
});

export default router; 