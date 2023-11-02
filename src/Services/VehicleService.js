import { GenerateUrlEncodedData } from "../Helpers/GenerateUrlEncodedData";
import { fetch, store } from "../Helpers/HttpUtil";
import { GetVehicleDetailsByVId, GetVehicleRegistrationByVehicleId, InsertUpdateVehicleDetails, InsertUpdateVehicleType } from "../Helpers/Url";

export const getVehicleDetailsApi = async (data, successCallback) => {
    try {
        const response = await fetch(`${GetVehicleDetailsByVId}?vehicleId=${data.vId}`);
        if (response?.status === 200) {
            successCallback(response?.data?.vehicleDetails)
        } else
            successCallback([])
    } catch (error) {
        successCallback([])
    }
}

export const getVehicleRegistrationDetailsApi = async (data, successCallback) => {
    try {
        const response = await fetch(`${GetVehicleRegistrationByVehicleId}?vehicleId=${data.vId}`);
        if (response?.status === 200) {
            successCallback(response?.data?.vehicleDetails)
        } else
            successCallback([])
    } catch (error) {
        successCallback([])
    }
}

export const setVehicleDetailsApi = async (data, successCallback) => {
    try {
        let formData = GenerateUrlEncodedData(data)
        const response = await store(InsertUpdateVehicleDetails, formData);
        if (response?.status === 200) {
            successCallback(response?.data)
        } else
            successCallback([])
    } catch (error) {
        successCallback([])
    }
}

export const setVehicleTypeDetailsApi = async (data, successCallback) => {
    try {
        let formData = GenerateUrlEncodedData(data)
        const response = await store(InsertUpdateVehicleType, formData);
        if (response?.status === 200) {
            successCallback(response?.data)
        } else
            successCallback([])
    } catch (error) {
        successCallback([])
    }
}


