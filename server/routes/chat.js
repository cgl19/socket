var express = require('express');
var router = express.Router();
const chatController=require('../controllers/chatController')


router.post('/createusercontact', chatController.createUserContact);
router.get('/findusercontact', chatController.findUserContact);
router.post('/createconversation', chatController.CreateConversation);
router.post('/createmessage', chatController.CreateMessage);


module.exports=router;