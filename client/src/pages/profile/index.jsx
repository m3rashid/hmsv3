import { Button, Form, message, Typography } from 'antd';
import React, { useEffect } from 'react';

import ProfileWrapper from 'components/Profile/ProfileWrapper';
import { useRecoilState } from 'recoil';
import { authState } from 'atoms/auth';
import { instance, socket } from 'api/instance';
import quillDefaults from 'components/common/quillDefaults';
import ReactQuill from 'react-quill';

const ProfilePage = () => {
  const [{ user }] = useRecoilState(authState);
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  const formSubmitHandler = async (values) => {
    const reason = values.reason.replace(/<[^>]*>?/gm, '');
    const data = {
      reason: reason,
      id: user.id,
    };
    setLoading(true);
    form.resetFields();
    socket.emit('doctor-left', data);
    setLoading(false);
    // TODO
    // inform admin that the doctor is leaving
  };

  useEffect(() => {
    socket.on('doctor-left', (data) => {
      setLoading(false);
      message.success(`Doctor ${data?.name} left successfully!`);
    });

    return () => {
      socket.off('doctor-left');
    };
  }, []);

  return (
    <ProfileWrapper>
      <Typography.Title level={4}>Are you leaving ?</Typography.Title>

      <br />

      <Form form={form} onFinish={formSubmitHandler} labelAlign="left" style={{ width: '50%' }}>
        <Form.Item
          label="Reason"
          name="reason"
          style={{ display: 'block' }}
          rules={[{ required: true, message: 'Reason is required' }]}
        >
          <ReactQuill
            placeholder="Enter your reason to leave"
            onChange={(value) => {
              form.setFieldValue('reason', value);
            }}
            {...quillDefaults}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 2 }}>
          <Button type="primary" htmlType="submit" disabled={loading} loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </ProfileWrapper>
  );
};

export default ProfilePage;
