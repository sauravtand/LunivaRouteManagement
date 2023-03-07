import { useEffect, useState } from "react"
import { getVehicleRegistrationDetailsApi } from "../Services/VehicleService"

const useGetAllVehicleDetails = (vId = 0, callService = true) => {
    const [vehicleDetailsList, setVehicleDetailsList] = useState([])

    useEffect(() => {
        if (callService === true) {
            let data = {
                'vId': vId
            }
            getVehicleRegistrationDetailsApi(data, (res) => {
                setVehicleDetailsList(res)
            })
        }
    }, [callService, vId])

    return vehicleDetailsList
}

export default useGetAllVehicleDetails