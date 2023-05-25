import { InventoryTypes } from "utils/constants";
import InventoryWrapper from "components/Inventory/Display/inventoryWrapper";
import InventoryTable from "components/Inventory/Display/inner_components/InventoryTable";

export const Medicines = () => (
  <InventoryWrapper>
    <InventoryTable type={InventoryTypes.Medicine} />
  </InventoryWrapper>
);

export const NonMedicines = () => (
  <InventoryWrapper>
    <InventoryTable type={InventoryTypes.NonMedicine} />
  </InventoryWrapper>
);

export const OtherAssets = () => (
  <InventoryWrapper>
    <InventoryTable type={InventoryTypes.OtherAssets} />
  </InventoryWrapper>
);
