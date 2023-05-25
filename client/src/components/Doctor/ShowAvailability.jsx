import { Fragment } from "react";
import PropTypes from "prop-types";
import { List, Space, Tag, Typography } from "antd";

function ShowAvailability({ availability }) {
  return (
    <div>
      {availability &&
        availability.map((item, index) => {
          return (
            <Fragment>
              <Typography.Text strong>{item.day}</Typography.Text>
              <List
                dataSource={item.range}
                renderItem={(range) => {
                  return (
                    <List.Item style={{ padding: 10 }}>
                      <Space>
                        <Tag>
                          {range?.from?.hour} : {range?.from?.minute}
                        </Tag>
                        <Typography.Text>{"-->"}</Typography.Text>
                        <Tag>
                          {range?.to?.hour} : {range?.to?.minute}
                        </Tag>
                      </Space>
                    </List.Item>
                  );
                }}
              />
            </Fragment>
          );
        })}
    </div>
  );
}

ShowAvailability.propTypes = {
  availability: PropTypes.array,
};

export default ShowAvailability;
