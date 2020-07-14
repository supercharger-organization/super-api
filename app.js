var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();

const board = require("./routes/board");
const list = require("./routes/list");
const debug = require("./routes/debug");
const note = require("./routes/note");
const startup = require("./routes/startup");
const team = require("./routes/team");
const user_account = require("./routes/user_account");

mongoose.connect(`mongodb://${process.env.HOST}/SDB_Testing`);

mongoose.connection.on('connected', ()=>{
    console.log('Connected to database mongodb @ 27017');
})

mongoose.connection.on('error', (err)=>{
    if (err){
        console.log('Error in database connection: ', err)
    }
})

app.use(cors());

app.use(bodyparser.json());

//app.use(express.static(path.join(__dirname, 'public')));
// Its all an api  app.use('/api', route);
app.use('/debug', debug);
app.use('/board', board);
app.use('/list', list);
app.use('/note', note);
app.use('/startup', startup);
app.use('/team', team);
app.use('/user', user_account);

// Plan on implementing a testing script right here for some 
// entry level testing

// Set to true in order to print json object structures of models
var isDebugging = false;
if (isDebugging) 
{
    //app.use('/e2e/API_ManipulationTesting');
}


app.get('/', (req, res)=>{
    res.send('Comin at ya live, mr 305 from yo working express api')
})

app.listen(process.env.PORT,()=>{
    console.log('Server started at port: ' + process.env.PORT)
})
