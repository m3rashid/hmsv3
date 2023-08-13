import { MODEL_CONSTANTS } from 'gatekeeper';

export const quantityCalculator = (duration: number, dosage: MODEL_CONSTANTS.Dosage) => {
	return Math.ceil(duration * MODEL_CONSTANTS.dosages[dosage]);
};
