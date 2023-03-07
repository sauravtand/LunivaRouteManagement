import { GenerateUrlEncodedData } from "../Helpers/GenerateUrlEncodedData";
import { fetch, store } from "../Helpers/HttpUtil";
import { CancelAssignedRouteOfVehicleByAdmin, getRouteAssignedDetailsByDateandUserId, GetRouteDetailsByCompanyId, GetRouteDetailsByDateWise, GetVehiclewiseRouteDetailsByRouteId, InsertUpdateReserveDetails, InsertUpdateRouteDetails } from "../Helpers/Url";

export const getRouteDetailsDateWiseApi = async (data, successCallback) => {
    try {
        const response = await fetch(`${GetRouteDetailsByDateWise}?routeday=${data.routeday}`);
        if (response?.status === 200) {
            successCallback(response?.data?.DatewiseRouteDetails)
        } else
            successCallback([])
    } catch (error) {
        successCallback([])
    }
}

export const getRouteDetailsByCompanyIdApi = async (data, successCallback) => {
    try {
        const response = await fetch(`${GetRouteDetailsByCompanyId}?companyid=${data.companyid}`);
        if (response?.status === 200) {
            successCallback(response?.data?.RouteDetails)
        } else
            successCallback([])
    } catch (error) {
        successCallback([])
    }
}

export const getVehicleWiseDetailsRouteIdApi = async (data, successCallback) => {
    try {
        const response = await fetch(`${GetVehiclewiseRouteDetailsByRouteId}?routeId=${data.routeId}`);
        if (response?.status === 200) {
            successCallback(response?.data)
        } else
            successCallback([])
    } catch (error) {
        successCallback([])
    }
}

export const setRouteDetailsApi = async (data, successCallback) => {
    try {
        const formData = GenerateUrlEncodedData(data)
        const response = await store(InsertUpdateRouteDetails, formData);
        if (response?.status === 200) {
            successCallback(response?.data)
        } else
            successCallback([])
    } catch (error) {
        successCallback([])
    }
}

export const setCancelRouteByAdminApi = async (data, successCallback) => {
    try {
        const formData = GenerateUrlEncodedData(data)
        const response = await store(`${CancelAssignedRouteOfVehicleByAdmin}?vehicleid=${data.vehicleid}&receiptid=${data.receiptid}&remarks=${data.remarks}`, formData);
        if (response?.status === 200) {
            successCallback(response?.data)
        } else
            successCallback([])
    } catch (error) {
        successCallback([])
    }
}

export const GetRouteAssignedDetailsByDateandUserId = async (data, successCallback) => {
    try {
        const response = await fetch(`${getRouteAssignedDetailsByDateandUserId}?fromdate=${data.fromdate}&todate=${data.todate}&companyId=${data.companyId}&userId=${data.userId}`);
        if (response?.status === 200) {
            successCallback(response?.data)
        } else
            successCallback([])
    } catch (error) {

    }
}

export const InsertUpdateReserveDetail = async (data, successCallback) => {
    try {
        const formData = GenerateUrlEncodedData(data);
        const response = await store(InsertUpdateReserveDetails, formData);
        if (response?.status === 200) {
            successCallback(response?.data);
        } else {
            successCallback([]);
        }
    } catch (error) { }
};
