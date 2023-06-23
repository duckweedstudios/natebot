const { clientId } = require('../config.json');
const axios = require('axios').default;

module.exports = {
	name: 'deleteInteraction',
	deleteInteraction : async (token) => {
		try {
			// Retrieves Token
			const interactionToken = token;
			// Patches Message with Data
			return await axios
				.delete(`https://discord.com/api/v8/webhooks/${clientId}/${interactionToken}/messages/@original`);
		} catch (error) {
			return;
		}
	},
};