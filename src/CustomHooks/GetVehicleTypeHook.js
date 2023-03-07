import { useEffect, useState } from "react"
import { getVehicleTypeDetailsApi } from "../Services/MiscService"

const useGetVehicleType = () => {
    const [vehicleTypeList, setVehicleTypeList] = useState([])

    useEffect(() => {
        getVehicleTypeDetailsApi(res => {
            setVehicleTypeList(res)
        })
    }, [])

    return vehicleTypeList
}

export default useGetVehicleType