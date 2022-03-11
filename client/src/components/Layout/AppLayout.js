import React from 'react'
import {
    Layout,
    Typography,
    Row,
    Col,
    Button
} from 'antd';
import styles from './layout.module.less'

/**
 * 
 * @param {*} props 
 * @returns {JSX.Element}
 */
function Index(props) {
    return (
        <React.Fragment>
            <Layout
                className={styles.layout}
            >
                <Layout.Header
                    theme="light"
                >
                    <Col
                        className={styles.header}
                    >
                        <Col
                            span={18}
                        >
                            <Typography.Title
                                level={3}

                            >
                                Dr. M.A Ansari Hospital
                            </Typography.Title>
                        </Col>
                        <Col
                            span={6}
                        >
                            <Button>
                                Login
                            </Button>
                        </Col>
                    </Col>
                </Layout.Header>
                <Layout>
                    <Layout.Sider>
                        Sider
                    </Layout.Sider>
                    <Layout.Content
                        className={styles.content}
                    >
                        {props.children}
                    </Layout.Content>
                </Layout>
            </Layout>
        </React.Fragment>
    )
}

export default Index