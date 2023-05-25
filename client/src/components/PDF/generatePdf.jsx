import { useEffect, useState } from "react";
import { Col, Collapse, Row, Space, Table, Typography } from "antd";

import { quantityCalculator } from "utils/quantityCalculator";
import useTableStyles from "components/common/tableDefaults";

const normalTextStyles = {
  fontWeight: "normal",
  fontSize: "16px",
};

const lighterFontFlex = {
  display: "flex",
  justifyContent: "center",
  fontWeight: "lighter",
};

const GeneratePdf = (props) => {
  const { tableStyles } = useTableStyles();
  const parchiData = props?.data[0];
  const [activeKey, setActiveKey] = useState("1");

  useEffect(() => {
    if (!props?.printContainerRef?.current) {
      setActiveKey("1");
      return;
    }
    setActiveKey("0");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Collapse
        ghost
        bordered={false}
        style={{ padding: 0, margin: 0 }}
        activeKey={activeKey}
        onChange={(key) => setActiveKey(key)}
      >
        <Collapse.Panel header="Show Print Preview" key={"1"}>
          <div
            className="print__section"
            style={{ margin: "0px", padding: "0px" }}
          >
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div
                    ref={props.printContainerRef}
                    className="card"
                    style={{ marginTop: "10px" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "10px",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src="/images/logo.jpg"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "100%",
                          marginRight: "10px",
                          padding: "2px",
                        }}
                        alt="null"
                      />
                      <Typography.Title level={4}>
                        Dr M.A ANSARI HEALTH CENTER
                      </Typography.Title>
                      &nbsp;&nbsp;
                      <img
                        src="/images/logo.jpg"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "100%",
                          marginRight: "10px",
                          padding: "2px",
                        }}
                        alt="null"
                      />
                    </div>
                    <div style={lighterFontFlex}>
                      <span style={normalTextStyles}>
                        डॉक्टर एम.ए अंसारी स्वास्थ्य केंद्र
                      </span>
                    </div>
                    <div style={lighterFontFlex}>
                      <span style={normalTextStyles}>
                        Jamia Millia Islamia (Accredited "A" Grade by NAAC)
                      </span>
                    </div>
                    <div style={lighterFontFlex}>
                      <span style={normalTextStyles}>
                        जामिया मिलिया इस्लामिया (NAAC द्वारा मान्यता प्राप्त "ए"
                        ग्रेड)
                      </span>
                    </div>
                    <div style={lighterFontFlex}>
                      <span style={{ fontWeight: "normal", fontSize: "12px" }}>
                        (A Central University by an Act of Parliament)( संसद के
                        एक अधिनियम द्वारा एक केंद्रीय विश्वविद्यालय)
                      </span>
                    </div>
                    <div style={lighterFontFlex}>
                      <span style={normalTextStyles}>
                        Maulana Mohammad Ali Jauhar Marg,New Delhi -110025 ,Ph
                        2698717 Ext. 1781,26984625
                      </span>
                    </div>
                    <div style={lighterFontFlex}>
                      <span style={normalTextStyles}>
                        मौलाना मोहम्मद अली जौहर मार्ग, नई दिल्ली -110025, फोन
                        2698717 एक्सटेंशन 1781,26984625
                      </span>
                    </div>
                    <div
                      style={{
                        marginTop: "20px",
                        textAlign: "right",
                        marginRight: "50px",
                        fontSize: "15px",
                      }}
                    >
                      <span>
                        Date : &nbsp;
                        <strong>{parchiData?.date && parchiData.date}</strong>
                      </span>
                    </div>
                    <Space
                      direction="vertical"
                      style={{
                        marginTop: "20px",
                        padding: "20px",
                        marginLeft: "50px",
                        fontSize: "15px",
                        width: "80%",
                      }}
                    >
                      <Row>
                        <Col span={8}>By</Col>
                        <Col span={16}>
                          <strong>
                            {parchiData?.appointment?.doctor?.Auth[0].name}
                          </strong>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>Patient Name</Col>
                        <Col span={16}>
                          <strong>
                            {parchiData?.appointment?.patient?.name}
                          </strong>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>Symptoms</Col>
                        <Col span={16}>
                          <strong>
                            {parchiData?.symptoms &&
                              parchiData.symptoms.split("-")[0]}
                          </strong>
                        </Col>
                      </Row>
                    </Space>
                    <Space
                      direction="vertical"
                      style={{
                        marginTop: "5px",
                        padding: "20px",
                        marginLeft: "30px",
                        fontSize: "20px",
                        width: "90%",
                      }}
                    >
                      <Row>
                        <Col span={8}>
                          <strong>Available Medicines</strong>
                        </Col>
                      </Row>
                    </Space>
                    <div
                      style={{
                        marginTop: "5px",
                        marginLeft: "50px",
                        marginRight: "30px",
                        fontSize: "20px",
                      }}
                    >
                      <Table
                        rowKey={(record) => record.id}
                        style={{ ...tableStyles }}
                        size="small"
                        columns={[
                          {
                            title: "Medicine",
                            dataIndex: "Medicine",
                            render: (text) => <span>{text?.name}</span>,
                          },
                          {
                            title: "Dosage",
                            dataIndex: "dosage",
                            render: (text, record) => <span>{text}</span>,
                          },
                          {
                            title: "Quantity",
                            dataIndex: "quantityPerDose",
                            render: (text, record) => (
                              <span>
                                {quantityCalculator(
                                  record?.duration,
                                  record?.dosage
                                )}
                              </span>
                            ),
                          },
                          { title: "Description", dataIndex: "description" },
                        ]}
                        dataSource={parchiData?.medicines}
                        pagination={false}
                      />
                    </div>
                    <Space
                      direction="vertical"
                      style={{
                        marginTop: "5px",
                        padding: "20px",
                        marginLeft: "30px",
                        fontSize: "20px",
                        width: "80%",
                      }}
                    >
                      <Row>
                        <Col span={8}>
                          <Typography.Title level={4}>
                            Custom Medicines
                          </Typography.Title>
                        </Col>
                      </Row>
                    </Space>
                    <div
                      style={{
                        marginTop: "5px",
                        marginLeft: "50px",
                        marginRight: "30px",
                        fontSize: "20px",
                      }}
                    >
                      <Table
                        rowKey={(record) => record.id}
                        size="small"
                        columns={[
                          {
                            title: "Medicine",
                            dataIndex: "Medicine",
                            render: (text) => <span>{text.name}</span>,
                          },
                          {
                            title: "Dosage",
                            dataIndex: "dosage",
                            render: (text, record) => <span>{text}</span>,
                          },
                          {
                            title: "Quantity",
                            dataIndex: "Medicine.quantity",
                            render: (text, record) => (
                              <span>
                                {quantityCalculator(
                                  record?.duration,
                                  record?.dosage
                                )}
                              </span>
                            ),
                          },
                        ]}
                        dataSource={parchiData?.CustomMedicines}
                        pagination={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Collapse.Panel>
      </Collapse>
    </>
  );
};
export default GeneratePdf;
