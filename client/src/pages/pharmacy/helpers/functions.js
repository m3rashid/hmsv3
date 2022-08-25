export const DOSAGE_MAP = {
  OD: 1,
  BD: 2,
  TD: 3,
  QD: 4,
  OW: 1 / 7,
  BW: 2 / 7,
  TW: 3 / 7,
  QW: 4 / 7,
};

export const getEstimatedMedRequirement = ({duration, dosage, medType})=>{
    let requiredQuantity =  Math.ceil(
          duration * DOSAGE_MAP[dosage]
        )

return requiredQuantity

}