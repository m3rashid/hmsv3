import { useState } from "react";

function usePharmacy() {
  const [Inventory, setInventory] = useState([]);

  const getMedicine = (name) => {
    return Inventory.filter((inv) => inv.medicine === name);
  };

  const reduceMedicine = (name, value) => {
    setInventory((inv) => {
      const newinv = inv.map((inventory) => {
        if (inventory.medicine === name)
          return {
            ...inventory,
            qty: inventory.qty - value,
          };
        else return inventory;
      });

      return newinv;
    });
  };

  return {
    Inventory,
    setInventory,
    getMedicine,
    reduceMedicine,
  };
}

export default usePharmacy;
