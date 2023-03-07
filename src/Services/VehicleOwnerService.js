import { GenerateUrlEncodedData } from "../Helpers/GenerateUrlEncodedData";
import { fetch, store } from "../Helpers/HttpUtil";
import { GetOwnerDetailsByOwnerId, GetVehicleOwnerDetailsByVehicleId, InsertUpdateVehicleOwnerDetails } from "../Helpers/Url";

export const getVehicleOwnerDetailsApi = async (data, successCallback) => {
    try {
        const response = await fetch(`${GetVehicleOwnerDetailsByVehicleId}?vehicleId=${data.vId}`);
        if (response?.status === 200) {
            successCallback(response?.data?.OwnerDetails)
        } else
            successCallback([])
    } catch (error) {
        successCallback([])
    }
}

export const getVehicleOwnerByOwnerIdDetailsApi = async (data, successCallback) => {
    try {
        const response = await fetch(`${GetOwnerDetailsByOwnerId}?ownerId=${data.vId}`);
        if (response?.status === 200) {
            successCallback(response?.data?.OwnerDetails)
        } else
            successCallback([])
    } catch (error) {
        successCallback([])
    }
}

export const setVehicleOwnerDetailsApi = async (data, successCallback) => {
    try {
        const formData = GenerateUrlEncodedData(data)
        const response = await store(InsertUpdateVehicleOwnerDetails, formData);
        if (response?.status === 200) {
            successCallback(response?.data)
        } else
            successCallback([])
    } catch (error) {
        successCallback([])
    }
}