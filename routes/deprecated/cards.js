const express = require('express');
const router = express.Router();
//const Card = require('../../models/deprecated/card');
const Startup = require('../../models/startup');

// Returns all cards
router.get('/all', (req, res, next)=>{
    Card.find(function(err, cards){
        res.json(cards)
    })
});

// Return all cards of a certain board passed with all startup children
router.get(':by_board_id/w_startup', (req, res, next)=>{
    //console.log("ID Passed: " + req.params._id);
    Card.find({ boardId: req.params.by_board_id })
    // ..and populate all of the notes associated with it
    .populate("startupId") // This component is necessary to replace the id field with the object field!
    .then(function(result) {
      // If we were able to successfully find an Product with the given id, send it back to the client
      res.json(result);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Return just the card matching the id passed
router.get('/:_id', (req, res, next)=>{
    //console.log("ID Passed: " + req.params._id);
    Card.findOne({_id: req.params._id})
    .then(function(result) {
    // If we were able to successfully find an Product with the given id, send it back to the client
        res.json(result);
    })
    .catch(function(err) {
    // If an error occurred, send it to the client
    res.json({ message: `item ${req.params.id} doesn't exist`})
    });
});

// Return just the card matching the id passed with all startup children
router.get('/:_id/w_startup', (req, res, next)=>{
    //console.log("ID Passed: " + req.params._id);
    Card.findOne({ _id: req.params._id })
    // ..and populate all of the notes associated with it
    .populate("startupId") // This component is necessary to replace the id field with the object field!
    .then(function(result) {
      // If we were able to successfully find an Product with the given id, send it back to the client
      res.json(result);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});


router.get('/template', (req, res, next)=>{
    let newCard = new Card({
        name: "Name",
        position: -1,
        boardId: undefined,
        columnId: undefined,
        startupId: undefined,
        note_id: undefined,
    });
    res.json(newCard);
});


router.post('/post', (req, res, next)=>{
    let newCard = new Card({
        name: req.body.name,
        position: req.body.position,
        boardId: req.body.boardId,
        columnId: req.body.columnId,
        startupId: req.body.startupId,
        note_id: req.body.note_id,
    })

    newCard.save((err, card)=>{
        if (err){
            res.json({msg: "Failed to add Card"});
        }
        else {
            res.json({msg: "Card added successfully"});
        }
    })
});

router.delete('/delete/:id', (req, res, next)=>{
    Card.remove({_id: req.params.id}, function(err, result){
        if (err){
            res.json(err)
        }
        else {
            res.json(result)
        }
    })
});


module.exports = router;