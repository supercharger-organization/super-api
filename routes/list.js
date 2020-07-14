const express = require('express');
const router = express.Router();
const List = require('../models/list')

router.get('/all', (req, res, next)=>{
    List.find(function(err, Columns){
        res.json(Columns)
    })
});

router.get('/template', (req, res, next)=>{
    let newList = new List({
        title: "Column Title",
        position: -1,
        boardId: undefined,
        cardIds: [undefined],
    })
    res.json(newList);
});


// Return just the column matching the id passed
router.get('/:_id', (req, res, next)=>{
    //console.log("ID Passed: " + req.params._id);
    List.find({_id: req.params._id}, function(err,list){
        //console.log("Obj Found: ");
        //console.log(card);
        if (list) {
            res.json(list);
        } else {
            res.json({ message: `item ${req.params._id} doesn't exist`})
        }
    });
});

router.get('/:_id/w_children', (req, res, next)=>{
    //console.log("ID Passed: " + req.params._id);
    List.find({_id: req.params._id})
    .populate({
        path: 'startups',
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

router.post('/post', (req, res, next)=>{
    let newColumn = new List({
        title: req.body.title,
        position: req.body.position,
        boardId: req.body.boardId,
        cardIds: req.body.cardIds,
    })

    newColumn.save((err, column)=>{
        if (err){
            res.json({msg: "Failed to add Column"});
        }
        else {
            res.json({msg: "Column added successfully"});
        }
    })
});

router.post('/update', (req, res, next)=>{

    console.log(req.body._id);
    Note.findOneAndUpdate({_id: req.body._id}, 
    {
        title: req.body.title,
        position: req.body.position,
        boardId: req.body.boardId,
        startupIds: req.body.startupIds
    }).then(function(){
        res.json({ message: `list updated`});
    });
});

router.delete('/delete/:id', (req, res, next)=>{
    List.remove({_id: req.params.id}, function(err, result){
        if (err){
            res.json(err)
        }
        else {
            res.json(result)
        }
    })
});



module.exports = router;