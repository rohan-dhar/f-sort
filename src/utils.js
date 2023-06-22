export const swap = (arr, i, j) => {
	const temp = arr[i];
	arr[i] = arr[j];
	arr[j] = temp;
};

export const partition = (arr, left, right, pivot, comparator) => {
	let smallPtr = left;

	swap(arr, pivot, right - 1);
	pivot = right - 1;
	for (let largePtr = left; largePtr < right - 1; ++largePtr) {
		if (comparator(arr[largePtr], arr[right - 1]) >= 0) continue;

		swap(arr, smallPtr, largePtr);
		smallPtr++;
	}

	swap(arr, smallPtr, right - 1);
	return smallPtr;
};
