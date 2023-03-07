import { GenerateUrlEncodedData } from "../Helpers/GenerateUrlEncodedData";
import { store } from "../Helpers/HttpUtil";
import { InsertUpdateCompanyDetails } from "../Helpers/Url";

export const setCompanyDetailsApi = async (data, successCallback) => {
    try {
        let formData = GenerateUrlEncodedData(data)
        const response = await store(InsertUpdateCompanyDetails, formData);
        if (response?.status === 200) {
            successCallback(response?.data)
        } else
            successCallback([])
    } catch (error) {
        successCallback([])
    }
}