
// Inclusion of the mongodb jazz
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FKHelper = require('./helpers/foreign-key-helper');

// Inclusion of all possible sub items
const Card = require('./deprecated/card');
const Note = require('../models/note');
const Column = require('./list');
const User = require('../models/user_account');
const Team = require('../models/team');

const BoardSchema = Schema({
    // ~~~~~~ Universal Schema Contents:
    // Standard ID decleration
    //id: mongoose.ObjectIds,
    // Two easy to add things that we may never use but are nice to setup from the start just in case
    living:  { type: Boolean, default: true }, // Will allow for deletion recovery in the future
    updated: { type: Date, default: Date.now },


    // ~~~~~~ Custom Schema Contents:
    // Default properties specific to just this item
    title:{
        type: String,
        required: true,
        maxlength: 50,
        minlength: 4
    },

    // FOREIGN KEYS:
    // Must belong to a board object!
    team: {
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
    // Must have an author!
    author: {
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
    // Child items of this object
    // Card position is stored on the cards and must be updated each move
    /*cards: [{
		type: Schema.ObjectId,
		ref: 'cards',
		validate: {
			isAsync: true,
			validator: function(v) {
				return FKHelper(mongoose.model('cards'), v);
			},
			message: `Card doesn't exist`
		}
	}],*/ // Note, this is how we store an array of object IDs as a member variable
    lists: [{
		type: Schema.ObjectId,
		ref: 'list',
		validate: {
			isAsync: true,
			validator: function(v) {
				return FKHelper(mongoose.model('list'), v);
			},
			message: `List doesn't exist`
		}
	}],
    notes: [{
		type: Schema.ObjectId,
		ref: 'notes',
		validate: {
			isAsync: true,
			validator: function(v) {
				return FKHelper(mongoose.model('notes'), v);
			},
			message: `Note doesn't exist`
		}
	}],
    users: [{
		type: Schema.ObjectId,
		ref: 'user_accounts',
		validate: {
			isAsync: true,
			validator: function(v) {
				return FKHelper(mongoose.model('user_accounts'), v);
			},
			message: `User doesn't exist`
		}
	}],
})

const Board = module.exports = mongoose.model('boards', BoardSchema);