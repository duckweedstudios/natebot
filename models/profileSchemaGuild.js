const mongoose = require('mongoose');

const profileSchemaGuild = new mongoose.Schema({
	serverId: { type: String, require: true, unique: true },
	condemnedMember: { type: String, require: true },
	newSoulMade: { type: Boolean, default: false },
	settings: {
		paused: { type: Boolean, default: false },
		condemnedRoleId: { type: String },
		channelId: { type: String },
		modRoles: { type: String },
	},
	schedule: {
		next: {
			time: { type: Date },
			soulTypeId : { type: String },
		},
		past: {
			time: { type: Date },
			soulTypeId : { type: String },
		},
		meanDelay: { type: Number, default: 1440 },
		variation: { type: Number, default: 5 },
	},
	stats: {
		serverSoulsCaught: { type: Number, default: 0 },
		hauntingsCount: { type: Number, default: 0 },
		soulsCreated: { type: Number, default: 0 },
		lastCondemnedMember: { type: Number, default: 0 },
	},
});

const model = mongoose.model('ProfileModelsGuild', profileSchemaGuild);

module.exports = model;