import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Col, Row } from 'antd'
import { useNavData } from '../../../CustomHooks/navDataHook'
import { useTranslation } from 'react-i18next'
import useCurrentLanguage from '../../../CustomHooks/GetCurrentLanguage'
import { FaGlobeAsia, FaGlobeEurope } from 'react-icons/fa'

const AppSettings = () => {
  const newNav = useNavData()
  const { i18n } = useTranslation();
  const { setLanguage } = useCurrentLanguage();

  function changeLanguage(e) {
    setLanguage(e.target.value)
    i18n.changeLanguage(e.target.value);
  }

  return (
    <ReportContainer>
      <h2>App Settings</h2>
      <Row gutter={[16, 16]}>
        {
          newNav.settingsNav.map(e => (
            e.showTab &&
            <Col sm={24} md={8} xs={24} lg={6} key={e.pathname}>
              <Link className='customNavLink' to={`/admin/${e.pathname}`} pathname={e.pathname}>
                <div className="cButton"><e.icon /><span>&nbsp;{e.name}</span></div>
              </Link>
            </Col>
          ))
        }

        <Col sm={24} md={8} xs={24} lg={6} key={'changeLanguage'}>
          {
            i18n.language === 'en' ?
              <button className="cButton" onClick={changeLanguage} value='np'>
                <FaGlobeAsia />&nbsp;नेपाली
              </button>
              :
              <button className='cButton' onClick={changeLanguage} value='en'>
                <FaGlobeEurope />&nbsp;ENGLISH
              </button>
          }
        </Col>

      </Row>

    </ReportContainer>
  )
}

export default AppSettings

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
    border: none;
    border-radius: 10px;
    font-size: 16px;

    span{
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