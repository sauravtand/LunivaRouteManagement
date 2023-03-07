import styled from 'styled-components'

const StatusBadge = ({ data }) => {
  return (
    <>
      {
        (data === 'pending') &&
        <StatusBadgeContainer style={{
          backgroundColor: '#d7c92f'
        }}>
          <span>
            {data}
          </span>
        </StatusBadgeContainer >
      }

      {
        (data === 'completed') &&
        <StatusBadgeContainer style={{
          backgroundColor: '#7bce1b'
        }}>
          <span>
            {data}
          </span>
        </StatusBadgeContainer >
      }

      {
        (data === 'onProgress') &&
        <StatusBadgeContainer style={{
          backgroundColor: '#1185de'
        }}>
          <span>
            {data}
          </span>
        </StatusBadgeContainer >
      }

      {
        (data === 'cancled') &&
        <StatusBadgeContainer style={{
          backgroundColor: '#f35959'
        }}>
          <span>
            {data}
          </span>
        </StatusBadgeContainer >
      }
    </>


  )
}

export default StatusBadge

const StatusBadgeContainer = styled.span`
  color: #ffff;
  
  padding: 0px 16px 4px 16px;
  border-radius: 40px;
  /* padding: 0; */
  span{
    font-size: 12px;
  }
`