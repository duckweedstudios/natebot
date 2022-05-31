const dayjs = require('dayjs');

// eslint-disable-next-line no-unused-vars
const gaussianRandom = () => {
	let sum = 0;
	const numIterations = 10;
	for (let i = 0; i < numIterations; i++) {
		sum += Math.random();
	}

	return 12 + (sum / numIterations) * (36 - 12 + 1);
};

const getRandomizedNextTime = (now, mean = 1440, variation = 6) => {
	const hoursFromNow = (Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random() - 6) * variation / 2 + mean / 60;
	// return hoursFromNow;
	const nextAppearance = now.add(hoursFromNow, 'hour');
	return {
		nextAppearance: nextAppearance,
		nextAppearanceFormatted: nextAppearance.format('MM/DD/YYYY hh:mm:ss A'),
		msUntil: Math.abs(now.diff(nextAppearance)),
	};
};

module.exports = {
	// now: a dayjs object made with dayjs(), which is 'right now' when it is constructed
	// mean: minutes as integer
	// variation: randomness score as integer (say 1-10 but technically works on all numbers on (0, inf) )
	// returns an object containing
	// nextAppearance: a dayjs of some future date which is,
	//  on average, mean minutes from now, using a normal distribution,
	//  (use case: mean 1440 minutes/24 hrs, variation 6 hrs)
	//  Note that variation does not correspond to variance or stddev
	//  Stddev is around 18 however, or 6 before adding the mean
	// msUntil: ms until the next appearance for queuing purposes
	// This function will guarantee that the date is in the future
	// and also not too soon from 'right now' to avoid duplicate destroy attempt errors
	getRandomizedNextTimeInFuture: (now, mean = 1440, variation = 6) => {
		let nextTimeObj = getRandomizedNextTime(now, mean, variation);
		while (nextTimeObj.nextAppearance.isBefore(now) || nextTimeObj.msUntil < 40000) {
			nextTimeObj = getRandomizedNextTime(now, mean, variation);
		}
		return nextTimeObj;
	},
};

// const testRandom = () => {
//     let sum = 0;
//     let rolls = [];
//     let high = -999;
//     let low = 999;
//     for (let i = 0; i < 100; i++) {
//         let roll = module.exports.getRandomizedNextTime(Date.now());
//         sum += roll;
//         if (roll > high) {high = roll;}
//         if (roll < low) {low = roll;}
//         rolls.push(roll);
//     }
//     console.log(`Mean: ${sum/100}, Std. dev: ${Math.sqrt(rolls.map(roll => Math.pow(roll - 6, 2)/100).reduce((prev, cur) => prev + cur))}, High: ${high}, Low: ${low}`);
// }
console.log(`It is now ${dayjs().format('MM/DD/YYYY hh:mm:ss A')}`);
console.log(`The bot will next appear ${module.exports.getRandomizedNextTimeInFuture(dayjs()).nextAppearance.format('MM/DD/YYYY hh:mm:ss A')}`);
console.log(`For short-duration testing, the bot will next appear ${module.exports.getRandomizedNextTimeInFuture(dayjs(), 5, 1).nextAppearance.format('MM/DD/YYYY hh:mm:ss A')}`);