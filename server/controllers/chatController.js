const Contact = require('../models/contact')
const User = require('../models/users')
const Conversation = require('../models/conversation');
const Message = require('../models/message');

exports.createUserContact = async (req, res) => {
    console.log('reaching')
    console.log(req.body);
    const from = await User.findOne({ username: req.body.from });
    const to = await User.findOne({ username: req.body.to });
    try {
        const userContact = new Contact({
            user_id: from._id,
            contact_id: to._id
        });

        await userContact.save();
        res.status(200).json(userContact);
    }
    catch (error) {
        res.status(400).json({ msg: 'error while creating chat pair' })
    }
}


exports.findUserContact = async (req, res) => {
    console.log('reaching')
    const userContacts = await userContact.find();
    try {
        if (userContacts) {
            console.log(userContacts)
            res.status(200).json(userContacts);
        }
        else {
            res.status(200).json({ msg: 'user has no chat yet' })
        }

    } catch (error) {
        res.status(400).json({ msg: 'server error while finding user chats' })

    }

}


exports.CreateConversation = async (req, res) => {
 
    try {
        const fromUser = await User.findOne({ _id: req.body.fromUser });
        const selectedUser = await User.findOne({ _id: req.body.selectedUser});
         
        // Create a new Conversation document
        const newConversation = new Conversation({
            participants: [fromUser._id, selectedUser._id]
        });

        // Save the Conversation document
        await newConversation.save();
        res.status(200).json({ msg: 'conversation created', 'newConversationId':newConversation._id })

    } catch (error) {                 
        res.status(400).json({ msg: 'error while creating conversation' })

    }

}





exports.CreateMessage = async (req, res) => {

    try {
        const conversation = await Conversation.findById(req.body.conversationid); // You'll need to provide the actual conversation ID
        const sender = await User.findOne({ username: req.body.username }); // Replace 'alice' with the actual sender's username
        const message = req.body.message;
        // Create a new Message document
        const newMessage = new Message({
            conversation_id: conversation._id,
            sender_id: sender._id,
            text: message,
            timestamp: new Date()
        });

        await newMessage.save();
        res.status(200).json({ msg: 'message has created' })

    }
    catch (error) {
        res.status(400).json({ msg: 'error while creating message' })

    }

}