import { Fragment, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { Modal, Button, Form, message, Collapse } from 'antd';

import { instance } from 'api/instance';
import { showGender, toSentenceCase } from 'utils/strings';
import { UserSlotManagerAtom } from 'atoms/UserSlotManager';
import { supportedUserRoles, Category } from 'utils/constants';
import RenderFormFields from 'components/FormRender/RenderFormFields';
import useGetUserDetail from 'components/Admin/modules/helpers/getUserDetail';
import Availability from 'components/Admin/modules/helpers/InputTypes/Availablity';

const requiredFormFields = [
  { key: 'name', label: 'Name', inputType: 'text', otherRules: [{}] },
  { key: 'email', label: 'Email', inputType: 'email', otherRules: [{}] },
  {
    key: 'password',
    label: 'Password',
    inputType: 'password',
    otherRules: [{}],
  },
  {
    key: 'roomNumber',
    label: 'Room Number',
    inputType: 'number',
    otherRules: [{}],
  },
  {
    key: 'role',
    label: 'Role',
    inputType: 'select',
    multiple: false,
    otherRules: [
      {
        validator: (_, value) => {
          if (!supportedUserRoles.includes(value)) {
            return Promise.reject(new Error('Role not supported!'));
          }
          return Promise.resolve();
        },
      },
    ],
    options: supportedUserRoles.map((role) => ({
      key: role,
      label: role
        .split('_')
        .map((r) => toSentenceCase(r))
        .join(' '),
    })),
  },
  {
    key: 'sex',
    label: 'Gender',
    inputType: 'select',
    multiple: false,
    otherRules: [{}],
    options: ['m', 'f', 'o'].map((gender) => ({
      key: gender,
      label: showGender(gender),
    })),
  },
];

const otherFormFields = [
  { key: 'bio', label: 'Introduction', inputType: 'textarea' },
  { key: 'designation', label: 'Designation', inputType: 'text' },
  { key: 'contact', label: 'Contact', inputType: 'number' },
  { key: 'address', label: 'Address', inputType: 'text' },
  {
    key: 'availability',
    label: 'Availability',
    inputType: 'custom',
    component: Availability,
  },
  { key: 'authorityName', label: 'Authority Name', inputType: 'text' },
  {
    key: 'category',
    label: 'Category',
    inputType: 'select',
    options: Object.entries(Category).map(([key, value]) => ({
      key: key,
      label: value,
    })),
  },
  { key: 'origin', label: 'Origin', inputType: 'text' },
];

const CreateUserModal = ({ isEdit, data }) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const setUserAtom = useSetRecoilState(UserSlotManagerAtom);
  const { getAllUsers } = useGetUserDetail({
    userType: 'doctors',
    userRole: 'DOCTOR',
  });

  const handleOk = () => setIsModalVisible(true);
  const handleCancel = () => {
    setIsModalVisible(false);
    setUserAtom(null);
  };

  const onFinish = async (values) => {
    if (values.role === 'DOCTOR' && (!values.availability || values.availability.length === 0)) {
      message.error('Please select at least one slot for doctor');
      return;
    }

    try {
      message.loading({ content: 'Loading...', key: 'auth/createUser' });
      if (isEdit) {
        await instance.post('/admin/update-user', {
          userId: data.id,
          profileId: data.profileId,
          ...values,
        });
      } else {
        await instance.post('/auth/signup', { ...values });
      }
      console.log({ values });
      message.success({
        content: `User ${isEdit ? 'edited' : 'created'} Successfully`,
        key: 'auth/createUser',
      });
    } catch (error) {
      message.error({
        content:
          JSON.parse(error.response.data.message) ??
          `User ${isEdit ? 'updation' : 'creation'} failed`,
        key: 'auth/createUser',
      });
    } finally {
      await getAllUsers();
      handleCancel();
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error({
      content: 'User creation Failed',
      key: 'auth/createUser',
    });
  };

  return (
    <Fragment>
      <Button onClick={() => setIsModalVisible(true)}>
        {isEdit ? 'Edit User' : 'Register New User'}
      </Button>

      <Modal
        title={isEdit ? 'Edit' : 'Create'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div
          style={{
            maxHeight: '70vh',
            overflowY: 'auto',
            overflowX: 'hidden',
            paddingBottom: 15,
            marginRight: -24,
            paddingRight: 15,
          }}
        >
          <Form
            name="Create User"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="horizontal"
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 14 }}
            form={form}
          >
            <RenderFormFields
              isEdit={isEdit}
              formFields={requiredFormFields}
              required={!isEdit}
              data={data}
              // form={form}
            />

            <Collapse bordered={false} style={{ padding: 0, margin: 0 }}>
              <Collapse.Panel header="Other Details" key="1">
                <RenderFormFields
                  isEdit={isEdit}
                  formFields={otherFormFields}
                  required={false}
                  data={data}
                  form={form}
                />
              </Collapse.Panel>
            </Collapse>

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                borderTop: '1px solid #f0f0f0',
                margin: '24px -24px -10px -24px',
                padding: '10px 24px 0 24px',
              }}
            >
              <Button style={{ marginRight: '10px' }} onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                onClick={(e) => {
                  e.preventDefault();
                  form.submit();
                }}
              >
                {isEdit ? 'Update User' : 'Create User'}
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </Fragment>
  );
};

export default CreateUserModal;
