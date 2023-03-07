import { Button, Form, Select, Row, Col } from 'antd'
import React from 'react'
import styled from 'styled-components'
import Filter from './Filter';
const { Option } = Select;

const Header = ({ title, isNotification, isProject }) => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <HeaderContainer>
      <h3 className='title-1'>
        {title}
      </h3>
      {
        isProject &&
        <>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            style={{
              display: 'flex'
            }}

          >
            <Row gutter={8}>
              <Col span={6}>
                <Form.Item
                  name="fiscalyear"
                  label="fiscalyear"
                  rules={[
                    {
                      required: true,
                      message: 'select fistacl year',
                    },
                  ]}
                >
                  <Select placeholder="fiscal year">
                    <Option value="male">2071/72</Option>
                    <Option value="female">2072/73</Option>
                    <Option value="other">2073/74</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item
                  name="ward"
                  label="ward"
                  rules={[
                    {
                      required: true,
                      message: 'select ward',
                    },
                  ]}
                >
                  <Select placeholder="वार्ड">
                    <Option value="male">1</Option>
                    <Option value="female">2</Option>
                    <Option value="other">3</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="ward"
                  label="विषयगत क्षेत्र"
                  rules={[
                    {
                      required: true,
                      message: 'select region',
                    },
                  ]}
                >
                  <Select placeholder="विषयगत क्षेत्र">
                    <Option value="male">demmy pro 1</Option>
                    <Option value="female">demmy pro 2</Option>
                    <Option value="other">demmy pro 3</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="ward"
                  label="विषयगत क्षेत्र"
                  rules={[
                    {
                      required: true,
                      message: 'select region',
                    },
                  ]}
                >
                  <Select placeholder="विषयगत क्षेत्र">
                    <Option value="male">demmy pro 1</Option>
                    <Option value="female">demmy pro 2</Option>
                    <Option value="other">demmy pro 3</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="ward"
                  label="विषयगत क्षेत्र"
                  rules={[
                    {
                      required: true,
                      message: 'select region',
                    },
                  ]}
                >
                  <Select placeholder="विषयगत क्षेत्र">
                    <Option value="male">demmy pro 1</Option>
                    <Option value="female">demmy pro 2</Option>
                    <Option value="other">demmy pro 3</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    फिल्टर गर्नुहोस
                  </Button>
                </Form.Item>
              </Col>
              <Col span={6} offset={6}>
                <Filter />
              </Col>
            </Row>
          </Form>
        </>
      }

    </HeaderContainer>
  )
}

export default Header

const HeaderContainer = styled.div`
  width: 100%;
  height: auto;
  background-color: var(--primaryBackground);
  padding: 16px 24px;
  border-radius: 8px;
  box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem;
  /* display: flex;
  justify-content: space-between;
  align-items: center; */
  margin-bottom: 16px;
`