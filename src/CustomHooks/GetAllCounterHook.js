import { useEffect, useState } from "react"
import { getCounterDetailsApi } from "../Services/CounterService"

const useGetAllCounterDetails = (vId = 0, callService = true) => {
    const [counterDetailsList, setcounterDetailsList] = useState([])

    useEffect(() => {
        if (callService === true) {
            getCounterDetailsApi((res) => {
                setcounterDetailsList(res)
            })
        }
    }, [callService, vId])

    return counterDetailsList
}

export default useGetAllCounterDetails