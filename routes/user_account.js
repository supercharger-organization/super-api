const express = require('express');
const router = express.Router();
const User = require('../models/user_account')

router.get('/', (req, res, next)=>{
    User.find(function(err, Users){
        res.json(Users)
    })
});

router.get('/template', (req, res, next)=>{
    let newUser = new User({
        userName: "TemplateUser",
        password: "TemplatePassword",
        subscribedTeams: [undefined],
    });
    res.json(newUser);
});

// Return just the note matching the id passed
router.get('/:id', (req, res, next)=>{
    //console.log("ID Passed: " + req.params._id);
    User.find({_id: req.params.id}, function(err,user){
        //console.log("Obj Found: ");
        //console.log(card);
        if (user) {
            res.json(user);
        } else {
            res.json({ message: `item ${req.params._id} doesn't exist`})
        }
    });
});

router.post('/validate', (req, res, next)=>{
    //console.log(req.body);
    User.findOne({userName: req.body.userName}, function(err,userNameFound){
        if (userNameFound) {
            User.findOne({userName: req.body.userName, password: req.body.password}, function(err,passwordMatches){
                if (passwordMatches) {
                    res.json(passwordMatches);
                } else {
                    res.json({ message: `Incorrect Password`});
                }
            });
        } else {
            res.json({ message: `Username Not Found`});
        }
    });
});


router.post('/', (req, res, next)=>{
    let newUser = new User({
        userName: req.body.userName,
        password: req.body.password,
        subscribedTeams: req.body.subscribedTeams,
    })

    newUser.save((err, user)=>{
        if (err){
            res.json({msg: "Failed to add User"});
        }
        else {
            res.json({msg: "User added successfully"});
        }
    })
});

router.delete('/:id', (req, res, next)=>{
    User.remove({_id: req.params.id}, function(err, result){
        if (err){
            res.json(err)
        }
        else {
            res.json(result)
        }
    })
});

module.exports = router;