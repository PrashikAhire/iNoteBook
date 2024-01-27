const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const Notes = require('../models/Note');
const { body, validationResult } = require('express-validator');


// get notes using POST "/api/notes/addnote"
router.get('/getnotes',fetchuser,async(req,res)=>{
      try {
      //get or find notes using id of the user
      const notes = await Notes.find({user: req.user.id});
      //get notes at response     
     res.json(notes);
      } catch (error) {
             // if there is any kind of error it will be resolved by the catch block
    console.error(error.message);
    res.status(500).send("Internal server error") 
      }
      
})

// Route 2 : Add a new note using : POST "/api/notes/addnote". login required 
router.post('/addnote',fetchuser,[
      body('title','Enter a valid title').isLength({min : 3}),
      body('description',).isLength({min : 5}),
],async(req,res)=>{
      try {
             //destructuring data le rahe hai notes.js se title, description and tag ko bahar nikal rahe hai
      const {title, description , tag} = req.body;
      //the below code follows the above body constraints and if there is error then it prints an error
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
   return res.status(400).json({ errors: errors.array() });
 }
// new note containing title,description,tag,user
 const note = new Notes({
     title,description,tag,user : req.user.id
 })
 const savedNote = await note.save();
     
     res.json(savedNote);
      } catch (error) {
              // if there is any kind of error it will be resolved by the catch block
    console.error(error.message);
    res.status(500).send("Internal server error")
      }
     
})

// Route 3 : Update an existing note using : PUT "/api/notes/updatenotes/:id". login required 
  try {
      router.put('/updatenotes/:id',fetchuser,async(req,res)=>{//*********************************
            const {title,description,tag} = req.body;
      
            const newNote = {}
            if(title){newNote.title = title}
            if(description){newNote.description = description}
            if(tag){newNote.tag = tag}
      
            //find the note to be updated and update it 
            // params.id is the abvove ***** id 
            let note = await Notes.findById(req.params.id)
            if(!note){
                  //if user id is not found or wrong
                  return res.status(404).send("Not found")
            }
            // if one user try to update notes of another user
            if(note.user.toString() !== req.user.id){
                return res.status(401).send("Not allowed")
            }
      //new : note means agar koi naya bhi note hai tho who create ho jayga 
            note = await Notes.findByIdAndUpdate(req.params.id,{$set: newNote},{new:true})
            res.json({note});
           
      })
      
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error")
  }

// Route 4 : Delete an existing note using : DELETE "/api/notes/deletenotes/:id". login required 
  try {
      router.delete('/deletenotes/:id',fetchuser,async(req,res)=>{//*********************************
            const {title,description,tag} = req.body;
           
            //find the note to be deleted and delete it 
            // params.id is the abvove ***** id 
            let note = await Notes.findById(req.params.id)
            if(!note){
                  //if user id is not found or wrong
                  return res.status(404).send("Not found")
            }
            // if one user try to delete notes of another user or user can delete his own notes only
            if(note.user.toString() !== req.user.id){
                return res.status(401).send("Not allowed")
            }
      //new : note means agar koi naya bhi note hai tho who create ho jayga 
            note = await Notes.findByIdAndDelete(req.params.id)
            res.json({"Success"  : "note has been deleted",note:note});
           
      })
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error")
  }
router.delete('/deletenotes/:id',fetchuser,async(req,res)=>{//*********************************
      const {title,description,tag} = req.body;
     
      //find the note to be deleted and delete it 
      // params.id is the abvove ***** id 
      let note = await Notes.findById(req.params.id)
      if(!note){
            //if user id is not found or wrong
            return res.status(404).send("Not found")
      }
      // if one user try to delete notes of another user or user can delete his own notes only
      if(note.user.toString() !== req.user.id){
          return res.status(401).send("Not allowed")
      }
//new : note means agar koi naya bhi note hai tho who create ho jayga 
      note = await Notes.findByIdAndDelete(req.params.id)
      res.json({"Success"  : "note has been deleted",note:note});
     
})

module.exports = router;