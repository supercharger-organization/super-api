// Inclusion of the mongodb jazz
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FKHelper = require('./helpers/foreign-key-helper');

const UserAccountSchema = Schema({
    // ~~~~~~ Universal Schema Contents:
    // Standard ID decleration
    //id: mongoose.ObjectIds,
    // Two easy to add things that we may never use but are nice to setup from the start just in case
    living:  { type: Boolean, default: true }, // Will allow for deletion recovery in the future
    updated: { type: Date, default: Date.now },


    // ~~~~~~ Custom Schema Contents:
    // Default properties specific to just this item
    userName:{
        type: String,
        required: true,
        maxlength: 30,
        minlength: 4
    },
    password:{
        type: String,
        required: true,
        maxlength: 30,
        minlength: 6
    },

    // FOREIGN KEYS:
    // Child items of this object
    // The user objects only connection to all of their data in rev one is through their subscibed teams. 
    // The team obj itself technically owns all generated cards/columns/boards/etc
    subscribedTeams: [{
		type: Schema.ObjectId,
		ref: 'teams',
		validate: {
			isAsync: true,
			validator: function(v) {
				return FKHelper(mongoose.model('teams'), v);
			},
			message: `Team doesn't exist`
		}
	}], // Note, this is how we store an array of object IDs as a member variable
})

const UserAccount = module.exports = mongoose.model('user_accounts', UserAccountSchema);