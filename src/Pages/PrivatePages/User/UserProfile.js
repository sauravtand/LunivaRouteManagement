import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { MdEdit } from 'react-icons/md'
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { useRoleRights } from '../../../CustomHooks/GetRoleRightsHook';
import useToken from '../../../CustomHooks/useToken';
import { getUserDetailsApi } from '../../../Services/UserService';

const UserProfile = () => {
  const [userData, setUserData] = useState();
  const navigate = useNavigate()
  const roleAndRights = useRoleRights()
  const { token } = useToken()
  const [searchParams] = useSearchParams();
  const UUId = searchParams.get('q')
  const userId = UUId !== null ? UUId : token.Um

  useEffect(() => {
    getUserDetails(userId)
  }, [userId])

  const getUserDetails = (counterId) => {
    const data = {
      userId: counterId
    }
    getUserDetailsApi(data, (res) => {
      setUserData(res[0]);
    })
  }

  return (
    <div className='contentContainer'>
      <MainContainer>
        <div className='profileContainer'>
          <Avatar size={160} className='profileImage' icon={<UserOutlined />} />
        </div>
        <div className="profileInformation">
          {
            (roleAndRights.showSuperAdminAndAdmin || token.Um === userData?.UId) &&
            <Button
              type='primary'
              shape='round'
              icon={<MdEdit />}
              ghost
              className='CButton'
              onClick={() => navigate({
                pathname: `/admin/edituser`,
                search: `?q=${userData?.UId}`
              })}> Edit
            </Button>
          }
          <span className='spanStyling'><h2>{userData?.UserFullName !== undefined ? userData?.UserFullName : ''}</h2></span>
          <span className='spanStyling'>User Name: {userData?.UserName !== undefined ? userData?.UserName : ''}</span>
          <span className='spanStyling'>Email: {userData?.UserEmail !== undefined ? userData?.UserEmail : ''}</span>
          <span className='spanStyling'>Phone: {userData?.UserContactNumber !== undefined ? userData?.UserContactNumber : ''}</span>
        </div>
      </MainContainer>

    </div>
  )
}

export default UserProfile;

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: '100%';
  flex-direction: column;
  padding-bottom: 32px;

  .profileContainer{
    display: block;
    width: 100%;
    height: 100px;
    background: 'rgb(120,201,250)';
    background: linear-gradient(90deg, rgba(120,201,250,1) 38%,rgb(202 200 231) 100%);
    height: 160px;
    position: relative;
  }

  .profileImage{
      position: absolute;
      top: 50%;
      left: 32%;
      transform: translateX(-50%);
      border: 8px solid rgb(255 255 255);
      padding: 10px ;
  }

  .profileInformation{
    width: 49%;
    border: 1px solid #dbd6d6;
    margin-top: 100px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 16px;
  }
  .CButton{
    position: absolute;
    right: 10px;
    top: 10px;
  }
  
  .spanStyling{
   font-size: 16px;
   font-weight: 600;
   letter-spacing: 1.5px;
   margin-bottom: 4px;
   color: #1a2d38;

   h2{
    font-size: 24px;
    font-weight: 600;
    letter-spacing: 2px;
    color: #132631;
   }
 }
`