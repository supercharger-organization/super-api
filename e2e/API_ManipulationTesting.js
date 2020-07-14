// Inclusion of the mongodb jazz
const mongoose = require('mongoose');
const assert = require('assert');
const Schema = mongoose.Schema;

//const Card = require('../models/card');
const Note = require('../models/note');
const List = require('../models/list');
const User = require('../models/user_account');
const Team = require('../models/team');
const Startup = require('../models/startup');

console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
console.log("WARNING! Running API Manipulation Testing Script");
mongoose.connect('mongodb://mongo:27017/SDB_Testing')
console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
/*describe('Removing existing Startups', function(){
    it('Deleting Startups...', function(done)
    {
        Startup.remove({}, function(){
            done();
        });
    });
});*/
describe('Generating Sample Records', function(){
    it('Generating All Startup Items', function(done)
    {
        console.log("Generating Sample card with attached startup...");
        var lisnrStartup = new Startup({
            "name": "Lisnr",
            "location": "Oakland, CA, USA",
            "websiteURL": "https://lisnr.com/",
            "description": "LISNR powers transactions across the customer journey globally with the most advanced Ultrasonic Data Transfer Platform. Today, companies like Jaguar Land Rover, Ticketmaster, and Visa use this solution to create secure & frictionless moments for consumers around the world.",
            "industryTags": ["Audio", "Automotive", "Internet of Things"],
            "employeeCount": "Nov-50",
            "funding": "$30,000,000",
            "founders": ["Chris Ostoich", "Chris Ridenour", "Josh Glick", "Nikki Ridenour", "Rodney Williams"],
            "founderBackground": "Ohio State, WVU, and University of Cincinnati graduates with backgrounds at P&G, Lockheed Martin, and Intell",
            "founderEmail": "jonvogel@lisnr.com",
            "notableInvestors": ["Jump Capital", "Techstars", "Visa"],
            "notablCustomers": ["Toyota", "GM"],
            "techStackTags": ["mongoDB", "express", "angular JS", "Node JS"],
            "oracleIntegration": true,
            "sapAppIntegration": false,
            "cac": "$5,500",
            "monthlyBurnRate": "$56,000 ",
            "monthlyRevenue": "$100,000 ",
            "initialDiligence": "LISNR's payments and authentication technology, based on inaudible ultrasound waves, is more secure than other forms of contactless payments like QR codes that can be easily copied, while also requireing less expensive hardware for vendors to purchase. Using sound in payments and authentication is not new. The military as well as top cyber security companies have been using frequencies as a means to communicate between devices or to transmitt data for a while now. However its application in civilian technologies and contactless payments is new and especially useful given the pandemic environment."
        });
        lisnrStartup.save().then(function(){
            Startup.findOne({"name": "Lisnr"}).then(function(result){
                if (result){
                    console.log("Found Saved Startup!");
                    newCard.startup = result._id;
                    newCard.save().then(function(){
                        done();
                    });
                }
            });
        });
    });
});