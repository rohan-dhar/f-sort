export const arraysEqual = (a, b) => {
	if (!Array.isArray(a) || !Array.isArray(b)) return false;
	if (a.length !== b.length) return false;
	for (let i = 0; i < a.length; ++i) {
		if (a[i] !== b[i]) {
			return false;
		}
	}
	return true;
};

export const round = (number, places) => {
	let placeCorrection = 1;
	for (let i = 0; i < places; ++i) {
		placeCorrection *= 10;
	}
	let result = String(Math.round(number * placeCorrection) / placeCorrection);
	let dotIndex = result.indexOf(".");

	if (dotIndex === -1) {
		result = `${result}.`;
		dotIndex = result.length - 1;
	}

	const placesLeft = places - (result.length - dotIndex - 1);

	for (let i = 0; i < placesLeft; ++i) {
		result = result + "0";
	}
	return result;
};

export const timer = (callback) => {
	const start = performance.now();
	callback();
	const end = performance.now();
	return end - start;
};

export const runTest = (testCase, sorter1, sorter2) => {
	const testCaseCopy = [...testCase];
	const time1 = timer(() => sorter1(testCase));
	const time2 = timer(() => sorter2(testCaseCopy));
	return {
		time1,
		time2,
		equal: arraysEqual(testCase, testCaseCopy),
	};
};

export const average = (arr) => {
	return arr.reduce((sum, val) => sum + val, 0) / arr.length;
};

export const prettyPrint = (...args) => {
	console.log(args.join(" | "));
};
