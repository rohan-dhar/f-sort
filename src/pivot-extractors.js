import { randInt } from "./random.js";

export const first = (arr, left, right) => {
	return left;
};
export const last = (arr, left, right) => {
	return right - 1;
};
export const mid = (arr, left, right) => {
	return (left + right) >>> 1;
};
export const random = (arr, left, right) => {
	return randInt(left, right - 1);
};
