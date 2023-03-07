import { GenerateUrlEncodedData } from "../Helpers/GenerateUrlEncodedData";
import { store } from "../Helpers/HttpUtil";
import { InsertUpdateRole } from "../Helpers/Url";

export const setRoleTypeDetailsApi = async (data, successCallback) => {
    try {
        let formData = GenerateUrlEncodedData(data)
        const response = await store(InsertUpdateRole, formData);
        if (response?.status === 200) {
            successCallback(response?.data)
        } else
            successCallback([])
    } catch (error) {
        successCallback([])
    }
}