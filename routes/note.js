const express = require('express');
const router = express.Router();
const Note = require('../models/note')

router.get('/all', (req, res, next)=>{
    Column.find(function(err, cards){
        res.json(cards)
    })
});


router.get('/template', (req, res, next)=>{
    let newNote = new Note({
        note: "Note Template Body",
        title: "Note Template Title",
        cardId: undefined,
        startupId: undefined,
        teamId: undefined,
        authorAccountId: undefined,
    });
    res.json(newNote);
});


// Return just the note matching the id passed
router.get('/:_id', (req, res, next)=>{
    //console.log("ID Passed: " + req.params._id);
    Note.find({_id: req.params._id}, function(err,note){
        //console.log("Obj Found: ");
        //console.log(card);
        if (note) {
            res.json(note);
        } else {
            res.json({ message: `item ${req.params._id} doesn't exist`})
        }
    });
});

router.post('/post', (req, res, next)=>{
    let newNote = new Note({
        note: req.body.note,
        title: req.body.title,
        cardId: req.body.cardId,
        startupId: req.body.startupId,
        teamId: req.body.teamId,
        authorAccountId: req.body.authorAccountId,
    })

    newNote.save((err, note)=>{
        if (err){
            res.json({msg: "Failed to add Note"});
        }
        else {
            res.json({msg: "Note added successfully"});
        }
    })
});

router.post('/update', (req, res, next)=>{

    var itemId = null;
    console.log(req.body._id);
    Note.findOneAndUpdate({_id: req.body._id}, 
    {
        note: req.body.note,
        title: req.body.title,
        cardId: req.body.cardId,
        startupId: req.body.startupId,
        teamId: req.body.teamId,
        authorAccountId: req.body.authorAccountId
    }).then(function(){
        res.json({ message: `note updated`});
    });
});

router.delete('/delete/:id', (req, res, next)=>{
    Column.remove({_id: req.params.id}, function(err, result){
        if (err){
            res.json(err)
        }
        else {
            res.json(result)
        }
    })
});



module.exports = router;