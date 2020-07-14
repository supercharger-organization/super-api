
// Inclusion of the mongodb jazz
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FKHelper = require('./helpers/foreign-key-helper');

// Attempting to consolidate all card types into the one card class:
// I plan on just making the schema have the potential to include all possible sub objs it can hold and helper methods will determine 
// what data is present and how to format itself.      - Daniel Ingram

const NoteSchema = Schema({
    // ~~~~~~ Universal Schema Contents:
    // Standard ID decleration
    //id: mongoose.ObjectIds,
    // Two easy to add things that we may never use but are nice to setup from the start just in case
    living:  { type: Boolean, default: true }, // Will allow for deletion recovery in the future
    updated: { type: Date, default: Date.now },



    // ~~~~~~ Custom Schema Contents:
    // Location of card on column
    title:{
        type: String,
        required: false,
        maxlength: 50,
        minlength: 0,
        default: "N/A"
    },
    note: {
        type: String,
        required: false,
        maxlength: 500,
        minlength: 0,
        default: "N/A"
    },

    // FOREIGN KEYS:
    cardId: {
        type: Schema.Types.ObjectId,
        default: undefined
    },
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
	},
    teamId: {
		type: Schema.ObjectId,
		ref: 'teams',
		validate: {
			isAsync: true,
			validator: function(v) {
				return FKHelper(mongoose.model('teams'), v);
			},
			message: `Team doesn't exist`
		}
	},
    authorAccountId: {
		type: Schema.ObjectId,
		ref: 'user_accounts',
		validate: {
			isAsync: true,
			validator: function(v) {
				return FKHelper(mongoose.model('user_accounts'), v);
			},
			message: `User doesn't exist`
		}
	},

    
    // These foreign keys havent been approved for rev 1 but here they are just because:
    // With the intent to eventually be able to leave notes on boards
    boardId: {
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
    // With the intent to eventually be able to leave notes on columns
    columnId: {
		type: Schema.ObjectId,
		ref: 'columns',
		validate: {
			isAsync: true,
			validator: function(v) {
				return FKHelper(mongoose.model('boards'), v);
			},
			message: `Board doesn't exist`
		}
	},
})

const Note = module.exports = mongoose.model('Note', NoteSchema);