const express = require('express');
const router = express.Router();
const Startup = require('../models/startup')

router.get('/all', (req, res, next)=>{
    Startup.find(function(err, Startups){
        res.json(Startups)
    })
});

router.get('/template', (req, res, next)=>{
    let newStartup = new Startup({
        name: "StartupName",
        description: "Description!",
        location: "Location",
        websiteURL: "www.mywebsite.com",
        employeeCount: 0,
        funding: "$xx,xxx",
        cac:"CAC Value",
        monthlyRevenue:"$xx,xxx",
        monthlyBurnRate:"$xx,xxx",
        founder: "John Smith",
        founderBackground: "Background",
        founderEmail:"email@gmail.com",
        initialDiligence: "initialDiligence",
        notableInvestors: ["Jane Doe", "S. Clause"],
        industryTags: ["Mean Stack", "Agile Development"],
        customNoteIds: [undefined],
    })
    res.json(newStartup);
});

// Return just the startup matching the id passed
router.get('/:_id', (req, res, next)=>{
    //console.log("ID Passed: " + req.params._id);
    Startup.find({_id: req.params._id}, function(err,startup){
        //console.log("Obj Found: ");
        //console.log(card);
        if (startup) {
            res.json(startup);
        } else {
            res.json({ message: `item ${req.params._id} doesn't exist`})
        }
    });
});

router.post('/post', (req, res, next)=>{
    let newStartup = new Startup({
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
        websiteURL: req.body.websiteURL,
        employeeCount: req.body.employeeCount,
        funding: req.body.funding,
        founder: req.body.founder,
        founderBackground: req.body.founderBackground,
        notableInvestors: req.body.notableInvestors,
        industryTags: req.body.industryTags,
        customNoteIds: req.body.customNoteIds,
    })

    newStartup.save((err, startup)=>{
        if (err){
            res.json({msg: "Failed to add startup"});
        }
        else {
            res.json({msg: "Startup added successfully"});
        }
    })
});

router.delete('/delete/:id', (req, res, next)=>{
    Startup.remove({_id: req.params.id}, function(err, result){
        if (err){
            res.json(err)
        }
        else {
            res.json(result)
        }
    })
});



module.exports = router;