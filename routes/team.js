const express = require('express');
const router = express.Router();
const Team = require('../models/team')

router.get('/all', (req, res, next)=>{
    Team.find(function(err, Teams){
        res.json(Teams)
    })
});

router.get('/template', (req, res, next)=>{
    let newTeam = new Team({
        teamName: "Team Name",
        ownerId: undefined,
        boardIds: [undefined],
        memberIDs: [undefined],
    });
    res.json(newTeam);
});

// Return just the note matching the id passed
router.get('/:_id', (req, res, next)=>{
    //console.log("ID Passed: " + req.params._id);
    Team.find({_id: req.params._id}, function(err,team){
        //console.log("Obj Found: ");
        //console.log(card);
        if (team) {
            res.json(team);
        } else {
            res.json({ message: `item ${req.params._id} doesn't exist`})
        }
    });
});

router.post('/post', (req, res, next)=>{
    let newTeam = new Team({
        teamName: req.body.teamName,
        ownerId: req.body.ownerId,
        boardIds: req.body.boardIds,
        memberIDs: req.body.memberIDs,
    })

    newTeam.save((err, team)=>{
        if (err){
            res.json({msg: "Failed to add Team"});
        }
        else {
            res.json({msg: "Team added successfully"});
        }
    })
});

router.delete('/delete/:id', (req, res, next)=>{
    Team.remove({_id: req.params.id}, function(err, result){
        if (err){
            res.json(err)
        }
        else {
            res.json(result)
        }
    })
});

module.exports = router;