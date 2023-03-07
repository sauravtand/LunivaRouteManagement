import React from 'react';
import styled from 'styled-components';
import SideBar from '../Components/UI/SideBar';

const PublicRoute = ({ component: Component }) => {
  return (
    <>
      <SideBar ></SideBar>
        <MainContainer render={(props) => <Component {...props} />}>
      </MainContainer>
    </>
  )
}

export default PublicRoute;

const MainContainer = styled.div`
  width: 1000px;
  height: 100vh;
  background-color: red;
`