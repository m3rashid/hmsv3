import { Form, Input, Select } from "antd";
import { Fragment } from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import quillDefaults from "components/common/quillDefaults";

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
                  getPopupContainer={(trigger) => trigger.parentNode}
                  {...(f?.defaultValue !== undefined &&
                    !isEdit && { defaultValue: f.defaultValue })}
                  {...(isEdit && { defaultValue: data[f.key] })}
                  {...(f?.multiple && { mode: "multiple" })}
                  placeholder={`Select ${f.label}`}
                  options={f.options.map((o) => ({
                    key: o.key,
                    value: o.key,
                    label: o.label,
                  }))}
                />
              ) : f.inputType === "textarea" ? (
                <ReactQuill
                  {...(f?.defaultValue !== undefined &&
                    !isEdit && {
                      defaultValue: f.defaultValue,
                      readOnly: true,
                    })}
                  {...(isEdit && { defaultValue: data[f.key] })}
                  placeholder={f.label}
                  {...quillDefaults}
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
  form: PropTypes.object,
};

export default RenderFormFields;
