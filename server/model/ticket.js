const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
  {
    publicId: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      maxlength: 120,
      minlength: 1,
    },
  },
  { timestamps: true }
);

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
