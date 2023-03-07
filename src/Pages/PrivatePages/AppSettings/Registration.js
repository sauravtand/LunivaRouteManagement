import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Col, Row } from 'antd'
import { useNavData } from '../../../CustomHooks/navDataHook'

const Registration = () => {
  const newNav = useNavData()
  return (
    <ReportContainer>
    <h2>Registration</h2>
      <Row gutter={[16, 16]}>
        {
          newNav.registerNav.map(e => (
            e.showTab &&
            <Col sm={24} md={8} xs={24} lg={6} key={e.pathname}>
              <Link className='customNavLink' to={`/admin/${e.pathname}`} pathname={e.pathname}>
                <div className="cButton"><e.icon /><span>&nbsp;{e.name}</span></div>
              </Link>
            </Col>
          ))
        }

      </Row>

    </ReportContainer>
  )
}

export default Registration

const ReportContainer = styled.div`
   .cButton{
    height: 120px;
    width: 100%;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fefefe;
    box-shadow: 0 2px 22px 0 rgba( 31, 38, 135, 0.17 );
    backdrop-filter: blur( 4px );
    -webkit-backdrop-filter: blur( 4px );
    border-radius: 10px;
    span{
      font-size: 16px;
      letter-spacing: 1.1px;
      text-transform: uppercase;
      color: var(--titleTxt);
      i{
        font-size: 25px;
        color: var(--primary);
      }
    }
    
    @media(max-width: 768px){
      span{
      font-size: 16px;
      letter-spacing: 1.4px;
      text-transform: uppercase;
      margin-right: 10px;
      i{
        font-size: 25px;
      }
    }
    }
    @media(max-width: 500px){
      height: 80px;
    }
   
  }
`