import { dosages } from './constants';

export const quantityCalculator = (duration: number, dosage: keyof typeof dosages) =>
	Math.ceil(duration * dosages[dosage]);
