// Inclusion of the mongodb jazz
const mongoose = require('mongoose');
const assert = require('assert');
const Schema = mongoose.Schema;

//const Card = require('../models/deprecated/card');
const Note = require('../models/note');
const List = require('../models/list');
const UserAccount = require('../models/user_account');
const Team = require('../models/team');
const Startup = require('../models/startup');
const Board = require('../models/board');
const board = require('../models/board');
const { count, log } = require('console');

console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
console.log("WARNING! Running API Manipulation Testing Script");
mongoose.connect('mongodb://localhost:27017/SDB_Testing')

mongoose.connection.on('connected', ()=>{
    console.log('Connected to database mongodb @ 27017');
});
mongoose.connection.on('error', (err)=>{
    if (err){
        console.log('Error in database connection: ', err)
    }
});


describe('Resetting All child objects', function(){
    it('Deleting Teams...', function(done)
    {
        Team.remove({}, function(){
            done();
        });
    });
    it('Deleting Lists...', function(done)
    {
        List.remove({}, function(){
            done();
        });
    });
    it('Deleting Boards...', function(done)
    {
        Board.remove({}, function(){
            done();
        });
    });
    it('Deleting Users...', function(done)
    {
        UserAccount.remove({}, function(){
            done();
        });
    });
    it('Deleting Notes...', function(done)
    {
        Note.remove({}, function(){
            done();
        });
    });
});

describe('Generating Sample Data for demo', function()
{
    it('Generating a series of teams', function(done)
    {
        console.log("Generating Sample Team...");
        var newTeam = new Team({
            teamName: "CHTA Ventures",
        });
        newTeam.save().then(function(){
            done();
        });
    });
    it('Generating a series of users', function(done)
    {
        console.log("Generating Sample Users...");
        Team.find(function(err, Teams){
            var teamID = Teams[0]._id;
            var newUser1 = new UserAccount({
                "userName": "DanielIngram9",
                "password": "scadmin",
                "subscribedTeams": [teamID]
            });
            var newUser2 = new UserAccount({
                "userName": "Matthew_Keri38",
                "password": "scadmin",
                "subscribedTeams": [teamID]
            });
            var newUser3 = new UserAccount({
                "userName": "RobRossili8",
                "password": "scadmin",
                "subscribedTeams": [teamID]
            });
            //I'll give the administrator ownership of all of the components
            var adminUser = new UserAccount({
                "userName": "Administrator",
                "password": "scadmin",
                "subscribedTeams": [teamID]
            });
            

            newUser1.save();
            newUser2.save();
            newUser3.save();
            adminUser.save().then(function(){
                done();
            });
        });
    });
    it('Generating sample boards', function(done)
    {
        Team.find(function(err, Teams){
            var teamID = Teams[0]._id;
            console.log("Generating Boards...");
            var newBoard1 = new Board({
                title: "Primary Venture Interests",
                team: teamID
            });
            var newBoard2 = new Board({
                title: "Secondary Venture Interests",
                team: teamID
            });
            //Saves the 2 new boards
            newBoard1.save().then(function(){
                newBoard2.save();
                    // Adds these 2 boards to the team
                done();
            });
            
        });
    });
    it('Generating lists for sample board', function(done)
    {
        var list1 = new List({
            title: "List Title 1"
        });
        var list2 = new List({
            title: "List Title 2"
        });
        var list3 = new List({
            title: "List Title 3"
        });
        var list4 = new List({
            title: "List Title 4"
        });
        var list5 = new List({
            title: "List Title 5"
        });
        var list6 = new List({
            title: "List Title 6"
        });
        list1.save();
        list2.save();
        list3.save();
        list4.save();
        list5.save();
        list6.save();
        done();
    });
    it('Appending boards to team', function(done)
    {
        Board.find(function(err, Boards){
            Team.find(function(err, Teams)
            {
                for (var x=0; x<Boards.length; x++)
                {
                    Teams[0].boardIds.push(Boards[x]._id);
                }
                Teams[0].save();
                done();
            });
        });
    });
    it('Appending lists to board 1', function(done)
    {
        Board.find(function(err, Boards){
            List.find(function(err, Lists)
            {
                for (var x=0; x<Lists.length; x++)
                {
                    Boards[0].lists.push(Lists[x]._id);
                }
                Boards[0].save();
                done();
            });
        });
    });
    it('Appending existing startups to all lists', function(done)
    {
        Startup.find(function(err, Startups){
            //console.log(Boards);
            List.find(function(err, Lists)
            {
                for (var x=0; x<Startups.length; x++)
                {
                    for (var y=0; y<Lists.length; y++)
                    {
                        Lists[y].startups.push(Startups[x]);
                        x++;
                    }
                    x--;
                }

                // Save all of the lists
                for (var x=0; x<Lists.length; x++)
                {
                    Lists[x].save();
                }
                done();
            });
        });
    });
});
