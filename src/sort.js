import { ascNumberComparator } from "./comparators.js";
import { mid } from "./pivot-extractors.js";
import { partition } from "./utils.js";

const sortInner = (arr, comparator, pivotExtractor) => {
	const stack = [];
	stack.push(0, arr.length);

	while (stack.length !== 0) {
		const right = stack.pop(),
			left = stack.pop();

		let pivot = pivotExtractor(arr, left, right);
		const smallPtr = partition(arr, left, right, pivot, comparator);

		if (smallPtr - left > 1) stack.push(left, smallPtr);
		if (right - (smallPtr + 1) > 1) stack.push(smallPtr + 1, right);
	}
};

const sort = (arr, comparator = ascNumberComparator, pivotExtractor = mid) => {
	if (!Array.isArray(arr) || arr.length <= 1) {
		return arr;
	}

	if (typeof pivotExtractor !== "function") pivotExtractor = mid;
	if (typeof comparator !== "function") comparator = ascNumberComparator;

	sortInner(arr, comparator, pivotExtractor);

	return arr;
};

export default sort;
