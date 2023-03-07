import { GenerateUrlEncodedData } from "../Helpers/GenerateUrlEncodedData";
import { fetch, store } from "../Helpers/HttpUtil";
import { CheckDuplicateUserNameorNot, GetUserDetails, InsertUpdateUserDetails, ResetUserPasswordbyUserorAdmin } from "../Helpers/Url";

export const getUserDetailsApi = async (data, successCallback) => {
    try {
        const response = await fetch(`${GetUserDetails}?userId=${data.userId}`);
        if (response?.status === 200) {
            successCallback(response?.data?.UserDetails)
        } else
            successCallback([])
    } catch (error) {
        successCallback([])
    }
}

export const getUserNameCheckApi = async (data, successCallback) => {
    try {
        const response = await fetch(`${CheckDuplicateUserNameorNot}?username=${data.username}`);
        if (response?.status === 200) {
            successCallback(response?.data?.CheckUserName)
        } else
            successCallback([])
    } catch (error) {
        successCallback([])
    }
}

export const setUserDetailsApi = async (data, successCallback) => {
    try {
        const formData = GenerateUrlEncodedData(data)
        const response = await store(InsertUpdateUserDetails, formData);
        if (response?.status === 200) {
            successCallback(response?.data)
        } else
            successCallback([])
    } catch (error) {
        successCallback([])
    }
}

export const setResetUserPasswordApi = async (data, successCallback) => {
    try {
        const formData = GenerateUrlEncodedData(data)
        const response = await store(`${ResetUserPasswordbyUserorAdmin}?password=${data.password}&userId=${data.userId}&resetBy=${data.resetBy}&remarks=${data.remarks}`, formData);
        if (response?.status === 200) {
            successCallback(response?.data)
        } else
            successCallback([])
    } catch (error) {
        successCallback([])
    }
}
