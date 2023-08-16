import { MODEL_CONSTANTS } from "gatekeeper";

export const quantityCalculator = (duration: number, dosage: keyof typeof MODEL_CONSTANTS.dosages) =>
	Math.ceil(duration * MODEL_CONSTANTS.dosages[dosage]);
