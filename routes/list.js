const express = require('express');
const list = require('../models/list');
const router = express.Router();
const List = require('../models/list')

router.get('', (req, res, next)=>{
    List.find(function(err, Columns){
        res.json(Columns)
    })
});

router.get('/w_children', (req, res, next)=>{
    List.find()
    .populate({
        path: 'startups'
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
router.get('/:id', (req, res, next)=>{
    //console.log("ID Passed: " + req.params._id);
    List.find({_id: req.params.id}, function(err,list){
        //console.log("Obj Found: ");
        //console.log(card);
        if (list) {
            res.json(list);
        } else {
            res.json({ message: `item ${req.params.id} doesn't exist`})
        }
    });
});

router.get('/:id/w_children', (req, res, next)=>{
    //console.log("ID Passed: " + req.params._id);
    List.find({_id: req.params.id})
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

// router.get('/w_children', (req, res, next)=>{
//     List.find()
//     .populate({
//         path: 'startups'
//     })
//     .then(function(result)
//     {
//         res.json(result);
//     })
//     .catch(function(err) {
//     // If an error occurred, send it to the client
//     res.json(err);
//     });
// });

router.post('/', (req, res, next)=>{
    var rawList = req.body.list;
    // If no object return an error message
    if (rawList == null)
    {
        res.json({ message: "ERROR!! Please add a json object \"list\" to the post body"})
    }
    else{
        if (!rawList._id){
            var list = new List(rawList);
        }
        else{
            var list = rawList;
        }
        // if passed object do a lookup of it. if doesnt exist save as is, overwrite if found. return complete new document
        List.findOneAndUpdate({_id: list._id}, list, {new: true, upsert: true, overwrite:true}, function(err, doc){
            res.json({ err: err, currentObject: doc, message: "Transaction complete!"})
        });
    }
});

//add startup to list
router.post('/:id/startup/:startupId', (req, res, next)=>{

    let listId = req.params.id;
    let startupId = req.params.startupId;
    console.log(listId, startupId)

    List.findOneAndUpdate(
        {_id: listId},
        { $addToSet: { startups: startupId  } },
        function (error, success) {
            res.json({ message: `list updated`});
        }
    );
});

//del startup from list
router.delete('/:id/startup/:startupId', (req, res, next)=>{

    let listId = req.params.id;
    let startupId = req.params.startupId;
    List.findOneAndUpdate(
        {_id: listId},
        { $pull: { startups: startupId  } },
        function (error, success) {
            res.json({ message: `list updated`});
        }
    );
});

router.patch('/:id', (req, res, next)=>{

    List.findOneAndUpdate({_id: req.params.id}, 
    {
        title: req.body.title,
        position: req.body.position,
        boardId: req.body.boardId,
        startups: req.body.startups
    }).then(function(){
        res.json({ message: `list updated`});
    });
});

router.delete('/:id', (req, res, next)=>{
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