import React from "react";
import PropTypes from "prop-types";
import InventoryFormHandler from "../../../../components/Inventory/FormHandler";

function EditMedicine(props) {
  return (
    <div>
      <InventoryFormHandler
        type={props.type}
        defaultValues={props.data}
        Col={{
          label: 12,
          wrapper: 12,
        }}
      />
    </div>
  );
}

EditMedicine.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

export default EditMedicine;
