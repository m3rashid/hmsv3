import { toSentenceCase } from 'utils/strings';

const ShowEntry = ({ label, value }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: label && value ? '1fr 3fr' : '1fr',
      gridGap: 3,
    }}
  >
    <div style={{ fontWeight: 700 }}>{toSentenceCase(label)}</div>
    <div>{value || null}</div>
  </div>
);

export default ShowEntry;
