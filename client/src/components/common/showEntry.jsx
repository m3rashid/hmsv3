const ShowEntry = ({ label, value }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: "1rem",
    }}
  >
    <p style={{ fontWeight: 800, padding: 0, margin: 0 }}>{label || null}: </p>
    <p style={{ padding: 0, margin: 0 }}>{value || null}</p>
  </div>
);

export default ShowEntry;
