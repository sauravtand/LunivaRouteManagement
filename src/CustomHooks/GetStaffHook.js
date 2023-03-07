import { useEffect, useState } from "react"
import { getStaffTypeApi } from "../Services/MiscService"

function useGetStaffType() {
    const [staffTypeList, setStaffTypeList] = useState([])

    useEffect(() => {
        getStaffTypeApi(res => {
            setStaffTypeList(res)
        })
    }, [])

    return staffTypeList
}

export default useGetStaffType