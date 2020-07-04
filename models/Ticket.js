const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TicketSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  department: {
    type: String,
    required: true,
    max: 40
  },
  category: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mobile: {
    type: String
  },
  priority: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Ticket = mongoose.model('ticket', TicketSchema);
