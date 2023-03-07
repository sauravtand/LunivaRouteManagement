import React from 'react'
import styled from 'styled-components'
import { BiEdit, BiLogIn } from 'react-icons/bi'
import { Link } from 'react-router-dom'

export const EditButton = () => {
  return (
    <Link to='/'>
      <ActionButtonContainer style={{
        color: '#fff',
        backgroundColor: '#17a2b8'
      }}>
        <BiEdit />
      </ActionButtonContainer>
    </Link>
  )
}


export const EnterBtn = () => {
  return (
    <Link to='/'>
      <ActionButtonContainer style={{
        color: '#fff',
        backgroundColor: '#007bff'
      }}>
        <BiLogIn />
      </ActionButtonContainer>
    </Link>
  )
}

const ActionButtonContainer = styled.div`
  /* margin: 4px 8px; */
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* color: '#fefefe'; */
  padding: 8px;
  border-radius: 4px;
  margin-left: 4px;
`