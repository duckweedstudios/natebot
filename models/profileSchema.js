const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    fetcherTag:{type: String, require: true},
    fetcherID: {type: String, require: true, unique: true},
    serverID:{type: String, require:true},
    souls:{type: Number, default: 0},
    soulcage:{type: Number},
    careersouls:{type: Number}
});

const model = mongoose.model('ProfileModels', profileSchema);

module.exports = model; 