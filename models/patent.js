
// Inclusion of the mongodb jazz
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FKHelper = require('./helpers/foreign-key-helper');

const PatentSchema = Schema({
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
    },

    // FOREIGN KEYS:
    startupId: {
		type: Schema.ObjectId,
		ref: 'startup',
		validate: {
			isAsync: true,
			validator: function(v) {
				return FKHelper(mongoose.model('startup'), v);
			},
			message: `Startup doesn't exist`
		}
	}
})

const Patent = module.exports = mongoose.model('Patent', PatentSchema);