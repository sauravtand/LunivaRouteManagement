import { useEffect, useState } from "react"
// import { AppDefaultSettings } from "../Config/AppDefaultSettings";
import { getCompanyDetailsApi } from "../Services/MiscService"

function useSingleCompany(returnCompanyId, allData = false, callService = true) {
    const [singleCompany, setSingleCompany] = useState([]);
    // const appDefSet = AppDefaultSettings.showSingleCompany

    useEffect(() => {
        callCompanyDetails(returnCompanyId, allData, callService)
    }, [returnCompanyId, allData, callService])

    const callCompanyDetails = (indexId, isAll, callService) => {
        if (callService === true) {
            getCompanyDetailsApi(res => {
                // || !showSingleCom
                if (isAll){
                    setSingleCompany(res)
                } else{
                    setSingleCompany(res[indexId])
                }
            })
        }
    }

    return singleCompany
}

export default useSingleCompany