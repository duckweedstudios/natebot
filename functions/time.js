const gaussianRandom = () => {
    let sum = 0;
    let numIterations = 10;
    for (let i = 0; i < numIterations; i++) {
        sum += Math.random();
    }

    return 12 + (sum / numIterations) * (36 - 12 + 1);
}

module.exports = {
    // now: a call to Date.now(), i.e. an epoch timestamp
    // returns date object with randomized time on that date
	getUniformRandomTimeOnDate: (now) => {
        let todaysDate = new Date(now);
        return new Date(todaysDate.getFullYear(),  // year as XXXX, .getYear() is deprecated
                        todaysDate.getMonth(), // month as [0-11]
                        todaysDate.getDate(), // day of the month as [1-31]
                        Math.floor(Math.random() * 24), // hour as [0-23] 
                        Math.floor(Math.random() * 60), // minute as [0-59]
                        Math.floor(Math.random() * 60), // second as [0-59]
                        0) // milliseconds as 0
    },
    // now: a call to Date.now(), i.e. an epoch timestamp
    // returns a date object of some future date which is,
    // on average, 24 hours from now, using a normal distribution
    // mean 24 hrs, standard deviation 6 hours
    getRandomizedNextTime: (now) => {
        let todaysDate = new Date(now);
        let mean = 24;
        let stddev = 6;

        let hoursFromNow
    }
};

const testRandom = () => {
    let sum = 0;
    for (let i = 0; i < 100; i++) {
        sum += gaussianRandom();
    }
    console.log(sum / 100);
}

testRandom();
console.log(gaussianRandom());
