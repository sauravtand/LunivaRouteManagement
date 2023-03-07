import { useEffect, useState } from 'react'
import styled from 'styled-components'
import NavBar from '../Components/UI/NavBar'
import { NewNavHead } from '../Components/UI/NewNavHead'
import ProSide from '../Components/UI/ProSideBar'
import useCheckMobileScreen from '../CustomHooks/useCheckMobileScreen'
import MainRoute from '../Routes/MainRoute'

const Index = (props) => {
  const [burgerClicked, setBurgerClicked] = useState(false)
  const checkIfMobile = useCheckMobileScreen()

  useEffect(() => {
    if (checkIfMobile) {
      if (burgerClicked === false)
        setBurgerClicked(true)
    }
  }, [burgerClicked, checkIfMobile]);

  const clickBurger = (res) => {
    setBurgerClicked(res)
  }

  return (
    <LayoutMainContainer>
      {
        !checkIfMobile &&
        <ProSide burgerClicked={burgerClicked} />
      }
      <div className={`${burgerClicked ? 'mainContainer1' : 'mainContainer'}`}>
        <NavBar checkIfMobile={checkIfMobile} burgerClicked={burgerClicked} clickBurger={clickBurger} />
        {
          checkIfMobile && <NewNavHead />
        }
        <div className="container">
          <MainRoute {...props} />
        </div>

      </div>
    </LayoutMainContainer>
  )
}

export default Index

const LayoutMainContainer = styled.div`
  width: 100%;
  height: auto;
  background-color: var(--secondaryBackground);
  display: flex;
  position: relative;

  .mainContainer{
    position: relative;
    left: 250px;
    top: 0;
    bottom: 0;
    right: 0;
    width: calc(100% - 250px);
    min-height: 100vh;    
  }

  .mainContainer1{
    position: relative;
    min-height: 100vh;
    width: 100%;
  }

  .container{
    padding: 16px;
  }
`