import { Form, Input, Select } from "antd";
import { Fragment } from "react";
import PropTypes from "prop-types";

const RenderFormFields = ({ formFields, isEdit, required, data, form }) => {
  return (
    <Fragment>
      {formFields.map((f) => {
        return (
          <Fragment key={f.key}>
            <Form.Item
              key={f.key}
              name={f.key}
              label={f.label}
              {...((required || f?.required) && {
                rules: [
                  {
                    required: true,
                    message: `Please ${
                      f.inputType === "select" ? "Select" : "Enter"
                    } a ${f.label}`,
                  },
                  ...f.otherRules,
                ],
              })}
            >
              {f.inputType === "select" ? (
                <Select
                  {...(f?.defaultValue !== undefined &&
                    !isEdit && { defaultValue: f.defaultValue })}
                  {...(isEdit && { defaultValue: data[f.key] })}
                  {...(f?.multiple && { mode: "multiple" })}
                  placeholder={`Select ${f.label}`}
                >
                  {f.options.map((o) => (
                    <Select.Option key={o.key} value={o.key}>
                      {o.label}
                    </Select.Option>
                  ))}
                </Select>
              ) : f.inputType === "textarea" ? (
                <Input.TextArea
                  {...(f?.defaultValue !== undefined &&
                    !isEdit && { defaultValue: f.defaultValue })}
                  {...(isEdit && { defaultValue: data[f.key] })}
                  placeholder={f.label}
                  rows={3}
                />
              ) : f.inputType === "custom" ? (
                <Fragment>
                  <f.component
                    {...(f?.defaultValue !== undefined &&
                      !isEdit && { defaultValue: f.defaultValue })}
                    {...(isEdit && { defaultValue: data[f.key] })}
                    form={form}
                  />
                </Fragment>
              ) : (
                <Input
                  {...(f?.defaultValue !== undefined &&
                    !isEdit && { defaultValue: f.defaultValue })}
                  {...(isEdit && { defaultValue: data[f.key] })}
                  placeholder={f.label}
                  type={f.inputType ?? "text"}
                />
              )}
            </Form.Item>
          </Fragment>
        );
      })}
    </Fragment>
  );
};

RenderFormFields.propTypes = {
  formFields: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      inputType: PropTypes.string,
      otherRules: PropTypes.array,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
  isEdit: PropTypes.bool,
  required: PropTypes.bool,
  data: PropTypes.object,
  form: PropTypes.object.isRequired,
};

export default RenderFormFields;
