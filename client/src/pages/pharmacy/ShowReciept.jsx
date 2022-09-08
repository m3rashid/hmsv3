import React from "react";
import GeneratePdf from "../../components/generatePdf";
import PropTypes from "prop-types";

function ShowReceipt({ printContainerRef, data }) {
  return (
    <div>
      <GeneratePdf printContainerRef={printContainerRef} data={data} />
    </div>
  );
}

ShowReceipt.propTypes = {
  printContainerRef: PropTypes.any,
  data: PropTypes.array,
};

export default ShowReceipt;
