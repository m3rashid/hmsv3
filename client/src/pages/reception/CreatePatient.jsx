import { Form, Button, message, Typography } from 'antd';
import { useRecoilState } from 'recoil';

import { socket } from 'api/instance';
import { LoadingAtom } from 'atoms/loading';
import { BloodGroup, maritalStatus, PatientTypeEnum } from 'utils/constants';
import RenderFormFields from 'components/FormRender/RenderFormFields';
import { Fragment, useEffect } from 'react';

const PatientFormFields = [
  {
    key: 'userId',
    label: 'User ID',
    inputType: 'text',
    otherRules: [{}],
  },
  {
    key: 'name',
    label: 'Name',
    inputType: 'text',
    otherRules: [{}],
  },
  {
    key: 'fathersName',
    label: "Father's Name",
    inputType: 'text',
    otherRules: [{}],
  },
  {
    key: 'type',
    label: 'Patient Type',
    inputType: 'select',
    otherRules: [{}],
    options: Object.keys(PatientTypeEnum).map((key) => ({
      key,
      label: PatientTypeEnum[key],
    })),
    required: true,
  },
  {
    key: 'otherUser',
    label: 'Other User',
    inputType: 'text',
    otherRules: [{}],
  },
  {
    key: 'relationWithOtherUser',
    label: 'Relation with Other User',
    inputType: 'text',
    otherRules: [{}],
  },
  {
    key: 'bloodGroup',
    label: 'Blood Group',
    inputType: 'select',
    options: Object.keys(BloodGroup).map((key) => ({
      key,
      label: BloodGroup[key],
    })),
    otherRules: [{}],
  },
  {
    key: 'dob',
    label: 'Date of Birth',
    inputType: 'date',
    otherRules: [{}],
  },
  {
    key: 'dor',
    label: 'Date of Resignation',
    inputType: 'date',
    otherRules: [{}],
  },
  {
    key: 'designation',
    label: 'Designation',
    inputType: 'text',
    otherRules: [{}],
  },
  {
    key: 'department',
    label: 'Department',
    inputType: 'text',
    otherRules: [{}],
  },
  {
    key: 'contact',
    label: 'Contact',
    inputType: 'text',
    otherRules: [
      {
        pattern: new RegExp(/^[0-9]{10}$/),
      },
    ],
  },
  {
    key: 'fdr',
    label: 'FDR No.',
    inputType: 'text',
    otherRules: [{}],
  },
  {
    key: 'maritalStatus',
    label: 'Marital Status',
    inputType: 'select',
    options: Object.keys(maritalStatus).map((key) => ({
      key,
      label: key,
    })),
    otherRules: [{}],
  },
  {
    key: 'address',
    label: 'Address',
    inputType: 'textarea',
    otherRules: [{}],
  },
];

const CreatePatientForm = () => {
  const [LoadingData, setLoadingData] = useRecoilState(LoadingAtom);
  const [form] = Form.useForm();
  const formSubmitHandler = (values) => {
    if (LoadingData?.CreatePatientForm) return;
    setLoadingData({
      CreatePatientForm: true,
    });
    socket.emit('create-patient', { ...values });
    form.resetFields();
  };

  useEffect(() => {
    socket.on('new-patient-created', ({ data }) => {
      message.success(`Patient ${data.name} created successfully!`);
      setLoadingData({
        CreatePatientForm: false,
      });
    });

    return () => {
      socket.off('new-patient-created');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <Typography.Title level={2} style={{ paddingLeft: 45 }}>
        Create Patient
      </Typography.Title>

      <Form
        onFinish={formSubmitHandler}
        form={form}
        labelAlign="left"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
        style={{ paddingLeft: 20 }}
      >
        <RenderFormFields formFields={PatientFormFields} isEdit={false} required={false} />
        <Form.Item wrapperCol={{ offset: 2 }}>
          <Button loading={LoadingData?.CreatePatientForm} type="primary" htmlType="submit">
            Register Patient
          </Button>
        </Form.Item>
      </Form>
    </Fragment>
  );
};

export default CreatePatientForm;
