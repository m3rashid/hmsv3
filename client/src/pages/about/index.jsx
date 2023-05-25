import { GithubOutlined, LinkedinOutlined, GlobalOutlined } from '@ant-design/icons';
import { Fragment } from 'react';
import { Card, theme } from 'antd';
import { useRecoilValue } from 'recoil';

import { configState } from 'atoms/config';
import ShowEntry from 'components/common/showEntry';

const Profile = ({ data }) => {
  const { token } = theme.useToken();

  return (
    <Card
      hoverable
      style={{ minWidth: 260, width: 260 }}
      bodyStyle={{ padding: 10 }}
      cover={<img alt={data.name} src={data.image} style={{ height: 300, objectFit: 'cover' }} />}
    >
      <div style={{ display: 'flex', gap: 10, margin: 0, padding: 0 }}>
        <div style={{ flex: 1 }}>
          <Card.Meta title={data.name} description={data.department} />
          {data.batch && <ShowEntry label="Batch" value={data.batch} />}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {data.github && (
            <a target="_blank" rel="noreferrer" href={data.github}>
              <GithubOutlined style={{ fontSize: 20, color: token.colorPrimary }} />
            </a>
          )}
          {data.linkedin && (
            <a target="_blank" rel="noreferrer" href={data.linkedin}>
              <LinkedinOutlined style={{ fontSize: 20, color: token.colorPrimary }} />
            </a>
          )}
          {data.portfolio && (
            <a target="_blank" rel="noreferrer" href={data.portfolio}>
              <GlobalOutlined style={{ fontSize: 20, color: token.colorPrimary }} />
            </a>
          )}
        </div>
      </div>
    </Card>
  );
};

/**
 * @type {React.CSSProperties}
 */
const centerAll = {
  display: 'flex',
  justifyContent: 'center',
  gap: 20,
  flexWrap: 'wrap',
};

const About = () => {
  const config = useRecoilValue(configState);

  return (
    <Fragment>
      <h2 align="center">Project under the guidance of</h2>
      <div style={{ ...centerAll, marginBottom: 36 }}>
        {config.guidance_faculty.map((prof) => (
          <Profile key={prof.name} data={prof} />
        ))}
      </div>

      <h2 align="center">Developers in the project</h2>
      <div style={centerAll}>
        {config.developers.map((dev) => (
          <Profile key={dev.name} data={dev} />
        ))}
      </div>
      <br />
    </Fragment>
  );
};

export default About;
