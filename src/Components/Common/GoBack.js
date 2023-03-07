import { BiArrowBack } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

export const GoBack = () => {
    const navigate = useNavigate()

    const handleGoBack = () => {
        navigate(-1)
    }

    return (
        <div className='dropMenuClass' onClick={handleGoBack}>
        <BiArrowBack /> Back
        </div>
    )
}