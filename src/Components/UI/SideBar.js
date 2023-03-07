import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { navData } from '../../Helpers/NavData'
// import { useTranslation } from 'react-i18next';




const SideBar = () => {
  // const { i18n } = useTranslation();

  // function changeLanguage(e) {
  //   i18n.changeLanguage(e.target.value);
  // }
  // console.log(navData, 'navData');
  const handleClick = (e) => {
  }

  return (
    <SideBarContainer>
      <Logocontainer>
        {/* <img src={Logo} alt="" /> */}
        <h3>Luniva360</h3>
      </Logocontainer>
      <hr />
      <SideBarComponents>
        {
          navData.map((e, index) => (
            <NavLink className={`sideBarItem`} key={index} to={`/admin${e.pathname}`} onClick={() => handleClick(e.pathname)}>
              <div>
                <e.icon />
                <span>{e.name}</span>
              </div>
            </NavLink>
          ))
        }
      </SideBarComponents>

      {/* <div className='footer'>
        <button onClick={changeLanguage} value='en'>English</button>
        <button onClick={changeLanguage} value='np'>नेपाली</button>
      </div> */}

    </SideBarContainer>
  )
}

export default SideBar

const SideBarContainer = styled.div`
  background-color: #262626;
  width: 250px;
  height: 100%;
  top: 50%;
  transform: translateY(-50%);
  position: fixed;
  padding: 8px 16px;
  box-shadow: rgb(0 0 0 / 5%) 0rem 1.25rem 1.6875rem 0rem;
  overflow-y: auto;

  /* width */
  ::-webkit-scrollbar {
    width: 4px;
    border-radius: 50%;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1; 
    margin: 20px 0;
  }
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #3c445d35; 
    margin: 10px 0;
    border-radius: 10px;
  }
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #3c445d; 
    width: 10px;
  }

  hr{
    border: 1px solid #46323230;
    margin: 10px 0;
    border-radius: 50%;
  }
  .footer{
    position: absolute;
    bottom: 16px;
    left: 16px;
    right: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fefefe;
    span{
      font-size: 12px;
      opacity: 0.8;
    }

    img{
      width: 60px;
      height: auto;
    }
  }
`

const Logocontainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
  img{
    width: 100px;
    height: auto;
  }
  h3{
    color: #fefefe;
    margin-left: 16px;
    line-height: 26px;
    font-size: 18px;
  }
`
const SideBarComponents = styled.div`
  .sideBarItem{
    opacity: 0.8;
    color: #fefefe;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    width: 100%;
    padding: 0.5rem 0.625rem;
    border-radius: 0.375rem;
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
    margin-bottom: 8px;
    transition: box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    
    span{
      margin-left: 10px;
      font-size: 16px;
      color: #fefefe;
    }
    &:hover{
      background-color: rgb(255 245 241 / 16%);
    }
  }
  .active{
    opacity: 1;
    background-color: #fdfdfd;
    color: #000;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    width: 100%;
    padding: 0.5rem 0.625rem;
    border-radius: 0.375rem;
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
    box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem;

    span{
      font-weight: 600;
      color: #000;
    }
  }
`