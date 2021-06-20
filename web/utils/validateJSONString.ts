export const validateJSONString = (text: string, onError: Function): boolean => {
	let isValid = true;
	try {
		JSON.parse(text);
	} catch (error) {
		onError(error)
		isValid = false;
	}
	return isValid;
}