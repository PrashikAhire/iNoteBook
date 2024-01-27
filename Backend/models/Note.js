const mongoose = require('mongoose');
// require to use mangoose data
const { Schema } = mongoose;

const NotesSchema = new Schema({
    // user attribute is to find the user
    user:{
      //linked with thw User.js using id
      type : mongoose.Schema.Types.ObjectId,
      //reference is user from User.js ********************
      ref : 'user'
   },
   title:{
    type : String,
    required : true
   },
   description:{
    type : String,
    required : true,
   },
   tag:{
    type : String,
    default : "General",
   },
   date:{
      type : Date,
      default : Date.now
   }

  });
//   'notes': This is the name of the MongoDB collection that will be created for this model. In MongoDB, a collection is similar to a table in a relational database.

//   NotesSchema: This is presumably a Mongoose schema that defines the structure of documents (records) in the 'notes' collection. A Mongoose schema defines the fields and their types, validation rules, and other properties for the documents in the collection.
  module.exports = mongoose.model('notes',NotesSchema)