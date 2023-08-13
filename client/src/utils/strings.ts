import { MODEL_CONSTANTS } from 'gatekeeper';

export const toSentenceCase = (word: string) => {
	if (!word || typeof word !== 'string' || word.length === 0) return word;
	return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

export const showGender = (gender: MODEL_CONSTANTS.Sex) => {
	return gender === 'M' ? 'Male' : gender === 'F' ? 'Female' : 'Others';
};
