
// Inclusion of the mongodb jazz
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FKHelper = require('./helpers/foreign-key-helper');

const FeatureSchema = Schema({

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

const Feature = module.exports = mongoose.model('Feature', FeatureSchema);