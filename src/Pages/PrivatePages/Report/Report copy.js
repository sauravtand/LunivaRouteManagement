import { Col, Row, Space } from 'antd'
import React from 'react'
import { ClickCard } from '../../../Components/Common/ClickCard'

const Report = () => {
  return (
    <>
      <h2>Report</h2>
      <Row>
        <Col lg={24} md={24} sm={24}>
          <Row className='marbot'>
            <Space>
              <Col lg={8} md={12} sm={12} xs={24}>
                <ClickCard goToLink={'reports/collectiondetail'} insideContent={'Collection Report'} />
              </Col>
              <Col lg={8} md={12} sm={12} xs={24}>
                <ClickCard goToLink={'reports/vehicledetail'} insideContent={'Vehicle Report'} />
              </Col>
              <Col lg={8} md={12} sm={12} xs={24}>
                <ClickCard goToLink={'reports/counterdetail'} insideContent={'Counter Collection Report'} />
              </Col>
            </Space>
          </Row>
          <Row className='marbot'>
            <Space>
              <Col lg={8} md={12} sm={12} xs={24}>
                <ClickCard goToLink={'reports/countertotaldetail'} insideContent={'Counter Total Report'} />
              </Col>
            </Space>
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default Report