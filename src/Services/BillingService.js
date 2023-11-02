import { GenerateUrlEncodedData } from "../Helpers/GenerateUrlEncodedData";
import { fetch,store } from "../Helpers/HttpUtil";
import { InsertUpdateBillingType } from "../Helpers/Url";

export const setBillingTypeDetailsApi = async (data, successCallback) => {
    try {
        let formData = GenerateUrlEncodedData(data)
        const response = await store(InsertUpdateBillingType, formData);
        if (response?.status === 200) {
            successCallback(response?.data)
        } else
            successCallback([])
    } catch (error) {
        successCallback([])
    }
}


