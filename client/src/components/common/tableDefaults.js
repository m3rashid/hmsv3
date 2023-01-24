import { useRecoilValue } from "recoil";

import { uiState } from "atoms/ui";

const useTableStyles = () => {
  const ui = useRecoilValue(uiState);

  /**
   * @type {React.CSSProperties}
   */
  const styles = {
    width: ui.sidebarCollapsed ? "calc(100vw - 40px)" : "calc(100vw - 240px)",
    overflowX: "auto",
    boxShadow: "0px 2px 2px 1px rgba(0, 0, 0, 0.3)",
    borderRadius: "5px",
    marginTop: "20px",
    padding: "10px",
  };

  return {
    tableStyles: styles,
  };
};

export default useTableStyles;
