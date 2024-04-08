const express = require('express');
const User = require('../models/Users');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
var fetchUser = require('../middleware/fetchUser');

const JWT_SECRET = 'Adharisagoodboy';

//Route 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser',[
    body('name', 'Enter a valid name').isLength({min:3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min:5}),
], async (req, res) => {
    let success = false;
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array()});
    }

    try {
        const {name,email,password} = req.body;
        
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user instance
        const user = new User({ name, email, password: hashedPassword });
        
        // Save the user to the database
        await user.save();

        // Generate JWT token
        const payload = {
            user: {
                id: user.id
            }
        };
        const authToken = jsonwebtoken.sign(payload, JWT_SECRET);

        // Send a response indicating success
        res.status(201).json({ authToken, message: 'User created successfully', user });
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error saving user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//`Route 2: Authenticate a User using: POST "/api/auth/login". 
router.post('/login',[
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').exists(),
], async (req, res) => {
    const {email,password} = req.body;
    try {
        // Find the user by email
        let user = await User.findOne({email});
        if (!user) {
            success=false;
            return res.status(400).json({ success, error: "User with this email does not exist" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            success=false;
            return res.status(400).json({ success, error: "Invalid credentials" });
        }

        // Generate JWT token
        const payload = {
            user: {
                id: user.id
            }
        };
        const authToken = jsonwebtoken.sign(payload, JWT_SECRET);
        success=true;

        // Send a response with authentication token
        res.json({ success,authToken });
    } catch(error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


//`Route 3: Get looged in User Details using: POST "/api/auth/getuser". login required.

router.post('/getuser', fetchUser, async (req, res) => {
try {
    const user = await User.findById(req.user.id).select("-password");
    res.send(user);
} catch (error) {
    console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
}
});
module.exports = router;
