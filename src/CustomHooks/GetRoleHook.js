import { useEffect, useState } from "react"
import { getRoleDetailsApi } from "../Services/MiscService"

function useGetRole() {
    const [roleList, setRoleList] = useState([])

    useEffect(() => {
        getRoleDetailsApi(res => {
            setRoleList(res)
        })
    }, [])

    return roleList
}

export default useGetRole