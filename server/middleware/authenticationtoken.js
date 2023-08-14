const express= require('express');
const User=require('../models/users');
var jwt = require('jsonwebtoken');


const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Access denied.' });
    }
    jwt.verify(token, 'your-access-key', async (error,  decoded) => {
      if (error && error.name === 'TokenExpiredError') {
        // Access token expired, try to refresh
        const refreshToken = req.headers.refreshtoken;
        if (!refreshToken) {
          return res.status(403).json({ error: 'Access token expired, refresh token missing.' });
        }
  
        try {
          const decodedRefresh =await JwtVerfity(refreshToken);
          const storedRefreshToken = await User.findOne({
            userId: decodedRefresh._id,
            refreshtoken: refreshToken,
          });
          if (!storedRefreshToken) {
            return res.status(403).json({ error: 'Invalid refresh token.' });
          }
          

          const newAccessToken = await generateAccess(decodedRefresh.userId);
          res.set('New-Access-Token', newAccessToken);
          next();
        } catch (error) {
          return res.status(403).json({ error: 'Invalid refresh token.' });
        }

      } else if (error) {
        return res.status(403).json({ error: 'Invalid token.' });
      } 
      else {
        req.userId = decoded.userId;
        next();
      }
    });
  };


async function JwtVerfity(refreshToken){
   const decoded=jwt.verify(refreshToken, 'your-refresh-key')
   return decoded;
}

const generateAccess = async (id) => {
const accessToken = await jwt.sign({ userId: id }, 'your-access-key', { expiresIn: '2m' });
return accessToken;
} 

module.exports=authenticateToken;