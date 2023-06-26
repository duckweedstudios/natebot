/*
	Altered

	Van Helsing
	Winchester
	Belmont
	Buffy
	Doomguy
	Ghostbuster
	Dante
	Kratos
	Geralt
	Ash Williams
	Hellboy

*/

const soulTiers = [
	{ level: 0, xp: 0, tierName: 'Fresh Soul Fetcher', tierColor: '#FFFFFF', tierQuote: '' },
	{ level: 1, xp: 1, tierName: 'Newbie Soul Fetcher', tierColor: '#FFFFFF', tierQuote: '' },
	{ level: 2, xp: 5, tierName: 'Rookie Soul Fetcher', tierColor: '#FFFFFF', tierQuote: '' },
	{ level: 3, xp: 9, tierName: 'Apprentince Soul Fetcher', tierColor: '#FFFFFF', tierQuote: '' },
	{ level: 4, xp: 13, tierName: 'Babbling Soul Fetcher', tierColor: '#FFFFFF', tierQuote: 'Aren\'t I lucky, to have survived so much bad luck.' },
	{ level: 5, xp: 25, tierName: 'Trained Soul Fetcher', tierColor: '#FFFFFF', tierQuote: '' },
	{ level: 6, xp: 40, tierName: 'Journeyman Soul Fetcher', tierColor: '#FFFFFF', tierQuote: '' },
	{ level: 7, xp: 56, tierName: 'Disturbed Soul Fetcher', tierColor: '#FFFFFF', tierQuote: '' },
	{ level: 8, xp: 80, tierName: 'Skilled Soul Fetcher', tierColor: '#FFFFFF', tierQuote: '' },
	{ level: 9, xp: 100, tierName: 'Intermediate Soul Fetcher', tierColor: '#FFFFFF', tierQuote: '' },
	{ level: 10, xp: 130, tierName: 'Short-Changed Soul Fetcher', tierColor: '#FFFFFF', tierQuote: '' }, // Nate birthday
	{ level: 11, xp: 175, tierName: 'Seasoned Soul Fetcher', tierColor: '#FFFFFF', tierQuote: '' },
	{ level: 12, xp: 225, tierName: 'Advanced Soul Fetcher', tierColor: '#FFFFFF', tierQuote: '' },
	{ level: 13, xp: 285, tierName: 'Masterful Soul Fetcher', tierColor: '#FFFFFF', tierQuote: '' },
	{ level: 14, xp: 333, tierName: 'Triplicate Soul Fetcher', tierColor: '#FFFFFF', tierQuote: '' },
	{ level: 15, xp: 404, tierName: 'Vanished Soul Fetcher', tierColor: '#FFFFFF', tierQuote: '' },
	{ level: 16, xp: 420, tierName: 'Hazy-Minded Soul Fetcher', tierColor: '#FFFFFF', tierQuote: 'Is something burning in here?', friendlyTierName: 'Dazed Soul Fetcher' },
	{ level: 17, xp: 456, tierName: 'Mystic Soul Fetcher', tierColor: '#FFFFFF', tierQuote: '' },
	{ level: 18, xp: 503, tierName: 'Tippling Soul Fetcher', tierColor: '#FFFFFF', tierQuote: 'Thankfully I already don\'t remember this...' }, // Will birthday
	{ level: 19, xp: 555, tierName: 'Incomprehensible Soul Fetcher', tierColor: '#FFFFFF', tierQuote: 'Everyone thinks I\'m just a one-eyed bloody monster' }, // these are both demoman quotes
	{ level: 20, xp: 619, tierName: 'Controverted Soul Fetcher', tierColor: '#FFFFFF', tierQuote: '' }, // Zade & mav birthday
	{ level: 21, xp: 666, tierName: '"Hell\'s Janitor"', tierColor: '#FFFFFF', tierQuote: '', friendlyTierName: 'Heck\'s Janitor' },
	{ level: 22, xp: 777, tierName: 'Shit-Out-of-Luck Soul Fetcher', tierColor: '#FFFFFF', tierQuote: '', friendlyTierName: 'Crap-Out-of-Luck Soul Fetcher' }, // these are honestly just funnier to me
	{ level: 23, xp: 808, tierName: 'Bumping Soul Fetcher', tierColor: '#FFFFFF', tierQuote: '' },
	{ level: 24, xp: 913, tierName: 'Meritorious Soul Fetcher', tierColor: '#FFFFFF', tierQuote: '' }, // Corey birthday
	{ level: 25, xp: 1013, tierName: 'Eldritch Soul Fetcher', tierColor: '#FFFFFF', tierQuote: '\'Snerdler garloid?\' What is this cockamamie bullshit?', friendlyTierQuote: '\'Snerdler garloid?\' What is this cockneeyed business?' }, // Jacob birthday
	{ level: 26, xp: 1111, tierName: 'Psychotic Soul Fetcher', tierColor: '#FFFFFF', tierQuote: 'Make a wish!' },
	{ level: 27, xp: 1223, tierName: 'Illiterate Soul Fetcher', tierColor: '#FFFFFF', tierQuote: 'Fail me twice... can\'t get failed again!' }, // Noah birthday
	{ level: 28, xp: 1313, tierName: 'Lovecraftian Soul Fetcher', tierColor: '#FFFFFF', tierQuote: '... and the oldest and strongest kind of fear is fear of the unknown...' },
	{ level: 29, xp: 1346, tierName: 'Disease-Addled Soul Fetcher', tierColor: '#FFFFFF', tierQuote: '' },
	{ level: 30, xp: 1575, tierName: 'Unrecognizable Soul Fetcher', tierColor: '#FFFFFF', tierQuote: '' },
	{ level: 31, xp: 1618, tierName: 'Dynastic Soul Fetcher', tierColor: '#FFFFFF', tierQuote: '' }, // mass death event in Chinese history
	{ level: 32, xp: 1666, tierName: '"Hell\'s Jerome"', tierColor: '#FFFFFF', tierQuote: '', friendlyTierName: 'Heck\'s Jerome' },
	{ level: 33, xp: 1692, tierName: 'Bewitched Soul Fetcher', tierColor: '#FFFFFF', tierQuote: '' }, // Salem witch trials
	{ level: 34, xp: 1777, tierName: 'Serendipitous Soul Fetcher', tierColor: '#FFFFFF', tierQuote: '' },
	{ level: 35, xp: 1863, tierName: 'Bloodied Soul Fetcher', tierColor: '#FFFFFF', tierQuote: '' }, // Battle of Gettysburg, deadliest in civil war
	{ level: 36, xp: 1914, tierName: '"The Dead"', tierColor: '#FFFFFF', tierQuote: '' }, // WWI
	{ level: 37, xp: 2000, tierName: 'World-Ending Soul Fetcher', tierColor: '#FFFFFF', tierQuote: '' },
	{ level: 38, xp: 2125, tierName: 'Enlightened Soul Fetcher', tierColor: '#FFFFFF', tierQuote: '' },
	{ level: 39, xp: 2222, tierName: 'Soul-Weaving Soul Fetcher', tierColor: '#FFFFFF', tierQuote: '' },
	{ level: 40, xp: 2400, tierName: 'Soul-Shattering Soul Fetcher', tierColor: '#FFFFFF', tierQuote: '' },
	{ level: 41, xp: 2600, tierName: 'Soul-Incinerating Soul Fetcher', tierColor: '#FFFFFF', tierQuote: 'Burn, baby, burn!' },
	{ level: 42, xp: 2800, tierName: 'Soul-Hungering Soul Fetcher', tierColor: '#FFFFFF', tierQuote: '' },
	{ level: 43, xp: 3000, tierName: 'Soul-Devouring Soul Fetcher', tierColor: '#FFFFFF', tierQuote: '' },
	{ level: 44, xp: 3333, tierName: 'Soul-Fueled Soul Fetcher', tierColor: '#FFFFFF', tierQuote: '' },
	{ level: 45, xp: 3500, tierName: 'Knight of Limbo', tierColor: '#FFFFFF', tierQuote: '' },
	{ level: 46, xp: 3800, tierName: '"Baron of Limbo', tierColor: '#FFFFFF', tierQuote: '' },
	{ level: 47, xp: 4200, tierName: '"Count of Limbo', tierColor: '#FFFFFF', tierQuote: '' },
	{ level: 48, xp: 4444, tierName: '"Duke of Limbo', tierColor: '#FFFFFF', tierQuote: '' },
	{ level: 49, xp: 4700, tierName: '"King of Limbo', tierColor: '#FFFFFF', tierQuote: '' },
	{ level: 50, xp: 5000, tierName: '"Emperor of Limbo', tierColor: '#FFFFFF', tierQuote: '' },
	{ level: 51, xp: 5555, tierName: '"Carving the Path', tierColor: '#FFFFFF', tierQuote: '' },
	{ level: 52, xp: 6000, tierName: '"Opening the Portal', tierColor: '#FFFFFF', tierQuote: '' },
	{ level: 53, xp: 6500, tierName: '"Stepping Beyond', tierColor: '#FFFFFF', tierQuote: '' },
	{ level: 54, xp: 7000, tierName: '"Satan\'s Plaything"', tierColor: '#FFFFFF', tierQuote: '', friendlyTierName: '"Stan\'s Plaything"', friendlyTierQuote: 'Don\'t ask who Stan is.' },
	{ level: 55, xp: 7200, tierName: 'Pact Scholar', tierColor: '#FFFFFF', tierQuote: '... I was studying the pact.' },
	{ level: 56, xp: 7400, tierName: 'Pact Writer', tierColor: '#FFFFFF', tierQuote: '' },
	{ level: 57, xp: 7600, tierName: 'Pact Editor', tierColor: '#FFFFFF', tierQuote: '' },
	{ level: 58, xp: 7800, tierName: 'Pact Author', tierColor: '#FFFFFF', tierQuote: '' },
	{ level: 59, xp: 8000, tierName: 'Pact Counsel', tierColor: '#FFFFFF', tierQuote: '' },
	{ level: 60, xp: 8200, tierName: 'Pact Arbitrator', tierColor: '#FFFFFF', tierQuote: '' },
	{ level: 61, xp: 8400, tierName: 'Pact Judiciary', tierColor: '#FFFFFF', tierQuote: 'Order in the cord!' },
	{ level: 62, xp: 8600, tierName: 'Pact Executor', tierColor: '#FFFFFF', tierQuote: '' },
	{ level: 63, xp: 8800, tierName: 'Pact Inquisitor', tierColor: '#FFFFFF', tierQuote: 'Nobody expects the Spammish Inquisition' },
	{ level: 64, xp: 9001, tierName: '"Kaioken"', tierColor: '#FFFFFF', tierQuote: 'That can\'t be right! It must be broken!' },
	{ level: 65, xp: 9200, tierName: 'Pact Vulgarian', tierColor: '#FFFFFF', tierQuote: '' },
	{ level: 66, xp: 9400, tierName: 'Pact Tarnisher', tierColor: '#FFFFFF', tierQuote: '' },
	{ level: 67, xp: 9600, tierName: 'Pact Heretic', tierColor: '#FFFFFF', tierQuote: '' },
	{ level: 68, xp: 9800, tierName: 'Pact Corruptor', tierColor: '#FFFFFF', tierQuote: '' },
	{ level: 69, xp: 10000, tierName: 'Pact Adulterer', tierColor: '#FFFFFF', tierQuote: 'Nice.' },
	{ level: 70, xp: 10500, tierName: 'Pact Nullifidian', tierColor: '#FFFFFF', tierQuote: '' },
	{ level: 71, xp: 11000, tierName: 'Hero', tierColor: '#FFFFFF', tierQuote: 'That lone wolf stuff stays behind.' },
	{ level: 72, xp: 11500, tierName: 'Legend', tierColor: '#FFFFFF', tierQuote: 'We all make it sooner or later.' },
	{ level: 73, xp: 12000, tierName: 'Mythic', tierColor: '#FFFFFF', tierQuote: 'They\'re gonna need you down there. Tell \'em to make it count.' },
	{ level: 74, xp: 12500, tierName: 'Noble', tierColor: '#FFFFFF', tierQuote: 'You\'re on your own, Noble.' },
	{ level: 75, xp: 13000, tierName: 'Eclipse', tierColor: '#FFFFFF', tierQuote: 'I\'m ready! How about you?' },
	{ level: 76, xp: 13500, tierName: 'Nova', tierColor: '#FFFFFF', tierQuote: 'Negative, I have the gun. Good luck, sir.' },
	{ level: 77, xp: 14000, tierName: 'Forerunner', tierColor: '#FFFFFF', tierQuote: 'Our victory, — your victory — was so close, I wish you could\'ve lived to see it.' },
	{ level: 78, xp: 14500, tierName: 'Reclaimer', tierColor: '#FFFFFF', tierQuote: 'All burned and turned to glass... Everything, except your courage.' },
	{ level: 79, xp: 15000, tierName: 'Inheritor', tierColor: '#FFFFFF', tierQuote: 'That, you gave to us. And with it, we can rebuild.' },
	{ level: 80, xp: 15500, tierName: '"Ash Williams"', tierColor: '#FFFFFF', tierQuote: '' },

];

module.exports = {
	getSoulTier: (xp) => {
		for (const soulTier of soulTiers.slice().reverse()) { // .toReversed(), the non-mutating reverse method, wasn't working here
			if (xp >= soulTier.xp) {
				return soulTier;
			}
		}
	},

	getXPBar(xp) {
		const soulTier = module.exports.getSoulTier(xp);
		const nextSoulTier = soulTiers[soulTiers.indexOf(soulTier) + 1];
		const xpInTier = xp - soulTier.xp;
		const xpToNextTier = nextSoulTier.xp - soulTier.xp;
		const xpPercentage = xpInTier / xpToNextTier;
		let xpBar = '[';
		for (let i = 0; i < 10; i++) {
			if (xpPercentage * 10 >= i) {
				xpBar += '█';
			} else {
				xpBar += '░';
			}
		}
		xpBar += ']';
		return `${soulTier.tierName} ${xpBar} ${nextSoulTier.tierName} *(${xp}/${nextSoulTier.xp} XP)*`;
	},

	getLevelUps(oldXP, newXP) {
		const oldSoulTier = module.exports.getSoulTier(oldXP);
		const newSoulTier = module.exports.getSoulTier(newXP);
		if (oldSoulTier.level === newSoulTier.level) {
			return '';
		}
		let levelUps = '';
		for (let i = oldSoulTier.level + 1; i <= newSoulTier.level; i++) {
			levelUps += `⬆️ **Promoted! Level ${soulTiers[i].level} ${soulTiers[i].tierName}**\n`;
		}
		return levelUps += '\n';
	},
};