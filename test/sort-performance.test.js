import { ascNumberComparator } from "../src/comparators.js";
import { sort } from "../src/index.js";
import { randArr } from "../src/random.js";
import { average, prettyPrint, round, runTest } from "./utils.js";

const testPerformance = (tries, len) => {
	const times = {
		native: [],
		self: [],
	};

	let numPassed = 0;

	for (let i = 0; i < tries; ++i) {
		const testCase = randArr(len, -100000, 100000);
		const {
			equal: pass,
			time1: nativeTime,
			time2: selfTime,
		} = runTest(
			testCase,
			(arr) => arr.sort(ascNumberComparator),
			(arr) => sort(arr, ascNumberComparator)
		);

		prettyPrint(
			i,
			`Self: ${round(selfTime, 2)}ms`,
			`Native: ${round(nativeTime, 2)}ms`,
			`${round(nativeTime / selfTime, 2)} times native performance`,
			`Correctness: ${pass ? "PASS" : "FAIL"}`
		);
		if (pass) numPassed++;
		times.self.push(selfTime);
		times.native.push(nativeTime);
	}

	const selfAvg = average(times.self),
		nativeAvg = average(times.native);

	prettyPrint(
		`\nAverage times`,
		`Self: ${round(selfAvg)}ms`,
		`Native: ${round(nativeAvg)}ms`,
		`${round(nativeAvg / selfAvg, 2)} times native performance`,
		`| ${numPassed} / ${tries} test cases correct`
	);
};

testPerformance(10, 1500000);
