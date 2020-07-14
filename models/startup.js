// Inclusion of the mongodb jazz
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FKHelper = require('./helpers/foreign-key-helper');

const Note = require('../models/note');

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
        maxlength: 60,
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
    funding:{
        type: String,
        required: false,
        maxlength: 24,
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

    // FOREIGN KEYS:
    // Child items of this object
    customNotes: [Schema.Types.ObjectId],  // Stores the IDs of the notes made by teams on their startup data
})

const Startup = module.exports = mongoose.model('startups', StartupSchema);