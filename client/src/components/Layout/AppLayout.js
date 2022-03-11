import React from 'react'
import {
    Layout,
    Typography,
    Row,
    Col
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
                    <Row
                        className={styles.header}
                    >
                        <Col>
                            <Typography.Title
                                className='text-white'
                            >
                                Dr. M.A Ansari Hospital
                            </Typography.Title>
                        </Col>
                    </Row>
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