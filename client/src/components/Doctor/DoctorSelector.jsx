import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import { Select, Typography } from 'antd';

import { instance } from 'api/instance';

function DoctorSelector({ onChange, style }) {
  const { data: DoctorData } = useQuery("Doctor's List", async () => {
    const { data } = await instance.get('/doctor/search', {
      params: {
        name: '',
      },
    });

    return data.doctors;
  });

  return (
    <Select
      id="doctor"
      placeholder="Doctor Name"
      allowClear
      onChange={(value) => {
        const selectedDoctor = DoctorData.find((doctor) => doctor.id === value);
        onChange(selectedDoctor);
      }}
      getPopupContainer={(trigger) => trigger.parentNode}
      style={style}
    >
      {DoctorData &&
        DoctorData?.map((doctor) => (
          <Select.Option key={doctor.id} value={doctor.id}>
            <Typography.Text>{doctor.name}</Typography.Text>
            {doctor.profile.designation && (
              <Fragment>
                <br />
                <Typography.Text type="danger">
                  &#40;{doctor.profile.designation}&#41;
                </Typography.Text>
              </Fragment>
            )}
            <br />
            <Typography.Text disabled>{doctor.email}</Typography.Text>
          </Select.Option>
        ))}
    </Select>
  );
}

DoctorSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  style: PropTypes.object,
};

export default DoctorSelector;
