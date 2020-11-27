// Inclusion of the mongodb jazz
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FKHelper = require('./helpers/foreign-key-helper');
// Inclusion of all possible sub items
//const Card = require('./deprecated/card');
const Note = require('./note');

const ListSchema = Schema({
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
    // Location of column on board
    position:{ 
        type: Number,
        default: -1
    },
    
    // FOREIGN KEYS:
    // Must belong to a board object!
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
    // Child items of this object
    // Startup position is stored on the cards and must be updated each move
    startups: [{
		type: Schema.ObjectId,
        ref: 'startups',
		validate: {
			isAsync: true,
			validator: function(v) {
				return FKHelper(mongoose.model('startups'), v);
			},
			message: `Card doesn't exist`
		}
    }] // Note, this is how we store an array of object IDs as a member variable
    
});

const List = module.exports = mongoose.model('list', ListSchema);