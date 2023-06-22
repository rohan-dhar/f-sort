export const randInt = (min, max) => {
	return min + Math.floor(Math.random() * (max - min));
};

export const randArr = (len, min, max) => {
	const result = Array(len);
	for (let i = 0; i < len; ++i) {
		result[i] = randInt(min, max);
	}
	return result;
};
