const Startup = require('../startup');
const Note = require('../note');
const FKHelper = require('../helpers/foreign-key-helper');
// Inclusion of the mongodb jazz
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Attempting to consolidate all card types into the one card class:
// I plan on just making the schema have the potential to include all possible sub objs it can hold and helper methods will determine 
// what data is present and how to format itself.      - Daniel Ingram

const CardSchema = new Schema({
    // ~~~~~~ Universal Schema Contents:
    // Standard ID decleration
    //id: mongoose.ObjectIds, //Primary key IDs are automatically generated, and accessed through _id on init statement
    // Two easy to add things that we may never use but are nice to setup from the start just in case
    living:  { type: Boolean, default: true }, // Will allow for deletion recovery in the future
    updated: { type: Date, default: Date.now },

    // ~~~~~~ Custom Schema Contents:
    // Location of card on column
    position:{ 
        type: Number,
        default: -1
    },

    // FOREIGN KEYS:
    // Only really needs to store its id, the child ids and its position in whichever list (or column) its in
    board_id: {
		type: Schema.ObjectId,
		ref: 'boards',
		validate: {
			isAsync: true,
			validator: function(v) {
				return FKHelper(mongoose.model('boards'), v);
			},
			message: `Board doesn't exist`
		}
	},

    column_id: {
		type: Schema.ObjectId,
		ref: 'columns',
		validate: {
			isAsync: true,
			validator: function(v) {
				return FKHelper(mongoose.model('columns'), v);
			},
			message: `Column doesn't exist`
		}
	},
    startup: {
		type: Schema.ObjectId,
		ref: 'startup',
		validate: {
			isAsync: true,
			validator: function(v) {
				return FKHelper(mongoose.model('startup'), v);
			},
			message: `Startup doesn't exist`
		}
	},
    note: {
		type: Schema.ObjectId,
		ref: 'notes',
		validate: {
			isAsync: true,
			validator: function(v) {
				return FKHelper(mongoose.model('notes'), v);
			},
			message: `Note doesn't exist`
		}
	}
});

const Card = module.exports = mongoose.model('card', CardSchema);