import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent, SidebarFooter } from 'react-pro-sidebar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-pro-sidebar/dist/css/styles.css';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useNavData } from '../../CustomHooks/navDataHook';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import useCurrentLanguage from '../../CustomHooks/GetCurrentLanguage';
// import logoImg from '../../Assets/Images/luniva360reverse.png'
import logoImg from '../../Assets/Images/logo4.png'

const ProSide = (props) => {
    const { burgerClicked } = props
    const newNav = useNavData()
    const { i18n } = useTranslation();
    const { setLanguage } = useCurrentLanguage();

    function changeLanguage(e) {
        setLanguage(e.target.value)
        i18n.changeLanguage(e.target.value);
    }

    return (
        <SideBarContainer>
            <ProSidebar
                width={250}
                collapsedWidth={'0'}
                collapsed={burgerClicked}
            // className={`${checkIfMobile ? 'newSidebar' : ''}`}
            >
                <SidebarHeader>
                    <div className='text-center'>
                        <img src={logoImg} alt="" className='logoImg' />
                    </div>
                </SidebarHeader>
                <PerfectScrollbar>
                    <SidebarContent>
                        <Menu iconShape="square">
                            {
                                newNav.navData.map((e, index) => (
                                    <>
                                        {
                                            e.showTab ?
                                                e.hasSubMenu ?
                                                    <SubMenu icon={<e.icon />} key={index} title={e.name}>
                                                        {
                                                            e.subData.map((subE, subIndex) => (
                                                                subE.showTab &&
                                                                <MenuItem key={subE.id} icon={<subE.icon />}>
                                                                    <NavLink className={`sideBarItem`} key={subIndex} to={`/admin${e.id === 3 ? '/reports' : ''}${subE.pathname}`}>
                                                                        <span>{subE.name}</span>
                                                                    </NavLink>
                                                                </MenuItem>
                                                            ))
                                                        }
                                                    </SubMenu>
                                                    :
                                                    <MenuItem key={index} icon={<e.icon />}>
                                                        <NavLink className={`sideBarItem`} key={index} to={`/admin${e.pathname}`}>
                                                            <span>{e.name}</span>
                                                        </NavLink>
                                                    </MenuItem>
                                                :
                                                <></>
                                        }
                                    </>
                                ))
                            }
                        </Menu>
                    </SidebarContent>
                </PerfectScrollbar>
                <SidebarFooter>
                    <Row>
                        <Col span={8}>
                            {
                                i18n.language === 'en' ?
                                    <button className='languageButton' onClick={changeLanguage} value='np'>नेपाली</button>
                                    :
                                    <button className='languageButton' onClick={changeLanguage} value='en'>English</button>
                            }
                        </Col>
                    </Row>
                </SidebarFooter>
            </ProSidebar>
        </SideBarContainer>
    )
}
export default ProSide

const SideBarContainer = styled.div`
    .pro-sidebar {
        height: 100%;
        position: fixed;
    }
    
    .pro-sidebar, .pro-sidebar .pro-menu a, h2 {
        text-decoration: none;
        color: rgb(254, 254, 254);
    }

    .pro-sidebar .pro-menu.square .pro-menu-item > .pro-inner-item > .pro-icon-wrapper {
        border-radius: 25px;
    }
`