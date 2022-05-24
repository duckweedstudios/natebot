const joinOnInterval = require('./functions/joinOnInterval.js');
module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        //setInterval(joinOnInterval(client), 45000);
    }
}