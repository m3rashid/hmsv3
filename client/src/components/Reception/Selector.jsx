import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import { Col, Select, Typography } from 'antd';

import { instance } from 'api/instance';

function DoctorSelector({ onChange }) {
  const { data: DoctorData } = useQuery("Doctor's List", async () => {
    const { data } = await instance.get('/doctor/search', {
      params: { name: '' },
    });

    return data.doctors;
  });

  return (
    <Select
      getPopupContainer={(trigger) => trigger.parentNode}
      id="doctor"
      placeholder="Doctor Name"
      allowClear
      onChange={(value) => {
        const selectedDoctor = DoctorData.find((doctor) => doctor.id === value);
        onChange(selectedDoctor);
      }}
    >
      {DoctorData &&
        DoctorData?.map((doctor) => (
          <Select.Option key={doctor.id} value={doctor.id}>
            <Col direction="vertical" size={'small'} style={{ fontSize: 12 }}>
              <Typography.Text>{doctor.name}</Typography.Text>
              {doctor.profile.designation && (
                <Typography.Text type="danger">
                  &#40;{doctor.profile.designation}&#41;
                </Typography.Text>
              )}
              <Typography.Text disabled>{doctor.email}</Typography.Text>
            </Col>
          </Select.Option>
        ))}
    </Select>
  );
}

DoctorSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default DoctorSelector;
