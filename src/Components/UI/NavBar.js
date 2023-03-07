import React from 'react'
import styled from 'styled-components'
import { FaUserCircle } from 'react-icons/fa'
import useToken from '../../CustomHooks/useToken'
import { Dropdown, Menu } from 'antd'
import { Link } from 'react-router-dom'
import { BiLogOutCircle, BiUserCircle } from 'react-icons/bi'
import { GiHamburgerMenu } from 'react-icons/gi'

const NavBar = (props) => {
  const { clickBurger, burgerClicked, checkIfMobile } = props
  const { token } = useToken()

  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <Link to={'/admin/userprofile'}>
              <LinkBtn>
                <BiUserCircle size={18} /> Profile
              </LinkBtn>

            </Link>
          ),
        },
        {
          key: '2',
          label: (
            <Link to={'/login'} onClick={() => sessionStorage.clear()}>
              <LinkBtn>
                <BiLogOutCircle size={18} /> Logout
              </LinkBtn>
            </Link>

          ),
        },

      ]}
    />
  );

  const sideBarCollapse = () => {
    !checkIfMobile && clickBurger(!burgerClicked)
  }

  return (
    <NavBarContainer>
      <h3 className='navTitle'>
        {
          !checkIfMobile &&
          <>
            <GiHamburgerMenu className='curPoint' onClick={sideBarCollapse} /> &nbsp;
          </>
        }
        {token?.CName}
      </h3>
      <UserIcon className='dropMenuClass'>
        <FaUserCircle />
        <Dropdown
          overlay={menu}
          placement="bottomRight"
          arrow
        >
          <span>{token.UserName}</span>
        </Dropdown>
      </UserIcon>
    </NavBarContainer>
  )
}

export default NavBar


const NavBarContainer = styled.div`
  width: 100%;
  height: auto;
  background-color: var(--primaryBackground);
  padding: 16px 24px;
  box-shadow: rgb(188 178 178 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(185 172 172 / 6%) 0rem 0.125rem 0.25rem -0.0625rem;
  display: flex;
  justify-content: space-between;
  align-items: center; 

  .curPoint {
    cursor: pointer;
  }
`

const UserIcon = styled.div`
  color: var(--primary);
  font-size: 20px;
  display: flex;
  align-items: center;

  span{
    font-size: 14px;
    margin-left: 8px;
  }
`

const LinkBtn = styled.span`
  font-size: 16px;
  color: var(--secondary);
  display: flex;
  align-items: center;
`