import { ascNumberComparator } from "../src/comparators.js";
import { sort } from "../src/index.js";
import { randArr, randInt } from "../src/random.js";
import { runTest } from "./utils.js";

const genTestCases = (numCases) => {
	const testCases = [];
	testCases.push(
		[],
		[1],
		[-1],
		[-2, 2],
		[1, 2, 3, 4, 5, 6, 8, 10, 100],
		[9, 8, 7, 6, 5, 4, 3, 2, 1]
	);

	numCases = isNaN(numCases)
		? testCases.length
		: Math.max(testCases.length, numCases);

	numCases -= testCases.length;
	const numDenseCases = Math.floor(numCases / 2);
	for (let i = 0; i < numDenseCases; ++i) {
		testCases.push(randArr(randInt(1, 100), -1000, 1000));
	}
	for (let i = 0; i < numCases - numDenseCases; ++i) {
		testCases.push(randArr(randInt(1, 1000), -100, 100));
	}
	return testCases;
};

const testCorrectness = (testCases) => {
	let numPassed = 0;
	testCases.forEach((testCase) => {
		const { equal: pass } = runTest(
			testCase,
			(arr) => arr.sort(ascNumberComparator),
			(arr) => sort(arr, ascNumberComparator)
		);
		if (!pass) {
			console.log(`Test failed for arr:`, testCase);
		} else {
			numPassed++;
		}
	});

	console.log(`${numPassed} / ${testCases.length} test cases numPassed`);
};

testCorrectness(genTestCases(1000));
