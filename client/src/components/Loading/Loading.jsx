import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Image, Space, Typography, theme } from 'antd';

const Loading = ({ spin = true, text = 'Loading...' }) => {
  const { token } = theme.useToken();

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Space direction="vertical" align="center">
        {spin && (
          <Spin
            size="large"
            indicator={<LoadingOutlined style={{ fontSize: 24, color: token.colorPrimary }} />}
          />
        )}
        <Typography.Text style={{ opacity: 0.8 }}>{text}</Typography.Text>
      </Space>
      <Image
        src="/images/logo.jpg"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '50px',
          height: '50px',
        }}
      />
    </div>
  );
};

export default Loading;
