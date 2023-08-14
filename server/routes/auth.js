var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/users')



router.post('/signup', async function (req, res) {

    console.log(req.body)
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            username: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully.' });
    } 
    catch (error) {
        res.status(500).json({ error: 'An error occurred.' });
    }

});











router.post('/login', async function (req, res) {

    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ error: 'Authentication failed.' });
        }
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (passwordMatch) {
            const accessToken = await generateAccess(user._id)
            const refreshToken = await generateRefresh(user._id)
            user.refreshtoken = refreshToken;
            user.save();
            res.status(200).json({ accesstoken: accessToken, refreshtoken: refreshToken, isLogedIn: true, user});
        } else {
            res.status(401).json({ error: 'Authentication failed.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred.' });
    }
});


const generateAccess = async (id) => {
    console.log(id);
    const accessToken = await jwt.sign({ userId: id }, 'your-access-key', { expiresIn: '2m' });
    console.log(accessToken)
    return accessToken;
}
const generateRefresh = async (id) => {
    const refreshToken = await jwt.sign({ userId: id }, 'your-refresh-key', { expiresIn: '1d' });
    return refreshToken;
}

 // Replace with your User model import

router.get('/users', async (req, res) => {
  
  try {
    const searchTerm = req.query.search || ''; // Default to empty string if search term is missing
    const users = await User.find({ username: { $regex: searchTerm, $options: 'i' } });
    console.log(users)
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

  




module.exports = generateAccess;
module.exports = generateRefresh;
module.exports = router;