import { GenerateUrlEncodedData } from "../Helpers/GenerateUrlEncodedData";
import { fetch, store } from "../Helpers/HttpUtil";
import { GetCounterDetails, InsertUpdateCounterDetails } from "../Helpers/Url";

export const getCounterDetailsApi = async (successCallback) => {
    try {
        const response = await fetch(GetCounterDetails);
        if (response?.status === 200) {
            successCallback(response?.data?.CounterDetails)
        } else
            successCallback([])
    } catch (error) {
        successCallback([])
    }
}

export const setCounterDetailsApi = async (data, successCallback) => {
    try {
        let formData = GenerateUrlEncodedData(data)
        const response = await store(InsertUpdateCounterDetails, formData);
        if (response?.status === 200) {
            successCallback(response?.data)
        } else
            successCallback([])
    } catch (error) {
        successCallback([])
    }
}