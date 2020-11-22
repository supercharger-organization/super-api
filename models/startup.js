// Inclusion of the mongodb jazz
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FKHelper = require('./helpers/foreign-key-helper');

const Note = require('../models/note');
const Patent = require('../models/patent');
const Feature = require('../models/feature');

const StartupSchema = Schema({
    // ~~~~~~ Universal Schema Contents:
    // Standard ID decleration
    //id: mongoose.ObjectIds,
    // Two easy to add things that we may never use but are nice to setup from the start just in case
    living:  { type: Boolean, default: true }, // Will allow for deletion recovery in the future
    updated: { type: Date, default: Date.now },

    // ~~~~~~ Custom Schema Contents:
    // Default properties specific to just this item
    name:{
        type: String,
        required: true,
        maxlength: 50,
        minlength: 4
    },
    yearFounded:{
        type: String,
        required: true,
        maxlength: 50,
        minlength: 4
    },
    oracleIntegration:{
        type: Boolean,
        default: false,
        required: false
    },
    sapAppIntegration:{
        type: Boolean,
        default: false,
        required: false
    },
    description:{
        type: String,
        required: false,
        maxlength: 500,
        minlength: 0,
        default: "N/A"
    },
    initialDiligence:{
        type: String,
        required: false,
        maxlength: 800,
        minlength: 0,
        default: "N/A"
    },
    location:{
        type: String,
        required: false,
        maxlength: 200,
        minlength: 0,
        default: "N/A"
    },
    websiteURL:{
        type: String,
        required: false,
        maxlength: 60,
        minlength: 0,
        default: "N/A"
    },
    employeeCount:{
        type: String,
        required: false,
        maxlength: 24,
        minlength: 0,
        default: "N/A"
    },
    industryScore:{
        type: String,
        required: false,
        maxlength: 24,
        minlength: 0,
        default: "N/A"
    },
    funding:{
        type: String,
        required: false,
        maxlength: 24,
        minlength: 0,
        default: "N/A"
    },
    lastFunding:{
        type: String,
        required: false,
        maxlength: 50,
        minlength: 0,
        default: "N/A"
    },
    cac:{
        type: String,
        required: false,
        maxlength: 24,
        minlength: 0,
        default: "N/A"
    },
    pricing:{
        type: String,
        required: false,
        maxlength: 40,
        minlength: 0,
        default: "N/A"
    },
    monthlyRevenue:{
        type: String,
        required: false,
        maxlength: 24,
        minlength: 0,
        default: "N/A"
    },
    monthlyBurnRate:{
        type: String,
        required: false,
        maxlength: 24,
        minlength: 0,
        default: "N/A"
    },
    founders:[{
        type: String,
        required: false,
        maxlength: 200,
        minlength: 0,
        default: "N/A"
    }],
    employeeNames:[{
        type: String,
        required: false,
        maxlength: 200,
        minlength: 0,
        default: "N/A"
    }],
    founderBackground:{
        type: String,
        required: false,
        maxlength: 500,
        minlength: 0,
        default: "N/A"
    },
    founderEmail:{
        type: String,
        required: false,
        maxlength: 500,
        minlength: 0,
        default: "N/A"
    },
    founderName:{
        type: String,
        required: false,
        maxlength: 200,
        minlength: 0,
        default: "N/A"
    },
    // NOTE: In revision 1, investors and tags aren't formalized but are instead just strings saved in an array

    // This is an array of string items with the given characteristics:
    notableInvestors: [{
        type: String,
        required: false,
        maxlength: 200,
        minlength: 0,
        default: "N/A"
    }],
    notableCustomers: [{
        type: String,
        required: false,
        maxlength: 200,
        minlength: 0,
        default: "N/A"
    }],

    // This is an array of string items with the given characteristics:
    industryTags: [{
        type: String,
        required: false,
        maxlength: 200,
        minlength: 0,
        default: "N/A"
    }],

    techStackTags: [{
        type: String,
        required: false,
        maxlength: 200,
        minlength: 0,
        default: "N/A"
    }],

    tags: [{
        type: String,
        required: false,
        maxlength: 200,
        minlength: 0,
        default: "N/A"
    }],

    // New image URL fields
    /*pitchDeckImgUrls: string[] -> {bucket}/imgs/pitchDeckImgs/{fileName}
	pagerImgUrl: string -> {bucket}/pagerImgs/{fileName}
	startupImgUrl: string -> {bucket}/startupImgs/{fileName}
	historyImgUrl: string -> {bucket}/historyImgs/{fileName}
	customerImgUrls: string[] -> {bucket}/customerImgs/{fileName}*/

    // single image urls
    pagerImgUrl: {
        type: String,
        required: false,
        maxlength: 200,
        minlength: 0,
        default: "N/A"
    },
    startupImgUrl: {
        type: String,
        required: false,
        maxlength: 200,
        minlength: 0,
        default: "N/A"
    },
    historyImgUrl: {
        type: String,
        required: false,
        maxlength: 200,
        minlength: 0,
        default: "N/A"
    },
    
    // Not implemented yet
    videoUrl: {
        type: String,
        required: false,
        maxlength: 200,
        minlength: 0,
        default: "N/A"
    },

    patents: [Schema({
            living:  { type: Boolean, default: true }, // Will allow for deletion recovery in the future
            updated: { type: Date, default: Date.now },
        
            title:{
                type: String,
                required: false,
                maxlength: 50,
                minlength: 0,
                default: "N/A"
            },
            number:{
                type: String,
                required: false,
                maxlength: 50,
                minlength: 0,
                default: "N/A"
            },
            abstract: {
                type: String,
                required: false,
                maxlength: 1000,
                minlength: 0,
                default: "N/A"
            },
            type:{
                type: String,
                required: false,
                maxlength: 50,
                minlength: 0,
                default: "N/A"
            },
            filled:{
                type: String,
                required: false,
                maxlength: 50,
                minlength: 0,
                default: "N/A"
            },
            date:{
                type: String,
                required: false,
                maxlength: 50,
                minlength: 0,
                default: "N/A"
            }
        })],
    
    features: [Schema({
            living:  { type: Boolean, default: true }, // Will allow for deletion recovery in the future
            updated: { type: Date, default: Date.now },
            title:{
                type: String,
                required: false,
                maxlength: 50,
                minlength: 0,
                default: "N/A"
            },
            description: {
                type: String,
                required: false,
                maxlength: 500,
                minlength: 0,
                default: "N/A"
            }
        })],

    // Image url arrays
    pitchDeckImgUrls: [{
        type: String,
        required: false,
        maxlength: 200,
        minlength: 0,
        default: "N/A"
    }],
    customerImgUrls: [{
        type: String,
        required: false,
        maxlength: 200,
        minlength: 0,
        default: "N/A"
    }],
    // FOREIGN KEYS:
    // Child items of this object
    customNotes: [Schema.Types.ObjectId],  // Stores the IDs of the notes made by teams on their startup data
})


const Startup = module.exports = mongoose.model('startups', StartupSchema);