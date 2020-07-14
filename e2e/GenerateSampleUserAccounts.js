// Inclusion of the mongodb jazz
const mongoose = require('mongoose');
const assert = require('assert');
const Schema = mongoose.Schema;

const Card = require('../models/deprecated/card');
const Note = require('../models/note');
const List = require('../models/list');
const UserAccount = require('../models/user_account');
const Team = require('../models/team');
const Startup = require('../models/startup');

console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
console.log("WARNING! Running API Manipulation Testing Script");
mongoose.connect('mongodb://mongo:27017/SDB_Testing')

mongoose.connection.on('connected', ()=>{
    console.log('Connected to database mongodb @ 27017');
})

mongoose.connection.on('error', (err)=>{
    if (err){
        console.log('Error in database connection: ', err)
    }
})
console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

describe('Removing existing Users', function(){
    it('Deleting Users...', function(done)
    {
        UserAccount.remove({}, function(){
            done();
        });
    });
});

describe('Generating Sample Users for demo', function(){
    it('Generating a series of users for the database', function(done)
    {
        console.log("Generating Sample Users...");
        var newUser1 = new UserAccount({
            "userName": "DanielIngram9",
            "password": "admin20"
        });
        var newUser2 = new UserAccount({
            "userName": "Matthew_Keri38",
            "password": "admin20",
        });
        var newUser3 = new UserAccount({
            "userName": "RobRossili8",
            "password": "admin20",
        });
        var newUser4 = new UserAccount({
            "userName": "Administrator",
            "password": "admin20",
        });
        newUser1.save();
        newUser2.save();
        newUser3.save();
        newUser4.save();
        done();
    });
});