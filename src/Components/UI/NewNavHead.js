import { Layout, Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { useNavData } from '../../CustomHooks/navDataHook';

const { Header } = Layout;

export const NewNavHead = () => {
    const newNav = useNavData()

    return (
        <Header
            style={{
                zIndex: 1,
                width: '100%',
                position: 'sticky',
                top: 0
            }}
        >
            <Menu
                theme="dark"
                mode="horizontal"
            >
                {
                    newNav.navData.map((e, index) => {
                        return (
                            <Menu.Item key={index}>
                                <NavLink key={index} to={`/admin${e.pathname}`}>
                                    <e.icon />
                                    {/* <span>{e.name}</span> */}
                                </NavLink>
                            </Menu.Item>
                        )
                    })
                }
            </Menu>
        </Header>
    )
}