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

	Maybe add a short quote to each tier?
*/

module.exports = {
	getSoulTier: (numSouls) => {
		if (numSouls < 1) {
			return { tierNum: 0, tierName: 'Fresh Soul Fetcher', tierColor: '#FFFFFF' };
		} else if (numSouls < 5) {
			return { tierNum: 1, tierName: 'Newbie Soul Fetcher', tierColor: -1 };
		} else if (numSouls < 9) { // 9 is probably cursed
			return { tierNum: 2, tierName: 'Rookie Soul Fetcher', tierColor: -1 };
		} else if (numSouls < 13) { // 13 definitely cursed
			return { tierNum: 3, tierName: 'Babbling Soul Fetcher', tierColor: -1 };
		} else if (numSouls < 25) {
			return { tierNum: 4, tierName: 'Apprentice Soul Fetcher', tierColor: -1 };
		} else if (numSouls < 40) {
			return { tierNum: 5, tierName: 'Trained Soul Fetcher', tierColor: -1 };
		} else if (numSouls < 56) { // 56 miles per hour
			return { tierNum: 6, tierName: 'Journeyman Soul Fetcher', tierColor: -1 };
		} else if (numSouls < 80) {
			return { tierNum: 7, tierName: 'Disturbed Soul Fetcher', tierColor: -1 };
		} else if (numSouls < 100) {
			return { tierNum: 8, tierName: 'Skilled Soul Fetcher', tierColor: -1 };
		} else if (numSouls < 130) { // 1/30 is Nathan's birthday
			return { tierNum: 9, tierName: 'Intermediate Soul Fetcher', tierColor: -1 };
		} else if (numSouls < 175) {
			return { tierNum: 10, tierName: 'Short-Changed Soul Fetcher', tierColor: -1 };
		} else if (numSouls < 225) {
			return { tierNum: 11, tierName: 'Seasoned Soul Fetcher', tierColor: -1 };
		} else if (numSouls < 285) {
			return { tierNum: 12, tierName: 'Advanced Soul Fetcher', tierColor: -1 };
		} else if (numSouls < 333) { // Trips
			return { tierNum: 13, tierName: 'Masterful Soul Fetcher', tierColor: -1 };
		} else if (numSouls < 404) { // Funny error number
			return { tierNum: 14, tierName: 'Mystic Soul Fetcher', tierColor: -1 };
		} else if (numSouls < 420) { // Funny leaf number
			return { tierNum: 15, tierName: 'Vanished', tierColor: -1 };
		} else if (numSouls < 456) {
			return { tierNum: 16, tierName: 'Hazy Soul Fetcher', tierColor: -1 };
		} else if (numSouls < 503) { // Will birthday
			return { tierNum: 17, tierName: 'Incomprehensible Soul Fetcher', tierColor: -1 };
		} else if (numSouls < 619) { // Zade and Mav birthday
			return { tierNum: 18, tierName: 'Aching Soul Fetcher', tierColor: -1 };
		} else if (numSouls < 666) { // unlucky
			return { tierNum: 19, tierName: 'Darkened Soul Fetcher', tierColor: -1 };
		} else if (numSouls < 777) { // lucky
			return { tierNum: 20, tierName: `"Hell's Janitor"`, tierColor: -1 };
		} else if (numSouls < 808) {
			return { tierNum: 21, tierName: 'Shit-Out-of-Luck Soul Fetcher', tierColor: -1 };
		} else if (numSouls < 913) { // Corey birthday
			return { tierNum: 22, tierName: 'Reminiscing', tierColor: -1 };
		} else if (numSouls < 1013) { // Jacob birthday
			return { tierNum: 23, tierName: 'Meritorious', tierColor: -1 };
		} else if (numSouls < 1080) {
			return { tierNum: 24, tierName: 'Eldritch Soul Fetcher', tierColor: -1 };
		} else if (numSouls < 1111) {
			return { tierNum: 25, tierName: 'Machinating Soul Fetcher', tierColor: -1 };
		} else if (numSouls < 1223) { // Noah birthday
			return { tierNum: 26, tierName: 'Psychotic Soul Fetcher', tierColor: -1 };
		} else if (numSouls < 1313) {
			return { tierNum: 27, tierName: 'Illiterate Soul Fetcher', tierColor: -1 };
		} else if (numSouls < 1346) {
			return { tierNum: 28, tierName: 'Lovecraftian Soul Fetcher', tierColor: -1 };
		} else if (numSouls < 1575) {
			return { tierNum: 29, tierName: 'Disease-Addled Soul Fetcher', tierColor: -1 };
		} else if (numSouls < 1618) { // mass death event in chinese history
			return { tierNum: 30, tierName: 'Unrecognizable Soul Fetcher', tierColor: -1 };
		} else if (numSouls < 1666) { // it's back
			return { tierNum: 31, tierName: 'Dynastic', tierColor: -1 };
		} else if (numSouls < 1692) { // salem witch trials
			return { tierNum: 32, tierName: `"Hell's Jerome`, tierColor: -1 };
		} else if (numSouls < 1777) { // this time it's lucky
			return { tierNum: 33, tierName: 'Bewitched', tierColor: -1 };
		} else if (numSouls < 1861) { // american civil war
			return { tierNum: 34, tierName: 'Serendipitous', tierColor: -1 };
		} else if (numSouls < 1914) { // the great war
			return { tierNum: 35, tierName: 'Abandoned', tierColor: -1 };
		} else if (numSouls < 2000) {
			return { tierNum: 36, tierName: '"The Dead"', tierColor: -1 };
		} else if (numSouls < 2125) {
			return { tierNum: 37, tierName: 'Grim Reaper', tierColor: -1 };
		} else if (numSouls < 2222) {
			return { tierNum: 38, tierName: 'Enlightened', tierColor: -1 };
		} else if (numSouls < 2400) {
			return { tierNum: 39, tierName: 'Soul-Weaving', tierColor: -1 };
		} else if (numSouls < 2600) {
			return { tierNum: 40, tierName: 'Soul-Shattering', tierColor: -1 };
		} else if (numSouls < 2800) {
			return { tierNum: 41, tierName: 'Soul-Incinerating', tierColor: -1 };
		} else if (numSouls < 3000) {
			return { tierNum: 42, tierName: 'Soul-Hungering', tierColor: -1 };
		} else if (numSouls < 3333) {
			return { tierNum: 43, tierName: 'Soul-Devouring', tierColor: -1 };
		} else if (numSouls < 3500) {
			return { tierNum: 44, tierName: 'Soul-Fueled', tierColor: -1 };
		} else if (numSouls < 3800) {
			return { tierNum: 45, tierName: 'Knight of Limbo', tierColor: -1 };
		} else if (numSouls < 4200) {
			return { tierNum: 46, tierName: 'Baron of Limbo', tierColor: -1 };
		} else if (numSouls < 4444) {
			return { tierNum: 47, tierName: 'Count of Limbo', tierColor: -1 };
		} else if (numSouls < 4600) {
			return { tierNum: 48, tierName: 'Duke of Limbo', tierColor: -1 };
		} else if (numSouls < 4800) {
			return { tierNum: 49, tierName: 'King of Limbo', tierColor: -1 };
		} else if (numSouls < 5000) {
			return { tierNum: 50, tierName: 'Emperor of Limbo', tierColor: -1 };
		} else if (numSouls < 5555) {
			return { tierNum: 51, tierName: 'Getting Somewhere', tierColor: -1 };
		} else if (numSouls < 6000) {
			return { tierNum: 52, tierName: 'Carving a Path', tierColor: -1 };
		} else if (numSouls < 6500) {
			return { tierNum: 53, tierName: 'Opening the Portal', tierColor: -1 };
		} else if (numSouls < 6666) {
			return { tierNum: 54, tierName: 'Stepping Beyond', tierColor: -1 };
		} else if (numSouls < 7000) {
			return { tierNum: 55, tierName: `Satan's Plaything`, tierColor: -1 };
		} else if (numSouls < 7200) {
			return { tierNum: 56, tierName: 'Pact-Scholar', tierColor: -1 };
		} else if (numSouls < 7400) {
			return { tierNum: 57, tierName: 'Pact-Writer', tierColor: -1 };
		} else if (numSouls < 7600) {
			return { tierNum: 58, tierName: 'Pact-Editor', tierColor: -1 };
		} else if (numSouls < 7800) {
			return { tierNum: 59, tierName: 'Pact-Author', tierColor: -1 };
		} else if (numSouls < 8000) {
			return { tierNum: 60, tierName: 'Pact-Counsel', tierColor: -1 };
		} else if (numSouls < 8200) {
			return { tierNum: 61, tierName: 'Pact-Arbitrator', tierColor: -1 };
		} else if (numSouls < 8400) {
			return { tierNum: 62, tierName: 'Pact-Judiciary', tierColor: -1 };
		} else if (numSouls < 8600) {
			return { tierNum: 63, tierName: 'Pact-Executor', tierColor: -1 };
		} else if (numSouls < 8800) {
			return { tierNum: 64, tierName: 'Pact-Inquisitor', tierColor: -1 };
		} else if (numSouls < 9001) {
			return { tierNum: 65, tierName: 'Pact-Vulgarian', tierColor: -1 };
		} else if (numSouls < 9200) {
			return { tierNum: 66, tierName: 'Kaioken', tierColor: -1 };
		} else if (numSouls < 9400) {
			return { tierNum: 67, tierName: 'Pact-Tarnisher', tierColor: -1 };
		} else if (numSouls < 9600) {
			return { tierNum: 68, tierName: 'Pact-Heretic', tierColor: -1 };
		} else if (numSouls < 9800) {
			return { tierNum: 69, tierName: 'Pact-Fucker', tierColor: -1 };
		} else if (numSouls < 10000) {
			return { tierNum: 70, tierName: 'Pact-Corruptor', tierColor: -1 };
		} else if (numSouls < 10500) {
			return { tierNum: 71, tierName: 'Pact-Nullifidian', tierColor: -1 };
		} else if (numSouls < 11000) {
			return { tierNum: 72, tierName: 'Hero', tierColor: -1 };
		} else if (numSouls < 11200) {
			return { tierNum: 73, tierName: 'Legend', tierColor: -1 };
		} else if (numSouls < 11400) {
			return { tierNum: 74, tierName: 'Mythic', tierColor: -1 };
		} else if (numSouls < 11600) {
			return { tierNum: 75, tierName: 'Noble', tierColor: -1 };
		} else if (numSouls < 11800) {
			return { tierNum: 76, tierName: 'Eclipse', tierColor: -1 };
		} else if (numSouls < 12000) {
			return { tierNum: 77, tierName: 'Nova', tierColor: -1 };
		} else if (numSouls < 12200) {
			return { tierNum: 78, tierName: 'Forerunner', tierColor: -1 };
		} else if (numSouls < 12400) {
			return { tierNum: 79, tierName: 'Reclaimer', tierColor: -1 };
		} else if (numSouls < 12600) {
			return { tierNum: 80, tierName: 'Inheritor', tierColor: -1 };
		} else if (numSouls < 12800) {
			return { tierNum: 81, tierName: 'Ash Williams', tierColor: -1 };
		// =================================================================
		} else if (numSouls >= 12800) {
			return { tierNum: 82, tierName: '', tierColor: -1 };
		} else {
			throw new Error(`Error in getSoulTier: Potentially erroneous result for ${numSouls}`);
		}
	},
};