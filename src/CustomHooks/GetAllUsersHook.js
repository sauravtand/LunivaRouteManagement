import { useEffect, useState } from "react"
import { getUserDetailsApi } from "../Services/UserService"

const GetAllUsersHook = (vId = 0, callService = true) => {
    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {
        let data = {
            'userId': vId
        }
        if (callService === true) {
            getUserDetailsApi(data, (res) => {
                // console.log(res, 'allusers');
                setAllUsers(res)
            })
        }
    }, [callService, vId])

    return allUsers;
}

export default GetAllUsersHook;