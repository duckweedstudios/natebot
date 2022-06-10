module.exports = {
	name: 'getTarget',
	getTarget : (interaction) => {
		const target = interaction.client.usersCurrentTarget[interaction.user.id];
		return target;
	},
};