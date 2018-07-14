const mongoose = require('mongoose');
const RecipientSchema = require('./Recipient');
//const Schema = mongoose.Schema;
const { Schema } = mongoose;

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  dateSent: Date,
  lastResponded: Date
}); //Schema.Types.ObjectId is the user's ID
//and the ref 'User' tells mongo its from the User model

mongoose.model('surveys', surveySchema);
