const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  contact_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
