const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
	fetcherTag:{ type: String, require: true },
	fetcherId: { type: String, require: true },
	serverId:{ type: String, require: true },
	// Souls is the amount of souls a user has
	souls:{ type: Number, default: 0 },

	// Souls caught this cycle (rarity)
	soulsCaught:{ type: Number },

	// Total of all souls caught (rarity)
	careerSouls:{ type: Number },

	// Count of times as condemned
	condemnedCount:{ type: Number, default: 0 },

	//  Souls with rarity and multiplier 
	soulXP:{ type: Number, default: 0 },

	// Souls caught without rarity
	fetchCount: { type: Number, default: 0 },

	// How many times they have been fooled
	gotFooledCount: { type: Number, default: 0 },

	// How many times they have fooled someone else
	fooledCount: { type: Number, default: 0 },

	// VC setting
	autoLure: { type: Boolean, default: false },
});

profileSchema.index({ fetcherId: 1, serverId: 1 }, { unique: true });

const model = mongoose.model('ProfileModels', profileSchema);

module.exports = model;