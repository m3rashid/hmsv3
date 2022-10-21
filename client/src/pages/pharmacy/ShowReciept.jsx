import React from "react";
import PropTypes from "prop-types";

import GeneratePdf from "components/PDF/generatePdf";

const ShowReceipt = ({ printContainerRef, data }) => {
  return (
    <div>
      <GeneratePdf printContainerRef={printContainerRef} data={data} />
    </div>
  );
};

ShowReceipt.propTypes = {
  printContainerRef: PropTypes.any,
  data: PropTypes.array,
};

export default ShowReceipt;
