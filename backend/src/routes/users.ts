import express from "express"
import jwt from "jsonwebtoken"
import { pool } from "../db.js"

const router = express.Router();

// Create a json web token
const createToken = (_id) => {
    return jwt.sign({_id}, 'hd659snyc8ejbfixinevcimsn901jd9djbf', {expiresIn: '1h'})
}



// Login Route
router.post('/login', async (req, res) => {
    // Get username and password from request body
    const { userName, password } = req.body;

    // Find the user in the database HELP WITH THE QUERY PLEASE!!!
    const query = ``;
    const values = [userName, password];

    try {
        // Get data from database
        const result = await pool.query(query, values);

        // Check if user exists
        // I DONT KNOW HOW TO DO THIS PART WITH DOCKER!!

        // Create token
        // How do I create a token without a user being created?
        //const token = createToken(user._id);

        console.log('User found:', result.rows[0]);

        // Make sure to also add token
        res.status(200).json(result.rows[0])
    } catch (err) {
        console.log("Login ERROR:", err); 
        res.status(400).json({error: err.message});
    }

})


// Signup Route
router.post('/signup', async (req, res) => {

    console.log("We are in the backend");
    
    // Get username and password from request body
    const { userName, password } = req.body;
    
    // I do not really know what query to I do not know how docker works
    const query = `INSERT INTO users(username, password) VALUES($1, $2) RETURNING *`;

    const values = [userName, password];

    try {
        // Create token
        // How do I create a token without a user being created?
        //const token = createToken(user._id);

        const result = await pool.query(query, values);

        console.log('User added:', result.rows[0]);

        // Make sure to also add token
        res.status(200).json(result.rows[0])
    } catch (err) {
        console.log("SIGNUP ERROR:", err); 
        res.status(400).json({error: err.message});
    }

})


export default router; 