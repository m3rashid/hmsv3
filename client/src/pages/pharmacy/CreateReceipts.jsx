import dayjs from "dayjs";
import { useRecoilValue } from "recoil";
import { Button, Form, Select, Spin } from "antd";
import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { pharmacyState } from "../../atoms/pharmacy";
import { instance } from "../../api/instance";
import MedicineTable from "../../components/Pharmacy/MedicineTable";
import { socket } from "../../api/socket";
// const { TextArea } = Input;
const { Option } = Select;

function CreateReceipts() {
  const loading = false;
  const navigate = useNavigate();
  const pharmacyData = useRecoilValue(pharmacyState);
  const [selectedMedicines, setSelectedMedicines] = useState([]);

  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [selectedPrescriptionData, setSelectedPrescriptionData] = useState({
    loading: false,
    data: {},
  });

  const [form] = Form.useForm();

  const [searchParams] = useSearchParams();

  const prescriptionId = searchParams.get("prescriptionId");

  const handlePrescriptionSelect = useCallback(
    async (prescription_id) => {
      prescription_id = parseInt(prescription_id);
      const prescription = pharmacyData.prescriptions.find(
        (prescription) => prescription.id === prescription_id
      );
      console.log(prescription);
      if (prescription) {
        setSelectedPrescriptionData((prev) => ({ ...prev, loading: true }));
        setSelectedPrescription(prescription);
        form.setFieldValue(
          "prescription",
          `${prescription.appointment.patient.name}, ${dayjs(
            prescription.datePrescribed
          ).format("DD MMM, hh:mm A")}`
        );
        const { data } = await instance.get(
          `/pharmacy/prescriptions/${prescription.id}`
        );
        // console.log(data);
        setSelectedPrescriptionData((prev) => ({
          ...prev,
          loading: false,
          data: data.prescription,
        }));
      }
    },
    [form, pharmacyData.prescriptions]
  );

  useEffect(() => {
    console.log(prescriptionId);
    if (prescriptionId !== null && pharmacyData.prescriptions.length > 0) {
      handlePrescriptionSelect(prescriptionId);
    }
  }, [
    handlePrescriptionSelect,
    pharmacyData.prescriptions.length,
    prescriptionId,
  ]);

  const [total, setTotal] = useState({});
  const formSubmitHandler = async (values) => {
    if (loading) return;
    console.log(selectedPrescription, selectedMedicines);
    // const resp = await instance.post(`/pharmacy/dispense`, {
    //   prescriptionId: selectedPrescription.id,
    //   medicines: selectedMedicines,
    // })
    socket.emit("dispense-prescription", {
      prescriptionId: selectedPrescription.id,
      medicines: selectedMedicines,
    });

    setTotal({});
    setSelectedPrescription(null);
    setSelectedPrescriptionData({ data: [] });
    form.resetFields();
    navigate("/pharmacy/prescriptions");
  };

  const sum = (arr) => arr.reduce((x, y) => x + y, 0);

  return (
    <div>
      <Form
        form={form}
        onFinish={formSubmitHandler}
        labelAlign="left"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 8 }}
      >
        <Form.Item
          label="Choose Prescription"
          name="prescription"
          rules={[{ required: true, message: "Please Enter patient name!" }]}
        >
          <Select
            style={{ width: "100%" }}
            placeholder="select an Prescription"
            onSelect={(id) => {
              handlePrescriptionSelect(id);
            }}
            optionLabelProp="Appointment"
          >
            {pharmacyData.prescriptions
              ?.filter((pr) => pr.pending)
              .map((presp) => {
                return (
                  <Option key={presp.id} value={presp.id}>
                    <span>
                      {presp.appointment.patient.name} -{" "}
                      {dayjs(presp.datePrescribed).format(
                        "DD MMM YY,  HH:mm A"
                      )}
                    </span>
                  </Option>
                );
              })}
          </Select>
        </Form.Item>

        <Spin spinning={selectedPrescriptionData.loading}>
          <MedicineTable
            medicines={selectedPrescriptionData.data?.medicines || []}
            setSelectedMedicines={setSelectedMedicines}
            selectedMedicine={selectedMedicines}
          />
          <Form.Item wrapperCol={{ offset: 12 }}>
            <Button
              style={{ marginTop: "20px" }}
              loading={loading}
              type="primary"
              htmlType="submit"
            >
              Confirm Transaction
            </Button>
          </Form.Item>
        </Spin>
      </Form>
    </div>
  );
}

export default CreateReceipts;
