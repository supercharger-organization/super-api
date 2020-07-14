// Inclusion of the mongodb jazz
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FKHelper = require('./helpers/foreign-key-helper');

const TeamSchema = Schema({
    // ~~~~~~ Universal Schema Contents:
    // Standard ID decleration
    //id: mongoose.ObjectIds,
    // Two easy to add things that we may never use but are nice to setup from the start just in case
    living:  { type: Boolean, default: true }, // Will allow for deletion recovery in the future
    updated: { type: Date, default: Date.now },

    // ~~~~~~ Custom Schema Contents:
    // Default properties specific to just this item
    teamName:{
        type: String,
        required: true,
        maxlength: 50,
        minlength: 4
    },

    // FOREIGN KEYS:
    // Must have a creator!
    ownerId:{
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
    boardIds: [{
		type: Schema.ObjectId,
		ref: 'boards',
		validate: {
			isAsync: true,
			validator: function(v) {
				return FKHelper(mongoose.model('boards'), v);
			},
			message: `Board doesn't exist`
		}
	}],
    memberIDs: [{
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

const Team = module.exports = mongoose.model('teams', TeamSchema);