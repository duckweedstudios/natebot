//const joinOnInterval = require('./actions/joinOnInterval.js');
const testingHauntings = require('../actions/testingHauntings.js');
module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        //setInterval(joinOnInterval(client), 45000);
        testingHauntings.beginRepeatingTest(client);
    }
}