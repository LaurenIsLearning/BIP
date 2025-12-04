import express from "express"
import jwt from "jsonwebtoken"
import { pool } from "../db.js"
import bcrypt from "bcrypt";
import validator from "validator";

const router = express.Router();

// Create a json web token
const createToken = (_id) => {
    return jwt.sign({_id}, 'hd659snyc8ejbfixinevcimsn901jd9djbf', {expiresIn: '1h'})
}

// Login Route
router.post('/login', async (req, res) => {
    // Get username and password from request body
    const { userEmail, password } = req.body;

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
        const result = await pool.query(selectQuery, userEmail);
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
            if(currUser.password_hash == passwordHash)
            {
                // Create token
                const token = createToken(currUser.id)

                // Send user and token
                res.status(200).json({
                    user: { userName: currUser.userName, _id: currUser._id },
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
        const initialResult = await pool.query(selectQuery, userEmail);
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
            [userEmail, password]
        ); 

        // Get the user we just created
        const result = await pool.query(selectQuery, userEmail);
        const currUser = result.rows[0];
        console.log('User added:', currUser);
        
        // Create token
        const token = createToken(currUser.id);

        // Make sure to also add token
        res.status(200).json({
            user: { userName: currUser.userName, _id: currUser._id },
            token
        });
    } catch (err) {
        console.log("SIGNUP ERROR:", err); 
        res.status(400).json({error: err.message});
    }

})


export default router; 