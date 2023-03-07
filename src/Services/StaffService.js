import { GenerateUrlEncodedData } from "../Helpers/GenerateUrlEncodedData";
import { store } from "../Helpers/HttpUtil";
import { InsertUpdateStaffType } from "../Helpers/Url";

export const setStaffTypeDetailsApi = async (data, successCallback) => {
    try {
        let formData = GenerateUrlEncodedData(data)
        const response = await store(InsertUpdateStaffType, formData);
        if (response?.status === 200) {
            successCallback(response?.data)
        } else
            successCallback([])
    } catch (error) {
        successCallback([])
    }
}