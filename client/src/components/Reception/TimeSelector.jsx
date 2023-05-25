import dayjs from 'dayjs';
import { DatePicker, message } from 'antd';
import PropTypes from 'prop-types';
import { useCallback } from 'react';

import { Days } from 'utils/constants';

const DoctorTimeSelector = ({ doctor, onChange, style }) => {
  const createRange = useCallback((list = [], last) => {
    const result = [];

    if (!list.length) return result;
    for (let i = 0; i < last; i++) {
      const canAdd = list.every((item) => {
        return i > item[1] || i < item[0];
      });

      if (canAdd) {
        result.push(i);
      }
    }
    return result;
  }, []);

  const isAllowedDate = useCallback(
    (current, isDate) => {
      const day = current?.day();
      const hour = current?.hour();
      const DayArr = Object.values(Days);
      const DayChosen = DayArr[day];

      if (!doctor) return true;

      const availableDay = doctor.profile.availability?.find((avail) => avail.day === DayChosen);
      if (!availableDay) {
        if (isDate) return true;
        return false;
      }
      if (isDate === true) return false;

      const availableTime = availableDay.range.reduce(
        (acc, range) => {
          if (hour === range?.from?.hour) {
            acc.minute.push([range?.from?.minute, 60]);
          } else if (hour === range?.to?.hour) {
            acc.minute.push([0, range?.to?.minute]);
          }
          acc.hour.push([range?.from?.hour, range?.to?.hour]);

          return acc;
        },
        { minute: [], hour: [] }
      );

      const res = {
        disabledMinutes: () => createRange(availableTime.minute, 60),
        disabledHours: () => createRange(availableTime.hour, 24),
      };

      return res;
    },
    [createRange, doctor]
  );

  const handleChange = (v) => {
    if (!isAllowedDate(v, false)) {
      message.error('Doctor is not available at this time');
      return;
    }
    onChange(v);
  };

  return (
    <DatePicker
      showTime={{ format: 'HH:mm' }}
      allowClear
      disabled={!doctor}
      disabledDate={(current) => isAllowedDate(current, true)}
      disabledTime={(current) => isAllowedDate(dayjs(current), false)}
      onChange={handleChange}
      style={style}
    />
  );
};

DoctorTimeSelector.propTypes = {
  doctor: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.object,
};

export default DoctorTimeSelector;
