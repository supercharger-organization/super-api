// Here is just a custom route so we can debug simple things with the api
// and also to help practice route generation.

const express = require('express');
const router = express.Router();

router.get('/AnybodyHome', (req, res, next)=>{
    res("Mr World Wide comin at ya live from the 305!");
});

router.get('/GimmeYoRutesDan', (req, res, next)=>{
    // Just a place I can update and put the routes currently available from my api
    CurrentRoutes = 
    [{Route:"{Any Object Name}/all", Description:"Gets all objects of that type"},
    {Route:"{Any Object Name}/post", Description:"Adds a new object of that type to the database"},
    {Route:"{Any Object Name}/template", Description:"Returns a template object with default values"},
    {Route:"{Any Object Name}/delete/{That Object Id}", Description:"Deletes that object by ID from the database WARNING: Not reversable"},
    {Route:"{Any Object Name}/{That Object Id}", Description:"Searches for that type of obj by ID"},
    {Route:"{Any Object Name}/{That Object Id}/w_children", Description:"Searches for that type of obj by ID, loads the children objects in the place of the children IDs"}
    ];
    res.json(CurrentRoutes);
});


module.exports = router;