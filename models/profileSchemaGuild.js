const mongoose = require('mongoose');

const profileSchemaGuild = new mongoose.Schema({
	serverName: { type: String, require: true },
	serverID: { type: String, require: true },
	condemnedMember: { type: String, require: true },
	condemnedMemberTag: { type: String },
	paused: { type: Boolean, default: false },
	setup: { type: Boolean, default: false },
	schedule: {
		nextAppearance: Date,
		pastAppearance: Date,
		meanDelay: Number,
		variation: Number,
	},
});

const model = mongoose.model('ProfileModelsGuild', profileSchemaGuild);

module.exports = model;