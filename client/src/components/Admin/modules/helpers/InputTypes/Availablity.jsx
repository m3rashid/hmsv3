import dayjs from "dayjs";
import { useRecoilState } from "recoil";
import { DeleteFilled, PlusOutlined } from "@ant-design/icons";
import { useCallback, useEffect } from "react";
import { Button, Divider, Select, Space, TimePicker } from "antd";

import { UserSlotManagerAtom } from "atoms/UserSlotManager";

function Availability({ isEdit, defaultValue, form }) {
  const [Data, setData] = useRecoilState(UserSlotManagerAtom);

  const DATA_ADD = useCallback(
    (payload) => {
      setData([...Data, payload]);
    },
    [Data, setData]
  );

  useEffect(() => {
    if (Data == null) setData(defaultValue || []);
  }, [Data, defaultValue, setData]);

  // const DATA_REMOVE = useCallback(
  //   (payload) => {
  //     setData(Data.filter((item) => item.id !== payload.id));
  //   },
  //   [Data, setData]
  // );

  const DATA_UPDATE = useCallback(
    (payload) => {
      setData(
        Data.map((item) => {
          if (item.id === payload.id) {
            return {
              ...item,
              ...payload,
            };
          }
          return item;
        })
      );
    },
    [Data, setData]
  );

  useEffect(() => {
    if (Data !== defaultValue) {
      form.setFieldsValue({
        availability: Data,
      });
    }
  }, [form, Data, defaultValue]);

  const UpdateSlotTimingHandler = (value, rangeItem, item) => {
    const newItem = {
      ...item,
      range: item.range.map((_item) => {
        if (_item.id === rangeItem.id) {
          return {
            id: rangeItem.id,
            from: {
              hour: dayjs(value[0]).hour(),
              minute: dayjs(value[0]).minute(),
            },
            to: {
              hour: dayjs(value[1]).hour(),
              minute: dayjs(value[1]).minute(),
            },
          };
        }
        return _item;
      }),
    };
    DATA_UPDATE(newItem);
  };

  return (
    <div>
      {Data &&
        Data?.map((item) => (
          <div
            key={item.id}
            style={{
              marginTop: 10,
            }}
          >
            <Select
              defaultValue={item.day}
              options={[
                { label: "Monday", value: "MON" },
                { label: "Tuesday", value: "TUE" },
                { label: "Wednesday", value: "WED" },
                { label: "Thursday", value: "THU" },
                { label: "Friday", value: "FRI" },
                { label: "Saturday", value: "SAT" },
                { label: "Sunday", value: "SUN" },
              ]}
              onChange={(value) => {
                DATA_UPDATE({ ...item, day: value });
              }}
              placeholder="Select Day"
              style={{ marginBottom: "10px" }}
              getPopupContainer={(trigger) => trigger.parentNode}
            />
            {item.range.map((rangeItem) => (
              <div key={rangeItem.id} style={{ marginTop: 4, marginBottom: 4 }}>
                <Space>
                  <TimePicker.RangePicker
                    format={"HH:mm"}
                    value={[
                      rangeItem?.from
                        ? dayjs(
                            `${rangeItem?.from?.hour}:${rangeItem?.from?.minute}`,
                            "HH:mm"
                          )
                        : null,
                      rangeItem?.to
                        ? dayjs(
                            `${rangeItem?.to?.hour}:${rangeItem?.to?.minute}`,
                            "HH:mm"
                          )
                        : null,
                    ]}
                    onChange={(value) =>
                      UpdateSlotTimingHandler(value, rangeItem, item)
                    }
                  />
                  <Button
                    htmlType="button"
                    color="danger"
                    onClick={() => {
                      DATA_UPDATE({
                        ...item,
                        range: item.range.filter(
                          (_range) => rangeItem.id !== _range.id
                        ),
                      });
                    }}
                    icon={<DeleteFilled style={{ color: "#ff0000" }} />}
                  />
                </Space>
              </div>
            ))}
            <Button
              htmlType="button"
              style={{ marginTop: "10px" }}
              onClick={() => {
                DATA_UPDATE({
                  ...item,
                  range: [...item.range, { id: Math.random() }],
                });
              }}
              icon={<PlusOutlined />}
            />
            <Divider />
          </div>
        ))}
      <Button
        htmlType="button"
        type="dashed"
        onClick={() => DATA_ADD({ id: Math.random(), range: [] })}
        icon={<PlusOutlined />}
      >
        Add New Availability
      </Button>
    </div>
  );
}

export default Availability;
