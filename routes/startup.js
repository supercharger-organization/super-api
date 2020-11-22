const express = require('express');
const router = express.Router();
const Startup = require('../models/startup')
const Feature = require('../models/feature')
const Patent = require('../models/patent');
const { json } = require('body-parser');

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
    var rawStartup = req.body.startup;
    // If no object return an error message
    if (rawStartup == null)
    {
        res.json({ message: "ERROR!! Please add a json object \"startup\" to the post body"})
    }
    else{
        if (!rawStartup._id){
            var startup = new Startup(rawStartup);
        }
        else{
            var startup = rawStartup;
        }
        // if passed object do a lookup of it. if doesnt exist save as is, overwrite if found. return complete new document
        Startup.findOneAndUpdate({_id: startup._id}, startup, {new: true, upsert: true, overwrite:true}, function(err, doc){
            res.json({ err: err, currentObject: doc, message: "Transaction complete!"})
        });
    }
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





/*
// Test method for update process! Keep commented out
router.get('/test', (req, res, next)=>{
    var rawTestStartup = {
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
        features: [{title: "Feature Title", description: "Feature Description"}, {title: "Feature Title 2", description: "Feature Description 2"}],
        patents:[{title: "Feature Title", description: "Feature Description"}, {title: "Feature Title", description: "Feature Description"}]
    };
    if (!rawTestStartup._id){
        var TestStartup = new Startup(rawTestStartup);
    }
    else{
        var TestStartup = rawTestStartup;
    }
        // if passed object do a lookup of it. if doesnt exist save as is, overwrite if found. return complete new document
        Startup.findOneAndUpdate({_id: TestStartup._id}, rawTestStartup, {new: true, upsert: true, overwrite:true}, function(err, doc){
            console.log("Doc Response 1 on new input:");
            console.log(doc);
            doc.name = "CHANGED STARTUP NAME";
            doc.patents[0].title = "Changed patent property!!";
            Startup.findOneAndUpdate({_id: doc._id}, doc, {new: true, upsert: true, overwrite:true}, function(err, doc){
                console.log("_________");
                console.log("Doc Response 2 on updated object:");
                console.log(doc);
                res.json({ err: err, currentObject: doc, message: "Transaction complete!"});
            });
        });
});*/