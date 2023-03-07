import { GenerateUrlEncodedData } from "../Helpers/GenerateUrlEncodedData";
import { fetch, store } from "../Helpers/HttpUtil";
import { GetStaffDetailsByStaffId, GetStaffDetailsByVehicleId, InsertUpdateVehicleStaffDetails } from "../Helpers/Url";

export const getVehicleStaffDetailsApi = async (data, successCallback) => {
    try {
        const response = await fetch(`${GetStaffDetailsByVehicleId}?vehicleId=${data.vId}`);
        if (response?.status === 200) {
            successCallback(response?.data?.StaffDetails)
        } else
            successCallback([])
    } catch (error) {
        successCallback([])
    }
}

export const setVehicleStaffDetailsApi = async (data, successCallback) => {
    try {
        const formData = GenerateUrlEncodedData(data)
        const response = await store(InsertUpdateVehicleStaffDetails, formData);
        if (response?.status === 200) {
            successCallback(response?.data)
        } else
            successCallback([])
    } catch (error) {
        successCallback([])
    }
}

export const getVehicleStaffDetailsByStaffIdApi = async (data, successCallback) => {
    try {
        const response = await fetch(`${GetStaffDetailsByStaffId}?staffId=${data.staffId}`);
        if (response?.status === 200) {
            successCallback(response?.data?.StaffDetails)
        } else
            successCallback([])
    } catch (error) {
        successCallback([])
    }
}