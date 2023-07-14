const express = require('express')
const router = express.Router()
const Notes= require('../models/Notes');
const fetchuser =  require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');

router.get('/fetchall',fetchuser,async (req,res)=>
{
    const notes=await Notes.find({user:req.user.id});
    res.json(notes)
})

router.post('/addnote',fetchuser,[
    body('title',"Enter a valid title").isLength({min:5}),
    body('description',"Enter atleast 10 characters related to the title").isLength({min:10}),
],async (req,res)=>
{
    try
    {
    const {title,description,tag}  = req.body;

    const errors = validationResult(req);
    //If errors are present, bad request
    if (!errors.isEmpty()) 
    {
      return res.status(400).json({ errors: errors.array() });
    }
    const note=new Notes({
      title, description, tag, user:req.user.id
    })

    const newNote = await note.save()
    res.json(newNote)
    }
    catch(error)
    {
      console.log(error.message);
      res.status(500).send("Some error occured");
    }
})


router.put('/updatenote/:id',fetchuser,async (req,res)=>
{
    try
    {
    const {title,description,tag}  = req.body;
    const updatenote={};

        if(title){updatenote.title=title};
        if(description){updatenote.description=description};
        if(tag){updatenote.tag=tag};
    
    let note=await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Note not found")};

    if(note.user.toString()!=req.user.id)
    {
        return res.status(401).send("Not allowed");
    }
    
    note=await Notes.findByIdAndUpdate(req.params.id,{$set:updatenote},{new:true})
    res.json(note)
    }
    catch(error)
    {
      console.log(error.message);
      res.status(500).send("Some error occured");
    }
})


router.delete('/deletenote/:id',fetchuser,async (req,res)=>
{
 try
 {
  let note=await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Note not found")};
  
    
    if(note.user.toString()!=req.user.id)
    {
        return res.status(401).send("Not allowed");
    }
    
    note=await Notes.findByIdAndDelete(req.params.id);
    res.send({"Success":"Note has been deleted"})
 }
 catch(error)
 {
  console.log(error);
  res.status(500).send("Some error occured")
 }
})


module.exports= router