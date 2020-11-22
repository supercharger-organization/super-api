const express = require('express');
const router = express.Router();
const Board = require('../models/board');
const List = require('../models/list');
const Startup = require('../models/startup');
const startup = require('../models/startup');
const { populate } = require('../models/startup');

router.get('/', (req, res, next)=>{
    Board.find(function(err, Boards){
        res.json(Boards)
    })
});

// Return all cards of a certain board passed with all startup children
/*
router.get('/all_w_children', (req, res, next)=>{
    //console.log("ID Passed: " + req.params._id);
    Board.find()
    // ..and populate all of the notes associated with it
    .populate('columnIds') // This component is necessary to replace the id field with the object field!
    .then(function(result) {
      // If we were able to successfully find an Product with the given id, send it back to the client
      res.json(result);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});*/

// Return just the board matching the id passed
router.get('/:id/w_children', (req, res, next)=>{
    //console.log("ID Passed: " + req.params._id);
    Board.find({_id: req.params.id})
    .populate({
        path: 'lists',
        populate:{
            path: 'startups'
        }
    })
    .then(function(result)
    {
        res.json(result);
    })
    .catch(function(err) {
    // If an error occurred, send it to the client
    res.json(err);
    });
});

// Return just the board matching the id passed
router.get('/GetTestBoard', (req, res, next)=>{
    //console.log("ID Passed: " + req.params._id);
    Board.findOne().populate({
        path: 'lists',
        populate:{
            path: 'startups'
        }
    }).then(function(result)
    {
        res.json(result);
    })
    .catch(function(err) {
    // If an error occurred, send it to the client
    res.json(err);
    });
});


router.get('/template', (req, res, next)=>{
    let newBoard = new Board({
        title: "BoardTitle",
        cardIds: [],
        columnIds: [],
        userIDs: [],
    });
    res.json(newBoard);
});

// Return just the board matching the id passed
router.get('/:id', (req, res, next)=>{
    //console.log("ID Passed: " + req.params._id);
    Board.find({_id: req.params.id}, function(err,board){
        if (board) {
            console.log(board);
            res.json(board);
        } else {
            res.json({ message: `item ${req.params.id} doesn't exist`});
        }
    });
});



router.post('/update', (req, res, next)=>{

    var itemId = null;
    console.log(req.body._id);
    Board.findOneAndUpdate({_id: req.body._id}, 
    {
        title: req.body.title,
        teamId: req.body.teamId,
        authorId: req.body.authorId,
        cardIds: req.body.cardIds,
        columnIds: req.body.columnIds,
        userIDs: req.body.userIDs
    }).then(function(){
        res.json({ message: `board updated`});
    });
});

router.delete('/:id', (req, res, next)=>{
    Board.remove({_id: req.params.id}, function(err, result){
        if (err){
            res.json(err)
        }
        else {
            res.json(result)
        }
    })
});

module.exports = router;